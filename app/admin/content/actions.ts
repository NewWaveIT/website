"use server";

import sharp from "sharp";
import { teGroot, uploadWaarschuwing } from "@/lib/beeld-eisen";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { gebruikerNaam, requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_TABLE, type ContentType } from "@/lib/cms/content";
import { FIELD_SCHEMAS, isStructured } from "@/lib/cms/schema";
import { paginaVelden } from "@/lib/cms/pages";
import { revalidateContent } from "@/lib/cms/revalidate";
import { logAudit } from "@/lib/cms/audit";
import { ADMIN_PADEN, bewerkPad } from "@/lib/cms/admin-paden";

/** Bitmapformaten die sharp betrouwbaar naar WebP omzet. Bewust zonder SVG. */
const BEELD_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

function isType(v: string): v is ContentType {
  return v in CONTENT_TABLE;
}

export type SaveState = { error?: string };

export async function saveContent(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const user = await requireAdmin();

  const type = String(formData.get("type") ?? "");
  if (!isType(type)) return { error: "Onbekend contenttype." };

  const id = String(formData.get("id") ?? "").trim();
  const titel = String(formData.get("titel") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const status = String(formData.get("status") ?? "concept");
  const volgorde = Number.parseInt(String(formData.get("volgorde") ?? "0"), 10) || 0;

  if (!titel) return { error: "Titel is verplicht." };
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug mag alleen kleine letters, cijfers en koppeltekens bevatten." };
  }
  if (status !== "live" && status !== "concept") return { error: "Ongeldige status." };

  // Overige velden (JSON-uitklap) eerst, zodat de schemavelden erover heen winnen.
  const extraRaw = String(formData.get("extra") ?? "").trim();
  let data: Record<string, unknown> = {};
  if (extraRaw) {
    try {
      const parsed = JSON.parse(extraRaw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        data = parsed as Record<string, unknown>;
      } else {
        return { error: "Overige velden moeten een JSON-object zijn." };
      }
    } catch {
      return { error: "Overige velden bevatten geen geldige JSON." };
    }
  }

  const fields =
    type === "paginas" ? (paginaVelden(slug) ?? FIELD_SCHEMAS.paginas) : FIELD_SCHEMAS[type];
  for (const f of fields) {
    const raw = String(formData.get(`f_${f.key}`) ?? "").trim();
    if (isStructured(f.type)) {
      try {
        const parsed = raw ? JSON.parse(raw) : f.type === "group" ? {} : [];
        data[f.key] = parsed;
      } catch {
        return { error: `Veld "${f.label}" kon niet worden opgeslagen.` };
      }
    } else if (raw === "") {
      if (f.required) return { error: `${f.label} is verplicht.` };
      // Expliciet leeg opslaan i.p.v. de sleutel verwijderen: anders is "bewust
      // geleegd" niet te onderscheiden van "nooit ingevuld" en zet het leespad
      // de standaardtekst terug. Wat je in de admin leegmaakt, is live ook leeg.
      data[f.key] = "";
    } else if (f.type === "number") {
      const n = Number(raw);
      if (!Number.isNaN(n)) data[f.key] = n;
    } else {
      data[f.key] = raw;
    }
  }

  const record = {
    slug,
    titel,
    status,
    volgorde,
    data,
    bijgewerkt_op: new Date().toISOString(),
    bewerkt_door: user.email ?? null,
  };

  const supabase = await createClient();
  const table = CONTENT_TABLE[type];

  const bestaat = Boolean(id && id !== "new");
  let rijId = id;
  if (bestaat) {
    const { error } = await supabase.from(table).update(record).eq("id", id);
    if (error) return { error: error.message };
  } else {
    // `.select("id")` erbij omdat "Opslaan en doorgaan" bij een nieuw item
    // terug moet naar de editor van precies deze rij.
    const { data, error } = await supabase.from(table).insert(record).select("id").single();
    if (error) {
      return {
        error: error.code === "23505" ? "Deze slug bestaat al." : error.message,
      };
    }
    rijId = (data as { id: string }).id;
  }

  await logAudit({
    gebruiker_email: user.email ?? null,
    gebruiker_naam: gebruikerNaam(user),
    actie: bestaat ? "bijgewerkt" : "aangemaakt",
    content_type: type,
    slug,
    titel,
  });

  revalidatePath(ADMIN_PADEN[type].lijst);
  revalidateContent();

  const melding = bestaat ? "bijgewerkt" : "aangemaakt";
  // "Opslaan en doorgaan": terug naar dezelfde editor in plaats van de lijst.
  if (formData.get("blijf") === "1") redirect(`${bewerkPad(type, rijId)}?ok=${melding}`);
  redirect(`${ADMIN_PADEN[type].lijst}?ok=${melding}`);
}

