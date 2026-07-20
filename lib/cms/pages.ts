// Per-pagina veldschema's voor het contenttype 'paginas'. Anders dan de andere
// typen heeft elke pagina (slug) zijn eigen set velden. De editor en de
// opslag-actie gebruiken deze wanneer het type 'paginas' is.

import type { FieldDef } from "./schema";

export const PAGE_FIELDS: Record<string, FieldDef[]> = {
  home: [
    { key: "heroKicker", label: "Hero — kicker", type: "text" },
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "heroCtaPrimair", label: "Hero — knop primair", type: "text" },
    { key: "heroCtaVideo", label: "Hero — knop video", type: "text" },
    { key: "statementKicker", label: "Statement — kicker", type: "text" },
    { key: "statementTitel", label: "Statement — titel", type: "textarea" },
    { key: "statementBody", label: "Statement — tekst", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
    { key: "ctaKnop", label: "Slot-CTA — knoptekst", type: "text" },
  ],
};

/** Bekende pagina's → hun publieke pad (voor revalidatie na opslaan). */
export const PAGE_PATH: Record<string, string> = {
  home: "/",
};

/** Standaardteksten per pagina (fallback op de site + startwaarde in de editor). */
export const PAGE_DEFAULTS: Record<string, Record<string, string>> = {
  home: {
    heroKicker:
      "// Business-specialist in publieke sector · mobiliteit · banken · zorg · manufacturing",
    heroTitleStart: "Wij maken van business en IT ",
    heroAccent: "één beweging",
    heroLead:
      "The New Wave IT combineert diepgaande sectorkennis met Mendix, AI en strategie. Zo vertalen we jouw ambitie naar oplossingen die werken voor de mensen die ermee moeten werken.",
    heroCtaPrimair: "Plan een strategiegesprek",
    heroCtaVideo: "Bekijk klantverhalen",
    statementKicker: "// Plan · build · run",
    statementTitel: "Wij adviseren niet alleen. Wij bouwen, leveren en beheren.",
    statementBody:
      "Hetzelfde senior team dat jouw strategie mee vormgeeft, staat ook aan de knoppen bij bouw en beheer. Zo blijft verantwoordelijkheid op één plek en houden we vaart tot ver na livegang.",
    ctaTitel: "Klaar om samen te bouwen aan meetbare groei?",
    ctaKnop: "Plan een strategiegesprek",
  },
};
