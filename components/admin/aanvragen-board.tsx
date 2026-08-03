"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X, Mail } from "lucide-react";
import { updateLead } from "@/app/admin/aanvragen/actions";
import { LEAD_STATUSSEN, STATUS_LABEL, type Lead } from "@/lib/cms/inzendingen-types";
import { cn } from "@/lib/utils";

const EIGENAREN = ["—", "Merel", "Ruben", "Fatima", "Sanne", "Mitchel"];

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

export function AanvragenBoard({ leads }: { leads: Lead[] }) {
  const [items, setItems] = useState(leads);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();

  const selected = items.find((l) => l.id === selectedId) ?? null;

  function patch(id: string, p: Partial<Lead>) {
    setItems((prev) => prev.map((l) => (l.id === id ? { ...l, ...p } : l)));
    startTransition(async () => {
      await updateLead(id, p as never);
      router.refresh();
    });
  }

  return (
    <>
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
                    {EIGENAREN.map((o) => (
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
