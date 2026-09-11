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
      placeholder: "Moove Connected Mobility · Mendix",
      panel: "side",
    },
    { key: "image", label: "Cover-afbeelding", type: "image", panel: "side" },
    {
      key: "tag",
      label: "Tag (detail)",
      type: "text",
      placeholder: "Mobiliteit · Moove Connected Mobility",
      panel: "side",
    },
    { key: "h1", label: "Titel (detailpagina)", type: "text" },
    { key: "intro", label: "Intro", type: "textarea" },
    { key: "challenge", label: "De uitdaging", type: "richtext-lite" },
    { key: "pull", label: "Pull-quote", type: "text" },
    {
      key: "ketenTitel",
      label: "Keten — titel",
      type: "text",
      placeholder: "De keten in drie stappen",
      help: "Procesoverzicht bovenaan 'De aanpak'. Leeg = het ketenblok is verborgen.",
    },
    {
      key: "ketenStappen",
      label: "Keten — stappen",
      type: "items",
      itemLabel: "Stap",
      of: [
        { key: "label", label: "Label", type: "text", placeholder: "Stap 1" },
        { key: "titel", label: "Titel", type: "text", placeholder: "MooveInstaller" },
        { key: "tekst", label: "Toelichting", type: "text" },
      ],
    },
    { key: "ketenSynthese", label: "Keten — slotzin", type: "textarea" },
    {
      key: "secties",
      label: "Secties (genummerd)",
      type: "items",
      itemLabel: "Sectie",
      of: [
        { key: "titel", label: "Titel", type: "text" },
        { key: "situatie", label: "Situatie & uitdaging", type: "textarea" },
        { key: "aanpak", label: "Onze aanpak", type: "textarea" },
        {
          key: "stappen",
          label: "Stappen (mini-procesdiagram)",
          type: "items",
          itemLabel: "Stap",
          of: [
            { key: "label", label: "Label", type: "text" },
            { key: "titel", label: "Titel", type: "text" },
            { key: "tekst", label: "Toelichting", type: "text" },
          ],
        },
        { key: "functionaliteiten", label: "Functionaliteiten", type: "list" },
        {
          key: "resultaten",
          label: "Resultaatkaarten",
          type: "items",
          itemLabel: "Resultaat",
          of: [
            { key: "titel", label: "Titel", type: "text" },
            { key: "tekst", label: "Toelichting", type: "textarea" },
          ],
        },
      ],
    },
    { key: "resultaat", label: "Het resultaat", type: "richtext-lite" },
    {
      key: "eindresultaten",
      label: "Eindresultaten (kaarten onder de conclusie)",
      type: "items",
      itemLabel: "Resultaat",
      of: [
        { key: "titel", label: "Titel", type: "text" },
        { key: "tekst", label: "Toelichting", type: "textarea" },
      ],
    },
    { key: "quote", label: "Quote", type: "textarea" },
    { key: "quoteNaam", label: "Quote — naam", type: "text" },
    { key: "quoteRol", label: "Quote — rol", type: "text" },
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
        { key: "img", label: "Afbeelding", type: "image" },
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
    { key: "caseHref", label: "Klantverhaal — link naar /klantverhalen/…", type: "text" },
    {
      key: "waarborg",
      label: "Waarborg (i.p.v. klantverhaal)",
      type: "textarea",
      help: "Toont alleen als 'Klantverhaal — titel' leeg is.",
    },
    {
      key: "heroTheme",
      label: "Hero-illustratie",
      type: "select",
      options: [
        "mendix",
        "ai",
        "strategie",
        "publiek",
        "mobiliteit",
        "banken",
        "zorg",
        "manufacturing",
        "diensten",
      ],
      help: "Leeg = dienst-slug zelf.",
      panel: "side",
    },
    {
      key: "serviceSlug",
      label: "Gekoppelde dienst (catalogus)",
      type: "text",
      help: "Slug uit de dienstencatalogus — vult doelgroep/duur/prijs op deze pagina.",
      panel: "side",
    },
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
    {
      key: "sectoren",
      label: "Sectorkoppeling — sector-slugs",
      type: "list",
      help: "Bv. 'publieke-sector'. Leeg = de sectie is verborgen.",
    },
    { key: "welNietTitel", label: "Wanneer wel/niet — titel", type: "text" },
    { key: "welWanneer", label: "Wanneer wel", type: "list" },
    { key: "nietWanneer", label: "Wanneer niet", type: "list" },
  ],
  sectoren: [
    { key: "naam", label: "Naam", type: "text" },
    {
      key: "icon",
      label: "Icoon (badge)",
      type: "icon",
      options: [
        "building-2",
        "truck",
        "banknote",
        "heart-pulse",
        "factory",
        "calendar-check",
        "route",
        "scan-barcode",
        "battery-charging",
        "package-search",
        "clipboard-check",
        "file-check",
        "users",
        "shield-check",
        "workflow",
        "gauge",
        "boxes",
        "brain-circuit",
        "monitor-smartphone",
        "clipboard-list",
        "sparkles",
        "user-round",
        "calendar-days",
        "bed",
        "calendar-clock",
        "tablet-smartphone",
        "badge-check",
        "wrench",
        "landmark",
      ],
      panel: "side",
    },
    {
      key: "heroTheme",
      label: "Hero-animatie",
      type: "text",
      panel: "side",
      help: "Thema voor de bewegende achtergrond; leeg = geen animatie.",
    },
    { key: "metaTitle", label: "SEO-titel", type: "text", panel: "side" },
    { key: "metaDescription", label: "SEO-omschrijving", type: "textarea", panel: "side" },

    {
      key: "hook",
      label: "Overzichten \u2014 uitspraak",
      type: "text",
      help: "Het probleem in de woorden van de klant, met aanhalingstekens. Staat op de homepage en op /sectoren.",
    },
    {
      key: "pitch",
      label: "Overzichten \u2014 pitch",
      type: "textarea",
      help: "Wat wij doen, in \u00e9\u00e9n zin. Staat op de homepage, /sectoren en /klantverhalen. Houd het onder 110 tekens, anders past het niet op de kaart.",
    },
    {
      key: "kpiLabel",
      label: "Overzichten \u2014 label",
      type: "text",
      help: "Twee tot drie woorden onder de pitch, bijvoorbeeld \u201cSneller vergunnen\u201d.",
    },

    { key: "h1", label: "Titel (H1)", type: "text" },
    { key: "intro", label: "Intro", type: "richtext-lite" },

    { key: "herkenningTitel", label: "Herkenning — titel", type: "text" },
    {
      key: "herkenning",
      label: "Herkenning — uitspraken",
      type: "list",
      help: "Vier citaten die de lezer moet herkennen.",
    },

    { key: "mensenTitel", label: "Mensen — titel", type: "text" },
    { key: "mensenTekst", label: "Mensen — tekst", type: "textarea" },
    { key: "mensenFoto", label: "Mensen — foto", type: "image" },
    { key: "mensenFotoPositie", label: "Uitsnede mensenfoto", type: "text", panel: "side" },
    { key: "mensenTags", label: "Mensen — rollen", type: "list" },

    { key: "waaromTitel", label: "Waarom nu — titel", type: "text" },
    { key: "waaromAlineas", label: "Waarom nu — alinea's", type: "list" },
    { key: "waaromFoto", label: "Waarom nu — foto", type: "image" },
    { key: "waaromFotoPositie", label: "Uitsnede waaromfoto", type: "text", panel: "side" },
    { key: "quote", label: "Quote", type: "textarea" },
    {
      key: "quoteTeamlid",
      label: "Quote — teamlid",
      type: "text",
      help: "Slug van het teamlid; naam, rol en foto komen uit Teamleden.",
    },

    { key: "oplossingenTitel", label: "Pijn → oplossing — titel", type: "text" },
    { key: "oplossingenIntro", label: "Pijn → oplossing — intro", type: "textarea" },
    {
      key: "oplossingen",
      label: "Pijn → oplossing",
      type: "items",
      itemLabel: "Rij",
      of: [
        { key: "pijn", label: "Pijnpunt", type: "text" },
        { key: "kost", label: "Wat het kost", type: "textarea" },
        { key: "oplossing", label: "Onze oplossing", type: "textarea" },
        {
          key: "laag",
          label: "Laag",
          type: "select",
          options: ["strategie", "operatie", "toekomst", "platform", "operating", "delivery"],
        },
      ],
    },

    { key: "bouwenTitel", label: "Wat we bouwen — titel", type: "text" },
    {
      key: "useCases",
      label: "Wat we bouwen",
      type: "items",
      itemLabel: "Applicatie",
      of: [
        {
          key: "icon",
          label: "Icoon",
          type: "select",
          options: [
            "building-2",
            "truck",
            "banknote",
            "heart-pulse",
            "factory",
            "calendar-check",
            "route",
            "scan-barcode",
            "battery-charging",
            "package-search",
            "clipboard-check",
            "file-check",
            "users",
            "shield-check",
            "workflow",
            "gauge",
            "boxes",
            "brain-circuit",
          ],
        },
        { key: "titel", label: "Titel", type: "text" },
        { key: "tekst", label: "Tekst", type: "textarea" },
        { key: "sluitAanOp", label: "Sluit aan op", type: "text" },
      ],
    },

    { key: "aanpakTitel", label: "Hoe we werken — titel", type: "text" },
    { key: "aanpakFoto", label: "Hoe we werken — foto", type: "image" },
    { key: "aanpakFotoPositie", label: "Uitsnede aanpakfoto", type: "text", panel: "side" },
    { key: "stappen", label: "Stappen", type: "list", help: "Vier stappen." },
    { key: "belofte", label: "Belofte", type: "textarea" },

    { key: "dienstenTitel", label: "Diensten — titel", type: "text" },
    {
      key: "dienstLinks",
      label: "Diensten — links",
      type: "items",
      itemLabel: "Link",
      of: [
        { key: "label", label: "Label", type: "text" },
        { key: "href", label: "Pad", type: "text" },
      ],
    },

    { key: "faqTitel", label: "FAQ — titel", type: "text" },
    {
      key: "faq",
      label: "Veelgestelde vragen",
      type: "items",
      itemLabel: "Vraag",
      of: [
        { key: "vraag", label: "Vraag", type: "text" },
        { key: "antwoord", label: "Antwoord", type: "textarea" },
      ],
    },

    { key: "teamTitel", label: "Team — titel", type: "text" },
    {
      key: "team",
      label: "Team op deze pagina",
      type: "items",
      itemLabel: "Teamlid",
      of: [
        { key: "teamlid", label: "Slug uit Teamleden", type: "text" },
        { key: "tekst", label: "Waarom hij of zij hier staat", type: "textarea" },
      ],
    },

    { key: "ctaTitel", label: "CTA — titel", type: "text" },
    { key: "ctaTekst", label: "CTA — tekst", type: "textarea" },
    { key: "ctaTeamlid", label: "CTA — teamlid (slug)", type: "text" },
    { key: "ctaTeamlidTekst", label: "CTA — regel over dit teamlid", type: "textarea" },
  ],
  teamleden: [
    { key: "rol", label: "Rol", type: "text", placeholder: "CEO & founder", panel: "side" },
    { key: "foto", label: "Foto", type: "image", panel: "side" },
    {
      key: "contactrol",
      label: "Contactrol",
      type: "select",
      options: ["Geen", "Sales", "Recruitment", "Sales & recruitment"],
      help: "Toont dit teamlid als contactpersoon op de contactpagina (sales) en/of de vacatures (recruitment).",
      panel: "side",
    },
    {
      key: "telefoon",
      label: "Telefoon (contact)",
      type: "text",
      placeholder: "06–10751254",
      panel: "side",
    },
    {
      key: "email",
      label: "E-mail (contact)",
      type: "text",
      placeholder: "naam@thenewwaveit.com",
      panel: "side",
    },
    { key: "linkedin", label: "LinkedIn-URL", type: "text", panel: "side" },
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
  services: [
    { key: "naam", label: "Naam", type: "text" },
    {
      key: "familie",
      label: "Indeling — familie",
      type: "select",
      options: ["doen", "richting", "capaciteit"],
      help: "Groepering op het /diensten-overzicht.",
      panel: "side",
    },
    {
      key: "richting",
      label: "Indeling — richting",
      type: "select",
      options: ["mendix", "ai", "strategie", "(geen)"],
      help: "'Thuis'-hub van deze dienst. (geen) = geen eigen hub, alleen op het overzicht.",
      panel: "side",
    },
    {
      key: "hubTier",
      label: "Indeling — kolom op richtingpagina",
      type: "select",
      options: ["(zelfde als familie)", "doen", "richting", "capaciteit"],
      help: "Alleen invullen als de dienst op een andere kolom hoort dan zijn familie (bv. AI-strategie).",
      panel: "side",
    },
    {
      key: "ookRelevantVoor",
      label: "Indeling — kruisverwijzing op richting(en)",
      type: "list",
      help: "Richtingslugs (mendix/ai/strategie) waar deze dienst als 'ook relevant' verschijnt.",
      panel: "side",
    },
    {
      key: "fase",
      label: "Indeling — fase",
      type: "select",
      options: ["(geen)", "1", "2", "3"],
      panel: "side",
    },
    { key: "pitch", label: "Kaart — pitch (één regel)", type: "text" },
    { key: "beschrijving", label: "Kaart — beschrijving", type: "textarea" },
    { key: "doelgroep", label: "Kaart — doelgroep", type: "text" },
    { key: "duur", label: "Kaart — duur", type: "text" },
    { key: "groepsgrootte", label: "Kaart — groepsgrootte", type: "text" },
    {
      key: "prijzen",
      label: "Kaart — prijsbanden",
      type: "items",
      itemLabel: "Prijsband",
      of: [
        { key: "label", label: "Prijs", type: "text", placeholder: "€ 4.500 – 6.500" },
        { key: "variant", label: "Toelichting", type: "text", placeholder: "dagdeel" },
      ],
    },
    { key: "resultaten", label: "Kaart — resultaten", type: "list", help: "Drie bullets." },
    { key: "volgendeStap", label: "Vervolg — volgende stap", type: "textarea" },
    {
      key: "volgendeStapSlugs",
      label: "Vervolg — links naar andere diensten",
      type: "list",
      help: "Service-slugs, bv. 'fusion-team-startsprint'.",
    },
    { key: "ctaLabel", label: "CTA — knoptekst", type: "text", panel: "side" },
    {
      key: "ctaType",
      label: "CTA — soort",
      type: "select",
      options: ["datum", "kennismaking"],
      panel: "side",
    },

    // Diepte-inhoud voor de eigen pagina onder /diensten/<slug>. Alles optioneel:
    // een lege sectie wordt niet gerenderd.
    {
      key: "kpis",
      label: "Pagina — KPI's in de hero",
      type: "items",
      itemLabel: "KPI",
      of: [
        { key: "n", label: "Cijfer", type: "text" },
        { key: "l", label: "Toelichting", type: "text" },
      ],
    },
    {
      key: "vraagstukken",
      label: "Pagina — vraagstukken",
      type: "items",
      itemLabel: "Vraagstuk",
      of: [
        { key: "q", label: "Label", type: "text" },
        { key: "titel", label: "Titel", type: "text" },
        { key: "p", label: "Tekst", type: "textarea" },
      ],
    },
    {
      key: "aanpak",
      label: "Pagina — aanpak (rijen met beeld)",
      type: "items",
      itemLabel: "Rij",
      of: [
        { key: "kicker", label: "Kicker", type: "text" },
        { key: "titel", label: "Titel", type: "text" },
        { key: "p", label: "Tekst", type: "textarea" },
        { key: "punten", label: "Punten", type: "list" },
        { key: "img", label: "Afbeelding", type: "image" },
      ],
    },
    {
      key: "waarom",
      label: "Pagina — waarom wij",
      type: "items",
      itemLabel: "Reden",
      of: [
        { key: "titel", label: "Titel", type: "text" },
        { key: "p", label: "Tekst", type: "textarea" },
      ],
    },
    {
      key: "outcomes",
      label: "Pagina — resultaten",
      type: "items",
      itemLabel: "Resultaat",
      of: [
        { key: "n", label: "Cijfer", type: "text" },
        { key: "l", label: "Toelichting", type: "text" },
      ],
    },
    { key: "caseTitle", label: "Pagina — klantverhaal: titel", type: "text" },
    { key: "caseSector", label: "Pagina — klantverhaal: sector", type: "text" },
    { key: "caseQuote", label: "Pagina — klantverhaal: quote", type: "textarea" },
    { key: "caseNaam", label: "Pagina — klantverhaal: naam", type: "text" },
    { key: "caseRol", label: "Pagina — klantverhaal: rol", type: "text" },
    { key: "caseImage", label: "Pagina — klantverhaal: afbeelding", type: "image" },
    { key: "caseHref", label: "Pagina — klantverhaal: link", type: "text" },

    // Detailpagina volgens het ontwerp van september 2026. Eén sjabloon voor
    // alle negen diensten; elk blok verbergt zijn sectie als het leeg is.
    { key: "kop", label: "Detail — kop in de hero", type: "text", help: "Leeg = de naam." },
    {
      key: "lead",
      label: "Detail — alinea onder de kop",
      type: "textarea",
      help: "Leeg = de pitch.",
    },
    {
      key: "feiten",
      label: "Detail — feitenregel",
      type: "items",
      itemLabel: "Feit",
      of: [
        { key: "label", label: "Label", type: "text", placeholder: "Duur" },
        { key: "waarde", label: "Waarde", type: "text", placeholder: "Eén dag · 09:00–17:00" },
      ],
    },
    {
      key: "prijsToelichting",
      label: "Detail — toelichting onder de prijs",
      type: "textarea",
    },
    {
      key: "boekPunten",
      label: "Detail — bullets in de boekkaart",
      type: "list",
      help: "Leeg = de resultaten van de kaart.",
    },
    { key: "herkenIntro", label: "Detail — intro bij 'Herken je dit?'", type: "textarea" },
    { key: "herken", label: "Detail — herkenningscitaten", type: "list", help: "Drie citaten." },
    { key: "meeneemtTitel", label: "Detail — titel 'Wat je meeneemt'", type: "text" },
    {
      key: "meeneemt",
      label: "Detail — wat je meeneemt",
      type: "items",
      itemLabel: "Regel",
      of: [
        { key: "icon", label: "Icoon (lucide)", type: "text", placeholder: "bot" },
        { key: "titel", label: "Titel", type: "text" },
        { key: "tekst", label: "Toelichting", type: "textarea" },
      ],
    },
    { key: "meeneemtFoto", label: "Detail — foto bij 'Wat je meeneemt'", type: "image" },
    {
      key: "dagLabel",
      label: "Detail — label boven het programma",
      type: "text",
      placeholder: "De dag zelf",
    },
    { key: "dagTitel", label: "Detail — titel van het programma", type: "text" },
    { key: "dagIntro", label: "Detail — intro bij het programma", type: "textarea" },
    {
      key: "dagSlots",
      label: "Detail — programma",
      type: "items",
      itemLabel: "Blok",
      of: [
        { key: "tijd", label: "Tijd of week", type: "text", placeholder: "09:00" },
        { key: "titel", label: "Titel", type: "text" },
        { key: "tekst", label: "Toelichting", type: "textarea" },
      ],
    },
    { key: "voorbereidingIntro", label: "Detail — intro bij voorbereiding", type: "textarea" },
    { key: "wijZorgen", label: "Detail — wij zorgen voor", type: "list" },
    { key: "jijZorgt", label: "Detail — jij zorgt voor", type: "list" },
    { key: "daarnaIntro", label: "Detail — intro bij 'Daarna'", type: "textarea" },
    {
      key: "vervolg",
      label: "Detail — vervolgdiensten",
      type: "items",
      itemLabel: "Vervolg",
      of: [
        { key: "slug", label: "Service-slug", type: "text", placeholder: "ai-opportunity-scan" },
        { key: "reden", label: "Waarom deze volgt", type: "textarea" },
      ],
    },
    { key: "faqTitel", label: "Detail — titel boven de FAQ", type: "text" },
    {
      key: "faq",
      label: "Detail — veelgestelde vragen",
      type: "items",
      itemLabel: "Vraag",
      of: [
        { key: "vraag", label: "Vraag", type: "text" },
        { key: "antwoord", label: "Antwoord", type: "textarea" },
      ],
    },
    { key: "ctaTitel", label: "Detail — kop van de slot-CTA", type: "text" },
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
  fields: readonly FieldDef[],
  data: Record<string, unknown>,
): Record<string, unknown> {
  const known = new Set(fields.map((f) => f.key));
  const rest: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (!known.has(k)) rest[k] = v;
  }
  return rest;
}
