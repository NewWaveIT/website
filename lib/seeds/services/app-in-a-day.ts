import type { Service } from "@/lib/services";

export const APP_IN_A_DAY: Service = {
  slug: "app-in-a-day",
  naam: "App in a Day",
  familie: "doen",
  richting: "mendix",
  fase: 2,
  pitch:
    "Aan het eind van de dag draait er een app voor een proces dat nu in spreadsheets en mailtjes zit.",
  beschrijving:
    "Eén dag, en er draait een app. Kies een proces dat nu in spreadsheets en mailtjes rondgaat. Met jouw team en onze begeleiders bouwen we het die dag om tot een werkende applicatie met jullie eigen gegevens erin. Geen prototype dat in een la verdwijnt: je kunt hem morgen gebruiken en later verder uitbouwen. En je weet aan het eind van de dag uit eigen ervaring wat low-code wel en niet voor je kan doen.",
  doelgroep:
    "Business teams met een proces dat vastloopt in Excel en mail. Ook geschikt voor een IT-afdeling die wil ervaren wat low-code werkelijk is voordat er een platformbesluit valt.",
  duur: "Eén dag",
  groepsgrootte: "Zes tot tien deelnemers",
  prijzen: [{ label: "€ 4.500 – 6.500", variant: "exclusief licenties en omgeving" }],
  resultaten: [
    "Een werkende app voor een echt eigen proces, met de eigen data erin",
    "Na de dag gewoon te gebruiken of verder door te ontwikkelen",
    "Een eerlijk beeld van wat low-code wel en niet kan",
  ],
  volgendeStap:
    "Doorontwikkeling van de app, of een Fusion Team Startsprint om het zelf te kunnen.",
  ctaLabel: "Vraag een datum aan",
  ctaType: "datum",
  volgorde: 1,

  kop: "Aan het eind van de dag draait er een app.",
  lead: "Eén proces dat nu in spreadsheets en mailtjes zit, is aan het eind van de dag een werkende applicatie op je eigen data. Geen mockup, geen rapport, maar iets waar je maandag mee verder kunt.",
  feiten: [
    { label: "Duur", waarde: "Eén dag · 09:00–17:00" },
    { label: "Deelnemers", waarde: "Zes tot tien" },
    { label: "Locatie", waarde: "Bij jou of bij ons" },
  ],
  prijsToelichting: "Exclusief licenties en omgeving. Vaste prijs, we spreken de scope vooraf af.",
  boekPunten: [
    "Twee consultants: een developer en een facilitator",
    "Werkende app op je eigen data",
    "Geen vervolgverplichting",
  ],
  herkenIntro:
    "App in a Day is er voor teams die één concreet proces willen aanpakken en willen weten of low-code voor hen werkt, zonder eerst een traject van drie maanden te kopen.",
  herken: [
    "Ons belangrijkste proces draait op één spreadsheet die maar één iemand echt begrijpt.",
    "We praten al een jaar over dit systeem en er is nog steeds niets gebouwd.",
    "We willen zien wat low-code met ónze data doet, niet in een demo van een leverancier.",
  ],
  meeneemtTitel: "Vijf dingen die om 17:00 op tafel liggen",
  meeneemt: [
    {
      icon: "app-window",
      titel: "Een werkende app op je eigen data",
      tekst: "Live in een acceptatieomgeving, met echte gebruikers erin. Geen klikbaar prototype.",
    },
    {
      icon: "git-branch",
      titel: "Het procesontwerp op één plaat",
      tekst:
        "Rollen, stappen en statussen zoals ze werkelijk lopen. Vaak het eerste moment dat iedereen hetzelfde plaatje ziet.",
    },
    {
      icon: "list-checks",
      titel: "Een geprioriteerde backlog richting productie",
      tekst:
        "Wat er nog nodig is aan koppelingen, security en beheer, met een reële inschatting van tijd.",
    },
    {
      icon: "folder-down",
      titel: "Het projectbestand en de opname van de dag",
      tekst: "Van jou. Je kunt zelf verder bouwen of het door een andere partij laten oppakken.",
    },
    {
      icon: "message-square-warning",
      titel: "Een eerlijk oordeel",
      tekst:
        "Ook als het antwoord “low-code is hier niet het juiste gereedschap” is. Dat zeggen we dan gewoon.",
    },
  ],
  meeneemtFoto: "/assets/photos/team-overleg-scherm.webp",
  dagLabel: "De dag zelf",
  dagTitel: "Van proces op tafel naar app in productieomgeving",
  dagIntro:
    "We bouwen live, in dezelfde ruimte als jullie. Elke twee uur zie je iets werken, zodat bijsturen nog kan.",
  dagSlots: [
    {
      tijd: "09:00",
      titel: "Proces op tafel",
      tekst:
        "De mensen die het werk doen lopen hun proces door. Wij tekenen mee en stellen de vervelende vragen.",
    },
    {
      tijd: "10:00",
      titel: "Scope vastzetten",
      tekst:
        "Wat bouwen we vandaag wel en wat expliciet niet. Eén besluitvormer hakt de knopen door.",
    },
    {
      tijd: "10:30",
      titel: "Bouwen, ronde één",
      tekst: "Datamodel en schermen. Jullie kijken mee en zien de app onder je handen ontstaan.",
    },
    {
      tijd: "12:30",
      titel: "Lunchdemo",
      tekst: "Eerste keer klikken door de app. Wat niet klopt, gaat direct de middag in.",
    },
    {
      tijd: "13:15",
      titel: "Bouwen, ronde twee",
      tekst: "Logica, rollen en rechten, notificaties. Je eigen data gaat erin.",
    },
    {
      tijd: "15:30",
      titel: "Testen met de gebruikers",
      tekst: "De mensen die het straks doen, doen het nu. Kleine dingen fixen we ter plekke.",
    },
    {
      tijd: "16:15",
      titel: "Demo aan stakeholders",
      tekst: "Jullie geven zelf de demo. Dat werkt intern beter dan wanneer wij het doen.",
    },
    {
      tijd: "16:45",
      titel: "Wat is er nodig voor productie",
      tekst: "Backlog, inschatting en een eerlijk advies over de route erheen.",
    },
  ],
  voorbereidingIntro:
    "De dag valt of staat bij de voorbereiding. Twee weken vooraf hebben we één belafspraak van een half uur om het proces en de scope te kiezen.",
  wijZorgen: [
    "Twee consultants: een Mendix-developer en een facilitator die het proces uit de groep haalt",
    "Een ingerichte ontwikkel- en acceptatieomgeving, klaar voor gebruik",
    "Een voorgesprek van dertig minuten om het proces te kiezen en de scope af te bakenen",
    "De oplevering: app, procesplaat, backlog en projectbestand",
  ],
  jijZorgt: [
    "Eén proces dat pijn doet en in een dag te vatten is; wij helpen kiezen als je twijfelt",
    "De mensen die het proces echt uitvoeren, niet alleen hun leidinggevende",
    "Een besluitvormer die ter plekke ja of nee kan zeggen",
    "Een export van de huidige spreadsheet of een testset met representatieve data",
    "Een ruimte met een groot scherm en een dag zonder andere afspraken",
  ],
  daarnaIntro:
    "App in a Day staat op zichzelf: je zit nergens aan vast. Wil je door, dan zijn dit de routes die het vaakst volgen.",
  vervolg: [
    {
      slug: "fusion-team-startsprint",
      reden:
        "Vier weken waarin een businessexpert en onze developer samen bouwen, en de businessexpert het daarna zelf kan.",
    },
    {
      slug: "mendix-scale-sessie",
      reden:
        "Al meerdere apps live? Dan is de vraag niet hoe je bouwt, maar hoe je schaalt zonder chaos.",
    },
  ],
  faqTitel: "Wat deelnemers vooraf vragen",
  faq: [
    {
      vraag: "Is de app die we bouwen van ons?",
      antwoord:
        "Ja. Het projectbestand en alles wat we die dag maken is jouw eigendom, ook als je verder niets met ons doet.",
    },
    {
      vraag: "Hebben we Mendix-licenties nodig?",
      antwoord:
        "Voor de dag zelf niet: we werken in onze omgeving. Wil je de app in productie nemen, dan zijn licenties nodig. We leggen vooraf uit wat dat ongeveer kost.",
    },
    {
      vraag: "Wat als het binnen één dag niet lukt?",
      antwoord:
        "Dat komt zelden voor, omdat we vooraf samen de scope kiezen. Blijkt tijdens de dag dat het proces te groot is, dan knippen we het en leveren we het deel dat af is, plus een eerlijk beeld van de rest.",
    },
    {
      vraag: "Kan het op onze eigen Mendix-omgeving?",
      antwoord:
        "Ja, als je die al hebt en we vooraf toegang krijgen. Vaak is onze omgeving sneller: geen wachten op accounts op de ochtend zelf.",
    },
    {
      vraag: "Hoeveel mensen kunnen erbij zijn?",
      antwoord:
        "Zes tot tien. Minder werkt ook, meer niet: dan wordt het een presentatie in plaats van een werksessie.",
    },
    {
      vraag: "Kan dit ook met AI in plaats van Mendix?",
      antwoord:
        "Dan is AI Agent in a Day de juiste variant: iedereen brengt één echte taak mee en gaat naar huis met een agent die die taak doet.",
    },
  ],
  ctaTitel: "Eén dag, één proces, een werkende app.",
};
