"use client";

import { useSyncExternalStore } from "react";

/** De waarde verandert niet tijdens een bezoek, dus er valt niets te abonneren. */
const nooitAbonneren = () => () => {};

/**
 * Een waarde die alleen de browser kent: de huidige datum, de queryparameters,
 * de schermbreedte.
 *
 * Waarom niet gewoon in een `useEffect` met `setState`: dat veroorzaakt een
 * extra render en de lintregel `react-hooks/set-state-in-effect` wijst het
 * terecht af. En waarom niet direct in de render: onder Cache Components
 * weigert Next een waarde te prerenderen die tussen renders kan verschillen —
 * `new Date()` bijvoorbeeld — en bij hydratie zou server en client uit elkaar
 * lopen.
 *
 * `useSyncExternalStore` is hiervoor bedoeld: `opServer` is wat er tijdens het
 * prerenderen en de eerste hydratierender staat, `lees` wat de browser daarna
 * invult.
 *
 * Let op: `lees` moet dezelfde waarde teruggeven zolang er niets verandert.
 * React vergelijkt snapshots op identiteit, dus geef een primitieve waarde
 * terug — een vers object per aanroep levert een oneindige renderlus op.
 */
export function useBrowserwaarde<T>(lees: () => T, opServer: T): T {
  return useSyncExternalStore(nooitAbonneren, lees, () => opServer);
}
