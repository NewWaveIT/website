/**
 * Maakt een net webadres van een titel: kleine letters, koppeltekens, geen
 * accenten.
 *
 * Stond in de editor zelf. Hier staat hij omdat het pure logica is die de
 * server-action ook valideert (`/^[a-z0-9-]+$/`), en omdat hij zo te testen
 * is — de vorige versie schreef de combineertekens uit NFD als de tekens zelf,
 * en die zijn in een editor onzichtbaar. In een diff zag dat eruit als een
 * lege tekenklasse die niets doet.
 */
export function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      // é wordt e + U+0301; de losse combineertekens gaan er daarna uit.
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}
