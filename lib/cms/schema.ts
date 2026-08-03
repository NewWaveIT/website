// Veldschema's per contenttype. Sturen de admin-editor (nette velden i.p.v.
// rauwe JSON) én het samenstellen van het `data`-JSONB bij opslaan.
// Pure data — importeerbaar vanuit zowel client (editor) als server (actie).

import type { ContentType } from "./content";

export type FieldType =
  | "text"
  | "textarea"
  | "markdown"
  | "number"
  | "date"
  | "image"
  | "list" // array van tekst (herhaalbaar)
  | "group" // vast object met subvelden
  | "items" // herhaalbare kaarten (array van objecten)
  | "icon" // visuele iconkeuze (lucide-naam)
  | "select" // vaste keuze uit opties (chips)
  | "author" // keuze uit teamleden (naam + foto)
  | "richtext" // volledige opmaak (koppen, beeld, quote)
  | "richtext-lite" // lichte opmaak (vet/cursief/link/lijst)
  | "proposities"; // meervoudige keuze van proposities (PMC-koppeling op sectoren)

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
  /** subvelden voor 'group' en 'items' */
  of?: FieldDef[];
  /** enkelvoudig label voor 'items' (bv. "Resultaat") */
  itemLabel?: string;
  /** keuzemogelijkheden voor 'icon' en 'select' */
  options?: string[];
  /** verplicht veld (client + server gevalideerd) */
  required?: boolean;
  /** date-veld: standaard op vandaag bij een nieuw item */
  defaultToday?: boolean;
  /** 'side' plaatst het veld in de instellingen-rail rechts i.p.v. de contentkolom */
  panel?: "side";
}

/** true voor veldtypes waarvan de waarde JSON is (object/array) i.p.v. tekst. */
export function isStructured(t: FieldType): boolean {
  return t === "list" || t === "group" || t === "items";
}

