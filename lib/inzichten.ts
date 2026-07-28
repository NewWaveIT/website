/** Inzichten (blog) voor /inzichten en /inzichten/[slug].
   Teksten zijn brandconsistent geschreven; het design leverde geen artikelbody. */

export interface Artikel {
  slug: string;
  cat: string; // weergavebadge (afgeleid van sector/discipline)
  datum: string;
  leestijd: string;
  titel: string;
  auteur: string;
  image: string;
  intro: string;
  body: string[];
  /** Opgemaakte inhoud (HTML uit de rich-text editor); heeft voorrang op body. */
  inhoudHtml?: string;
  /** Profielfoto van de auteur (als die een teamlid is). */
  auteurFoto?: string;
  /** Koppeling: 'Algemeen' = niet gekoppeld. */
  discipline?: string;
  sector?: string;
}

export const ARTIKELEN: Artikel[] = [
  {
    slug: "ai-act-wat-nu",
    cat: "AI",
    datum: "19 mei 2026",
    leestijd: "5 min",
    titel: "De AI Act komt eraan: wat moet je nu regelen?",
    auteur: "Koen Wijsman",
    image: "/assets/photos/team-presentatie-breed.webp",
    intro:
      "De Europese AI-verordening raakt elke organisatie die AI inzet in primaire processen. Dit zijn de stappen die je dit kwartaal zet, en de valkuilen die we in de praktijk zien.",
    body: [
      "De AI Act werkt met risicocategorieën. Begin daarom met een inventarisatie: waar in je processen zit AI, welke beslissingen ondersteunt het en wat is de impact op mensen? Zonder dat overzicht is compliance een gok.",
      "Richt vervolgens governance in: eigenaarschap, documentatie en controleerbaarheid per toepassing. Uitlegbaarheid is geen sluitpost maar een ontwerpeis. Wie dat vanaf het begin meeneemt, hoeft achteraf niets te repareren.",
      "Onze aanpak: eerst een scan van je AI-landschap, dan een concrete agenda met prioriteiten. Zo voldoe je aan de wet én houd je vaart in de dingen die waarde opleveren.",
    ],
  },
  {
    slug: "chatgpt-naar-geborgd-proces",
    cat: "AI",
    datum: "2 mei 2026",
    leestijd: "6 min",
    titel: "Van ChatGPT-experiment naar geborgd proces",
    auteur: "Sanne Willems",
    image: "/assets/photos/team-overleg-scherm.webp",
    intro:
      "Iedereen experimenteert met generatieve AI. De sprong naar een betrouwbaar, geborgd proces is waar het echt gebeurt, en waar het vaak misgaat.",
    body: [
      "Een losse chatbot is snel gebouwd. Een toepassing die veilig in je eigen omgeving draait, herleidbaar is en past binnen je governance vraagt meer: datatoegang, controles en een duidelijke mens-in-de-lus.",
      "Wij bouwen pilots in je eigen, veilige omgeving en schalen alleen wat aantoonbaar werkt. Zo gaat AI van speeltuin naar productie, zonder black boxes.",
    ],
  },
  {
    slug: "low-code-in-kernprocessen",
    cat: "Mendix",
    datum: "24 apr 2026",
    leestijd: "4 min",
    titel: "Low-code in kernprocessen: wanneer wel, wanneer niet",
    auteur: "Jesse de Boer",
    image: "/assets/photos/overleg-laptop.webp",
    intro:
      "Low-code is snel en schaalbaar, maar geen wondermiddel. Een eerlijk afwegingskader voor je meest kritische processen.",
    body: [
      "Low-code schittert bij maatwerkprocessen die vaak veranderen en integraties met je bestaande landschap vragen. Van proof-of-concept tot productie in weken, beheerbaar door je eigen team.",
      "Bij zware rekenkracht of extreem gestandaardiseerde functionaliteit kan standaardsoftware of maatwerk beter passen. Wij geven een eerlijk advies, ook als het antwoord ‘niet low-code’ is.",
    ],
  },
  {
    slug: "digitale-roadmaps-stranden",
    cat: "Strategie",
    datum: "15 apr 2026",
    leestijd: "7 min",
    titel: "Waarom digitale roadmaps stranden (en hoe niet)",
    auteur: "Koen Wijsman",
    image: "/assets/photos/klantgesprek-tafel.webp",
    intro:
      "De meeste digitale strategieën falen niet op techniek, maar op executie. Drie oorzaken en hoe je ze voorkomt.",
    body: [
      "Roadmaps stranden als ze te abstract zijn, geen eigenaar hebben of niet meebewegen met de praktijk. Een plan is pas af als de operatie het merkt.",
      "Wij vertalen ambitie naar geprioriteerde mijlpalen met eigenaren en data, en blijven aan boord tijdens de uitvoering. Elk kwartaal aantoonbaar resultaat, bijgestuurd op wat werkt.",
    ],
  },
  {
    slug: "uitlegbaarheid-ontwerpeis",
    cat: "AI",
    datum: "9 apr 2026",
    leestijd: "4 min",
    titel: "Uitlegbaarheid als ontwerpeis, niet als sausje",
    auteur: "Sanne Willems",
    image: "/assets/photos/overleg-lachend.webp",
    intro:
      "Uitlegbaarheid achteraf toevoegen aan een AI-model is dweilen met de kraan open. Neem het mee vanaf het ontwerp.",
    body: [
      "Wie een besluit niet kan uitleggen, kan het niet verantwoorden, en zeker niet in gereguleerde sectoren. Kies daarom modellen en processen waarin herleidbaarheid ingebouwd zit.",
      "Wij ontwerpen AI-toepassingen zo dat elk advies te volgen is, met de professional die beslist. Verantwoord en controleerbaar, vanaf dag één.",
    ],
  },
  {
    slug: "registratielast-zorg",
    cat: "Sectoren",
    datum: "28 mrt 2026",
    leestijd: "5 min",
    titel: "Registratielast in de zorg: drie processen die morgen slimmer kunnen",
    auteur: "Jesse de Boer",
    image: "/assets/photos/team-presentatie-breed.webp",
    intro:
      "Zorgprofessionals registreren te veel en zorgen te weinig. Drie processen waar snelle winst zit.",
    body: [
      "Denk aan dubbele vastlegging, overtypen tussen systemen en handmatige controles. Vaak zijn dit precies de plekken waar een slimme koppeling of een AI-assistent direct tijd teruggeeft.",
      "Wij starten klein, gekoppeld aan je EPD en gebouwd rond het echte werkproces, zodat de zorgprofessional weer tijd overhoudt voor de patiënt.",
    ],
  },
  {
    slug: "vergunningverlening-in-weken",
    cat: "Publieke sector",
    datum: "15 mrt 2026",
    leestijd: "4 min",
    titel: "Vergunningverlening in weken, niet maanden",
    auteur: "Koen Wijsman",
    image: "/assets/photos/klantgesprek-tafel.webp",
    intro:
      "Hoe gemeenten met low-code de doorlooptijd van aanvragen structureel verkorten, zonder in te leveren op zorgvuldigheid.",
    body: [
      "Lange doorlooptijden komen zelden door één knelpunt, maar door een keten van handmatige stappen en losse systemen. Digitaliseer die keten als geheel en de winst is structureel.",
      "Met een op maat gebouwde applicatie, gekoppeld aan de kernregistraties en met realtime statusinzicht, gaan aanvragen van maanden naar weken, en blijft elke stap aantoonbaar.",
    ],
  },
  {
    slug: "ai-in-de-zorg",
    cat: "Zorg",
    datum: "10 mrt 2026",
    leestijd: "5 min",
    titel: "AI in de zorg: 5 toepassingen die tijd teruggeven",
    auteur: "Sanne Willems",
    image: "/assets/photos/overleg-lachend.webp",
    intro:
      "Concrete voorbeelden van AI die zorgprofessionals ontlast, verantwoord ingezet en met de mens aan het stuur.",
    body: [
      "Van het samenvatten van dossiers tot het voorsorteren van meldingen: AI kan repetitief werk overnemen zodat professionals zich op zorg richten. De professional beslist, altijd.",
      "Belangrijk is dat elke toepassing veilig, uitlegbaar en gekoppeld aan je bestaande systemen is. Zo levert AI tijd op zonder nieuwe risico's te introduceren.",
    ],
  },
  {
    slug: "compliant-en-snel",
    cat: "Banken",
    datum: "5 mrt 2026",
    leestijd: "6 min",
    titel: "Compliant én snel: de valse tegenstelling",
    auteur: "Jesse de Boer",
    image: "/assets/photos/overleg-laptop.webp",
    intro:
      "Veiligheid en snelheid hoeven elkaar niet uit te sluiten in financiële IT, als je beheersing vanaf het ontwerp meeneemt.",
    body: [
      "Compliance vertraagt pas als het een controle achteraf is. Bouw herleidbaarheid en controles in vanaf het eerste ontwerp, en wendbaarheid en toezicht gaan hand in hand.",
      "Met low-code op je kernsystemen digitaliseer je processen snel, terwijl elke stap controleerbaar blijft. Snel leveren én door de toets komen: het kan.",
    ],
  },
];

export const ARTIKEL_MAP: Record<string, Artikel> = Object.fromEntries(
  ARTIKELEN.map((a) => [a.slug, a]),
);
export const ARTIKEL_SLUGS = ARTIKELEN.map((a) => a.slug);
