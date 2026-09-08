"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Trash2, ExternalLink } from "lucide-react";
import { saveContent, deleteContent, type SaveState } from "@/app/admin/content/actions";
import type { ContentRow, ContentType } from "@/lib/cms/content";
import { FIELD_SCHEMAS, extraData, isStructured, type FieldDef } from "@/lib/cms/schema";
import { PAGE_FIELDS, PAGE_DEFAULTS, PAGE_PATH } from "@/lib/cms/pages";
import { ImageField } from "./image-field";
import { StructuredField } from "./structured-field";
import { IconField } from "./icon-field";
import { SelectField } from "./select-field";
import { RichTextEditor } from "./rich-text-editor";
import { AuthorField, type TeamOptie } from "./author-field";
import { PropositiesField, type PropositieOptie } from "./proposities-field";
import { Modal } from "./modal";

/** Maakt een net webadres van een titel (kleine letters, koppeltekens). */
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Groepeert velden op het deel vóór " — " in hun label (bv. "Hero — kicker"
 * → sectie "Hero", subveld "Kicker"). Velden zonder streepje komen in "Algemeen".
 * Volgorde blijft behouden; gebruikt voor de lange pagina-formulieren.
 */
function groupFields(
  fields: FieldDef[],
): { heading: string; fields: { f: FieldDef; sub: string }[] }[] {
  const groups: { heading: string; fields: { f: FieldDef; sub: string }[] }[] = [];
  const index = new Map<string, number>();
  for (const f of fields) {
    const i = f.label.indexOf(" — ");
    const heading = i >= 0 ? f.label.slice(0, i) : "Algemeen";
    const raw = i >= 0 ? f.label.slice(i + 3) : f.label;
    const sub = raw.charAt(0).toUpperCase() + raw.slice(1);
    if (!index.has(heading)) {
      index.set(heading, groups.length);
      groups.push({ heading, fields: [] });
    }
    groups[index.get(heading)!]?.fields.push({ f, sub });
  }
  return groups;
}

const VIEW_BASE: Partial<Record<ContentType, string>> = {
  artikelen: "/inzichten",
  cases: "/klantverhalen",
  vacatures: "/vacatures",
  diensten: "/diensten",
  sectoren: "/sectoren",
};

/** Verwijder-knop met nette bevestigingsmodal (submit gaat via het hoofdformulier). */
function DeleteButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="ce-delete" onClick={() => setOpen(true)}>
        <Trash2 /> Verwijderen
      </button>
      {open && (
        <Modal
          title="Item verwijderen"
          onClose={() => setOpen(false)}
          footer={
            <>
              <button type="button" className="btn btn-outline" onClick={() => setOpen(false)}>
                Annuleren
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                formAction={deleteContent}
                formNoValidate
              >
                Definitief verwijderen
              </button>
            </>
          }
        >
          <p
            style={{
              margin: 0,
              fontSize: "var(--text-sm)",
              color: "var(--text-body)",
              lineHeight: 1.6,
            }}
          >
            Weet je zeker dat je dit item definitief wilt verwijderen? Dit kan niet ongedaan worden
            gemaakt.
          </p>
        </Modal>
      )}
    </>
  );
}

