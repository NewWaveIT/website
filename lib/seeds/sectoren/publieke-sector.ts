import type { SectorDetail } from "@/lib/sectoren-detail";

export const PUBLIEKE_SECTOR: SectorDetail = {
  slug: "publieke-sector",
  naam: "Publieke sector",
  icon: "building-2",
  heroTheme: "publiek",
  metaTitle: "Software voor de publieke sector: beleid sneller in uitvoering",
  metaDescription:
    "Applicaties die meebewegen met nieuwe wetgeving. Toegankelijke loketten, verbonden ketens en herbruikbare bouwblokken.",

  hook: "“Onze doorlooptijden groeien sneller dan onze formatie.”",
  pitch: "Jouw proces in vier weken gedigitaliseerd, van aanvraag tot besluit.",
  kpiLabel: "Sneller vergunnen",

  h1: "Software die meebeweegt met veranderende wet- en regelgeving",
  intro:
    "Gemeenten en uitvoeringsorganisaties lopen vast op systemen die nieuw beleid niet aankunnen. Wij bouwen applicaties die in weken aanpasbaar zijn, niet in jaren.",

  herkenningTitel: "Waar het bij gemeenten en uitvoerders vastloopt",
  herkenning: [
    "“Nieuw beleid is er, het systeem kan het pas volgend jaar aan.”",
    "“De dienstverlening moet 24/7 werken, maar de systemen erachter zijn van kantooruren.”",
    "“Elk domein zijn eigen systeem, niemand ziet het hele beeld.”",
    "“Het budget krimpt, de opgave groeit en de mensen zijn er niet.”",
  ],

  mensenTitel: "Mensen die de uitvoering kennen, niet alleen de techniek",
  mensenTekst:
    "We komen naar de afdeling, luisteren naar de mensen die het werk doen en bouwen samen met hen. Beleid, uitvoering en IT zitten bij ons aan dezelfde tafel.",
  mensenFoto: "/assets/photos/team-overleg-flipover.webp",
  mensenFotoPositie: "50% 18%",
  mensenTags: ["Business consultants", "Mendix-ontwikkelaars", "Architecten", "Adoptie & training"],

  waaromTitel: "Beleid verandert sneller dan software",
  waaromAlineas: [
    "Beleid verandert sneller dan software. Ondertussen verwachten inwoners dat alles digitaal kan, groeit de opgave en krimpt het team. Bij gemeenten en uitvoerders zien we steeds hetzelfde: mensen die het met workarounds draaiend houden, terwijl de wet alweer verder is.",
    "Je hoeft daar je hele landschap niet voor om te gooien. We bouwen bovenop wat er staat, met bouwblokken die je met andere organisaties kunt delen. Beleid en IT zitten bij ons aan dezelfde tafel, zodat de oplossing klopt met de regels én met het werk.",
  ],
  waaromFoto: "/assets/photos/team-overleg-scherm.webp",
  waaromFotoPositie: "50% 35%",
  quote:
    "Als bestuurskundige geloof ik dat de overheid het verschil maakt door publieke waarden te borgen en technologie in te zetten voor maatschappelijke vooruitgang.",
  quoteTeamlid: "koen-wijsman",

  oplossingenTitel: "Wat het nu kost, en wat wij ertegenover zetten",
  oplossingenIntro:
    "Vijf vraagstukken die we in de publieke sector het vaakst tegenkomen, met de oplossing die daarbij hoort.",
  oplossingen: [
    {
      pijn: "“Nieuw beleid is er, het systeem kan het pas volgend jaar aan”",
      kost: "Uitvoering loopt achter op de wet; handmatige noodoplossingen en juridisch risico",
      oplossing:
        "Low-code applicaties die in weken aanpasbaar zijn, met architectuuradvies en een roadmap voor modernisering van het landschap",
      laag: "strategie",
    },
    {
      pijn: "“Inwoners verwachten 24/7, onze systemen zijn van kantooruren”",
      kost: "Meer telefoon en balie, langere doorlooptijden, lagere tevredenheid",
      oplossing:
        "Self-service portalen (WCAG-proof): toegankelijke digitale loketten met transparante processen en realtime inzicht in de status",
      laag: "operatie",
    },
    {
      pijn: "“Elk domein heeft zijn eigen systeem, niemand ziet het geheel”",
      kost: "Dubbele uitvraag bij inwoners, tegenstrijdige besluiten en trage ketensamenwerking",
      oplossing:
        "Data-integratie en workflowapps die zaakbehandeling over domeinen en uitvoeringsinstanties heen verbinden",
      laag: "operatie",
    },
    {
      pijn: "“Wat wij bouwen, bouwt de buurorganisatie een jaar later opnieuw”",
      kost: "Publiek geld twee keer uitgegeven aan dezelfde oplossing",
      oplossing:
        "Overheidshub en een herbruikbare low-code componentenbibliotheek: lokaal toepasbaar, rijksbreed schaalbaar, in lijn met de NDS-bouwblokken",
      laag: "toekomst",
    },
    {
      pijn: "“Het budget krimpt, de opgave groeit, de mensen zijn er niet”",
      kost: "Achterstanden in de uitvoering en stijgende inhuurkosten",
      oplossing:
        "Digitaliseren van interne processen en zaakbehandeling: handmatige stappen eruit, capaciteit terug naar het echte werk",
      laag: "operatie",
    },
  ],

  bouwenTitel: "Applicaties die we hier het vaakst bouwen",
  useCases: [
    {
      icon: "monitor-smartphone",
      titel: "Digitaal loket voor inwoners en ondernemers",
      tekst: "Aanvragen indienen en de status realtime volgen, toegankelijk volgens WCAG.",
      sluitAanOp: "24/7-verwachting",
    },
    {
      icon: "file-check",
      titel: "Vergunning- en subsidieapplicatie",
      tekst:
        "Intake, beoordeling en besluit in één workflow, met de wet als configuratie in plaats van maatwerkcode.",
      sluitAanOp: "Beleid dat sneller verandert dan het systeem",
    },
    {
      icon: "clipboard-list",
      titel: "Meld- en zaaksysteem",
      tekst:
        "Meldingen uit de wijk of keten binnen, toegewezen en afgehandeld met zicht op doorlooptijd.",
      sluitAanOp: "Silo’s en dubbele uitvraag",
    },
    {
      icon: "users",
      titel: "Samenwerkingsapplicatie tussen uitvoeringsinstanties",
      tekst: "Één dossier, meerdere organisaties, met toegangsbeheer per rol.",
      sluitAanOp: "Ketensamenwerking",
    },
    {
      icon: "workflow",
      titel: "Interne procesapplicatie",
      tekst:
        "Handmatige stappen en spreadsheets uit de zaakbehandeling, capaciteit terug naar het inhoudelijke werk.",
      sluitAanOp: "Krappe budgetten en personeelstekort",
    },
    {
      icon: "sparkles",
      titel: "Beleidsondersteunende AI-toepassing",
      tekst:
        "Relevante stukken en signalen ophalen en samenvatten, met bronvermelding en een mens die beslist.",
      sluitAanOp: "Uitlegbaarheid als voorwaarde voor AI",
    },
  ],

  aanpakTitel: "Van wetswijziging naar werkende uitvoering",
  aanpakFoto: "/assets/photos/team-groep-atrium.webp",
  aanpakFotoPositie: "50% 30%",
  stappen: [
    "We kijken eerst mee. Wat betekent die wetswijziging concreet voor de mensen die hem moeten uitvoeren?",
    "We bouwen klein. Een proof-of-value op jullie eigen situatie, zodat je ziet wat het doet voordat je beslist.",
    "We toetsen onderweg aan de kaders: toegankelijkheid, privacy en archivering zitten in het ontwerp, niet in een eindcontrole.",
    "We laten het landen. Training, begeleiding en samen bouwen, zodat jullie het daarna zelf aankunnen.",
  ],
  belofte:
    "Wat je van ons mag verwachten: een werkende basisapp in een week en een MVP binnen drie maanden. En iemand die het overneemt als het bij jullie druk is.",

  dienstenTitel: "Waarmee we dit doen",
  dienstLinks: [
    { label: "Low-code applicatieontwikkeling (Mendix)", href: "/diensten/mendix" },
    { label: "Digitale strategie en roadmap", href: "/diensten/strategie" },
    { label: "AI en procesautomatisering", href: "/diensten/ai" },
    { label: "Adoptie, training en enablement", href: "/diensten/training-enablement" },
  ],

  faqTitel: "Wat klanten in de publieke sector ons vragen",
  faq: [
    {
      vraag: "Voldoen jullie aan de toegankelijkheidseisen?",
      antwoord:
        "Ja. We ontwerpen loketten meteen WCAG-proof. Toegankelijkheid regelen we vooraf, niet als laatste klus voor de livegang.",
    },
    {
      vraag: "Hoe gaan jullie om met privacy en veiligheid?",
      antwoord:
        "We werken binnen jullie kaders. Rollen bepalen wie wat ziet, alles is te herleiden, en we vragen nooit meer gegevens dan nodig.",
    },
    {
      vraag: "Kunnen andere organisaties de oplossing hergebruiken?",
      antwoord:
        "Ja, daar bouwen we op. Met generieke componenten kan een buurorganisatie verder waar jullie stoppen.",
    },
    {
      vraag: "Hoe zit dat met aanbesteden?",
      antwoord:
        "Vaak kunnen we starten binnen een bestaand raamcontract. We beginnen klein, zodat je weet wat je uitvraagt voordat je aanbesteedt.",
    },
    {
      vraag: "Neemt AI besluiten over inwoners?",
      antwoord:
        "Nee. AI zoekt op, vat samen en onderbouwt. De ambtenaar beslist en ziet altijd waar het antwoord vandaan komt.",
    },
  ],

  teamTitel: "Wie je bij ons aan tafel krijgt",
  team: [],

  ctaTitel: "Welke wetswijziging houdt jullie uitvoering nu tegen?",
  ctaTekst:
    "Plan een uur met iemand die zowel beleid als uitvoering kent. We kijken mee, zeggen waar de winst zit en zijn eerlijk als software niet het antwoord is.",
};
