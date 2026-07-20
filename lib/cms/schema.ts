// Veldschema's per contenttype. Sturen de admin-editor (nette velden i.p.v.
// rauwe JSON) én het samenstellen van het `data`-JSONB bij opslaan.
// Pure data — importeerbaar vanuit zowel client (editor) als server (actie).

import type { ContentType } from "./content";

export type FieldType = "text" | "textarea" | "markdown" | "number" | "date";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
}

export const FIELD_SCHEMAS: Record<ContentType, FieldDef[]> = {
  artikelen: [
    { key: "categorie", label: "Categorie", type: "text", placeholder: "Publieke sector" },
    { key: "samenvatting", label: "Samenvatting", type: "textarea", help: "Korte intro in overzichten en meta-omschrijving." },
    { key: "cover", label: "Cover-afbeelding (pad)", type: "text", placeholder: "/assets/photos/klantgesprek-tafel.png" },
    { key: "leestijd", label: "Leestijd", type: "text", placeholder: "4 min" },
    { key: "auteur", label: "Auteur", type: "text", placeholder: "Koen Wijsman" },
    { key: "datum", label: "Publicatiedatum", type: "date" },
    { key: "inhoud", label: "Inhoud (Markdown)", type: "markdown", help: "Alinea's gescheiden door een lege regel." },
  ],
  cases: [
    { key: "sector", label: "Sector (filterlabel)", type: "text", placeholder: "Publieke sector" },
    { key: "metric", label: "Teaser-metric", type: "text", placeholder: "-60%" },
    { key: "cardTitel", label: "Titel op de kaart", type: "text" },
    { key: "org", label: "Organisatie-regel", type: "text", placeholder: "COA · Mendix + AI" },
    { key: "image", label: "Cover-afbeelding (pad)", type: "text", placeholder: "/assets/photos/..." },
    { key: "tag", label: "Tag (detail)", type: "text", placeholder: "Publieke sector · COA" },
    { key: "h1", label: "Titel (detailpagina)", type: "text" },
    { key: "intro", label: "Intro", type: "textarea" },
    { key: "challenge", label: "De uitdaging", type: "textarea" },
    { key: "pull", label: "Pull-quote", type: "text" },
    { key: "resultaat", label: "Het resultaat", type: "textarea" },
    { key: "quote", label: "Quote", type: "textarea" },
    { key: "quoteNaam", label: "Quote — naam", type: "text" },
    { key: "quoteRol", label: "Quote — rol", type: "text" },
    { key: "aanpak", label: "De aanpak (één alinea per regel)", type: "markdown", help: "Elke lege-regel-gescheiden alinea wordt een paragraaf." },
  ],
  vacatures: [
    { key: "functietitel", label: "Functietitel", type: "text" },
    { key: "discipline", label: "Discipline (lijstlabel)", type: "text", placeholder: "Mendix · Senior" },
    { key: "locatie", label: "Locatie", type: "text", placeholder: "Utrecht / hybride" },
    { key: "intro", label: "Intro", type: "textarea" },
    { key: "employmentType", label: "Dienstverband (schema.org)", type: "text", placeholder: "FULL_TIME" },
    { key: "gepubliceerdOp", label: "Gepubliceerd op", type: "date" },
  ],
  paginas: [
    { key: "metaTitle", label: "Meta-titel", type: "text" },
    { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
    { key: "inhoud", label: "Inhoud (Markdown)", type: "markdown" },
  ],
  diensten: [
    { key: "badgeLabel", label: "Badge-label", type: "text", placeholder: "Mendix Premium Partner" },
    { key: "h1", label: "Titel (H1)", type: "text" },
    { key: "intro", label: "Intro", type: "textarea" },
    { key: "ctaTitle", label: "CTA-titel", type: "text" },
    { key: "insightsTitle", label: "Titel inzichten-blok", type: "text", help: "Rijke onderdelen (kpis, pijlers, aanpak, experts…) via 'Overige velden (JSON)'." },
  ],
  sectoren: [
    { key: "h1", label: "Titel (H1)", type: "text" },
    { key: "intro", label: "Intro", type: "textarea" },
    { key: "challengesIntro", label: "Intro businessvraagstukken", type: "textarea" },
    { key: "ctaTitle", label: "CTA-titel", type: "text" },
    { key: "insightsTitle", label: "Titel inzichten-blok", type: "text", help: "Rijke onderdelen (kpis, challenges, solutions, outcomes…) via 'Overige velden (JSON)'." },
  ],
  teamleden: [
    { key: "naam", label: "Naam", type: "text" },
    { key: "rol", label: "Rol", type: "text" },
    { key: "foto", label: "Foto (pad)", type: "text", placeholder: "/assets/photos/portret-...png" },
    { key: "bio", label: "Bio", type: "textarea" },
  ],
};

/** data-object → veldwaarde als string voor de invoervelden. */
export function fieldValue(data: Record<string, unknown>, f: FieldDef): string {
  const v = data[f.key];
  if (v === undefined || v === null) return "";
  return typeof v === "string" ? v : String(v);
}

/** Overige data-sleutels die niet in het schema zitten (voor de JSON-uitklap). */
export function extraData(type: ContentType, data: Record<string, unknown>): Record<string, unknown> {
  const known = new Set(FIELD_SCHEMAS[type].map((f) => f.key));
  const rest: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (!known.has(k)) rest[k] = v;
  }
  return rest;
}