export function ContentEditor({
  type,
  label,
  listPath,
  row,
  teamleden = [],
  proposities = [],
}: {
  type: ContentType;
  label: string;
  listPath: string;
  row: ContentRow | null;
  teamleden?: TeamOptie[];
  proposities?: PropositieOptie[];
}) {
  const [state, formAction, pending] = useActionState<SaveState, FormData>(saveContent, {});
  const [dirty, setDirty] = useState(false);
  const submitting = useRef(false);
  const errRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(row?.status === "live" ? "live" : "concept");
  const [titel, setTitel] = useState(row?.titel ?? "");
  const [slug, setSlug] = useState(row?.slug ?? "");
  const isNew = !row;
  const isPaginas = type === "paginas";
  // Volgorde telt alleen waar lijsten handmatig geordend worden.
  const showOrder = type !== "artikelen" && type !== "paginas";

  // Nieuw item: webadres volgt automatisch de titel. Bestaand item: adres blijft vast.
  const onTitel = (v: string) => {
    setTitel(v);
    if (isNew) setSlug(slugify(v));
  };

  // Waarschuw bij het verlaten van de pagina met niet-opgeslagen wijzigingen
  // (herladen, tabblad sluiten, browser-terug). Slaat over tijdens het opslaan zelf.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      if (submitting.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // Na een mislukte opslagpoging keert de action terug zonder te navigeren:
  // reset de opslag-vlag zodat de waarschuwing weer actief is.
  useEffect(() => {
    if (!pending) submitting.current = false;
  }, [pending]);

  // Bij een validatiefout: breng de foutmelding in beeld en geef 'm focus.
  useEffect(() => {
    if (state.error && errRef.current) {
      errRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      errRef.current.focus();
    }
  }, [state.error]);

  // Bevestig het weggaan via de Annuleren-link bij niet-opgeslagen wijzigingen.
  const onCancel = (e: React.MouseEvent) => {
    if (
      dirty &&
      !window.confirm("Je hebt niet-opgeslagen wijzigingen. Weet je zeker dat je wilt weggaan?")
    ) {
      e.preventDefault();
    }
  };

  const viewPath =
    type === "teamleden"
      ? "/over-ons"
      : isPaginas
        ? PAGE_PATH[slug]
        : VIEW_BASE[type]
          ? `${VIEW_BASE[type]}/${slug}`
          : undefined;

  const data = (row?.data ?? {}) as Record<string, unknown>;
  const fields = isPaginas ? (PAGE_FIELDS[slug] ?? FIELD_SCHEMAS.paginas) : FIELD_SCHEMAS[type];
  const sideFields = fields.filter((f) => f.panel === "side");
  const mainFields = fields.filter((f) => f.panel !== "side");
  const rest = extraData(fields, data);
  const extraInitial = Object.keys(rest).length ? JSON.stringify(rest, null, 2) : "";

  const [today] = useState(() => new Date().toISOString().slice(0, 10));

  // Startwaarde van een veld: wat er is opgeslagen — ook als dat leeg is. De
  // pagina-standaardtekst dient alleen nog als vertrekpunt voor een níeuw item;
  // zou hij ook bij een bestaande rij invullen, dan komt een bewust leeggemaakt
  // veld bij de volgende opslag stilletjes terug.
  const initial = (f: FieldDef): string => {
    const v = data[f.key];
    if (typeof v === "string") return v;
    if (isNew) {
      if (isPaginas) {
        const pd = PAGE_DEFAULTS[slug]?.[f.key];
        if (pd) return pd;
      }
      if (f.defaultToday) return today;
    }
    return "";
  };

  // Render één schemaveld (gedeeld tussen content-kolom en instellingen-rail).
  const renderField = (f: FieldDef) =>
    isStructured(f.type) ? (
      <StructuredField key={f.key} field={f} initial={data[f.key]} />
    ) : f.type === "image" ? (
      <ImageField key={f.key} name={`f_${f.key}`} label={f.label} defaultValue={initial(f)} />
    ) : f.type === "icon" ? (
      <IconField
        key={f.key}
        name={`f_${f.key}`}
        label={f.label}
        options={f.options ?? []}
        defaultValue={initial(f)}
      />
    ) : f.type === "select" ? (
      <SelectField
        key={f.key}
        name={`f_${f.key}`}
        label={f.label}
        options={f.options ?? []}
        defaultValue={initial(f)}
        help={f.help}
      />
    ) : f.type === "author" ? (
      <AuthorField
        key={f.key}
        name={`f_${f.key}`}
        label={f.label}
        options={teamleden}
        defaultValue={initial(f)}
      />
    ) : f.type === "proposities" ? (
      <PropositiesField
        key={f.key}
        name={`f_${f.key}`}
        label={f.label}
        options={proposities}
        defaultValue={Array.isArray(data[f.key]) ? (data[f.key] as string[]) : []}
        help={f.help}
      />
    ) : f.type === "richtext" ? (
      <RichTextEditor
        key={f.key}
        name={`f_${f.key}`}
        label={f.label}
        defaultValue={initial(f)}
        help={f.help}
      />
    ) : f.type === "richtext-lite" ? (
      <RichTextEditor
        key={f.key}
        name={`f_${f.key}`}
        label={f.label}
        defaultValue={initial(f)}
        help={f.help}
        variant="lite"
      />
    ) : (
      <div className="fld" key={f.key}>
        <label htmlFor={`ce-${f.key}`}>{f.label}</label>
        {f.type === "textarea" || f.type === "markdown" ? (
          <textarea
            id={`ce-${f.key}`}
            name={`f_${f.key}`}
            defaultValue={initial(f)}
            placeholder={f.placeholder}
            required={f.required}
            spellCheck={f.type === "markdown" ? false : undefined}
            style={
              f.type === "markdown"
                ? {
                    minHeight: 220,
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    lineHeight: 1.7,
                  }
                : undefined
            }
          />
        ) : (
          <input
            id={`ce-${f.key}`}
            name={`f_${f.key}`}
            type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
            defaultValue={initial(f)}
            placeholder={f.placeholder}
            required={f.required}
          />
        )}
        {f.help && (
          <p className="t-sub" style={{ marginTop: 6 }}>
            {f.help}
          </p>
        )}
      </div>
    );

  return (
    <>
      <div className="crumb">Content · {label}</div>
      <div className="page-head">
        <div>
          <h1>
            {row ? "Bewerk" : "Nieuw"} {label.toLowerCase()}
          </h1>
          <p className="sub">
            Links pas je de inhoud aan; rechts staan de instellingen en publicatie.
          </p>
        </div>
      </div>

      <form
        action={formAction}
        onChange={() => setDirty(true)}
        onSubmit={() => {
          submitting.current = true;
        }}
      >
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="id" value={row?.id ?? "new"} />
        <input type="hidden" name="status" value={status} />
        {!isNew && <input type="hidden" name="slug" value={slug} />}
        {!showOrder && <input type="hidden" name="volgorde" value={row?.volgorde ?? 0} />}

        {state.error && (
          <div
            className="err"
            role="alert"
            tabIndex={-1}
            ref={errRef}
            style={{ marginBottom: "var(--space-5)", outline: "none" }}
          >
            {state.error}
          </div>
        )}

        <div className="ce-grid">
          {/* Contentkolom */}
          <div className="ce-main">
            <div className="card">
              <div className="fld">
                <label htmlFor="ce-titel">Titel</label>
                <input
                  id="ce-titel"
                  name="titel"
                  type="text"
                  value={titel}
                  onChange={(e) => onTitel(e.target.value)}
                  required
                />
              </div>

              {isPaginas
                ? groupFields(mainFields).map((g) => (
                    <details key={g.heading} className="ce-sec" open>
                      <summary>{g.heading}</summary>
                      <div className="ce-sec-body">
                        {g.fields.map(({ f, sub }) => renderField({ ...f, label: sub }))}
                      </div>
                    </details>
                  ))
                : mainFields.map(renderField)}

              {extraInitial && (
                <details style={{ marginTop: "var(--space-2)" }}>
                  <summary
                    style={{
                      cursor: "pointer",
                      fontSize: "var(--text-sm)",
                      color: "var(--text-muted)",
                    }}
                  >
                    Geavanceerd — overige velden (JSON)
                  </summary>
                  <div className="fld" style={{ marginTop: "var(--space-3)", marginBottom: 0 }}>
                    <textarea
                      name="extra"
                      defaultValue={extraInitial}
                      spellCheck={false}
                      placeholder="{ }"
                      style={{
                        minHeight: 140,
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        lineHeight: 1.6,
                      }}
                    />
                    <p className="t-sub" style={{ marginTop: 6 }}>
                      Sleutels zonder eigen veld. Moet geldige JSON zijn.
                    </p>
                  </div>
                </details>
              )}
            </div>
          </div>

          {/* Instellingen-rail */}
          <aside className="ce-side">
            <div className="card ce-actions">
              <button type="submit" className="btn btn-primary" disabled={pending}>
                {pending ? "Opslaan…" : "Opslaan"}
              </button>
              <div className="ce-actions-row">
                <Link href={listPath} className="btn btn-outline" onClick={onCancel}>
                  Annuleren
                </Link>
                {row && viewPath && (
                  <a
                    href={viewPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <ExternalLink /> Bekijk
                  </a>
                )}
              </div>
              {row && <DeleteButton />}
            </div>

            <div className="card">
              <h3>Publicatie</h3>
              <div className="fld">
                <label>Status</label>
                <div className="seg" role="group" aria-label="Status">
                  <button
                    type="button"
                    className={status === "concept" ? "on" : ""}
                    onClick={() => setStatus("concept")}
                  >
                    Concept
                  </button>
                  <button
                    type="button"
                    className={status === "live" ? "on live" : ""}
                    onClick={() => setStatus("live")}
                  >
                    Live
                  </button>
                </div>
                <p className="t-sub" style={{ marginTop: 8 }}>
                  {status === "live"
                    ? "Zichtbaar op de website."
                    : "Nog niet zichtbaar op de website."}
                </p>
              </div>

              {isNew ? (
                <div className="fld" style={{ marginBottom: showOrder ? undefined : 0 }}>
                  <label htmlFor="ce-slug">Webadres</label>
                  <input
                    id="ce-slug"
                    name="slug"
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                    pattern="[a-z0-9\-]+"
                    required
                  />
                  <p className="t-sub" style={{ marginTop: 6 }}>
                    Wordt automatisch gemaakt van de titel.
                  </p>
                </div>
              ) : !isPaginas ? (
                <div className="fld" style={{ marginBottom: showOrder ? undefined : 0 }}>
                  <label htmlFor="ce-slug">Webadres</label>
                  <div className="ce-perma">
                    <code>
                      {VIEW_BASE[type] ?? ""}/{slug}
                    </code>
                  </div>
                </div>
              ) : null}

              {showOrder && (
                <div className="fld" style={{ marginBottom: 0 }}>
                  <label htmlFor="ce-volgorde">Volgorde</label>
                  <input
                    id="ce-volgorde"
                    name="volgorde"
                    type="number"
                    defaultValue={row?.volgorde ?? 0}
                  />
                  <p className="t-sub" style={{ marginTop: 6 }}>
                    Lager = hoger in lijsten.
                  </p>
                </div>
              )}
            </div>

            {sideFields.length > 0 && (
              <div className="card">
                <h3>Instellingen</h3>
                {sideFields.map(renderField)}
              </div>
            )}
          </aside>
        </div>
      </form>
    </>
  );
}
