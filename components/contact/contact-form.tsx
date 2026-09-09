"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight } from "lucide-react";
import { submitContact, type ContactState } from "@/app/(marketing)/contact/actions";
import { SERVICE_FAMILIES, type ServiceFamilie } from "@/lib/dienstenstructuur";
import { useBrowserwaarde } from "@/lib/hooks/use-browserwaarde";
import {
  SERVICE_VRAGEN,
  VRAGEN_PER_SERVICE,
  CONTACT_TYPES,
  type VraagKey,
} from "@/lib/services-vragen";

const initial: ContactState = { ok: false, message: "" };

const SECTOREN = ["Publieke sector", "Mobiliteit", "Banken", "Zorg", "Manufacturing", "Anders"];
const ONDERWERPEN = ["Mendix / applicaties", "AI", "Digitale strategie", "Weet ik nog niet"];

export interface DienstOptie {
  slug: string;
  naam: string;
  familie: ServiceFamilie;
  ctaType: "datum" | "kennismaking";
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Versturen…" : label} <ArrowRight />
    </button>
  );
}

export function ContactForm({ diensten = [] }: { diensten?: DienstOptie[] }) {
  const [state, formAction] = useActionState(submitContact, initial);
  const err = (k: string) => state.errors?.[k];

  /**
   * Voorinvulling uit ?dienst= en ?type= — de dienstpagina's linken hierheen.
   *
   * Bewust in de browser en niet op de server: zo blijft /contact volledig
   * statisch en is er één formulier, in plaats van een placeholder die na het
   * streamen wordt vervangen (waarbij kwijtraakt wat je al had getypt). Beide
   * waarden worden hier tegen de echte lijst gehouden, en de server action
   * valideert ze nog een keer bij het versturen: voorinvulling is gemak, geen
   * beveiligingsgrens.
   */
  // Een string, geen URLSearchParams: useSyncExternalStore vergelijkt snapshots
  // op identiteit, dus een nieuw object per aanroep is een oneindige lus.
  const zoek = useBrowserwaarde(() => window.location.search, "");
  const uitUrl = new URLSearchParams(zoek);
  const dienstUitUrl = uitUrl.get("dienst") ?? "";
  const typeUitUrl = uitUrl.get("type") ?? "";
  const type = CONTACT_TYPES.includes(typeUitUrl) ? typeUitUrl : "gesprek";

  // De keuze van de bezoeker wint zodra hij er een maakt; daarvoor telt de URL.
  const [keuze, setDienst] = useState<string | null>(null);
  const dienst = keuze ?? (diensten.some((d) => d.slug === dienstUitUrl) ? dienstUitUrl : "");

  // Bij validatiefouten: zet focus op het eerste gemarkeerde veld.
  useEffect(() => {
    if (state.errors && Object.keys(state.errors).length > 0) {
      const first = document.querySelector<HTMLElement>('.form-card [aria-invalid="true"]');
      first?.focus();
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state]);

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

  const gekozenDienst = diensten.find((d) => d.slug === dienst);
  const vraagKeys = VRAGEN_PER_SERVICE[dienst] ?? [];

  // Het label volgt waarop de bezoeker klikte in de catalogus: een dagdienst
  // vraagt om een datum, een traject begint met een kennismaking.
  const submitLabel =
    gekozenDienst?.ctaType === "datum"
      ? "Vraag een datum aan"
      : gekozenDienst?.ctaType === "kennismaking"
        ? "Plan de kennismaking"
        : "Plan het gesprek";

  return (
    <form className="form-card" action={formAction} noValidate>
      <h2>Plan een gesprek</h2>
      <p className="sub">
        {gekozenDienst
          ? `Je vraag gaat over ${gekozenDienst.naam}. Vul je gegevens in, dan komen we binnen één werkdag met een voorstel terug.`
          : "Vertel kort waar het over gaat — een korte vraag mag ook. Je krijgt binnen één werkdag antwoord van een echt mens."}
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
          <input
            id="f-naam"
            name="naam"
            type="text"
            placeholder="Jouw naam"
            required
            aria-invalid={err("naam") ? true : undefined}
            aria-describedby={err("naam") ? "err-naam" : undefined}
          />
          {err("naam") && (
            <p className="field-err" id="err-naam">
              {err("naam")}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="f-mail">Zakelijk e-mailadres</label>
          <input
            id="f-mail"
            name="email"
            type="email"
            placeholder="naam@organisatie.nl"
            required
            aria-invalid={err("email") ? true : undefined}
            aria-describedby={err("email") ? "err-mail" : undefined}
          />
          {err("email") && (
            <p className="field-err" id="err-mail">
              {err("email")}
            </p>
          )}
        </div>
      </div>

      <div className="frow2">
        <div className="field">
          <label htmlFor="f-org">Organisatie</label>
          <input id="f-org" name="organisatie" type="text" placeholder="Naam van je organisatie" />
        </div>
        <div className="field">
          <label htmlFor="f-rol">Jouw rol</label>
          <input id="f-rol" name="rol" type="text" placeholder="Bijv. CIO, manager uitvoering" />
        </div>
      </div>

      {diensten.length > 0 && (
        <div className="frow2">
          <div className="field">
            <label htmlFor="f-dienst">Waar gaat het over?</label>
            <select
              id="f-dienst"
              name="dienst"
              value={dienst}
              onChange={(e) => setDienst(e.target.value)}
              aria-invalid={err("dienst") ? true : undefined}
              aria-describedby={err("dienst") ? "err-dienst" : undefined}
            >
              <option value="">Kies een dienst</option>
              {SERVICE_FAMILIES.map((f) => {
                const opties = diensten.filter((d) => d.familie === f.key);
                if (opties.length === 0) return null;
                return (
                  <optgroup label={f.kicker} key={f.key}>
                    {opties.map((d) => (
                      <option value={d.slug} key={d.slug}>
                        {d.naam}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
              <option value="weet-ik-niet">Weet ik nog niet</option>
            </select>
            {err("dienst") && (
              <p className="field-err" id="err-dienst">
                {err("dienst")}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="f-groep">
              Aantal deelnemers{" "}
              <span style={{ fontWeight: "var(--fw-regular)", color: "var(--text-subtle)" }}>
                (indicatie)
              </span>
            </label>
            <input
              id="f-groep"
              name="groepsgrootte"
              type="text"
              placeholder="Bijv. 8"
              aria-invalid={err("groepsgrootte") ? true : undefined}
              aria-describedby={err("groepsgrootte") ? "err-groep" : undefined}
            />
            {err("groepsgrootte") && (
              <p className="field-err" id="err-groep">
                {err("groepsgrootte")}
              </p>
            )}
          </div>
        </div>
      )}

      {vraagKeys.length > 0 && (
        <div className="vraag-groep">
          <div className="kicker">Over deze dienst</div>
          {vraagKeys.map((key) => {
            const v = SERVICE_VRAGEN[key as VraagKey];
            return (
              <div className="field" key={v.name}>
                {v.type === "radio" ? (
                  <>
                    <label id={`lbl-${v.name}`}>{v.label}</label>
                    <div className="chips" role="group" aria-labelledby={`lbl-${v.name}`}>
                      {v.opties?.map((o) => (
                        <label className="chip" key={o}>
                          <input type="radio" name={v.name} value={o} />
                          {o}
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <label htmlFor={`f-${v.name}`}>{v.label}</label>
                    {v.type === "textarea" ? (
                      <textarea
                        id={`f-${v.name}`}
                        name={v.name}
                        aria-invalid={err(v.name) ? true : undefined}
                        aria-describedby={err(v.name) ? `err-${v.name}` : undefined}
                      />
                    ) : (
                      <input
                        id={`f-${v.name}`}
                        name={v.name}
                        type="text"
                        aria-invalid={err(v.name) ? true : undefined}
                        aria-describedby={err(v.name) ? `err-${v.name}` : undefined}
                      />
                    )}
                  </>
                )}
                {v.help && <p className="field-help">{v.help}</p>}
                {err(v.name) && (
                  <p className="field-err" id={`err-${v.name}`}>
                    {err(v.name)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="field" role="group" aria-labelledby="lbl-sector">
        <label id="lbl-sector">In welke sector werk je?</label>
        <div className="chips">
          {SECTOREN.map((s) => (
            <label className="chip" key={s}>
              <input type="radio" name="sector" value={s} />
              {s}
            </label>
          ))}
        </div>
      </div>

      <div className="field" role="group" aria-labelledby="lbl-onderwerp">
        <label id="lbl-onderwerp">Waar gaat je vraagstuk over?</label>
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
          aria-invalid={err("toelichting") ? true : undefined}
          aria-describedby={err("toelichting") ? "err-msg" : undefined}
        />
        {err("toelichting") && (
          <p className="field-err" id="err-msg">
            {err("toelichting")}
          </p>
        )}
      </div>

      <SubmitButton label={submitLabel} />

      {state.message && !state.ok && (
        <p className="form-status err" role="alert">
          {state.message}
        </p>
      )}

      <p className="privacy">
        We gebruiken je gegevens alleen om dit gesprek te plannen. Geen nieuwsbrief, geen belrondes.
        Zie ons <a href="/privacy">privacybeleid</a>.
      </p>
    </form>
  );
}
