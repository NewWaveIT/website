import "server-only";
import { getPublishedContent, fotoWebp, type ContentRow } from "@/lib/cms/content";
import { ARTIKELEN, ARTIKEL_MAP, type Artikel } from "@/lib/inzichten";
import { isoDatum } from "@/lib/datum";

// Doorgeven: veel serverbestanden importeerden isoDatum hiervandaan.
export { isoDatum };
import { getTeamleden } from "@/lib/team-data";
import { getServiceBySlug } from "@/lib/services-data";
import { RICHTING_SLUGS } from "@/lib/diensten-detail";
import type { ServiceRichting } from "@/lib/services";
import { sanitizeFull } from "@/lib/cms/sanitize";

type AuthorResolver = (raw: string) => { naam: string; foto?: string; rol?: string };

async function authorResolver(): Promise<AuthorResolver> {
  const team = await getTeamleden();
  const bySlug = new Map(team.map((m) => [m.slug, m]));
  const byNaam = new Map(team.map((m) => [m.naam, m]));
  return (raw: string) => {
    const m = bySlug.get(raw) ?? byNaam.get(raw);
    if (m) return { naam: m.naam, foto: m.foto, rol: m.rol };
    return { naam: raw || "The New Wave IT" };
  };
}

/**
 * Leestijd uit de tekst zelf, als de redactie het veld leeg liet.
 *
 * Het sjabloon zette er onvoorwaardelijk " leestijd" achter, dus een leeg veld
 * gaf letterlijk " leestijd - 18 sep 2026". Afleiden is beter dan een veld dat
 * iemand moet onthouden: 200 woorden per minuut is de gangbare maat voor
 * lopende tekst, en minimaal één minuut, want "0 min" leest als een fout.
 */
export function leestijdUitTekst(tekst: string): string {
  const woorden = tekst
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(woorden / 200))} min`;
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

/**
 * Het enige contenttype met een eigen mapRow, en bewust zo — zie de toelichting
 * in `lib/cms/rij.ts`. Artikelen doen echte transformatie (datumnotatie,
 * HTML-detectie, auteur opzoeken in het team) en hun rij-sleutels verschillen
 * van de uitvoer (`cover`→`image`, `samenvatting`→`intro`, `inhoud`→`body`).
 * Er is hier ook niets te beschermen: elk veld heeft een totale fallback en de
 * seed wordt nooit over een CMS-waarde gelegd, dus geen rij kan half renderen.
 */
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
    leestijd: str("leestijd") || leestijdUitTekst(inhoud),
    auteur: auteur.naam,
    auteurFoto: fotoWebp(auteur.foto),
    auteurRol: auteur.rol,
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

/**
 * De seed kent alleen de naam van de auteur, geen foto en geen functie: die
 * staan bij de teamleden. Zonder deze stap toont de koude start een byline
 * zonder portret en geen auteursblok, terwijl dezelfde pagina uit het CMS ze
 * wel heeft. Het verschil viel niet op zolang er nog geen auteursblok was.
 */
async function metAuteur(artikelen: Artikel[]): Promise<Artikel[]> {
  const resolve = await authorResolver();
  return artikelen.map((a) => {
    const m = resolve(a.auteur);
    return {
      ...a,
      auteur: m.naam,
      auteurFoto: fotoWebp(m.foto) || a.auteurFoto,
      auteurRol: m.rol ?? a.auteurRol,
    };
  });
}

/** Gepubliceerde artikelen uit Supabase, nieuwste eerst (op datum); valt terug op de lib-data. */
export async function getArtikelen(): Promise<Artikel[]> {
  const rows = await getPublishedContent("artikelen");
  if (!rows.length) return metAuteur(ARTIKELEN);
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
  const uitSeed = ARTIKEL_MAP[slug];
  if (!uitSeed) return null;
  return (await metAuteur([uitSeed]))[0] ?? null;
}
