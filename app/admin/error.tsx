"use client";

import { unstable_isUnrecognizedActionError } from "next/navigation";
import { VerouderdeVersie } from "@/components/fout/verouderde-versie";

/**
 * Fout-vangnet voor het hele admin-gedeelte. Zet een onverwachte fout om in een
 * nette, herstelbare melding binnen de layout — het zijmenu blijft bruikbaar,
 * zodat de pagina nooit volledig "vastloopt".
 *
 * Eén fout krijgt een eigen scherm: een server action die de server niet meer
 * kent omdat er sinds het laden van deze tab een nieuwe versie is uitgerold.
 * Daar helpt `reset()` niet tegen, alleen herladen. Zie `VerouderdeVersie`.
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Expliciet `boolean`, niet het afgeleide type. De helper is een type
  // predicate (`error is UnrecognizedActionError`), en omdat die klasse
  // structureel gelijk is aan `Error` versmalt TypeScript `error` in de
  // else-tak tot `never` -- dan bestaat `error.message` daar niet meer.
  const verouderd: boolean = unstable_isUnrecognizedActionError(error);

  return (
    <div className="admin-fout">
      <div className="crumb">Er ging iets mis</div>
      <div className="card">
        <h1>
          {verouderd
            ? "Deze pagina draait op een oudere versie"
            : "Deze pagina kon niet worden geladen"}
        </h1>
        {verouderd ? (
          <VerouderdeVersie />
        ) : (
          <>
            <p>
              Er trad een onverwachte fout op. Probeer het opnieuw of ga via het menu naar een
              andere pagina.
            </p>
            {error?.message && <p className="t-sub">Details: {error.message}</p>}
            <button type="button" className="btn btn-primary" onClick={reset}>
              Opnieuw proberen
            </button>
          </>
        )}
      </div>
    </div>
  );
}
