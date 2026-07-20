"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveContent, deleteContent, type SaveState } from "@/app/admin/content/actions";
import type { ContentRow, ContentType } from "@/lib/cms/content";

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
  const dataInitial = JSON.stringify(row?.data ?? {}, null, 2);

  return (
    <>
      <div className="crumb">Content · {label}</div>
      <div className="page-head">
        <div>
          <h1>{row ? "Bewerk" : "Nieuw"} {label.toLowerCase()}</h1>
          <p className="sub">
            {row ? `/${row.slug}` : "Vul de velden in en publiceer wanneer je klaar bent."}
          </p>
        </div>
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
          <input id="ce-titel" name="titel" type="text" defaultValue={row?.titel ?? ""} required />
        </div>

        <div className="frow2">
          <div className="fld">
            <label htmlFor="ce-slug">Slug</label>
            <input
              id="ce-slug"
              name="slug"
              type="text"
              defaultValue={row?.slug ?? ""}
              placeholder="bijv-mijn-artikel"
              pattern="[a-z0-9\-]+"
              required
            />
          </div>
          <div className="fld">
            <label htmlFor="ce-volgorde">Volgorde</label>
            <input id="ce-volgorde" name="volgorde" type="number" defaultValue={row?.volgorde ?? 0} />
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

        <div className="fld">
          <label htmlFor="ce-data">Inhoud (JSON)</label>
          <textarea
            id="ce-data"
            name="data"
            defaultValue={dataInitial}
            spellCheck={false}
            style={{ minHeight: 260, fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", lineHeight: 1.6 }}
          />
        </div>

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
