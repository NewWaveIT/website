"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Mail, AlertTriangle, Check } from "lucide-react";
import { updateLead } from "@/app/admin/aanvragen/actions";
import { LEAD_STATUSSEN, STATUS_LABEL, type Lead } from "@/lib/cms/inzendingen-types";
import { Drawer, Statusbalk } from "@/components/admin/drawer";

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

  // Eigenaar-opties: de echte gebruikers, plus altijd de huidige waarde. Hier
  // stond een terugvallijst met vijf verzonnen voornamen; die kwamen op een
  // verse installatie gewoon in beeld alsof het collega's waren.
  const eigenaarOpties = (huidige: string | null) =>
    Array.from(new Set(["—", ...eigenaren, huidige].filter(Boolean))) as string[];

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

      <Drawer
        open={selected !== null}
        titel={selected?.naam ?? ""}
        subtitel={[selected?.bedrijf, selected?.email].filter(Boolean).join(" · ")}
        onClose={() => setSelectedId(null)}
        footer={
          <>
            <button type="button" className="btn btn-outline" onClick={() => setSelectedId(null)}>
              Sluiten
            </button>
            <a className="btn btn-primary" href={`mailto:${selected?.email}`}>
              <Mail /> Beantwoorden
            </a>
          </>
        }
      >
        {selected && (
          <>
            <Statusbalk
              label="Status"
              opties={LEAD_STATUSSEN}
              labels={STATUS_LABEL}
              waarde={selected.status}
              onKies={(status) => patch(selected.id, { status })}
            />
            <div className="fld">
              <span className="lbl">Bericht</span>
              <div className="ro">{selected.bericht}</div>
            </div>
            <div className="frow2">
              <div className="fld">
                <span className="lbl">Type / bron</span>
                <div className="ro">{selected.type}</div>
              </div>
              <div className="fld">
                <span className="lbl">Ontvangen</span>
                <div className="ro">{fmt(selected.created_at)}</div>
              </div>
            </div>
            <div className="fld">
              <label htmlFor="lead-eigenaar">Eigenaar</label>
              <select
                id="lead-eigenaar"
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
              {eigenaren.length === 0 && (
                <p className="t-sub">Nog geen gebruikers om aan toe te wijzen.</p>
              )}
            </div>
            <div className="fld">
              <label htmlFor="lead-notitie">Interne notitie</label>
              <textarea
                id="lead-notitie"
                key={selected.id}
                defaultValue={selected.interne_notitie ?? ""}
                placeholder="Interne notitie bij deze aanvraag…"
                onBlur={(e) => patch(selected.id, { interne_notitie: e.target.value })}
              />
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}
