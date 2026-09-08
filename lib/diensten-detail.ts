/**
 * Content voor de drie richting-hubs: /diensten/mendix, /ai en /strategie.
 *
 * Let op de naamgeving: dit contenttype heet in code en database `diensten`, maar
 * beschrijft de dríe richtingen waaronder de negen boekbare diensten hangen. Die
 * diensten zelf staan in `lib/services.ts` en hebben hun eigen pagina onder
 * /diensten/<dienst>. In de admin heet dit daarom "Richtingen".
 */

import type {
  KPI,
  Vraagstuk,
  Pijler,
  AanpakRow,
  WaaromItem,
  Expert,
  Insight,
  CaseVerwijzing,
} from "@/lib/content-blokken";

export type {
  KPI,
  Vraagstuk,
  PijlerItem,
  Pijler,
  AanpakRow,
  WaaromItem,
  Expert,
  Insight,
} from "@/lib/content-blokken";

export interface DienstDetail extends CaseVerwijzing {
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
  /** Alternatief voor de klantverhaal-sectie zolang er nog geen goedgekeurde case is:
   *  een concrete werkwijze-alinea (geen klantbewijs, geen verzonnen cijfers). Wordt
   *  alleen getoond als caseTitle leeg is. */
  waarborg?: string;
  /** SVG-hero-thema (lib/sector-hero-svg.ts); leeg = de dienst-slug zelf. Nodig omdat
   *  buildHeroSvg() niets rendert voor een onbekend thema. */
  heroTheme?: string;
  /** Slug uit de dienstencatalogus (lib/services.ts) — vult de feitenregel (doelgroep,
   *  duur, prijs) en de primaire CTA/vervolgstap onder de hero. */
  serviceSlug?: string;
  insightsTitle: string;
  insights: Insight[];
  ctaTitle: string;
  /** Sector-slugs waar deze richting het meest speelt; chips naar /sectoren/<slug>.
   *  Leeg = de sectie is verborgen. */
  sectoren?: string[];
  /** "Wanneer wel, wanneer niet" — twee kolommen. Beide leeg = sectie verborgen. */
  welNietTitel?: string;
  welWanneer?: string[];
  nietWanneer?: string[];
}

/** De drie richtingen. Hebben een eigen statische route
 *  (app/(marketing)/diensten/mendix/page.tsx e.a.) die vóór [slug] gaat; een dienst
 *  met dezelfde slug zou daardoor onbereikbaar worden, vandaar de guard in
 *  lib/diensten-detail-data.ts. */
export const RICHTING_SLUGS = ["mendix", "ai", "strategie"] as const;

