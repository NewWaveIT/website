/** Klantverhalen voor /klantverhalen en /klantverhalen/[slug]. */

export interface KPI {
  n: string;
  l: string;
}

/** Eén stap in een procesdiagram (bv. "De keten in drie stappen"). */
export interface Stap {
  label: string; // "Stap 1" / "Input" / "Automatisch"
  titel: string; // "MooveInstaller" / "Verwerking"
  tekst?: string; // "Voertuiginstallatie verwerkt & gevalideerd"
}

/** Eén resultaatkaart: korte titel + toelichtende zin (rijker dan een kale bullet). */
export interface ResultaatKaart {
  titel: string;
  tekst: string;
}

/** Genummerde sub-sectie van een uitgebreid klantverhaal (bv. per gebouwde applicatie). */
export interface Sectie {
  titel: string;
  situatie: string;
  aanpak: string;
  /** Optioneel mini-procesdiagram binnen de sectie (bv. Input → Verwerking → Sync). */
  stappen?: Stap[];
  /** Concrete, losse functionaliteiten (naast de resultaatkaarten). */
  functionaliteiten?: string[];
  resultaten: ResultaatKaart[];
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
  /** "De keten in N stappen" — overzicht bovenaan De aanpak. */
  ketenTitel?: string;
  ketenStappen?: Stap[];
  ketenSynthese?: string;
  /** Ontbreekt (leeg) voor CMS-rijen zonder deze rijkere structuur. */
  secties?: Sectie[];
  resultaat: string;
  /** Eindresultaten-kaarten onder de conclusie (rijker dan `impact`). */
  eindresultaten?: ResultaatKaart[];
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
      "Moove groeit. De vloot van hun klanten in de last-mile delivery ook. Twee ontbrekende schakels remden die groei: betrouwbare installatieverwerking en automatische ritregistratie voor chauffeurs. The New Wave IT bouwde beide, in nauwe samenwerking met Moove, van scratch naar productie.",
    impact: [
      { n: "30 min", l: "Sneller per voertuig on-boarding" },
      { n: "2 mnd", l: "Van scratch naar werkende applicatie" },
      { n: "2", l: "Mendix-apps, dagelijks in gebruik" },
      { n: "Auditproof", l: "Met volledige logging" },
    ],
    challenge:
      "Moove had een bestaand Mendix-platform. De uitdaging was niet het platform zelf, maar de ontbrekende schakels: een betrouwbare verwerking van voertuiginstallaties en een moderne manier om handmatige ritregistratie te vervangen. Installaties van voertuigen werden verwerkt via meerdere losse systemen — foutgevoelig, arbeidsintensief en moeilijk te auditen. Tegelijk deden chauffeurs ritregistratie zoals dat twintig jaar geleden ook ging: handmatig in een notitieboekje of via generieke tools. GPS maakt dat notitieboekje overbodig: Geotab registreert elke rit automatisch. Maar de stap van rijdata naar een compliant rittenrapport dat een chauffeur zelf beheert, ontbrak nog — en daarvoor moesten installaties eerst correct en gestandaardiseerd verwerkt zijn in MyGeotab.",
    pull: "“Het voelt alsof je samenwerkt met goed ingewerkte en enthousiaste collega's.”",
    ketenTitel: "De keten in drie stappen",
    ketenStappen: [
      {
        label: "Stap 1",
        titel: "MooveInstaller",
        tekst: "Voertuiginstallatie verwerkt & gevalideerd",
      },
      { label: "Stap 2", titel: "MyGeotab", tekst: "GPS-data per rit" },
      { label: "Stap 3", titel: "MooveTrips", tekst: "Rit categoriseren & rapporteren" },
    ],
    ketenSynthese:
      "Een correct verwerkte installatie maakt betrouwbare GPS-data mogelijk, die MooveTrips omzet in bruikbare ritregistratie.",
    secties: [
      {
        titel: "Strategisch traject: bouwen op een bestaand fundament",
        situatie:
          "Moove had al een Mendix-applicatie. De ambitie was om die verder te structureren en twee nieuwe applicaties te bouwen die direct aansluiten op de operationele werkprocessen van het bedrijf. Dat vraagt om meer dan ontwikkelcapaciteit: een partner die meedenkt over architectuur, prioriteiten en schaalbaarheid. Welke applicatie bouw je eerst? Hoe zorg je dat de nieuwe apps goed communiceren met het bestaande platform? En hoe borg je kwaliteit als het team van Moove en de vloten van haar klanten blijven groeien?",
        aanpak:
          "We begonnen niet met bouwen. We begonnen met begrijpen: een analyse van het bestaande Mendix-landschap en de gewenste applicaties. Op basis daarvan stelden we een roadmap op en bepaalden we samen met Moove welke prioriteiten als eerste gebouwd zouden worden. We brachten de bestaande structuur in kaart en formuleerden een gefaseerde aanpak — geen big-bang — voor applicaties die schaalbaar zijn en goed integreren met het bestaande platform. Daarbij stelden we governance op voor security, performance en datakwaliteit, zodat alle applicaties vanuit dezelfde standaarden worden gebouwd. Business en IT werkten vanaf het begin samen in een Competence Center, vanuit gedeelde richtlijnen en een gezamenlijke roadmap. Dat legt de basis voor doorontwikkeling die Moove zelf kan sturen.",
        stappen: [
          { label: "1", titel: "Analyse", tekst: "Huidig landschap" },
          { label: "2", titel: "Roadmap", tekst: "Prioriteiten bepalen" },
          { label: "3", titel: "Governance", tekst: "Security & kwaliteit" },
          { label: "4", titel: "Competence Center", tekst: "Business & IT samen" },
        ],
        resultaten: [
          {
            titel: "Gestructureerd fundament",
            tekst:
              "Het bestaande Mendix-platform werd verder gestructureerd en uitgebreid met twee nieuwe applicaties die direct bruikbaar zijn in de dagelijkse operatie.",
          },
          {
            titel: "Competence Center actief",
            tekst:
              "Business en IT bij Moove werken nu structureel samen vanuit gedeelde architectuurrichtlijnen en een gezamenlijke roadmap.",
          },
        ],
      },
      {
        titel: "MooveInstaller: foutloze verwerking van voertuiginstallaties",
        situatie:
          "Installaties van voertuigen — install, swap en de-install — werden verwerkt via meerdere losse systemen. Dit leidde tot tijdverlies, foutgevoelige koppelingen en extra druk op support en CSM, met een grote hoeveelheid handmatige handelingen. Compliance was lastig te borgen zonder centrale logging, en fouten in de koppeling van assets kwamen laat aan het licht — met extra correctiewerk voor het operations-team tot gevolg.",
        aanpak:
          "We bouwden MooveInstaller: een centrale Mendix-applicatie die het volledige installatieproces van voertuigen digitaal en gestandaardiseerd verwerkt. Assets en installatielogs worden gekoppeld op basis van VIN of serienummer, data wordt opgehaald uit MyGeotab en GeoTabMyAdmin, en elke installatie wordt gevalideerd via centrale bedrijfsregels vóór synchronisatie met MyGeotab en het Moove-platform. Centrale foutopvang met logging zorgt voor een volledige audittrail. Vanaf scratch naar werkende applicatie in twee maanden.",
        stappen: [
          { label: "Input", titel: "VIN / serienummer", tekst: "install · swap · de-install" },
          {
            label: "Verwerking",
            titel: "MooveInstaller",
            tekst: "Valideert via centrale bedrijfsregels + logging & audittrail",
          },
          { label: "Sync", titel: "MyGeotab", tekst: "+ Moove-platform" },
        ],
        functionaliteiten: [
          "Koppelt assets en installatielogs op basis van VIN/serienummer",
          "Haalt data op uit MyGeotab en GeoTabMyAdmin",
          "Valideert installaties via centrale bedrijfsregels",
          "Verwerkt en synchroniseert alles terug naar MyGeotab en het Moove-platform",
          "Vangt fouten centraal op met logging en volledige audittrail",
        ],
        resultaten: [
          {
            titel: "Minder fouten, minder supportdruk",
            tekst:
              "Validatie op basis van centrale bedrijfsregels vangt fouten op voordat ze in het systeem terechtkomen. Het operations-team hoeft niet meer te corrigeren.",
          },
          {
            titel: "CSM focust op onderscheidende taken",
            tekst:
              "Doordat routinehandelingen geautomatiseerd zijn, houden CSM'ers meer tijd over voor werk dat daadwerkelijk bijdraagt aan klantwaarde.",
          },
          {
            titel: "Snellere onboarding in Geotab",
            tekst:
              "Serienummers zijn sneller correct beschikbaar in het systeem. Voertuigen zijn eerder operationeel zichtbaar, wat de vlootplanning ten goede komt.",
          },
          {
            titel: "Volledige audittrail",
            tekst:
              "Elke installatie, swap of de-installatie wordt centraal gelogd. Compliance is aantoonbaar zonder handmatige rapportage.",
          },
        ],
      },
      {
        titel: "MooveTrips: automatische ritregistratie voor elke chauffeur",
        situatie:
          "Rittenregistratie voor zakelijke en fiscale doeleinden is een verplichting voor veel chauffeurs. Maar de traditionele manier — handmatig in een notitieboekje of via generieke tools — kost tijd, leidt tot fouten en is moeilijk te controleren.",
        aanpak:
          "We bouwden MooveTrips: een driver-gerichte Progressive Web App die Geotab-data omzet naar een compleet, eenvoudig te bedienen ritregistratiesysteem. Waar een chauffeur vroeger alles handmatig bijhield, logt Geotab nu automatisch elke rit. De chauffeur opent MooveTrips, ziet zijn ritten en geeft per rit aan of het een zakelijke of privérit was — meer heeft hij niet nodig. Het rapport genereert zichzelf.",
        stappen: [
          { label: "Automatisch", titel: "Geotab", tekst: "Logt elke rit via GPS" },
          {
            label: "Chauffeur · 1 tap",
            titel: "MooveTrips",
            tekst: "Categoriseert zakelijk of privé",
          },
          { label: "Automatisch", titel: "Rapport", tekst: "PDF / Excel automatisch" },
        ],
        functionaliteiten: [
          "Veilige login met rollen per organisatie en vloot",
          "Admin-configuratie met dynamische instellingen per land, wereldwijd toepasbaar voor zones en audit-logging",
          "Driver dashboard met ritoverzicht per categorie",
          "Detailpagina per rit met alle benodigde informatie",
          "Integratie met Geotab voor automatische ritimport",
          "Automatische pushmeldingen wanneer een berijder vergeet ritten te categoriseren",
          "Rapportages automatisch genereren en delen als pdf of Excel",
        ],
        resultaten: [
          {
            titel: "Van notitieboekje naar automatische registratie",
            tekst:
              "Geotab registreert elke rit. De chauffeur categoriseert 'm in een paar seconden. Handmatig bijhouden is verleden tijd.",
          },
          {
            titel: "Minder ongecategoriseerde ritten",
            tekst:
              "Doordat de app actief pushmeldingen stuurt en ritten automatisch inlaadt, worden ritten sneller en vaker correct gecategoriseerd.",
          },
          {
            titel: "Snellere en betrouwbare rapportages",
            tekst:
              "PDF- en Excel-rapporten worden automatisch gegenereerd. Geen handmatige exports, geen fouten door verouderde of ontbrekende data.",
          },
          {
            titel: "Compliance geborgd, wereldwijd toepasbaar",
            tekst:
              "Admin-instellingen per land zorgen dat de registratie voldoet aan lokale fiscale eisen, zonder dat de chauffeur daar iets extra's voor hoeft te doen.",
          },
          {
            titel: "Schaalbaar voor groeiende fleets",
            tekst:
              "MooveTrips is multi-tenant gebouwd. Het platform ondersteunt meerdere organisaties en groeit mee met het klantenbestand van Moove.",
          },
        ],
      },
    ],
    resultaat:
      "MooveInstaller en MooveTrips zijn geen losstaande projecten, maar twee schakels in dezelfde keten: installaties van voertuigen worden correct en gestandaardiseerd verwerkt via MooveInstaller, en de data die daardoor beschikbaar komt wordt via MooveTrips bruikbaar gemaakt voor de chauffeur. The New Wave IT bouwde beide applicaties, in nauwe samenwerking met het team van Moove.",
    eindresultaten: [
      {
        titel: "Snellere voertuig-onboarding",
        tekst:
          "Het operations-team verwerkt installaties zonder correctiewerk achteraf. Elke install, swap of de-installatie is direct gelogd, gevalideerd en synchroon met MyGeotab.",
      },
      {
        titel: "Chauffeurs registreren compliant, zonder handmatig werk",
        tekst:
          "Ritten worden automatisch ingeladen vanuit Geotab. Categoriseren kost seconden. Ongecategoriseerde ritten zijn grotendeels verdwenen.",
      },
      {
        titel: "Fiscale compliance zonder extra inspanning",
        tekst:
          "Moove bedient klanten in meerdere landen zonder dat compliance een operationeel probleem is. De regels zitten in de admin, niet in de werkdruk van de chauffeur.",
      },
      {
        titel: "Minder vragen, minder correcties, minder supportdruk",
        tekst:
          "Fouten worden voorkomen vóór ze het systeem in komen. CSM'ers houden tijd over voor werk dat er echt toe doet, in plaats van brandjes blussen.",
      },
      {
        titel: "Schaalbaar platform voor Moove's klanten",
        tekst:
          "Beide apps zijn gebouwd om mee te groeien. Nieuwe klanten, nieuwe landen, nieuwe vloten: de architectuur houdt het bij.",
      },
    ],
    aside: {
      sector: "Mobiliteit",
      diensten: "Mendix",
      doorlooptijd: "2 maanden (MooveInstaller)",
      team: "Plan-build-run",
    },
    quote:
      "“Samenwerken met The New Wave IT voelt alsof je samenwerkt met goed ingewerkte en enthousiaste collega's.”",
    quoteNaam: "Nina Klooster",
    quoteRol: "Product Manager, Moove",
  },
];

export const KLANTVERHAAL_MAP: Record<string, Klantverhaal> = Object.fromEntries(
  KLANTVERHALEN.map((k) => [k.slug, k]),
);
export const KLANTVERHAAL_SLUGS = KLANTVERHALEN.map((k) => k.slug);
