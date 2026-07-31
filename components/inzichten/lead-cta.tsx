"use client";

import { useActionState } from "react";
import { subscribeLead, type LeadState } from "@/app/(marketing)/inzichten/actions";

const INIT: LeadState = { ok: false, message: "" };

/**
 * Eén sterke afsluiter op de inzichten-pagina's: e-mailcapture die als lead in
 * het aanvragen-systeem landt. Vervangt de losse nieuwsbrief- en gesprek-CTA's.
 */
export function LeadCta({
  titel = "Blijf voorop met onze inzichten",
  tekst = "Eén mail per maand met onze scherpste inzichten over technologie in jouw sector. Geen sales — uitschrijven kan altijd.",
}: {
  titel?: string;
  tekst?: string;
}) {
  const [state, action, pending] = useActionState<LeadState, FormData>(subscribeLead, INIT);

  return (
    <section className="lead-cta">
      <div className="wrap-wide">
        <h2>{titel}</h2>
        <p>{tekst}</p>
        {state.ok ? (
          <p className="lead-ok" role="status">
            {state.message}
          </p>
        ) : (
          <>
            <form action={action} className="lead-form">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hp"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="naam@organisatie.nl"
                aria-label="E-mailadres"
              />
              <button type="submit" className="btn btn-primary" disabled={pending}>
                {pending ? "Versturen…" : "Aanmelden"}
              </button>
            </form>
            {state.message && (
              <p className="lead-err" role="alert">
                {state.message}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
