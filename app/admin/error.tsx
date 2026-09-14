"use client";

/**
 * Fout-vangnet voor het hele admin-gedeelte. Zet een onverwachte fout om in een
 * nette, herstelbare melding binnen de layout — het zijmenu blijft bruikbaar,
 * zodat de pagina nooit volledig "vastloopt".
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="admin-fout">
      <div className="crumb">Er ging iets mis</div>
      <div className="card">
        <h1>Deze pagina kon niet worden geladen</h1>
        <p>
          Er trad een onverwachte fout op. Probeer het opnieuw of ga via het menu naar een andere
          pagina.
        </p>
        {error?.message && <p className="t-sub">Details: {error.message}</p>}
        <button type="button" className="btn btn-primary" onClick={reset}>
          Opnieuw proberen
        </button>
      </div>
    </div>
  );
}
