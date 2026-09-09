/**
 * Conditionele vervolgvragen per dienst op het contactformulier. Bewust géén
 * CMS-content: dit is formulierlogica met validatieconsequenties, geen
 * marketingtekst. Gebruikt door zowel de clientcomponent (welke velden tonen)
 * als de server action (welke velden valideren) — daarom pure data zonder
 * `server-only`.
 */

/**
 * Toegestane waarden voor `?type=` en het verborgen type-veld. Eén bron voor de
 * pagina (die de queryparameter filtert) en de server action (die het formulier
 * valideert) — anders is de whitelist client-side te omzeilen.
 */
export const CONTACT_TYPES = ["gesprek", "dienstaanvraag", "sectorrapport", "kennismaking"];

export type VraagKey =
  | "claudeToegang"
  | "mendixOmgeving"
  | "procesInGedachten"
  | "beslisserAanwezig"
  | "appsInProductie"
  | "teamsOpPlatform";

export interface ServiceVraag {
  key: VraagKey;
  name: string;
  label: string;
  type: "radio" | "text" | "textarea";
  opties?: string[];
  help?: string;
  maxLengte?: number;
}

export const SERVICE_VRAGEN: Record<VraagKey, ServiceVraag> = {
  claudeToegang: {
    key: "claudeToegang",
    name: "claudeToegang",
    label: "Heeft de groep al toegang tot Claude?",
    type: "radio",
    opties: ["Ja", "Nee", "Weet ik niet"],
    help: "Bepaalt of wij licenties moeten regelen, en dus de levertijd.",
  },
  mendixOmgeving: {
    key: "mendixOmgeving",
    name: "mendixOmgeving",
    label: "Is er al een Mendix-omgeving?",
    type: "radio",
    opties: ["Ja", "Nee", "Weet ik niet"],
  },
  procesInGedachten: {
    key: "procesInGedachten",
    name: "procesInGedachten",
    label: "Welk proces heb je in gedachten?",
    type: "textarea",
    help: "Eén afgebakend proces is de belangrijkste voorwaarde voor een geslaagde dag.",
    maxLengte: 1000,
  },
  beslisserAanwezig: {
    key: "beslisserAanwezig",
    name: "beslisserAanwezig",
    label: "Is de eindverantwoordelijke bij de sessie aanwezig?",
    type: "radio",
    opties: ["Ja", "Nee", "Nog niet zeker"],
    help: "Zo niet, dan is dit een gesprek en geen workshop.",
  },
  appsInProductie: {
    key: "appsInProductie",
    name: "appsInProductie",
    label: "Hoeveel apps staan er in productie?",
    type: "text",
    maxLengte: 100,
  },
  teamsOpPlatform: {
    key: "teamsOpPlatform",
    name: "teamsOpPlatform",
    label: "Hoeveel teams bouwen erop?",
    type: "text",
    help: "Bepaalt of je in fase 2 of fase 3 zit, en dus welke dienst passend is.",
    maxLengte: 100,
  },
};

export const VRAGEN_PER_SERVICE: Record<string, VraagKey[]> = {
  "app-in-a-day": ["mendixOmgeving", "procesInGedachten"],
  "ai-agent-in-a-day": ["claudeToegang"],
  "ai-strategie": ["beslisserAanwezig"],
  "mendix-scale-sessie": ["appsInProductie", "teamsOpPlatform"],
  "consultant-inhuren": ["appsInProductie", "teamsOpPlatform"],
};
