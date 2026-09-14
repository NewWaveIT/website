"use client";

import { useEffect, useRef } from "react";

/** Wat de browser als "tabbaar" beschouwt, minus alles wat expliciet is uitgezet. */
const FOCUSBAAR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

/**
 * De toetsenbord- en focusafspraken voor elk overlay-paneel in de admin: de
 * modal en de twee detaildrawers.
 *
 * Zonder dit blijft de focus achter het paneel staan. Een muisgebruiker merkt
 * daar niets van — die klikt gewoon in de drawer — maar wie met Tab werkt of
 * een schermlezer gebruikt, loopt eerst door de hele pagina eronder voordat
 * hij bij het paneel is, en kan er daarna weer ongemerkt uit lopen.
 *
 * Vier dingen dus, en ze horen bij elkaar: focus naar het paneel bij openen,
 * Tab die binnen het paneel rondgaat, Escape die sluit, en focus terug naar de
 * knop waarmee je het paneel opende zodra het dichtgaat.
 *
 * Geeft de ref terug die op het paneel moet — het element met `role="dialog"`.
 */
export function useDialoog<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const paneelRef = useRef<T>(null);

  // Laatste-waarde-ref: zo hoeft de aanroeper geen stabiele `onClose` te maken
  // en draait het effect hieronder alleen op `open`.
  const sluit = useRef(onClose);
  useEffect(() => {
    sluit.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const paneel = paneelRef.current;
    if (!paneel) return;

    // De knop waar we straks weer naartoe moeten.
    const vorige = document.activeElement as HTMLElement | null;

    // Naar het paneel zelf en niet naar de eerste knop erin: dan leest een
    // schermlezer eerst de titel van de dialoog voor, en staat Tab daarna
    // vooraan in de inhoud in plaats van er middenin.
    paneel.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        sluit.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [...paneel.querySelectorAll<HTMLElement>(FOCUSBAAR)].filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const eerste = items[0]!;
      const laatste = items[items.length - 1]!;
      const actief = document.activeElement;
      if (e.shiftKey && (actief === eerste || actief === paneel)) {
        e.preventDefault();
        laatste.focus();
      } else if (!e.shiftKey && actief === laatste) {
        e.preventDefault();
        eerste.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      // Alleen terugsturen als de focus nog in het paneel stond; heeft de
      // gebruiker intussen ergens anders geklikt, dan is dat waar hij wil zijn.
      if (paneel.contains(document.activeElement)) vorige?.focus();
    };
  }, [open]);

  return paneelRef;
}
