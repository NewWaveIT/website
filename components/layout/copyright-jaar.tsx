"use client";

import { useBrowserwaarde } from "@/lib/hooks/use-browserwaarde";

/**
 * Het jaartal in de footer, ingevuld door de browser.
 *
 * `new Date()` in de footer zelf kan niet: onder Cache Components weigert Next
 * een waarde te prerenderen die tussen renders verandert — terecht, want dan
 * zou het jaartal vastzitten op de build en op 1 januari verouderd zijn tot de
 * volgende deploy. Een servercomponent met `use cache` kan hier ook niet, omdat
 * de footer via app/error.tsx in de clientgraph belandt.
 *
 * Vóór hydratie staat er geen jaartal; de regel eromheen blijft leesbaar.
 */
export function CopyrightJaar() {
  const jaar = useBrowserwaarde(() => new Date().getFullYear(), null as number | null);
  return <>{jaar}</>;
}
