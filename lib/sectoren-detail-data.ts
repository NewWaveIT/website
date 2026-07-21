import "server-only";
import { getPublishedContent, type ContentRow } from "@/lib/cms/content";
import { SECTOREN, SECTOR_SLUGS, type SectorDetail } from "@/lib/sectoren-detail";

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
  return { ...base, ...d, slug: row.slug, naam: (d.naam as string) || base.naam };
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
