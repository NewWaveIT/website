import type { Service } from "@/lib/services";

export const IT_STRATEGIE: Service = {
  slug: "it-strategie",
  naam: "IT-strategie op low-code en AI",
  familie: "richting",
  richting: "strategie",
  fase: 1,
  ookRelevantVoor: ["mendix"],
  pitch: "Waar zetten we low-code en AI in, waar juist niet, en welk deliverymodel hoort daarbij?",
  beschrijving:
    "Low-code groeit bij jullie harder dan de inrichting eromheen. Er komen apps bij, teams bij en vragen bij, maar de architectuur, governance en het deliverymodel groeiden niet mee. In twee tot drie weken brengen we in kaart waar jullie staan op business waarde, delivery en teams, en platformfundering. Je krijgt een roadmap met gefaseerde stappen, plus heldere antwoorden op de vragen waar je nu tegenaan loopt: waar past low-code en waar niet, welk deliverymodel hoort bij jullie ambitie, en waar landt AI in dit landschap.",
  doelgroep: "CIO, IT-directeur, informatiemanager of enterprise architect.",
  duur: "Twee tot drie weken",
  prijzen: [],
  resultaten: [
    "Een strategie- en roadmapdocument op drie lagen: business waarde, delivery en teams, platformfundering",
    "De keuze waar low-code past en waar een standaardpakket of maatwerk beter is",
    "Het passende deliverymodel, en waar AI in dat landschap landt",
  ],
  volgendeStap:
    "Inrichting van de fundering, opzetten van het deliverymodel, of een Fusion Team Startsprint.",
  ctaLabel: "Plan een kennismaking (20 min)",
  ctaType: "kennismaking",
  volgorde: 5,

  kop: "Waar zet je low-code en AI in, en waar juist niet.",
  lead: "In twee tot drie weken brengen we je applicatielandschap, je deliverymodel en je ambities bij elkaar in één plan: wat bouw je zelf, wat koop je, wat bouw je met low-code, en welke teams horen daarbij.",
  feiten: [
    { label: "Duur", waarde: "Twee tot drie weken" },
    { label: "Vorm", waarde: "Interviews en werksessies" },
    { label: "Uitkomst", waarde: "Geprioriteerde roadmap" },
  ],
  prijsToelichting:
    "Afhankelijk van de omvang van het landschap en het aantal betrokken afdelingen.",
  boekPunten: [
    "Interviews met business, IT en architectuur",
    "Applicatielandschap in kaart, inclusief schaduw-IT",
    "Roadmap met businesscase per initiatief",
  ],
  herkenIntro:
    "Voor IT-managers en CIO's die willen dat low-code en AI ergens op slaan in plaats van los rondzwerven.",
  herken: [
    "We hebben low-code, maar we kozen er nooit voor. Het gebeurde gewoon.",
    "Elke afdeling koopt zijn eigen pakket en wij mogen het koppelen.",
    "Ik moet volgend jaar budget verantwoorden en heb geen verhaal.",
  ],
  meeneemtTitel: "Een plan waarmee je budget kunt verantwoorden",
  meeneemt: [
    {
      icon: "map",
      titel: "Je applicatielandschap in kaart",
      tekst:
        "Inclusief wat er buiten IT om is aangeschaft. Dat plaatje alleen al is vaak confronterend.",
    },
    {
      icon: "git-fork",
      titel: "Bouwen, kopen of low-code",
      tekst:
        "Een beslisregel die je ook bij het volgende verzoek kunt toepassen, in plaats van per geval discussiëren.",
    },
    {
      icon: "users",
      titel: "Het deliverymodel dat erbij hoort",
      tekst: "Welke teams, welke rollen, wat centraal en wat bij de business.",
    },
    {
      icon: "list-ordered",
      titel: "Een geprioriteerde roadmap",
      tekst: "Met per initiatief een businesscase op hoofdlijnen: opbrengst, kosten, risico.",
    },
    {
      icon: "presentation",
      titel: "Een verhaal voor de board",
      tekst: "Dezelfde inhoud, in de taal waarin budget wordt toegekend.",
    },
  ],
  meeneemtFoto: "/assets/photos/klantgesprek-tafel.webp",
  dagLabel: "De weken",
  dagTitel: "Interviews, analyse, keuzes",
  dagIntro:
    "Wij doen het werk, jullie leveren tijd voor gesprekken en één werksessie. Geen maandenlang traject met een stuurgroep.",
  dagSlots: [
    {
      tijd: "Week 1",
      titel: "Interviews",
      tekst: "Tien tot vijftien gesprekken met business, IT, architectuur en security.",
    },
    {
      tijd: "Week 1",
      titel: "Landschap in kaart",
      tekst:
        "Applicaties, koppelingen, kosten en eigenaarschap inclusief wat er buiten IT om loopt.",
    },
    {
      tijd: "Week 2",
      titel: "Analyse en scenario's",
      tekst:
        "Waar zit overlap, waar zit risico, en welke deliverymodellen passen bij jullie omvang.",
    },
    {
      tijd: "Week 2",
      titel: "Werksessie",
      tekst: "We leggen de scenario's voor, jullie kiezen richting.",
    },
    {
      tijd: "Week 3",
      titel: "Roadmap en businesscases",
      tekst: "Initiatieven op volgorde, met kosten en opbrengsten per initiatief.",
    },
    {
      tijd: "Week 3",
      titel: "Presentatie",
      tekst: "Aan MT of board, door ons of door jou: wat intern het beste werkt.",
    },
  ],
  voorbereidingIntro:
    "Het meeste werk ligt bij ons. Wat we van jou nodig hebben is toegang tot mensen en informatie, snel.",
  wijZorgen: [
    "Een strateeg en een architect, twee tot drie weken beschikbaar",
    "Alle interviews, analyse en uitwerking",
    "Een roadmap met businesscase per initiatief",
    "De presentatie aan MT of board",
  ],
  jijZorgt: [
    "Beschikbaarheid van tien tot vijftien mensen voor een uur",
    "Inzicht in je huidige applicatiekosten en contracten",
    "Een opdrachtgever die knopen kan doorhakken in de werksessie",
    "Openheid over wat er nu niet werkt, ook als dat politiek gevoelig ligt",
  ],
  daarnaIntro:
    "Een roadmap is pas iets waard als de eerste stap gezet wordt. Die stap staat meestal in dit rijtje.",
  vervolg: [
    {
      slug: "mendix-scale-sessie",
      reden: "Als je al bouwt en de vraag over opschalen gaat.",
    },
    {
      slug: "training-enablement",
      reden: "Als het plan vraagt om mensen die je nog niet in huis hebt.",
    },
  ],
  faqTitel: "Wat CIO's en IT-managers vragen",
  faq: [
    {
      vraag: "Is dit niet gewoon een adviesrapport?",
      antwoord:
        "Het verschil zit in de scope en de tijd: drie weken, geprioriteerd, met businesscases. En wij blijven beschikbaar als het uitgevoerd moet worden.",
    },
    {
      vraag: "Zijn jullie niet gekleurd, als Mendix-partner?",
      antwoord:
        "Deels: we kennen low-code goed. Daarom staat in elk advies expliciet waar low-code níet het antwoord is. Dat is meestal het nuttigste deel.",
    },
    {
      vraag: "Kunnen jullie ook de uitvoering doen?",
      antwoord:
        "Ja, maar dat is geen voorwaarde. We schrijven het plan zo dat een andere partij het ook kan uitvoeren.",
    },
    {
      vraag: "Wat als de uitkomst is dat we moeten stoppen met een platform?",
      antwoord:
        "Dan staat dat erin. Sunk cost is een slechte adviseur en dat schrijven we ook zo op.",
    },
    {
      vraag: "Hoeveel tijd kost het ons?",
      antwoord:
        "Reken op een uur per geïnterviewde, een dagdeel voor de werksessie en een uur voor de presentatie.",
    },
  ],
  ctaTitel: "Drie weken, en je weet wat je bouwt, koopt en laat.",
};
