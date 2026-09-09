import "server-only";
import { getPublishedContent } from "@/lib/cms/content";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { leesRijen } from "@/lib/cms/merge";
import { sanitizeInline } from "@/lib/cms/sanitize";
import { VACATURES, VACATURE_MAP, type Vacature } from "@/lib/vacatures";

const seedVoor = (slug: string) => VACATURE_MAP[slug] as Record<string, unknown> | undefined;

/** Wat het schema niet doet: opmaak ontsmetten voor weergave. */
function verrijk(v: Vacature): Vacature {
  return { ...v, intro: sanitizeInline(v.intro) };
}

/** Gepubliceerde vacatures uit Supabase; valt terug op de statische lib-data. */
export async function getVacatures(): Promise<Vacature[]> {
  const rows = await getPublishedContent("vacatures");
  if (!rows.length) return VACATURES.map(verrijk);
  return leesRijen("vacatures", CONTENT_SCHEMAS.vacatures, rows, seedVoor).map(verrijk);
}

export async function getVacatureBySlug(slug: string): Promise<Vacature | null> {
  const uitCms = (await getVacatures()).find((v) => v.slug === slug);
  if (uitCms) return uitCms;
  // Zie klantverhalen-data.ts: per-slug terugvallen, niet alleen bij een lege tabel.
  const seed = VACATURE_MAP[slug];
  return seed ? verrijk(seed) : null;
}
