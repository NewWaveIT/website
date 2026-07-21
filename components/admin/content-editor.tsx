"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveContent, deleteContent, type SaveState } from "@/app/admin/content/actions";
import type { ContentRow, ContentType } from "@/lib/cms/content";
import { FIELD_SCHEMAS, extraData, isStructured } from "@/lib/cms/schema";
import { PAGE_FIELDS, PAGE_DEFAULTS, PAGE_PATH } from "@/lib/cms/pages";
import { ImageField } from "./image-field";
import { StructuredField } from "./structured-field";
import { IconField } from "./icon-field";

/** Maakt een net webadres van een titel (kleine letters, koppeltekens). */
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const VIEW_BASE: Partial<Record<ContentType, string>> = {
  artikelen: "/inzichten",
  cases: "/klantverhalen",
  vacatures: "/vacatures",
  diensten: "/diensten",
  sectoren: "/sectoren",
};

export function ContentEditor({
  type,
  label,
  listPath,
  row,
}: {
  type: ContentType;
  label: string;
  listPath: string;
  row: ContentRow | null;
}) {
  const [state, formAction, pending] = useActionState<SaveState, FormData>(saveContent, {});
  const [status, setStatus] = useState(row?.status === "live" ? "live" : "concept");
  const [titel, setTitel] = useState(row?.titel ?? "");
  const [slug, setSlug] = useState(row?.slug ?? "");
  const isNew = !row;

  // Nieuw item: webadres volgt automatisch de titel. Bestaand item: adres blijft vast.
  const onTitel = (v: string) => {
    setTitel(v);
    if (isNew) setSlug(slugify(v));
  };

  const viewPath =
    type === "teamleden"
      ? "/over-ons"
      : type === "paginas"
        ? PAGE_PATH[slug]
        : VIEW_BASE[type]
          ? `${VIEW_BASE[type]}/${slug}`
          : undefined;

  const data = (row?.data ?? {}) as Record<string, unknown>;
  const fields =
    type === "paginas" ? (PAGE_FIELDS[slug] ?? FIELD_SCHEMAS.paginas) : FIELD_SCHEMAS[type];
  const rest = extraData(fields, data);
  const extraInitial = Object.keys(rest).length ? JSON.stringify(rest, null, 2) : "";

  // Startwaarde van een veld: opgeslagen data, anders de pagina-standaardtekst.
  const initial = (key: string) => {
    const v = data[key];
    if (typeof v === "string" && v) return v;
    return (type === "paginas" && PAGE_DEFAULTS[slug]?.[key]) || "";
  };

  return (
    <>
      <div className="crumb">Content · {label}</div>
      <div className="page-head">
        <div>
          <h1>{row ? "Bewerk" : "Nieuw"} {label.toLowerCase()}</h1>
          <p className="sub">
            Vul de velden in en klik op <strong>Opslaan</strong>. Zet op <strong>Live</strong> om het op de website te tonen.
          </p>
        </div>
        {row && viewPath && (
          <a href={viewPath} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Bekijk op site
          </a>
        )}
      </div>

      <form action={formAction} className="card" style={{ padding: "var(--space-6)", maxWidth: 760 }}>
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="id" value={row?.id ?? "new"} />
        <input type="hidden" name="status" value={status} />

        {state.error && (
          <div className="err" style={{ marginBottom: "var(--space-5)" }}>
            {state.error}
          </div>
        )}

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

        <div className="frow2">
          <div className="fld">
            <label htmlFor="ce-slug">Webadres</label>
            <input
              id="ce-slug"
              name="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              pattern="[a-z0-9\-]+"
              required
              readOnly={!isNew}
              style={!isNew ? { background: "var(--ink-50)", color: "var(--text-muted)" } : undefined}
            />
            <p className="t-sub" style={{ marginTop: 6 }}>
              {isNew ? "Wordt automatisch gemaakt van de titel." : "Vast adres — verandert niet."}
            </p>
          </div>
          <div className="fld">
            <label htmlFor="ce-volgorde">Volgorde</label>
            <input id="ce-volgorde" name="volgorde" type="number" defaultValue={row?.volgorde ?? 0} />
            <p className="t-sub" style={{ marginTop: 6 }}>Lager = hoger in lijsten.</p>
          </div>
        </div>

        <div className="fld">
          <label>Status</label>
          <div className="statusbar">
            <button type="button" className={status === "concept" ? "on" : ""} onClick={() => setStatus("concept")}>
              Concept
            </button>
            <button type="button" className={status === "live" ? "on" : ""} onClick={() => setStatus("live")}>
              Live
            </button>
          </div>
        </div>

        {fields.map((f) =>
          isStructured(f.type) ? (
            <StructuredField key={f.key} field={f} initial={data[f.key]} />
          ) : f.type === "image" ? (
            <ImageField key={f.key} name={`f_${f.key}`} label={f.label} defaultValue={initial(f.key)} />
          ) : f.type === "icon" ? (
            <IconField key={f.key} name={`f_${f.key}`} label={f.label} options={f.options ?? []} defaultValue={initial(f.key)} />
          ) : (
          <div className="fld" key={f.key}>
            <label htmlFor={`ce-${f.key}`}>{f.label}</label>
            {f.type === "textarea" || f.type === "markdown" ? (
              <textarea
                id={`ce-${f.key}`}
                name={`f_${f.key}`}
                defaultValue={initial(f.key)}
                placeholder={f.placeholder}
                spellCheck={f.type === "markdown" ? false : undefined}
                style={
                  f.type === "markdown"
                    ? { minHeight: 220, fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", lineHeight: 1.7 }
                    : undefined
                }
              />
            ) : (
              <input
                id={`ce-${f.key}`}
                name={`f_${f.key}`}
                type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                defaultValue={initial(f.key)}
                placeholder={f.placeholder}
              />
            )}
            {f.help && <p className="t-sub" style={{ marginTop: 6 }}>{f.help}</p>}
          </div>
          )
        )}

        {extraInitial && (
          <details style={{ marginBottom: "var(--space-5)" }}>
            <summary style={{ cursor: "pointer", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
              Geavanceerd — overige velden (JSON)
            </summary>
            <div className="fld" style={{ marginTop: "var(--space-3)" }}>
              <textarea
                name="extra"
                defaultValue={extraInitial}
                spellCheck={false}
                placeholder="{ }"
                style={{ minHeight: 140, fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", lineHeight: 1.6 }}
              />
              <p className="t-sub" style={{ marginTop: 6 }}>
                Sleutels zonder eigen veld. Moet geldige JSON zijn.
              </p>
            </div>
          </details>
        )}

        <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "flex-end" }}>
          <Link href={listPath} className="btn btn-outline">
            Annuleren
          </Link>
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Opslaan…" : "Opslaan"}
          </button>
        </div>
      </form>

      {row && (
        <form
          action={deleteContent}
          style={{ marginTop: "var(--space-5)", maxWidth: 760 }}
          onSubmit={(e) => {
            if (!confirm("Dit item definitief verwijderen?")) e.preventDefault();
          }}
        >
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="id" value={row.id} />
          <button type="submit" className="btn btn-outline" style={{ color: "var(--danger-500)" }}>
            Verwijderen
          </button>
        </form>
      )}
    </>
  );
}
