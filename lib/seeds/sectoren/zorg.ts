import type { SectorDetail } from "@/lib/sectoren-detail";

export const ZORG: SectorDetail = {
  slug: "zorg",
  naam: "Zorg",
  icon: "heart-pulse",
  heroTheme: "zorg",
  metaTitle: "Software voor de zorg: minder administratie, meer tijd voor de patiënt",
  metaDescription:
    "Applicaties en integraties bovenop je bestaande zorgsystemen. Minder registratielast, betere planning, live binnen weken.",

  hook: "“Onze mensen registreren meer dan ze zorgen.”",
  pitch:
    "Wij digitaliseren processen en verbinden systemen, zodat zorgverleners tijd terugkrijgen voor patiënt en cliënt.",
  kpiLabel: "Minder registratielast",

  h1: "Meer tijd voor zorg, minder tijd voor systemen",
  intro:
    "De zorgvraag groeit, de handen worden schaarser en de administratie blijft. Wij digitaliseren processen en verbinden systemen, zodat zorgverleners tijd terugkrijgen voor de patiënt en de cliënt.",

  herkenningTitel: "Wat zorgorganisaties ons vertellen",
  herkenning: [
    "“Systemen wisselen niet uit, dus dezelfde gegevens worden drie keer ingevoerd.”",
    "“Het kernsysteem is gesloten: elke wens wordt een leveranciersproject.”",
    "“Roosters en capaciteit houden we nog in Excel bij, met last-minute gaten.”",
    "“Cliënten en patiënten verwachten digitaal contact; wij bieden een telefoonnummer.”",
  ],

  mensenTitel: "Mensen die naast de zorgprofessional staan",
  mensenTekst:
    "We lopen mee op de afdeling, praten met zorgverleners en planners en bouwen samen met hen. Zorg, IT en privacy zitten bij ons aan dezelfde tafel.",
  mensenFoto: "/assets/photos/team-presentatie-applaus.webp",
  mensenFotoPositie: "50% 35%",
  mensenTags: [
    "Business consultants",
    "Mendix-ontwikkelaars",
    "Integratiespecialisten",
    "Adoptie & training",
  ],

  waaromTitel: "De administratie blijft, de handen worden schaarser",
  waaromAlineas: [
    "De zorgvraag groeit, de handen worden schaarser en de administratie blijft. Zorgverleners zijn een groot deel van hun dag kwijt aan registreren, terwijl de patiënt wacht.",
    "Opnieuw beginnen met een nieuw systeem lost dat niet op. Wij verbinden wat er al staat en halen handmatige stappen uit het proces. Zorg en IT werken bij ons samen aan dezelfde tafel, zodat de oplossing past bij het echte werk.",
  ],
  waaromFoto: "/assets/photos/founders-trio.webp",
  waaromFotoPositie: "50% 30%",
  quote:
    "De toekomst van de zorg draait om technologie die het werk van zorgprofessionals verlicht en de patiënt centraal stelt.",
  quoteTeamlid: "koen-wijsman",

  oplossingenTitel: "Wat het nu kost, en wat wij ertegenover zetten",
  oplossingenIntro:
    "Vijf vraagstukken die we in de zorg het vaakst tegenkomen, met de oplossing die daarbij hoort.",
  oplossingen: [
    {
      pijn: "“Onze systemen wisselen geen gegevens uit”",
      kost: "Dubbele registratie, overtypfouten en informatie die net te laat bij de zorgverlener is",
      oplossing:
        "Integratie- en data-uitwisselingslaag die bestaande systemen verbindt, met veilige toegang per rol",
      laag: "operatie",
    },
    {
      pijn: "“Het kernsysteem is gesloten, elke wens wordt een project”",
      kost: "Verbeteringen blijven liggen; workarounds in Excel worden het echte proces",
      oplossing:
        "Low-code laag bovenop het bestaande landschap, plus architectuuradvies en een roadmap voor modernisering",
      laag: "strategie",
    },
    {
      pijn: "“Roosters en capaciteit leggen we in Excel”",
      kost: "Gaten in de bezetting, last-minute inhuur en onnodige werkdruk",
      oplossing:
        "Planning- en capaciteitsmanagementapps voor roosters, in- en uitstroom en optimale personeelsinzet",
      laag: "operatie",
    },
    {
      pijn: "“Patiënten verwachten digitaal contact, wij bieden een telefoonnummer”",
      kost: "Telefoondruk op de organisatie en minder regie bij de patiënt",
      oplossing:
        "Self-service portalen voor patiënten, cliënten en professionals: inzage, afspraken en communicatie op één plek",
      laag: "operatie",
    },
    {
      pijn: "“Administratie kost meer tijd dan de zorg zelf”",
      kost: "Zorgprofessionals lopen leeg op registratie; verloop en verzuim nemen toe",
      oplossing:
        "Digitaliseren en automatiseren van zorglogistieke processen, digitale intake en triage",
      laag: "operatie",
    },
  ],

  bouwenTitel: "Applicaties die we hier het vaakst bouwen",
  useCases: [
    {
      icon: "user-round",
      titel: "Patiënten- of cliëntportaal",
      tekst:
        "Inzage in afspraken, documenten en behandeling, met directe communicatie met de zorgverlener.",
      sluitAanOp: "Digitale verwachting en regie",
    },
    {
      icon: "calendar-days",
      titel: "Planning- en capaciteitsapplicatie",
      tekst: "Roosters, beschikbaarheid en in- en uitstroom in één beeld in plaats van in Excel.",
      sluitAanOp: "Bezetting en werkdruk",
    },
    {
      icon: "clipboard-list",
      titel: "Digitale intake en triage",
      tekst: "Aanmelding, vragenlijst en toewijzing gestructureerd door één proces.",
      sluitAanOp: "Administratieve last aan de voorkant",
    },
    {
      icon: "bed",
      titel: "Zorglogistieke applicatie",
      tekst: "Bedden, middelen of routes realtime inzichtelijk, gekoppeld aan het kernsysteem.",
      sluitAanOp: "Versnipperd overzicht",
    },
    {
      icon: "file-check",
      titel: "Registratie- en dossierondersteuning",
      tekst: "Taakgerichte apps die alleen tonen wat nodig is, met koppeling naar het bronsysteem.",
      sluitAanOp: "Dubbele registratie",
    },
    {
      icon: "sparkles",
      titel: "AI-ondersteuning voor documenten en triage",
      tekst:
        "Classificeren, samenvatten en voorsorteren, met bronvermelding en een professional die beslist.",
      sluitAanOp: "AI zonder controleverlies",
    },
  ],

  aanpakTitel: "Meelopen met het zorgproces, bouwen op de afdeling",
  aanpakFoto: "/assets/photos/team-borrel.webp",
  aanpakFotoPositie: "50% 18%",
  stappen: [
    "We lopen mee met het zorgproces en zoeken de handeling die veel tijd kost en weinig oplevert.",
    "We bouwen klein. Een proof-of-value in jullie eigen omgeving, zodat je ziet wat het scheelt.",
    "We stemmen af met de functionaris gegevensbescherming en de zorgprofessionals samen, zodat het ontwerp meteen klopt.",
    "We laten het landen bij de professional. Een app die niet gebruikt wordt, levert geen tijd op.",
  ],
  belofte:
    "Wat je van ons mag verwachten: een werkende basisapp in een week en een MVP binnen drie maanden. En iemand die het regelwerk uit handen neemt.",

  dienstenTitel: "Waarmee we dit doen",
  dienstLinks: [
    { label: "Low-code applicatieontwikkeling (Mendix)", href: "/diensten/mendix" },
    { label: "Integratie en data-uitwisseling", href: "/diensten" },
    { label: "AI en procesautomatisering", href: "/diensten/ai" },
    { label: "Adoptie, training en enablement", href: "/diensten/training-enablement" },
  ],

  faqTitel: "Wat klanten in de zorg ons vragen",
  faq: [
    {
      vraag: "Moeten we ons kernsysteem vervangen?",
      antwoord:
        "Nee. We bouwen ernaast en erbovenop, en ontsluiten alleen wat nodig is voor het proces dat knelt.",
    },
    {
      vraag: "Hoe gaan jullie om met privacy en beveiliging?",
      antwoord:
        "We werken binnen jullie kaders. Rollen bepalen wie wat ziet, alles is herleidbaar en we vragen niet meer gegevens dan nodig.",
    },
    {
      vraag: "Kunnen jullie koppelen met onze systemen en ketenpartners?",
      antwoord:
        "Ja. Dat is meestal het grootste deel van het werk, en ook het deel dat het meest oplevert.",
    },
    {
      vraag: "Kost dit onze zorgverleners extra tijd tijdens de bouw?",
      antwoord:
        "Zo min mogelijk. We werken in korte sessies van een uur en testen op de afdeling zelf, niet in een projectkamer.",
    },
    {
      vraag: "Neemt AI besluiten over patiënten?",
      antwoord: "Nee. AI classificeert, vat samen en onderbouwt. De zorgprofessional beslist.",
    },
  ],

  teamTitel: "Wie je bij ons aan tafel krijgt",
  team: [],

  ctaTitel: "Welke handeling kost jullie team deze week de meeste tijd?",
  ctaTekst:
    "Plan een uur met iemand die het zorgproces en de techniek allebei kent. We kijken mee, zeggen waar tijdwinst zit en zijn eerlijk als een app niet het antwoord is.",
};
