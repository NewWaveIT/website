"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight } from "lucide-react";
import { submitContact, type ContactState } from "@/app/(marketing)/contact/actions";

const initial: ContactState = { ok: false, message: "" };

const SECTOREN = [
  "Publieke sector",
  "Mobiliteit",
  "Banken",
  "Zorg",
  "Manufacturing",
  "Anders",
];
const ONDERWERPEN = [
  "Mendix / applicaties",
  "AI",
  "Digitale strategie",
  "Weet ik nog niet",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Versturen…" : "Plan het gesprek"} <ArrowRight />
    </button>
  );
}

export function ContactForm({ type = "strategiegesprek" }: { type?: string }) {
  const [state, formAction] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="form-card">
        <h2>Bedankt!</h2>
        <p className="form-status ok" role="status">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form className="form-card" action={formAction}>
      <h2>Plan een strategiegesprek</h2>
      <p className="sub">
        Vertel kort waar je vraagstuk over gaat, we reageren binnen één werkdag
        met een voorstel voor datum en deelnemers.
      </p>

      <input type="hidden" name="type" value={type} />
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />

      <div className="frow2">
        <div className="field">
          <label htmlFor="f-naam">Naam</label>
          <input id="f-naam" name="naam" type="text" placeholder="Jouw naam" required />
        </div>
        <div className="field">
          <label htmlFor="f-mail">Zakelijk e-mailadres</label>
          <input
            id="f-mail"
            name="email"
            type="email"
            placeholder="naam@organisatie.nl"
            required
          />
        </div>
      </div>

      <div className="frow2">
        <div className="field">
          <label htmlFor="f-org">Organisatie</label>
          <input
            id="f-org"
            name="organisatie"
            type="text"
            placeholder="Naam van je organisatie"
          />
        </div>
        <div className="field">
          <label htmlFor="f-rol">Jouw rol</label>
          <input
            id="f-rol"
            name="rol"
            type="text"
            placeholder="Bijv. CIO, manager uitvoering"
          />
        </div>
      </div>

      <div className="field">
        <label>In welke sector werk je?</label>
        <div className="chips">
          {SECTOREN.map((s) => (
            <label className="chip" key={s}>
              <input type="radio" name="sector" value={s} />
              {s}
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Waar gaat je vraagstuk over?</label>
        <div className="chips">
          {ONDERWERPEN.map((o) => (
            <label className="chip" key={o}>
              <input type="checkbox" name="onderwerp" value={o} />
              {o}
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-msg">
          Toelichting{" "}
          <span style={{ fontWeight: "var(--fw-regular)", color: "var(--text-subtle)" }}>
            (optioneel)
          </span>
        </label>
        <textarea
          id="f-msg"
          name="toelichting"
          placeholder="Wat speelt er? Een paar zinnen is genoeg."
        />
      </div>

      <SubmitButton />

      {state.message && !state.ok && (
        <p className="form-status err" role="alert">
          {state.message}
        </p>
      )}

      <p className="privacy">
        We gebruiken je gegevens alleen om dit gesprek te plannen. Geen
        nieuwsbrief, geen belrondes.
      </p>
    </form>
  );
}
