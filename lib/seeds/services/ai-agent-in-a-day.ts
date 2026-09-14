import type { Service } from "@/lib/services";

export const AI_AGENT_IN_A_DAY: Service = {
  slug: "ai-agent-in-a-day",
  naam: "AI Agent in a Day",
  familie: "doen",
  richting: "ai",
  fase: 2,
  pitch: "Iedereen brengt één echte taak mee en gaat naar huis met een agent die die taak doet.",
  beschrijving:
    "Geen presentatie over de mogelijkheden, maar een dag waarin je team het zelf doet. Iedereen brengt één echte taak uit het eigen werk mee. Aan het eind van de dag heeft ieder teamlid daar een werkende agent voor gebouwd, en weet hij ook waar het misgaat en hoe je dat afvangt. We sluiten af met afspraken die het team zelf opstelt over wat er wel en niet met bedrijfsgegevens mag. Maximaal twaalf deelnemers, zodat iedereen echt aan de slag komt.",
  doelgroep: "Teams die het werk uitvoeren: operations, service, finance, marketing, engineering.",
  duur: "Eén dag",
  groepsgrootte: "Maximaal twaalf deelnemers",
  prijzen: [{ label: "€ 5.500 – 7.500", variant: "exclusief licenties" }],
  resultaten: [
    "Per deelnemer minstens één werkende agent voor een eigen taak",
    "Werkafspraken over gegevensgebruik, opgesteld door het team zelf",
    "Een lijst van kansen die groter zijn dan één individuele taak",
  ],
  volgendeStap:
    "AI Opportunity Scan om de grotere kansen te prioriteren, of direct een proef op één proces.",
  ctaLabel: "Vraag een datum aan",
  ctaType: "datum",
  volgorde: 2,

  kop: "Iedereen gaat naar huis met een agent die zijn eigen taak doet.",
  lead: "Eén dag, één echte taak per deelnemer. Aan het eind draait er voor iedereen een werkende agent, op jullie eigen documenten, systemen en werkwijze.",
  feiten: [
    { label: "Duur", waarde: "Eén dag · 09:00–17:00" },
    { label: "Deelnemers", waarde: "Maximaal twaalf" },
    { label: "Locatie", waarde: "Bij jou of bij ons" },
  ],
  prijsToelichting: "Exclusief licenties. Vaste prijs, ongeacht het aantal deelnemers tot twaalf.",
  boekPunten: [
    "Twee begeleiders: een AI-engineer en een facilitator",
    "Een werkende agent per deelnemer",
    "Advies over wat wél en niet geschikt is voor een agent",
  ],
  herkenIntro:
    "Voor teams die AI vooral kennen van demo's en nieuwsbrieven, en willen weten wat het met hún werk doet. Geen developers nodig.",
  herken: [
    "Iedereen praat over AI, maar niemand hier heeft het ooit op ons eigen werk losgelaten.",
    "We hebben licenties gekocht en niemand gebruikt ze.",
    "Ik weet niet welke taken hiervoor geschikt zijn en welke niet.",
  ],
  meeneemtTitel: "Twaalf agents die morgen al werk schelen",
  meeneemt: [
    {
      icon: "bot",
      titel: "Een werkende agent per deelnemer",
      tekst: "Op een echte taak uit het eigen werk, met echte documenten en data.",
    },
    {
      icon: "scan-search",
      titel: "Een lijst met kansrijke taken",
      tekst: "Uit de dag rolt vanzelf een langere lijst dan de twaalf die je die dag doet.",
    },
    {
      icon: "shield-check",
      titel: "De grens tussen geschikt en ongeschikt",
      tekst: "Waar AI helpt, waar het risico geeft, en waar een mens moet blijven beslissen.",
    },
    {
      icon: "book-open",
      titel: "Prompt- en werkafspraken",
      tekst:
        "Vastgelegd, zodat wat werkt gedeeld kan worden in plaats van in iemands hoofd te blijven.",
    },
    {
      icon: "route",
      titel: "Advies over de volgende stap",
      tekst: "Van losse agents naar iets dat structureel in je processen zit.",
    },
  ],
  meeneemtFoto: "/assets/photos/team-overleg-scherm.webp",
  dagLabel: "De dag zelf",
  dagTitel: "Van eigen taak naar werkende agent",
  dagIntro:
    "Kort uitleggen, lang doen. Na de eerste ronde bouwt iedereen zijn eigen agent, wij lopen rond.",
  dagSlots: [
    {
      tijd: "09:00",
      titel: "Wat is een agent eigenlijk",
      tekst: "Twintig minuten uitleg, en meteen een levend voorbeeld op jullie eigen situatie.",
    },
    {
      tijd: "09:45",
      titel: "Taken kiezen",
      tekst:
        "Iedereen legt een echte taak op tafel. Samen kiezen we per persoon de meest kansrijke.",
    },
    {
      tijd: "10:30",
      titel: "Bouwen, ronde één",
      tekst: "De eerste agent draait. Rommelig, maar hij doet iets.",
    },
    {
      tijd: "12:30",
      titel: "Demo en kritiek",
      tekst: "Iedereen laat zien wat er staat. Wat niet klopt, gaat de middag in.",
    },
    {
      tijd: "13:15",
      titel: "Bouwen, ronde twee",
      tekst: "Verfijnen: context, bronnen, controlestappen, wanneer een mens meekijkt.",
    },
    {
      tijd: "15:00",
      titel: "Grenzen verkennen",
      tekst:
        "We laten ook zien waar het misgaat: hallucinaties, AVG, dingen die je niet moet automatiseren.",
    },
    {
      tijd: "16:00",
      titel: "Delen",
      tekst:
        "Wat werkt gaat in een gedeelde bibliotheek, zodat de rest van de organisatie erop verder kan.",
    },
    {
      tijd: "16:40",
      titel: "Vervolgstappen",
      tekst: "Wat is er nodig om dit structureel te maken, en wat kost dat ongeveer.",
    },
  ],
  voorbereidingIntro:
    "Voorbereiding is licht, maar niet nul: hoe scherper de taken vooraf, hoe verder je die dag komt.",
  wijZorgen: [
    "Een AI-engineer en een facilitator, de hele dag aanwezig",
    "Een werkomgeving met de benodigde AI-tooling, klaar voor gebruik",
    "Een korte voorbereidingsopdracht voor de deelnemers",
    "De gedeelde bibliotheek met alles wat die dag gemaakt is",
  ],
  jijZorgt: [
    "Zes tot twaalf deelnemers die hun eigen werk goed kennen",
    "Per deelnemer één taak die tijd kost en zich herhaalt",
    "Voorbeelddocumenten of data waar de agents mee mogen werken",
    "Duidelijkheid over wat wel en niet in een AI-tool mag, of de bereidheid dat die dag te bepalen",
  ],
  daarnaIntro: "Twaalf agents is een start, geen strategie. Dit zijn de logische vervolgen.",
  vervolg: [
    {
      slug: "ai-opportunity-scan",
      reden: "Waar levert AI bij jullie echt geld op, en waar niet.",
    },
    {
      slug: "ai-strategie",
      reden:
        "Verandert AI je verdienmodel of alleen je kosten? Die vraag hoort in de directiekamer.",
    },
  ],
  faqTitel: "Wat deelnemers vooraf vragen",
  faq: [
    {
      vraag: "Moeten deelnemers technisch zijn?",
      antwoord:
        "Nee. De meest waardevolle deelnemers zijn mensen die hun proces goed kennen. Bouwen doen we samen.",
    },
    {
      vraag: "Werken de agents met onze eigen data?",
      antwoord:
        "Ja, met de documenten en data die je die dag beschikbaar stelt. Wat er wel en niet in mag, spreken we vooraf af.",
    },
    {
      vraag: "Is dit AVG-proof?",
      antwoord:
        "We werken standaard binnen een omgeving waarin je data niet gebruikt wordt voor training. Bij gevoelige data kiezen we vooraf de juiste opzet.",
    },
    {
      vraag: "Blijven de agents na de dag werken?",
      antwoord:
        "Ja, binnen je eigen omgeving. Voor structureel gebruik met beheer en toegangsrechten is een vervolgstap nodig.",
    },
    {
      vraag: "Kan dit ook met Mendix-apps?",
      antwoord:
        "Ja. Dan is App in a Day waarschijnlijk het betere startpunt, of we combineren beide.",
    },
  ],
  ctaTitel: "Eén dag, twaalf mensen, twaalf werkende agents.",
};
