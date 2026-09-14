import type { SectorDetail } from "@/lib/sectoren-detail";

export const BANKEN: SectorDetail = {
  slug: "banken",
  naam: "Financial services",
  icon: "landmark",
  heroTheme: "banken",
  metaTitle: "Mendix en AI opschalen in financial services",
  metaDescription:
    "Van tien apps naar honderd, met kwaliteit, beheer en governance op orde. Voor banken en verzekeraars die Mendix breed inzetten.",

  hook: "“Elke innovatie strandt op compliance.”",
  pitch:
    "Wij helpen banken en verzekeraars opschalen met governance die snelheid en controle samen laat gaan.",
  kpiLabel: "Audit-proof",

  h1: "Van tien apps naar honderd, zonder de controle te verliezen",
  intro:
    "Met twintig Mendix-apps red je het op discipline. Bij honderd niet meer. Wij helpen banken en verzekeraars opschalen met governance die de snelheid niet in de weg zit.",

  herkenningTitel: "Waar het gaat schuiven als low-code doorgroeit",
  herkenning: [
    "“Twintig apps zijn te overzien. Bij honderd wordt beheer een probleem.”",
    "“Elk team bouwt zijn eigen oplossing voor hetzelfde probleem.”",
    "“De business bouwt door, buiten IT om, en niemand weet waar.”",
    "“Governance is er wel, maar hij remt vooral en helpt weinig.”",
  ],

  mensenTitel: "Mensen die naast je team gaan staan, niet ernaast zitten",
  mensenTekst:
    "We werken met je platformteam, je architecten en de business samen aan hetzelfde operating model. Bouwen, opleiden en overdragen lopen door elkaar heen.",
  mensenFoto: "/assets/photos/team-presentatie-scherm.webp",
  mensenFotoPositie: "50% 28%",
  mensenTags: ["Platformarchitecten", "Mendix-leads", "Fusion teams", "Training & enablement"],

  waaromTitel: "Mendix verspreidt zich sneller dan de afspraken eromheen",
  waaromAlineas: [
    "Mendix verspreidt zich in de meeste organisaties sneller dan de afspraken eromheen. Zolang je tien tot twintig apps hebt, houdt een goed team dat op discipline bij elkaar. Ga je richting vijftig of honderd, dan lopen kwaliteit, beheer en security uit elkaar en merkt de business dat als eerste.",
    "AI maakt dat urgenter. Ontwikkelen, testen en documenteren gaan sneller, maar de spreiding in kwaliteit wordt groter. In een sector waar de toezichthouder meekijkt, wil je die versnelling binnen dezelfde kaders houden. Dat vraagt om een operating model, niet om meer regels.",
  ],
  waaromFoto: "/assets/photos/team-gesprek-lounge.webp",
  waaromFotoPositie: "50% 30%",
  quote:
    "Wij geloven dat de mens de centrale factor is in het behalen van business doelstellingen.",
  quoteTeamlid: "koen-wijsman",

  oplossingenTitel: "Vier vraagstukken bij het opschalen van Mendix en AI",
  oplossingenIntro:
    "Geen productmarktcombinatie per sector, maar één vraagstuk: beheerst opschalen. Per vraagstuk waaraan je het herkent en wat wij doen.",
  oplossingen: [
    {
      pijn: "Quality at scale",
      kost: "Twintig apps lopen goed, maar bij vijftig stapelen technische schuld, dubbele componenten en beheerlast zich op",
      oplossing:
        "Referentiearchitectuur, herbruikbare componenten, teststandaarden en technische review bij elke nieuwe app",
      laag: "platform",
    },
    {
      pijn: "App Factory en operating model",
      kost: "Niemand is eigenaar van het platform en per app is onduidelijk wie beslist over waarde en prioriteit",
      oplossing:
        "App Factory-model met rollen, portfolioboard en platform ownership, opgebouwd in de fasen Start, Structure en Scale",
      laag: "operating",
    },
    {
      pijn: "Business-led development",
      kost: "De business bouwt zelf door omdat wachten geen optie is, en er ontstaat een schaduw-IT-organisatie",
      oplossing:
        "Fusion teams met een product owner uit de business, plus duidelijke spelregels voor wat business zelf mag bouwen",
      laag: "delivery",
    },
    {
      pijn: "AI-enabled development",
      kost: "Teams gebruiken AI her en der bij bouwen en testen, zonder afspraken over kwaliteit en controle",
      oplossing:
        "AI inzetten in analyse, development, testen, documentatie en beheer, binnen dezelfde governance als de rest",
      laag: "toekomst",
    },
  ],

  bouwenTitel: "",
  useCases: [],

  aanpakTitel: "Strategie, Start, Structure, Scale, en meten wat het oplevert",
  aanpakFoto: "/assets/photos/team-overleg-cafe.webp",
  aanpakFotoPositie: "50% 35%",
  stappen: [
    "Strategie. We halen op waar Mendix vandaag waarde levert en waar het knelt, en vertalen dat naar doelen waar de board iets aan heeft.",
    "Start. We zetten het eerste team en de eerste apps neer, met documentatie en architectuur die later meegroeien.",
    "Structure. We brengen governance, rollen en standaarden aan: portfolioboard, definition of done, technische review, opleiding van je eigen mensen.",
    "Scale. We kopiëren wat werkt naar meer teams en voegen AI toe aan analyse, development, testen en beheer, binnen dezelfde kaders.",
    "Evalueren. We meten wat de apps opleveren en sturen bij, op strategisch, tactisch en operationeel niveau.",
  ],
  belofte:
    "Wat je van ons mag verwachten: een werkende basisapp in een week en een MVP binnen drie maanden. En mensen die naast je team gaan staan in plaats van ernaast komen zitten.",

  dienstenTitel: "Waarmee we dit doen",
  dienstLinks: [
    { label: "Mendix schalen en App Factory", href: "/diensten/mendix-scale-sessie" },
    { label: "Low-code applicatieontwikkeling (Mendix)", href: "/diensten/mendix" },
    { label: "AI-aanpak", href: "/diensten/ai" },
    { label: "Consultant inhuren", href: "/diensten/consultant-inhuren" },
  ],

  faqTitel: "Wat banken en verzekeraars ons vragen",
  faq: [
    {
      vraag: "Hoe houden we dit auditbaar?",
      antwoord:
        "Elke app doorloopt dezelfde review en dezelfde pipeline. Wie wat wanneer wijzigde is herleidbaar, ook als tien teams tegelijk werken.",
    },
    {
      vraag: "Mag de business zelf bouwen binnen onze risicokaders?",
      antwoord:
        "Ja, mits je afspreekt wat wel en niet zelf mag. Wij helpen die grens trekken en bewaken hem met tooling in plaats van met vergaderingen.",
    },
    {
      vraag: "Hoe voorkomen we dat governance de snelheid doodt?",
      antwoord:
        "Door hem in de pipeline te zetten, niet in een overleg. Standaarden en checks lopen mee met de bouw, zodat teams niet hoeven te wachten.",
    },
    {
      vraag: "Wat doet AI precies in het ontwikkelproces?",
      antwoord:
        "AI helpt bij analyse, code, testen, documentatie en beheer. Een mens beoordeelt en accordeert, en dezelfde reviewregels blijven gelden.",
    },
    {
      vraag: "We hebben al een CoE, wat voegen jullie toe?",
      antwoord:
        "Meestal ontbreekt niet de wil maar de structuur. Wij brengen het App Factory-model, ervaring uit eerdere schaaltrajecten en mensen die het samen met jullie doen.",
    },
  ],

  teamTitel: "Wie je bij ons aan tafel krijgt",
  team: [],

  ctaTitel: "Wat breekt er als jullie het aantal apps verdubbelen?",
  ctaTekst:
    "Plan een uur met iemand die meerdere Mendix-landschappen heeft zien groeien. We benoemen wat als eerste knelt en wat je daaraan kunt doen.",
};
