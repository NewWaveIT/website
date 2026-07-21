/** Content voor de dienstdetailpagina's (/diensten/[slug]). */

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
  ph: string;
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

export interface DienstDetail {
  slug: string;
  naam: string;
  badgeIcon: "boxes" | "brain-circuit" | "route";
  badgeLabel: string;
  h1: string;
  intro: string;
  ctaSecondary: string;
  kpis: KPI[];
  vraagstukken: Vraagstuk[];
  pijlersIntro: string;
  pijlers: Pijler[];
  aanpak: AanpakRow[];
  waarom: WaaromItem[];
  expertsHead: string;
  experts: Expert[];
  partners: string[];
  outcomes: KPI[];
  caseTitle: string;
  caseSector: string;
  caseQuote: string;
  caseNaam: string;
  caseRol: string;
  caseImage: string;
  insightsTitle: string;
  insights: Insight[];
  ctaTitle: string;
}

export const DIENSTEN: Record<string, DienstDetail> = {
  mendix: {
    slug: "mendix",
    naam: "Mendix",
    badgeIcon: "boxes",
    badgeLabel: "Mendix Premium Partner",
    h1: "Op maat gebouwd, 6–10× sneller live.",
    intro:
      "Op maat gemaakte low-code applicaties die jouw specifieke uitdaging oplossen, van proof-of-concept tot productie in weken, niet maanden. Schaalbaar, beheerbaar en gebouwd rond je mensen.",
    ctaSecondary: "Bekijk cases",
    kpis: [
      { n: "6–10×", l: "Sneller dan traditionele bouw" },
      { n: "< 12", l: "Weken van start tot eerste release" },
      { n: "100%", l: "Overdraagbaar aan je eigen team" },
    ],
    vraagstukken: [
      { q: "Maatwerk", titel: "Je proces past in geen enkel standaardpakket", p: "Uniek proces, uniek concurrentievoordeel. Maar traditioneel maatwerk duurt te lang en kost te veel." },
      { q: "Legacy", titel: "Een verouderde applicatie moet vervangen, zonder verstoring", p: "Niemand durft het oude systeem nog aan te raken, maar het remt alles." },
      { q: "Snelheid", titel: "De business kan niet wachten op het IT-portfolio van volgend jaar", p: "Kansen hebben een houdbaarheidsdatum." },
    ],
    pijlersIntro:
      "Van eerste schets tot beheerde productie: we ondersteunen je in elke fase van je applicatielandschap.",
    pijlers: [
      {
        num: "01",
        titel: "Strategie & design",
        p: "Eerst scherp krijgen wélke applicatie waarde levert, dan pas bouwen.",
        items: [
          { summary: "Applicatie-roadmap", p: "Geprioriteerde applicatiekansen met businesscase, aansluitend op je IT-strategie." },
          { summary: "Fit-gap & architectuur", p: "Past low-code hier? Eerlijk advies over Mendix versus maatwerk of standaardsoftware." },
          { summary: "UX-design", p: "Ontworpen rond het echte werkproces, getest met de mensen die ermee gaan werken." },
        ],
      },
      {
        num: "02",
        titel: "Bouwen",
        p: "Van proof-of-concept naar productie in weken, niet maanden.",
        items: [
          { summary: "Van PoC naar productie", p: "Werkende software vanaf sprint één, geborgd opgeleverd met documentatie." },
          { summary: "Integraties", p: "Koppelingen met je kernsystemen: ERP, zaaksystemen, EPD of legacy via API's." },
          { summary: "Gemengde teams", p: "Onze consultants werken samen met jouw mensen, kennis blijft binnen." },
        ],
      },
      {
        num: "03",
        titel: "Beheer & schaal",
        p: "Applicaties die meegroeien en beheersbaar blijven.",
        items: [
          { summary: "Beheer & doorontwikkeling", p: "Actieve monitoring, snelle fixes en doorontwikkeling op basis van gebruik." },
          { summary: "Kwaliteit & performance", p: "Code reviews, testautomatisering en performance-optimalisatie als standaard." },
          { summary: "Training & overdracht", p: "We leiden je eigen makers op, tot en met Mendix-certificering." },
        ],
      },
    ],
    aanpak: [
      { kicker: "Bouwen", titel: "Van eerste sprint tot productie in weken", p: "We starten klein, leveren elke sprint werkende software en schalen wat werkt. Jouw eindgebruikers zitten vanaf dag één aan tafel.", punten: ["Proof-of-concept binnen enkele weken", "Koppelingen met je bestaande landschap", "Enterprise-grade security en beheer"], ph: "[ product shot · Mendix app ]" },
      { kicker: "Borgen", titel: "Jouw team kan er zelf mee verder", p: "Geen vendor lock-in op kennis: we documenteren, dragen over en leiden je eigen mensen op, zodat de applicatie van jou blijft.", punten: ["Overdracht en training van je team", "Beheer en doorontwikkeling naar keuze", "Architectuur die meegroeit"], ph: "[ foto · teamoverdracht ]" },
    ],
    waarom: [
      { titel: "Business eerst, technologie als middel", p: "We starten bij jouw sectorvraagstuk en rekenen elke applicatie door op businesswaarde, met een eerlijk nee waar Mendix niet past." },
      { titel: "6–10× sneller live", p: "Geen maandenlange trajecten: werkende software vanaf sprint één, productie in weken." },
      { titel: "Kennis blijft bij jou", p: "Gemengde teams met jouw mensen, volledige overdracht inclusief documentatie en beheer." },
      { titel: "Premium Partner-kwaliteit", p: "Gecertificeerde experts en directe lijnen met Mendix zelf." },
    ],
    expertsHead: "Werk met een expert, onze leads denken vrijblijvend mee over jouw applicatielandschap.",
    experts: [
      { img: "/assets/photos/portret-bordeaux.webp", role: "Practice Lead Mendix", naam: "Jesse de Boer", tel: "+31610751254" },
      { img: "/assets/photos/portret-3.webp", role: "CEO · Strategie & Sales", naam: "Koen Wijsman", tel: "+31610751254" },
    ],
    partners: ["Mendix", "Siemens", "Microsoft Azure", "AWS"],
    outcomes: [
      { n: "6–10×", l: "Snellere oplevering" },
      { n: "-60%", l: "Lagere ontwikkelkosten" },
      { n: "100%", l: "Gebouwd binnen je kaders" },
      { n: "1", l: "Team van business tot bouw" },
    ],
    caseTitle: "COA: sneller en aantoonbaar",
    caseSector: "Publieke sector · COA",
    caseQuote: "“Efficiënte en betrouwbare IT-oplossingen. The New Wave IT denkt echt mee met onze uitdagingen.”",
    caseNaam: "Peter van Dam",
    caseRol: "IT Manager, COA",
    caseImage: "/assets/photos/team-presentatie-breed.webp",
    insightsTitle: "Kennis over bouwen met low-code",
    insights: [
      { cat: "Mendix", meta: "5 min · 15 mei 2026", titel: "Wanneer low-code wél en niet de juiste keuze is" },
      { cat: "Mendix", meta: "6 min · 28 apr 2026", titel: "Legacy vervangen zonder de winkel te sluiten" },
      { cat: "Mendix", meta: "4 min · 7 apr 2026", titel: "Van POC naar productie: de valkuilen" },
    ],
    ctaTitle: "Welke applicatie zou jouw operatie versnellen?",
  },

  ai: {
    slug: "ai",
    naam: "AI",
    badgeIcon: "brain-circuit",
    badgeLabel: "AI",
    h1: "AI die je mensen versterkt.",
    intro:
      "Strategische inzet van AI binnen je bestaande IT-landschap. Geen hype, wél oplossingen die processen aantoonbaar verbeteren, uitlegbaar zijn en de mens centraal stellen.",
    ctaSecondary: "Doe de AI-scan",
    kpis: [
      { n: "-40%", l: "Minder repetitief werk" },
      { n: "< 6", l: "Weken tot eerste werkende pilot" },
      { n: "100%", l: "Uitlegbaar en controleerbaar" },
    ],
    vraagstukken: [
      { q: "Repetitief werk", titel: "Je professionals verliezen uren aan lezen, sorteren en overtypen", p: "Documenten, aanvragen, meldingen: werk dat slimmer kan." },
      { q: "Beslissingen", titel: "Je wilt beter beslissen op data die er al is", p: "De data is er, het inzicht nog niet." },
      { q: "Richting", titel: "Iedereen wil ‘iets met AI’, maar wat, en waar te beginnen?", p: "Zonder scherpe keuze wordt AI een dure hobby." },
    ],
    pijlersIntro:
      "Van strategie tot fundament: we ondersteunen je in elke fase van je AI-reis, altijd gericht op meetbaar businessresultaat.",
    pijlers: [
      {
        num: "01",
        titel: "Strategie",
        p: "Een heldere visie en route om AI effectief in te zetten voor jouw businessdoelen.",
        items: [
          { summary: "AI-maturity scan", p: "We meten hoe klaar je organisatie is: datakwaliteit, governance, kennis en integratie in processen." },
          { summary: "Visie & roadmap", p: "Geprioriteerde use-cases met businesscase, vertaald naar een concrete agenda voor de komende kwartalen." },
          { summary: "Verantwoorde AI", p: "Uitlegbaar, eerlijk en AVG- en AI Act-proof. Ethiek als ontwerpeis, niet als sausje achteraf." },
        ],
      },
      {
        num: "02",
        titel: "Toepassing",
        p: "AI en data inzetten voor inzicht, snelheid en betere beslissingen in het dagelijkse werk.",
        items: [
          { summary: "Documentintelligentie", p: "Classificeren, samenvatten en voorsorteren van aanvragen, meldingen en dossiers. De professional beslist." },
          { summary: "Generatieve AI", p: "Van experiment naar geborgd proces: assistenten en workflows in je eigen, veilige omgeving." },
          { summary: "Besluitondersteuning", p: "Uitlegbare modellen die adviseren op data die er al is, zonder black box in productie." },
        ],
      },
      {
        num: "03",
        titel: "Fundament",
        p: "De basis die AI betrouwbaar, beschikbaar en beheersbaar maakt, nu en straks.",
        items: [
          { summary: "Data-engineering", p: "Pipelines en integraties die data betrouwbaar en bruikbaar maken voor AI en inzicht." },
          { summary: "AI-governance", p: "Beleid, rollen en controles zodat elke toepassing veilig, compliant en controleerbaar blijft." },
          { summary: "Integratie met Mendix", p: "AI direct in je bedrijfsapplicaties: van slimme formulieren tot geautomatiseerde afhandeling." },
        ],
      },
    ],
    aanpak: [
      { kicker: "Verkennen", titel: "De AI-scan: van hype naar businesscase", p: "We doorlichten je processen en datalandschap en kiezen samen de use-cases waar AI aantoonbaar waarde toevoegt, met een eerlijk nee waar het niet past.", punten: ["Scan van processen en datalandschap", "Geprioriteerde use-cases met businesscase", "Heldere randvoorwaarden (AVG, AI Act)"], ph: "[ foto · werksessie AI-scan ]" },
      { kicker: "Bouwen", titel: "Pilots met meetbaar resultaat", p: "We bouwen werkende pilots in je eigen omgeving en schalen wat bewezen werkt: verantwoord, uitlegbaar en met de professional aan het stuur.", punten: ["Documentclassificatie en samenvatting", "Uitlegbare besluitondersteuning", "Van pilot naar geborgde productie"], ph: "[ product shot · AI-dashboard ]" },
    ],
    waarom: [
      { titel: "Business eerst, technologie als middel", p: "We starten bij jouw sectorvraagstuk en rekenen elke use-case door op businesswaarde, met een eerlijk nee waar AI niet past." },
      { titel: "Werkende pilots binnen zes weken", p: "Geen rapporten die in een la verdwijnen: we bouwen in je eigen omgeving en schalen wat bewezen werkt." },
      { titel: "Kennis blijft bij jou", p: "We werken in gemengde teams met jouw mensen en dragen alles over, inclusief documentatie en beheer." },
      { titel: "Verantwoord en uitlegbaar", p: "Elk besluit blijft controleerbaar. AVG en AI Act zijn randvoorwaarden vanaf dag één, geen verrassing achteraf." },
    ],
    expertsHead: "Werk direct met een expert, onze practice leads denken vrijblijvend mee.",
    experts: [
      { img: "/assets/photos/portret-blauw.webp", role: "CEO · Strategie & Sales", naam: "Koen Wijsman", tel: "+31610751254" },
      { img: "/assets/photos/portret-bordeaux.webp", role: "Lead Data & Fundament", naam: "Sanne Willems", tel: "+31610751255" },
    ],
    partners: ["Mendix", "Microsoft Azure", "OpenAI", "Databricks"],
    outcomes: [
      { n: "-40%", l: "Minder repetitief werk" },
      { n: "+3×", l: "Snellere verwerking van aanvragen" },
      { n: "100%", l: "Uitlegbare besluiten" },
      { n: "0", l: "Black boxes in productie" },
    ],
    caseTitle: "Uitvoeringsorganisatie: triage met AI",
    caseSector: "Publieke sector · Uitvoering",
    caseQuote: "“AI sorteert nu voor, onze mensen beslissen. De doorlooptijd is gehalveerd en elk besluit blijft uitlegbaar.”",
    caseNaam: "Fatima el Idrissi",
    caseRol: "Directeur Uitvoering",
    caseImage: "/assets/photos/team-overleg-scherm.webp",
    insightsTitle: "Kennis over verantwoorde AI",
    insights: [
      { cat: "AI", meta: "5 min · 19 mei 2026", titel: "De AI Act komt eraan: wat moet je nu regelen?" },
      { cat: "AI", meta: "6 min · 2 mei 2026", titel: "Van ChatGPT-experiment naar geborgd proces" },
      { cat: "AI", meta: "4 min · 9 apr 2026", titel: "Uitlegbaarheid als ontwerpeis, niet als sausje" },
    ],
    ctaTitle: "Waar zou AI jouw mensen kunnen versterken?",
  },

  strategie: {
    slug: "strategie",
    naam: "Strategie",
    badgeIcon: "route",
    badgeLabel: "Strategie",
    h1: "Van ambitie naar uitvoerbare roadmap.",
    intro:
      "Wij verbinden business en IT in een concreet plan en blijven aan boord tot het werkt. Geen dik rapport voor in de la, maar mijlpalen die je operatie meteen merkt.",
    ctaSecondary: "Bekijk cases",
    kpis: [
      { n: "45", l: "Minuten voor het eerste gesprek" },
      { n: "< 8", l: "Weken tot een gedragen roadmap" },
      { n: "1", l: "Plan waar business én IT achter staan" },
    ],
    vraagstukken: [
      { q: "Richting", titel: "De ambitie is helder, de weg ernaartoe niet", p: "Digitaliseren, ja. Maar wat eerst, wat later, en wat niet?" },
      { q: "Verbinding", titel: "Business en IT spreken elkaars taal niet", p: "Projecten mislukken zelden op techniek, vaak op afstemming." },
      { q: "Executie", titel: "Het vorige plan strandde in de la", p: "Een strategie is pas af als de operatie hem merkt." },
    ],
    pijlersIntro: "Van inzicht via richting naar uitvoering: we blijven aan boord tot het werkt.",
    pijlers: [
      {
        num: "01",
        titel: "Inzicht",
        p: "Eerst begrijpen waar je staat en waar de waarde zit.",
        items: [
          { summary: "Digitale scan", p: "Doorlichting van processen, systemen en data: waar lekt tijd en waar zit potentie?" },
          { summary: "Businesscase per initiatief", p: "Elk voorstel doorgerekend op kosten, baten en risico, beslisklaar voor de directie." },
          { summary: "IT-landschap analyse", p: "Wat kan blijven, wat moet weg en wat mist er? Eerlijk, leveranciersonafhankelijk." },
        ],
      },
      {
        num: "02",
        titel: "Richting",
        p: "Van ambitie naar een geprioriteerde, gedragen roadmap.",
        items: [
          { summary: "Visie & roadmap", p: "Concreet plan met mijlpalen per kwartaal, gekoppeld aan je businessdoelen." },
          { summary: "Portfolio-prioritering", p: "Welke initiatieven eerst? Prioriteren op waarde, risico en samenhang." },
          { summary: "Architectuurkeuzes", p: "Richtinggevende keuzes voor platforms en integraties, AVG- en toekomstproof." },
        ],
      },
      {
        num: "03",
        titel: "Uitvoering",
        p: "Geen rapport voor in de la, we blijven tot het werkt.",
        items: [
          { summary: "Transformatiebegeleiding", p: "Regie op de uitvoering, met mijlpalen die je operatie meteen merkt." },
          { summary: "Verandermanagement", p: "Je mensen mee in de verandering: training, communicatie en adoptie." },
          { summary: "Meetbare mijlpalen", p: "Elk kwartaal aantoonbaar resultaat, bijgestuurd op wat de praktijk leert." },
        ],
      },
    ],
    aanpak: [
      { kicker: "Richten", titel: "Een roadmap die keuzes maakt", p: "We vertalen je bedrijfsdoelen naar een geprioriteerde digitale agenda, met heldere mijlpalen, eigenaren en een eerlijke volgorde.", punten: ["Van bedrijfsdoel naar digitale agenda", "Prioritering op waarde en haalbaarheid", "Gedragen door directie én werkvloer"], ph: "[ foto · strategiesessie ]" },
      { kicker: "Uitvoeren", titel: "Begeleiding bij de verandering, niet alleen het plan", p: "We blijven betrokken tijdens de uitvoering: sturen bij, meten resultaat en zorgen dat elke mijlpaal in de operatie landt.", punten: ["Kwartaalritme met meetbare mijlpalen", "Bijsturen op resultaat, niet op rapporten", "Kennisoverdracht aan je eigen organisatie"], ph: "[ product shot · roadmap-overzicht ]" },
    ],
    waarom: [
      { titel: "Business eerst, technologie als middel", p: "We starten bij jouw sectorvraagstuk, niet bij een oplossing die we willen verkopen." },
      { titel: "Geen rapport voor in de la", p: "Elke aanbeveling komt met een uitvoeringsplan, en we blijven aan boord tot het werkt." },
      { titel: "Kennis blijft bij jou", p: "We bouwen jouw regievermogen op, zodat je zelf kunt sturen na ons vertrek." },
      { titel: "Sectorkennis vanaf dag één", p: "We kennen de wetgeving, ketens en systemen van jouw markt, het eerste gesprek gaat meteen de diepte in." },
    ],
    expertsHead: "Werk direct met een expert, onze leads denken vrijblijvend mee.",
    experts: [
      { img: "/assets/photos/portret-blauw.webp", role: "CEO · Strategie & Sales", naam: "Koen Wijsman", tel: "+31610751254" },
      { img: "/assets/photos/portret-3.webp", role: "Lead Business Consulting", naam: "Sanne Willems", tel: "+31610751255" },
    ],
    partners: ["Mendix", "Microsoft Azure", "OpenAI", "Databricks"],
    outcomes: [
      { n: "< 8", l: "Weken tot gedragen roadmap" },
      { n: "100%", l: "Mijlpalen met eigenaar en datum" },
      { n: "4×", l: "Per jaar meetbaar bijgestuurd" },
      { n: "1", l: "Taal voor business en IT" },
    ],
    caseTitle: "Familiebedrijf: van ambitie naar agenda",
    caseSector: "Manufacturing · Familiebedrijf",
    caseQuote: "“Voor het eerst hebben business en IT hetzelfde plan. En het werkt, want elk kwartaal staat er iets nieuws in productie.”",
    caseNaam: "Willem Hartog",
    caseRol: "Algemeen directeur, familiebedrijf",
    caseImage: "/assets/photos/klantgesprek-tafel.webp",
    insightsTitle: "Kennis die je koers vooruit denkt",
    insights: [
      { cat: "Strategie", meta: "5 min · 14 mei 2026", titel: "Waarom digitale strategieën stranden in de la" },
      { cat: "Strategie", meta: "6 min · 27 apr 2026", titel: "Prioriteren: de kunst van het niet doen" },
      { cat: "Strategie", meta: "4 min · 6 apr 2026", titel: "Business en IT: één taal in acht weken" },
    ],
    ctaTitle: "Klaar om van ambitie naar uitvoering te gaan?",
  },
};

export const DIENST_SLUGS = Object.keys(DIENSTEN);
