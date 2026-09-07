import "server-only";
import { getPublishedContent, type ContentRow } from "@/lib/cms/content";
import { DIENSTEN, DIENST_SLUGS, RICHTING_SLUGS, type DienstDetail } from "@/lib/diensten-detail";
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

/** Richting-slugs (mendix/ai/strategie) zijn nu lichte hub-pagina's onder
 *  app/(marketing)/diensten/<richting>/page.tsx, geen dienstdetailpagina meer.
 *  Uitfilteren hier voorkomt dat [slug]/page.tsx dezelfde paden nogmaals
 *  genereert — ook als er nog oude cms_diensten-rijen voor die slugs bestaan. */
function isRichtingSlug(slug: string): boolean {
  return (RICHTING_SLUGS as readonly string[]).includes(slug);
}

export async function getDienstBySlug(slug: string): Promise<DienstDetail | null> {
  if (isRichtingSlug(slug)) return null;
  const rows = await getPublishedContent("diensten");
  const row = rows.find((x) => x.slug === slug);
  if (row) return mapRow(row);
  return DIENSTEN[slug] ?? null; // lib-fallback (ook als CMS andere rijen bevat)
}

export async function getDienstSlugs(): Promise<string[]> {
  const rows = await getPublishedContent("diensten");
  return [...new Set<string>([...DIENST_SLUGS, ...rows.map((r) => r.slug)])].filter(
    (s) => !isRichtingSlug(s),
  );
}
