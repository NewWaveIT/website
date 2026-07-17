// Mobiel-specifieke content voor de dienst- en sectordetailpagina's.
// 1:1 geport uit ui_kits/website/mobile-dienst-*.html en mobile-sector-*.html.
// De copy wijkt bewust af van de desktopdata (kortere, mobiel-geschreven teksten).

export type MStat = { n: string; l: string };
export type MChal = { q: string; h: string; p: string };
export type MSol = { ph: string; kicker?: string; h: string; p: string; items: string[] };
export type MStep = { num: string; h: string; p: string };
export type MCta = { label: string; href: string; variant?: "primary" | "ghost-dark" };
export type MCase = {
  kicker: string;
  quote: string;
  naam: string;
  rol: string;
  img: string;
  href: string;
  title: string;
};

export type MobileDetailData = {
  kind: "dienst" | "sector";
  /** lucide-icoonnaam voor de badge */
  badgeIcon: string;
  badgeLabel: string;
  /** laatste kruimel (parent volgt uit kind) */
  crumb: string;
  h1: string;
  intro: string;
  ctas: MCta[];
  heroStats: MStat[];
  /** sector: businessvraagstukken */
  vraagstukken?: MChal[];
  aanpakKicker: string;
  aanpakTitle: string;
  sols: MSol[];
  /** dienst: stappenaanpak */
  stepsTitle?: string;
  steps?: MStep[];
  outcomesKicker: string;
  outcomes: MStat[];
  /** sector zorg: klantverhaalkaart */
  case?: MCase;
  ctaTitle: string;
};

