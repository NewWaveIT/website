"use client";

import { useEffect } from "react";

/**
 * Laatste vangnet: vangt fouten die in de root-layout zelf optreden (waar
 * app/error.tsx niet meer bij kan). Vervangt de hele pagina, dus met eigen
 * <html>/<body> en inline stijlen — globale CSS is hier niet gegarandeerd.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="nl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbfaf6",
          color: "#2e251a",
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "34rem", textAlign: "center" }}>
          <div
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              color: "#f15822",
              lineHeight: 1,
              marginBottom: "16px",
            }}
            aria-hidden="true"
          >
            !
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "0 0 12px" }}>
            Er ging iets mis
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "#6b5b47", margin: "0 0 24px" }}>
            Door een onverwachte fout kon de pagina niet worden geladen. Probeer het opnieuw of ga
            terug naar de homepage.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#f15822",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 20px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Opnieuw proberen
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              style={{
                background: "transparent",
                color: "#2e251a",
                border: "1px solid #c9bca6",
                borderRadius: "8px",
                padding: "12px 20px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Naar de homepage
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
