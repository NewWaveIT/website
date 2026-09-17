"use client";

import { useEffect, useState, useTransition } from "react";
import { AlertTriangle, Check, Trash2 } from "lucide-react";
import { deleteLead } from "@/app/admin/aanvragen/actions";
import type { InzichtenLead } from "@/lib/cms/inzendingen-types";

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

/** Platte lijst i.p.v. een pijplijnbord zoals Aanvragen/Sollicitaties: een
 *  nieuwsbrief-aanmelding heeft geen status om te doorlopen, alleen een
 *  e-mailadres en een datum. */
export function NieuwsbriefLijst({ leads }: { leads: InzichtenLead[] }) {
  const [items, setItems] = useState(leads);
  const [vraagId, setVraagId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [bezig, startTransition] = useTransition();

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

  function verwijder(id: string) {
    const vorige = items;
    setItems((prev) => prev.filter((l) => l.id !== id));
    setVraagId(null);
    startTransition(async () => {
      const res = await deleteLead(id);
      if (!res.ok) {
        setItems(vorige); // zet 'm terug; hij is niet echt weg
        setErr(res.error ?? "Kon de aanmelding niet verwijderen.");
        return;
      }
      setOkMsg("Aanmelding verwijderd.");
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
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>E-mail</th>
              <th className="t-rechts">Aangemeld op</th>
              <th className="t-grip-cell">
                <span className="sr-only">Acties</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((l) => (
              <tr key={l.id}>
                <td>
                  <a href={`mailto:${l.email}`} className="t-title">
                    {l.email}
                  </a>
                </td>
                <td className="t-rechts">{fmt(l.created_at)}</td>
                <td className="t-rechts">
                  {vraagId === l.id ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-outline"
                        disabled={bezig}
                        onClick={() => setVraagId(null)}
                      >
                        Annuleren
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn-danger"
                        disabled={bezig}
                        onClick={() => verwijder(l.id)}
                      >
                        {bezig ? "Bezig…" : "Verwijderen"}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="linklike"
                      onClick={() => setVraagId(l.id)}
                      aria-label={`Aanmelding van ${l.email} verwijderen`}
                    >
                      <Trash2 />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={3}>
                  <div className="empty">Nog geen aanmeldingen.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
