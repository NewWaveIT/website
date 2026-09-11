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

/**
 * Nieuwste eerst. `getArtikelen` sorteert de CMS-rijen op hun ISO-datum, maar de
 * seed heeft alleen de weergavedatum ("13 aug 2026") en die is niet te
 * sorteren. De volgorde hier is dus de sortering: houd hem aflopend, anders
 * belooft de koude start iets anders dan een gevulde database.
 */
export const ARTIKELEN: Artikel[] = [
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
];

export const ARTIKEL_MAP: Record<string, Artikel> = Object.fromEntries(
  ARTIKELEN.map((a) => [a.slug, a]),
);
export const ARTIKEL_SLUGS = ARTIKELEN.map((a) => a.slug);
