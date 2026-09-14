export type ClassValue = string | number | null | false | undefined;

/** Voegt classnames samen; filtert falsy waarden. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Een citaat met precies één paar aanhalingstekens, ongeacht wat er in het CMS
 * staat. De helft van de plekken zette zelf `“…”` om de waarde en verwachtte
 * dus kale tekst; de andere helft rende de waarde rauw en verwachtte dat de
 * tekens erin zaten. Typte een redacteur ze er dan bij, dan stond er
 * `““…””` op de pagina. De data levert nu de zin, de weergave de typografie.
 */
export function citaat(tekst: string): string {
  const kaal = tekst.trim().replace(/^["'“”„‟«»\s]+|["'“”„‟«»\s]+$/g, "");
  return kaal ? `“${kaal}”` : "";
}

/**
 * Vult `{naam}`-plaatshouders in een CMS-tekst.
 *
 * Sommige koppen noemen de dienst waar ze boven staan: "Onze Mendix-diensten",
 * "Resultaten met App in a Day". Die tekst is nu redactioneel, maar de naam
 * komt uit de rij. In het CMS staat dus `Onze {naam}-diensten`, en hier wordt
 * dat ingevuld. Een plaatshouder die de redacteur weglaat is geen fout: dan
 * staat er gewoon geen naam.
 */
export function vulIn(sjabloon: string, waarden: Record<string, string>): string {
  return sjabloon.replace(/\{(\w+)\}/g, (heel, sleutel: string) => waarden[sleutel] ?? heel);
}
