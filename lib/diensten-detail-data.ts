import "server-only";
import { getPublishedContent, type ContentRow } from "@/lib/cms/content";
import { DIENSTEN, RICHTING_SLUGS, type DienstDetail } from "@/lib/diensten-detail";
import { sanitizeInline } from "@/lib/cms/sanitize";

function skeleton(row: ContentRow): DienstDetail {
  return {
    slug: row.slug,
    naam: row.titel,
    badgeIcon: "boxes",
    badgeLabel: "",
    h1: row.titel,
    intro: "",
    ctaSecondary: "Bekijk klantverhalen",
    kpis: [],
    vraagstukken: [],
    pijlersIntro: "",
    pijlers: [],
    aanpak: [],
    waarom: [],
    expertsHead: "",
    experts: [],
    partners: [],
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

/** lib-basis (bestaande slug) of veilige skeleton, met CMS-data eroverheen. */
function mapRow(row: ContentRow): DienstDetail {
  const base = DIENSTEN[row.slug] ?? skeleton(row);
  const d = (row.data ?? {}) as Partial<DienstDetail>;
  const merged = { ...base, ...d, slug: row.slug, naam: (d.naam as string) || base.naam };
  merged.intro = sanitizeInline(String(merged.intro ?? ""));
  return merged;
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
  const rows = await getPublishedContent("diensten");
  const row = rows.find((x) => x.slug === slug);
  if (row) return mapRow(row);
  return DIENSTEN[slug] ?? null; // lib-fallback, ook als het CMS andere rijen bevat
}

export async function getRichtingSlugs(): Promise<string[]> {
  return [...RICHTING_SLUGS];
}
