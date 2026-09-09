import "server-only";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { maakLezer } from "@/lib/cms/lees";
import { sanitizeInline } from "@/lib/cms/sanitize";
import { DIENSTEN, RICHTING_SLUGS, type DienstDetail } from "@/lib/diensten-detail";

const lezer = maakLezer<DienstDetail>({
  type: "diensten",
  schema: CONTENT_SCHEMAS.diensten,
  seed: Object.values(DIENSTEN),
  // Wat het schema niet doet: opmaak ontsmetten voor weergave.
  verrijk: (d) => ({ ...d, intro: sanitizeInline(d.intro) }),
});

/**
 * Alleen de drie richtingen bestaan hier. Rijen met een andere slug — resten van
 * het vorige ontwerp, toen dit contenttype de dienstdetailpagina's bediende —
 * worden genegeerd in plaats van gerenderd.
 */
function isRichting(slug: string): boolean {
  return (RICHTING_SLUGS as readonly string[]).includes(slug);
}

export async function getRichtingBySlug(slug: string): Promise<DienstDetail | null> {
  return isRichting(slug) ? lezer.bijSlug(slug) : null;
}

export async function getRichtingSlugs(): Promise<string[]> {
  return [...RICHTING_SLUGS];
}
