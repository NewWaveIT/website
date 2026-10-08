"use client";

import { RotateCcw } from "lucide-react";

/**
 * Wat je ziet als deze pagina nog op een oudere versie van de site draait.
 *
 * Elke server action heeft een id die bij de build hoort. Een nieuwe deploy
 * geeft nieuwe id's (Next vernieuwt ze hoe dan ook minstens elke veertien
 * dagen, ook zonder codewijziging), dus een tab die al openstond stuurt een id
 * dat de server niet meer kent. Next gooit dan een `UnrecognizedActionError`;
 * `unstable_isUnrecognizedActionError` uit `next/navigation` herkent hem.
 *
 * Waarom dit een eigen scherm krijgt: de gewone knop in de foutpagina roept
 * `reset()` aan, en dat hertekent met exact dezelfde verouderde JS. Die knop
 * kan dit dus niet oplossen en belooft iets wat hij niet waarmaakt. Alleen een
 * volledige herlaad haalt de nieuwe build binnen.
 *
 * De waarschuwing over niet-opgeslagen werk staat er bewust bij: in de admin
 * gebeurt dit precies op het moment dat iemand op Opslaan drukt, dus met een
 * volledig ingevuld formulier op het scherm.
 */
export function VerouderdeVersie() {
  return (
    <>
      <p>
        Er is een nieuwe versie van de site uitgerold terwijl deze pagina openstond. De server
        herkent daardoor niet meer wat je zojuist indrukte. Herlaad de pagina, dan werkt het weer.
      </p>
      <p>
        Kopieer eerst wat je hebt ingevuld: wat nog niet is opgeslagen gaat bij het herladen
        verloren.
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          window.location.reload();
        }}
      >
        <RotateCcw /> Pagina herladen
      </button>
    </>
  );
}
