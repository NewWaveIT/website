"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight } from "lucide-react";
import { vulIn } from "@/lib/utils";
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

/** De teksten van het formulier. Komen uit de contactpagina in het CMS; de
 *  pagina geeft ze veld voor veld door, zodat de dode-veldentest ziet dat elk
 *  veld ook echt ergens landt. */
export interface FormTeksten {
  formTitel: string;
  formSubDienst: string;
  formSubAlgemeen: string;
  formBedankt: string;
  formKnopBezig: string;
  formKnopDatum: string;
  formKnopKennismaking: string;
  formKnopGesprek: string;
  veldNaam: string;
  hintNaam: string;
  veldEmail: string;
  hintEmail: string;
  veldOrganisatie: string;
  veldOrganisatieBij: string;
  hintOrganisatie: string;
  veldRol: string;
  veldRolBij: string;
  hintRol: string;
  veldDienst: string;
  veldDienstToggle: string;
  optieKies: string;
  optieWeetNiet: string;
  vragenKicker: string;
  veldSector: string;
  veldSectorBij: string;
  veldOnderwerp: string;
  veldOnderwerpBij: string;
  veldToelichting: string;
  veldToelichtingBij: string;
  hintToelichting: string;
  privacyTekst: string;
  privacyLink: string;
}

export interface DienstOptie {
  slug: string;
  naam: string;
  familie: ServiceFamilie;
  ctaType: "datum" | "kennismaking";
}

function SubmitButton({ label, bezig }: { label: string; bezig: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? bezig : label} <ArrowRight />
    </button>
  );
}

export function ContactForm({ diensten = [], tk }: { diensten?: DienstOptie[]; tk: FormTeksten }) {
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
  const dienstRuw = keuze ?? (diensten.some((d) => d.slug === dienstUitUrl) ? dienstUitUrl : "");
  // De dienstkeuze staat standaard ingeklapt: "plan een gesprek" moet zonder
  // dienst net zo simpel zijn als ermee. Kwam de bezoeker via een dienstpagina
  // binnen, dan staat 'm meteen open — maar `dienstUitUrl` komt pas ná hydratatie
  // binnen (useBrowserwaarde), dus een bevroren `useState(() => !!dienstRuw)` mist
  // 'm nog. Zolang de bezoeker de toggle niet zelf heeft aangeraakt (`null`),
  // volgt hij gewoon `dienstRuw` op elke render mee.
  const [dienstToggleOverride, setDienstToggleOverride] = useState<boolean | null>(null);
  const toonDienst = dienstToggleOverride ?? !!dienstRuw;
  const dienst = toonDienst ? dienstRuw : "";

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
        <h2>{tk.formBedankt}</h2>
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
      ? tk.formKnopDatum
      : gekozenDienst?.ctaType === "kennismaking"
        ? tk.formKnopKennismaking
        : tk.formKnopGesprek;

  return (
    <form className="form-card" action={formAction} noValidate>
      <h2>{tk.formTitel}</h2>
      <p className="sub">
        {gekozenDienst
          ? vulIn(tk.formSubDienst, { dienst: gekozenDienst.naam })
          : tk.formSubAlgemeen}
      </p>

      <input type="hidden" name="type" value={type} />
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hp"
      />

      <div className="frow2">
        <div className="field">
          <label htmlFor="f-naam">{tk.veldNaam}</label>
          <input
            id="f-naam"
            name="naam"
            type="text"
            placeholder={tk.hintNaam}
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
          <label htmlFor="f-mail">{tk.veldEmail}</label>
          <input
            id="f-mail"
            name="email"
            type="email"
            placeholder={tk.hintEmail}
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
          <label htmlFor="f-org">
            {tk.veldOrganisatie} <span className="veld-optioneel">{tk.veldOrganisatieBij}</span>
          </label>
          <input id="f-org" name="organisatie" type="text" placeholder={tk.hintOrganisatie} />
        </div>
        <div className="field">
          <label htmlFor="f-rol">
            {tk.veldRol} <span className="veld-optioneel">{tk.veldRolBij}</span>
          </label>
          <input id="f-rol" name="rol" type="text" placeholder={tk.hintRol} />
        </div>
      </div>

      {diensten.length > 0 && (
        <>
          <div className="field">
            <div className="chips">
              <label className="chip">
                <input
                  type="checkbox"
                  checked={toonDienst}
                  onChange={(e) => setDienstToggleOverride(e.target.checked)}
                />
                {tk.veldDienstToggle}
              </label>
            </div>
          </div>
          {toonDienst && (
            <div className="field">
              <label htmlFor="f-dienst">{tk.veldDienst}</label>
              <select
                id="f-dienst"
                name="dienst"
                value={dienstRuw}
                onChange={(e) => setDienst(e.target.value)}
                aria-invalid={err("dienst") ? true : undefined}
                aria-describedby={err("dienst") ? "err-dienst" : undefined}
              >
                <option value="">{tk.optieKies}</option>
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
                <option value="weet-ik-niet">{tk.optieWeetNiet}</option>
              </select>
              {err("dienst") && (
                <p className="field-err" id="err-dienst">
                  {err("dienst")}
                </p>
              )}
            </div>
          )}
        </>
      )}

      {vraagKeys.length > 0 && (
        <div className="vraag-groep">
          <div className="kicker">{tk.vragenKicker}</div>
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
        <label id="lbl-sector">
          {tk.veldSector} <span className="veld-optioneel">{tk.veldSectorBij}</span>
        </label>
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
        <label id="lbl-onderwerp">
          {tk.veldOnderwerp} <span className="veld-optioneel">{tk.veldOnderwerpBij}</span>
        </label>
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
          {tk.veldToelichting} <span className="veld-optioneel">{tk.veldToelichtingBij}</span>
        </label>
        <textarea
          id="f-msg"
          name="toelichting"
          placeholder={tk.hintToelichting}
          aria-invalid={err("toelichting") ? true : undefined}
          aria-describedby={err("toelichting") ? "err-msg" : undefined}
        />
        {err("toelichting") && (
          <p className="field-err" id="err-msg">
            {err("toelichting")}
          </p>
        )}
      </div>

      <SubmitButton label={submitLabel} bezig={tk.formKnopBezig} />

      {state.message && !state.ok && (
        <p className="form-status err" role="alert">
          {state.message}
        </p>
      )}

      <p className="form-privacy">
        {tk.privacyTekst} <a href="/privacy">{tk.privacyLink}</a>.
      </p>
    </form>
  );
}
