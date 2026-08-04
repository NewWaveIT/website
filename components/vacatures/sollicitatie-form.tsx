"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Check } from "lucide-react";
import {
  submitSollicitatie,
  type SollicitatieState,
} from "@/app/(marketing)/vacatures/[slug]/actions";

const initial: SollicitatieState = { ok: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Versturen…" : "Verstuur sollicitatie"} <ArrowRight />
    </button>
  );
}

export function SollicitatieForm({
  vacatureSlug,
  vacatureTitel,
}: {
  vacatureSlug: string;
  vacatureTitel: string;
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
        <h3>Bedankt voor je sollicitatie!</h3>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form className="sol-form" action={formAction} noValidate>
      <h3>Solliciteer op deze rol</h3>
      <p className="sol-sub">
        Laat je gegevens achter — een cv of LinkedIn is genoeg, geen brief nodig.
      </p>

      <input type="hidden" name="vacature_slug" value={vacatureSlug} />
      <input type="hidden" name="vacature_titel" value={vacatureTitel} />
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />

      <div className="field">
        <label htmlFor="s-naam">Naam</label>
        <input
          id="s-naam"
          name="naam"
          type="text"
          placeholder="Jouw naam"
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
        <label htmlFor="s-mail">E-mailadres</label>
        <input
          id="s-mail"
          name="email"
          type="email"
          placeholder="naam@voorbeeld.nl"
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
          Telefoon{" "}
          <span style={{ fontWeight: "var(--fw-regular)", color: "var(--text-subtle)" }}>
            (optioneel)
          </span>
        </label>
        <input
          id="s-tel"
          name="telefoon"
          type="tel"
          placeholder="06–12345678"
          aria-invalid={err("telefoon") ? true : undefined}
          aria-describedby={err("telefoon") ? "serr-tel" : undefined}
        />
        {err("telefoon") && (
          <p className="field-err" id="serr-tel">
            {err("telefoon")}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="s-mot">
          Motivatie{" "}
          <span style={{ fontWeight: "var(--fw-regular)", color: "var(--text-subtle)" }}>
            (optioneel)
          </span>
        </label>
        <textarea
          id="s-mot"
          name="motivatie"
          placeholder="Vertel kort waarom deze rol je aanspreekt. Een LinkedIn- of portfolio-link mag ook."
          aria-invalid={err("motivatie") ? true : undefined}
          aria-describedby={err("motivatie") ? "serr-mot" : undefined}
        />
        {err("motivatie") && (
          <p className="field-err" id="serr-mot">
            {err("motivatie")}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="s-cv">
          Cv{" "}
          <span style={{ fontWeight: "var(--fw-regular)", color: "var(--text-subtle)" }}>
            (optioneel · pdf of Word, max. 8 MB)
          </span>
        </label>
        <input
          id="s-cv"
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          aria-invalid={err("cv") ? true : undefined}
          aria-describedby={err("cv") ? "serr-cv" : undefined}
        />
        {err("cv") && (
          <p className="field-err" id="serr-cv">
            {err("cv")}
          </p>
        )}
      </div>

      <SubmitButton />

      {state.message && !state.ok && (
        <p className="form-status err" role="alert">
          {state.message}
        </p>
      )}

      <p className="sol-privacy">
        We gebruiken je gegevens alleen voor deze sollicitatie. Zie ons{" "}
        <a href="/privacy">privacybeleid</a>.
      </p>
    </form>
  );
}
