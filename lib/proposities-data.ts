import "server-only";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { maakLezer } from "@/lib/cms/lees";
import { PROPOSITIES, type Propositie } from "@/lib/proposities";

const lezer = maakLezer<Propositie>({
  type: "proposities",
  schema: CONTENT_SCHEMAS.proposities,
  seed: PROPOSITIES,
  sorteer: (a, b) => a.nummer - b.nummer,
});

export const getProposities = lezer.alle;

/**
 * Proposities voor één sector (PMC). Leeg/ongezet = alle proposities.
 * `slugs` komt uit het sector-CMS-veld 'proposities' en bepaalt ook de volgorde.
 */
export async function getPropositiesVoorSector(slugs?: string[]): Promise<Propositie[]> {
  const alle = await getProposities();
  if (!slugs?.length) return alle;
  const perSlug = new Map(alle.map((p) => [p.slug, p]));
  return slugs.map((s) => perSlug.get(s)).filter((p): p is Propositie => Boolean(p));
}
