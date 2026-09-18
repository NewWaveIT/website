import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "metaTitle", label: "Meta-titel", type: "text" },
  { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
  { key: "heroKicker", label: "Hero — kicker", type: "text" },
  { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
  { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
  { key: "heroTitleEnd", label: "Hero — titel (eind)", type: "text" },
  { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
  { key: "leadTitel", label: "E-mailblok — titel", type: "text" },
  { key: "leadTekst", label: "E-mailblok — tekst", type: "textarea" },
  { key: "artikelLeadTitel", label: "E-mailblok onder een artikel — titel", type: "text" },
  { key: "artikelLeadTekst", label: "E-mailblok onder een artikel — tekst", type: "textarea" },
  { key: "artikelAuteurLabel", label: "Artikel — kopje boven de auteur", type: "text" },
  { key: "artikelAuteurCta", label: "Artikel — link in het auteursblok", type: "text" },
  { key: "artikelVerwantTitel", label: "Artikel — kop boven verwante artikelen", type: "text" },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  metaTitle: "Inzichten: kennis die je morgen kunt gebruiken",
  metaDescription:
    "Praktische artikelen over Mendix, AI en digitale strategie, geschreven vanuit de vraagstukken van onze vijf sectoren, zonder jargon.",
  heroKicker: "Inzichten",
  heroTitleStart: "Kennis die je ",
  heroAccent: "morgen",
  heroTitleEnd: " kunt gebruiken.",
  heroLead:
    "Sectorkennis die je vooruit denkt. Praktijkervaring uit projecten bij gemeenten, banken, zorginstellingen en mobiliteitsbedrijven, vertaald naar artikelen die je direct kan gebruiken, geen gerecycled nieuws.",
  leadTitel: "Blijf voorop met onze inzichten",
  leadTekst:
    "Eén mail per maand met onze scherpste inzichten over technologie in jouw sector. Geen sales, uitschrijven kan altijd.",
  artikelLeadTitel: "Dit soort inzichten, één keer per maand",
  artikelLeadTekst:
    "Laat je e-mail achter en ontvang onze scherpste inzichten over technologie in jouw sector. Geen sales, uitschrijven kan altijd.",
  artikelAuteurLabel: "Geschreven door",
  artikelAuteurCta: "Stel je vraag",
  artikelVerwantTitel: "Meer over dit onderwerp",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
