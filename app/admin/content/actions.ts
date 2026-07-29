"use server";

import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_TABLE, type ContentType } from "@/lib/cms/content";
import { FIELD_SCHEMAS, isStructured } from "@/lib/cms/schema";
import { PAGE_FIELDS, PAGE_PATH } from "@/lib/cms/pages";
import { buildSeed } from "@/lib/cms/seed-data";
import { logAudit } from "@/lib/cms/audit";

/** Weergavenaam van de ingelogde gebruiker (voor audit + bewerkt_door). */
function gebruikerNaam(user: { user_metadata?: Record<string, unknown>; email?: string | null }): string | null {
  return (user.user_metadata?.naam as string) || user.email?.split("@")[0] || null;
}

/** Adminlijst per contenttype (voor terugnavigatie + revalidatie). */
const LIST_PATH: Record<ContentType, string> = {
  paginas: "/admin/paginas",
  cases: "/admin/cases",
  diensten: "/admin/diensten",
  sectoren: "/admin/sectoren",
  artikelen: "/admin/inzichten",
  vacatures: "/admin/vacatures",
  teamleden: "/admin/teamleden",
};

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
    type === "paginas" ? (PAGE_FIELDS[slug] ?? FIELD_SCHEMAS.paginas) : FIELD_SCHEMAS[type];
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
      delete data[f.key];
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
  if (bestaat) {
    const { error } = await supabase.from(table).update(record).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from(table).insert(record);
    if (error) {
      return {
        error: error.code === "23505" ? "Deze slug bestaat al." : error.message,
      };
    }
  }

  await logAudit({
    gebruiker_email: user.email ?? null,
    gebruiker_naam: gebruikerNaam(user),
    actie: bestaat ? "bijgewerkt" : "aangemaakt",
    content_type: type,
    slug,
    titel,
  });

  revalidatePath(LIST_PATH[type]);
  revalidatePublic(type, slug);
  redirect(LIST_PATH[type]);
}

/** Ververs de publieke routes die (via fase C) live uit Supabase lezen. */
function revalidatePublic(type: ContentType, slug: string) {
  if (type === "artikelen") {
    revalidatePath("/inzichten");
    revalidatePath(`/inzichten/${slug}`);
  } else if (type === "cases") {
    revalidatePath("/klantverhalen");
    revalidatePath(`/klantverhalen/${slug}`);
  } else if (type === "vacatures") {
    revalidatePath("/werken-bij");
    revalidatePath(`/vacatures/${slug}`);
  } else if (type === "diensten") {
    revalidatePath(`/diensten/${slug}`);
  } else if (type === "sectoren") {
    revalidatePath(`/sectoren/${slug}`);
  } else if (type === "paginas" && PAGE_PATH[slug]) {
    revalidatePath(PAGE_PATH[slug]);
  } else if (type === "teamleden") {
    revalidatePath("/over-ons");
  }
}

/**
 * Zet de huidige (lib-)content als bewerkbare rijen in Supabase. Idempotent:
 * bestaande slugs worden overgeslagen, zodat latere bewerkingen niet sneuvelen.
 */
export async function seedContent(): Promise<{ toegevoegd: number; error?: string }> {
  await requireAdmin();
  const supabase = await createClient();
  const seed = buildSeed();

  let toegevoegd = 0;
  for (const [type, rows] of Object.entries(seed) as [ContentType, ReturnType<typeof buildSeed>[ContentType]][]) {
    if (!rows.length) continue;
    const table = CONTENT_TABLE[type];

    const { data: bestaande, error: leesFout } = await supabase.from(table).select("slug");
    if (leesFout) return { toegevoegd, error: leesFout.message };
    const aanwezig = new Set((bestaande ?? []).map((r: { slug: string }) => r.slug));

    const nieuw = rows.filter((r) => !aanwezig.has(r.slug));
    if (!nieuw.length) continue;

    const { error } = await supabase.from(table).insert(nieuw);
    if (error) return { toegevoegd, error: error.message };
    toegevoegd += nieuw.length;
  }

  revalidatePath("/", "layout");
  return { toegevoegd };
}

/** Upload een afbeelding naar de Supabase Storage-bucket 'content' en geef de publieke URL + afmetingen terug. */
export async function uploadImage(
  formData: FormData,
): Promise<{ url?: string; width?: number; height?: number; error?: string }> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Geen bestand gekozen." };
  if (!file.type.startsWith("image/")) return { error: "Alleen afbeeldingen zijn toegestaan." };
  if (file.size > 5 * 1024 * 1024) return { error: "Maximaal 5 MB." };

  // Converteer naar WebP voor snelheid; val terug op het origineel als dat niet lukt (bv. SVG).
  const ext = (file.name.split(".").pop() ?? "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
  let body: Buffer | File = file;
  let outExt = ext;
  let contentType = file.type;
  let width: number | undefined;
  let height: number | undefined;
  try {
    const input = Buffer.from(await file.arrayBuffer());
    body = await sharp(input).rotate().webp({ quality: 82 }).toBuffer();
    outExt = "webp";
    contentType = "image/webp";
    const meta = await sharp(body).metadata();
    width = meta.width;
    height = meta.height;
  } catch {
    // origineel behouden
  }
  const path = `${crypto.randomUUID()}.${outExt}`;

  const supabase = await createClient();
  const { error } = await supabase.storage
    .from("content")
    .upload(path, body, { contentType, upsert: false });
  if (error) return { error: error.message };

  const { data } = supabase.storage.from("content").getPublicUrl(path);
  return { url: data.publicUrl, width, height };
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

  revalidatePath(LIST_PATH[type]);
  if (type === "artikelen") revalidatePath("/inzichten");
  if (type === "cases") revalidatePath("/klantverhalen");
  if (type === "vacatures") revalidatePath("/werken-bij");
  redirect(LIST_PATH[type]);
}
