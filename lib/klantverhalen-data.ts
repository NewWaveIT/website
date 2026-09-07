import "server-only";
import { getPublishedContent, fotoWebp, type ContentRow } from "@/lib/cms/content";
import { sanitizeLite } from "@/lib/cms/sanitize";
import {
  KLANTVERHALEN,
  KLANTVERHAAL_MAP,
  type Klantverhaal,
  type KPI,
  type Stap,
  type Sectie,
  type ResultaatKaart,
} from "@/lib/klantverhalen";

function impactList(v: unknown): KPI[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
    .map((x) => ({ n: String(x.n ?? ""), l: String(x.l ?? "") }));
}

/** Structuurvelden (keten, secties, eindresultaten) komen uit de CMS-JSON of anders uit de seed. */
function lijst<T>(v: unknown, fallback?: T[]): T[] | undefined {
  return Array.isArray(v) && v.length ? (v as T[]) : fallback;
}

/**
 * CMS-rij over de seed heen. De seed is de basis, zodat rijkere content die
 * (nog) niet in het CMS-schema zit — de ketenstappen, de secties per app en de
 * eindresultaten — niet verdwijnt zodra er een cms_cases-rij bestaat.
 */
function mapRow(row: ContentRow): Klantverhaal {
  const base = KLANTVERHAAL_MAP[row.slug];
  const d = row.data as Record<string, unknown>;
  const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
  const tekst = (k: string, val?: string) => s(k) || val || "";
  const aside = (d.aside && typeof d.aside === "object" ? d.aside : {}) as Record<string, unknown>;
  return {
    slug: row.slug,
    sector: tekst("sector", base?.sector),
    metric: tekst("metric", base?.metric),
    cardTitel: s("cardTitel") || row.titel || base?.cardTitel || "",
    org: tekst("org", base?.org),
    image: fotoWebp(s("image")) || base?.image || "/assets/photos/team-presentatie-breed.webp",
    tag: s("tag") || s("sector") || base?.tag || "",
    h1: s("h1") || row.titel || base?.h1 || "",
    intro: tekst("intro", base?.intro),
    impact: impactList(d.impact).length ? impactList(d.impact) : (base?.impact ?? []),
    challenge: s("challenge") ? sanitizeLite(s("challenge")) : (base?.challenge ?? ""),
    pull: tekst("pull", base?.pull),
    ketenTitel: tekst("ketenTitel", base?.ketenTitel) || undefined,
    ketenStappen: lijst<Stap>(d.ketenStappen, base?.ketenStappen),
    ketenSynthese: tekst("ketenSynthese", base?.ketenSynthese) || undefined,
    secties: lijst<Sectie>(d.secties, base?.secties),
    resultaat: s("resultaat") ? sanitizeLite(s("resultaat")) : (base?.resultaat ?? ""),
    eindresultaten: lijst<ResultaatKaart>(d.eindresultaten, base?.eindresultaten),
    aside: {
      sector: String(aside.sector ?? s("sector") ?? base?.aside.sector ?? ""),
      diensten: String(aside.diensten ?? base?.aside.diensten ?? ""),
      doorlooptijd: String(aside.doorlooptijd ?? base?.aside.doorlooptijd ?? ""),
      team: String(aside.team ?? base?.aside.team ?? "Plan-build-run"),
    },
    quote: tekst("quote", base?.quote),
    quoteNaam: tekst("quoteNaam", base?.quoteNaam),
    quoteRol: tekst("quoteRol", base?.quoteRol),
  };
}

/** Gepubliceerde klantverhalen uit Supabase; valt terug op de statische lib-data. */
export async function getKlantverhalen(): Promise<Klantverhaal[]> {
  const rows = await getPublishedContent("cases");
  return rows.length ? rows.map(mapRow) : KLANTVERHALEN;
}

export async function getKlantverhaalBySlug(slug: string): Promise<Klantverhaal | null> {
  const rows = await getPublishedContent("cases");
  if (rows.length) {
    const r = rows.find((x) => x.slug === slug);
    return r ? mapRow(r) : null;
  }
  return KLANTVERHAAL_MAP[slug] ?? null;
}
