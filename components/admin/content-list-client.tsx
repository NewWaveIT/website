"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, Check, AlertTriangle, GripVertical } from "lucide-react";
import { reorderContent } from "@/app/admin/content/actions";
import type { ContentRow, ContentType } from "@/lib/cms/content";
import type { Facet } from "@/lib/cms/admin-lijst";

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
  orderable = false,
}: {
  type: ContentType;
  rows: ContentRow[];
  facets?: Facet[];
  orderable?: boolean;
}) {
  const [items, setItems] = useState<ContentRow[]>(rows);
  const [q, setQ] = useState("");
  const [statusF, setStatusF] = useState<"all" | "live" | "concept">("all");
  const [facetVal, setFacetVal] = useState<Record<string, string>>({});

  // Sleep-status voor het handmatig ordenen.
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const [toast, setToast] = useState<string | null>(null);
  const [toastErr, setToastErr] = useState<string | null>(null);

  // Bevestigings-toast na opslaan/verwijderen: de action redirect hierheen met
  // ?ok=… — we lezen 'm eenmalig, tonen 'm en halen 'm uit de URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ok = params.get("ok");
    if (!ok) return;
    // Leest de ?ok=…-query (extern systeem: de URL na een server-redirect) —
    // kan niet tijdens render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToast(
      ok === "aangemaakt"
        ? "Item aangemaakt."
        : ok === "verwijderd"
          ? "Item verwijderd."
          : "Wijzigingen opgeslagen.",
    );
    params.delete("ok");
    const qs = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : ""));
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (!toastErr) return;
    const t = setTimeout(() => setToastErr(null), 4000);
    return () => clearTimeout(t);
  }, [toastErr]);

  // Alleen facetten tonen die daadwerkelijk waarden hebben in de rijen.
  const facetOptions = useMemo(
    () =>
      facets
        .map((f) => ({
          ...f,
          options: Array.from(new Set(items.map((r) => val(r, f.key)).filter(Boolean))).sort(
            (a, b) => a.localeCompare(b, "nl"),
          ),
        }))
        .filter((f) => f.options.length > 0),
    [items, facets],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((r) => {
      if (statusF !== "all" && r.status !== statusF) return false;
      for (const f of facets) {
        const v = facetVal[f.key];
        if (v && val(r, f.key) !== v) return false;
      }
      if (needle && !`${r.titel} ${r.slug}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [items, q, statusF, facetVal, facets]);

  const active = statusF !== "all" || q.trim() !== "" || Object.values(facetVal).some(Boolean);
  const reset = () => {
    setQ("");
    setStatusF("all");
    setFacetVal({});
  };

  // Sorteren kan alleen op de volledige, ongefilterde lijst.
  const dragEnabled = orderable && !active && items.length > 1;
  const cols = dragEnabled ? 4 : 3;

  async function handleDrop(targetId: string) {
    const id = dragId;
    setDragId(null);
    setOverId(null);
    if (!id || id === targetId) return;
    const from = items.findIndex((i) => i.id === id);
    const to = items.findIndex((i) => i.id === targetId);
    if (from < 0 || to < 0) return;

    const vorige = items;
    const next = items.slice();
    const [moved] = next.splice(from, 1);
    if (!moved) return;
    next.splice(to, 0, moved);
    setItems(next);

    try {
      const res = await reorderContent(
        type,
        next.map((i) => i.id),
      );
      if (!res?.ok) {
        setItems(vorige);
        setToastErr("Volgorde kon niet worden opgeslagen.");
      } else {
        setToast("Volgorde opgeslagen.");
      }
    } catch {
      setItems(vorige);
      setToastErr("Volgorde kon niet worden opgeslagen.");
    }
  }

  return (
    <>
      {toast && (
        <div className="toast ok" role="status">
          <Check /> {toast}
        </div>
      )}
      {toastErr && (
        <div className="toast err" role="alert">
          <AlertTriangle /> {toastErr}
        </div>
      )}
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

        <select
          className="tsel"
          value={statusF}
          onChange={(e) => setStatusF(e.target.value as typeof statusF)}
          aria-label="Status"
        >
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
        <span className="tcount">
          {filtered.length} van {items.length}
        </span>
      </div>

      {orderable && active && (
        <p className="reorder-hint">Wis de filters om de volgorde te kunnen aanpassen.</p>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              {dragEnabled && <th aria-hidden="true" style={{ width: 36 }} />}
              <th>Titel</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Laatst bewerkt</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.id}
                className={`clickable${dragId === r.id ? " dragging" : ""}${
                  overId === r.id ? " drop-target" : ""
                }`}
                draggable={dragEnabled}
                onDragStart={dragEnabled ? () => setDragId(r.id) : undefined}
                onDragOver={
                  dragEnabled
                    ? (e) => {
                        e.preventDefault();
                        if (dragId && overId !== r.id) setOverId(r.id);
                      }
                    : undefined
                }
                onDragLeave={
                  dragEnabled ? () => setOverId((cur) => (cur === r.id ? null : cur)) : undefined
                }
                onDrop={dragEnabled ? () => handleDrop(r.id) : undefined}
                onDragEnd={
                  dragEnabled
                    ? () => {
                        setDragId(null);
                        setOverId(null);
                      }
                    : undefined
                }
              >
                {dragEnabled && (
                  <td className="t-grip-cell" aria-hidden="true">
                    <GripVertical className="t-grip" />
                  </td>
                )}
                <td>
                  <Link
                    href={`/admin/content/${type}/${r.id}`}
                    className="t-title"
                    draggable={false}
                  >
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

            {items.length > 0 && filtered.length === 0 && (
              <tr>
                <td colSpan={cols}>
                  <div className="empty">Geen resultaten voor deze filters.</div>
                </td>
              </tr>
            )}

            {items.length === 0 && (
              <tr>
                <td colSpan={cols}>
                  <div className="empty">
                    Nog geen items. Klik op ‘Nieuw’ om er een aan te maken, of ga naar het{" "}
                    <Link
                      href="/admin"
                      style={{ color: "var(--color-primary)", fontWeight: "var(--fw-semibold)" }}
                    >
                      dashboard
                    </Link>{" "}
                    en klik op ‘Importeer bestaande content’ om de huidige website-content in te
                    laden.
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
