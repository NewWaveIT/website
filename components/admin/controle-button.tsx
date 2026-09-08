"use client";

import { useState } from "react";
import { controleerContent, type ControleResultaat } from "@/app/admin/content/actions";

/**
 * Diagnose: haalt elke CMS-rij door het runtime-schema en laat zien welke
 * velden niet meer bij de code passen. Verandert niets aan de content.
 */
export function ControleButton() {
  const [busy, setBusy] = useState(false);
  const [resultaten, setResultaten] = useState<ControleResultaat[] | null>(null);
  const [fout, setFout] = useState("");

  async function run() {
    setBusy(true);
    setFout("");
    const res = await controleerContent();
    setBusy(false);
    if (res.error) setFout(res.error);
    else setResultaten(res.resultaten);
  }

  const totaalFouten = resultaten?.reduce((n, r) => n + r.metFouten.length, 0) ?? 0;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
        <button type="button" className="btn btn-outline" onClick={run} disabled={busy}>
          {busy ? "Bezig…" : "Controleer content"}
        </button>
        {fout && <span style={{ fontSize: "var(--text-sm)" }}>Fout: {fout}</span>}
        {resultaten && !fout && (
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
            {totaalFouten === 0
              ? "Alle rijen passen bij de code."
              : `${totaalFouten} rij(en) met velden die niet meer passen.`}
          </span>
        )}
      </div>

      {resultaten && totaalFouten > 0 && (
        <ul style={{ margin: "var(--space-4) 0 0", paddingLeft: "1.1em" }}>
          {resultaten
            .filter((r) => r.metFouten.length)
            .map((r) => (
              <li key={r.type} style={{ marginBottom: "var(--space-3)" }}>
                <strong>{r.type}</strong>{" "}
                <span style={{ color: "var(--text-muted)" }}>
                  ({r.metFouten.length} van {r.rijen})
                </span>
                <ul style={{ paddingLeft: "1.1em" }}>
                  {r.metFouten.map((rij) => (
                    <li key={rij.slug} style={{ fontSize: "var(--text-sm)" }}>
                      <code>{rij.slug}</code>
                      {rij.status !== "live" && " (concept)"} —{" "}
                      {rij.fouten.map((f) => f.veld).join(", ")}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
