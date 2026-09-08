import "server-only";
import { getPublishedContent, fotoWebp, type ContentRow } from "@/lib/cms/content";
import { ARTIKELEN, ARTIKEL_MAP, type Artikel } from "@/lib/inzichten";
import { getTeamleden } from "@/lib/team-data";
import { getServiceBySlug } from "@/lib/services-data";
import { RICHTING_SLUGS } from "@/lib/diensten-detail";
import type { ServiceRichting } from "@/lib/services";
import { sanitizeFull } from "@/lib/cms/sanitize";

type AuthorResolver = (raw: string) => { naam: string; foto?: string };

async function authorResolver(): Promise<AuthorResolver> {
  const team = await getTeamleden();
  const bySlug = new Map(team.map((m) => [m.slug, m]));
  const byNaam = new Map(team.map((m) => [m.naam, m]));
  return (raw: string) => {
    const m = bySlug.get(raw) ?? byNaam.get(raw);
    if (m) return { naam: m.naam, foto: m.foto };
    return { naam: raw || "The New Wave IT" };
  };
}

/** ISO-datum (YYYY-MM-DD) → Nederlandse weergave; laat andere strings ongemoeid. */
function fmtDatum(d: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  try {
    return new Date(d).toLocaleDateString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

const MAANDEN: Record<string, string> = {
  jan: "01",
  feb: "02",
  mrt: "03",
  apr: "04",
  mei: "05",
  jun: "06",
  jul: "07",
  aug: "08",
  sep: "09",
  okt: "10",
  nov: "11",
  dec: "12",
};

/**
 * Weergavedatum → ISO (YYYY-MM-DD) voor structured data; `datePublished` moet
 * ISO zijn, anders vallen de Article-rich-results af. Het model bewaart alleen
 * de Nederlandse weergave (zie `fmtDatum`), dus draaien we die hier terug.
 * Geeft een lege string als het formaat niet herkend wordt — beter geen veld
 * dan een ongeldig veld.
 */
export function isoDatum(d: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  const m = /^(\d{1,2})\s+([a-z]{3})[a-z.]*\s+(\d{4})$/i.exec(d.trim());
  if (!m) return "";
  const maand = MAANDEN[m[2]!.toLowerCase()];
  return maand ? `${m[3]}-${maand}-${m[1]!.padStart(2, "0")}` : "";
}

function mapRow(row: ContentRow, resolve: AuthorResolver): Artikel {
  const d = row.data as Record<string, unknown>;
  const str = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");
  const inhoud = fotoWebp(str("inhoud"));
  const isHtml = /<[a-z][\s\S]*>/i.test(inhoud);
  const discipline = str("discipline") || "Algemeen";
  const sector = str("sector") || "Algemeen";
  // Badge: sector wint, anders discipline, anders oude vrije 'categorie', anders 'Inzicht'.
  const cat =
    (sector !== "Algemeen" && sector) ||
    (discipline !== "Algemeen" && discipline) ||
    str("categorie") ||
    "Inzicht";
  const auteur = resolve(str("auteur"));
  return {
    slug: row.slug,
    titel: row.titel,
    cat,
    discipline,
    sector,
    datum: fmtDatum(str("datum")),
    leestijd: str("leestijd"),
    auteur: auteur.naam,
    auteurFoto: fotoWebp(auteur.foto),
    image: fotoWebp(str("cover")) || "/assets/photos/team-presentatie-breed.webp",
    intro: str("samenvatting"),
    inhoudHtml: isHtml ? sanitizeFull(inhoud) : undefined,
    body:
      !isHtml && inhoud
        ? inhoud
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean)
        : [],
  };
}

/** Gepubliceerde artikelen uit Supabase, nieuwste eerst (op datum); valt terug op de lib-data. */
export async function getArtikelen(): Promise<Artikel[]> {
  const rows = await getPublishedContent("artikelen");
  if (!rows.length) return ARTIKELEN;
  const resolve = await authorResolver();
  const datum = (r: (typeof rows)[number]) =>
    String((r.data as Record<string, unknown>).datum ?? "");
  return rows
    .slice()
    .sort((a, b) => datum(b).localeCompare(datum(a)))
    .map((r) => mapRow(r, resolve));
}

const SECTOR_SLUG_TO_CAT: Record<string, string> = {
  "publieke-sector": "Publieke sector",
  mobiliteit: "Mobiliteit",
  banken: "Banken",
  zorg: "Zorg",
  manufacturing: "Manufacturing",
};
/** Richting → de disciplinewaarde waarop artikelen gelabeld zijn. */
const RICHTING_TO_DISC: Record<ServiceRichting, string> = {
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

/**
 * Gepubliceerde artikelen voor een richting-hub of een dienstpagina.
 *
 * De discipline wordt afgeleid in plaats van per slug opgezocht: een richting
 * mapt rechtstreeks, een dienst erft de richting waar hij onder hangt. Zo krijgt
 * elke nieuwe dienst vanzelf de juiste inzichten, in plaats van pas nadat
 * iemand eraan denkt een handmatige lijst bij te werken.
 */
export async function getArtikelenVoorDienst(slug: string): Promise<Artikel[]> {
  const richting = (RICHTING_SLUGS as readonly string[]).includes(slug)
    ? (slug as ServiceRichting)
    : (await getServiceBySlug(slug))?.richting;
  if (!richting) return [];
  const disc = RICHTING_TO_DISC[richting];
  return (await getArtikelen()).filter((a) => a.discipline === disc);
}

export async function getArtikelBySlug(slug: string): Promise<Artikel | null> {
  const rows = await getPublishedContent("artikelen");
  const r = rows.find((x) => x.slug === slug);
  if (r) return mapRow(r, await authorResolver());
  // Zie klantverhalen-data.ts: per-slug terugvallen, niet alleen bij een lege tabel.
  return ARTIKEL_MAP[slug] ?? null;
}
