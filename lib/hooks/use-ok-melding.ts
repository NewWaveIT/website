"use client";

import { useEffect, useState } from "react";

const TEKST: Record<string, string> = {
  aangemaakt: "Item aangemaakt.",
  verwijderd: "Item verwijderd.",
  bijgewerkt: "Wijzigingen opgeslagen.",
};

/**
 * De bevestiging na een geslaagde server action.
 *
 * Die actions eindigen op een `redirect` met `?ok=…`, want een redirect wist de
 * teruggegeven state. De ontvangende pagina leest de parameter eenmalig, toont
 * hem een paar seconden en haalt hem uit de URL — anders staat de melding er bij
 * elke herlaadbeurt weer.
 */
export function useOkMelding(): [string | null, (m: string | null) => void] {
  const [melding, setMelding] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ok = params.get("ok");
    if (!ok) return;
    // Leest de URL na een server-redirect: een externe waarde, dus niet tijdens
    // de render te bepalen.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMelding(TEKST[ok] ?? "Wijzigingen opgeslagen.");
    params.delete("ok");
    const qs = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : ""));
  }, []);

  useEffect(() => {
    if (!melding) return;
    const t = setTimeout(() => setMelding(null), 2600);
    return () => clearTimeout(t);
  }, [melding]);

  return [melding, setMelding];
}
