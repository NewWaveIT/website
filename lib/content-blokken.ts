/**
 * Inhoudsblokken die zowel een richting-hub als een dienstpagina kan tonen.
 *
 * Ze staan hier los omdat ze bij geen van beide horen: `lib/diensten-detail.ts`
 * (de drie richtingen) en `lib/services.ts` (de negen diensten) gebruiken
 * dezelfde vormen, en de gedeelde sectiecomponenten in
 * `components/diensten/secties/` renderen ze. Eén definitie, zodat de twee
 * pagina's niet uit elkaar kunnen lopen.
 *
 * Client-veilig: geen `server-only`, want `lib/services.ts` wordt ook door het
 * contactformulier geïmporteerd.
 */

export interface KPI {
  n: string;
  l: string;
}

export interface Vraagstuk {
  q: string;
  titel: string;
  p: string;
}

export interface PijlerItem {
  summary: string;
  p: string;
}

export interface Pijler {
  num: string;
  titel: string;
  p: string;
  items: PijlerItem[];
}

export interface AanpakRow {
  kicker: string;
  titel: string;
  p: string;
  punten: string[];
  img: string;
}

export interface WaaromItem {
  titel: string;
  p: string;
}

export interface Expert {
  img: string;
  role: string;
  naam: string;
  tel: string;
}

export interface Insight {
  cat: string;
  meta: string;
  titel: string;
}

/** Verwijzing naar een gepubliceerd klantverhaal. Alleen invullen als het écht
 *  bestaat — geen fictieve quotes of namen. Leeg = de sectie is verborgen. */
export interface CaseVerwijzing {
  caseTitle?: string;
  caseSector?: string;
  caseQuote?: string;
  caseNaam?: string;
  caseRol?: string;
  caseImage?: string;
  caseHref?: string;
}

/* ---------------------------------------------------------------
   Blokken van de dienstdetailpagina (ontwerp september 2026).
   Alle negen diensten delen één sjabloon; per dienst is elk blok
   optioneel, en een leeg blok verbergt zijn hele sectie.
   --------------------------------------------------------------- */

/** Eén kolom in de feitenregel onder de hero-tekst. */
export interface Feit {
  label: string;
  waarde: string;
}

/** Regel in "Wat je meeneemt": lucide-icoonnaam, kop en toelichting. */
export interface Meeneem {
  icon: string;
  titel: string;
  tekst: string;
}

/** Blok in het programma. `tijd` is vrije tekst: "09:00" of "Week 1". */
export interface DagSlot {
  tijd: string;
  titel: string;
  tekst: string;
}

/** Vervolgdienst mét de reden waarom die logisch volgt op deze. */
export interface Vervolg {
  slug: string;
  reden: string;
}

/** Vraag en antwoord. Gedeeld met de sectorpagina's. */
export interface FaqItem {
  vraag: string;
  antwoord: string;
}
