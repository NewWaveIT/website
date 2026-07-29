"use client";

import { useActionState, useEffect, useState } from "react";
import { Plus, Pencil, Ban, RotateCcw } from "lucide-react";
import { Modal } from "./modal";
import {
  createGebruiker,
  updateGebruiker,
  setActief,
  type GebruikerState,
} from "@/app/admin/gebruikers/actions";
import type { Gebruiker } from "@/lib/cms/gebruikers";

function fmtDateTime(iso: string | null): string {
  if (!iso) return "Nog niet ingelogd";
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

/** Formulier voor aanmaken/bewerken; buttons zitten in het formulier (submit werkt). */
function GebruikerForm({
  mode,
  user,
  onCancel,
  onDone,
}: {
  mode: "new" | "edit";
  user?: Gebruiker;
  onCancel: () => void;
  onDone: () => void;
}) {
  const action = mode === "new" ? createGebruiker : updateGebruiker;
  const [state, formAction, pending] = useActionState<GebruikerState, FormData>(action, {});

  useEffect(() => {
    if (state.ok) onDone();
  }, [state.ok, onDone]);

  return (
    <form action={formAction}>
      {mode === "edit" && user && <input type="hidden" name="id" value={user.id} />}
      {state.error && (
        <div className="err" style={{ marginBottom: "var(--space-4)" }}>
          {state.error}
        </div>
      )}

      <div className="fld">
        <label htmlFor="g-naam">Naam</label>
        <input id="g-naam" name="naam" type="text" defaultValue={user?.naam ?? ""} required autoFocus />
      </div>

      <div className="fld">
        <label htmlFor="g-email">E-mailadres</label>
        {mode === "new" ? (
          <input id="g-email" name="email" type="email" required placeholder="naam@thenewwaveit.com" />
        ) : (
          <div className="ce-perma">
            <code>{user?.email}</code>
          </div>
        )}
      </div>

      <div className="fld" style={{ marginBottom: "var(--space-5)" }}>
        <label htmlFor="g-pw">{mode === "new" ? "Beginwachtwoord" : "Nieuw wachtwoord"}</label>
        <input id="g-pw" name="wachtwoord" type="text" autoComplete="off" placeholder="Minimaal 8 tekens" required={mode === "new"} />
        <p className="t-sub" style={{ marginTop: 6 }}>
          {mode === "new"
            ? "De gebruiker kan dit later zelf wijzigen. Deel het veilig."
            : "Laat leeg om het huidige wachtwoord te behouden."}
        </p>
      </div>

      <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "flex-end" }}>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Annuleren
        </button>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Opslaan…" : mode === "new" ? "Aanmaken" : "Opslaan"}
        </button>
      </div>
    </form>
  );
}

export function GebruikersBeheer({
  gebruikers,
  currentUserId,
}: {
  gebruikers: Gebruiker[];
  currentUserId: string;
}) {
  const [modal, setModal] = useState<{ mode: "new" } | { mode: "edit"; user: Gebruiker } | null>(null);
  const close = () => setModal(null);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Gebruikers</h1>
          <p className="sub">Beheer wie toegang heeft tot het CMS en zie de laatste login.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setModal({ mode: "new" })}>
          <Plus /> Nieuwe gebruiker
        </button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Naam</th>
              <th>E-mail</th>
              <th>Laatste login</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Acties</th>
            </tr>
          </thead>
          <tbody>
            {gebruikers.map((u) => {
              const self = u.id === currentUserId;
              return (
                <tr key={u.id}>
                  <td>
                    <div className="t-title">
                      {u.naam}
                      {self && <span className="t-sub" style={{ marginLeft: 8 }}>(jij)</span>}
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>{fmtDateTime(u.laatsteLogin)}</td>
                  <td>
                    <span className={`chip ${u.actief ? "live" : "concept"}`}>
                      <span className="dot" />
                      {u.actief ? "Actief" : "Gedeactiveerd"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        className="btn btn-outline iconbtn"
                        aria-label={`Bewerk ${u.naam}`}
                        title="Bewerken"
                        onClick={() => setModal({ mode: "edit", user: u })}
                      >
                        <Pencil />
                      </button>
                      {!self && (
                        <form action={setActief}>
                          <input type="hidden" name="id" value={u.id} />
                          <input type="hidden" name="actief" value={u.actief ? "false" : "true"} />
                          <button
                            type="submit"
                            className="btn btn-outline iconbtn"
                            style={u.actief ? { color: "var(--danger-500)" } : undefined}
                            aria-label={u.actief ? `Deactiveer ${u.naam}` : `Activeer ${u.naam}`}
                            title={u.actief ? "Deactiveren" : "Activeren"}
                          >
                            {u.actief ? <Ban /> : <RotateCcw />}
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {gebruikers.length === 0 && (
              <tr>
                <td colSpan={5}>
                  <div className="empty">Nog geen gebruikers.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          title={modal.mode === "new" ? "Nieuwe gebruiker" : "Gebruiker bewerken"}
          onClose={close}
        >
          <GebruikerForm
            mode={modal.mode}
            user={modal.mode === "edit" ? modal.user : undefined}
            onCancel={close}
            onDone={close}
          />
        </Modal>
      )}
    </>
  );
}
