import type { Service } from "@/lib/services";

export const TRAINING_ENABLEMENT: Service = {
  slug: "training-enablement",
  naam: "Training & Enablement",
  familie: "capaciteit",
  ookRelevantVoor: ["mendix", "ai", "strategie"],
  fase: 3,
  pitch: "Losse blokken van een dag, of een vaste coach één dag per week.",
  beschrijving:
    "Zelf kunnen bouwen, in blokken die je los boekt. Kies wat je nodig hebt: Mendix van de basis tot gevorderd, agents bouwen met Claude, of AI-beleid en werkafspraken voor je eigen team. Halve of hele dagen, groepen tot tien mensen. Wil je liever begeleiding op de werkvloer dan een cursus? Dan komt er een vaste coach één dag per week bij jullie zitten. Wat je ook kiest: we leggen de huisstandaarden vast, zodat wat jullie bouwen ook over twee jaar nog te onderhouden is.",
  doelgroep:
    "Citizen developers, business analisten, ontwikkelaars en teams die zelf willen bouwen.",
  duur: "Modulair, losse blokken of doorlopende coaching",
  groepsgrootte: "Groepen tot tien deelnemers",
  prijzen: [],
  resultaten: [
    "Mensen die zelfstandig bouwen",
    "Huisstandaarden vastgelegd, zodat het onderhoudbaar blijft",
    "Los te boeken per blok, of een vaste coach één dag per week",
  ],
  volgendeStap: "Een doorlopend enablement-programma, of certificeringstraject.",
  ctaLabel: "Plan een kennismaking (20 min)",
  ctaType: "kennismaking",
  volgorde: 9,

  kop: "Je eigen mensen zover krijgen dat ze het dragen.",
  lead: "Losse dagblokken over Mendix, AI en de manier van werken eromheen, of een vaste coach die één dag per week meeloopt met je teams. Altijd op jullie eigen projecten, nooit op oefencasussen.",
  feiten: [
    { label: "Vorm", waarde: "Losse blokken of vaste coach" },
    { label: "Groepsgrootte", waarde: "Tot tien deelnemers" },
    { label: "Locatie", waarde: "Bij jou op kantoor" },
  ],
  prijsToelichting:
    "Per dagblok, tot tien deelnemers. Doorlopende coaching op dagbasis, in overleg.",
  boekPunten: [
    "Trainers die zelf bouwen, geen fulltime docenten",
    "Op jullie eigen code en projecten",
    "Modulair: je kiest alleen de blokken die je nodig hebt",
  ],
  herkenIntro:
    "Voor organisaties die willen dat hun eigen mensen het overnemen, en gemerkt hebben dat een standaardcursus daar niet voor zorgt.",
  herken: [
    "Onze mensen hebben de officiële cursus gedaan en kunnen nog steeds niet zelfstandig bouwen.",
    "Alle kennis zit bij twee mensen en één daarvan gaat weg.",
    "We willen niet afhankelijk blijven van externen voor elke wijziging.",
  ],
  meeneemtTitel: "Mensen die het daarna zelf doen",
  meeneemt: [
    {
      icon: "graduation-cap",
      titel: "Vaardigheid op je eigen projecten",
      tekst:
        "We trainen op jullie code en jullie processen, dus wat je leert is meteen toepasbaar.",
    },
    {
      icon: "layout-grid",
      titel: "Een leerpad per rol",
      tekst: "Developer, product owner, tester en beheerder hebben elk iets anders nodig.",
    },
    {
      icon: "clipboard-check",
      titel: "Werkafspraken en standaarden",
      tekst: "Niet alleen bouwen, ook hoe je reviewt, test en documenteert.",
    },
    {
      icon: "user-check",
      titel: "Een interne kennisdrager",
      tekst: "Iemand die na afloop het aanspreekpunt is, met een plan om dat vol te houden.",
    },
    {
      icon: "refresh-cw",
      titel: "Terugkommomenten",
      tekst: "Kennis zakt weg. We komen terug op de momenten dat het ertoe doet.",
    },
  ],
  meeneemtFoto: "/assets/photos/portret-5.webp",
  dagLabel: "De blokken",
  dagTitel: "Kies de blokken die je nodig hebt",
  dagIntro:
    "Elk blok is een dag, op jullie locatie, met maximaal tien deelnemers. Of neem een vaste coach die één dag per week meeloopt.",
  dagSlots: [
    {
      tijd: "Blok A",
      titel: "Mendix fundamentals",
      tekst: "Voor nieuwe teamleden: datamodel, logica, schermen, en hoe je het níet doet.",
    },
    {
      tijd: "Blok B",
      titel: "Gevorderd bouwen",
      tekst: "Performance, koppelingen, herbruikbaarheid en de standaarden van jullie fundering.",
    },
    {
      tijd: "Blok C",
      titel: "Product owner in low-code",
      tekst: "Backlog, scope en prioritering als er wekelijks opgeleverd kan worden.",
    },
    {
      tijd: "Blok D",
      titel: "AI in het werkproces",
      tekst: "Wat je team veilig en zinvol met AI kan doen, op eigen taken.",
    },
    {
      tijd: "Blok E",
      titel: "Testen en beheer",
      tekst: "Regressie, releaseproces en hoe je een groeiend portfolio beheersbaar houdt.",
    },
    {
      tijd: "Coaching",
      titel: "Eén dag per week",
      tekst: "Een vaste coach die meeloopt in je sprints en bijstuurt terwijl het gebeurt.",
    },
  ],
  voorbereidingIntro:
    "We passen elk blok aan op jullie situatie. Daarvoor kijken we vooraf mee in jullie projecten.",
  wijZorgen: [
    "Trainers die zelf projecten doen, geen fulltime docenten",
    "Materiaal afgestemd op jullie code en werkwijze",
    "Een leerpad per rol, in overleg samengesteld",
    "Terugkommomenten en een aanspreekpunt na afloop",
  ],
  jijZorgt: [
    "Groepen van maximaal tien, ingedeeld op rol en niveau",
    "Een ruimte waar een dag geconcentreerd gewerkt kan worden",
    "Toegang tot jullie eigen projecten en omgevingen",
    "Deelnemers die die dag echt vrij zijn van operationeel werk",
  ],
  daarnaIntro:
    "Training werkt het best als hij ergens op landt: een fundering, een team of een plan.",
  vervolg: [
    {
      slug: "fusion-team-startsprint",
      reden: "Leren door vier weken samen te bouwen aan iets echts.",
    },
    {
      slug: "mendix-scale-sessie",
      reden: "Als de vraag groter is dan kennis alleen.",
    },
  ],
  faqTitel: "Wat opleidingsverantwoordelijken vragen",
  faq: [
    {
      vraag: "Waarin verschilt dit van de officiële Mendix-training?",
      antwoord:
        "Die leert je het platform, wij leren je bouwen binnen jullie context: jullie standaarden, jullie koppelingen, jullie processen. Vaak is de combinatie het beste.",
    },
    {
      vraag: "Kunnen we losse blokken afnemen?",
      antwoord: "Ja, dat is het uitgangspunt. Veel klanten beginnen met één blok en breiden uit.",
    },
    {
      vraag: "Hoe groot mag een groep zijn?",
      antwoord:
        "Tien is het maximum. Daarboven wordt het een presentatie in plaats van een werksessie.",
    },
    {
      vraag: "Werken jullie met certificering?",
      antwoord:
        "We leiden op richting Mendix-certificering waar dat gevraagd wordt, maar het doel is zelfstandig kunnen bouwen, niet het papiertje.",
    },
    {
      vraag: "Wat kost een vaste coach?",
      antwoord:
        "Dat rekenen we op dagbasis, afhankelijk van seniority en frequentie. In een kennismaking maken we daar snel een reële inschatting van.",
    },
  ],
  ctaTitel: "Kennis die blijft, ook als wij weg zijn.",
};