export const MOBILE_DIENSTEN: Record<string, MobileDetailData> = {
  mendix: {
    kind: "dienst",
    badgeIcon: "layers",
    badgeLabel: "Dienst · Mendix",
    crumb: "Mendix",
    h1: "Bedrijfskritische applicaties, 6–10× sneller live.",
    intro:
      "Low-code applicaties die aansluiten op je landschap — van proof-of-concept tot productie in weken, niet maanden.",
    ctas: [{ label: "Plan een strategiegesprek", href: "/contact", variant: "primary" }],
    heroStats: [
      { n: "6–10×", l: "Sneller dan traditionele bouw" },
      { n: "Weken", l: "Van start tot productie" },
      { n: "100%", l: "Overdraagbaar aan je team" },
    ],
    aanpakKicker: "Wat we doen",
    aanpakTitle: "Van eerste app tot platform",
    sols: [
      {
        ph: "[ product shot · Mendix-applicatie ]",
        h: "Applicaties die het primaire proces dragen",
        p: "Geen randapplicaties maar kernsystemen: vergunningen, planning, acceptatie, shopfloor.",
        items: [
          "Integraties met je bestaande kernsystemen",
          "Schaalbare architectuur die meegroeit",
          "Security en compliance vanaf dag één",
        ],
      },
      {
        ph: "[ foto · kennisoverdracht sessie ]",
        h: "Jouw team leert het zelf",
        p: "Kennisoverdracht is onderdeel van elke opdracht — zodat je niet afhankelijk wordt.",
        items: [
          "Samen bouwen met je eigen ontwikkelaars",
          "Reviews, richtlijnen en platformgovernance",
          "Beheer overdraagbaar of bij ons belegd",
        ],
      },
    ],
    stepsTitle: "In vier stappen naar productie",
    steps: [
      { num: "01", h: "Discovery", p: "Twee weken: proces, gebruikers en integraties scherp." },
      { num: "02", h: "Eerste release", p: "Binnen zes weken een werkende versie bij echte gebruikers." },
      { num: "03", h: "Uitbouwen", p: "Elke twee weken een release, prioriteit bij businesswaarde." },
      { num: "04", h: "Overdragen", p: "Kennis, governance en beheer geborgd in jouw organisatie." },
    ],
    outcomesKicker: "Resultaten",
    outcomes: [
      { n: "6–10×", l: "Sneller opgeleverd" },
      { n: "-40%", l: "Lagere procesdoorlooptijd" },
      { n: "100%", l: "Auditproof processen" },
      { n: "Weken", l: "Eerste waarde zichtbaar" },
    ],
    ctaTitle: "Welk proces zou jij in zes weken willen versnellen?",
  },
  ai: {
    kind: "dienst",
    badgeIcon: "brain-circuit",
    badgeLabel: "Dienst · AI",
    crumb: "AI",
    h1: "AI die processen verbetert. Geen hype, wél resultaat.",
    intro:
      "Strategische en verantwoorde inzet van AI binnen je bestaande IT-landschap — uitlegbaar, en altijd met de mens aan het stuur.",
    ctas: [{ label: "Plan een strategiegesprek", href: "/contact", variant: "primary" }],
    heroStats: [
      { n: "6 wkn", l: "Van scan naar werkende pilot" },
      { n: "100%", l: "Uitlegbare besluiten" },
      { n: "AI Act", l: "& AVG-proof vanaf ontwerp" },
    ],
    aanpakKicker: "Wat we doen",
    aanpakTitle: "Van AI-scan tot geborgd proces",
    sols: [
      {
        ph: "[ diagram · AI-scan ]",
        h: "AI-scan: van hype naar businesscase",
        p: "We brengen in kaart waar AI in jouw processen aantoonbaar waarde oplevert — en waar niet.",
        items: [
          "Proceskansen gewogen op waarde en risico",
          "Datakwaliteit en randvoorwaarden getoetst",
          "Businesscase per use-case",
        ],
      },
      {
        ph: "[ product shot · triage-assistent ]",
        h: "Pilots die doorgroeien naar productie",
        p: "Werkende pilots binnen zes weken, gebouwd om op te schalen — geen wegwerp-demo’s.",
        items: [
          "Triage, documentcontrole, voorspelling",
          "Uitlegbaarheid als ontwerpeis",
          "Geborgd in je applicatielandschap (o.a. Mendix)",
        ],
      },
    ],
    stepsTitle: "Verantwoord van idee naar impact",
    steps: [
      { num: "01", h: "Scan", p: "Twee weken: use-cases, data en risico’s gewogen." },
      { num: "02", h: "Pilot", p: "Zes weken: werkende oplossing op echte data." },
      { num: "03", h: "Bewijs", p: "Meetbaar resultaat en uitlegbaarheid getoetst." },
      { num: "04", h: "Opschalen", p: "Van pilot naar geborgd proces, incl. monitoring." },
    ],
    outcomesKicker: "Resultaten",
    outcomes: [
      { n: "-50%", l: "Kortere doorlooptijd met triage" },
      { n: "6 wkn", l: "Van scan naar pilot" },
      { n: "100%", l: "Uitlegbaar richting toezicht" },
      { n: "0", l: "Black boxes in je proces" },
    ],
    ctaTitle: "Waar zou AI jouw mensen morgen al kunnen ontlasten?",
  },
  strategie: {
    kind: "dienst",
    badgeIcon: "route",
    badgeLabel: "Dienst · Strategie",
    crumb: "Digitale strategie",
    h1: "Van ambitie naar roadmap én uitvoering.",
    intro:
      "Wij verbinden business en IT in een concreet plan — en blijven aan boord tot het werkt. Geen dik rapport voor in de la.",
    ctas: [{ label: "Plan een strategiegesprek", href: "/contact", variant: "primary" }],
    heroStats: [
      { n: "1 team", l: "Van advies t/m uitvoering" },
      { n: "90 dgn", l: "Van sessie naar eerste resultaat" },
      { n: "0", l: "Rapporten voor in de la" },
    ],
    aanpakKicker: "Wat we doen",
    aanpakTitle: "Strategie die de operatie haalt",
    sols: [
      {
        ph: "[ foto · strategiesessie ]",
        h: "Roadmap met businesscase per initiatief",
        p: "Van ambitie naar geprioriteerde initiatieven, elk met eigenaar, waarde en volgorde.",
        items: [
          "Ambitie vertaald naar meetbare initiatieven",
          "Architectuurkeuzes die standhouden",
          "Prioritering op waarde én haalbaarheid",
        ],
      },
      {
        ph: "[ diagram · van plan naar release ]",
        h: "Wij blijven tot het werkt",
        p: "Hetzelfde team dat adviseert, bouwt en begeleidt de verandering op de werkvloer.",
        items: [
          "Begeleiding bij de verandering",
          "Kwartaalritme: meten, leren, bijsturen",
          "Directe lijn naar bouw (Mendix, AI)",
        ],
      },
    ],
    stepsTitle: "In 90 dagen van sessie naar resultaat",
    steps: [
      { num: "01", h: "Verkennen", p: "Strategiegesprek en analyse van landschap en ambitie." },
      { num: "02", h: "Richten", p: "Roadmap met businesscase per initiatief." },
      { num: "03", h: "Starten", p: "Eerste initiatief binnen 90 dagen in uitvoering." },
      { num: "04", h: "Bijsturen", p: "Kwartaalritme met meetbare voortgang." },
    ],
    outcomesKicker: "Resultaten",
    outcomes: [
      { n: "90 dgn", l: "Eerste resultaat zichtbaar" },
      { n: "1", l: "Roadmap die business & IT delen" },
      { n: "+", l: "Draagvlak door co-creatie" },
      { n: "0", l: "Plannen zonder eigenaar" },
    ],
    ctaTitle: "Klaar om van ambitie naar uitvoering te gaan?",
  },
};

