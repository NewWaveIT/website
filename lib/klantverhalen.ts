/** Klantverhalen voor /klantverhalen en /klantverhalen/[slug]. */

export interface KPI {
  n: string;
  l: string;
}

/** Genummerde sub-sectie van een uitgebreid klantverhaal (bv. per gebouwde applicatie). */
export interface Sectie {
  titel: string;
  tekst: string;
  resultaten: string[];
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
  /** Vlakke alinea's onder "De aanpak" — gebruikt als er geen `secties` zijn. */
  aanpak: string[];
  /** Rijker alternatief voor `aanpak`: genummerde sub-secties met eigen resultatenlijst. */
  secties?: Sectie[];
  resultaat: string;
  aside: { sector: string; diensten: string; doorlooptijd: string; team: string };
  quote: string;
  quoteNaam: string;
  quoteRol: string;
}

export const KLANTVERHALEN: Klantverhaal[] = [
  {
    slug: "moove",
    sector: "Mobiliteit",
    metric: "30 min",
    cardTitel: "Twee Mendix-apps, twee maanden, écht in gebruik",
    org: "Moove Connected Mobility · Mendix",
    image: "/assets/photos/team-overleg-scherm.webp",
    tag: "Mobiliteit · Moove Connected Mobility",
    h1: "Twee schakels in de keten: hoe Moove installaties en ritregistratie automatiseerde.",
    intro:
      "Moove levert fleet performance als service. The New Wave IT werd ingeschakeld als Mendix-partner om twee applicaties te bouwen die direct aansluiten op hoe installateurs, chauffeurs en operations écht werken.",
    impact: [
      { n: "30 min", l: "Sneller per voertuig on-boarding" },
      { n: "2 mnd", l: "Van scratch naar werkende applicatie" },
      { n: "2", l: "Mendix-apps, dagelijks in gebruik" },
      { n: "100%", l: "Auditproof met volledige logging" },
    ],
    challenge:
      "Moove had al een bestaand Mendix-platform. De uitdaging zat niet in het platform zelf, maar in de ontbrekende schakels: een betrouwbare verwerking van voertuiginstallaties, en een moderne manier om handmatige ritregistratie te vervangen. Installaties liepen via meerdere losse systemen — foutgevoelig, arbeidsintensief en moeilijk te auditen. Chauffeurs deden hun ritregistratie nog zoals twintig jaar geleden: handmatig, in een notitieboekje of via generieke tools. Geotab registreerde elke rit al automatisch, maar de stap van rijdata naar een compliant rittenrapport dat een chauffeur zelf kan beheren, ontbrak nog.",
    pull: "“Het voelt alsof je samenwerkt met goed ingewerkte en enthousiaste collega's.”",
    aanpak: [],
    secties: [
      {
        titel: "Strategisch traject: bouwen op een bestaand fundament",
        tekst:
          "Moove wilde het bestaande Mendix-landschap verder structureren én twee nieuwe applicaties bouwen die direct aansluiten op de operationele werkprocessen. We begonnen niet met bouwen, maar met begrijpen: een analyse van het bestaande landschap, een roadmap en gezamenlijke prioritering — een gefaseerde opbouw in plaats van een big-bang. Business en IT werkten vanaf het begin samen in een Competence Center, vanuit gedeelde richtlijnen voor security, performance en datakwaliteit.",
        resultaten: [
          "Een gestructureerd fundament: het bestaande platform uitgebreid met twee nieuwe, direct bruikbare applicaties",
          "Een actief Competence Center waarin business en IT structureel samenwerken",
        ],
      },
      {
        titel: "MooveInstaller: foutloze verwerking van voertuiginstallaties",
        tekst:
          "Installaties van voertuigen (install, swap, de-install) liepen via meerdere losse systemen — foutgevoelig en moeilijk te auditen. We bouwden MooveInstaller: een centrale Mendix-applicatie die het volledige installatieproces digitaal en gestandaardiseerd verwerkt, van invoer en validatie tot synchronisatie met MyGeotab en het Moove-platform. Vanaf scratch naar werkende applicatie in twee maanden.",
        resultaten: [
          "30 minuten sneller per voertuig on-boarding",
          "Minder fouten en supportdruk — validatie vangt fouten op vóór ze het systeem in komen",
          "Volledige audittrail — compliance aantoonbaar zonder handmatige rapportage",
        ],
      },
      {
        titel: "MooveTrips: automatische ritregistratie voor elke chauffeur",
        tekst:
          "Rittenregistratie is voor veel chauffeurs verplicht, maar handmatig bijhouden kost tijd en is moeilijk te controleren. We bouwden MooveTrips: een driver-gerichte Progressive Web App die Geotab-data omzet naar een compleet ritregistratiesysteem. Geotab logt automatisch elke rit; de chauffeur categoriseert per rit met één tik zakelijk of privé, en het rapport genereert zichzelf.",
        resultaten: [
          "Van notitieboekje naar automatische registratie — categoriseren kost een paar seconden",
          "Snellere, betrouwbare rapportages (PDF/Excel), zonder handmatige exports",
          "Multi-tenant gebouwd — schaalbaar voor groeiende fleets en nieuwe klanten van Moove",
        ],
      },
    ],
    resultaat:
      "MooveInstaller en MooveTrips zijn geen losstaande projecten, maar twee schakels in dezelfde keten: installaties worden correct en gestandaardiseerd verwerkt, en de resulterende data wordt via MooveTrips bruikbaar gemaakt voor de chauffeur.",
    aside: {
      sector: "Mobiliteit",
      diensten: "Mendix",
      doorlooptijd: "2 maanden (MooveInstaller)",
      team: "Plan-build-run",
    },
    quote:
      "“Samenwerken met The New Wave IT voelt alsof je samenwerkt met goed ingewerkte en enthousiaste collega's. De samenwerking verliep direct soepel, we hebben efficiënt gewerkt en hebben in de gestelde termijn twee prachtige applicaties opgeleverd die daadwerkelijk gebruikt worden.”",
    quoteNaam: "Nina Klooster",
    quoteRol: "Product Manager, Moove",
  },
];

export const KLANTVERHAAL_MAP: Record<string, Klantverhaal> = Object.fromEntries(
  KLANTVERHALEN.map((k) => [k.slug, k]),
);
export const KLANTVERHAAL_SLUGS = KLANTVERHALEN.map((k) => k.slug);
