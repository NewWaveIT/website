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

    { key: "basisKicker", label: "Basisdienst — kicker", type: "text" },
    { key: "basisTitel", label: "Basisdienst — titel", type: "text" },
    { key: "basisTekst", label: "Basisdienst — tekst", type: "textarea" },
    { key: "basisRol1Label", label: "Basisdienst — rol 1: spoor", type: "text" },
    { key: "basisRol1Naam", label: "Basisdienst — rol 1: rol", type: "text" },
    { key: "basisRol1Tekst", label: "Basisdienst — rol 1: toelichting", type: "text" },
    { key: "basisRol2Label", label: "Basisdienst — rol 2: spoor", type: "text" },
    { key: "basisRol2Naam", label: "Basisdienst — rol 2: rol", type: "text" },
    { key: "basisRol2Tekst", label: "Basisdienst — rol 2: toelichting", type: "text" },
    { key: "basisRol3Label", label: "Basisdienst — rol 3: spoor", type: "text" },
    { key: "basisRol3Naam", label: "Basisdienst — rol 3: rol", type: "text" },
    { key: "basisRol3Tekst", label: "Basisdienst — rol 3: toelichting", type: "text" },
    { key: "basisRol4Label", label: "Basisdienst — rol 4: spoor", type: "text" },
    { key: "basisRol4Naam", label: "Basisdienst — rol 4: rol", type: "text" },
    { key: "basisRol4Tekst", label: "Basisdienst — rol 4: toelichting", type: "text" },
    { key: "basisPersoonRol", label: "Basisdienst — kaart: label boven de naam", type: "text" },
    { key: "basisPersoonTekst", label: "Basisdienst — kaart: tekst bij de foto", type: "textarea" },
    { key: "basisInzetLabel", label: "Basisdienst — kaart: label bij de inzet", type: "text" },
    { key: "basisInzetWaarde", label: "Basisdienst — kaart: inzet", type: "text" },
    { key: "basisPunt1", label: "Basisdienst — kaart: punt 1", type: "text" },
    { key: "basisPunt2", label: "Basisdienst — kaart: punt 2", type: "text" },
    { key: "basisPunt3", label: "Basisdienst — kaart: punt 3", type: "text" },
    { key: "basisPunt4", label: "Basisdienst — kaart: punt 4", type: "text" },
    { key: "basisCta", label: "Basisdienst — knop", type: "text" },
    { key: "basisCtaAlt", label: "Basisdienst — tweede link", type: "text" },

    { key: "instapKicker", label: "Instapdiensten — kicker", type: "text" },
    { key: "instapTitel", label: "Instapdiensten — titel", type: "text" },
    { key: "instapIntro", label: "Instapdiensten — intro", type: "textarea" },

    { key: "verdiepingKicker", label: "Verdieping — kicker", type: "text" },
    { key: "verdiepingTitel", label: "Verdieping — titel", type: "text" },
    { key: "verdiepingIntro", label: "Verdieping — intro", type: "textarea" },
    { key: "verdiepingRichtingTekst", label: "Verdieping — tekst bij 'Richting'", type: "text" },
    {
      key: "verdiepingCapaciteitTekst",
      label: "Verdieping — tekst bij 'Capaciteit'",
      type: "text",
    },

    // De vijf fasen staan niet meer op deze pagina, maar voeden wél de
    // fasenlijn op de richting-hubs (`getFaseItems` leest deze rij).
    { key: "fase1Titel", label: "Fase 1 — titel", type: "text" },
    { key: "fase1Tekst", label: "Fase 1 — tekst", type: "textarea" },
    { key: "fase2Titel", label: "Fase 2 — titel", type: "text" },
    { key: "fase2Tekst", label: "Fase 2 — tekst", type: "textarea" },
    { key: "fase3Titel", label: "Fase 3 — titel", type: "text" },
    { key: "fase3Tekst", label: "Fase 3 — tekst", type: "textarea" },
    { key: "fase4Titel", label: "Fase 4 — titel", type: "text" },
    { key: "fase4Tekst", label: "Fase 4 — tekst", type: "textarea" },
    { key: "fase5Titel", label: "Fase 5 — titel", type: "text" },
    { key: "fase5Tekst", label: "Fase 5 — tekst", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  "diensten-mendix": [
    { key: "metaTitle", label: "Meta-titel", type: "text" },
    { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
    { key: "badgeLabel", label: "Hero — badge-label", type: "text" },
    { key: "heroTitleStart", label: "Hero — titel", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "crossrefTitel", label: "Kruisverwijzing — kicker", type: "text" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  "diensten-ai": [
    { key: "metaTitle", label: "Meta-titel", type: "text" },
    { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
    { key: "badgeLabel", label: "Hero — badge-label", type: "text" },
    { key: "heroTitleStart", label: "Hero — titel", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "crossrefTitel", label: "Kruisverwijzing — kicker", type: "text" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  "diensten-strategie": [
    { key: "metaTitle", label: "Meta-titel", type: "text" },
    { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
    { key: "badgeLabel", label: "Hero — badge-label", type: "text" },
    { key: "heroTitleStart", label: "Hero — titel", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "instapTitel", label: "Lichte instap — titel", type: "text" },
    { key: "instapTekst", label: "Lichte instap — tekst", type: "textarea" },
    { key: "instapKnop", label: "Lichte instap — knoptekst", type: "text" },
    { key: "crossrefTitel", label: "Kruisverwijzing — kicker", type: "text" },
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
  "diensten-mendix": "/diensten/mendix",
  "diensten-ai": "/diensten/ai",
  "diensten-strategie": "/diensten/strategie",
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
    heroCtaVideo: "Bekijk klantverhalen",
    statementKicker: "Plan · build · run",
    statementTitel: "Wij adviseren niet alleen. Wij bouwen, leveren en beheren.",
    statementBody:
      "Hetzelfde senior team dat jouw strategie mee vormgeeft, staat ook aan de knoppen bij bouw en beheer. Zo blijft verantwoordelijkheid op één plek en houden we vaart tot ver na livegang.",
    ctaTitel: "Klaar om samen te bouwen aan meetbare groei?",
    ctaKnop: "Plan een gesprek",
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
      "Geen anonieme delivery-machine: bij ons ken je de mensen die jouw vraagstuk oplossen. Gepassioneerde consultants en engineers die naast je team staan, van eerste sessie tot livegang en daarna. Van wekelijkse Wavetime-sessies tot onze jaarlijkse Company week, we investeren structureel in hoe we sámen werken, niet alleen in wat we opleveren.",
    mensenP2:
      "Ons doel? Dat jouw mensen er beter van worden. Technologie is het middel, de mens is de maat.",
    joinusKicker: "Werken bij The New Wave IT",
    joinusTitel: "Bouw je aan onze klanten, of word je er zelf een?",
    joinusLead:
      "Dezelfde mensen die naast onze klanten staan, kiezen hier hun eigen groeipad. Een gelijk speelveld, open feedback en ruimte om te ondernemen. Misschien versterk jij straks de golf.",
  },
  "over-ons": {
    heroTitleStart: "De ondernemende mens zorgt voor ",
    heroAccent: "vooruitgang",
    heroLead:
      "Wij geloven dat succesvolle verandering begint bij mensen. Daarom verzorgen wij alle randvoorwaarden voor onze Wavers, en helpen zij onze partners maximaal digitaal versnellen. Zo staat jouw organisatie klaar voor de dag van overmorgen.",
    missieTitel: "Maximale digitale impact, met de mens als maat.",
    missieP1:
      "The New Wave IT is opgericht vanuit één overtuiging: technologie is het middel, de mens is de maat. Wij zijn geen anonieme delivery-machine. Je werkt met mensen die je vraagstuk écht doorgronden, van de eerste sessie tot livegang en daarna.",
    missieP2:
      "Dat doen we door op elk project de mensen te kiezen van wie de ervaring, skills en ambitie het beste passen bij jouw vraagstuk. Ons doel? Dat elk mens werk doet dat aansluit bij zijn of haar persoonlijke doelen en drijfveren.",
    teamTitel: "Ontmoet de Wavers.",
    teamP1:
      "Geen anonieme delivery-machine: je kent de mensen die jouw vraagstuk oplossen. Senior consultants en engineers die de taal van de boardroom én de werkvloer spreken, betrokken als partner.",
    teamP2:
      "Van strategische sessies tot livegang en beheer: hetzelfde team blijft aan boord. Zo houden we vaart, kwaliteit en verantwoordelijkheid bij elkaar. Wekelijkse Wavetime-sessies en een jaarlijkse Company week: structurele investering in hoe we sámen werken.",
    ctaTitel: "Benieuwd wat onze mensen voor jouw doelen kunnen betekenen?",
    heroLeadMobiel:
      "Succesvolle verandering begint bij mensen. Wij verzorgen de randvoorwaarden voor onze Wavers, zij helpen onze partners maximaal digitaal versnellen.",
    waardenKicker: "Waar wij voor staan",
    waardenTitel: "Vier overtuigingen die je terugziet in ons werk",
    waarde1Titel: "Mens centraal",
    waarde1Tekst:
      "De mens is de centrale factor in het behalen van business doelstellingen, niet de technologie zelf. Beloning is bij ons gelijk en transparant voor iedereen met dezelfde ervaring, ongeacht gender of achtergrond.",
    waarde2Titel: "Pragmatisch",
    waarde2Tekst:
      "We rekenen elke oplossing door op wat jouw vraagstuk daadwerkelijk oplost, en zeggen net zo makkelijk nee tegen een hype die dat niet doet.",
    waarde3Titel: "Autoriteit door bewijs",
    waarde3Tekst:
      "Bewezen frameworks (App Factory, OGSM, 3-Horizonsmodel) en concrete resultaten, geen losse claims.",
    waarde4Titel: "Duurzaam ondernemen",
    waarde4Tekst:
      "Ondernemen en maatschappelijke bijdrage horen bij elkaar. In 2030 is ons businessmodel 100% CO2-neutraal.",
  },
  contact: {
    heroTitleStart: "Waar kunnen we je ",
    heroAccent: "mee helpen",
    heroLead:
      "Een gesprek plannen kan, maar een korte vraag stellen mag ook gewoon. Bel, mail, app of kom langs, je zit nergens aan vast.",
    heroLeadMobiel: "Bel, mail, app of kom langs, je zit nergens aan vast.",
    verwachtTitel: "Wat je kunt verwachten",
    verwacht1Titel: "Voorbereiding",
    verwacht1Tekst:
      "We verdiepen ons vooraf in jouw sector en organisatie, zodat het gesprek meteen de diepte in kan.",
    verwacht2Titel: "Het gesprek",
    verwacht2Tekst:
      "20 tot 45 minuten met een practice lead, afhankelijk van je vraag. Over jouw businessvraagstuk, niet over onze diensten.",
    verwacht3Titel: "Concreet vervolg",
    verwacht3Tekst:
      "Binnen drie dagen een eerste analyse met mogelijke routes, geheel vrijblijvend.",
    ctaTitel: "Liever eerst zien wat we voor anderen deden?",
  },
  diensten: {
    heroTitleStart: "Mensen die meebouwen, of ",
    heroAccent: "een dienst met vaste scope",
    heroTitleEnd: ".",
    heroLead:
      "Onze basis is capaciteit: consultants die in jouw team meebouwen aan Mendix en AI. Wil je eerst richting, snelheid of een fundering, dan hebben we daar afgebakende diensten voor — met een vaste scope en een prijs vooraf.",
    heroLeadMobiel:
      "Consultants die in jouw team meebouwen, of een afgebakende dienst met vaste scope en prijs vooraf.",

    basisKicker: "Onze basisdienstverlening · doorlopend",
    basisTitel: "Consultant inhuren",
    basisTekst:
      "Waar de meeste van onze samenwerkingen beginnen en eindigen: een consultant die naast je team komt staan en meebouwt. Aan een Mendix-applicatie, aan AI in je processen, of aan allebei — want in de praktijk loopt dat door elkaar heen. Heb je op dat niveau iemand nodig die de richting bewaakt, dan schuift er een strategisch adviseur aan. Je huurt geen uren in, je haalt iemand binnen die je landschap leert kennen en kennis achterlaat.",
    basisRol1Label: "Mendix",
    basisRol1Naam: "Developer & lead",
    basisRol1Tekst: "Bouwt mee in je bestaande teams of zet er een op.",
    basisRol2Label: "AI",
    basisRol2Naam: "AI-engineer",
    basisRol2Tekst: "Van pilot naar productie, binnen jouw kaders.",
    basisRol3Label: "Business",
    basisRol3Naam: "Analist & product owner",
    basisRol3Tekst: "Vertaalt het proces naar wat er gebouwd moet worden.",
    basisRol4Label: "Strategie",
    basisRol4Naam: "Strategisch adviseur",
    basisRol4Tekst: "Bewaakt richting, portfolio en businesscase.",
    basisPersoonRol: "Jouw aanspreekpunt",
    basisPersoonTekst:
      "Je maakt vooraf kennis met de persoon zelf, niet met een cv uit een bestand.",
    basisInzetLabel: "Inzet",
    basisInzetWaarde: "Vanaf één dag per week",
    basisPunt1: "Detachering of projectbasis, zonder minimumtermijn van een jaar",
    basisPunt2: "Vaste consultants, geen wisselende gezichten",
    basisPunt3: "Kennisoverdracht is onderdeel van de opdracht",
    basisPunt4: "Tarief stemmen we af op rol, seniority en inzet",
    basisCta: "Bespreek je capaciteitsvraag",
    basisCtaAlt: "Bekijk wie er bij ons werken →",

    instapKicker: "Begin hier",
    instapTitel: "Of begin met één dag",
    instapIntro:
      "Wil je liever eerst zien wat het oplevert voordat je mensen inhuurt? Dan starten we met een dag. Aan het eind ligt er iets werkends waar je intern mee verder kunt — zonder vervolgverplichting.",

    verdiepingKicker: "Verder in het traject",
    verdiepingTitel: "Zes diensten voor als je al onderweg bent",
    verdiepingIntro:
      "Niet nodig om nu te kiezen — ze komen meestal pas aan de orde als de eerste app draait of het team groeit. Voor de volledigheid staan ze hier wel.",
    verdiepingRichtingTekst: "Voor als je al bouwt en wilt weten of je de goede kant op schaalt.",
    verdiepingCapaciteitTekst:
      "Als je van één app naar een portfolio wilt en je eigen mensen het moeten dragen.",

    fase1Titel: "De strategische basis",
    fase1Tekst:
      "IT-strategie sluit nog niet aan op de bedrijfsdoelen. Er is ambitie maar geen richting.",
    fase2Titel: "Van visie naar eerste resultaten",
    fase2Tekst:
      "Er moet snel zichtbare waarde komen om draagvlak te krijgen. Het team moet gaan draaien.",
    fase3Titel: "Structureren en professionaliseren",
    fase3Tekst:
      "De eerste resultaten staan. Nu moet het beheersbaar, herhaalbaar en overdraagbaar worden.",
    fase4Titel: "Schalen en innoveren",
    fase4Tekst:
      "Meerdere teams, meerdere business units, een groeiend portfolio aan apps en agents.",
    fase5Titel: "Continu evalueren",
    fase5Tekst: "De vraag van de CIO: wat levert het platform op, en waar zit de volgende winst?",
    ctaTitel: "Niet zeker welke dienst bij jouw vraagstuk past?",
  },
  "diensten-mendix": {
    metaTitle: "Mendix — van App in a Day tot Fusion Team",
    metaDescription:
      "Drie diensten om met Mendix te starten of op te schalen: App in a Day, de Mendix Scale Sessie en de Fusion Team Startsprint.",
    badgeLabel: "Mendix",
    heroTitleStart: "Van eerste app tot schaalbaar platform.",
    heroLead:
      "Drie diensten, van een dag tot een traject: begin met een werkende app, bepaal je richting met een Scale Sessie, of bouw capaciteit op met een Fusion Team.",
    crossrefTitel: "Ook relevant vanuit Mendix",
    ctaTitel: "Welke stap past bij jouw Mendix-landschap?",
  },
  "diensten-ai": {
    metaTitle: "AI — van AI Agent in a Day tot de Opportunity Scan",
    metaDescription:
      "Twee diensten om met AI te starten: de AI Agent in a Day-workshop en de AI Opportunity Scan om de grootste kansen te prioriteren.",
    badgeLabel: "AI",
    heroTitleStart: "Van eerste agent tot geprioriteerde kansen.",
    heroLead:
      "Twee diensten: bouw in één dag je eerste werkende agent, of breng in een halve dag in kaart waar AI bij jullie geld oplevert.",
    crossrefTitel: "Ook relevant vanuit AI",
    ctaTitel: "Welke stap past bij jullie AI-ambitie?",
  },
  "diensten-strategie": {
    metaTitle: "Strategie — van AI-strategie tot IT-strategie op low-code en AI",
    metaDescription:
      "Twee diensten om koers te bepalen: AI-strategie voor de directie en IT-strategie op low-code en AI voor de CIO.",
    badgeLabel: "Strategie",
    heroTitleStart: "Van eerste koers tot uitvoerbare roadmap.",
    heroLead:
      "Twee diensten voor twee vragen: waar verandert AI ons verdienmodel (directie), en waar past low-code in ons landschap (CIO).",
    instapTitel: "Nog aan het oriënteren?",
    instapTekst:
      "Begin met een korte, vrijblijvende kennismaking van twintig minuten — geen verplichtingen, wel een eerlijk beeld van waar je staat.",
    instapKnop: "Plan een kennismaking (20 min)",
    crossrefTitel: "Ook relevant vanuit Strategie",
    ctaTitel: "Klaar om koers te bepalen?",
  },
  sectoren: {
    heroTitleStart: "Wij spreken de taal van ",
    heroAccent: "jouw sector",
    heroLead:
      "Wij kiezen bewust voor vijf sectoren in plaats van generiek IT-advies: publieke sector, mobiliteit, banken, zorg en manufacturing. In elke sector kennen we de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past, in plaats van een generieke oplossing die overal een beetje werkt.",
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
      "Je werkt hier niet vóór ons, je werkt mét ons. Gepassioneerde consultants en engineers die naast klantteams staan en zelf ruimte krijgen om te groeien naar expertrollen.",
    cultuur1: "Persoonlijk groeipad, geen vaste carrièreladder",
    cultuur2: "Wavetime en Company week als vaste cultuurrituelen",
    cultuur3:
      "Werken met bewezen frameworks (App Factory, OGSM, App in a Day) in plaats van losse projecten",
    cultuur4: "Gelijke, transparante beloning bij gelijke ervaring, ongeacht gender of achtergrond",
  },
};
