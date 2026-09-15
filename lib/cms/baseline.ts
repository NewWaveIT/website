// De nulmeting: waar lopen het CMS en de code uit elkaar?
//
// Pure vergelijking, zonder database en zonder React, zodat hij in een unittest
// te bewijzen is. `app/admin/baseline` levert de rijen en de seed aan en rendert
// wat hier uit komt.
//
// De achtergrond staat in CLAUDE.md: de admin is de waarheid en de seed in
// `lib/` is de koude start. Dat mág verschillen, maar in de praktijk was elk
// verschil een bug: een sleutel die een rij nooit gekregen heeft (de site toont
// de seedtekst, de admin een leeg veld), een sleutel die na een schemawijziging
// bleef staan (een redacteur vult iets in dat nergens verschijnt), of een tekst
// die in de code is gecorrigeerd terwijl de rij achterbleef. Geen van drieën is
// zichtbaar zonder ze te tellen.

import { isStructured, type FieldDef } from "@/lib/cms/schema";

export type Categorie =
  | "ontbrekend"
  | "leeg"
  | "ongeldig"
  | "afwijkend"
  | "wees"
  | "alleen-seed"
  | "alleen-cms"
  | "concept";

/**
 * Per categorie: wat het is, wat het op de site doet, en of het weg moet voor
 * een schone nulmeting. `blokkeert: false` betekent "kijk ernaar", niet "fout" —
 * een concept-rij of nieuwe content in het CMS kan precies de bedoeling zijn.
 */
export const CATEGORIEEN: Record<Categorie, { titel: string; gevolg: string; blokkeert: boolean }> =
  {
    ontbrekend: {
      titel: "Sleutel ontbreekt in de rij",
      gevolg:
        "De site toont de seedtekst, de admin een leeg veld. `vulAan` springt bij zonder logregel, dus niets verraadt het.",
      blokkeert: true,
    },
    leeg: {
      titel: "Leeg opgeslagen terwijl de seed tekst heeft",
      gevolg: "Leeg is echt leeg: op de site staat hier niets, in de fallback wel.",
      blokkeert: true,
    },
    ongeldig: {
      titel: "Waarde past niet bij het veldtype",
      gevolg:
        "Het zod-schema keurt de rij af; het leespad valt terug op de seed en logt een console.error per render.",
      blokkeert: true,
    },
    afwijkend: {
      titel: "Tekst wijkt af van de seed",
      gevolg:
        "De site toont iets anders dan de fallback en dan de e2e-tests, die Supabase niet bereiken.",
      blokkeert: true,
    },
    wees: {
      titel: "Sleutel staat niet in het schema",
      gevolg: "Dode data: niets leest hem, de editor toont hem niet, hij blijft staan.",
      blokkeert: true,
    },
    "alleen-seed": {
      titel: "Wel in de seed, geen rij",
      gevolg:
        "Zodra de tabel gevuld is verdwijnt dit item van de site; de fallback kent het nog wel.",
      blokkeert: true,
    },
    "alleen-cms": {
      titel: "Wel een rij, niet in de seed",
      gevolg: "Valt Supabase weg, dan verdwijnt dit item. Voor nieuwe content is dat normaal.",
      blokkeert: false,
    },
    concept: {
      titel: "Op concept terwijl de seed hem kent",
      gevolg: "Niet zichtbaar op de site, wel in de fallback.",
      blokkeert: false,
    },
  };

export interface Bevinding {
  categorie: Categorie;
  /** Contenttype, zoals het in de admin heet. */
  soort: string;
  slug: string;
  veld: string;
  cms: string;
  seed: string;
}

export interface RijInvoer {
  slug: string;
  status: string;
  data: Record<string, unknown>;
}

export interface SoortInvoer {
  soort: string;
  /** Per slug het veldschema; `paginas` heeft er één per pagina. */
  velden: (slug: string) => readonly FieldDef[] | undefined;
  rijen: RijInvoer[];
  /** De seed, op slug. Leeg object = dit type heeft geen seed. */
  seed: Record<string, Record<string, unknown>>;
  /**
   * False als de seed een andere vorm heeft dan de rij en waarden dus niet
   * één-op-één te vergelijken zijn. Alleen `artikelen`: dat type hernoemt bij
   * het lezen (`cover`→`image`, `samenvatting`→`intro`) en splitst de body.
   */
  vergelijkWaarden: boolean;
}

/** Tekstwaarden zoals het leespad ze ziet; zie `fotoWebp` en de CRLF-val. */
export type Normaliseer = (s: string) => string;

function isLeeg(v: unknown): boolean {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "object") return Object.keys(v as object).length === 0;
  return false;
}

/**
 * Sorteert objectsleutels recursief, zodat twee gelijke structuren ook gelijke
 * tekst opleveren. Supabase levert `data` als geparste JSON aan, dus dit
 * vergelijkt JS-waarde met JS-waarde — geen gedoe met hoe Postgres jsonb
 * uitschrijft.
 */
