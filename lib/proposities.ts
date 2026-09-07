/**
 * De vier proposities (probleem-eerst) uit de strategie 2026-2027.
 * Diensten (Mendix/AI/Strategie) zijn het middel; proposities beschrijven het
 * klantvraagstuk dat we oplossen. Verschijnen als PMC op de sectorpagina's.
 * Dit is de lib-fallback; de CMS (cms_proposities) wint wanneer aanwezig.
 */

export interface Propositie {
  slug: string;
  nummer: number;
  titel: string;
  belofte: string;
  wat: string[];
  hoe: string[];
  onderscheid: string[];
  solutions: string[];
}

export const PROPOSITIES: Propositie[] = [
  {
    slug: "strategie-naar-oplossing",
    nummer: 1,
    titel: "Van strategische ambitie naar werkende oplossing",
    belofte: "Van businessstrategie naar een concreet, uitvoerbaar plan in 3 dagen.",
    wat: [
      "Praktisch, toepasbaar rapport met directe implementatie",
      "Eerste resultaat binnen dagen zichtbaar",
      "Direct afgestemd met de relevante stakeholders",
      "Een helder plan voor de komende 2 jaar",
    ],
    hoe: [
      "Strategische sessies om het probleem scherp te krijgen",
      "Delivery-model opzetten en aanscherpen",
      "Selectie van één concrete use case",
      "Direct bouwen met Mendix + AI",
      "Itereren richting livegang",
    ],
    onderscheid: [
      "Samensmelting van strategie én development",
      "Gerichte trajecten die direct waarde toevoegen",
      "Direct tastbare waarde",
    ],
    solutions: [
      "Strategisch plan voor 2 jaar",
      "Proof-of-Value / App-in-a-day",
      "Roadmap opstellen",
      "Schaalbaar delivery-model",
    ],
  },
  {
    slug: "processen-automatiseren-met-ai",
    nummer: 2,
    titel: "Wij automatiseren jouw processen met AI",
    belofte: "Binnen 6 weken een geautomatiseerd proces dat daadwerkelijk gebruikt wordt.",
    wat: [
      "Handmatig werk geautomatiseerd door AI",
      "Beslissingen ondersteund of overgenomen door AI",
      "Processen sneller en consistenter",
    ],
    hoe: [
      "Analyse van het proces en de bottlenecks",
      "Workflow-applicatie",
      "AI-integratie (documentherkenning, decisioning, agents)",
      "Koppeling met bestaande systemen",
    ],
    onderscheid: [
      "AI daadwerkelijk laten werken in processen",
      "Directe impact op de operatie",
      "Combinatie van AI + proces + adoptie",
    ],
    solutions: [
      "Planningsapplicatie",
      "Automatiseren van klantcontact",
      "AI-documentverwerking, decision support & AI-agents in processen",
      "Workflow-automatisering",
    ],
  },
  {
    slug: "it-landschap-moderniseren",
    nummer: 3,
    titel: "Moderniseren van jouw IT-landschap",
    belofte: "Maak je IT-landschap binnen 8 weken wendbaar — zonder vervangingen.",
    wat: [
      "Legacy-systemen blijven bestaan, geen volledige nieuwbouw",
      "Nieuwe functionaliteit on-top-of-legacy",
      "Eerste resultaat binnen 2 weken zichtbaar",
      "Eerste deliverable binnen 8 weken",
    ],
    hoe: [
      "Mendix als regielaag",
      "Integraties met bronsystemen (API's)",
      "Proceslaag over de systemen heen",
      "Data ontsluiten en een specifiek proces digitaliseren",
    ],
    onderscheid: [
      "Geen dure vervangingstrajecten",
      "Snelle time-to-market",
      "Flexibiliteit zonder risico",
    ],
    solutions: ["Mendix-on-top-of-ERP"],
  },
  {
    slug: "adoptie-en-change",
    nummer: 4,
    titel: "Adoptie & change binnen jouw business en operatie",
    belofte: "Wij zorgen dat oplossingen daadwerkelijk gebruikt worden.",
    wat: [
      "We ontwikkelen samen met de business",
      "Training & begeleiding als integraal onderdeel",
      "We meten het gebruik",
    ],
    hoe: [
      "Co-creatie met eindgebruikers",
      "Training & onboarding",
      "Continue feedback loops",
      "Optimaliseren na livegang",
    ],
    onderscheid: [
      "Concurrenten stoppen bij oplevering",
      "Resultaatverantwoordelijkheid",
      "Focus op impact",
    ],
    solutions: ["Adoptietraject eindgebruikers", "Training & enablement"],
  },
];

/** Opties voor de sector-koppeling (slug + titel) in het CMS. */
export function propositieOpties(): { slug: string; titel: string; nummer: number }[] {
  return PROPOSITIES.map((p) => ({ slug: p.slug, titel: p.titel, nummer: p.nummer }));
}
