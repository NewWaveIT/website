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
    { key: "waaromKicker", label: "Waarom wij — kicker", type: "text" },
    { key: "waaromTitel", label: "Waarom wij — titel", type: "text" },
    { key: "waarom1Titel", label: "Waarom 1 — titel", type: "text" },
    { key: "waarom1Tekst", label: "Waarom 1 — tekst", type: "textarea" },
    { key: "waarom2Titel", label: "Waarom 2 — titel", type: "text" },
    { key: "waarom2Tekst", label: "Waarom 2 — tekst", type: "textarea" },
    { key: "waarom3Titel", label: "Waarom 3 — titel", type: "text" },
    { key: "waarom3Tekst", label: "Waarom 3 — tekst", type: "textarea" },
    { key: "waarom4Titel", label: "Waarom 4 — titel", type: "text" },
    { key: "waarom4Tekst", label: "Waarom 4 — tekst", type: "textarea" },
    { key: "mensenKicker", label: "Mensen — kicker", type: "text" },
    { key: "mensenTitel", label: "Mensen — titel", type: "text" },
    { key: "mensenP1", label: "Mensen — alinea 1", type: "textarea" },
    { key: "mensenP2", label: "Mensen — alinea 2", type: "textarea" },
    { key: "joinusKicker", label: "Word een Waver — kicker", type: "text" },
    { key: "joinusTitel", label: "Word een Waver — titel", type: "text" },
    { key: "joinusLead", label: "Word een Waver — introtekst", type: "textarea" },
    { key: "leadgenKicker", label: "Lead-gen — kicker", type: "text" },
    { key: "leadgenTitel", label: "Lead-gen — titel", type: "text" },
    { key: "leadgenIntro", label: "Lead-gen — intro", type: "textarea" },
    { key: "lead1Aud", label: "Lead-kaart 1 — doelgroep", type: "text" },
    { key: "lead1Titel", label: "Lead-kaart 1 — titel", type: "text" },
    { key: "lead1Tekst", label: "Lead-kaart 1 — tekst", type: "textarea" },
    { key: "lead2Aud", label: "Lead-kaart 2 — doelgroep", type: "text" },
    { key: "lead2Titel", label: "Lead-kaart 2 — titel", type: "text" },
    { key: "lead2Tekst", label: "Lead-kaart 2 — tekst", type: "textarea" },
    { key: "lead3Aud", label: "Lead-kaart 3 — doelgroep", type: "text" },
    { key: "lead3Titel", label: "Lead-kaart 3 — titel", type: "text" },
    { key: "lead3Tekst", label: "Lead-kaart 3 — tekst", type: "textarea" },
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
    { key: "waardenKicker", label: "Waarden — kicker", type: "text" },
    { key: "waardenTitel", label: "Waarden — titel", type: "text" },
    { key: "waarde1Titel", label: "Waarde 1 — titel", type: "text" },
    { key: "waarde1Tekst", label: "Waarde 1 — tekst", type: "textarea" },
    { key: "waarde2Titel", label: "Waarde 2 — titel", type: "text" },
    { key: "waarde2Tekst", label: "Waarde 2 — tekst", type: "textarea" },
    { key: "waarde3Titel", label: "Waarde 3 — titel", type: "text" },
    { key: "waarde3Tekst", label: "Waarde 3 — tekst", type: "textarea" },
    { key: "waarde4Titel", label: "Waarde 4 — titel", type: "text" },
    { key: "waarde4Tekst", label: "Waarde 4 — tekst", type: "textarea" },
  ],
  contact: [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "heroLeadMobiel", label: "Hero — introtekst (mobiel)", type: "textarea" },
    { key: "verwachtTitel", label: "Wat je kunt verwachten — titel", type: "text" },
    { key: "verwacht1Titel", label: "Stap 1 — titel", type: "text" },
    { key: "verwacht1Tekst", label: "Stap 1 — tekst", type: "textarea" },
    { key: "verwacht2Titel", label: "Stap 2 — titel", type: "text" },
    { key: "verwacht2Tekst", label: "Stap 2 — tekst", type: "textarea" },
    { key: "verwacht3Titel", label: "Stap 3 — titel", type: "text" },
    { key: "verwacht3Tekst", label: "Stap 3 — tekst", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  diensten: [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroTitleEnd", label: "Hero — titel (eind)", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "heroLeadMobiel", label: "Hero — introtekst (mobiel)", type: "textarea" },
    { key: "samenKicker", label: "Sterker samen — kicker", type: "text" },
    { key: "samenTitel", label: "Sterker samen — titel", type: "text" },
    { key: "samenIntro", label: "Sterker samen — intro", type: "textarea" },
    { key: "samen1Titel", label: "Combinatie 1 — titel", type: "text" },
    { key: "samen1Tekst", label: "Combinatie 1 — tekst", type: "textarea" },
    { key: "samen2Titel", label: "Combinatie 2 — titel", type: "text" },
    { key: "samen2Tekst", label: "Combinatie 2 — tekst", type: "textarea" },
    { key: "samen3Titel", label: "Combinatie 3 — titel", type: "text" },
    { key: "samen3Tekst", label: "Combinatie 3 — tekst", type: "textarea" },
    { key: "sectstripKicker", label: "Sectorstrip — kicker", type: "text" },
    { key: "sectstripTitel", label: "Sectorstrip — titel", type: "text" },
    { key: "sectstripIntro", label: "Sectorstrip — intro", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  sectoren: [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "heroLeadMobiel", label: "Hero — introtekst (mobiel)", type: "textarea" },
    { key: "werkwijzeKicker", label: "Waarom sectorfocus — kicker", type: "text" },
    { key: "werkwijzeTitel", label: "Waarom sectorfocus — titel", type: "text" },
    { key: "wijze1Titel", label: "Reden 1 — titel", type: "text" },
    { key: "wijze1Tekst", label: "Reden 1 — tekst", type: "textarea" },
    { key: "wijze2Titel", label: "Reden 2 — titel", type: "text" },
    { key: "wijze2Tekst", label: "Reden 2 — tekst", type: "textarea" },
    { key: "wijze3Titel", label: "Reden 3 — titel", type: "text" },
    { key: "wijze3Tekst", label: "Reden 3 — tekst", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  "werken-bij": [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "heroLeadMobiel", label: "Hero — introtekst (mobiel)", type: "textarea" },
    { key: "groeiKicker", label: "Groei — kicker", type: "text" },
    { key: "groeiTitel", label: "Groei — titel", type: "text" },
    { key: "groeiIntro", label: "Groei — intro", type: "textarea" },
    { key: "groei1Titel", label: "Groei 1 — titel", type: "text" },
    { key: "groei1Tekst", label: "Groei 1 — tekst", type: "textarea" },
    { key: "groei2Titel", label: "Groei 2 — titel", type: "text" },
    { key: "groei2Tekst", label: "Groei 2 — tekst", type: "textarea" },
    { key: "groei3Titel", label: "Groei 3 — titel", type: "text" },
    { key: "groei3Tekst", label: "Groei 3 — tekst", type: "textarea" },
    { key: "tpKicker", label: "Total People — kicker", type: "text" },
    { key: "tpTitel", label: "Total People — titel", type: "text" },
    { key: "tpIntro", label: "Total People — intro", type: "textarea" },
    { key: "tp1Titel", label: "Total People 1 — titel", type: "text" },
    { key: "tp1Tekst", label: "Total People 1 — tekst", type: "textarea" },
    { key: "tp2Titel", label: "Total People 2 — titel", type: "text" },
    { key: "tp2Tekst", label: "Total People 2 — tekst", type: "textarea" },
    { key: "tp3Titel", label: "Total People 3 — titel", type: "text" },
    { key: "tp3Tekst", label: "Total People 3 — tekst", type: "textarea" },
    { key: "cultuurKicker", label: "Cultuur — kicker", type: "text" },
    { key: "cultuurTitel", label: "Cultuur — titel", type: "text" },
    { key: "cultuurP", label: "Cultuur — tekst", type: "textarea" },
    { key: "cultuur1", label: "Cultuur — punt 1", type: "text" },
    { key: "cultuur2", label: "Cultuur — punt 2", type: "text" },
    { key: "cultuur3", label: "Cultuur — punt 3", type: "text" },
    { key: "cultuur4", label: "Cultuur — punt 4", type: "text" },
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
      "Business-specialist in publieke sector · mobiliteit · banken · zorg · manufacturing",
    heroTitleStart: "Wij maken van business en IT ",
    heroAccent: "één beweging",
    heroLead:
      "The New Wave IT combineert diepgaande sectorkennis met Mendix, AI en strategie. Zo vertalen we jouw ambitie naar oplossingen die werken voor de mensen die ermee moeten werken.",
    heroCtaPrimair: "Plan een strategiegesprek",
    heroCtaVideo: "Bekijk klantverhalen",
    statementKicker: "Plan · build · run",
    statementTitel: "Wij adviseren niet alleen. Wij bouwen, leveren en beheren.",
    statementBody:
      "Hetzelfde senior team dat jouw strategie mee vormgeeft, staat ook aan de knoppen bij bouw en beheer. Zo blijft verantwoordelijkheid op één plek en houden we vaart tot ver na livegang.",
    ctaTitel: "Klaar om samen te bouwen aan meetbare groei?",
    ctaKnop: "Plan een strategiegesprek",
    heroKickerMobiel: "IT-consultancy voor vijf sectoren",
    heroLeadMobiel:
      "Sectorkennis × Mendix, AI en strategie. Oplossingen die werken voor de mensen die ermee werken.",
    waaromKicker: "Waarom sectorleiders voor ons kiezen",
    waaromTitel: "Senioriteit die je merkt vanaf gesprek één.",
    waarom1Titel: "Bewezen impact",
    waarom1Tekst:
      "Meetbare resultaten in publieke sector, mobiliteit, banken, zorg en manufacturing. Geen beloftes, wel cijfers.",
    waarom2Titel: "Senior teams",
    waarom2Tekst:
      "Consultants die de taal van de boardroom én de shopfloor spreken. Betrokken als partner, niet als leverancier.",
    waarom3Titel: "Eén team, plan-build-run",
    waarom3Tekst:
      "Hetzelfde team adviseert, bouwt én beheert. Zo houden we vaart, kwaliteit en verantwoordelijkheid bij elkaar.",
    waarom4Titel: "Sectorkennis & compliance",
    waarom4Tekst:
      "We kennen de regels en systemen van jouw markt: auditproof, veilig en schaalbaar vanaf dag één.",
    mensenKicker: "De mens centraal",
    mensenTitel: "Je werkt met mensen, niet met een leverancier.",
    mensenP1:
      "Geen anonieme delivery-machine: bij ons ken je de mensen die jouw vraagstuk oplossen. Gepassioneerde consultants en engineers die naast je team staan, van eerste sessie tot livegang en daarna.",
    mensenP2:
      "Ons doel? Dat jouw mensen er beter van worden. Technologie is het middel, de mens is de maat.",
    joinusKicker: "Werken bij The New Wave IT",
    joinusTitel: "Bouw je aan onze klanten, of word je er zelf een?",
    joinusLead:
      "Dezelfde mensen die naast onze klanten staan, kiezen hier hun eigen groeipad. Een gelijk speelveld, open feedback en ruimte om te ondernemen. Misschien versterk jij straks de golf.",
    leadgenKicker: "Zet de volgende stap",
    leadgenTitel: "Kies het gesprek dat bij je past",
    leadgenIntro:
      "Of je nu strategisch verkent of concreet wilt starten: er is een passende ingang.",
    lead1Aud: "Voor directie & C-suite",
    lead1Titel: "Strategiegesprek",
    lead1Tekst:
      "Een vrijblijvend gesprek van 45 minuten over jouw sectorvraagstuk en waar technologie het verschil maakt.",
    lead2Aud: "Voor IT & afdelingsmanagers",
    lead2Titel: "Quick scan",
    lead2Tekst:
      "In één sessie brengen we samen je grootste kans in kaart, met een concreet vervolgadvies.",
    lead3Aud: "Voor de verdieping",
    lead3Titel: "Sectorrapport",
    lead3Tekst:
      "Download het rapport voor jouw markt: businessvraagstukken, benchmarks en concrete outcomes.",
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
    waardenKicker: "Waar wij voor staan",
    waardenTitel: "Vier overtuigingen die je terugziet in ons werk",
    waarde1Titel: "De mens 100% centraal",
    waarde1Tekst:
      "Technologie is het middel. We bouwen oplossingen rond de mensen die ermee moeten werken, bij jou en bij ons.",
    waarde2Titel: "Gelijk speelveld",
    waarde2Tekst:
      "Beloning is bij ons gelijk en transparant voor iedereen met dezelfde ervaring, ongeacht gender of achtergrond.",
    waarde3Titel: "Verschillen versterken",
    waarde3Tekst:
      "Elk mens is gelijk. We geloven dat diverse teams tot betere oplossingen komen, voor onze partners en elkaar.",
    waarde4Titel: "Duurzaam ondernemen",
    waarde4Tekst:
      "Ondernemen en maatschappelijke bijdrage horen bij elkaar. In 2030 is ons businessmodel 100% CO2-neutraal.",
  },
  contact: {
    heroTitleStart: "Waar kunnen we je ",
    heroAccent: "mee helpen",
    heroLead:
      "Een strategiegesprek plannen kan, maar een korte vraag stellen mag ook gewoon. Bel, mail, app of kom langs, je zit nergens aan vast.",
    heroLeadMobiel: "Bel, mail, app of kom langs, je zit nergens aan vast.",
    verwachtTitel: "Wat je kunt verwachten",
    verwacht1Titel: "Voorbereiding",
    verwacht1Tekst:
      "We verdiepen ons vooraf in jouw sector en organisatie, zodat het gesprek meteen de diepte in kan.",
    verwacht2Titel: "Het gesprek",
    verwacht2Tekst:
      "45 minuten met een practice lead, over jouw businessvraagstuk, niet over onze diensten.",
    verwacht3Titel: "Concreet vervolg",
    verwacht3Tekst:
      "Binnen drie dagen een eerste analyse met mogelijke routes, geheel vrijblijvend.",
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
    samenKicker: "Sterker samen",
    samenTitel: "Waarom de combinatie werkt",
    samenIntro:
      "De meeste vraagstukken vragen niet om één dienst, maar om de juiste mix. Zo grijpen ze in elkaar.",
    samen1Titel: "Van roadmap naar werkende applicatie",
    samen1Tekst:
      "De roadmap bepaalt welke applicatie het eerst waarde oplevert; binnen weken staat de eerste versie in productie.",
    samen2Titel: "Slimme processen in je eigen apps",
    samen2Tekst:
      "AI direct in je bedrijfsapplicaties: van slimme formulieren tot automatische triage van aanvragen.",
    samen3Titel: "Data die je koers scherpt",
    samen3Tekst:
      "Inzichten uit pilots voeden de volgende strategische keuzes, leren en bijsturen in korte cycli.",
    sectstripKicker: "Sectorkennis eerst",
    sectstripTitel: "Altijd vanuit jouw sector",
    sectstripIntro:
      "Elke dienst begint bij het businessvraagstuk van jouw sector, bekijk hoe we dat per markt aanpakken.",
    ctaTitel: "Niet zeker welke dienst bij jouw vraagstuk past?",
  },
  sectoren: {
    heroTitleStart: "Wij spreken de taal van ",
    heroAccent: "jouw sector",
    heroLead:
      "Geen generieke IT-dienstverlener, maar een business-specialist in vijf markten. We kennen de processen, de wetgeving en de systemen, zodat we bij het eerste gesprek al de diepte in kunnen.",
    heroLeadMobiel:
      "Business-specialist in vijf markten. We kennen de processen, de wetgeving en de systemen, zodat het eerste gesprek meteen de diepte in kan.",
    werkwijzeKicker: "Waarom sectorfocus",
    werkwijzeTitel: "Wat sectorkennis je oplevert",
    wijze1Titel: "Geen inwerktijd",
    wijze1Tekst:
      "We kennen de wetgeving, ketens en kernsystemen van jouw markt. Het eerste gesprek gaat meteen over jouw vraagstuk.",
    wijze2Titel: "Bewezen patronen",
    wijze2Tekst:
      "Oplossingen die zich in jouw sector al bewezen hebben, vertalen we naar jouw organisatie, sneller live, minder risico.",
    wijze3Titel: "Netwerk dat meedenkt",
    wijze3Tekst:
      "Via onze partners en klanten in de sector leer je van organisaties die hetzelfde vraagstuk al oplosten.",
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
    groeiKicker: "Groei & ontwikkeling",
    groeiTitel: "Elke dag samen beter worden",
    groeiIntro:
      "Persoonlijke aandacht en focus op groei zijn de kern. Samen verkennen we meerdere routes naar jouw ambitie en kiezen we de best passende weg.",
    groei1Titel: "Persoonlijk groeipad",
    groei1Tekst:
      "Jouw route bestaat uit activiteiten on-the-job, cursussen en trainingen, gekozen op basis van jouw ambitie, niet een standaardlijstje.",
    groei2Titel: "Open feedbackcultuur",
    groei2Tekst:
      "Regelmatige, open en eerlijke feedback hoort bij onze cultuur. Elk half jaar haal je bovendien 360°-feedback op uit je omgeving.",
    groei3Titel: "Learning week",
    groei3Tekst:
      "Jaarlijks trekken we er met z'n allen een volle week op uit om samen te ontwikkelen: vakinhoudelijk én persoonlijk.",
    tpKicker: "Total People",
    tpTitel: "Presteren, groeien én ontspannen",
    tpIntro:
      "Bij ons staat het Total People-principe centraal: de balans tussen presteren, groeien en ontspannen. Jouw groei is onze groei.",
    tp1Titel: "Presteren",
    tp1Tekst:
      "Uitdagende opdrachten bij partners in de publieke sector, mobiliteit, banken, zorg en manufacturing. Een rol op maat die jij zelf kiest.",
    tp2Titel: "Groeien",
    tp2Tekst:
      "Zeggenschap over de koers: je beslist mee over strategie en investeringen van onze organisatie. Plus een persoonlijk groeipad met open feedback.",
    tp3Titel: "Ontspannen",
    tp3Tekst:
      "Werk dat aansluit bij jouw doelen en drijfveren, met ruimte voor rust. Duurzaam onderweg in een elektrische auto van de zaak.",
    cultuurKicker: "Onze cultuur",
    cultuurTitel: "Ondernemende mensen, gelijk speelveld.",
    cultuurP:
      "Wij geloven dat de ondernemende mens zorgt voor vooruitgang en succesvolle verandering. Dat vraagt om een omgeving waarin iedereen gelijk is en verschillen versterken.",
    cultuur1: "Gelijke, transparante beloning bij gelijke ervaring, ongeacht gender of achtergrond",
    cultuur2: "Projecten gekozen op jouw ervaring, skills én ambitie",
    cultuur3: "Zeggenschap: meebeslissen over strategie en investeringen",
    cultuur4: "Maatschappelijke impact: duurzaamheid, gendergelijkheid en arbeidsparticipatie",
  },
};
