"use client";

import { useState } from "react";
import {
  controleerContent,
  type ControleResultaat,
  type ControleRij,
} from "@/app/admin/content/actions";

/**
 * Inventarisatie: wat staat er in het CMS tegenover wat de site gebruikt.
 * Schrijft niets.
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

  const teZien = resultaten?.filter((r) => r.aandacht.length) ?? [];
  const totaal = resultaten?.reduce((n, r) => n + r.rijen, 0) ?? 0;

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
        <button type="button" className="btn btn-outline" onClick={run} disabled={busy}>
          {busy ? "Bezig…" : "Controleer content"}
        </button>
        {fout && <span style={{ fontSize: "var(--text-sm)" }}>Fout: {fout}</span>}
        {resultaten && !fout && (
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
            {totaal} rijen · {teZien.length === 0 ? "niets bijzonders" : "zie hieronder"}
          </span>
        )}
      </div>

      {teZien.length > 0 && (
        <div style={{ marginTop: "var(--space-4)", fontSize: "var(--text-sm)" }}>
          {teZien.map((r) => (
            <div key={r.type} style={{ marginBottom: "var(--space-4)" }}>
              <strong>{r.type}</strong>{" "}
              <span style={{ color: "var(--text-muted)" }}>
                — {r.rijen} rijen ({r.live} live, {r.concept} concept)
              </span>
              <ul style={{ margin: "6px 0 0", paddingLeft: "1.1em" }}>
                {r.aandacht.map((rij) => (
                  <li key={rij.slug} style={{ marginBottom: 4 }}>
                    <Regel rij={rij} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Regel({ rij }: { rij: ControleRij }) {
  const labels: string[] = [];
  if (rij.onbereikbaar) labels.push(rij.onbereikbaar);
  if (rij.eigen) labels.push("geen tegenhanger in de code");
  if (rij.fouten.length) {
    labels.push(`velden die niet passen: ${rij.fouten.map((f) => f.veld).join(", ")}`);
  }
  return (
    <>
      <code>{rij.slug}</code>
      {rij.status !== "live" && <span style={{ color: "var(--text-subtle)" }}> · concept</span>}
      <span style={{ color: "var(--text-muted)" }}> — {labels.join("; ")}</span>
    </>
  );
}
