import "server-only";
import { getPublishedContent, type ContentRow } from "@/lib/cms/content";
import { SECTOREN, SECTOR_SLUGS, type SectorDetail } from "@/lib/sectoren-detail";
import { sanitizeInline } from "@/lib/cms/sanitize";

function skeleton(row: ContentRow): SectorDetail {
  return {
    slug: row.slug,
    naam: row.titel,
    icon: "building-2",
    h1: row.titel,
    intro: "",
    kpis: [],
    challengesIntro: "",
    challenges: [],
    solutions: [],
    outcomes: [],
    caseTitle: "",
    caseSector: "",
    caseQuote: "",
    caseNaam: "",
    caseRol: "",
    caseImage: "/assets/photos/team-presentatie-breed.webp",
    insightsTitle: "",
    insights: [],
    ctaTitle: "",
  };
}

function mapRow(row: ContentRow): SectorDetail {
  const base = SECTOREN[row.slug] ?? skeleton(row);
  const d = (row.data ?? {}) as Partial<SectorDetail>;
  const merged = { ...base, ...d, slug: row.slug, naam: (d.naam as string) || base.naam };
  merged.intro = sanitizeInline(String(merged.intro ?? ""));
  return merged;
}

export async function getSectorBySlug(slug: string): Promise<SectorDetail | null> {
  const rows = await getPublishedContent("sectoren");
  const row = rows.find((x) => x.slug === slug);
  if (row) return mapRow(row);
  return SECTOREN[slug] ?? null;
}

export async function getSectorSlugs(): Promise<string[]> {
  const rows = await getPublishedContent("sectoren");
  return [...new Set<string>([...SECTOR_SLUGS, ...rows.map((r) => r.slug)])];
}

/** Alle sectoren; gebruikt door de sectorkoppeling op de richting-hubs, die
 *  alleen slugs opslaat en de namen hier ophaalt. */
export async function getSectoren(): Promise<SectorDetail[]> {
  const rows = await getPublishedContent("sectoren");
  return rows.length ? rows.map(mapRow) : Object.values(SECTOREN);
}
