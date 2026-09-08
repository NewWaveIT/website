/**
 * Canonieke basis-URL van de site — één bron voor metadata, sitemap, robots,
 * JSON-LD en e-mail.
 *
 * De fallback is bewust mét `www`: dat is het productiedomein (zie CLAUDE.md).
 * Stond die op non-www, dan wezen canonical en structured data naar een ander
 * domein dan de site zelf zodra `NEXT_PUBLIC_SITE_URL` in Vercel ontbreekt.
 * Zonder afsluitende slash, zodat `${SITE_URL}/pad` altijd klopt.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.thenewwaveit.com"
).replace(/\/$/, "");

/** Absolute URL voor een pad dat met een slash begint. */
export function siteUrl(pad = "/"): string {
  return `${SITE_URL}${pad}`;
}
