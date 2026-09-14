"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, Check, AlertTriangle, GripVertical } from "lucide-react";
import { reorderContent } from "@/app/admin/content/actions";
import type { ContentRow, ContentType } from "@/lib/cms/content";
import type { Facet } from "@/lib/cms/admin-lijst";
import { useOkMelding } from "@/lib/hooks/use-ok-melding";

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

  const greepHintId = useId();
  const [toast, setToast] = useOkMelding();
  const [toastErr, setToastErr] = useState<string | null>(null);

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

  /** Verplaatst één rij van `from` naar `to` en bewaart de nieuwe volgorde. */
  async function verplaats(from: number, to: number, melding: (positie: number) => string) {
    if (from < 0 || to < 0 || from === to || to >= items.length) return;

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
        setToast(melding(to + 1));
      }
    } catch {
      setItems(vorige);
      setToastErr("Volgorde kon niet worden opgeslagen.");
    }
  }

  function handleDrop(targetId: string) {
    const id = dragId;
    setDragId(null);
    setOverId(null);
    if (!id || id === targetId) return;
    void verplaats(
      items.findIndex((i) => i.id === id),
      items.findIndex((i) => i.id === targetId),
      () => "Volgorde opgeslagen.",
    );
  }

  /**
   * Slepen is met een muis prima en met een toetsenbord onmogelijk: de HTML5
   * drag-and-drop-API kent geen toetsenbordequivalent. De greep is daarom een
   * knop, en pijltje omhoog/omlaag verzet de rij één plek. De bevestiging noemt
   * de nieuwe positie, want anders hoort een schermlezergebruiker alleen dat er
   * íets is opgeslagen.
   */
  function opGreepToets(e: React.KeyboardEvent<HTMLButtonElement>, index: number, titel: string) {
    const stap = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0;
    if (stap === 0) return;
    e.preventDefault();
    // React verplaatst de <tr> met `insertBefore`, en daar raakt de browser de
    // focus bij kwijt. De knop zelf is hetzelfde DOM-element gebleven, dus na
    // de commit kunnen we 'm gewoon terugzetten — anders staat de gebruiker na
    // één pijltje weer bovenaan de pagina.
    const greep = e.currentTarget;
    void verplaats(index, index + stap, (positie) => `${titel} staat nu op plek ${positie}.`);
    requestAnimationFrame(() => greep.focus());
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
      {dragEnabled && (
        <p className="reorder-hint" id={greepHintId}>
          Sleep een rij aan het greepje om de volgorde te wijzigen, of zet de focus op een greepje
          en gebruik de pijltjes omhoog en omlaag.
        </p>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              {dragEnabled && (
                <th className="t-grip-cell">
                  <span className="sr-only">Volgorde</span>
                </th>
              )}
              <th>Titel</th>
              <th>Status</th>
              <th className="t-rechts">Laatst bewerkt</th>
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
                  <td className="t-grip-cell">
                    <button
                      type="button"
                      className="t-grip-btn"
                      aria-label={`Verplaats ${r.titel}`}
                      aria-describedby={greepHintId}
                      onKeyDown={(e) => opGreepToets(e, items.indexOf(r), r.titel)}
                    >
                      <GripVertical className="t-grip" />
                    </button>
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
                <td className="t-rechts">
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
                    <Link href="/admin" className="tekstlink">
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
