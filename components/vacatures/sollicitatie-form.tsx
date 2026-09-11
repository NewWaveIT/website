"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Check } from "lucide-react";
import {
  submitSollicitatie,
  type SollicitatieState,
} from "@/app/(marketing)/vacatures/[slug]/actions";
import "./sollicitatie-form.css";

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
  heading = "Solliciteren? Zo gepiept.",
  intro = "Naam en e-mail is genoeg om te beginnen. Voeg toe wat je makkelijk bij de hand hebt; een motivatiebrief hoeft niet. We lezen elke sollicitatie zelf.",
}: {
  vacatureSlug: string;
  vacatureTitel: string;
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
        <h3>Bedankt voor je sollicitatie!</h3>
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
          Telefoon <span className="veld-optioneel">(optioneel)</span>
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
          Motivatie <span className="veld-optioneel">(optioneel)</span>
        </label>
        <textarea
          id="s-mot"
          name="motivatie"
          placeholder="Een paar zinnen waarom deze rol je aanspreekt is genoeg. Wat je écht leuk lijkt, hoe je bij ons terechtkwam: zeg het op je eigen manier."
          aria-invalid={err("motivatie") ? true : undefined}
          aria-describedby={err("motivatie") ? "serr-mot" : "s-mot-help"}
        />
        {err("motivatie") ? (
          <p className="field-err" id="serr-mot">
            {err("motivatie")}
          </p>
        ) : (
          <p className="field-help" id="s-mot-help">
            Liever niet typen? Upload je motivatie hieronder als bestand. Allebei mag, geen van
            beide moet.
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="s-mot-file">
          Motivatie als bestand <span className="veld-optioneel">(optioneel · pdf of Word)</span>
        </label>
        <input
          id="s-mot-file"
          name="motivatie_bestand"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          aria-invalid={err("motivatie_bestand") ? true : undefined}
          aria-describedby={err("motivatie_bestand") ? "serr-motfile" : undefined}
        />
        {err("motivatie_bestand") && (
          <p className="field-err" id="serr-motfile">
            {err("motivatie_bestand")}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="s-cv">
          Je cv <span className="veld-optioneel">(optioneel · pdf of Word, max. 8 MB)</span>
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

      <div className="field">
        <label htmlFor="s-link">
          LinkedIn of portfolio <span className="veld-optioneel">(optioneel)</span>
        </label>
        <input
          id="s-link"
          name="link"
          type="url"
          inputMode="url"
          placeholder="linkedin.com/in/jouwnaam"
          aria-invalid={err("link") ? true : undefined}
          aria-describedby={err("link") ? "serr-link" : "s-link-help"}
        />
        {err("link") ? (
          <p className="field-err" id="serr-link">
            {err("link")}
          </p>
        ) : (
          <p className="field-help" id="s-link-help">
            Geen cv bij de hand? Je LinkedIn of portfolio is net zo goed.
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
