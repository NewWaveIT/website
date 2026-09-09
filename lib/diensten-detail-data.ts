import "server-only";
import { getPublishedContent } from "@/lib/cms/content";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { leesRijen } from "@/lib/cms/merge";
import { DIENSTEN, RICHTING_SLUGS, type DienstDetail } from "@/lib/diensten-detail";
import { sanitizeInline } from "@/lib/cms/sanitize";

const seedVoor = (slug: string) => DIENSTEN[slug] as Record<string, unknown> | undefined;

/** Wat het schema niet doet: opmaak ontsmetten voor weergave. */
function verrijk(d: DienstDetail): DienstDetail {
  return { ...d, intro: sanitizeInline(d.intro) };
}

/**
 * Alleen de drie richtingen bestaan hier. Rijen met een andere slug — resten van
 * het vorige ontwerp, toen dit contenttype de dienstdetailpagina's bediende —
 * worden genegeerd in plaats van gerenderd.
 */
function isRichting(slug: string): boolean {
  return (RICHTING_SLUGS as readonly string[]).includes(slug);
}

export async function getRichtingBySlug(slug: string): Promise<DienstDetail | null> {
  if (!isRichting(slug)) return null;
  const rows = (await getPublishedContent("diensten")).filter((r) => r.slug === slug);
  const [uitCms] = leesRijen("diensten", CONTENT_SCHEMAS.diensten, rows, seedVoor);
  if (uitCms) return verrijk(uitCms);
  // Per slug terugvallen: een richting zonder eigen rij hoort gewoon te renderen.
  const seed = DIENSTEN[slug];
  return seed ? verrijk(seed) : null;
}

export async function getRichtingSlugs(): Promise<string[]> {
  return [...RICHTING_SLUGS];
}
