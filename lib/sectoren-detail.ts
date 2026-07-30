/** Content voor de sectordetailpagina's (/sectoren/[slug]). */

export interface KPI {
  n: string;
  l: string;
}
export interface Challenge {
  q: string;
  titel: string;
  p: string;
}
export interface SolutionRow {
  kicker: string;
  titel: string;
  p: string;
  punten: string[];
  ph: string;
}
export interface Insight {
  meta: string;
  titel: string;
}

export interface SectorDetail {
  slug: string;
  naam: string;
  icon: "building-2" | "train-front" | "banknote" | "heart-pulse" | "factory";
  h1: string;
  intro: string;
  kpis: KPI[];
  challengesIntro: string;
  challenges: Challenge[];
  solutions: SolutionRow[];
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
  /** PMC: slugs van proposities die op deze sectorpagina tonen (leeg = alle). */
  proposities?: string[];
}

const SOL_AI_STRATEGIE: SolutionRow = {
  kicker: "AI & Strategie",
  titel: "Slimmer beslissen, met de mens aan het stuur",
  p: "We zetten AI verantwoord in om medewerkers te ontlasten en zetten een heldere roadmap uit die business en IT verbindt.",
  punten: [
    "Documentclassificatie & triage",
    "Uitlegbare, controleerbare besluitondersteuning",
    "Roadmap van ambitie naar uitvoering",
  ],
  ph: "[ foto · team aan het werk ]",
};