function canoniek(v: unknown, normaliseer: Normaliseer): unknown {
  if (typeof v === "string") return normaliseer(v);
  if (Array.isArray(v)) return v.map((x) => canoniek(x, normaliseer));
  if (v && typeof v === "object") {
    return Object.fromEntries(
      Object.entries(v as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, x]) => [k, canoniek(x, normaliseer)]),
    );
  }
  return v;
}

function gelijk(a: unknown, b: unknown, normaliseer: Normaliseer): boolean {
  return JSON.stringify(canoniek(a, normaliseer)) === JSON.stringify(canoniek(b, normaliseer));
}

/** Eén regel in de tabel: kort genoeg om te lezen, lang genoeg om te herkennen. */
export function kort(v: unknown, max = 120): string {
  if (v === undefined) return "—";
  const s = typeof v === "string" ? v : JSON.stringify(v);
  const een = s.replace(/\s+/g, " ").trim();
  return een.length > max ? `${een.slice(0, max)}…` : een;
}

/** Klopt het JS-type van de waarde met wat het veldtype belooft? */
function typeKlopt(f: FieldDef, v: unknown): boolean {
  if (isStructured(f.type)) {
    return f.type === "group" ? typeof v === "object" && !Array.isArray(v) : Array.isArray(v);
  }
  if (f.type === "number") return typeof v === "number" || v === "";
  return typeof v === "string";
}

const VOLGORDE: Categorie[] = [
  "ontbrekend",
  "wees",
  "ongeldig",
  "leeg",
  "afwijkend",
  "alleen-seed",
  "concept",
  "alleen-cms",
];

export function vergelijk(invoer: SoortInvoer[], normaliseer: Normaliseer): Bevinding[] {
  const uit: Bevinding[] = [];

  for (const { soort, velden, rijen, seed, vergelijkWaarden } of invoer) {
    const opSlug = new Map(rijen.map((r) => [r.slug, r]));
    const slugs = [...new Set([...Object.keys(seed), ...rijen.map((r) => r.slug)])].sort();

    for (const slug of slugs) {
      const rij = opSlug.get(slug);
      const zaad = seed[slug];
      const schema = velden(slug) ?? [];

      if (!rij) {
        uit.push({ categorie: "alleen-seed", soort, slug, veld: "", cms: "—", seed: "in de seed" });
        continue;
      }
      if (!zaad) {
        uit.push({ categorie: "alleen-cms", soort, slug, veld: "", cms: rij.status, seed: "—" });
      } else if (rij.status !== "live") {
        uit.push({ categorie: "concept", soort, slug, veld: "", cms: rij.status, seed: "live" });
      }

      const bekend = new Set(schema.map((f) => f.key));
      for (const f of schema) {
        const heeft = Object.hasOwn(rij.data, f.key);
        const waarde = rij.data[f.key];
        const zaadWaarde = zaad?.[f.key];

        if (!heeft) {
          uit.push({
            categorie: "ontbrekend",
            soort,
            slug,
            veld: f.key,
            cms: "—",
            seed: kort(zaadWaarde),
          });
          continue;
        }
        if (!typeKlopt(f, waarde)) {
          uit.push({
            categorie: "ongeldig",
            soort,
            slug,
            veld: f.key,
            cms: kort(waarde),
            seed: f.type,
          });
          continue;
        }
        if (!zaad || !vergelijkWaarden || zaadWaarde === undefined) continue;
        if (gelijk(waarde, zaadWaarde, normaliseer)) continue;
        uit.push({
          categorie: isLeeg(waarde) && !isLeeg(zaadWaarde) ? "leeg" : "afwijkend",
          soort,
          slug,
          veld: f.key,
          cms: kort(waarde),
          seed: kort(zaadWaarde),
        });
      }

      for (const sleutel of Object.keys(rij.data)) {
        if (bekend.has(sleutel)) continue;
        uit.push({
          categorie: "wees",
          soort,
          slug,
          veld: sleutel,
          cms: kort(rij.data[sleutel]),
          seed: "—",
        });
      }
    }
  }

  return uit.sort(
    (a, b) =>
      VOLGORDE.indexOf(a.categorie) - VOLGORDE.indexOf(b.categorie) ||
      a.soort.localeCompare(b.soort) ||
      a.slug.localeCompare(b.slug) ||
      a.veld.localeCompare(b.veld),
  );
}

/** Aantal per categorie, in dezelfde volgorde als de tabel. */
export function tel(bevindingen: Bevinding[]): { categorie: Categorie; aantal: number }[] {
  return VOLGORDE.map((categorie) => ({
    categorie,
    aantal: bevindingen.filter((b) => b.categorie === categorie).length,
  })).filter((r) => r.aantal > 0);
}

/** Blokkeert nog iets een schone nulmeting? */
export function blokkerend(bevindingen: Bevinding[]): number {
  return bevindingen.filter((b) => CATEGORIEEN[b.categorie].blokkeert).length;
}
