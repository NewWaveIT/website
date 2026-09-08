"use server";

import sharp from "sharp";
import type { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_TABLE, listContent, type ContentType } from "@/lib/cms/content";
import { FIELD_SCHEMAS, isStructured } from "@/lib/cms/schema";
import { PAGE_FIELDS, PAGE_DEFAULTS } from "@/lib/cms/pages";
import { revalidateContent } from "@/lib/cms/revalidate";
import { buildSeed } from "@/lib/cms/seed-data";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { GEMAPTE_TYPES, isKolomveld, rijNaarRuw } from "@/lib/cms/rij";
import { RICHTING_SLUGS } from "@/lib/diensten-detail";
import { leesRij, type VeldFout } from "@/lib/cms/merge";
import { logAudit } from "@/lib/cms/audit";

/** Bitmapformaten die sharp betrouwbaar naar WebP omzet. Bewust zonder SVG. */
const BEELD_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

/** Weergavenaam van de ingelogde gebruiker (voor audit + bewerkt_door). */
function gebruikerNaam(user: {
  user_metadata?: Record<string, unknown>;
  email?: string | null;
}): string | null {
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
  proposities: "/admin/proposities",
  services: "/admin/services",
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
    } else if (f.type === "proposities") {
      try {
        data[f.key] = raw ? JSON.parse(raw) : [];
      } catch {
        data[f.key] = [];
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
  revalidateContent(type, slug);
  redirect(`${LIST_PATH[type]}?ok=${bestaat ? "bijgewerkt" : "aangemaakt"}`);
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
  for (const [type, rows] of Object.entries(seed) as [
    ContentType,
    ReturnType<typeof buildSeed>[ContentType],
  ][]) {
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
  // Allow-list i.p.v. `image/*`: die laat ook SVG door, en een SVG in de publieke
  // bucket is uitvoerbare HTML op de storage-origin.
  if (!BEELD_TYPES.includes(file.type)) {
    return { error: "Alleen JPG, PNG, WebP, AVIF of GIF." };
  }
  if (file.size > 5 * 1024 * 1024) return { error: "Maximaal 5 MB." };

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
  return { url: data.publicUrl, width, height };
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

  revalidatePath(LIST_PATH[type]);
  revalidateContent(type, "");
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

  revalidatePath(LIST_PATH[type]);
  revalidateContent(type, (bestaand as { slug?: string } | null)?.slug ?? "");
  redirect(`${LIST_PATH[type]}?ok=verwijderd`);
}

export interface ControleRij {
  slug: string;
  titel: string;
  status: string;
  /** Velden die niet meer bij de code passen. */
  fouten: VeldFout[];
  /** De routing kan deze rij nooit renderen. */
  onbereikbaar?: string;
  /** Geen tegenhanger in de code: zelf aangemaakt, dus geen vangnet bij een modelwijziging. */
  eigen?: boolean;
}

export interface ControleResultaat {
  type: string;
  rijen: number;
  live: number;
  concept: number;
  /** Alleen de rijen die aandacht vragen. */
  aandacht: ControleRij[];
}

/**
 * Inventarisatie van de CMS-inhoud tegenover wat de site werkelijk gebruikt.
 * Verandert niets — puur diagnose. Rapporteert per rij drie soorten aandacht:
 * velden die niet meer bij de code passen, rijen die de routing nooit rendert,
 * en rijen zonder tegenhanger in de code (die hebben geen vangnet).
 */
export async function controleerContent(): Promise<{
  resultaten: ControleResultaat[];
  error?: string;
}> {
  await requireAdmin();
  const resultaten: ControleResultaat[] = [];
  const seedAlles = buildSeed();

  for (const type of GEMAPTE_TYPES) {
    const rows = await listContent(type);
    const seeds = seedAlles[type];
    const aandacht: ControleRij[] = [];

    for (const row of rows) {
      const seed = seeds.find((x) => x.slug === row.slug);
      const ruw = rijNaarRuw(type, row);
      const { fouten } = leesRij(CONTENT_SCHEMAS[type], ruw, {
        ...(seed?.data ?? {}),
        slug: row.slug,
      });

      // De richting-slugs zijn sinds de dienstencatalogus lichte hub-pagina's;
      // diensten-detail-data.ts filtert ze weg, dus deze rijen renderen nooit.
      const onbereikbaar =
        type === "diensten" && (RICHTING_SLUGS as readonly string[]).includes(row.slug)
          ? "wordt door de routing weggefilterd (dit is nu een richting-hub)"
          : undefined;

      const eigen = !seed;
      if (fouten.length || onbereikbaar || eigen) {
        aandacht.push({
          slug: row.slug,
          titel: row.titel,
          status: row.status,
          fouten,
          onbereikbaar,
          eigen,
        });
      }
    }

    resultaten.push({
      type,
      rijen: rows.length,
      live: rows.filter((r) => r.status === "live").length,
      concept: rows.filter((r) => r.status !== "live").length,
      aandacht,
    });
  }

  return { resultaten };
}

export interface SyncRij {
  slug: string;
  aangevuld: string[];
  hersteld: string[];
}

export interface SyncResultaat {
  type: string;
  rijen: SyncRij[];
}

/**
 * Brengt bestaande CMS-rijen op de huidige vorm.
 *
 * `seedContent()` slaat bestaande slugs over, waardoor een rij voor eeuwig de
 * vorm houdt van het moment waarop hij is aangemaakt — de eigenlijke oorzaak
 * van content die leeg rendert na een modelwijziging. Deze actie vult per veld
 * aan in plaats van de rij te overschrijven, zodat redactiewerk nooit sneuvelt:
 *
 * - veld ontbreekt        → aanvullen uit de standaardcontent
 * - veld aanwezig, geldig → laten staan, de redactie wint altijd
 * - veld aanwezig, ongeldig (oude vorm) → vervangen door de standaardwaarde
 *
 * Rijen zonder tegenhanger in de code blijven volledig ongemoeid.
 */
export async function synchroniseerContent(): Promise<{
  resultaten: SyncResultaat[];
  error?: string;
}> {
  const user = await requireAdmin();
  const supabase = await createClient();
  const seedAlles = buildSeed();
  const resultaten: SyncResultaat[] = [];

  for (const type of GEMAPTE_TYPES) {
    const rows = await listContent(type);
    const seeds = seedAlles[type];
    const schema = CONTENT_SCHEMAS[type];
    const gewijzigd: SyncRij[] = [];

    for (const row of rows) {
      const seed = seeds.find((x) => x.slug === row.slug);
      if (!seed) continue; // zelf aangemaakt: geen standaard om op terug te vallen

      const huidig = (row.data ?? {}) as Record<string, unknown>;
      const ruw = rijNaarRuw(type, row);
      const nieuw = { ...huidig };
      const aangevuld: string[] = [];
      const hersteld: string[] = [];

      for (const [veld, veldSchema] of Object.entries(schema.shape)) {
        if (isKolomveld(type, veld)) continue;

        const standaard = (seed.data as Record<string, unknown>)[veld];
        if (standaard === undefined) continue;
        if ((veldSchema as z.ZodType).safeParse(standaard).success === false) continue;

        if (!(veld in huidig)) {
          nieuw[veld] = standaard;
          aangevuld.push(veld);
        } else if ((veldSchema as z.ZodType).safeParse(ruw[veld]).success === false) {
          nieuw[veld] = standaard;
          hersteld.push(veld);
        }
      }

      if (!aangevuld.length && !hersteld.length) continue;

      const { error } = await supabase
        .from(CONTENT_TABLE[type])
        .update({ data: nieuw })
        .eq("id", row.id);
      if (error) return { resultaten, error: `${type}/${row.slug}: ${error.message}` };

      await logAudit({
        gebruiker_email: user.email ?? null,
        gebruiker_naam: gebruikerNaam(user),
        actie: "gesynchroniseerd",
        content_type: type,
        slug: row.slug,
        titel: row.titel,
      });

      gewijzigd.push({ slug: row.slug, aangevuld, hersteld });
      revalidateContent(type, row.slug);
    }

    if (gewijzigd.length) resultaten.push({ type, rijen: gewijzigd });
  }

  // Pagina's hebben geen runtime-schema (per slug een eigen veldset), maar wél
  // hetzelfde probleem: ontbreekt een sleutel in de rij, dan komt de tekst van
  // de site uit PAGE_DEFAULTS terwijl de admin het veld leeg toont. Sinds een
  // leeggemaakt veld ook écht leeg blijft, moet die scheefstand eerst weg.
  const paginaRijen: SyncRij[] = [];
  for (const row of await listContent("paginas")) {
    const velden = PAGE_FIELDS[row.slug];
    const standaarden = PAGE_DEFAULTS[row.slug];
    if (!velden || !standaarden) continue;

    const huidig = (row.data ?? {}) as Record<string, unknown>;
    const nieuw = { ...huidig };
    const aangevuld: string[] = [];

    for (const f of velden) {
      if (f.key in huidig) continue;
      const standaard = standaarden[f.key];
      if (typeof standaard !== "string") continue;
      nieuw[f.key] = standaard;
      aangevuld.push(f.key);
    }
    if (!aangevuld.length) continue;

    const { error } = await supabase
      .from(CONTENT_TABLE.paginas)
      .update({ data: nieuw })
      .eq("id", row.id);
    if (error) return { resultaten, error: `paginas/${row.slug}: ${error.message}` };

    await logAudit({
      gebruiker_email: user.email ?? null,
      gebruiker_naam: gebruikerNaam(user),
      actie: "gesynchroniseerd",
      content_type: "paginas",
      slug: row.slug,
      titel: row.titel,
    });

    paginaRijen.push({ slug: row.slug, aangevuld, hersteld: [] });
    revalidateContent("paginas", row.slug);
  }
  if (paginaRijen.length) resultaten.push({ type: "paginas", rijen: paginaRijen });

  return { resultaten };
}