export const MOBILE_SECTOREN: Record<string, MobileDetailData> = {
  "publieke-sector": {
    kind: "sector",
    badgeIcon: "landmark",
    badgeLabel: "Publieke sector",
    crumb: "Publieke sector",
    h1: "Digitale dienstverlening die burgers vertrouwen.",
    intro:
      "Van vergunningverlening tot subsidies: wij versnellen processen en maken elke stap aantoonbaar — binnen de kaders van de wet.",
    ctas: [{ label: "Plan een strategiegesprek", href: "/contact", variant: "primary" }],
    heroStats: [
      { n: "-40%", l: "Kortere doorlooptijd" },
      { n: "8×", l: "Sneller live dan geraamd" },
      { n: "100%", l: "Auditproof & AVG" },
    ],
    vraagstukken: [
      {
        q: "Doorlooptijden",
        h: "“Onze doorlooptijden groeien sneller dan onze formatie.”",
        p: "Meer aanvragen, evenveel mensen: alleen slimmere processen lossen dat op.",
      },
      {
        q: "Aantoonbaarheid",
        h: "“Elke stap moet uitlegbaar zijn — ook die van een algoritme.”",
        p: "Transparantie is geen rapport achteraf maar een ontwerpeis.",
      },
      {
        q: "Legacy",
        h: "“Onze kernsystemen remmen elke verandering.”",
        p: "Vernieuwen zonder big bang: bouwen óp wat er staat.",
      },
    ],
    aanpakKicker: "Onze aanpak",
    aanpakTitle: "Van vraagstuk naar werkende oplossing",
    sols: [
      {
        ph: "[ product shot · vergunningen-app ]",
        kicker: "Mendix",
        h: "Zaakgericht werken dat wél doorstroomt",
        p: "Applicaties rond het echte aanvraagproces, gekoppeld aan je kernregistraties.",
        items: [
          "Digitale intake met validatie aan de bron",
          "Koppelingen met zaaksysteem en basisregistraties",
          "Volledige audittrail per besluit",
        ],
      },
      {
        ph: "[ foto · behandelaar aan het werk ]",
        kicker: "AI & Strategie",
        h: "Slimme triage, uitlegbaar besloten",
        p: "AI sorteert voor, de behandelaar beslist — met een roadmap die bestuur en uitvoering verbindt.",
        items: [
          "Automatische documentcontrole en voorsortering",
          "Uitlegbaarheid als ontwerpeis (AI Act-proof)",
          "Roadmap van pilot naar structurele inzet",
        ],
      },
    ],
    outcomesKicker: "Resultaten",
    outcomes: [
      { n: "-40%", l: "Doorlooptijd per aanvraag" },
      { n: "6–10×", l: "Sneller opgeleverd" },
      { n: "+30%", l: "Hogere burgertevredenheid" },
      { n: "100%", l: "Aantoonbaar compliant" },
    ],
    ctaTitle: "Benieuwd wat dit voor jouw organisatie betekent?",
  },
  mobiliteit: {
    kind: "sector",
    badgeIcon: "truck",
    badgeLabel: "Mobiliteit & logistiek",
    crumb: "Mobiliteit & logistiek",
    h1: "Realtime grip op assets, planning en stromen.",
    intro:
      "Van assetbeheer tot reizigersinformatie: systemen waarmee infra, OV en logistiek sneller schakelen dan de dienstregeling.",
    ctas: [{ label: "Plan een strategiegesprek", href: "/contact", variant: "primary" }],
    heroStats: [
      { n: "Realtime", l: "Inzicht in de operatie" },
      { n: "6 wkn", l: "Eerste release live" },
      { n: "24/7", l: "Beschikbaarheid kritisch" },
    ],
    vraagstukken: [
      {
        q: "Versnippering",
        h: "“Onze planning leeft in Excel, onze assets in vijf systemen.”",
        p: "Eén operationeel beeld ontbreekt — beslissingen lopen achter de feiten aan.",
      },
      {
        q: "Slimme assets",
        h: "“Onze assets worden slimmer, onze systemen niet.”",
        p: "Sensordata stroomt binnen maar stuurt de operatie nog niet.",
      },
      {
        q: "Ketendruk",
        h: "“Elke verstoring kost direct klanten en geld.”",
        p: "Sneller bijsturen vraagt om realtime informatie op de werkvloer.",
      },
    ],
    aanpakKicker: "Onze aanpak",
    aanpakTitle: "Van vraagstuk naar werkende oplossing",
    sols: [
      {
        ph: "[ product shot · planning-dashboard ]",
        kicker: "Mendix",
        h: "Van Excel-planning naar realtime regie",
        p: "Plannings- en assetapplicaties die de hele keten hetzelfde beeld geven.",
        items: [
          "Realtime asset- en vlootoverzicht",
          "Planning met wat-als-scenario’s",
          "Mobiel voor de buitendienst",
        ],
      },
      {
        ph: "[ foto · verkeersleiding ]",
        kicker: "AI & Strategie",
        h: "Voorspellen in plaats van reageren",
        p: "Voorspellend onderhoud en vraagvoorspelling, geborgd in een uitvoerbare digitale strategie.",
        items: [
          "Voorspellend onderhoud op sensordata",
          "Vraag- en verstoringsvoorspelling",
          "Architectuur die met de keten meegroeit",
        ],
      },
    ],
    outcomesKicker: "Resultaten",
    outcomes: [
      { n: "-25%", l: "Minder verstoringsminuten" },
      { n: "6–10×", l: "Sneller opgeleverd" },
      { n: "+20%", l: "Hogere asset-benutting" },
      { n: "1", l: "Operationeel beeld voor de keten" },
    ],
    ctaTitle: "Benieuwd wat dit voor jouw organisatie betekent?",
  },
  banken: {
    kind: "sector",
    badgeIcon: "landmark",
    badgeLabel: "Banken & financials",
    crumb: "Banken & financials",
    h1: "Wendbaar worden zonder concessies aan compliance.",
    intro:
      "Kernprocessen digitaliseren binnen de kaders van DNB, AFM en Wwft — zonder in te leveren op snelheid of klantvertrouwen.",
    ctas: [{ label: "Plan een strategiegesprek", href: "/contact", variant: "primary" }],
    heroStats: [
      { n: "100%", l: "Audit-proof processen" },
      { n: "-50%", l: "Kortere acceptatietijd" },
      { n: "0", l: "Concessies aan toezicht" },
    ],
    vraagstukken: [
      {
        q: "Compliance",
        h: "“Elke innovatie strandt op compliance.”",
        p: "Regels zijn een gegeven; het proces eromheen kan wél sneller.",
      },
      {
        q: "Handwerk",
        h: "“Klantacceptatie is een estafette van controles.”",
        p: "KYC en acceptatie leunen op handmatige checks en overdrachten.",
      },
      {
        q: "Legacy",
        h: "“Ons kernsysteem is te kritisch om aan te raken.”",
        p: "Vernieuwing moet er veilig omheen gebouwd worden.",
      },
    ],
    aanpakKicker: "Onze aanpak",
    aanpakTitle: "Van vraagstuk naar werkende oplossing",
    sols: [
      {
        ph: "[ product shot · acceptatie-flow ]",
        kicker: "Mendix",
        h: "Klantacceptatie als gestroomlijnd proces",
        p: "Digitale KYC- en acceptatieflows met volledige dossiervorming, gebouwd naast je kernsysteem.",
        items: [
          "Digitale intake met bronvalidatie",
          "Vier-ogen-principe ingebouwd",
          "Volledige audittrail per dossier",
        ],
      },
      {
        ph: "[ foto · risk-team in overleg ]",
        kicker: "AI & Strategie",
        h: "Risico slimmer wegen, uitlegbaar blijven",
        p: "AI voor triage en monitoring — altijd uitlegbaar, altijd met de mens aan het stuur.",
        items: [
          "Transactie- en risicomonitoring met AI",
          "Uitlegbaarheid richting toezichthouder",
          "Roadmap die risk en business verbindt",
        ],
      },
    ],
    outcomesKicker: "Resultaten",
    outcomes: [
      { n: "-50%", l: "Acceptatietijd" },
      { n: "6–10×", l: "Sneller opgeleverd" },
      { n: "100%", l: "Aantoonbaar compliant" },
      { n: "+25%", l: "Minder handmatige checks" },
    ],
    ctaTitle: "Benieuwd wat dit voor jouw organisatie betekent?",
  },
  zorg: {
    kind: "sector",
    badgeIcon: "heart-pulse",
    badgeLabel: "Zorg",
    crumb: "Zorg",
    h1: "Meer tijd voor zorg, minder voor administratie.",
    intro:
      "Wij nemen registratielast weg en geven zorgprofessionals systemen die met ze meewerken: veilig, gekoppeld aan je EPD.",
    ctas: [
      { label: "Plan een strategiegesprek", href: "/contact", variant: "primary" },
      { label: "Download sectorrapport", href: "/contact?type=sectorrapport", variant: "ghost-dark" },
    ],
    heroStats: [
      { n: "-35%", l: "Minder administratietijd" },
      { n: "8×", l: "Sneller live dan geraamd" },
      { n: "100%", l: "NEN 7510 & AVG" },
    ],
    vraagstukken: [
      {
        q: "Werkdruk",
        h: "Hoe geven we professionals hun tijd terug in een krappe arbeidsmarkt?",
        p: "Elk uur registratie is een uur geen zorg.",
      },
      {
        q: "Versnippering",
        h: "Hoe verbinden we systemen die elk hun eigen waarheid hebben?",
        p: "EPD, roostering, kwaliteit: overal opnieuw inloggen en overtypen.",
      },
      {
        q: "Verantwoording",
        h: "Hoe voldoen we aan kwaliteitseisen zonder extra registratielast?",
        p: "Aantoonbaarheid mag geen tweede baan zijn.",
      },
    ],
    aanpakKicker: "Onze aanpak",
    aanpakTitle: "Van vraagstuk naar werkende oplossing",
    sols: [
      {
        ph: "[ product shot · zorgpad-app ]",
        kicker: "Mendix",
        h: "Werkprocessen die het EPD aanvullen, niet dupliceren",
        p: "Applicaties rond het echte werkproces — van zorgpad tot capaciteitsplanning — die naadloos koppelen met je EPD.",
        items: [
          "Digitale zorgpaden en overdrachten",
          "Koppelingen met EPD (HL7/FHIR)",
          "Eenmalige registratie, meervoudig gebruik",
        ],
      },
      {
        ph: "[ foto · zorgprofessional met tablet ]",
        kicker: "AI & Strategie",
        h: "Slim ontlasten, met de professional aan het stuur",
        p: "AI verantwoord ingezet om administratie te verlichten en capaciteit te voorspellen — uitlegbaar en binnen alle zorgkaders.",
        items: [
          "Automatische verslaglegging en samenvatting",
          "Capaciteits- en instroomvoorspelling",
          "Roadmap samen met zorgprofessionals",
        ],
      },
    ],
    outcomesKicker: "Resultaten in de zorg",
    outcomes: [
      { n: "-35%", l: "Minder administratietijd per dienst" },
      { n: "6–10×", l: "Snellere oplevering met low-code" },
      { n: "+25%", l: "Hogere medewerkerstevredenheid" },
      { n: "100%", l: "Aantoonbaar compliant" },
    ],
    case: {
      kicker: "Zorg · VVT",
      title: "VVT-organisatie: registratie gehalveerd",
      quote: "“Onze teams registreren in de app tijdens het werk, niet erna aan het bureau.”",
      naam: "Annemiek Bos",
      rol: "Bestuurder",
      img: "/assets/photos/overleg-lachend.png",
      href: "/klantverhalen/coa",
    },
    ctaTitle: "Benieuwd wat dit voor jouw organisatie betekent?",
  },
  manufacturing: {
    kind: "sector",
    badgeIcon: "factory",
    badgeLabel: "Manufacturing",
    crumb: "Manufacturing",
    h1: "Productie die meebeweegt met de vraag.",
    intro:
      "Van shopfloor tot boardroom: wij verbinden productie, planning en kwaliteit in applicaties die je operatie écht versnellen.",
    ctas: [{ label: "Plan een strategiegesprek", href: "/contact", variant: "primary" }],
    heroStats: [
      { n: "-30%", l: "Kortere omsteltijden" },
      { n: "+22%", l: "Hogere machinebenutting" },
      { n: "1", l: "Bron van waarheid" },
    ],
    vraagstukken: [
      {
        q: "Data zonder actie",
        h: "“Onze machines produceren data die niemand gebruikt.”",
        p: "Sensordata blijft in silo’s hangen en stuurt de planning niet.",
      },
      {
        q: "Papier op de vloer",
        h: "“Kwaliteit en registratie draaien op klemborden.”",
        p: "Handmatige registratie kost tijd en verbergt problemen.",
      },
      {
        q: "Flexibele vraag",
        h: "“Kleine series, korte levertijden — onze systemen zijn er niet op gebouwd.”",
        p: "Wendbaarheid vraagt om systemen die met de orderstroom meebewegen.",
      },
    ],
    aanpakKicker: "Onze aanpak",
    aanpakTitle: "Van vraagstuk naar werkende oplossing",
    sols: [
      {
        ph: "[ product shot · shopfloor-app ]",
        kicker: "Mendix",
        h: "De shopfloor digitaal, zonder ERP-verbouwing",
        p: "Shopfloor-apps voor registratie, kwaliteit en orderopvolging — gekoppeld aan ERP en machines.",
        items: [
          "Digitale werkinstructies en registratie",
          "Koppeling met ERP en machinedata (OPC UA)",
          "Kwaliteit geborgd in het proces",
        ],
      },
      {
        ph: "[ foto · productieoverleg ]",
        kicker: "AI & Strategie",
        h: "Machinedata die eindelijk de planning stuurt",
        p: "Voorspellend onderhoud en slimme planning, geborgd in een smart-industry-roadmap.",
        items: [
          "Voorspellend onderhoud op sensordata",
          "Planning die reageert op de werkelijke output",
          "Roadmap van pilot naar fabrieksbrede uitrol",
        ],
      },
    ],
    outcomesKicker: "Resultaten",
    outcomes: [
      { n: "-30%", l: "Omsteltijd" },
      { n: "+22%", l: "Machinebenutting" },
      { n: "6–10×", l: "Sneller opgeleverd" },
      { n: "-50%", l: "Minder papier op de vloer" },
    ],
    ctaTitle: "Benieuwd wat dit voor jouw organisatie betekent?",
  },
};
