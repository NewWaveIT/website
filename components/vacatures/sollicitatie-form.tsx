"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Check, Upload } from "lucide-react";
import {
  submitSollicitatie,
  type SollicitatieState,
} from "@/app/(marketing)/vacatures/[slug]/actions";
import "./sollicitatie-form.css";

export interface SolTeksten {
  solKnop: string;
  solKnopBezig: string;
  solBedankt: string;
  solVeldNaam: string;
  solHintNaam: string;
  solVeldEmail: string;
  solHintEmail: string;
  solVeldTelefoon: string;
  solHintTelefoon: string;
  solVeldMotivatieBestand: string;
  solBijMotivatieBestand: string;
  solVeldCv: string;
  solBijCv: string;
  solVeldLink: string;
  solBijLink: string;
  solHintLink: string;
  solLinkUitleg: string;
  solOptioneel: string;
  solPrivacyTekst: string;
  solPrivacyLink: string;
}

const DOC_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const initial: SollicitatieState = { ok: false, message: "" };

function SubmitButton({ knop, bezig }: { knop: string; bezig: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? bezig : knop} <ArrowRight />
    </button>
  );
}

/** Bestandsveld met een eigen knop in plaats van de rommelige browserstandaard. */
function FileField({
  id,
  name,
  label,
  bij,
  error,
}: {
  id: string;
  name: string;
  label: string;
  bij?: string;
  error?: string;
}) {
  const [bestandsnaam, setBestandsnaam] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const errId = `${id}-err`;

  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {bij && <span className="veld-optioneel">{bij}</span>}
      </label>
      <div className={`file-kiezer${error ? " heeft-fout" : ""}`}>
        <button
          type="button"
          className="btn btn-outline file-knop"
          onClick={() => inputRef.current?.click()}
        >
          <Upload /> Bestand kiezen
        </button>
        <span className={`file-naam${bestandsnaam ? "" : " is-leeg"}`}>
          {bestandsnaam || "Nog geen bestand gekozen"}
        </span>
      </div>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        required
        accept={DOC_ACCEPT}
        className="file-input-verborgen"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => setBestandsnaam(e.target.files?.[0]?.name ?? "")}
      />
      {error && (
        <p className="field-err" id={errId}>
          {error}
        </p>
      )}
    </div>
  );
}

export function SollicitatieForm({
  vacatureSlug,
  vacatureTitel,
  tk,
  heading = "Solliciteren? Zo gepiept.",
  intro = "Naam, e-mail, je cv en een motivatiebrief: dan kunnen we aan de slag. We lezen elke sollicitatie zelf.",
}: {
  vacatureSlug: string;
  vacatureTitel: string;
  tk: SolTeksten;
  heading?: string;
  intro?: string;
}) {
  const [state, formAction] = useActionState(submitSollicitatie, initial);
  const err = (k: string) => state.errors?.[k];

  // Bij validatiefouten: focus op het eerste gemarkeerde veld.
  useEffect(() => {
    if (state.errors && Object.keys(state.errors).length > 0) {
      const first = document.querySelector<HTMLElement>('.sol-form [aria-invalid="true"]');
      first?.focus();
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state]);

  if (state.ok) {
    return (
      <div className="sol-done" role="status">
        <div className="sol-done-ic" aria-hidden="true">
          <Check />
        </div>
        <h3>{tk.solBedankt}</h3>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form className="sol-form" action={formAction} noValidate>
      <h3>{heading}</h3>
      <p className="sol-sub">{intro}</p>

      <input type="hidden" name="vacature_slug" value={vacatureSlug} />
      <input type="hidden" name="vacature_titel" value={vacatureTitel} />
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hp"
      />

      <div className="field">
        <label htmlFor="s-naam">{tk.solVeldNaam}</label>
        <input
          id="s-naam"
          name="naam"
          type="text"
          placeholder={tk.solHintNaam}
          required
          aria-invalid={err("naam") ? true : undefined}
          aria-describedby={err("naam") ? "serr-naam" : undefined}
        />
        {err("naam") && (
          <p className="field-err" id="serr-naam">
            {err("naam")}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="s-mail">{tk.solVeldEmail}</label>
        <input
          id="s-mail"
          name="email"
          type="email"
          placeholder={tk.solHintEmail}
          required
          aria-invalid={err("email") ? true : undefined}
          aria-describedby={err("email") ? "serr-mail" : undefined}
        />
        {err("email") && (
          <p className="field-err" id="serr-mail">
            {err("email")}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="s-tel">
          {tk.solVeldTelefoon} <span className="veld-optioneel">{tk.solOptioneel}</span>
        </label>
        <input
          id="s-tel"
          name="telefoon"
          type="tel"
          placeholder={tk.solHintTelefoon}
          aria-invalid={err("telefoon") ? true : undefined}
          aria-describedby={err("telefoon") ? "serr-tel" : undefined}
        />
        {err("telefoon") && (
          <p className="field-err" id="serr-tel">
            {err("telefoon")}
          </p>
        )}
      </div>

      <FileField id="s-cv" name="cv" label={tk.solVeldCv} bij={tk.solBijCv} error={err("cv")} />

      <FileField
        id="s-mot-file"
        name="motivatie_bestand"
        label={tk.solVeldMotivatieBestand}
        bij={tk.solBijMotivatieBestand}
        error={err("motivatie_bestand")}
      />

      <div className="field">
        <label htmlFor="s-link">
          {tk.solVeldLink} <span className="veld-optioneel">{tk.solBijLink}</span>
        </label>
        <input
          id="s-link"
          name="link"
          type="url"
          inputMode="url"
          placeholder={tk.solHintLink}
          aria-invalid={err("link") ? true : undefined}
          aria-describedby={err("link") ? "serr-link" : "s-link-help"}
        />
        {err("link") ? (
          <p className="field-err" id="serr-link">
            {err("link")}
          </p>
        ) : (
          <p className="field-help" id="s-link-help">
            {tk.solLinkUitleg}
          </p>
        )}
      </div>

      <SubmitButton knop={tk.solKnop} bezig={tk.solKnopBezig} />

      {state.message && !state.ok && (
        <p className="form-status err" role="alert">
          {state.message}
        </p>
      )}

      <p className="sol-privacy">
        {tk.solPrivacyTekst} <a href="/privacy">{tk.solPrivacyLink}</a>.
      </p>
    </form>
  );
}
