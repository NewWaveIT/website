"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { isPaginawissel } from "@/lib/navigatie";
import "./navigatie-overgang.css";

/** Langer dan dit wachten we niet op een paginawissel: dan was het geen navigatie. */
const MAX_WACHTTIJD_MS = 6000;
const WISSEL_MS = 220;
const WISSEL_MARGE_MS = 400;

/**
 * Feedback bij het wisselen van pagina, op twee manieren:
 *
 * 1. Een dunne voortgangsbalk vanaf de klik tot de nieuwe pagina er is, zodat een
 *    bezoeker nooit naar een stilstaand scherm kijkt.
 * 2. Een zachte fade van de nieuwe pagina. Alleen `opacity`: een `transform` op
 *    `<main>` maakt van hem het kader voor elk `position: fixed` kind, en dat springt
 *    dan één keer. Alleen bij een wissel binnen de site, nooit bij het eerste laden,
 *    zodat het LCP-element niet infade (zie CLAUDE.md, Performance).
 *
 * Geen state in een effect: de balk staat aan zolang het pad nog gelijk is aan het pad
 * waar de klik begon, dus een paginawissel zet hem vanzelf uit.
 */
export function NavigatieOvergang() {
  const pad = usePathname();
  const [wachtVanuit, setWachtVanuit] = useState<string | null>(null);
  const vorigPad = useRef(pad);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const opKlik = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const begint = isPaginawissel(
        {
          href: a.href,
          target: a.getAttribute("target"),
          download: a.hasAttribute("download"),
          knop: e.button,
          modifier: e.metaKey || e.ctrlKey || e.shiftKey || e.altKey,
        },
        window.location.href,
      );
      if (!begint) return;
      setWachtVanuit(window.location.pathname);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setWachtVanuit(null), MAX_WACHTTIJD_MS);
    };
    document.addEventListener("click", opKlik);
    return () => {
      document.removeEventListener("click", opKlik);
      window.clearTimeout(timer.current);
    };
  }, []);

  // Layout-effect, niet gewoon effect: de animatie moet starten vóór de eerste paint van
  // de nieuwe pagina, anders flitst die één frame volledig zichtbaar voordat hij infade.
  useLayoutEffect(() => {
    if (vorigPad.current === pad) return;
    vorigPad.current = pad;
    window.clearTimeout(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wissel = document
      .getElementById("main")
      ?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: WISSEL_MS, easing: "ease-out" });
    // Een overgang mag de pagina nooit onzichtbaar kunnen achterlaten. Staat de
    // animatieklok stil (een achtergrondtabblad, een browser zonder frames), dan zou
    // `<main>` op opacity 0 blijven hangen; een time-out zet hem dan alsnog terug.
    window.setTimeout(() => wissel?.cancel(), WISSEL_MS + WISSEL_MARGE_MS);
  }, [pad]);

  return (
    <div
      className="nav-voortgang"
      data-actief={wachtVanuit !== null && wachtVanuit === pad}
      aria-hidden="true"
    />
  );
}
