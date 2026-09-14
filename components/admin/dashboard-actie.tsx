"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

/**
 * De knop rechts in een rij van "Vraagt om jouw actie" of "Klaar om te
 * publiceren": één klik zet de volgende stap, zonder de rij te openen.
 *
 * Bewust een `<button>` binnen de klikbare rij en niet eromheen: de rij zelf is
 * een link naar het item, deze knop doet iets anders. Daarom stopt hij de
 * bubbelende klik, en daarom is hij geen `<form action>` maar een transition —
 * zo blijft de rij bruikbaar terwijl de actie loopt en verspringt er niets.
 */
export function DashboardActie({
  label,
  bezigLabel,
  onActie,
}: {
  label: string;
  bezigLabel: string;
  onActie: () => Promise<{ ok: boolean; error?: string }>;
}) {
  const [bezig, start] = useTransition();
  const [fout, setFout] = useState<string | null>(null);
  const router = useRouter();

  return (
    <button
      type="button"
      className="go"
      disabled={bezig}
      aria-live="polite"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setFout(null);
        start(async () => {
          const r = await onActie();
          if (r.ok) router.refresh();
          else setFout(r.error ?? "Niet gelukt");
        });
      }}
    >
      {fout ?? (bezig ? bezigLabel : label)}
    </button>
  );
}
