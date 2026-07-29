"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { ContentRow, ContentType } from "@/lib/cms/content";

export type Facet = { key: string; label: string };

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

function val(row: ContentRow, key: string): string {
  const v = (row.data as Record<string, unknown>)?.[key];
  return typeof v === "string" ? v : "";
}

export function ContentListClient({
  type,
  rows,
  facets = [],
}: {
  type: ContentType;
  rows: ContentRow[];
  facets?: Facet[];
}) {
  const [q, setQ] = useState("");
  const [statusF, setStatusF] = useState<"all" | "live" | "concept">("all");
  const [facetVal, setFacetVal] = useState<Record<string, string>>({});

  // Alleen facetten tonen die daadwerkelijk waarden hebben in de rijen.
  const facetOptions = useMemo(
    () =>
      facets
        .map((f) => ({
          ...f,
          options: Array.from(new Set(rows.map((r) => val(r, f.key)).filter(Boolean))).sort((a, b) =>
            a.localeCompare(b, "nl"),
          ),
        }))
        .filter((f) => f.options.length > 0),
    [rows, facets],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusF !== "all" && r.status !== statusF) return false;
      for (const f of facets) {
        const v = facetVal[f.key];
        if (v && val(r, f.key) !== v) return false;
      }
      if (needle && !`${r.titel} ${r.slug}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [rows, q, statusF, facetVal, facets]);

  const active = statusF !== "all" || q.trim() !== "" || Object.values(facetVal).some(Boolean);
  const reset = () => {
    setQ("");
    setStatusF("all");
    setFacetVal({});
  };

  return (
    <>
      <div className="toolbar">
        <div className="search">
          <Search />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Zoek op titel of webadres…"
            aria-label="Zoeken"
          />
        </div>

        <select className="tsel" value={statusF} onChange={(e) => setStatusF(e.target.value as typeof statusF)} aria-label="Status">
          <option value="all">Alle statussen</option>
          <option value="live">Live</option>
          <option value="concept">Concept</option>
        </select>

        {facetOptions.map((f) => (
          <select
            key={f.key}
            className="tsel"
            value={facetVal[f.key] ?? ""}
            onChange={(e) => setFacetVal((prev) => ({ ...prev, [f.key]: e.target.value }))}
            aria-label={f.label}
          >
            <option value="">Alle {f.label.toLowerCase()}</option>
            {f.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ))}

        {active && (
          <button type="button" className="tsel-reset" onClick={reset}>
            <X /> Wis filters
          </button>
        )}
        <span className="tcount">{filtered.length} van {rows.length}</span>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Titel</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Laatst bewerkt</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="clickable">
                <td>
                  <Link href={`/admin/content/${type}/${r.id}`} className="t-title">
                    {r.titel}
                  </Link>
                  <div className="t-sub">/{r.slug}</div>
                </td>
                <td>
                  <span className={`chip ${r.status === "live" ? "live" : "concept"}`}>
                    <span className="dot" />
                    {r.status === "live" ? "Live" : "Concept"}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  {fmt(r.bijgewerkt_op)}
                  {r.bewerkt_door ? ` · ${r.bewerkt_door}` : ""}
                </td>
              </tr>
            ))}

            {rows.length > 0 && filtered.length === 0 && (
              <tr>
                <td colSpan={3}>
                  <div className="empty">Geen resultaten voor deze filters.</div>
                </td>
              </tr>
            )}

            {rows.length === 0 && (
              <tr>
                <td colSpan={3}>
                  <div className="empty">
                    Nog geen items. Klik op ‘Nieuw’ om er een aan te maken — of ga naar het{" "}
                    <Link href="/admin" style={{ color: "var(--color-primary)", fontWeight: "var(--fw-semibold)" }}>
                      dashboard
                    </Link>{" "}
                    en klik op ‘Importeer bestaande content’ om de huidige website-content in te laden.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
