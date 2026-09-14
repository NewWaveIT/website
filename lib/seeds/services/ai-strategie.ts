import type { Service } from "@/lib/services";

export const AI_STRATEGIE: Service = {
  slug: "ai-strategie",
  naam: "AI-strategie",
  familie: "richting",
  richting: "strategie",
  hubTier: "doen",
  fase: 1,
  pitch: "Waar verandert AI ons verdienmodel, en waar is het alleen een efficiëntieslag?",
  beschrijving:
    "Iedereen praat over AI. De vraag voor de directie is een andere: waar verandert het ons verdienmodel, en waar is het alleen een efficiëntieslag? In een dagdeel of een dag brengen we je positie in kaart met een strategisch kader dat verder gaat dan de gebruikelijke lijstjes met toepassingen. We kijken waar je onderscheidende capaciteit zit, wat commodity wordt, en wat dat betekent voor je mensen. Je eindigt met vastgestelde prioriteiten, inclusief een lijst van wat je expliciet niet gaat doen.",
  doelgroep: "Directie en MT. Werkt alleen goed als de eindverantwoordelijke er zelf bij zit.",
  duur: "Halve of hele dag",
  groepsgrootte: "Vijf tot twaalf deelnemers",
  prijzen: [],
  resultaten: [
    "Een schriftelijke positiebepaling binnen een week",
    "Prioriteiten voor het komende jaar",
    "Een expliciete niet-doen-lijst",
  ],
  volgendeStap:
    "IT-strategie op low-code en AI om de gekozen richting technisch en organisatorisch uit te werken.",
  ctaLabel: "Vraag een datum aan",
  ctaType: "datum",
  volgorde: 4,

  kop: "Verandert AI jullie verdienmodel, of alleen jullie kosten?",
  lead: "Een sessie met directie en management over de vraag die onder alle AI-plannen ligt: waar raakt dit onze markt en ons aanbod, en waar is het alleen een efficiëntieslag.",
  feiten: [
    { label: "Duur", waarde: "Halve of hele dag" },
    { label: "Deelnemers", waarde: "Vijf tot twaalf" },
    { label: "Niveau", waarde: "Directie en MT" },
  ],
  // Het ontwerp zet hier de staffel "€ 3.500 – 4.500 per dagdeel, € 6.500 – 8.500
  // per dag". Bewust weggelaten: alleen de instapdiensten tonen een bedrag.
  boekPunten: [
    "Twee begeleiders: strategie en AI-inhoud",
    "Sectorspecifieke voorbeelden, geen algemene trendpraat",
    "Een standpunt waar het MT achter staat",
  ],
  herkenIntro:
    "Voor directies die merken dat AI in elk overleg opduikt zonder dat iemand de strategische vraag stelt.",
  herken: [
    "Onze concurrent roept van alles over AI en wij weten niet of dat serieus is.",
    "Elke afdeling heeft een eigen AI-initiatief en niemand ziet het geheel.",
    "Wij willen weten of dit ons businessmodel raakt of alleen onze kostprijs.",
  ],
  meeneemtTitel: "Een standpunt in plaats van een gevoel",
  meeneemt: [
    {
      icon: "scale",
      titel: "Onderscheid tussen verdienmodel en efficiëntie",
      tekst: "Twee heel verschillende gesprekken, die nu vaak door elkaar lopen.",
    },
    {
      icon: "telescope",
      titel: "Een beeld van je markt over drie jaar",
      tekst: "Wat verandert er in klantverwachting, prijsstelling en concurrentie als AI doorzet.",
    },
    {
      icon: "flag",
      titel: "Drie strategische keuzes",
      tekst: "Waar zet je op in, waar wacht je bewust af, en wat besteed je uit.",
    },
    {
      icon: "users",
      titel: "Eén standpunt van het MT",
      tekst: "Zodat je organisatie hetzelfde verhaal hoort, ongeacht wie het vertelt.",
    },
    {
      icon: "map",
      titel: "Een eerste roadmap op hoofdlijnen",
      tekst: "Wat je dit jaar doet, en wat het volgende jaar pas aan de orde is.",
    },
  ],
  meeneemtFoto: "/assets/photos/team-presentatie-breed.webp",
  dagLabel: "De sessie",
  dagTitel: "Van losse initiatieven naar één standpunt",
  dagIntro:
    "We brengen voorbeelden uit jouw sector mee, inclusief de mislukkingen. Dat maakt het gesprek scherper dan een presentatie over mogelijkheden.",
  dagSlots: [
    {
      tijd: "Blok 1",
      titel: "Wat er echt gebeurt in jullie markt",
      tekst: "Concrete voorbeelden uit je sector, inclusief wat er niet werkte.",
    },
    {
      tijd: "Blok 2",
      titel: "Waar raakt het jullie",
      tekst: "Per onderdeel van je waardeketen: verdienmodel, kosten of niets.",
    },
    {
      tijd: "Blok 3",
      titel: "Scenario's",
      tekst: "Wat als een nieuwkomer dit morgen goed doet? En wat als het tegenvalt?",
    },
    {
      tijd: "Blok 4",
      titel: "Keuzes maken",
      tekst: "Waar zet je op in, waar wacht je, en wat betekent dat voor budget en mensen.",
    },
    {
      tijd: "Blok 5",
      titel: "Het verhaal",
      tekst: "Hoe je dit uitlegt aan je organisatie, klanten en aandeelhouders.",
    },
    {
      tijd: "Na afloop",
      titel: "Uitwerking",
      tekst: "Bij een hele dag: het standpunt en de roadmap uitgewerkt op vijf pagina's.",
    },
  ],
  voorbereidingIntro:
    "We bereiden voor op jouw sector en jouw cijfers. Eén voorgesprek met de bestuurder die de sessie belegt is voldoende.",
  wijZorgen: [
    "Een strateeg en een AI-specialist, samen aan tafel",
    "Sectoronderzoek en concrete voorbeelden uit vergelijkbare organisaties",
    "Facilitatie die zorgt dat ook de stille deelnemers iets zeggen",
    "Bij een hele dag: het standpunt en de roadmap uitgewerkt",
  ],
  jijZorgt: [
    "De mensen die over strategie en budget gaan: vijf tot twaalf",
    "Inzicht in je huidige verdienmodel en de belangrijkste kostenposten",
    "Eén voorgesprek van een half uur ter voorbereiding",
    "De bereidheid om ook te besluiten waar je níet op inzet",
  ],
  daarnaIntro:
    "Een standpunt is pas iets waard als het landt in keuzes over systemen, mensen en geld.",
  vervolg: [
    {
      slug: "it-strategie",
      reden: "De vertaling naar je IT-landschap en deliverymodel.",
    },
    {
      slug: "ai-opportunity-scan",
      reden: "De operationele kant: waar levert het concreet geld op.",
    },
    {
      slug: "ai-agent-in-a-day",
      reden: "Laten zien wat het is, aan de mensen die het moeten gaan gebruiken.",
    },
  ],
  faqTitel: "Wat bestuurders vooraf vragen",
  faq: [
    {
      vraag: "Krijgen we een AI-strategie op papier?",
      antwoord:
        "Bij een hele dag krijg je het standpunt en de roadmap uitgewerkt. Bij een dagdeel is de uitkomst de gedeelde conclusie, niet een document.",
    },
    {
      vraag: "Is dit een technische sessie?",
      antwoord:
        "Nee. Er komt techniek voorbij, maar de vragen zijn strategisch: markt, verdienmodel, positionering.",
    },
    {
      vraag: "Wij lopen al achter. Is dit dan niet te laat?",
      antwoord:
        "Nee. In de meeste sectoren is de belangrijkste keuze nog niet gemaakt, en achterlopers hebben het voordeel dat ze zien wat niet werkte.",
    },
    {
      vraag: "Kunnen we dit combineren met een MT-heisessie?",
      antwoord:
        "Ja, dat doen we regelmatig. Dan is het dagdeel het inhoudelijke blok van jullie eigen programma.",
    },
    {
      vraag: "Wat als het MT het oneens is?",
      antwoord:
        "Dan is dat de belangrijkste opbrengst van de dag. Wij helpen het verschil scherp te krijgen in plaats van het weg te praten.",
    },
  ],
  ctaTitel: "Eén sessie, en het MT spreekt met één mond over AI.",
};
