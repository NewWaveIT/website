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
    <div style={{ maxWidth: 640 }}>
      <div className="crumb">Er ging iets mis</div>
      <div className="card" style={{ padding: "var(--space-6)" }}>
        <h1
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: "var(--fw-extrabold)",
            marginBottom: "var(--space-3)",
          }}
        >
          Deze pagina kon niet worden geladen
        </h1>
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--text-body)",
            lineHeight: 1.7,
            margin: "0 0 var(--space-4)",
          }}
        >
          Er trad een onverwachte fout op. Probeer het opnieuw of ga via het menu naar een andere
          pagina.
        </p>
        {error?.message && (
          <p className="t-sub" style={{ margin: "0 0 var(--space-4)" }}>
            Details: {error.message}
          </p>
        )}
        <button type="button" className="btn btn-primary" onClick={reset}>
          Opnieuw proberen
        </button>
      </div>
    </div>
  );
}