/** Upload een afbeelding naar de Supabase Storage-bucket 'content' en geef de publieke URL + afmetingen terug. */
export async function uploadImage(formData: FormData): Promise<{
  url?: string;
  width?: number;
  height?: number;
  error?: string;
  waarschuwing?: string;
}> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Geen bestand gekozen." };
  // Allow-list i.p.v. `image/*`: die laat ook SVG door, en een SVG in de publieke
  // bucket is uitvoerbare HTML op de storage-origin.
  if (!BEELD_TYPES.includes(file.type)) {
    return { error: "Alleen JPG, PNG, WebP, AVIF of GIF." };
  }
  const teGrootMelding = teGroot(file.size);
  if (teGrootMelding) return { error: teGrootMelding };

  // Alles gaat als WebP de bucket in. Lukt de conversie niet, dan weigeren we —
  // het origineel doorlaten zou de allow-list hierboven alsnog omzeilen.
  let body: Buffer;
  let width: number | undefined;
  let height: number | undefined;
  try {
    const input = Buffer.from(await file.arrayBuffer());
    body = await sharp(input).rotate().webp({ quality: 82 }).toBuffer();
    const meta = await sharp(body).metadata();
    width = meta.width;
    height = meta.height;
  } catch {
    return { error: "Dit bestand kon niet worden verwerkt. Probeer een JPG of PNG." };
  }
  const path = `${crypto.randomUUID()}.webp`;

  const supabase = await createClient();
  const { error } = await supabase.storage
    .from("content")
    .upload(path, body, { contentType: "image/webp", upsert: false });
  if (error) return { error: error.message };

  const { data } = supabase.storage.from("content").getPublicUrl(path);

  // Een waarschuwing, geen weigering: soms is een kleine schermafdruk het enige
  // dat er is, en dan is een onscherp beeld beter dan geen beeld. Op de
  // detailpagina wordt het beeld sowieso niet bijgesneden en niet opgeschaald
  // (zie components/beeld-kader.tsx); de melding gaat over wat een redacteur in
  // de editor niet kan zien -- scherpte, en de hap die de kaart eruit neemt.
  const soort = formData.get("soort") === "cover" ? "cover" : "inline";
  const waarschuwing = uploadWaarschuwing(soort, width, height);

  return { url: data.publicUrl, width, height, waarschuwing };
}

/**
 * Zet één item live vanaf het dashboard.
 *
 * Bewust smal: alleen de status, geen andere velden. Het dashboard toont de
 * concepten over alle typen heen en dit is de knop ernaast; wie meer wil
 * veranderen gaat naar de editor.
 *
 * `.select()` erbij om dezelfde reden als bij de inzendingen: zonder passende
 * RLS-policy raakt een update nul rijen zónder fout, en dan zou een stille
 * mislukking als succes gemeld worden.
 */
export async function publiceerContent(
  type: string,
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  const user = await requireAdmin();
  if (!isType(type)) return { ok: false, error: "Onbekend contenttype." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from(CONTENT_TABLE[type])
    .update({
      status: "live",
      bijgewerkt_op: new Date().toISOString(),
      bewerkt_door: user.email ?? null,
    })
    .eq("id", id)
    .select("slug, titel");
  if (error) return { ok: false, error: error.message };
  const rij = data?.[0];
  if (!rij) return { ok: false, error: "Niet gevonden of geen rechten." };

  await logAudit({
    gebruiker_email: user.email ?? null,
    gebruiker_naam: gebruikerNaam(user),
    actie: "bijgewerkt",
    content_type: type,
    slug: rij.slug,
    titel: rij.titel,
  });

  revalidatePath("/admin");
  revalidatePath(ADMIN_PADEN[type].lijst);
  revalidateContent();
  return { ok: true };
}

/** Sla een nieuwe handmatige volgorde op: elk id krijgt zijn positie als `volgorde`. */
export async function reorderContent(type: string, orderedIds: string[]): Promise<{ ok: boolean }> {
  await requireAdmin();
  if (!isType(type) || orderedIds.length === 0) return { ok: false };

  const supabase = await createClient();
  const table = CONTENT_TABLE[type];
  for (let i = 0; i < orderedIds.length; i++) {
    const { error } = await supabase.from(table).update({ volgorde: i }).eq("id", orderedIds[i]);
    if (error) return { ok: false };
  }

  revalidatePath(ADMIN_PADEN[type].lijst);
  revalidateContent();
  return { ok: true };
}

export async function deleteContent(formData: FormData): Promise<void> {
  const user = await requireAdmin();

  const type = String(formData.get("type") ?? "");
  const id = String(formData.get("id") ?? "").trim();
  if (!isType(type) || !id) return;

  const supabase = await createClient();
  const { data: bestaand } = await supabase
    .from(CONTENT_TABLE[type])
    .select("slug, titel")
    .eq("id", id)
    .maybeSingle();
  await supabase.from(CONTENT_TABLE[type]).delete().eq("id", id);

  await logAudit({
    gebruiker_email: user.email ?? null,
    gebruiker_naam: gebruikerNaam(user),
    actie: "verwijderd",
    content_type: type,
    slug: (bestaand as { slug?: string } | null)?.slug ?? null,
    titel: (bestaand as { titel?: string } | null)?.titel ?? null,
  });

  revalidatePath(ADMIN_PADEN[type].lijst);
  revalidateContent();
  redirect(`${ADMIN_PADEN[type].lijst}?ok=verwijderd`);
}
