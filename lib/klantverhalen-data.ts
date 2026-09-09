import "server-only";
import { getPublishedContent, fotoWebp } from "@/lib/cms/content";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { leesRijen } from "@/lib/cms/merge";
import { sanitizeLite } from "@/lib/cms/sanitize";
import { KLANTVERHALEN, KLANTVERHAAL_MAP, type Klantverhaal } from "@/lib/klantverhalen";

const seedVoor = (slug: string) => KLANTVERHAAL_MAP[slug] as Record<string, unknown> | undefined;

/**
 * Wat het schema niet doet: opmaak ontsmetten, oude .png-paden naar .webp
 * trekken, en `tag` afleiden van de sector als hij niet apart is ingevuld.
 */
function verrijk(k: Klantverhaal): Klantverhaal {
  return {
    ...k,
    image: fotoWebp(k.image),
    tag: k.tag || k.sector,
    challenge: sanitizeLite(k.challenge),
    resultaat: sanitizeLite(k.resultaat),
  };
}

/** Gepubliceerde klantverhalen uit Supabase; valt terug op de statische lib-data. */
export async function getKlantverhalen(): Promise<Klantverhaal[]> {
  const rows = await getPublishedContent("cases");
  if (!rows.length) return KLANTVERHALEN.map(verrijk);
  return leesRijen("cases", CONTENT_SCHEMAS.cases, rows, seedVoor).map(verrijk);
}

export async function getKlantverhaalBySlug(slug: string): Promise<Klantverhaal | null> {
  const uitCms = (await getKlantverhalen()).find((k) => k.slug === slug);
  if (uitCms) return uitCms;
  // Per slug terugvallen, niet alleen bij een lege tabel: een seed-item dat nog
  // geen CMS-rij heeft moet blijven werken zodra er ándere rijen bestaan.
  const seed = KLANTVERHAAL_MAP[slug];
  return seed ? verrijk(seed) : null;
}
