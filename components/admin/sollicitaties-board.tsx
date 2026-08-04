"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X, Search, Calendar, AlertTriangle } from "lucide-react";
import { updateSollicitatie, getCvUrl } from "@/app/admin/sollicitaties/actions";
import { SOL_STATUSSEN, STATUS_LABEL, type Sollicitatie } from "@/lib/cms/inzendingen-types";
import { cn } from "@/lib/utils";

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      day: "numeric",
      month: "short",
    });
  } catch {
    return iso;
  }
}

export function SollicitatiesBoard({ sols }: { sols: Sollicitatie[] }) {
  const [items, setItems] = useState(sols);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();

  const selected = items.find((s) => s.id === selectedId) ?? null;
  const query = q.toLowerCase();

  // Foutmelding automatisch laten verdwijnen.
  useEffect(() => {
    if (!err) return;
    const t = setTimeout(() => setErr(null), 4000);
    return () => clearTimeout(t);
  }, [err]);

  async function openCv(path: string) {
    // Open synchroon een tab (voorkomt popup-blokkade) en vul 'm daarna met de
    // tijdelijke signed URL.
    const tab = window.open("", "_blank");
    const res = await getCvUrl(path);
    if (res.url && tab) {
      tab.location.href = res.url;
    } else {
      tab?.close();
      setErr(res.error || "Kon het cv niet openen.");
    }
  }

  function patch(id: string, p: Partial<Sollicitatie>) {
    const vorige = items;
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, ...p } : s)));
    startTransition(async () => {
      const res = await updateSollicitatie(id, p as never);
      if (!res?.ok) {
        setItems(vorige); // draai de optimistische wijziging terug
        setErr("Kon de wijziging niet opslaan. Probeer het opnieuw.");
        return;
      }
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
      <div className="toolbar">
        <div className="search">
          <Search />
          <input
            placeholder="Zoek kandidaat of vacature…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="pipe cols4">
        {SOL_STATUSSEN.map((st, i) => {
          const cards = items.filter(
            (s) =>
              s.status === st &&
              (s.naam.toLowerCase().includes(query) ||
                s.vacature_slug.toLowerCase().includes(query)),
          );
          return (
            <div className="pcol" key={st} data-first={i === 0} data-mid={i > 0 && i < 3}>
              <div className="phead">
                <span className="nm">{STATUS_LABEL[st]}</span>
                <span className="n">{cards.length}</span>
                <span className="bar" />
              </div>
              <div className="cards">
                {cards.map((s) => (
                  <button
                    type="button"
                    className="pcard"
                    key={s.id}
                    onClick={() => setSelectedId(s.id)}
                  >
                    <div className="who">{s.naam}</div>
                    <div className="what">{s.vacature_slug}</div>
                    <div className="meta">
                      <span className="src">{fmt(s.created_at)}</span>
                    </div>
                  </button>
                ))}
                {cards.length === 0 && <div className="empty">Leeg</div>}
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
                    {[selected.vacature_slug, selected.email].filter(Boolean).join(" · ")}
                  </div>
                </div>
                <button className="x" onClick={() => setSelectedId(null)} aria-label="Sluiten">
                  <X />
                </button>
              </div>
              <div className="dbody">
                <div className="fld">
                  <label>Fase</label>
                  <div className="statusbar">
                    {SOL_STATUSSEN.map((s) => (
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
                <div className="frow2">
                  <div className="fld">
                    <label>Ontvangen</label>
                    <div className="ro">{fmt(selected.created_at)}</div>
                  </div>
                  <div className="fld">
                    <label>CV</label>
                    <div className="ro">
                      {selected.cv_url ? (
                        <button
                          type="button"
                          className="linklike"
                          onClick={() => openCv(selected.cv_url as string)}
                        >
                          CV openen
                        </button>
                      ) : (
                        "—"
                      )}
                    </div>
                  </div>
                </div>
                {selected.telefoon && (
                  <div className="fld">
                    <label>Telefoon</label>
                    <div className="ro">{selected.telefoon}</div>
                  </div>
                )}
                {selected.motivatie && (
                  <div className="fld">
                    <label>Motivatie</label>
                    <div className="ro">{selected.motivatie}</div>
                  </div>
                )}
                <div className="fld">
                  <label>Interne notitie</label>
                  <textarea
                    defaultValue={selected.interne_notitie ?? ""}
                    placeholder="Notitie bij deze kandidaat…"
                    onBlur={(e) => patch(selected.id, { interne_notitie: e.target.value })}
                  />
                </div>
              </div>
              <div className="dfoot">
                <button className="btn btn-outline" onClick={() => setSelectedId(null)}>
                  Sluiten
                </button>
                <a className="btn btn-primary" href={`mailto:${selected.email}`}>
                  <Calendar /> Plan gesprek
                </a>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
