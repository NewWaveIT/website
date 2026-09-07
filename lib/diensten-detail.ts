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
  img: string;
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
  /** Optioneel: alleen invullen als er een écht, gepubliceerd klantverhaal voor
   *  deze dienst bestaat. Geen fictieve quotes/namen — leeg = sectie verborgen. */
  caseTitle?: string;
  caseSector?: string;
  caseQuote?: string;
  caseNaam?: string;
  caseRol?: string;
  caseImage?: string;
  /** Slug van het bijbehorende /klantverhalen/[slug]. */
  caseHref?: string;
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
}

/** Richting-slugs die nu een lichte hub-pagina zijn (app/(marketing)/diensten/mendix
 *  e.a.) i.p.v. een dienstdetailpagina. Moeten uit zowel de seed als de CMS-slugs
 *  gefilterd blijven, anders genereert [slug]/page.tsx dezelfde paden nogmaals. */
export const RICHTING_SLUGS = ["mendix", "ai", "strategie"] as const;

export const DIENSTEN: Record<string, DienstDetail> = {
  "it-strategie": {
    slug: "it-strategie",
    naam: "IT-strategie op low-code en AI",
    badgeIcon: "route",
    badgeLabel: "IT-strategie",
    h1: "Waar low-code en AI passen — en waar niet.",
    intro:
      "Low-code groeit bij jullie harder dan de inrichting eromheen. Er komen apps bij, teams bij en vragen bij — en de architectuur, governance en het deliverymodel zijn niet meegegroeid. In twee tot drie weken brengen we in kaart waar jullie staan op business waarde, delivery en teams, en platformfundering.",
    ctaSecondary: "Bekijk klantverhalen",
    kpis: [
      { n: "2–3 wkn", l: "Doorlooptijd van het traject" },
      { n: "3 lagen", l: "Business waarde, delivery en fundering" },
      { n: "€12.500+", l: "Investering, afhankelijk van omvang" },
    ],
    vraagstukken: [
      {
        q: "Groei",
        titel: "Low-code groeit sneller dan de inrichting eromheen",
        p: "Er komen apps bij, teams bij en vragen bij, en de architectuur, governance en het deliverymodel zijn niet meegegroeid.",
      },
      {
        q: "Keuze",
        titel: "Onduidelijk waar low-code past en waar niet",
        p: "Niet elk vraagstuk is een low-code-vraagstuk; de verkeerde keuze kost je jaren.",
      },
      {
        q: "Deliverymodel",
        titel: "Van één team naar een schaalbaar platform",
        p: "Wat werkte met één team, werkt niet meer zodra meerdere teams op hetzelfde platform bouwen.",
      },
    ],
    pijlersIntro: "",
    pijlers: [],
    aanpak: [
      {
        kicker: "Analyseren",
        titel: "Waar staat de organisatie op de drie lagen",
        p: "We brengen in kaart waar jullie staan op business waarde, delivery en teams, en platformfundering.",
        punten: [
          "Interviews met business en IT",
          "Analyse van het applicatielandschap",
          "Twee werksessies met IT en business samen",
        ],
        img: "/assets/photos/team-gesprek-lounge.webp",
      },
      {
        kicker: "Richten",
        titel: "Een roadmap in gefaseerde stappen",
        p: "Je krijgt een roadmap met heldere antwoorden op de vragen waar je nu tegenaan loopt.",
        punten: [
          "Waar low-code past en waar niet",
          "Het deliverymodel dat bij de ambitie hoort",
          "Waar AI in het landschap landt",
        ],
        img: "/assets/photos/team-strategie-flipover.webp",
      },
    ],
    waarom: [
      {
        titel: "Business eerst, technologie als middel",
        p: "We starten bij jouw sectorvraagstuk en rekenen elke keuze door op businesswaarde, met een eerlijk nee waar low-code niet past.",
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
    outcomes: [],
    waarborg:
      "We hebben deze aanpak ontwikkeld voor groeiende Mendix-landschappen: eerst een assessment op de drie lagen — business waarde, delivery en teams, en platformfundering — voordat we een roadmap vaststellen. Geen quickscan met een kant-en-klaar advies, maar een traject met jullie eigen mensen aan tafel.",
    insightsTitle: "Kennis voor CIO's en architecten",
    insights: [
      {
        cat: "Strategie",
        meta: "5 min",
        titel: "Waarom digitale strategieën stranden in de la",
      },
      { cat: "Strategie", meta: "4 min", titel: "Prioriteren: de kunst van het niet doen" },
    ],
    ctaTitle: "Klaar om van landschap naar roadmap te gaan?",
    heroTheme: "strategie",
    serviceSlug: "it-strategie",
  },

  "foundation-starterkit": {
    slug: "foundation-starterkit",
    naam: "Foundation Starterkit",
    badgeIcon: "boxes",
    badgeLabel: "Mendix-fundering",
    h1: "De fundering waarmee app twee de helft kost.",
    intro:
      "App nummer één kost wat hij kost. App nummer twee zou de helft moeten kosten — en dat gebeurt alleen als er een gedeelde fundering onder ligt. In drie tot vier weken bouwen we die met jullie ontwikkelaars: een starter app met jullie huisstijl, inloggen en rechten geregeld, een herbruikbare koppellaag en gedeelde componenten.",
    ctaSecondary: "Bekijk cases",
    kpis: [
      { n: "3–4 wkn", l: "Bouwtijd van de fundering" },
      { n: "5", l: "Onderdelen: starter app t/m CI/CD" },
      { n: "2+", l: "Apps nodig om de waarde te voelen" },
    ],
    vraagstukken: [
      {
        q: "Herhaling",
        titel: "Elk team vindt het wiel opnieuw uit",
        p: "Inloggen, huisstijl en koppelingen worden per app opnieuw gebouwd, in plaats van eenmalig goed neergezet.",
      },
      {
        q: "Opschalen",
        titel: "Van één app naar een portfolio",
        p: "Wat werkte voor de eerste app, houdt geen stand zodra er een tweede en derde bijkomen.",
      },
      {
        q: "Beheer",
        titel: "Niemand is eigenaar van de gedeelde basis",
        p: "Zonder een vastgelegde beheerafspraak verwatert de fundering na de eerste oplevering.",
      },
    ],
    pijlersIntro: "",
    pijlers: [],
    aanpak: [
      {
        kicker: "Bouwen",
        titel: "Een starter app met jullie huisstijl en rechten",
        p: "We bouwen een starter app met de huisstijl erin, inloggen en rechten geregeld, en een herbruikbare integratielaag naar jullie kernsystemen.",
        punten: [
          "Starter app met huisstijl",
          "Inloggen en rechten geregeld",
          "Herbruikbare integratielaag naar kernsystemen",
        ],
        img: "/assets/photos/team-brainstorm-postits.webp",
      },
      {
        kicker: "Overdragen",
        titel: "Jullie ontwikkelaars kunnen zelf verder",
        p: "We bouwen samen met jullie eigen ontwikkelaars, met gedeelde componenten, testautomatisering en een vastgelegde beheerafspraak.",
        punten: [
          "Gedeelde componenten en testautomatisering",
          "Geautomatiseerd uitrollen",
          "Vastgelegde beheerafspraak",
        ],
        img: "/assets/photos/team-presentatie-scherm.webp",
      },
    ],
    waarom: [
      {
        titel: "Business eerst, technologie als middel",
        p: "We bouwen de fundering rond de apps die je daadwerkelijk gaat maken, niet als doel op zich.",
      },
      {
        titel: "Kennis blijft bij jou",
        p: "Je eigen ontwikkelaars bouwen mee, zodat de fundering na oplevering van jou blijft.",
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
    partners: ["Mendix", "Siemens", "Microsoft Azure", "AWS"],
    outcomes: [],
    waarborg:
      "We hebben deze fundering-aanpak ontwikkeld voor organisaties met meerdere Mendix-apps in productie: één starter app, één integratielaag, één set gedeelde componenten — zodat elk volgend team hiermee begint in plaats van bij nul.",
    insightsTitle: "Kennis over bouwen met low-code",
    insights: [
      { cat: "Mendix", meta: "5 min", titel: "Wanneer low-code wél en niet de juiste keuze is" },
      { cat: "Mendix", meta: "4 min", titel: "Van POC naar productie: de valkuilen" },
    ],
    ctaTitle: "Klaar voor een fundering die meegroeit?",
    heroTheme: "mendix",
    serviceSlug: "foundation-starterkit",
  },

  "fusion-team-startsprint": {
    slug: "fusion-team-startsprint",
    naam: "Fusion Team Startsprint",
    badgeIcon: "boxes",
    badgeLabel: "Mendix — Fusion Team",
    h1: "Business en IT die samen bouwen.",
    intro:
      "Business en IT die samen bouwen in plaats van specificaties uitwisselen. Vier weken lang werken één van jullie businessexperts en één van onze ontwikkelaars samen aan een echte oplossing. Wij bouwen mee en leiden tegelijk op, zodat jullie medewerker het daarna zelf kan onderhouden en uitbreiden.",
    ctaSecondary: "Bekijk cases",
    kpis: [
      { n: "4 wkn", l: "Duur van de startsprint" },
      { n: "1+1", l: "Businessexpert en developer samen" },
      { n: "1", l: "Werkende oplossing in gebruik" },
    ],
    vraagstukken: [
      {
        q: "Overdracht",
        titel: "Specificaties gaan heen en weer, tijd gaat verloren",
        p: "Business schrijft wensen op, IT vertaalt ze, en de vertaling klopt zelden helemaal.",
      },
      {
        q: "Afhankelijkheid",
        titel: "De business kan niets zonder IT bijstellen",
        p: "Elke kleine aanpassing moet weer de wachtrij in.",
      },
      {
        q: "Kennis",
        titel: "Na oplevering verdwijnt de kennis met de leverancier",
        p: "Zonder overdracht kan niemand intern de oplossing onderhouden of uitbreiden.",
      },
    ],
    pijlersIntro: "",
    pijlers: [],
    aanpak: [
      {
        kicker: "Samen bouwen",
        titel: "Eén businessexpert, één developer, één oplossing",
        p: "Jullie businessexpert en onze ontwikkelaar werken vier weken samen aan één echte oplossing, niet los van elkaar.",
        punten: [
          "Co-creatie in plaats van specificaties",
          "Een echte oplossing, geen oefencasus",
          "Wij bouwen mee, niet ervoor",
        ],
        img: "/assets/photos/team-gesprek-lounge.webp",
      },
      {
        kicker: "Overdragen",
        titel: "Jullie medewerker kan het zelf",
        p: "We leiden tegelijk op, zodat jullie medewerker de oplossing na de sprint zelfstandig kan onderhouden en uitbreiden.",
        punten: [
          "Training tijdens het bouwen, niet erna",
          "Werkwijze op papier vastgelegd",
          "Klaar voor de volgende afdeling",
        ],
        img: "/assets/photos/team-strategie-flipover.webp",
      },
    ],
    waarom: [
      {
        titel: "Kennis blijft bij jou",
        p: "Je eigen medewerker bouwt mee vanaf dag één, geen overdracht achteraf.",
      },
      {
        titel: "Business eerst, technologie als middel",
        p: "We starten bij het echte werkproces van je businessexpert, niet bij een technisch ontwerp.",
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
    partners: ["Mendix", "Siemens", "Microsoft Azure", "AWS"],
    outcomes: [],
    waarborg:
      "Deze aanpak komt direct uit hoe we al werken bij bestaande klanten: één businessexpert en één ontwikkelaar aan hetzelfde bureau, dezelfde planning, dezelfde oplevering. Geen gescheiden trajecten die achteraf aan elkaar geknoopt worden.",
    insightsTitle: "Kennis over bouwen met low-code",
    insights: [
      { cat: "Mendix", meta: "6 min", titel: "Legacy vervangen zonder de winkel te sluiten" },
      { cat: "Mendix", meta: "4 min", titel: "Van POC naar productie: de valkuilen" },
    ],
    ctaTitle: "Klaar om business en IT samen te laten bouwen?",
    heroTheme: "mendix",
    serviceSlug: "fusion-team-startsprint",
  },
};

export const DIENST_SLUGS = Object.keys(DIENSTEN);