export const FIELD_SCHEMAS: Record<ContentType, FieldDef[]> = {
  artikelen: [
    {
      key: "discipline",
      label: "Discipline",
      type: "select",
      options: ["Algemeen", "Mendix", "AI", "Strategie"],
      help: "Koppelt het artikel aan een dienst (of 'Algemeen' voor geen koppeling).",
      panel: "side",
    },
    {
      key: "sector",
      label: "Sector",
      type: "select",
      options: ["Algemeen", "Publieke sector", "Mobiliteit", "Banken", "Zorg", "Manufacturing"],
      help: "Koppelt het artikel aan een sector (of 'Algemeen').",
      panel: "side",
    },
    {
      key: "samenvatting",
      label: "Samenvatting",
      type: "textarea",
      help: "Korte intro in overzichten en meta-omschrijving.",
      panel: "side",
    },
    { key: "cover", label: "Cover-afbeelding", type: "image", panel: "side" },
    { key: "leestijd", label: "Leestijd", type: "text", placeholder: "4 min", panel: "side" },
    { key: "auteur", label: "Auteur", type: "author", panel: "side" },
    {
      key: "datum",
      label: "Publicatiedatum",
      type: "date",
      required: true,
      defaultToday: true,
      panel: "side",
    },
    {
      key: "inhoud",
      label: "Inhoud",
      type: "richtext",
      help: "Gebruik de werkbalk voor koppen, opsommingen, links en nadruk.",
    },
  ],
  cases: [
    {
      key: "sector",
      label: "Sector (filterlabel)",
      type: "text",
      placeholder: "Publieke sector",
      panel: "side",
    },
    { key: "metric", label: "Teaser-metric", type: "text", placeholder: "-60%", panel: "side" },
    { key: "cardTitel", label: "Titel op de kaart", type: "text", panel: "side" },
    {
      key: "org",
      label: "Organisatie-regel",
      type: "text",
      placeholder: "COA · Mendix + AI",
      panel: "side",
    },
    { key: "image", label: "Cover-afbeelding", type: "image", panel: "side" },
    {
      key: "tag",
      label: "Tag (detail)",
      type: "text",
      placeholder: "Publieke sector · COA",
      panel: "side",
    },
    { key: "h1", label: "Titel (detailpagina)", type: "text" },
    { key: "intro", label: "Intro", type: "textarea" },
    { key: "challenge", label: "De uitdaging", type: "richtext-lite" },
    { key: "pull", label: "Pull-quote", type: "text" },
    { key: "resultaat", label: "Het resultaat", type: "richtext-lite" },
    { key: "quote", label: "Quote", type: "textarea" },
    { key: "quoteNaam", label: "Quote — naam", type: "text" },
    { key: "quoteRol", label: "Quote — rol", type: "text" },
    {
      key: "aanpak",
      label: "De aanpak (alinea's)",
      type: "list",
      help: "Elke regel is een alinea.",
    },
    {
      key: "impact",
      label: "Impact-cijfers",
      type: "items",
      itemLabel: "Cijfer",
      of: [
        { key: "n", label: "Cijfer", type: "text" },
        { key: "l", label: "Toelichting", type: "text" },
      ],
    },
    {
      key: "aside",
      label: "Over dit project",
      type: "group",
      of: [
        { key: "sector", label: "Sector", type: "text" },
        { key: "diensten", label: "Diensten", type: "text" },
        { key: "doorlooptijd", label: "Doorlooptijd", type: "text" },
        { key: "team", label: "Team", type: "text" },
      ],
    },
  ],
  vacatures: [
    { key: "functietitel", label: "Functietitel", type: "text" },
    {
      key: "discipline",
      label: "Discipline (lijstlabel)",
      type: "text",
      placeholder: "Mendix · Senior",
      panel: "side",
    },
    {
      key: "locatie",
      label: "Locatie",
      type: "text",
      placeholder: "Utrecht / hybride",
      panel: "side",
    },
    { key: "intro", label: "Intro", type: "richtext-lite" },
    {
      key: "employmentType",
      label: "Type dienstverband",
      type: "select",
      options: ["FULL_TIME", "PART_TIME"],
      help: "Voltijd of deeltijd (wordt gebruikt voor vacature-structured data).",
      panel: "side",
    },
    { key: "gepubliceerdOp", label: "Gepubliceerd op", type: "date", panel: "side" },
    { key: "tags", label: "Tags", type: "list", help: "Bv. Mendix, Senior, Utrecht / hybride." },
    {
      key: "secties",
      label: "Secties",
      type: "items",
      itemLabel: "Sectie",
      of: [
        { key: "titel", label: "Titel", type: "text", placeholder: "Wat ga je doen?" },
        { key: "items", label: "Punten", type: "list" },
      ],
    },
    {
      key: "facts",
      label: "Feiten",
      type: "group",
      of: [
        { key: "team", label: "Team", type: "text" },
        { key: "niveau", label: "Niveau", type: "text" },
        { key: "locatie", label: "Locatie", type: "text" },
        { key: "uren", label: "Uren", type: "text" },
        { key: "salaris", label: "Salaris", type: "text" },
      ],
    },
  ],
  paginas: [
    { key: "metaTitle", label: "Meta-titel", type: "text" },
    { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
    { key: "inhoud", label: "Inhoud", type: "markdown" },
  ],
  diensten: [
    { key: "naam", label: "Naam", type: "text" },
    {
      key: "badgeIcon",
      label: "Badge-icoon",
      type: "icon",
      options: ["boxes", "brain-circuit", "route"],
      panel: "side",
    },
    {
      key: "badgeLabel",
      label: "Badge-label",
      type: "text",
      placeholder: "Mendix Premium Partner",
      panel: "side",
    },
    { key: "h1", label: "Titel (H1)", type: "text" },
    { key: "intro", label: "Intro", type: "richtext-lite" },
    { key: "ctaSecondary", label: "Tweede knop", type: "text" },
    {
      key: "kpis",
      label: "KPI's (hero)",
      type: "items",
      itemLabel: "KPI",
      of: [
        { key: "n", label: "Cijfer", type: "text" },
        { key: "l", label: "Toelichting", type: "text" },
      ],
    },
    {
      key: "vraagstukken",
      label: "Vraagstukken",
      type: "items",
      itemLabel: "Vraagstuk",
      of: [
        { key: "q", label: "Label", type: "text" },
        { key: "titel", label: "Titel", type: "text" },
        { key: "p", label: "Tekst", type: "textarea" },
      ],
    },
    { key: "pijlersIntro", label: "Intro diensten-blok", type: "textarea" },
    {
      key: "pijlers",
      label: "Pijlers",
      type: "items",
      itemLabel: "Pijler",
      of: [
        { key: "num", label: "Nummer", type: "text" },
        { key: "titel", label: "Titel", type: "text" },
        { key: "p", label: "Tekst", type: "textarea" },
        {
          key: "items",
          label: "Sub-items",
          type: "items",
          itemLabel: "Sub-item",
          of: [
            { key: "summary", label: "Kop", type: "text" },
            { key: "p", label: "Tekst", type: "textarea" },
          ],
        },
      ],
    },
    {
      key: "aanpak",
      label: "Aanpak (rijen)",
      type: "items",
      itemLabel: "Rij",
      of: [
        { key: "kicker", label: "Kicker", type: "text" },
        { key: "titel", label: "Titel", type: "text" },
        { key: "p", label: "Tekst", type: "textarea" },
        { key: "punten", label: "Punten", type: "list" },
        { key: "ph", label: "Afbeelding-bijschrift", type: "text" },
      ],
    },
    {
      key: "waarom",
      label: "Waarom wij",
      type: "items",
      itemLabel: "Reden",
      of: [
        { key: "titel", label: "Titel", type: "text" },
        { key: "p", label: "Tekst", type: "textarea" },
      ],
    },
    { key: "expertsHead", label: "Experts — kop", type: "text" },
    {
      key: "experts",
      label: "Experts",
      type: "items",
      itemLabel: "Expert",
      of: [
        { key: "img", label: "Foto", type: "image" },
        { key: "role", label: "Rol", type: "text" },
        { key: "naam", label: "Naam", type: "text" },
        { key: "tel", label: "Telefoon", type: "text" },
      ],
    },
    { key: "partners", label: "Technologiepartners", type: "list" },
    {
      key: "outcomes",
      label: "Resultaten",
      type: "items",
      itemLabel: "Resultaat",
      of: [
        { key: "n", label: "Cijfer", type: "text" },
        { key: "l", label: "Toelichting", type: "text" },
      ],
    },
    { key: "caseTitle", label: "Klantverhaal — titel", type: "text" },
    { key: "caseSector", label: "Klantverhaal — sector", type: "text" },
    { key: "caseQuote", label: "Klantverhaal — quote", type: "textarea" },
    { key: "caseNaam", label: "Klantverhaal — naam", type: "text" },
    { key: "caseRol", label: "Klantverhaal — rol", type: "text" },
    { key: "caseImage", label: "Klantverhaal — afbeelding", type: "image" },
    { key: "insightsTitle", label: "Inzichten-blok — titel", type: "text" },
    {
      key: "insights",
      label: "Inzichten",
      type: "items",
      itemLabel: "Inzicht",
      of: [
        { key: "cat", label: "Categorie", type: "text" },
        { key: "meta", label: "Meta", type: "text" },
        { key: "titel", label: "Titel", type: "text" },
      ],
    },
    { key: "ctaTitle", label: "Slot-CTA — titel", type: "text" },
  ],
  sectoren: [
    { key: "naam", label: "Naam", type: "text" },
    {
      key: "icon",
      label: "Icoon",
      type: "icon",
      options: ["building-2", "train-front", "banknote", "heart-pulse", "factory"],
      panel: "side",
    },
    {
      key: "proposities",
      label: "Proposities (PMC)",
      type: "proposities",
      panel: "side",
      help: "Welke proposities op deze sectorpagina verschijnen. Leeg = alle.",
    },
    { key: "h1", label: "Titel (H1)", type: "text" },
    { key: "intro", label: "Intro", type: "richtext-lite" },
    {
      key: "kpis",
      label: "KPI's (hero)",
      type: "items",
      itemLabel: "KPI",
      of: [
        { key: "n", label: "Cijfer", type: "text" },
        { key: "l", label: "Toelichting", type: "text" },
      ],
    },
    { key: "challengesIntro", label: "Intro businessvraagstukken", type: "textarea" },
    {
      key: "challenges",
      label: "Businessvraagstukken",
      type: "items",
      itemLabel: "Vraagstuk",
      of: [
        { key: "q", label: "Label", type: "text" },
        { key: "titel", label: "Titel", type: "text" },
        { key: "p", label: "Tekst", type: "textarea" },
      ],
    },
    {
      key: "solutions",
      label: "Oplossingen (rijen)",
      type: "items",
      itemLabel: "Rij",
      of: [
        { key: "kicker", label: "Kicker", type: "text" },
        { key: "titel", label: "Titel", type: "text" },
        { key: "p", label: "Tekst", type: "textarea" },
        { key: "punten", label: "Punten", type: "list" },
        { key: "ph", label: "Afbeelding-bijschrift", type: "text" },
      ],
    },
    {
      key: "outcomes",
      label: "Resultaten",
      type: "items",
      itemLabel: "Resultaat",
      of: [
        { key: "n", label: "Cijfer", type: "text" },
        { key: "l", label: "Toelichting", type: "text" },
      ],
    },
    { key: "caseTitle", label: "Klantverhaal — titel", type: "text" },
    { key: "caseSector", label: "Klantverhaal — sector", type: "text" },
    { key: "caseQuote", label: "Klantverhaal — quote", type: "textarea" },
    { key: "caseNaam", label: "Klantverhaal — naam", type: "text" },
    { key: "caseRol", label: "Klantverhaal — rol", type: "text" },
    { key: "caseImage", label: "Klantverhaal — afbeelding", type: "image" },
    { key: "insightsTitle", label: "Inzichten-blok — titel", type: "text" },
    {
      key: "insights",
      label: "Inzichten",
      type: "items",
      itemLabel: "Inzicht",
      of: [
        { key: "meta", label: "Meta", type: "text" },
        { key: "titel", label: "Titel", type: "text" },
      ],
    },
    { key: "ctaTitle", label: "Slot-CTA — titel", type: "text" },
  ],
  teamleden: [
    { key: "rol", label: "Rol", type: "text", placeholder: "CEO & founder", panel: "side" },
    { key: "foto", label: "Foto", type: "image", panel: "side" },
    { key: "bio", label: "Bio", type: "textarea", help: "Titel = de naam van het teamlid." },
  ],
  proposities: [
    {
      key: "nummer",
      label: "Nummer",
      type: "number",
      panel: "side",
      help: "Volgnummer (1, 2, 3, …); bepaalt de volgorde.",
    },
    {
      key: "belofte",
      label: "Belofte (één zin)",
      type: "textarea",
      help: "Korte, concrete belofte — bv. 'Binnen 8 weken een werkend proces'.",
    },
    { key: "wat", label: "Wat het betekent", type: "list", help: "Elke regel een punt." },
    { key: "hoe", label: "Hoe we dit doen", type: "list" },
    { key: "onderscheid", label: "Waarom wij hierin onderscheiden", type: "list" },
    { key: "solutions", label: "Solutions", type: "list" },
  ],
};

/** data-object → veldwaarde als string voor de invoervelden. */
export function fieldValue(data: Record<string, unknown>, f: FieldDef): string {
  const v = data[f.key];
  if (v === undefined || v === null) return "";
  return typeof v === "string" ? v : String(v);
}

/** Overige data-sleutels die niet in de gegeven velden zitten (voor de JSON-uitklap). */
export function extraData(
  fields: FieldDef[],
  data: Record<string, unknown>,
): Record<string, unknown> {
  const known = new Set(fields.map((f) => f.key));
  const rest: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (!known.has(k)) rest[k] = v;
  }
  return rest;
}
