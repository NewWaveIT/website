"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Pauzeknop voor de doorlopende logobanden. WCAG 2.2.2 vraagt een mechanisme om
 * beweging die langer dan vijf seconden doorloopt te stoppen; de bestaande
 * pauze-op-hover werkt niet voor toetsenbord- of touchgebruikers.
 *
 * De knop zet een klasse op `<body>`, zodat één knop beide banden stopt zonder
 * dat de (server-gerenderde) logolijsten client-componenten hoeven te worden.
 */
export function MarqueePauze() {
  const [pauze, setPauze] = useState(false);

  return (
    <button
      type="button"
      className="marquee-knop"
      aria-pressed={pauze}
      aria-label={pauze ? "Logo's weer laten bewegen" : "Bewegende logo's pauzeren"}
      onClick={() => {
        const nieuw = !pauze;
        setPauze(nieuw);
        document.body.classList.toggle("marquee-pauze", nieuw);
      }}
    >
      {pauze ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
    </button>
  );
}
