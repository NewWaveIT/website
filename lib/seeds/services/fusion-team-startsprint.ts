import type { Service } from "@/lib/services";

export const FUSION_TEAM_STARTSPRINT: Service = {
  slug: "fusion-team-startsprint",
  naam: "Fusion Team Startsprint",
  familie: "capaciteit",
  richting: "mendix",
  fase: 3,
  pitch:
    "Vier weken waarin een businessexpert en onze developer samen bouwen, en de businessexpert het daarna zelf kan.",
  beschrijving:
    "Business en IT die samen bouwen in plaats van specificaties uitwisselen. Vier weken lang werken één van jullie businessexperts en één van onze ontwikkelaars samen aan een echte oplossing. Wij bouwen mee en leiden tegelijk op, zodat jullie medewerker het daarna zelf kan onderhouden en uitbreiden. Je houdt drie dingen over: een oplossing die in gebruik is, iemand die het kan, en een werkwijze die je op de volgende afdeling kunt herhalen.",
  doelgroep:
    "Organisaties die willen dat business en IT samen ontwikkelen; vaak de logische stap na App in a Day.",
  duur: "Vier weken",
  prijzen: [],
  resultaten: [
    "Een werkende oplossing in gebruik of in pilot",
    "Een medewerker die hem zelfstandig kan onderhouden en uitbreiden",
    "De werkwijze op papier: wie doet wat, en welke standaarden gelden",
  ],
  volgendeStap: "Een doorlopend fusion team, of uitbreiding naar een tweede business unit.",
  ctaLabel: "Plan een kennismaking (20 min)",
  ctaType: "kennismaking",
  volgorde: 8,

  kop: "Je businessexpert bouwt straks zelf.",
  lead: "Vier weken waarin iemand uit jouw business en onze developer samen aan één echte applicatie bouwen. Aan het eind staat de app live én kan die businessexpert zelfstandig verder.",
  feiten: [
    { label: "Duur", waarde: "Vier weken" },
    { label: "Bezetting", waarde: "Eén expert van jou, één developer van ons" },
    { label: "Uitkomst", waarde: "App live + iemand die kan bouwen" },
  ],
  prijsToelichting: "Afhankelijk van complexiteit en aantal koppelingen. Vaste prijs na de intake.",
  boekPunten: [
    "Eén Mendix-developer, vier weken naast je expert",
    "Een werkende applicatie in productie",
    "Je expert is daarna zelfstandig genoeg om door te bouwen",
  ],
  herkenIntro:
    "Voor organisaties die niet elke wijziging willen uitbesteden, maar wel snelheid nodig hebben. De klassieke fusion team-aanpak: business en IT bouwen samen.",
  herken: [
    "Voor elke kleine wijziging moeten we weer een leverancier inschakelen.",
    "Onze mensen kennen het proces beter dan welke consultant dan ook.",
    "We willen zelf kunnen bouwen, maar niemand weet waar te beginnen.",
  ],
  meeneemtTitel: "Een app in productie én een collega die het kan",
  meeneemt: [
    {
      icon: "app-window",
      titel: "Een applicatie in productie",
      tekst: "Geen oefencasus: we bouwen iets dat jullie echt nodig hebben, met echte gebruikers.",
    },
    {
      icon: "graduation-cap",
      titel: "Een businessexpert die zelfstandig bouwt",
      tekst:
        "Leren door te doen, elke dag samen aan hetzelfde scherm. Geen cursus met oefenopdrachten.",
    },
    {
      icon: "book-open",
      titel: "Werkafspraken op papier",
      tekst:
        "Hoe je wijzigingen doorvoert, test en uitrolt: het handboek voor wat er na de vier weken komt.",
    },
    {
      icon: "git-branch",
      titel: "Een ingerichte straat",
      tekst: "Omgevingen, versiebeheer en deployment staan klaar en zijn overgedragen.",
    },
    {
      icon: "compass",
      titel: "Een eerlijk beeld van het vervolg",
      tekst:
        "Wat je expert wél en niet zelf moet doen, en wanneer je er beter een developer bij haalt.",
    },
  ],
  meeneemtFoto: "/assets/photos/portret-7.webp",
  dagLabel: "De vier weken",
  dagTitel: "Elke week een stuk meer op eigen benen",
  dagIntro:
    "De verhouding verschuift bewust: week één stuurt onze developer, week vier stuurt jouw expert en kijken wij mee.",
  dagSlots: [
    {
      tijd: "Week 0",
      titel: "Intake en keuze",
      tekst: "We kiezen de applicatie en de persoon. Beide bepalen of dit slaagt.",
    },
    {
      tijd: "Week 1",
      titel: "Samen ontwerpen en starten",
      tekst: "Datamodel, schermen en de eerste werkende versie. Onze developer aan het stuur.",
    },
    {
      tijd: "Week 2",
      titel: "Samen bouwen",
      tekst: "Logica, rollen en koppelingen. Je expert bouwt mee, wij reviewen alles.",
    },
    {
      tijd: "Week 3",
      titel: "Omdraaien",
      tekst: "Je expert bouwt, wij kijken mee en grijpen alleen in waar het echt moet.",
    },
    {
      tijd: "Week 4",
      titel: "Live en overdragen",
      tekst: "Testen met gebruikers, naar productie, werkafspraken vastleggen.",
    },
    {
      tijd: "Week 6",
      titel: "Terugkomdag",
      tekst: "Twee weken later: hoe gaat het zelfstandig, en waar loop je vast?",
    },
  ],
  voorbereidingIntro:
    "Deze sprint valt of staat bij de persoon die je vrijmaakt. Liever iemand met procesverstand en nieuwsgierigheid dan iemand die toevallig tijd heeft.",
  wijZorgen: [
    "Eén ervaren Mendix-developer, vier weken beschikbaar voor jullie",
    "Een ingerichte omgeving met versiebeheer en deploymentstraat",
    "Reviews en werkafspraken die na de sprint blijven gelden",
    "Een terugkomdag twee weken na oplevering",
  ],
  jijZorgt: [
    "Eén businessexpert die minimaal drie dagen per week vrij is; geen halve inzet",
    "Een applicatie die echt nodig is en binnen vier weken haalbaar",
    "Toegang tot de systemen waarmee gekoppeld moet worden",
    "Een opdrachtgever die knopen doorhakt als de scope onder druk komt",
  ],
  daarnaIntro:
    "Na de sprint kan je expert door. De vraag wordt dan: hoe houd je dat vol, en hoe voorkom je dat app twee weer van nul begint.",
  vervolg: [
    {
      slug: "training-enablement",
      reden: "Verdieping voor je expert en de collega's die willen volgen.",
    },
    {
      slug: "mendix-scale-sessie",
      reden: "Meerdere teams? Dan is de vraag hoe je schaalt zonder chaos.",
    },
  ],
  faqTitel: "Wat opdrachtgevers vooraf vragen",
  faq: [
    {
      vraag: "Wat als onze expert het niet blijkt te kunnen?",
      antwoord:
        "Dat merken we in week één en dan zeggen we het meteen. Soms is de conclusie dat een andere collega beter past. Wisselen kan in de eerste week.",
    },
    {
      vraag: "Is vier weken genoeg om te leren bouwen?",
      antwoord:
        "Genoeg om zelfstandig te onderhouden en uit te breiden, niet om architect te worden. We zijn daar eerlijk over in de intake.",
    },
    {
      vraag: "Moet de expert kunnen programmeren?",
      antwoord:
        "Nee. Procesverstand en zin om te leren wegen zwaarder. Mendix is low-code, maar denken in data en logica moet je wel leuk vinden.",
    },
    {
      vraag: "Hebben we Mendix-licenties nodig?",
      antwoord:
        "Ja, voor productie wel. We adviseren over het licentiemodel dat bij jullie omvang past.",
    },
    {
      vraag: "Kan de sprint ook met twee eigen mensen?",
      antwoord:
        "Kan, tegen meerkosten. Onze ervaring is dat één persoon die er echt tijd voor heeft, meer oplevert dan twee die het erbij doen.",
    },
  ],
  ctaTitel: "Vier weken, en je hebt iemand in huis die kan bouwen.",
};
