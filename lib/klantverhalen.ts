/** Klantverhalen voor /klantverhalen en /klantverhalen/[slug]. */

export interface KPI {
  n: string;
  l: string;
}

export interface Klantverhaal {
  slug: string;
  sector: string; // filterlabel, bv. "Publieke sector"
  metric: string; // teaser-metric, bv. "-60%"
  cardTitel: string;
  org: string; // teaser org-regel
  image: string;
  // detail
  tag: string;
  h1: string;
  intro: string;
  impact: KPI[];
  challenge: string;
  pull: string;
  aanpak: string[];
  resultaat: string;
  aside: { sector: string; diensten: string; doorlooptijd: string; team: string };
  quote: string;
  quoteNaam: string;
  quoteRol: string;
}

export const KLANTVERHALEN: Klantverhaal[] = [
  {
    slug: "coa",
    sector: "Publieke sector",
    metric: "-60%",
    cardTitel: "Van maanden naar weken: aanvragen die burgers niet laten wachten",
    org: "COA · Mendix + AI",
    image: "/assets/photos/team-presentatie-breed.webp",
    tag: "Publieke sector · COA",
    h1: "Van maanden naar weken: aanvragen die burgers niet meer laten wachten.",
    intro:
      "Hoe COA samen met The New Wave IT een kritisch aanvraagproces digitaliseerde: sneller, aantoonbaar en volledig binnen de kaders.",
    impact: [
      { n: "-60%", l: "Doorlooptijd per aanvraag" },
      { n: "8×", l: "Sneller live dan geraamd" },
      { n: "100%", l: "Auditproof & AVG-compliant" },
      { n: "+35%", l: "Hogere tevredenheid" },
    ],
    challenge:
      "Het aanvraagproces van COA leunde op verouderde systemen en handmatige stappen. Doorlooptijden liepen op, terwijl medewerkers veel tijd kwijt waren aan controles en dossiervorming. De vraag: hoe versnellen we dit fundamenteel, zónder in te leveren op zorgvuldigheid en aantoonbaarheid?",
    pull: "“We wilden geen pleister, maar een proces dat structureel sneller en aantoonbaar beter is.”",
    aanpak: [
      "In korte sprints bouwden we, als één team dat adviseert, bouwt én beheert, een Mendix-applicatie die naadloos aansloot op de bestaande kernregistraties. AI ondersteunt medewerkers bij triage en documentcontrole, altijd met de mens aan het stuur en volledig uitlegbaar.",
      "Door business en IT vanaf dag één te verbinden, konden we snel schakelen en tussentijds bijsturen op wat er in de praktijk echt toe deed.",
    ],
    resultaat:
      "De doorlooptijd per aanvraag daalde met 60%, de oplossing was acht keer sneller live dan oorspronkelijk geraamd, en elke stap is volledig herleidbaar. Medewerkers houden tijd over voor het werk dat er echt toe doet, en burgers wachten korter.",
    aside: { sector: "Publieke sector", diensten: "Mendix · AI", doorlooptijd: "14 weken", team: "Plan-build-run" },
    quote: "“The New Wave IT denkt echt mee met onze uitdagingen. Efficiënt, betrouwbaar en menselijk.”",
    quoteNaam: "Peter van Dam",
    quoteRol: "IT Manager, COA",
  },
  {
    slug: "ov-realtime-assetbeheer",
    sector: "Mobiliteit",
    metric: "6 wkn",
    cardTitel: "Van Excel-planning naar realtime assetbeheer",
    org: "OV-bedrijf · Mendix",
    image: "/assets/photos/overleg-laptop.webp",
    tag: "Mobiliteit · OV-bedrijf",
    h1: "Van Excel-planning naar realtime grip op de vloot.",
    intro:
      "Hoe een OV-bedrijf assetbeheer en planning verving door één realtime applicatie, gebouwd op de data die de vloot al produceerde.",
    impact: [
      { n: "6 wkn", l: "Tot eerste release" },
      { n: "Realtime", l: "Inzicht in assets en planning" },
      { n: "-30%", l: "Minder verstoringsimpact" },
      { n: "1", l: "Bron van waarheid" },
    ],
    challenge:
      "Planning, onderhoud en assetinformatie zaten in losse systemen en spreadsheets. Verstoringen werden te laat zichtbaar om nog effectief bij te sturen.",
    pull: "“We reageerden altijd achteraf. Nu zien we het aankomen en sturen we vooraf bij.”",
    aanpak: [
      "We bouwden een Mendix-applicatie die planning, assetbeheer en sensordata samenbrengt in één realtime beeld, gekoppeld aan de bestaande kernsystemen.",
      "In korte sprints leverden we werkende functionaliteit op en betrokken we de planners vanaf dag één, zodat de oplossing paste bij het echte werkproces.",
    ],
    resultaat:
      "Binnen zes weken stond de eerste release live. Planners werken nu vanuit één realtime beeld en verstoringen worden eerder opgevangen, met merkbaar minder impact op de reiziger.",
    aside: { sector: "Mobiliteit", diensten: "Mendix", doorlooptijd: "6 weken tot release", team: "Plan-build-run" },
    quote: "“Voor het eerst werken planning en operatie vanuit dezelfde, actuele data.”",
    quoteNaam: "Ilse Vermeer",
    quoteRol: "Manager Operatie",
  },
  {
    slug: "retailbank-klantacceptatie",
    sector: "Banken",
    metric: "100%",
    cardTitel: "Audit-proof klantacceptatie zonder extra fte's",
    org: "Retailbank · Strategie + Mendix",
    image: "/assets/photos/klantgesprek-tafel.webp",
    tag: "Banken · Retailbank",
    h1: "Audit-proof klantacceptatie, zonder extra fte's.",
    intro:
      "Hoe een retailbank het klantacceptatieproces digitaliseerde met beheersing en herleidbaarheid ingebouwd vanaf het ontwerp.",
    impact: [
      { n: "100%", l: "Herleidbaar en audit-proof" },
      { n: "-50%", l: "Kortere doorlooptijd" },
      { n: "0", l: "Extra fte's nodig" },
      { n: "6–10×", l: "Snellere oplevering" },
    ],
    challenge:
      "Elke procesverbetering strandde op de beheersings- en toezichtsvereisten. Snelheid en compliance leken elkaar uit te sluiten.",
    pull: "“Snelheid en compliance gaan bij ons nu hand in hand.”",
    aanpak: [
      "We vertaalden de strategie naar een concrete roadmap en bouwden een Mendix-applicatie met controle en herleidbaarheid by design, gekoppeld aan de kernbanksystemen.",
      "Toezichtvereisten waren randvoorwaarde vanaf het eerste ontwerp, niet een controle achteraf.",
    ],
    resultaat:
      "Het acceptatieproces is volledig herleidbaar, de doorlooptijd halveerde en er waren geen extra fte's nodig, terwijl de toezichthouder tevreden is.",
    aside: { sector: "Banken", diensten: "Strategie · Mendix", doorlooptijd: "16 weken", team: "Plan-build-run" },
    quote: "“Wendbaar leveren én door de compliance-toets komen: het kan wél.”",
    quoteNaam: "Mark de Wit",
    quoteRol: "Hoofd Digitalisering",
  },
  {
    slug: "vvt-registratielast",
    sector: "Zorg",
    metric: "-35%",
    cardTitel: "Registratielast omlaag, tijd voor zorg omhoog",
    org: "VVT-instelling · Mendix",
    image: "/assets/photos/overleg-lachend.webp",
    tag: "Zorg · VVT-instelling",
    h1: "Minder registreren, meer tijd voor de patiënt.",
    intro:
      "Hoe een VVT-instelling registratielast wegnam met een applicatie die aansluit op het EPD en meewerkt met de zorgprofessional.",
    impact: [
      { n: "-35%", l: "Minder registratielast" },
      { n: "+ tijd", l: "Voor directe zorg" },
      { n: "100%", l: "Veilig en gekoppeld aan EPD" },
      { n: "6–10×", l: "Snellere oplevering" },
    ],
    challenge:
      "Zorgprofessionals verloren kostbare tijd aan dubbele registratie en systemen die niet met elkaar praatten.",
    pull: "“Onze mensen zijn weer bezig met zorg in plaats van formulieren.”",
    aanpak: [
      "We bouwden een veilige Mendix-applicatie rond het echte werkproces, gekoppeld aan het EPD, die dubbele registratie wegneemt.",
      "De zorgprofessionals testten mee vanaf de eerste sprint, zodat het systeem met ze meewerkt in plaats van tegen.",
    ],
    resultaat:
      "De registratielast daalde met 35% en zorgprofessionals houden meer tijd over voor de patiënt, veilig en volledig gekoppeld aan het EPD.",
    aside: { sector: "Zorg", diensten: "Mendix", doorlooptijd: "12 weken", team: "Plan-build-run" },
    quote: "“Het systeem werkt eindelijk mee in plaats van tegen.”",
    quoteNaam: "Anouk Prins",
    quoteRol: "Manager Zorg & Innovatie",
  },
  {
    slug: "maakbedrijf-machinedata",
    sector: "Manufacturing",
    metric: "+22%",
    cardTitel: "Machinedata die eindelijk de planning stuurt",
    org: "Maakbedrijf · AI",
    image: "/assets/photos/team-presentatie-breed.webp",
    tag: "Manufacturing · Maakbedrijf",
    h1: "Machinedata die eindelijk de planning stuurt.",
    intro:
      "Hoe een maakbedrijf shopfloor-data ontsloot en inzette om planning en kwaliteit realtime bij te sturen.",
    impact: [
      { n: "+22%", l: "Hogere output" },
      { n: "Kortere", l: "Omsteltijden" },
      { n: "Realtime", l: "Inzicht shopfloor tot boardroom" },
      { n: "100%", l: "Op bestaande machinedata" },
    ],
    challenge:
      "De machines produceerden volop data, maar die bereikte de planning en besluitvorming niet. Verstoringen werden te laat zichtbaar.",
    pull: "“We stuurden op onderbuik. Nu sturen we op data, in realtime.”",
    aanpak: [
      "We ontsloten de bestaande machinedata en bouwden inzicht- en besluitondersteuning die planning en kwaliteit realtime voedt.",
      "Verantwoord en uitlegbaar ingezet, met de operators aan het stuur.",
    ],
    resultaat:
      "De output steeg met 22% en omsteltijden werden korter, doordat verstoringen nu vroeg zichtbaar zijn en de planning meebeweegt met de realiteit.",
    aside: { sector: "Manufacturing", diensten: "AI", doorlooptijd: "10 weken", team: "Plan-build-run" },
    quote: "“Onze data doet eindelijk iets nuttigs op de vloer.”",
    quoteNaam: "Bram Kok",
    quoteRol: "Operations Director",
  },
  {
    slug: "provincie-subsidieproces",
    sector: "Publieke sector",
    metric: "8 wkn",
    cardTitel: "Subsidieproces digitaal én volledig aantoonbaar",
    org: "Provincie · Strategie + Mendix",
    image: "/assets/photos/founders-trio.webp",
    tag: "Publieke sector · Provincie",
    h1: "Subsidies digitaal aanvragen, volledig aantoonbaar afgehandeld.",
    intro:
      "Hoe een provincie het subsidieproces digitaliseerde: sneller voor de aanvrager, aantoonbaar voor de organisatie.",
    impact: [
      { n: "8 wkn", l: "Tot eerste release" },
      { n: "100%", l: "Aantoonbaar afgehandeld" },
      { n: "-40%", l: "Minder handmatig werk" },
      { n: "6–10×", l: "Snellere oplevering" },
    ],
    challenge:
      "Het subsidieproces was papieren en arbeidsintensief, terwijl aanvragers digitale snelheid verwachtten en elke stap herleidbaar moest zijn.",
    pull: "“Sneller voor de aanvrager, en tegelijk volledig aantoonbaar voor ons.”",
    aanpak: [
      "We vertaalden de ambitie naar een roadmap en bouwden een Mendix-applicatie voor het volledige digitale aanvraag- en beoordelingsproces.",
      "Herleidbaarheid en AVG waren randvoorwaarden vanaf het ontwerp.",
    ],
    resultaat:
      "Binnen acht weken stond de eerste release live. Aanvragers dienen digitaal in, de organisatie handelt sneller af en elke stap is volledig aantoonbaar.",
    aside: { sector: "Publieke sector", diensten: "Strategie · Mendix", doorlooptijd: "8 weken tot release", team: "Plan-build-run" },
    quote: "“Digitaal én aantoonbaar bleek geen tegenstelling.”",
    quoteNaam: "Hanneke Bos",
    quoteRol: "Programmamanager Digitalisering",
  },
];

export const KLANTVERHAAL_MAP: Record<string, Klantverhaal> = Object.fromEntries(
  KLANTVERHALEN.map((k) => [k.slug, k]),
);
export const KLANTVERHAAL_SLUGS = KLANTVERHALEN.map((k) => k.slug);
