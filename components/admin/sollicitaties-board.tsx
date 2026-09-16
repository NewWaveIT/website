"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Calendar, AlertTriangle, Check } from "lucide-react";
import {
  deleteSollicitatie,
  updateSollicitatie,
  getCvUrl,
} from "@/app/admin/sollicitaties/actions";
import { SOL_STATUSSEN, STATUS_LABEL, type Sollicitatie } from "@/lib/cms/inzendingen-types";
import { Drawer, DrawerVoet, Statusbalk } from "@/components/admin/drawer";

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
  const searchParams = useSearchParams();
  // Opent de rij die de e-mailknop "Naar screening" meegeeft (?open=<id>);
  // alleen bij het eerste render gelezen, zodat een klik in de kolommen
  // daarna niet telkens wordt overschreven door de URL.
  const [selectedId, setSelectedId] = useState<string | null>(() => searchParams.get("open"));
  const [q, setQ] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [bezig, startTransition] = useTransition();
  const router = useRouter();

  const selected = items.find((s) => s.id === selectedId) ?? null;
  const query = q.toLowerCase();

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

  function verwijder(id: string) {
    const vorige = items;
    setItems((prev) => prev.filter((s) => s.id !== id));
    setSelectedId(null);
    startTransition(async () => {
      const res = await deleteSollicitatie(id);
      if (!res.ok) {
        setItems(vorige); // zet 'm terug; hij is niet echt weg
        setErr(res.error ?? "Kon de sollicitatie niet verwijderen.");
        return;
      }
      setOkMsg("Sollicitatie verwijderd, inclusief het cv.");
      router.refresh();
    });
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

      <Drawer
        open={selected !== null}
        titel={selected?.naam ?? ""}
        subtitel={[selected?.vacature_slug, selected?.email].filter(Boolean).join(" · ")}
        onClose={() => setSelectedId(null)}
        footer={
          <DrawerVoet
            wat={selected ? `De sollicitatie van ${selected.naam}` : "Deze sollicitatie"}
            bezig={bezig}
            onVerwijder={() => selected && verwijder(selected.id)}
            onSluit={() => setSelectedId(null)}
          >
            <a className="btn btn-primary" href={`mailto:${selected?.email}`}>
              <Calendar /> Plan gesprek
            </a>
          </DrawerVoet>
        }
      >
        {selected && (
          <>
            <Statusbalk
              label="Fase"
              opties={SOL_STATUSSEN}
              labels={STATUS_LABEL}
              waarde={selected.status}
              onKies={(status) => patch(selected.id, { status })}
            />
            <div className="frow2">
              <div className="fld">
                <span className="lbl">Ontvangen</span>
                <div className="ro">{fmt(selected.created_at)}</div>
              </div>
              <div className="fld">
                <span className="lbl">CV</span>
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
                <span className="lbl">Telefoon</span>
                <div className="ro">{selected.telefoon}</div>
              </div>
            )}
            {selected.motivatie && (
              <div className="fld">
                <span className="lbl">Motivatie</span>
                <div className="ro">{selected.motivatie}</div>
              </div>
            )}
            {selected.motivatie_url && (
              <div className="fld">
                <span className="lbl">Motivatie (bestand)</span>
                <div className="ro">
                  <button
                    type="button"
                    className="linklike"
                    onClick={() => openCv(selected.motivatie_url as string)}
                  >
                    Motivatie openen
                  </button>
                </div>
              </div>
            )}
            {selected.link_url && (
              <div className="fld">
                <span className="lbl">LinkedIn / portfolio</span>
                <div className="ro">
                  <a href={selected.link_url} target="_blank" rel="noopener noreferrer">
                    {selected.link_url}
                  </a>
                </div>
              </div>
            )}
            <div className="fld">
              <label htmlFor="sol-notitie">Interne notitie</label>
              <textarea
                id="sol-notitie"
                key={selected.id}
                defaultValue={selected.interne_notitie ?? ""}
                placeholder="Notitie bij deze kandidaat…"
                onBlur={(e) => patch(selected.id, { interne_notitie: e.target.value })}
              />
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}
