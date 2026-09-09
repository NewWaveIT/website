/**
 * Kopie zonder de opgegeven sleutels.
 *
 * De datalaag-tests bootsen hiermee "de rij kent dit veld niet" na — het geval
 * waarin de seed bijspringt, tegenover een veld dat leeg is opgeslagen en dus
 * leeg blijft. Als los hulpje omdat destructuring met een weggegooide binding
 * (`const { slug: _s, ...rest }`) een lint-waarschuwing oplevert.
 */
export function zonder(o: object, ...sleutels: string[]): Record<string, unknown> {
  const uit: Record<string, unknown> = { ...o };
  for (const s of sleutels) delete uit[s];
  return uit;
}
