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
