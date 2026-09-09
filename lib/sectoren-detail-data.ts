import "server-only";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { maakLezer } from "@/lib/cms/lees";
import { sanitizeInline } from "@/lib/cms/sanitize";
import { SECTOREN, type SectorDetail } from "@/lib/sectoren-detail";

const lezer = maakLezer<SectorDetail>({
  type: "sectoren",
  schema: CONTENT_SCHEMAS.sectoren,
  seed: Object.values(SECTOREN),
  // Wat het schema niet doet: opmaak ontsmetten voor weergave.
  verrijk: (s) => ({ ...s, intro: sanitizeInline(s.intro) }),
});

/** Alle sectoren; ook gebruikt door de sectorkoppeling op de richting-hubs. */
export const getSectoren = lezer.alle;
export const getSectorBySlug = lezer.bijSlug;

/** De slugs waarvoor /sectoren/[slug] wordt voorgerenderd. */
export async function getSectorSlugs(): Promise<string[]> {
  return (await getSectoren()).map((s) => s.slug);
}
