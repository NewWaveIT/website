import "server-only";
import { getPublishedContent, type ContentRow } from "@/lib/cms/content";
import { sanitizeLite } from "@/lib/cms/sanitize";
import { KLANTVERHALEN, KLANTVERHAAL_MAP, type Klantverhaal, type KPI } from "@/lib/klantverhalen";

function paragraphs(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  if (typeof v === "string")
    return v
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  return [];
}

function impactList(v: unknown): KPI[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
    .map((x) => ({ n: String(x.n ?? ""), l: String(x.l ?? "") }));
}

function mapRow(row: ContentRow): Klantverhaal {
  const d = row.data as Record<string, unknown>;
  const s = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
  const aside = (d.aside && typeof d.aside === "object" ? d.aside : {}) as Record<string, unknown>;
  return {
    slug: row.slug,
    sector: s("sector"),
    metric: s("metric"),
    cardTitel: s("cardTitel") || row.titel,
    org: s("org"),
    image: s("image") || "/assets/photos/team-presentatie-breed.webp",
    tag: s("tag") || s("sector"),
    h1: s("h1") || row.titel,
    intro: s("intro"),
    impact: impactList(d.impact),
    challenge: sanitizeLite(s("challenge")),
    pull: s("pull"),
    aanpak: paragraphs(d.aanpak),
    resultaat: sanitizeLite(s("resultaat")),
    aside: {
      sector: String(aside.sector ?? s("sector")),
      diensten: String(aside.diensten ?? ""),
      doorlooptijd: String(aside.doorlooptijd ?? ""),
      team: String(aside.team ?? "Plan-build-run"),
    },
    quote: s("quote"),
    quoteNaam: s("quoteNaam"),
    quoteRol: s("quoteRol"),
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
