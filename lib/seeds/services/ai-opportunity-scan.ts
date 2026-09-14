import type { Service } from "@/lib/services";

export const AI_OPPORTUNITY_SCAN: Service = {
  slug: "ai-opportunity-scan",
  naam: "AI Opportunity Scan",
  familie: "richting",
  richting: "ai",
  fase: 2,
  pitch: "Een halve dag met je team, en je weet waar AI bij jullie geld oplevert en waar niet.",
  beschrijving:
    "Weten waar AI bij jullie écht iets oplevert, in een halve dag. Wij komen langs, brengen jullie processen in kaart en gaan met het team op zoek naar de plekken waar mensen nu beslissingen nemen met onvolledige informatie. Je krijgt de drie kansrijkste toepassingen op een rij, gescoord op wat ze opleveren en hoe haalbaar ze zijn, plus een uitgewerkt voorstel voor de eerste stap. Vaste prijs, verrekenbaar als je verdergaat.",
  doelgroep:
    "Proceseigenaren, managers en de mensen die het werk kennen, bij voorkeur uit meer dan één afdeling.",
  duur: "Halve dag",
  groepsgrootte: "Zes tot tien deelnemers",
  prijzen: [],
  resultaten: [
    "De AI Opportunity Map van de eigen processen",
    "De drie kansrijkste toepassingen met randvoorwaarden",
    "Een voorstel voor de eerste stap, met prijs en doorlooptijd",
  ],
  volgendeStap: "Een proef van twee weken op de gekozen toepassing, met jullie eigen data.",
  ctaLabel: "Vraag een datum aan",
  ctaType: "datum",
  volgorde: 3,

  kop: "Een halve dag, en je weet waar AI geld oplevert.",
  lead: "We nemen je processen door met het team dat ze uitvoert, en zetten er cijfers bij. Aan het eind ligt er een korte lijst met kansen, gerangschikt op waarde en haalbaarheid, inclusief wat je beter niet doet.",
  feiten: [
    { label: "Duur", waarde: "Halve dag" },
    { label: "Deelnemers", waarde: "Zes tot tien" },
    { label: "Uitkomst", waarde: "Gerangschikte kansenlijst" },
  ],
  prijsToelichting:
    "Verrekenbaar bij een vervolgopdracht. De laagdrempeligste manier om met ons te beginnen.",
  boekPunten: [
    "Eén AI-consultant, halve dag on site",
    "Kansen met een indicatie van waarde en inspanning",
    "Verrekenbaar als je doorgaat",
  ],
  herkenIntro:
    "Voor teams die willen beginnen maar niet weten waar, en voor teams die al tien ideeën hebben en moeten kiezen.",
  herken: [
    "We hebben een lijst met AI-ideeën, maar geen idee wat het oplevert.",
    "Elke afdeling roept iets anders, en niemand rekent het door.",
    "We willen niet de eerste zijn die vijf ton in een pilot stopt.",
  ],
  meeneemtTitel: "Een lijst waarop je een besluit kunt nemen",
  meeneemt: [
    {
      icon: "list-ordered",
      titel: "Kansen op volgorde",
      tekst:
        "Gerangschikt op verwachte waarde en benodigde inspanning, niet op wie het hardst riep.",
    },
    {
      icon: "calculator",
      titel: "Een ruwe businesscase per kans",
      tekst: "Uren, doorlooptijd of fouten: wat de kans raakt, met een orde van grootte erbij.",
    },
    {
      icon: "ban",
      titel: "Een lijst met wat je níet moet doen",
      tekst: "Vaak net zo waardevol: kansen die duur, riskant of gewoon onnodig blijken.",
    },
    {
      icon: "flag",
      titel: "Eén voorstel om mee te beginnen",
      tekst:
        "De kans met de beste verhouding tussen waarde en risico, uitgewerkt tot een concreet startpunt.",
    },
    {
      icon: "shield",
      titel: "Aandachtspunten op data en AVG",
      tekst: "Waar je tegen privacy, kwaliteit of eigenaarschap van data aanloopt.",
    },
  ],
  meeneemtFoto: "/assets/photos/overleg-lachend.webp",
  dagLabel: "De sessie",
  dagTitel: "Vier rondes in vier uur",
  dagIntro:
    "Kort en scherp. We hebben aan een halve dag genoeg omdat we vooraf al in je processen hebben gekeken.",
  dagSlots: [
    {
      tijd: "Vooraf",
      titel: "Documentendeling",
      tekst: "We lezen ons in op je processen, zodat we niet met uitleg beginnen.",
    },
    {
      tijd: "13:00",
      titel: "Processen op tafel",
      tekst: "Waar gaat tijd in zitten, waar ontstaan fouten, waar staat iemand te wachten.",
    },
    {
      tijd: "14:00",
      titel: "Kansen benoemen",
      tekst: "Breed en zonder filter: eerst verzamelen, dan pas oordelen.",
    },
    {
      tijd: "15:00",
      titel: "Waarderen",
      tekst: "Per kans: wat levert het op, wat kost het, en wat is het risico.",
    },
    {
      tijd: "16:00",
      titel: "Rangschikken en kiezen",
      tekst: "De lijst op volgorde, en één kans die we uitwerken tot een startpunt.",
    },
    {
      tijd: "16:45",
      titel: "Afspraken",
      tekst: "Wie pakt wat op, en wanneer kijken we terug.",
    },
  ],
  voorbereidingIntro:
    "Een week vooraf sturen we een korte vragenlijst en vragen we wat procesdocumentatie op. Dat scheelt een uur inventariseren.",
  wijZorgen: [
    "Een AI-consultant met ervaring in jouw sector",
    "Voorbereiding op basis van je procesdocumentatie",
    "De uitgewerkte kansenlijst binnen vijf werkdagen",
    "Verrekening van de kosten als je binnen drie maanden doorgaat",
  ],
  jijZorgt: [
    "Zes tot tien mensen die de processen uitvoeren en aansturen",
    "Beschikbare procesdocumentatie of cijfers over doorlooptijd en volume",
    "Iemand die iets kan zeggen over data en privacy",
    "Openheid over wat er nu misgaat; daar zitten de kansen",
  ],
  daarnaIntro: "De scan wijst de richting. Wat je daarna doet hangt af van waar de kans zit.",
  vervolg: [
    {
      slug: "ai-agent-in-a-day",
      reden: "Snel laten zien dat het werkt, met het team dat het gaat gebruiken.",
    },
    {
      slug: "ai-strategie",
      reden: "Als de kansen je verdienmodel raken en niet alleen je kosten.",
    },
  ],
  faqTitel: "Wat opdrachtgevers vooraf vragen",
  faq: [
    {
      vraag: "Waarom zo goedkoop?",
      antwoord:
        "Omdat het bedoeld is als kennismaking met echte inhoud. Bevalt het, dan verrekenen we het bij een vervolgopdracht.",
    },
    {
      vraag: "Krijgen we een rapport?",
      antwoord:
        "Een korte: de kansenlijst met per kans een halve pagina. Geen dertig pagina's marktcontext.",
    },
    {
      vraag: "Wat als de uitkomst is dat AI niets oplevert?",
      antwoord:
        "Dan zeggen we dat. Dat is ook een uitkomst waar je een half jaar discussie mee bespaart.",
    },
    {
      vraag: "Moeten we al data op orde hebben?",
      antwoord: "Nee. Sterker: hoe je data ervoor staat is vaak juist een van de uitkomsten.",
    },
    {
      vraag: "Kan dit online?",
      antwoord:
        "Kan, maar we raden het af. De waarde zit in de discussie tussen afdelingen, en die loopt online stroever.",
    },
  ],
  ctaTitel: "Een halve dag, en de discussie over AI gaat over cijfers.",
};