export const SECTOREN: Record<string, SectorDetail> = {
  "publieke-sector": {
    slug: "publieke-sector",
    naam: "Publieke sector",
    icon: "building-2",
    h1: "Digitale dienstverlening die burgers vertrouwen.",
    intro:
      "Van vergunningverlening tot subsidies: wij helpen overheden processen te versnellen, papierstromen te vervangen en volledig aantoonbaar te werken, veilig en binnen alle kaders.",
    kpis: [
      { n: "-60%", l: "Doorlooptijd aanvragen" },
      { n: "8×", l: "Sneller live dan geraamd" },
      { n: "100%", l: "Auditproof & AVG-compliant" },
    ],
    challengesIntro: "Herkenbaar? Dit zijn de vragen waarmee publieke organisaties bij ons komen.",
    challenges: [
      { q: "Snelheid", titel: "Hoe versnellen we vergunningverlening zonder in te leveren op zorgvuldigheid?", p: "Doorlooptijden lopen op, terwijl burgers digitale snelheid verwachten." },
      { q: "Legacy", titel: "Hoe moderniseren we verouderde systemen zonder de dienstverlening te verstoren?", p: "Kritieke processen draaien op systemen die niemand meer durft aan te raken." },
      { q: "Aantoonbaarheid", titel: "Hoe blijven we volledig auditproof en AVG-compliant?", p: "Elke stap moet herleidbaar zijn, zonder dat het werk verlamt." },
    ],
    solutions: [
      {
        kicker: "Mendix",
        titel: "Processen digitaliseren die burgers écht merken",
        p: "We bouwen op maat gemaakte applicaties die aansluiten op je bestaande landschap: snel live, schaalbaar en beheerbaar door je eigen team.",
        punten: ["Digitale aanvraag- en zaakprocessen", "Koppelingen met kernregistraties", "Realtime statusinzicht voor burger én ambtenaar"],
        ph: "[ product shot · zaaksysteem ]",
      },
      SOL_AI_STRATEGIE,
    ],
    outcomes: [
      { n: "-60%", l: "Kortere doorlooptijd van aanvragen" },
      { n: "6–10×", l: "Snellere oplevering met low-code" },
      { n: "+35%", l: "Hogere burgertevredenheid" },
      { n: "100%", l: "Auditproof opgeleverd" },
    ],
    caseTitle: "COA: sneller en aantoonbaar",
    caseSector: "Publieke sector · COA",
    caseQuote: "“Efficiënte en betrouwbare IT-oplossingen. The New Wave IT denkt echt mee met onze uitdagingen.”",
    caseNaam: "Peter van Dam",
    caseRol: "IT Manager, COA",
    caseImage: "/assets/photos/overleg-laptop.webp",
    insightsTitle: "Kennis die je beleid vooruit denkt",
    insights: [
      { meta: "4 min · 15 mrt 2026", titel: "Vergunningverlening in weken, niet maanden" },
      { meta: "6 min · 2 mrt 2026", titel: "Legacy moderniseren zonder de winkel te sluiten" },
      { meta: "5 min · 20 feb 2026", titel: "AVG & AI: verantwoord automatiseren" },
    ],
    ctaTitle: "Benieuwd wat dit voor jouw organisatie betekent?",
  },

  mobiliteit: {
    slug: "mobiliteit",
    naam: "Mobiliteit",
    icon: "train-front",
    h1: "Realtime grip op planning, assets en stromen.",
    intro:
      "Van assetbeheer tot reizigersinformatie: wij bouwen de systemen waarmee infra, OV en logistiek sneller schakelen op verstoringen én op groei.",
    kpis: [
      { n: "Realtime", l: "Inzicht in assets en stromen" },
      { n: "6–10×", l: "Sneller live met low-code" },
      { n: "24/7", l: "Beschikbaar en beheersbaar" },
    ],
    challengesIntro: "De vragen waarmee mobiliteits- en logistieke organisaties bij ons komen.",
    challenges: [
      { q: "Assets", titel: "Onze assets worden slimmer, onze systemen niet", p: "Sensordata stroomt binnen, maar de systemen die erop moeten sturen lopen achter." },
      { q: "Verstoringen", titel: "Hoe schakelen we sneller bij verstoringen?", p: "Planning, onderhoud en reizigersinformatie hangen samen, maar zitten in losse systemen." },
      { q: "Groei", titel: "Hoe schalen we mee met stijgende vraag?", p: "Volumes groeien; de operatie moet mee zonder handmatig werk te verdubbelen." },
    ],
    solutions: [
      {
        kicker: "Mendix",
        titel: "Eén operationeel beeld, van shopfloor tot regie",
        p: "We verbinden planning, assetbeheer en informatievoorziening in applicaties die realtime meebewegen met je operatie.",
        punten: ["Assetbeheer en onderhoudsplanning", "Koppelingen met sensoren en kernsystemen", "Realtime reizigers- en operationele informatie"],
        ph: "[ product shot · operationeel dashboard ]",
      },
      SOL_AI_STRATEGIE,
    ],
    outcomes: [
      { n: "Realtime", l: "Grip op planning en assets" },
      { n: "6–10×", l: "Snellere oplevering met low-code" },
      { n: "-30%", l: "Minder verstoringsimpact" },
      { n: "100%", l: "Gebouwd binnen je kaders" },
    ],
    caseTitle: "Vervoerder: sneller schakelen bij verstoringen",
    caseSector: "Mobiliteit · Vervoerder",
    caseQuote: "“We zien nu in één beeld wat er speelt en kunnen direct bijsturen. Dat scheelt reizigers uren.”",
    caseNaam: "Ilse Vermeer",
    caseRol: "Manager Operatie",
    caseImage: "/assets/photos/team-presentatie-breed.webp",
    insightsTitle: "Kennis voor mobiliteit en logistiek",
    insights: [
      { meta: "5 min · 12 mrt 2026", titel: "Van sensordata naar sturende systemen" },
      { meta: "6 min · 28 feb 2026", titel: "Realtime reizigersinformatie: de bouwstenen" },
      { meta: "4 min · 14 feb 2026", titel: "Assetbeheer dat met je vloot meegroeit" },
    ],
    ctaTitle: "Benieuwd wat dit voor jouw operatie betekent?",
  },

  banken: {
    slug: "banken",
    naam: "Banken",
    icon: "banknote",
    h1: "Compliant én wendbaar, zonder concessies.",
    intro:
      "Wij digitaliseren kernprocessen van banken en financials zonder concessies aan toezicht, beheersing en klantvertrouwen. Innovatie die door de compliance-toets komt.",
    kpis: [
      { n: "Audit-proof", l: "Herleidbaar en beheerst" },
      { n: "6–10×", l: "Sneller live met low-code" },
      { n: "100%", l: "Binnen toezicht en beleid" },
    ],
    challengesIntro: "De vragen waarmee banken en financials bij ons komen.",
    challenges: [
      { q: "Compliance", titel: "Elke innovatie strandt op compliance", p: "Goede ideeën sneuvelen in de beheersings- en toezichtsvereisten." },
      { q: "Legacy", titel: "Kernsystemen zijn stabiel maar star", p: "Wat betrouwbaar draait, is lastig te vernieuwen zonder risico." },
      { q: "Klant", titel: "Klanten verwachten digitale snelheid", p: "De lat van fintechs ligt hoog, ook voor gevestigde partijen." },
    ],
    solutions: [
      {
        kicker: "Mendix",
        titel: "Kernprocessen digitaliseren, beheerst en snel",
        p: "We bouwen wendbare applicaties bovenop je bestaande landschap, met beheersing en herleidbaarheid ingebouwd vanaf het ontwerp.",
        punten: ["Digitale klant- en aanvraagprocessen", "Herleidbaarheid en controle by design", "Integraties met kernbanksystemen"],
        ph: "[ product shot · klantproces ]",
      },
      SOL_AI_STRATEGIE,
    ],
    outcomes: [
      { n: "Audit-proof", l: "Herleidbaar opgeleverd" },
      { n: "6–10×", l: "Snellere oplevering met low-code" },
      { n: "-50%", l: "Kortere doorlooptijd processen" },
      { n: "100%", l: "Binnen toezichtkaders" },
    ],
    caseTitle: "Financial: compliant én snel",
    caseSector: "Banken · Financial",
    caseQuote: "“Voor het eerst gaan snelheid en compliance hand in hand. We leveren wendbaar, en de toezichthouder is tevreden.”",
    caseNaam: "Mark de Wit",
    caseRol: "Hoofd Digitalisering",
    caseImage: "/assets/photos/klantgesprek-tafel.webp",
    insightsTitle: "Kennis voor banken en financials",
    insights: [
      { meta: "6 min · 5 mrt 2026", titel: "Compliant én snel: de valse tegenstelling" },
      { meta: "5 min · 22 feb 2026", titel: "Kernsystemen vernieuwen zonder risico" },
      { meta: "4 min · 10 feb 2026", titel: "Herleidbaarheid by design in low-code" },
    ],
    ctaTitle: "Benieuwd wat dit voor jouw organisatie betekent?",
  },

  zorg: {
    slug: "zorg",
    naam: "Zorg",
    icon: "heart-pulse",
    h1: "Meer tijd voor de patiënt, minder registratielast.",
    intro:
      "Wij nemen registratielast weg en geven zorgprofessionals systemen die met ze meewerken: veilig, gekoppeld aan je EPD en gebouwd rond het echte werkproces.",
    kpis: [
      { n: "-40%", l: "Minder registratielast" },
      { n: "6–10×", l: "Sneller live met low-code" },
      { n: "100%", l: "Veilig en gekoppeld aan je EPD" },
    ],
    challengesIntro: "De vragen waarmee zorgorganisaties bij ons komen.",
    challenges: [
      { q: "Registratielast", titel: "Onze mensen registreren meer dan ze zorgen", p: "Kostbare tijd verdwijnt in overtypen en dubbele vastlegging." },
      { q: "Koppelingen", titel: "Systemen praten niet met elkaar", p: "Informatie staat versnipperd, terwijl zorg juist samenhang vraagt." },
      { q: "Veiligheid", titel: "Hoe borgen we privacy en veiligheid?", p: "Patiëntgegevens vragen om de hoogste zorgvuldigheid, altijd." },
    ],
    solutions: [
      {
        kicker: "Mendix",
        titel: "Processen rond het echte werk van de zorgprofessional",
        p: "We bouwen veilige applicaties die aansluiten op je EPD en registratielast wegnemen, ontworpen mét de mensen die ermee werken.",
        punten: ["Koppelingen met EPD en zorgsystemen", "Minder dubbele registratie", "Gebouwd rond het werkproces, niet andersom"],
        ph: "[ product shot · zorgapplicatie ]",
      },
      SOL_AI_STRATEGIE,
    ],
    outcomes: [
      { n: "-40%", l: "Minder registratielast" },
      { n: "6–10×", l: "Snellere oplevering met low-code" },
      { n: "+ tijd", l: "Meer tijd voor de patiënt" },
      { n: "100%", l: "Veilig en compliant" },
    ],
    caseTitle: "Zorginstelling: minder registreren, meer zorgen",
    caseSector: "Zorg · Instelling",
    caseQuote: "“Onze mensen zijn weer bezig met zorg in plaats van formulieren. Het systeem werkt eindelijk mee.”",
    caseNaam: "Anouk Prins",
    caseRol: "Manager Zorg & Innovatie",
    caseImage: "/assets/photos/overleg-lachend.webp",
    insightsTitle: "Kennis voor de zorg",
    insights: [
      { meta: "5 min · 10 mrt 2026", titel: "AI in de zorg: 5 toepassingen die tijd teruggeven" },
      { meta: "6 min · 25 feb 2026", titel: "Registratielast wegnemen zonder concessies" },
      { meta: "4 min · 12 feb 2026", titel: "Veilig koppelen aan het EPD" },
    ],
    ctaTitle: "Benieuwd wat dit voor jouw zorgorganisatie betekent?",
  },

  manufacturing: {
    slug: "manufacturing",
    naam: "Manufacturing",
    icon: "factory",
    h1: "Productie die meebeweegt met de vraag.",
    intro:
      "Wij verbinden productie, planning en kwaliteit in applicaties die je operatie écht versnellen, gebouwd op de data die je machines al produceren.",
    kpis: [
      { n: "Kortere", l: "Omsteltijden en doorlooptijd" },
      { n: "6–10×", l: "Sneller live met low-code" },
      { n: "Realtime", l: "Zicht van shopfloor tot boardroom" },
    ],
    challengesIntro: "De vragen waarmee productiebedrijven bij ons komen.",
    challenges: [
      { q: "Data", titel: "Onze machines produceren data die niemand gebruikt", p: "De potentie ligt op de shopfloor, maar bereikt de besluitvorming niet." },
      { q: "Planning", titel: "Planning en realiteit lopen uiteen", p: "Verstoringen worden te laat zichtbaar om nog bij te sturen." },
      { q: "Kwaliteit", titel: "Kwaliteitsdata zit in losse systemen", p: "Zonder samenhang blijft continu verbeteren lastig." },
    ],
    solutions: [
      {
        kicker: "Mendix",
        titel: "Van shopfloor-data naar sturende applicaties",
        p: "We verbinden productie, planning en kwaliteit in applicaties die realtime meebewegen met je operatie, gebouwd op je bestaande machinedata.",
        punten: ["Productie- en planningsinzicht in één beeld", "Koppelingen met machines en MES/ERP", "Kwaliteit sturen op realtime data"],
        ph: "[ product shot · productiedashboard ]",
      },
      SOL_AI_STRATEGIE,
    ],
    outcomes: [
      { n: "Kortere", l: "Omsteltijden" },
      { n: "6–10×", l: "Snellere oplevering met low-code" },
      { n: "Realtime", l: "Inzicht van shopfloor tot boardroom" },
      { n: "100%", l: "Gebouwd binnen je kaders" },
    ],
    caseTitle: "Producent: sturen op realtime data",
    caseSector: "Manufacturing · Producent",
    caseQuote: "“We zien nu direct wat er op de lijn gebeurt en sturen bij vóór het misgaat. De omsteltijden zijn flink korter.”",
    caseNaam: "Bram Kok",
    caseRol: "Operations Director",
    caseImage: "/assets/photos/team-overleg-scherm.webp",
    insightsTitle: "Kennis voor manufacturing",
    insights: [
      { meta: "5 min · 8 mrt 2026", titel: "Van machinedata naar sturende systemen" },
      { meta: "6 min · 24 feb 2026", titel: "Planning die meebeweegt met de realiteit" },
      { meta: "4 min · 11 feb 2026", titel: "Kwaliteit sturen op realtime data" },
    ],
    ctaTitle: "Benieuwd wat dit voor jouw productie betekent?",
  },
};

export const SECTOR_SLUGS = Object.keys(SECTOREN);
