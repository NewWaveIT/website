import type { ContentType } from "@/lib/cms/content";

/** Een filterknop boven een adminlijst, gevoed door één veld uit `data`. */
export interface Facet {
  key: string;
  label: string;
}

/**
 * De filters per contenttype, op één plek.
 *
 * Ze staan hier en niet bij de pagina's omdat ze twee dingen tegelijk bepalen:
 * wat de lijst toont én welke velden uit de `data`-jsonb überhaupt opgehaald
 * moeten worden. Zouden die twee los van elkaar staan, dan filtert een lijst
 * vroeg of laat op een veld dat niet is meegekomen — en dan is elke waarde leeg
 * zonder dat er iets misgaat.
 */
export const LIJST_FACETTEN: Partial<Record<ContentType, Facet[]>> = {
  cases: [{ key: "sector", label: "sectoren" }],
  artikelen: [
    { key: "discipline", label: "disciplines" },
    { key: "sector", label: "sectoren" },
  ],
};

/**
 * Contenttypen waarvan de volgorde met slepen te wijzigen is. Artikelen staan
 * op datum en pagina's zijn een vaste set, dus daar zegt volgorde niets.
 */
export function isSorteerbaar(type: ContentType): boolean {
  return type !== "artikelen" && type !== "paginas";
}
