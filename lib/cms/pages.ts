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
  "over-ons": [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "missieTitel", label: "Missie — titel", type: "text" },
    { key: "missieP1", label: "Missie — alinea 1", type: "textarea" },
    { key: "missieP2", label: "Missie — alinea 2", type: "textarea" },
    { key: "teamTitel", label: "Team — titel", type: "text" },
    { key: "teamP1", label: "Team — alinea 1", type: "textarea" },
    { key: "teamP2", label: "Team — alinea 2", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
};

/** Bekende pagina's → hun publieke pad (voor revalidatie na opslaan). */
export const PAGE_PATH: Record<string, string> = {
  home: "/",
  "over-ons": "/over-ons",
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
  "over-ons": {
    heroTitleStart: "De ondernemende mens zorgt voor ",
    heroAccent: "vooruitgang",
    heroLead:
      "Wij geloven dat succesvolle verandering begint bij mensen. Daarom verzorgen wij alle randvoorwaarden voor onze Wavers, en helpen zij onze partners maximaal digitaal versnellen. Zo staat jouw organisatie klaar voor de dag van overmorgen.",
    missieTitel: "Maximale digitale impact, met de mens als maat.",
    missieP1:
      "Onze missie is bedrijven te helpen maximale digitale impact te realiseren door technologie én mens centraal te stellen. Met innovatieve low-code- en AI-oplossingen versnellen wij digitale transformatie en dragen we bij aan een duurzame toekomst.",
    missieP2:
      "Dat doen we door op elk project de mensen te kiezen van wie de ervaring, skills en ambitie het beste passen bij jouw vraagstuk. Ons doel? Dat elk mens werk doet dat aansluit bij zijn of haar persoonlijke doelen en drijfveren.",
    teamTitel: "Ontmoet de Wavers.",
    teamP1:
      "Geen anonieme delivery-machine: je kent de mensen die jouw vraagstuk oplossen. Senior consultants en engineers die de taal van de boardroom én de werkvloer spreken, betrokken als partner.",
    teamP2:
      "Van strategische sessies tot livegang en beheer: hetzelfde team blijft aan boord. Zo houden we vaart, kwaliteit en verantwoordelijkheid bij elkaar.",
    ctaTitel: "Benieuwd wat onze mensen voor jouw doelen kunnen betekenen?",
  },
};