export const DIENSTEN: Record<string, DienstDetail> = {
  mendix: {
    slug: "mendix",
    naam: "Mendix",
    badgeIcon: "boxes",
    badgeLabel: "Mendix Premium Partner",
    h1: "Op maat gebouwd, 6–10× sneller live.",
    intro:
      "Op maat gemaakte low-code applicaties die jouw specifieke uitdaging oplossen. Vaak staat er binnen een week een eerste werkende versie, en binnen enkele maanden een live applicatie. Schaalbaar, beheerbaar en gebouwd rond je mensen.",
    ctaSecondary: "Bekijk cases",
    kpis: [
      { n: "6–10×", l: "Sneller dan traditionele bouw" },
      { n: "1 week", l: "Vaak een eerste werkende versie" },
      { n: "100%", l: "Overdraagbaar aan je eigen team" },
    ],
    vraagstukken: [
      {
        q: "Maatwerk",
        titel: "Je proces past in geen enkel standaardpakket",
        p: "Uniek proces, uniek concurrentievoordeel. Maar traditioneel maatwerk duurt te lang en kost te veel.",
      },
      {
        q: "Legacy",
        titel: "Een verouderde applicatie moet vervangen, zonder verstoring",
        p: "Niemand durft het oude systeem nog aan te raken, maar het remt alles.",
      },
      {
        q: "Snelheid",
        titel: "De business kan niet wachten op het IT-portfolio van volgend jaar",
        p: "Kansen hebben een houdbaarheidsdatum.",
      },
    ],
    pijlersIntro:
      "Van eerste schets tot beheerde productie: we ondersteunen je in elke fase van je applicatielandschap.",
    pijlers: [
      {
        num: "01",
        titel: "Strategie & design",
        p: "Eerst scherp krijgen wélke applicatie waarde levert, dan pas bouwen.",
        items: [
          {
            summary: "Applicatie-roadmap",
            p: "Geprioriteerde applicatiekansen met businesscase, aansluitend op je IT-strategie.",
          },
          {
            summary: "Fit-gap & architectuur",
            p: "Past low-code hier? Eerlijk advies over Mendix versus maatwerk of standaardsoftware.",
          },
          {
            summary: "UX-design",
            p: "Ontworpen rond het echte werkproces, getest met de mensen die ermee gaan werken.",
          },
        ],
      },
      {
        num: "02",
        titel: "Bouwen",
        p: "Vaak van proof-of-concept naar productie in enkele maanden, niet in een jaar.",
        items: [
          {
            summary: "Van PoC naar productie",
            p: "Werkende software vanaf sprint één, geborgd opgeleverd met documentatie.",
          },
          {
            summary: "Integraties",
            p: "Koppelingen met je kernsystemen: ERP, zaaksystemen, EPD of legacy via API's.",
          },
          {
            summary: "Gemengde teams",
            p: "Onze consultants werken samen met jouw mensen, kennis blijft binnen.",
          },
        ],
      },
      {
        num: "03",
        titel: "Beheer & schaal",
        p: "Applicaties die meegroeien en beheersbaar blijven.",
        items: [
          {
            summary: "Beheer & doorontwikkeling",
            p: "Actieve monitoring, snelle fixes en doorontwikkeling op basis van gebruik.",
          },
          {
            summary: "Kwaliteit & performance",
            p: "Code reviews, testautomatisering en performance-optimalisatie als standaard.",
          },
          {
            summary: "Training & overdracht",
            p: "We leiden je eigen makers op, tot en met Mendix-certificering.",
          },
        ],
      },
    ],
    aanpak: [
      {
        kicker: "Bouwen",
        titel: "Van eerste sprint tot productie in weken",
        p: "We starten klein, leveren elke sprint werkende software en schalen wat werkt. Jouw eindgebruikers zitten vanaf dag één aan tafel.",
        punten: [
          "Proof-of-concept binnen enkele weken",
          "Koppelingen met je bestaande landschap",
          "Enterprise-grade security en beheer",
        ],
        img: "/assets/photos/team-presentatie-scherm.webp",
      },
      {
        kicker: "Borgen",
        titel: "Jouw team kan er zelf mee verder",
        p: "Geen vendor lock-in op kennis: we documenteren, dragen over en leiden je eigen mensen op, zodat de applicatie van jou blijft.",
        punten: [
          "Overdracht en training van je team",
          "Beheer en doorontwikkeling naar keuze",
          "Architectuur die meegroeit",
        ],
        img: "/assets/photos/team-overleg-cafe.webp",
      },
    ],
    waarom: [
      {
        titel: "Business eerst, technologie als middel",
        p: "We starten bij jouw sectorvraagstuk en rekenen elke applicatie door op businesswaarde, met een eerlijk nee waar Mendix niet past.",
      },
      {
        titel: "6–10× sneller live",
        p: "Vaak geen jarenlange trajecten: werkende software vanaf sprint één, doorgaans live binnen enkele maanden.",
      },
      {
        titel: "Kennis blijft bij jou",
        p: "Gemengde teams met jouw mensen, volledige overdracht inclusief documentatie en beheer.",
      },
      {
        titel: "Premium Partner-kwaliteit",
        p: "Gecertificeerde experts en directe lijnen met Mendix zelf.",
      },
    ],
    expertsHead:
      "Werk met een expert, onze leads denken vrijblijvend mee over jouw applicatielandschap.",
    experts: [
      {
        img: "/assets/photos/portret-blauw.webp",
        role: "CEO · Strategie & Sales",
        naam: "Koen Wijsman",
        tel: "+31610751254",
      },
    ],
    partners: ["Mendix", "Siemens", "Microsoft Azure", "AWS"],
    outcomes: [
      { n: "6–10×", l: "Snellere oplevering" },
      { n: "Lager", l: "Ontwikkelkosten dan traditionele bouw" },
      { n: "100%", l: "Gebouwd binnen je kaders" },
      { n: "1", l: "Team van business tot bouw" },
    ],
    caseTitle: "Twee schakels in de keten: hoe Moove installaties en ritregistratie automatiseerde",
    caseSector: "Mobiliteit · Moove Connected Mobility",
    caseQuote:
      "“Samenwerken met The New Wave IT voelt alsof je samenwerkt met goed ingewerkte en enthousiaste collega's. De samenwerking verliep direct soepel.”",
    caseNaam: "Nina Klooster",
    caseRol: "Product Manager, Moove",
    caseImage: "/assets/photos/team-brainstorm-glaswand.webp",
    caseHref: "/klantverhalen/moove",
    insightsTitle: "Kennis over bouwen met low-code",
    insights: [],
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
      { n: "Minder", l: "Repetitief werk" },
      { n: "6 weken", l: "Doorgaans tot werkend proces" },
      { n: "100%", l: "Uitlegbaar en controleerbaar" },
    ],
    vraagstukken: [
      {
        q: "Repetitief werk",
        titel: "Je professionals verliezen uren aan lezen, sorteren en overtypen",
        p: "Documenten, aanvragen, meldingen: werk dat slimmer kan.",
      },
      {
        q: "Beslissingen",
        titel: "Je wilt beter beslissen op data die er al is",
        p: "De data is er, het inzicht nog niet.",
      },
      {
        q: "Richting",
        titel: "Iedereen wil ‘iets met AI’, maar wat, en waar te beginnen?",
        p: "Zonder scherpe keuze wordt AI een dure hobby.",
      },
    ],
    pijlersIntro:
      "Van strategie tot fundament: we ondersteunen je in elke fase van je AI-reis, altijd gericht op meetbaar businessresultaat.",
    pijlers: [
      {
        num: "01",
        titel: "Strategie",
        p: "Een heldere visie en route om AI effectief in te zetten voor jouw businessdoelen.",
        items: [
          {
            summary: "AI-maturity scan",
            p: "We meten hoe klaar je organisatie is: datakwaliteit, governance, kennis en integratie in processen.",
          },
          {
            summary: "Visie & roadmap",
            p: "Geprioriteerde use-cases met businesscase, vertaald naar een concrete agenda voor de komende kwartalen.",
          },
          {
            summary: "Verantwoorde AI",
            p: "Uitlegbaar, eerlijk en AVG- en AI Act-proof. Ethiek als ontwerpeis, niet als sausje achteraf.",
          },
        ],
      },
      {
        num: "02",
        titel: "Toepassing",
        p: "AI en data inzetten voor inzicht, snelheid en betere beslissingen in het dagelijkse werk.",
        items: [
          {
            summary: "Documentintelligentie",
            p: "Classificeren, samenvatten en voorsorteren van aanvragen, meldingen en dossiers. De professional beslist.",
          },
          {
            summary: "Generatieve AI",
            p: "Van experiment naar geborgd proces: assistenten en workflows in je eigen, veilige omgeving.",
          },
          {
            summary: "Besluitondersteuning",
            p: "Uitlegbare modellen die adviseren op data die er al is, zonder black box in productie.",
          },
        ],
      },
      {
        num: "03",
        titel: "Fundament",
        p: "De basis die AI betrouwbaar, beschikbaar en beheersbaar maakt, nu en straks.",
        items: [
          {
            summary: "Data-engineering",
            p: "Pipelines en integraties die data betrouwbaar en bruikbaar maken voor AI en inzicht.",
          },
          {
            summary: "AI-governance",
            p: "Beleid, rollen en controles zodat elke toepassing veilig, compliant en controleerbaar blijft.",
          },
          {
            summary: "Integratie met Mendix",
            p: "AI direct in je bedrijfsapplicaties: van slimme formulieren tot geautomatiseerde afhandeling.",
          },
        ],
      },
    ],
    aanpak: [
      {
        kicker: "Verkennen",
        titel: "De AI-scan: van hype naar businesscase",
        p: "We doorlichten je processen en datalandschap en kiezen samen de use-cases waar AI aantoonbaar waarde toevoegt, met een eerlijk nee waar het niet past.",
        punten: [
          "Scan van processen en datalandschap",
          "Geprioriteerde use-cases met businesscase",
          "Heldere randvoorwaarden (AVG, AI Act)",
        ],
        img: "/assets/photos/team-brainstorm-postits.webp",
      },
      {
        kicker: "Bouwen",
        titel: "Pilots met meetbaar resultaat",
        p: "We bouwen werkende pilots in je eigen omgeving en schalen wat bewezen werkt: verantwoord, uitlegbaar en met de professional aan het stuur.",
        punten: [
          "Documentclassificatie en samenvatting",
          "Uitlegbare besluitondersteuning",
          "Van pilot naar geborgde productie",
        ],
        img: "/assets/photos/team-overleg-flipover.webp",
      },
    ],
    waarom: [
      {
        titel: "Business eerst, technologie als middel",
        p: "We starten bij jouw sectorvraagstuk en rekenen elke use-case door op businesswaarde, met een eerlijk nee waar AI niet past.",
      },
      {
        titel: "Doorgaans een werkend proces binnen 6 weken",
        p: "Geen rapporten die in een la verdwijnen: we bouwen in je eigen omgeving en schalen wat bewezen werkt.",
      },
      {
        titel: "Kennis blijft bij jou",
        p: "We werken in gemengde teams met jouw mensen en dragen alles over, inclusief documentatie en beheer.",
      },
      {
        titel: "Verantwoord en uitlegbaar",
        p: "Elk besluit blijft controleerbaar. AVG en AI Act zijn randvoorwaarden vanaf dag één, geen verrassing achteraf.",
      },
    ],
    expertsHead: "Werk direct met een expert, onze practice leads denken vrijblijvend mee.",
    experts: [
      {
        img: "/assets/photos/portret-blauw.webp",
        role: "CEO · Strategie & Sales",
        naam: "Koen Wijsman",
        tel: "+31610751254",
      },
    ],
    partners: ["Mendix", "Microsoft Azure", "OpenAI", "Databricks"],
    outcomes: [
      { n: "Minder", l: "Repetitief werk" },
      { n: "Sneller", l: "Verwerking van aanvragen" },
      { n: "100%", l: "Uitlegbare besluiten" },
      { n: "0", l: "Black boxes in productie" },
    ],
    insightsTitle: "Kennis over verantwoorde AI",
    insights: [],
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
      {
        q: "Richting",
        titel: "De ambitie is helder, de weg ernaartoe niet",
        p: "Digitaliseren, ja. Maar wat eerst, wat later, en wat niet?",
      },
      {
        q: "Verbinding",
        titel: "Business en IT spreken elkaars taal niet",
        p: "Projecten mislukken zelden op techniek, vaak op afstemming.",
      },
      {
        q: "Executie",
        titel: "Het vorige plan strandde in de la",
        p: "Een strategie is pas af als de operatie hem merkt.",
      },
    ],
    pijlersIntro: "Van inzicht via richting naar uitvoering: we blijven aan boord tot het werkt.",
    pijlers: [
      {
        num: "01",
        titel: "Inzicht",
        p: "Eerst begrijpen waar je staat en waar de waarde zit.",
        items: [
          {
            summary: "Digitale scan",
            p: "Doorlichting van processen, systemen en data: waar lekt tijd en waar zit potentie?",
          },
          {
            summary: "Businesscase per initiatief",
            p: "Elk voorstel doorgerekend op kosten, baten en risico, beslisklaar voor de directie.",
          },
          {
            summary: "IT-landschap analyse",
            p: "Wat kan blijven, wat moet weg en wat mist er? Eerlijk, leveranciersonafhankelijk.",
          },
        ],
      },
      {
        num: "02",
        titel: "Richting",
        p: "Van ambitie naar een geprioriteerde, gedragen roadmap.",
        items: [
          {
            summary: "Visie & roadmap",
            p: "Concreet plan met mijlpalen per kwartaal, gekoppeld aan je businessdoelen.",
          },
          {
            summary: "Portfolio-prioritering",
            p: "Welke initiatieven eerst? Prioriteren op waarde, risico en samenhang.",
          },
          {
            summary: "Architectuurkeuzes",
            p: "Richtinggevende keuzes voor platforms en integraties, AVG- en toekomstproof.",
          },
        ],
      },
      {
        num: "03",
        titel: "Uitvoering",
        p: "Geen rapport voor in de la, we blijven tot het werkt.",
        items: [
          {
            summary: "Transformatiebegeleiding",
            p: "Regie op de uitvoering, met mijlpalen die je operatie meteen merkt.",
          },
          {
            summary: "Verandermanagement",
            p: "Je mensen mee in de verandering: training, communicatie en adoptie.",
          },
          {
            summary: "Meetbare mijlpalen",
            p: "Elk kwartaal aantoonbaar resultaat, bijgestuurd op wat de praktijk leert.",
          },
        ],
      },
    ],
    aanpak: [
      {
        kicker: "Richten",
        titel: "Een roadmap die keuzes maakt",
        p: "We vertalen je bedrijfsdoelen naar een geprioriteerde digitale agenda, met heldere mijlpalen, eigenaren en een eerlijke volgorde.",
        punten: [
          "Van bedrijfsdoel naar digitale agenda",
          "Prioritering op waarde en haalbaarheid",
          "Gedragen door directie én werkvloer",
        ],
        img: "/assets/photos/team-presentatie-applaus.webp",
      },
      {
        kicker: "Uitvoeren",
        titel: "Begeleiding bij de verandering, niet alleen het plan",
        p: "We blijven betrokken tijdens de uitvoering: sturen bij, meten resultaat en zorgen dat elke mijlpaal in de operatie landt.",
        punten: [
          "Kwartaalritme met meetbare mijlpalen",
          "Bijsturen op resultaat, niet op rapporten",
          "Kennisoverdracht aan je eigen organisatie",
        ],
        img: "/assets/photos/team-overleg-scherm.webp",
      },
    ],
    waarom: [
      {
        titel: "Business eerst, technologie als middel",
        p: "We starten bij jouw sectorvraagstuk, niet bij een oplossing die we willen verkopen.",
      },
      {
        titel: "Geen rapport voor in de la",
        p: "Elke aanbeveling komt met een uitvoeringsplan, en we blijven aan boord tot het werkt.",
      },
      {
        titel: "Kennis blijft bij jou",
        p: "We bouwen jouw regievermogen op, zodat je zelf kunt sturen na ons vertrek.",
      },
      {
        titel: "Sectorkennis vanaf dag één",
        p: "We kennen de wetgeving, ketens en systemen van jouw markt, het eerste gesprek gaat meteen de diepte in.",
      },
    ],
    expertsHead: "Werk direct met een expert, onze leads denken vrijblijvend mee.",
    experts: [
      {
        img: "/assets/photos/portret-blauw.webp",
        role: "CEO · Strategie & Sales",
        naam: "Koen Wijsman",
        tel: "+31610751254",
      },
    ],
    partners: ["Mendix", "Microsoft Azure", "OpenAI", "Databricks"],
    outcomes: [
      { n: "< 8", l: "Weken tot gedragen roadmap" },
      { n: "100%", l: "Mijlpalen met eigenaar en datum" },
      { n: "4×", l: "Per jaar meetbaar bijgestuurd" },
      { n: "1", l: "Taal voor business en IT" },
    ],
    insightsTitle: "Kennis die je koers vooruit denkt",
    insights: [],
    ctaTitle: "Klaar om van ambitie naar uitvoering te gaan?",
  },
};

export const DIENST_SLUGS = Object.keys(DIENSTEN);
