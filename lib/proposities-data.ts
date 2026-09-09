import "server-only";
import { getPublishedContent } from "@/lib/cms/content";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { leesRijen } from "@/lib/cms/merge";
import { PROPOSITIES, type Propositie } from "@/lib/proposities";

const seedVoor = (slug: string) =>
  PROPOSITIES.find((p) => p.slug === slug) as Record<string, unknown> | undefined;

/** Alle live proposities (CMS met de seed als vangnet), op nummer gesorteerd. */
export async function getProposities(): Promise<Propositie[]> {
  const rows = await getPublishedContent("proposities");
  if (!rows.length) return PROPOSITIES;
  return leesRijen("proposities", CONTENT_SCHEMAS.proposities, rows, seedVoor).sort(
    (a, b) => a.nummer - b.nummer,
  );
}

/**
 * Proposities voor één sector (PMC). Leeg/ongezet = alle proposities.
 * `slugs` komt uit het sector-CMS-veld 'proposities'.
 */
export async function getPropositiesVoorSector(slugs?: string[]): Promise<Propositie[]> {
  const all = await getProposities();
  if (!slugs || slugs.length === 0) return all;
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  return slugs.map((s) => bySlug.get(s)).filter((p): p is Propositie => Boolean(p));
}
