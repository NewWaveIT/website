import "server-only";
import { getPublishedContent, type ContentRow } from "@/lib/cms/content";
import { ARTIKELEN, ARTIKEL_MAP, type Artikel } from "@/lib/inzichten";

/** ISO-datum (YYYY-MM-DD) → Nederlandse weergave; laat andere strings ongemoeid. */
function fmtDatum(d: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  try {
    return new Date(d).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return d;
  }
}

function mapRow(row: ContentRow): Artikel {
  const d = row.data as Record<string, unknown>;
  const str = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
  const inhoud = str("inhoud");
  const discipline = str("discipline") || "Algemeen";
  const sector = str("sector") || "Algemeen";
  // Badge: sector wint, anders discipline, anders oude vrije 'categorie', anders 'Inzicht'.
  const cat =
    (sector !== "Algemeen" && sector) ||
    (discipline !== "Algemeen" && discipline) ||
    str("categorie") ||
    "Inzicht";
  return {
    slug: row.slug,
    titel: row.titel,
    cat,
    discipline,
    sector,
    datum: fmtDatum(str("datum")),
    leestijd: str("leestijd"),
    auteur: str("auteur") || "The New Wave IT",
    image: str("cover") || "/assets/photos/team-presentatie-breed.webp",
    intro: str("samenvatting"),
    body: inhoud ? inhoud.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : [],
  };
}

/** Gepubliceerde artikelen uit Supabase; valt terug op de statische lib-data. */
export async function getArtikelen(): Promise<Artikel[]> {
  const rows = await getPublishedContent("artikelen");
  return rows.length ? rows.map(mapRow) : ARTIKELEN;
}

const SECTOR_SLUG_TO_CAT: Record<string, string> = {
  "publieke-sector": "Publieke sector",
  mobiliteit: "Mobiliteit",
  banken: "Banken",
  zorg: "Zorg",
  manufacturing: "Manufacturing",
};
const DIENST_SLUG_TO_DISC: Record<string, string> = {
  mendix: "Mendix",
  ai: "AI",
  strategie: "Strategie",
};

/** Gepubliceerde artikelen die aan deze sector zijn gekoppeld. */
export async function getArtikelenVoorSector(slug: string): Promise<Artikel[]> {
  const cat = SECTOR_SLUG_TO_CAT[slug];
  if (!cat) return [];
  return (await getArtikelen()).filter((a) => a.sector === cat);
}

/** Gepubliceerde artikelen die aan deze discipline zijn gekoppeld. */
export async function getArtikelenVoorDienst(slug: string): Promise<Artikel[]> {
  const disc = DIENST_SLUG_TO_DISC[slug];
  if (!disc) return [];
  return (await getArtikelen()).filter((a) => a.discipline === disc);
}

export async function getArtikelBySlug(slug: string): Promise<Artikel | null> {
  const rows = await getPublishedContent("artikelen");
  if (rows.length) {
    const r = rows.find((x) => x.slug === slug);
    return r ? mapRow(r) : null;
  }
  return ARTIKEL_MAP[slug] ?? null;
}
