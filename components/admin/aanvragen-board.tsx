"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, AlertTriangle, Check } from "lucide-react";
import { updateLead } from "@/app/admin/aanvragen/actions";
import { LEAD_STATUSSEN, STATUS_LABEL, type Lead } from "@/lib/cms/inzendingen-types";
import { cn } from "@/lib/utils";

// Terugvallijst als er (nog) geen gebruikers uit de database komen.
const EIGENAREN_FALLBACK = ["Merel", "Ruben", "Fatima", "Sanne", "Mitchel"];

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function AanvragenBoard({ leads, eigenaren = [] }: { leads: Lead[]; eigenaren?: string[] }) {
  const [items, setItems] = useState(leads);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();

  const selected = items.find((l) => l.id === selectedId) ?? null;

  // Meldingen automatisch laten verdwijnen.
  useEffect(() => {
    if (!err) return;
    const t = setTimeout(() => setErr(null), 4000);
    return () => clearTimeout(t);
  }, [err]);
  useEffect(() => {
    if (!okMsg) return;
    const t = setTimeout(() => setOkMsg(null), 1800);
    return () => clearTimeout(t);
  }, [okMsg]);

  // Sluit de detail-drawer met Escape.
  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId]);

  // Eigenaar-opties: echte gebruikers (of terugval), plus altijd de huidige waarde.
  const eigenaarOpties = (huidige: string | null) =>
    Array.from(
      new Set(
        ["—", ...(eigenaren.length ? eigenaren : EIGENAREN_FALLBACK), huidige].filter(Boolean),
      ),
    ) as string[];

  function patch(id: string, p: Partial<Lead>) {
    const vorige = items;
    setItems((prev) => prev.map((l) => (l.id === id ? { ...l, ...p } : l)));
    startTransition(async () => {
      const res = await updateLead(id, p as never);
      if (!res?.ok) {
        setItems(vorige); // draai de optimistische wijziging terug
        setErr("Kon de wijziging niet opslaan. Probeer het opnieuw.");
        return;
      }
      setOkMsg("Opgeslagen.");
      router.refresh();
    });
  }

  return (
    <>
      {err && (
        <div className="toast err" role="alert">
          <AlertTriangle /> {err}
        </div>
      )}
      {okMsg && (
        <div className="toast ok" role="status">
          <Check /> {okMsg}
        </div>
      )}
      <div className="pipe">
        {LEAD_STATUSSEN.map((st, i) => {
          const cards = items.filter((l) => l.status === st);
          return (
            <div className="pcol" key={st} data-first={i === 0} data-mid={i === 1}>
              <div className="phead">
                <span className="nm">{STATUS_LABEL[st]}</span>
                <span className="n">{cards.length}</span>
                <span className="bar" />
              </div>
              <div className="cards">
                {cards.map((l) => (
                  <button
                    type="button"
                    className="pcard"
                    key={l.id}
                    onClick={() => setSelectedId(l.id)}
                  >
                    <div className="who">
                      {l.naam}
                      {l.bedrijf ? ` · ${l.bedrijf}` : ""}
                    </div>
                    <div className="what">
                      {l.bericht.length > 90 ? l.bericht.slice(0, 90) + "…" : l.bericht}
                    </div>
                    <div className="meta">
                      <span className="src">{l.type}</span>
                      <span>
                        {l.toegewezen_aan && l.toegewezen_aan !== "—"
                          ? `${l.toegewezen_aan} · `
                          : ""}
                        {fmt(l.created_at)}
                      </span>
                    </div>
                  </button>
                ))}
                {cards.length === 0 && <div className="empty">Geen aanvragen</div>}
              </div>
            </div>
          );
        })}
      </div>

      <div className={cn("drawer-wrap", selected && "open")}>
        <div className="overlay" onClick={() => setSelectedId(null)} />
        <aside className="drawer">
          {selected && (
            <>
              <div className="dhead">
                <div style={{ flex: 1 }}>
                  <h2>{selected.naam}</h2>
                  <div className="sub">
                    {[selected.bedrijf, selected.email].filter(Boolean).join(" · ")}
                  </div>
                </div>
                <button className="x" onClick={() => setSelectedId(null)} aria-label="Sluiten">
                  <X />
                </button>
              </div>
              <div className="dbody">
                <div className="fld">
                  <label>Status</label>
                  <div className="statusbar">
                    {LEAD_STATUSSEN.map((s) => (
                      <button
                        key={s}
                        className={cn(s === selected.status && "on")}
                        onClick={() => patch(selected.id, { status: s })}
                      >
                        {STATUS_LABEL[s]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="fld">
                  <label>Bericht</label>
                  <div className="ro">{selected.bericht}</div>
                </div>
                <div className="frow2">
                  <div className="fld">
                    <label>Type / bron</label>
                    <div className="ro">{selected.type}</div>
                  </div>
                  <div className="fld">
                    <label>Ontvangen</label>
                    <div className="ro">{fmt(selected.created_at)}</div>
                  </div>
                </div>
                <div className="fld">
                  <label>Eigenaar</label>
                  <select
                    value={selected.toegewezen_aan ?? "—"}
                    onChange={(e) =>
                      patch(selected.id, {
                        toegewezen_aan: e.target.value === "—" ? null : e.target.value,
                      })
                    }
                  >
                    {eigenaarOpties(selected.toegewezen_aan).map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="fld">
                  <label>Interne notitie</label>
                  <textarea
                    defaultValue={selected.interne_notitie ?? ""}
                    placeholder="Interne notitie bij deze aanvraag…"
                    onBlur={(e) => patch(selected.id, { interne_notitie: e.target.value })}
                  />
                </div>
              </div>
              <div className="dfoot">
                <button className="btn btn-outline" onClick={() => setSelectedId(null)}>
                  Sluiten
                </button>
                <a className="btn btn-primary" href={`mailto:${selected.email}`}>
                  <Mail /> Beantwoorden
                </a>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
