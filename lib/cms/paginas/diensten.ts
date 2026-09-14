import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
  { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
  { key: "heroTitleEnd", label: "Hero — titel (eind)", type: "text" },
  { key: "heroLead", label: "Hero — introtekst", type: "textarea" },

  { key: "heroKicker", label: "Hero — kicker", type: "text" },
  { key: "kaartInstap", label: "Dienstkaart — chip bij een instapdienst", type: "text" },
  { key: "kaartMeer", label: "Dienstkaart — link", type: "text" },
  { key: "basisKicker", label: "Basisdienst — kicker", type: "text" },
  { key: "basisTitel", label: "Basisdienst — titel", type: "text" },
  { key: "basisTekst", label: "Basisdienst — tekst", type: "textarea" },
  { key: "basisRol1Label", label: "Basisdienst — rol 1: spoor", type: "text" },
  { key: "basisRol1Naam", label: "Basisdienst — rol 1: rol", type: "text" },
  { key: "basisRol1Tekst", label: "Basisdienst — rol 1: toelichting", type: "text" },
  { key: "basisRol2Label", label: "Basisdienst — rol 2: spoor", type: "text" },
  { key: "basisRol2Naam", label: "Basisdienst — rol 2: rol", type: "text" },
  { key: "basisRol2Tekst", label: "Basisdienst — rol 2: toelichting", type: "text" },
  { key: "basisRol3Label", label: "Basisdienst — rol 3: spoor", type: "text" },
  { key: "basisRol3Naam", label: "Basisdienst — rol 3: rol", type: "text" },
  { key: "basisRol3Tekst", label: "Basisdienst — rol 3: toelichting", type: "text" },
  { key: "basisRol4Label", label: "Basisdienst — rol 4: spoor", type: "text" },
  { key: "basisRol4Naam", label: "Basisdienst — rol 4: rol", type: "text" },
  { key: "basisRol4Tekst", label: "Basisdienst — rol 4: toelichting", type: "text" },
  { key: "basisPersoonRol", label: "Basisdienst — kaart: label boven de naam", type: "text" },
  { key: "basisPersoonTekst", label: "Basisdienst — kaart: tekst bij de foto", type: "textarea" },
  { key: "basisInzetLabel", label: "Basisdienst — kaart: label bij de inzet", type: "text" },
  { key: "basisInzetWaarde", label: "Basisdienst — kaart: inzet", type: "text" },
  { key: "basisPunt1", label: "Basisdienst — kaart: punt 1", type: "text" },
  { key: "basisPunt2", label: "Basisdienst — kaart: punt 2", type: "text" },
  { key: "basisPunt3", label: "Basisdienst — kaart: punt 3", type: "text" },
  { key: "basisPunt4", label: "Basisdienst — kaart: punt 4", type: "text" },
  { key: "basisCta", label: "Basisdienst — knop", type: "text" },
  { key: "basisCtaAlt", label: "Basisdienst — tweede link", type: "text" },

  { key: "instapKicker", label: "Instapdiensten — kicker", type: "text" },
  { key: "instapTitel", label: "Instapdiensten — titel", type: "text" },
  { key: "instapIntro", label: "Instapdiensten — intro", type: "textarea" },

  { key: "verdiepingKicker", label: "Verdieping — kicker", type: "text" },
  { key: "verdiepingTitel", label: "Verdieping — titel", type: "text" },
  { key: "verdiepingIntro", label: "Verdieping — intro", type: "textarea" },
  { key: "verdiepingRichtingTekst", label: "Verdieping — tekst bij 'Richting'", type: "text" },
  {
    key: "verdiepingCapaciteitTekst",
    label: "Verdieping — tekst bij 'Capaciteit'",
    type: "text",
  },

  // De vijf fasen staan niet meer op deze pagina, maar voeden wél de
  // fasenlijn op de richting-hubs (`getFaseItems` leest deze rij).
  { key: "fase1Titel", label: "Fase 1 — titel", type: "text" },
  { key: "fase1Tekst", label: "Fase 1 — tekst", type: "textarea" },
  { key: "fase2Titel", label: "Fase 2 — titel", type: "text" },
  { key: "fase2Tekst", label: "Fase 2 — tekst", type: "textarea" },
  { key: "fase3Titel", label: "Fase 3 — titel", type: "text" },
  { key: "fase3Tekst", label: "Fase 3 — tekst", type: "textarea" },
  { key: "fase4Titel", label: "Fase 4 — titel", type: "text" },
  { key: "fase4Tekst", label: "Fase 4 — tekst", type: "textarea" },
  { key: "fase5Titel", label: "Fase 5 — titel", type: "text" },
  { key: "fase5Tekst", label: "Fase 5 — tekst", type: "textarea" },
  { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  heroTitleStart: "Mensen die meebouwen, of ",
  heroAccent: "een dienst met vaste scope",
  heroTitleEnd: ".",
  heroLead:
    "Onze basis is capaciteit: consultants die in jouw team meebouwen aan Mendix en AI. Wil je eerst richting, snelheid of een fundering, dan hebben we daar afgebakende diensten voor, met een vaste scope en een prijs vooraf.",

  heroKicker: "Diensten",
  kaartInstap: "Instap",
  kaartMeer: "Meer over deze dienst →",
  basisKicker: "Onze basisdienstverlening · doorlopend",
  basisTitel: "Consultant inhuren",
  basisTekst:
    "Waar de meeste van onze samenwerkingen beginnen en eindigen: een consultant die naast je team komt staan en meebouwt. Aan een Mendix-applicatie, aan AI in je processen, of aan allebei, want in de praktijk loopt dat door elkaar heen. Heb je op dat niveau iemand nodig die de richting bewaakt, dan schuift er een strategisch adviseur aan. Je huurt geen uren in, je haalt iemand binnen die je landschap leert kennen en kennis achterlaat.",
  basisRol1Label: "Mendix",
  basisRol1Naam: "Developer & lead",
  basisRol1Tekst: "Bouwt mee in je bestaande teams of zet er een op.",
  basisRol2Label: "AI",
  basisRol2Naam: "AI-engineer",
  basisRol2Tekst: "Van pilot naar productie, binnen jouw kaders.",
  basisRol3Label: "Business",
  basisRol3Naam: "Analist & product owner",
  basisRol3Tekst: "Vertaalt het proces naar wat er gebouwd moet worden.",
  basisRol4Label: "Strategie",
  basisRol4Naam: "Strategisch adviseur",
  basisRol4Tekst: "Bewaakt richting, portfolio en businesscase.",
  basisPersoonRol: "Jouw aanspreekpunt",
  basisPersoonTekst: "Je maakt vooraf kennis met de persoon zelf, niet met een cv uit een bestand.",
  basisInzetLabel: "Inzet",
  basisInzetWaarde: "Vanaf één dag per week",
  basisPunt1: "Detachering of projectbasis, zonder minimumtermijn van een jaar",
  basisPunt2: "Vaste consultants, geen wisselende gezichten",
  basisPunt3: "Kennisoverdracht is onderdeel van de opdracht",
  basisPunt4: "Tarief stemmen we af op rol, seniority en inzet",
  basisCta: "Bespreek je capaciteitsvraag",
  basisCtaAlt: "Bekijk wie er bij ons werken →",

  instapKicker: "Begin hier",
  instapTitel: "Of begin met één dag",
  instapIntro:
    "Wil je liever eerst zien wat het oplevert voordat je mensen inhuurt? Dan starten we met een dag. Aan het eind ligt er iets werkends waar je intern mee verder kunt, zonder vervolgverplichting.",

  verdiepingKicker: "Verder in het traject",
  verdiepingTitel: "Zes diensten voor als je al onderweg bent",
  verdiepingIntro:
    "Niet nodig om nu te kiezen: ze komen meestal pas aan de orde als de eerste app draait of het team groeit. Voor de volledigheid staan ze hier wel.",
  verdiepingRichtingTekst: "Voor als je al bouwt en wilt weten of je de goede kant op schaalt.",
  verdiepingCapaciteitTekst:
    "Als je van één app naar een portfolio wilt en je eigen mensen het moeten dragen.",

  fase1Titel: "De strategische basis",
  fase1Tekst:
    "IT-strategie sluit nog niet aan op de bedrijfsdoelen. Er is ambitie maar geen richting.",
  fase2Titel: "Van visie naar eerste resultaten",
  fase2Tekst:
    "Er moet snel zichtbare waarde komen om draagvlak te krijgen. Het team moet gaan draaien.",
  fase3Titel: "Structureren en professionaliseren",
  fase3Tekst:
    "De eerste resultaten staan. Nu moet het beheersbaar, herhaalbaar en overdraagbaar worden.",
  fase4Titel: "Schalen en innoveren",
  fase4Tekst: "Meerdere teams, meerdere business units, een groeiend portfolio aan apps en agents.",
  fase5Titel: "Continu evalueren",
  fase5Tekst: "De vraag van de CIO: wat levert het platform op, en waar zit de volgende winst?",
  ctaTitel: "Niet zeker welke dienst bij jouw vraagstuk past?",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
