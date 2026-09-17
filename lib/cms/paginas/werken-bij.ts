import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
  { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
  { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
  { key: "groeiKicker", label: "Groei — kicker", type: "text" },
  { key: "groeiTitel", label: "Groei — titel", type: "text" },
  { key: "groeiIntro", label: "Groei — intro", type: "textarea" },
  { key: "groei1Titel", label: "Groei 1 — titel", type: "text" },
  { key: "groei1Tekst", label: "Groei 1 — tekst", type: "textarea" },
  { key: "groei2Titel", label: "Groei 2 — titel", type: "text" },
  { key: "groei2Tekst", label: "Groei 2 — tekst", type: "textarea" },
  { key: "groei3Titel", label: "Groei 3 — titel", type: "text" },
  { key: "groei3Tekst", label: "Groei 3 — tekst", type: "textarea" },
  { key: "tpKicker", label: "Total People — kicker", type: "text" },
  { key: "tpTitel", label: "Total People — titel", type: "text" },
  { key: "tpIntro", label: "Total People — intro", type: "textarea" },
  { key: "tp1Titel", label: "Total People 1 — titel", type: "text" },
  { key: "tp1Tekst", label: "Total People 1 — tekst", type: "textarea" },
  { key: "tp2Titel", label: "Total People 2 — titel", type: "text" },
  { key: "tp2Tekst", label: "Total People 2 — tekst", type: "textarea" },
  { key: "tp3Titel", label: "Total People 3 — titel", type: "text" },
  { key: "tp3Tekst", label: "Total People 3 — tekst", type: "textarea" },
  { key: "cultuurKicker", label: "Cultuur — kicker", type: "text" },
  { key: "cultuurTitel", label: "Cultuur — titel", type: "text" },
  { key: "cultuurP", label: "Cultuur — tekst", type: "textarea" },
  { key: "cultuur1", label: "Cultuur — punt 1", type: "text" },
  { key: "cultuur2", label: "Cultuur — punt 2", type: "text" },
  { key: "cultuur3", label: "Cultuur — punt 3", type: "text" },
  { key: "cultuur4", label: "Cultuur — punt 4", type: "text" },
  { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  { key: "geenMatchVoor", label: "Onder de vacaturelijst — aanloopzin", type: "text" },
  { key: "geenVacatures", label: "Geen vacatures open — tekst", type: "textarea" },
  { key: "openSollLink", label: "Onder de vacaturelijst — linktekst", type: "text" },
  {
    key: "belRegel",
    label: "Onder de vacaturelijst — belzin",
    type: "text",
    help: "{naam} en {telefoon} worden vervangen door de recruitmentcontactpersoon.",
  },
  { key: "heroKicker", label: "Hero — kicker", type: "text" },
  { key: "heroKnopTwee", label: "Hero — tweede knop", type: "text" },
  { key: "vacaturesKicker", label: "Vacatures — kicker", type: "text" },
  { key: "vacaturesTitel", label: "Vacatures — titel", type: "text" },
  { key: "ctaKnop", label: "Slot-CTA — knoptekst", type: "text" },
  { key: "openSollKop", label: "Open sollicitatie — kop", type: "text" },
  { key: "openSollIntro", label: "Open sollicitatie — intro", type: "textarea" },
  { key: "cultuurFotoAlt", label: "Cultuur — alt-tekst bij de foto", type: "text" },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  heroTitleStart: "Word een ",
  heroAccent: "Waver",
  heroLead:
    "Het is onze droom dat elk mens werk doet dat aansluit bij persoonlijke doelen en drijfveren. Wij verzorgen de randvoorwaarden: een gelijk speelveld, een open cultuur en alle ruimte om te groeien. Jij zorgt voor de versnelling bij onze partners.",
  ctaTitel: "Eerst een kop koffie? Kom kennismaken.",
  groeiKicker: "Groei & ontwikkeling",
  groeiTitel: "Elke dag samen beter worden",
  groeiIntro:
    "Persoonlijke aandacht en focus op groei zijn de kern. Samen verkennen we meerdere routes naar jouw ambitie en kiezen we de best passende weg.",
  groei1Titel: "Persoonlijk groeipad",
  groei1Tekst:
    "Jouw route bestaat uit activiteiten on-the-job, cursussen en trainingen, gekozen op basis van jouw ambitie, niet een standaardlijstje.",
  groei2Titel: "Open feedbackcultuur",
  groei2Tekst:
    "Regelmatige, open en eerlijke feedback hoort bij onze cultuur. Elk half jaar haal je bovendien 360°-feedback op uit je omgeving.",
  groei3Titel: "Learning week",
  groei3Tekst:
    "Jaarlijks trekken we er met z'n allen een volle week op uit om samen te ontwikkelen: vakinhoudelijk én persoonlijk.",
  tpKicker: "Total People",
  tpTitel: "Presteren, groeien én ontspannen",
  tpIntro:
    "Bij ons staat het Total People-principe centraal: de balans tussen presteren, groeien en ontspannen. Jouw groei is onze groei.",
  tp1Titel: "Presteren",
  tp1Tekst:
    "Uitdagende opdrachten bij partners in de publieke sector, mobiliteit, banken, zorg en manufacturing. Een rol op maat die jij zelf kiest.",
  tp2Titel: "Groeien",
  tp2Tekst:
    "Zeggenschap over de koers: je beslist mee over strategie en investeringen van onze organisatie. Plus een persoonlijk groeipad met open feedback.",
  tp3Titel: "Ontspannen",
  tp3Tekst:
    "Werk dat aansluit bij jouw doelen en drijfveren, met ruimte voor rust. Duurzaam onderweg in een elektrische auto van de zaak.",
  cultuurKicker: "Onze cultuur",
  cultuurTitel: "Ondernemende mensen, gelijk speelveld.",
  cultuurP:
    "Je werkt hier niet vóór ons, je werkt mét ons. Gepassioneerde consultants en engineers die naast klantteams staan en zelf ruimte krijgen om te groeien naar expertrollen.",
  cultuur1: "Persoonlijk groeipad, geen vaste carrièreladder",
  cultuur2: "Wavetime en Company week als vaste cultuurrituelen",
  cultuur3:
    "Werken met bewezen frameworks (App Factory, OGSM, App in a Day) in plaats van losse projecten",
  cultuur4: "Gelijke, transparante beloning bij gelijke ervaring, ongeacht gender of achtergrond",
  geenMatchVoor: "Staat jouw rol er niet tussen?",
  geenVacatures:
    "Op dit moment staan er geen vacatures open. We spreken sowieso graag met Mendix- en AI-consultants die bij ons passen.",
  openSollLink: "Stuur hieronder een open sollicitatie",
  belRegel: "of bel {naam}: {telefoon}.",
  heroKicker: "Werken bij The New Wave IT",
  heroKnopTwee: "Leer ons eerst kennen",
  vacaturesKicker: "Vacatures",
  vacaturesTitel: "Kom de golf versterken.",
  ctaKnop: "Kom kennismaken",
  openSollKop: "Open sollicitatie",
  openSollIntro:
    "Geen passende vacature? Laat je gegevens achter, we kijken graag of er een match is.",
  cultuurFotoAlt: "Wavers tijdens een kennissessie",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
