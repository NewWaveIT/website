import type { Service } from "@/lib/services";

export const MENDIX_SCALE_SESSIE: Service = {
  slug: "mendix-scale-sessie",
  naam: "Mendix Scale Sessie",
  familie: "richting",
  richting: "mendix",
  fase: 1,
  ookRelevantVoor: ["strategie"],
  pitch: "Waar staat ons low-codeteam vandaag, wat is de stip op de horizon, en hoe komen we daar?",
  beschrijving:
    "Jullie Mendix-landschap groeit harder dan de inrichting eromheen. Er komen apps bij, teams bij en vragen bij, maar de architectuur, het deliverymodel en de governance groeiden niet mee. In één dag brengen we met jullie team in kaart waar jullie staan op de drie lagen waarop organisaties volwassen worden: waar levert het platform waarde, hoe organiseren jullie de teams, en welke technische fundering maakt opschalen mogelijk. Je gaat naar huis met een gedeeld doelbeeld en een route in stappen, vastgesteld door de mensen die het moeten doen.",
  doelgroep:
    "Organisaties die al met Mendix werken; het team zelf plus de opdrachtgever, uit business, delivery en architectuur samen.",
  duur: "Eén dag",
  groepsgrootte: "Acht tot vijftien deelnemers",
  prijzen: [],
  resultaten: [
    "Een volwassenheidsbepaling op business waarde, delivery/teams en platformfundering",
    "Het doelbeeld van het deliverymodel: van één team naar meerdere teams met een gedeelde fundering",
    "De route ernaartoe in gefaseerde stappen, op papier binnen een week",
  ],
  volgendeStap:
    "IT-strategie op low-code en AI voor de volledige uitwerking, of meteen capaciteit inhuren.",
  ctaLabel: "Vraag een datum aan",
  ctaType: "datum",
  volgorde: 6,

  kop: "Van tien apps naar een portfolio dat je kunt dragen.",
  lead: "Eén dag met je belangrijkste stakeholders: waar staat je low-codeteam vandaag, waar wil je over twee tot drie jaar staan, en wat breekt er als eerste als je verdubbelt.",
  feiten: [
    { label: "Duur", waarde: "Eén dag" },
    { label: "Deelnemers", waarde: "Acht tot vijftien" },
    { label: "Uitkomst", waarde: "Gekozen route" },
  ],
  prijsToelichting:
    "Afhankelijk van de omvang van de groep. Inclusief voorbereiding en verslaglegging.",
  boekPunten: [
    "Twee facilitators met schaalervaring",
    "Analyse op business value, delivery en platform",
    "Twee routes naast elkaar, jullie kiezen",
  ],
  herkenIntro:
    "Voor organisaties die al met Mendix bouwen en merken dat de volgende stap niet vanzelf komt: meer teams, meer apps, meer vragen over eigenaarschap.",
  herken: [
    "We hebben tien apps live en niemand weet wie eigenaar is van het platform.",
    "Elk nieuw team vindt het wiel opnieuw uit.",
    "De business wil sneller, security wil trager, en wij zitten ertussen.",
  ],
  meeneemtTitel: "Een gekozen route, geen rapport",
  meeneemt: [
    {
      icon: "layers",
      titel: "Een foto van waar je nu staat",
      tekst: "Op drie lagen: business value, delivery en teams, platform en governance.",
    },
    {
      icon: "target",
      titel: "De doelsituatie over twee tot drie jaar",
      tekst: "Concreet gemaakt: hoeveel teams, hoeveel apps, welke rollen, welke doorlooptijd.",
    },
    {
      icon: "route",
      titel: "Twee routes ernaartoe, naast elkaar",
      tekst: "Met kosten, risico en snelheid per route. Het team kiest er één, ter plekke.",
    },
    {
      icon: "alert-triangle",
      titel: "De obstakels benoemd",
      tekst: "Wat er misgaat als je niets verandert, en wie daar iets aan kan doen.",
    },
    {
      icon: "handshake",
      titel: "Commitment in plaats van een rapport",
      tekst: "Iedereen die het besluit moet dragen zat aan tafel en heeft ja gezegd.",
    },
  ],
  meeneemtFoto: "/assets/photos/klantgesprek-tafel.webp",
  dagLabel: "De dag zelf",
  dagTitel: "Van huidige situatie naar gekozen route in één dag",
  dagIntro:
    "We werken met de hele groep, maar hakken knopen door in kleine sessies. Geen presentaties van onze kant langer dan tien minuten.",
  dagSlots: [
    {
      tijd: "09:00",
      titel: "Waar staan we",
      tekst: "Elke laag krijgt zijn eigen ronde: wat werkt, wat knelt, wat weten we niet.",
    },
    {
      tijd: "10:30",
      titel: "De pijn kwantificeren",
      tekst: "Doorlooptijd, herbouw, incidenten. Zonder cijfers blijft het een mening.",
    },
    {
      tijd: "11:30",
      titel: "De stip op de horizon",
      tekst: "Waar wil je staan, en waarom dan. De board-versie én de teamversie.",
    },
    {
      tijd: "13:00",
      titel: "Gap-analyse",
      tekst: "Wat er tussen nu en dan zit aan rollen, standaarden en platformwerk.",
    },
    {
      tijd: "14:15",
      titel: "Twee routes uitwerken",
      tekst: "Snel opschalen versus eerst fundering. We rekenen beide door.",
    },
    {
      tijd: "15:30",
      titel: "Kiezen",
      tekst: "Eén route, met de obstakels erbij benoemd.",
    },
    {
      tijd: "16:15",
      titel: "Wie doet wat",
      tekst: "Eigenaarschap per obstakel, met een datum.",
    },
    {
      tijd: "16:45",
      titel: "Afsluiten",
      tekst: "Samenvatting op één plaat, meteen deelbaar intern.",
    },
  ],
  voorbereidingIntro:
    "De waarde van de dag zit in wie er zit. Vooraf hebben we twee korte gesprekken om de juiste mensen aan tafel te krijgen.",
  wijZorgen: [
    "Twee facilitators met ervaring in schaaltrajecten bij vergelijkbare organisaties",
    "Een vragenlijst vooraf, zodat we de dag niet met inventariseren beginnen",
    "Verslaglegging op één plaat plus een uitgewerkte routebeschrijving",
    "Een terugkoppelmoment twee weken later, kosteloos",
  ],
  jijZorgt: [
    "De mensen die over budget, platform en teams gaan: allemaal op dezelfde dag",
    "Een lijst van je huidige apps met eigenaar en status",
    "Inzicht in je teamsamenstelling en je Mendix-licentiemodel",
    "Bereidheid om die dag ook echt een keuze te maken",
  ],
  daarnaIntro:
    "De route die je kiest bepaalt de vervolgstap. Dit zijn de twee die het vaakst uit een Scale Sessie komen.",
  vervolg: [
    {
      slug: "fusion-team-startsprint",
      reden: "Eerst capaciteit: businessexperts leren zelf bouwen naast onze developer.",
    },
    {
      slug: "training-enablement",
      reden: "Eerst kennis: je eigen mensen naar het niveau dat de route vraagt.",
    },
  ],
  faqTitel: "Wat deelnemers vooraf vragen",
  faq: [
    {
      vraag: "Is dit niet gewoon een verkapt verkoopgesprek?",
      antwoord:
        "Nee. Je betaalt ervoor, dus we werken voor jou. In een deel van de sessies is de uitkomst dat je het zelf kunt, en dat zeggen we dan ook.",
    },
    {
      vraag: "Wij hebben al een Center of Excellence. Wat voegt dit toe?",
      antwoord:
        "Meestal ontbreekt niet de wil maar de structuur. We brengen het App Factory-model en de ervaring van organisaties die dezelfde groei doormaakten.",
    },
    {
      vraag: "Kan dit ook in een halve dag?",
      antwoord:
        "Kan, maar dan sneuvelt de routekeuze. Onze ervaring is dat juist het kiezen tijd kost.",
    },
    {
      vraag: "Wie moet er echt bij zijn?",
      antwoord:
        "De budgethouder, de platform- of architectuurverantwoordelijke, en minimaal één product owner uit de business.",
    },
    {
      vraag: "Krijgen we ook een schriftelijk advies?",
      antwoord:
        "Ja, maar kort: één plaat met de huidige en doelsituatie, plus de gekozen route met obstakels en eigenaren.",
    },
  ],
  ctaTitel: "Eén dag, en je weet welke route je neemt.",
};
