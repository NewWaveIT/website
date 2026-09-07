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
    auteur: "The New Wave IT",
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
    auteur: "The New Wave IT",
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
    auteur: "The New Wave IT",
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
    auteur: "The New Wave IT",
    image: "/assets/photos/team-presentatie-klant.webp",
    intro:
      "Zorgprofessionals registreren te veel en zorgen te weinig. Drie processen waar snelle winst zit.",
    body: [
      "Denk aan dubbele vastlegging, overtypen tussen systemen en handmatige controles. Vaak zijn dit precies de plekken waar een slimme koppeling of een AI-assistent direct tijd teruggeeft.",
      "Wij starten klein, gekoppeld aan je EPD en gebouwd rond het echte werkproces, zodat de zorgprofessional weer tijd overhoudt voor de patiënt.",
    ],
  },
  {
    slug: "novi-ai-collega-overheid",
    cat: "Publieke sector",
    sector: "Publieke sector",
    discipline: "AI",
    datum: "24 jun 2025",
    leestijd: "4 min",
    titel: "Novi: de AI-collega die overheidsteams grip geeft op digitalisering",
    auteur: "The New Wave IT",
    image: "/assets/photos/project-parkeergarage-rotterdam.webp",
    intro:
      "Hoe een zelflerende AI-assistent nieuwe medewerkers sneller inwerkt en 24/7 antwoord geeft op IT-vragen bij (semi)overheidsorganisaties.",
    body: [
      "Veel IT-teams bij overheidsorganisaties staan onder druk. Processen worden complexer, collega's stromen in en uit, en burgers verwachten steeds snellere en betere digitale dienstverlening. Informatie zit verspreid over mappen, tools en hoofden.",
      "Novi is de AI-chatbot die we hiervoor ontwikkelden. Een zelflerende AI-assistent die de IT-omgeving en business-uitdagingen van (semi)overheidsorganisaties écht begrijpt. Novi helpt bij onboarding van nieuwe collega's, heeft direct toegang tot technische documentatie, en beantwoordt vragen 24/7, zonder dat er extra technische mensen nodig zijn.",
      "Gebouwd op Mendix, met scherpe aandacht voor veiligheid: alle data blijft binnen het systeem, en Novi koppelt eenvoudig aan bestaande (ook verouderde) systemen. Specifiek voor de overheid ontwikkeld: generiek als idee, maatwerk in de praktijk.",
    ],
  },
  {
    slug: "security-mendix-in-de-zorg",
    cat: "Zorg",
    sector: "Zorg",
    discipline: "Mendix",
    datum: "16 mei 2025",
    leestijd: "4 min",
    titel: "Security & Mendix in de zorg: hoe bouw je bewustwording, geen blok aan het been",
    auteur: "The New Wave IT",
    image: "/assets/photos/team-overleg-flipover.webp",
    intro:
      "Waarom security in Mendix-applicaties een mindset moet zijn, van developer tot zorgverlener, en hoe je dat organiseert zonder de innovatie te vertragen.",
    body: [
      "De zorgsector digitaliseert razendsnel. Maar met die voordelen loert er één risico constant om de hoek: security. Bewustwording rondom applicatiebeveiliging moet in elke organisatie verankerd zitten, juist in de zorg.",
      "Wij helpen zorgorganisaties met Security by Design workshops (teams leren vanaf dag één veilige Mendix-apps bouwen), Mendix Security Reviews (technische scans met pragmatisch verbeteradvies) en begeleiding bij compliance (NEN 7510, AVG): logging, sessiebeheer, pseudonimisering.",
      "Security gaat niet alleen over firewalls en encryptie. Het gaat om cultuur en gedrag, in de hele organisatie, niet alleen bij IT.",
    ],
  },
  {
    slug: "van-0-naar-100-apps-in-een-bank",
    cat: "Banken",
    sector: "Banken",
    discipline: "Mendix",
    datum: "10 apr 2026",
    leestijd: "8 min",
    titel: "Van 0 naar 100 apps in een bank: de 5 fases die wél werken",
    auteur: "Koen Wijsman",
    image: "/assets/photos/team-overleg-cafe.webp",
    intro:
      "Waarom schalen in een bank sneller complex wordt dan elders, en welke keuzes bepalen of je portfolio beheersbaar blijft of ontspoort.",
    body: [
      "De eerste Mendix-app in een bank voelt als een doorbraak. Maar succes versnelt de vraag: al snel liggen er twaalf ideeën op tafel en verliest de organisatie tempo, niet omdat teams niet kunnen bouwen, maar omdat de organisatie nog niet kan schalen.",
      "Banken hebben lagen die je niet kunt wegorganiseren: risico en compliance zitten overal (4-ogenprincipe, autorisaties, auditability), afhankelijkheden zijn groter dan ze lijken, en run vs. change concurreert om dezelfde mensen.",
      "De route van 0 naar 100 kent 5 fases. Strategie (scherpe basis vóór je bouwt), Start (momentum, niet alleen opleveren), Structure (structuur vóór schaal: rollen, governance, UX-standaarden), Schalen & innoveren (portfoliomanagement, hergebruik als versneller), en Evalueren (ritme, geen eindstation).",
      "Drie keuzes maken het verschil: waarde definiëren met harde criteria, eigenaarschap hard en klein maken, en stoppen normaliseren. Niet alles wat kan, moet.",
    ],
  },
  {
    slug: "security-audit-xximo",
    cat: "Mobiliteit",
    sector: "Mobiliteit",
    datum: "13 aug 2026",
    leestijd: "4 min",
    titel: "Waarom een security-audit geen alarmsignaal is, maar goed onderhoud",
    auteur: "The New Wave IT",
    image: "/assets/photos/team-brainstorm-glaswand.webp",
    intro:
      "Hoe een periodieke security- en compliancecheck bij XXImo leidde tot concrete verbeterstappen, zonder de organisatie te vertragen.",
    body: [
      "Applicaties die vandaag goed en veilig draaien, doen dat niet vanzelf over twee jaar. Daarom voeren wij bij klanten periodiek een security- en complianceaudit uit, niet omdat er iets mis is, maar om te borgen dat het goed blíjft.",
      "Dat deden we bij XXImo, specialist in mobiliteitsbudgetten voor lease- en wagenparkbeheer. We voerden een grondige security-audit uit en vertaalden de uitkomsten naar een concreet adviesrapport. Dat rapport hebben we samen met XXImo doorgenomen, en we bleven betrokken bij het daadwerkelijk oppakken van de verbeterpunten.",
      "Resultaat: XXImo's applicaties zijn steviger ingericht op security en compliance, en klaar voor de eisen van morgen, als onderdeel van een doorlopende samenwerking. Security is geen vinkje dat je één keer zet, maar een ritme.",
    ],
  },
];

export const ARTIKEL_MAP: Record<string, Artikel> = Object.fromEntries(
  ARTIKELEN.map((a) => [a.slug, a]),
);
export const ARTIKEL_SLUGS = ARTIKELEN.map((a) => a.slug);
