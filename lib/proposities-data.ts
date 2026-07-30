import "server-only";
import { getPublishedContent, type ContentRow } from "@/lib/cms/content";
import { PROPOSITIES, type Propositie } from "@/lib/proposities";

const arr = (v: unknown, fallback: string[] = []): string[] =>
  Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean) : fallback;

function mapRow(row: ContentRow): Propositie {
  const base = PROPOSITIES.find((p) => p.slug === row.slug);
  const d = (row.data ?? {}) as Partial<Propositie>;
  return {
    slug: row.slug,
    nummer: Number(d.nummer ?? base?.nummer ?? 0),
    titel: row.titel || base?.titel || row.slug,
    belofte: String(d.belofte ?? base?.belofte ?? ""),
    wat: arr(d.wat, base?.wat ?? []),
    hoe: arr(d.hoe, base?.hoe ?? []),
    onderscheid: arr(d.onderscheid, base?.onderscheid ?? []),
    solutions: arr(d.solutions, base?.solutions ?? []),
  };
}

/** Alle live proposities (CMS met lib-fallback), op nummer gesorteerd. */
export async function getProposities(): Promise<Propositie[]> {
  const rows = await getPublishedContent("proposities");
  if (rows.length) return rows.map(mapRow).sort((a, b) => a.nummer - b.nummer);
  return PROPOSITIES;
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
