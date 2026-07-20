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
    { key: "heroKickerMobiel", label: "Hero — kicker (mobiel)", type: "text" },
    { key: "heroLeadMobiel", label: "Hero — introtekst (mobiel)", type: "textarea" },
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
    { key: "heroLeadMobiel", label: "Hero — introtekst (mobiel)", type: "textarea" },
  ],
  contact: [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "heroLeadMobiel", label: "Hero — introtekst (mobiel)", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  diensten: [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroTitleEnd", label: "Hero — titel (eind)", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "heroLeadMobiel", label: "Hero — introtekst (mobiel)", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  sectoren: [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "heroLeadMobiel", label: "Hero — introtekst (mobiel)", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  "werken-bij": [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "heroLeadMobiel", label: "Hero — introtekst (mobiel)", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
};

/** Bekende pagina's → hun publieke pad (voor revalidatie na opslaan). */
export const PAGE_PATH: Record<string, string> = {
  home: "/",
  "over-ons": "/over-ons",
  contact: "/contact",
  diensten: "/diensten",
  sectoren: "/sectoren",
  "werken-bij": "/werken-bij",
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
    heroKickerMobiel: "// IT-consultancy voor vijf sectoren",
    heroLeadMobiel:
      "Sectorkennis × Mendix, AI en strategie. Oplossingen die werken voor de mensen die ermee werken.",
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
    heroLeadMobiel:
      "Succesvolle verandering begint bij mensen. Wij verzorgen de randvoorwaarden voor onze Wavers, zij helpen onze partners maximaal digitaal versnellen.",
  },
  contact: {
    heroTitleStart: "Waar kunnen we je ",
    heroAccent: "mee helpen",
    heroLead:
      "Een strategiegesprek plannen kan, maar een korte vraag stellen mag ook gewoon. Bel, mail, app of kom langs, je zit nergens aan vast.",
    heroLeadMobiel: "Bel, mail, app of kom langs, je zit nergens aan vast.",
    ctaTitel: "Liever eerst zien wat we voor anderen deden?",
  },
  diensten: {
    heroTitleStart: "Drie diensten, ",
    heroAccent: "één doel",
    heroTitleEnd: ": jouw resultaat.",
    heroLead:
      "Wij combineren Mendix, AI en digitale strategie tot oplossingen die werken voor de mensen die ermee moeten werken. Altijd vanuit jouw sectorvraagstuk, nooit vanuit de technologie.",
    heroLeadMobiel:
      "Mendix, AI en digitale strategie, altijd vanuit jouw sectorvraagstuk, nooit vanuit de technologie.",
    ctaTitel: "Niet zeker welke dienst bij jouw vraagstuk past?",
  },
  sectoren: {
    heroTitleStart: "Wij spreken de taal van ",
    heroAccent: "jouw sector",
    heroLead:
      "Geen generieke IT-dienstverlener, maar een business-specialist in vijf markten. We kennen de processen, de wetgeving en de systemen, zodat we bij het eerste gesprek al de diepte in kunnen.",
    heroLeadMobiel:
      "Business-specialist in vijf markten. We kennen de processen, de wetgeving en de systemen, zodat het eerste gesprek meteen de diepte in kan.",
    ctaTitel: "Benieuwd wat dit voor jouw organisatie betekent?",
  },
  "werken-bij": {
    heroTitleStart: "Word een ",
    heroAccent: "Waver",
    heroLead:
      "Het is onze droom dat elk mens werk doet dat aansluit bij persoonlijke doelen en drijfveren. Wij verzorgen de randvoorwaarden: een gelijk speelveld, een open cultuur en alle ruimte om te groeien. Jij zorgt voor de versnelling bij onze partners.",
    heroLeadMobiel:
      "Een gelijk speelveld, een open cultuur en alle ruimte om te groeien. Jij zorgt voor de versnelling bij onze partners.",
    ctaTitel: "Eerst een kop koffie? Kom kennismaken.",
  },
};
