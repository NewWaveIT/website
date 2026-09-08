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
