"use client";

import { useEffect, useRef } from "react";

/**
 * Een verborgen veld dat zijn wijziging ook echt meldt.
 *
 * Zes velden in de editor — rijke tekst, afbeelding, icoon, auteur, keuze en
 * de gestructureerde lijsten — bewaren hun waarde in een
 * `<input type="hidden">`. Daar komt geen change-event uit: de browser vuurt
 * alleen bij invoer door de gebruiker, en React maakt van een verborgen veld
 * geen `onChange`. Gevolg: je kon een heel artikel herschrijven en de editor
 * dacht dat er niets gewijzigd was. Geen waarschuwing bij weggaan, dus de
 * tekst was weg.
 *
 * Daarom sturen we bij elke waardeverandering zelf een bubbelend `input`-event
 * omhoog. Het formulier luistert daar met een gewone DOM-listener naar, en niet
 * met React's `onChange` — dat laatste negeert verborgen velden juist.
 */
export function VerborgenWaarde({ name, value }: { name: string; value: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const eersteRender = useRef(true);

  useEffect(() => {
    if (eersteRender.current) {
      eersteRender.current = false;
      return;
    }
    ref.current?.dispatchEvent(new Event("input", { bubbles: true }));
  }, [value]);

  return <input ref={ref} type="hidden" name={name} value={value} />;
}
