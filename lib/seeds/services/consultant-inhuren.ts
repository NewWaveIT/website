import type { Service } from "@/lib/services";

export const CONSULTANT_INHUREN: Service = {
  // VOORZET — afgeleid uit de Fusion Team-beschrijving en de vacatureteksten
  // over wat een consultant bij TNW doet (Advanced/Expert-certificering,
  // Scrum, coachen van collega's). Geen tarieven, niveaus of doorlooptijden:
  // die levert de eigenaar aan.
  slug: "consultant-inhuren",
  naam: "Consultant of team inhuren",
  familie: "capaciteit",
  ookRelevantVoor: ["mendix"],
  fase: 3,
  pitch:
    "Een gecertificeerde Mendix-consultant die meedraait in jouw team, of een team dat een traject draagt.",
  beschrijving:
    "Soms is er geen vraagstuk om te onderzoeken, maar werk dat gedaan moet worden. Dan lever je capaciteit. Onze consultants zijn Mendix Advanced of Expert gecertificeerd en draaien mee in jullie eigen ritme en Scrum-proces, als teamlid en niet als externe partij ernaast. Ze bouwen niet alleen: ze coachen de mensen om zich heen en nemen mee wat ze bij andere opdrachtgevers hebben gezien. Eén consultant om een team te versterken, of een compleet team dat een traject draagt. Wat past, hangt af van wat er ligt.",
  doelgroep:
    "Organisaties met werk op de plank en te weinig handen, of zonder Mendix-kennis in huis.",
  duur: "In overleg",
  prijzen: [],
  resultaten: [
    "Een gecertificeerde consultant die meedraait in jullie ritme",
    "Kennisoverdracht onderweg, zodat jullie eigen mensen meegroeien",
    "Op- of afschalen in overleg",
  ],
  volgendeStap:
    "Een Fusion Team Startsprint als jullie het daarna zelf willen kunnen, of uitbreiding naar een tweede team.",
  ctaLabel: "Plan een kennismaking (20 min)",
  ctaType: "kennismaking",
  // Staat buiten de catalogus (zie BASIS_SLUG); de volgorde telt alleen nog
  // voor de keuzelijst van het contactformulier.
  volgorde: 10,
};
