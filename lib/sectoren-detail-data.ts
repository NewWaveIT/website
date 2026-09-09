import "server-only";
import { getPublishedContent } from "@/lib/cms/content";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { leesRijen } from "@/lib/cms/merge";
import { SECTOREN, SECTOR_SLUGS, type SectorDetail } from "@/lib/sectoren-detail";
import { sanitizeInline } from "@/lib/cms/sanitize";

const seedVoor = (slug: string) => SECTOREN[slug] as Record<string, unknown> | undefined;

/** Wat het schema niet doet: opmaak ontsmetten voor weergave. */
function verrijk(s: SectorDetail): SectorDetail {
  return { ...s, intro: sanitizeInline(s.intro) };
}

async function lees(): Promise<SectorDetail[]> {
  const rows = await getPublishedContent("sectoren");
  if (!rows.length) return Object.values(SECTOREN).map(verrijk);
  return leesRijen("sectoren", CONTENT_SCHEMAS.sectoren, rows, seedVoor).map(verrijk);
}

export async function getSectorBySlug(slug: string): Promise<SectorDetail | null> {
  const uitCms = (await lees()).find((s) => s.slug === slug);
  if (uitCms) return uitCms;
  // Per slug terugvallen: een sector zonder eigen rij hoort gewoon te renderen.
  const seed = SECTOREN[slug];
  return seed ? verrijk(seed) : null;
}

export async function getSectorSlugs(): Promise<string[]> {
  const rows = await getPublishedContent("sectoren");
  return [...new Set<string>([...SECTOR_SLUGS, ...rows.map((r) => r.slug)])];
}

/** Alle sectoren; gebruikt door de sectorkoppeling op de richting-hubs, die
 *  alleen slugs opslaat en de namen hier ophaalt. */
export async function getSectoren(): Promise<SectorDetail[]> {
  return lees();
}
