import type { Service } from "@/lib/services";

export const FOUNDATION_STARTERKIT: Service = {
  slug: "foundation-starterkit",
  naam: "Foundation Starterkit",
  familie: "capaciteit",
  // Geen eigen richting: de fundering geldt voor het hele low-code- en
  // AI-landschap, en het ontwerp labelt hem dan ook als "Mendix · AI". Met een
  // eigen richting zou hij de Fusion Team Startsprint uit het Mendix-vak
  // verdringen, want daar past er maar één per niveau.
  ookRelevantVoor: ["mendix", "ai"],
  fase: 3,
  pitch: "De gedeelde fundering waardoor app nummer twee de helft kost van app nummer één.",
  beschrijving:
    "Koppelingen, security, deploymentstraat en herbruikbare componenten: de laag onder je applicatielandschap die je normaal per app opnieuw bouwt. Wij zetten hem één keer goed neer, aan de hand van een echte applicatie zodat alles in de praktijk bewezen is. Daarna landt elke volgende app erop: sneller, en met een securityreview die je maar één keer hoeft te doen.",
  doelgroep:
    "Organisaties met één of meer apps live, die merken dat elke volgende app weer bij nul begint.",
  duur: "Drie tot vier weken",
  prijzen: [],
  resultaten: [
    "Een referentiearchitectuur op jouw landschap",
    "Werkende koppelingen, deploymentstraat en componentbibliotheek",
    "Documentatie en werkafspraken waarmee een nieuw team binnen een week meedraait",
  ],
  volgendeStap:
    "Een Fusion Team Startsprint zodat je eigen mensen op de nieuwe fundering leren bouwen.",
  ctaLabel: "Plan een kennismaking (20 min)",
  ctaType: "kennismaking",
  volgorde: 7,

  kop: "Zorg dat app nummer twee de helft kost van app nummer één.",
  lead: "De gedeelde fundering onder je applicatielandschap: koppelingen, security, deploymentstraat en herbruikbare componenten. Eén keer goed neerzetten, daarna profiteert elke app ervan.",
  feiten: [
    { label: "Duur", waarde: "Drie tot vier weken" },
    { label: "Bezetting", waarde: "Architect en developer" },
    { label: "Uitkomst", waarde: "Werkende fundering + documentatie" },
  ],
  prijsToelichting: "Afhankelijk van het aantal koppelingen. Vaste prijs na de architectuurintake.",
  boekPunten: [
    "Referentiearchitectuur op jouw landschap",
    "Deploymentstraat en omgevingen ingericht",
    "Herbruikbare componenten en documentatie",
  ],
  herkenIntro:
    "Voor organisaties met één of meer apps live, die merken dat elke volgende app weer bij nul begint.",
  herken: [
    "Elke app heeft zijn eigen manier om in te loggen en te koppelen.",
    "De eerste app was snel klaar, de vijfde duurt langer dan de eerste.",
    "Onze securityafdeling wil bij elke app opnieuw een volledige review.",
  ],
  meeneemtTitel: "Een fundering waar elke volgende app op landt",
  meeneemt: [
    {
      icon: "plug",
      titel: "Werkende koppelingen als herbruikbare service",
      tekst: "Eén keer gebouwd naar je kernsystemen, daarna aanroepen in plaats van opnieuw maken.",
    },
    {
      icon: "lock",
      titel: "Authenticatie en autorisatie centraal",
      tekst: "Eén patroon voor inloggen en rechten, dat security in één keer goedkeurt.",
    },
    {
      icon: "git-merge",
      titel: "Een deploymentstraat",
      tekst:
        "Omgevingen, versiebeheer en geautomatiseerde uitrol, met de checks erin en niet in een overleg.",
    },
    {
      icon: "boxes",
      titel: "Een componentbibliotheek",
      tekst: "De schermen en patronen die je steeds opnieuw bouwt, één keer goed en gedeeld.",
    },
    {
      icon: "file-text",
      titel: "Documentatie en werkafspraken",
      tekst: "Zodat een nieuw team of een nieuwe leverancier binnen een week meedraait.",
    },
  ],
  meeneemtFoto: "/assets/photos/overleg-laptop.webp",
  dagLabel: "De weken",
  dagTitel: "Van architectuur naar werkende fundering",
  dagIntro:
    "We bouwen de fundering aan de hand van één echte applicatie, zodat alles wat we opleveren in de praktijk bewezen is.",
  dagSlots: [
    {
      tijd: "Week 0",
      titel: "Architectuurintake",
      tekst: "We kijken naar je landschap, je kernsystemen en de eisen van security.",
    },
    {
      tijd: "Week 1",
      titel: "Referentiearchitectuur",
      tekst: "De keuzes op papier en afgestemd met architectuur en security, voordat we bouwen.",
    },
    {
      tijd: "Week 2",
      titel: "Koppelingen en security",
      tekst:
        "De eerste koppelingen live als herbruikbare service, inclusief het autorisatiepatroon.",
    },
    {
      tijd: "Week 3",
      titel: "Straat en componenten",
      tekst: "Deployment geautomatiseerd, de eerste gedeelde componenten in de bibliotheek.",
    },
    {
      tijd: "Week 4",
      titel: "Bewijzen en overdragen",
      tekst:
        "We bouwen een kleine app op de fundering om te laten zien dat het werkt, en dragen over.",
    },
  ],
  voorbereidingIntro:
    "Deze opdracht raakt architectuur en security. Hoe eerder die aan tafel zitten, hoe minder herwerk aan het eind.",
  wijZorgen: [
    "Een architect en een developer met ervaring in vergelijkbare landschappen",
    "Een referentiearchitectuur toegespitst op jouw situatie",
    "Werkende koppelingen, straat en componentbibliotheek",
    "Documentatie en een overdrachtssessie met je eigen team",
  ],
  jijZorgt: [
    "Toegang tot de kernsystemen waarmee gekoppeld moet worden, inclusief testomgevingen",
    "Je architect en iemand van security aan tafel in week nul en week één",
    "Een eerstvolgende applicatie die op de fundering mag landen",
    "Een beslisser voor de keuzes die architectuur raken",
  ],
  daarnaIntro: "Met de fundering op zijn plek gaat de vraag over tempo en mensen.",
  vervolg: [
    {
      slug: "fusion-team-startsprint",
      reden: "Eigen mensen die op de nieuwe fundering leren bouwen.",
    },
    {
      slug: "mendix-scale-sessie",
      reden: "Meer teams erbij? Dan is governance de volgende vraag.",
    },
    {
      slug: "training-enablement",
      reden: "Je bestaande developers meenemen in de nieuwe standaarden.",
    },
  ],
  faqTitel: "Wat architecten en opdrachtgevers vragen",
  faq: [
    {
      vraag: "Is dit niet iets wat we zelf kunnen?",
      antwoord:
        "Vaak wel, technisch. Wat meestal ontbreekt is de tijd en het overzicht om het naast de lopende bouw te doen. Daar zit onze toegevoegde waarde.",
    },
    {
      vraag: "Werkt dit ook als we meerdere leveranciers hebben?",
      antwoord:
        "Juist dan. De fundering is de plek waar je afspraken vastlegt die voor iedereen gelden.",
    },
    {
      vraag: "Wat als onze security-eisen streng zijn?",
      antwoord:
        "Dat is eerder een voordeel: we betrekken security vanaf week nul, zodat de fundering meteen goedgekeurd is in plaats van achteraf.",
    },
    {
      vraag: "Geldt dit alleen voor Mendix?",
      antwoord:
        "Nee. De koppelingen, security en straat gelden voor je hele low-code- en AI-landschap.",
    },
    {
      vraag: "Kost app twee dan echt de helft?",
      antwoord:
        "Bij vergelijkbare complexiteit is dat de orde van grootte die we in de praktijk zien. We doen geen belofte zonder je landschap gezien te hebben.",
    },
  ],
  ctaTitel: "Eén keer fundering, daarna profiteert elke app.",
};
