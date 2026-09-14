import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
  { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
  { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
  { key: "heroKicker", label: "Hero — kicker", type: "text" },
  { key: "missieKicker", label: "Missie — kicker", type: "text" },
  { key: "teamKicker", label: "Team — kicker", type: "text" },
  { key: "teamKnop", label: "Team — knoptekst", type: "text" },
  { key: "missieTitel", label: "Missie — titel", type: "text" },
  { key: "missieP1", label: "Missie — alinea 1", type: "textarea" },
  { key: "missieP2", label: "Missie — alinea 2", type: "textarea" },
  { key: "teamTitel", label: "Team — titel", type: "text" },
  { key: "teamP1", label: "Team — alinea 1", type: "textarea" },
  { key: "teamP2", label: "Team — alinea 2", type: "textarea" },
  { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  { key: "waardenKicker", label: "Waarden — kicker", type: "text" },
  { key: "waardenTitel", label: "Waarden — titel", type: "text" },
  { key: "waarde1Titel", label: "Waarde 1 — titel", type: "text" },
  { key: "waarde1Tekst", label: "Waarde 1 — tekst", type: "textarea" },
  { key: "waarde2Titel", label: "Waarde 2 — titel", type: "text" },
  { key: "waarde2Tekst", label: "Waarde 2 — tekst", type: "textarea" },
  { key: "waarde3Titel", label: "Waarde 3 — titel", type: "text" },
  { key: "waarde3Tekst", label: "Waarde 3 — tekst", type: "textarea" },
  { key: "waarde4Titel", label: "Waarde 4 — titel", type: "text" },
  { key: "kpi1Getal", label: "Feit 1 — getal", type: "text" },
  { key: "kpi1Label", label: "Feit 1 — label", type: "text" },
  { key: "kpi2Getal", label: "Feit 2 — getal", type: "text" },
  { key: "kpi2Label", label: "Feit 2 — label", type: "text" },
  { key: "kpi3Getal", label: "Feit 3 — getal", type: "text" },
  { key: "kpi3Label", label: "Feit 3 — label", type: "text" },
  { key: "missieFotoAlt", label: "Missie — alt-tekst bij de foto", type: "text" },
  { key: "teamFotoAlt", label: "Team — alt-tekst bij de foto", type: "text" },
  { key: "adresRegel", label: "Voetregel — bezoekadres", type: "text" },
  { key: "waarde4Tekst", label: "Waarde 4 — tekst", type: "textarea" },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  heroTitleStart: "De ondernemende mens zorgt voor ",
  heroAccent: "vooruitgang",
  heroLead:
    "Wij geloven dat succesvolle verandering begint bij mensen. Daarom verzorgen wij alle randvoorwaarden voor onze Wavers, en helpen zij onze partners maximaal digitaal versnellen. Zo staat jouw organisatie klaar voor de dag van overmorgen.",
  heroKicker: "Over ons",
  missieKicker: "Onze missie",
  teamKicker: "Het team",
  teamKnop: "Kom kennismaken",
  missieTitel: "Maximale digitale impact, met de mens als maat.",
  missieP1:
    "We richtten The New Wave IT op vanuit één overtuiging: technologie is het middel, de mens is de maat. Wij zijn geen anonieme delivery-machine. Je werkt met mensen die je vraagstuk écht doorgronden, van de eerste sessie tot livegang en daarna.",
  missieP2:
    "Dat doen we door op elk project de mensen te kiezen van wie de ervaring, skills en ambitie het beste passen bij jouw vraagstuk. Ons doel? Dat elk mens werk doet dat aansluit bij zijn of haar persoonlijke doelen en drijfveren.",
  teamTitel: "Ontmoet de Wavers.",
  teamP1:
    "Geen anonieme delivery-machine: je kent de mensen die jouw vraagstuk oplossen. Senior consultants en engineers die de taal van de boardroom én de werkvloer spreken, betrokken als partner.",
  teamP2:
    "Van strategische sessies tot livegang en beheer: hetzelfde team blijft aan boord. Zo houden we vaart, kwaliteit en verantwoordelijkheid bij elkaar. Wekelijkse Wavetime-sessies en een jaarlijkse Company week: structurele investering in hoe we sámen werken.",
  ctaTitel: "Benieuwd wat onze mensen voor jouw doelen kunnen betekenen?",
  waardenKicker: "Waar wij voor staan",
  waardenTitel: "Vier overtuigingen die je terugziet in ons werk",
  waarde1Titel: "Mens centraal",
  waarde1Tekst:
    "De mens is de centrale factor in het behalen van business doelstellingen, niet de technologie zelf. Beloning is bij ons gelijk en transparant voor iedereen met dezelfde ervaring, ongeacht gender of achtergrond.",
  waarde2Titel: "Pragmatisch",
  waarde2Tekst:
    "We rekenen elke oplossing door op wat jouw vraagstuk daadwerkelijk oplost, en zeggen net zo makkelijk nee tegen een hype die dat niet doet.",
  waarde3Titel: "Autoriteit door bewijs",
  waarde3Tekst:
    "Bewezen frameworks (App Factory, OGSM, 3-Horizonsmodel) en concrete resultaten, geen losse claims.",
  waarde4Titel: "Duurzaam ondernemen",
  waarde4Tekst:
    "Ondernemen en maatschappelijke bijdrage horen bij elkaar. In 2030 is ons businessmodel 100% CO2-neutraal.",
  kpi1Getal: "2023",
  kpi1Label: "Opgericht, kantoor in Utrecht",
  kpi2Getal: "100%",
  kpi2Label: "De mens centraal, op elk project",
  kpi3Getal: "2030",
  kpi3Label: "Doel: CO2-neutraal businessmodel",
  missieFotoAlt: "Wavers in gesprek met een klant",
  teamFotoAlt: "Het team achter The New Wave IT",
  adresRegel: "Ganzenmarkt 6, 3512 GD Utrecht",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
