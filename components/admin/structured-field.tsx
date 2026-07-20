"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type { FieldDef } from "@/lib/cms/schema";
import { ImageControl } from "./image-field";

type Obj = Record<string, unknown>;

const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const obj = (v: unknown): Obj => (v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : {});
const str = (v: unknown): string => (v === undefined || v === null ? "" : String(v));

/** Recursief besturingselement voor één veld (waarde + onChange). */
function Control({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.type === "list") {
    const list = arr(value).map(str);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {list.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              value={item}
              placeholder={field.placeholder}
              onChange={(e) => onChange(list.map((x, j) => (j === i ? e.target.value : x)))}
              style={{ flex: 1 }}
            />
            <button type="button" className="btn btn-outline" aria-label="Verwijderen" style={{ padding: "8px 10px" }} onClick={() => onChange(list.filter((_, j) => j !== i))}>
              <Trash2 />
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-outline" style={{ alignSelf: "flex-start" }} onClick={() => onChange([...list, ""])}>
          <Plus /> Regel toevoegen
        </button>
      </div>
    );
  }

  if (field.type === "group") {
    const o = obj(value);
    return (
      <div className="frow2">
        {(field.of ?? []).map((sub) => (
          <SubLabelled key={sub.key} field={sub} value={o[sub.key]} onChange={(v) => onChange({ ...o, [sub.key]: v })} />
        ))}
      </div>
    );
  }

  if (field.type === "items") {
    const rows = arr(value).map(obj);
    const itemLabel = field.itemLabel ?? "Item";
    const set = (next: Obj[]) => onChange(next);
    const move = (i: number, dir: -1 | 1) => {
      const j = i + dir;
      if (j < 0 || j >= rows.length) return;
      const next = [...rows];
      [next[i], next[j]] = [next[j], next[i]];
      set(next);
    };
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map((row, i) => (
          <div key={i} style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-4)", background: "var(--paper)" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
              <span className="t-sub" style={{ fontWeight: "var(--fw-semibold)" }}>{itemLabel} {i + 1}</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                <button type="button" className="btn btn-outline" style={{ padding: "6px 8px" }} aria-label="Omhoog" onClick={() => move(i, -1)}><ChevronUp /></button>
                <button type="button" className="btn btn-outline" style={{ padding: "6px 8px" }} aria-label="Omlaag" onClick={() => move(i, 1)}><ChevronDown /></button>
                <button type="button" className="btn btn-outline" style={{ padding: "6px 8px", color: "var(--danger-500)" }} aria-label="Verwijderen" onClick={() => set(rows.filter((_, j) => j !== i))}><Trash2 /></button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(field.of ?? []).map((sub) => (
                <SubLabelled key={sub.key} field={sub} value={row[sub.key]} onChange={(v) => set(rows.map((r, j) => (j === i ? { ...r, [sub.key]: v } : r)))} />
              ))}
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-outline" style={{ alignSelf: "flex-start" }} onClick={() => set([...rows, {}])}>
          <Plus /> {itemLabel} toevoegen
        </button>
      </div>
    );
  }

  if (field.type === "image") {
    return <ImageControl value={str(value)} onChange={onChange} />;
  }

  if (field.type === "textarea" || field.type === "markdown") {
    return <textarea value={str(value)} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} style={{ minHeight: 70 }} />;
  }
  return <input type={field.type === "number" ? "number" : "text"} value={str(value)} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
}

/** Subveld met een klein label erboven. */
function SubLabelled({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  return (
    <div>
      <label style={{ fontSize: "var(--text-xs)", textTransform: "none", letterSpacing: 0, display: "block", marginBottom: 5 }}>
        {field.label}
      </label>
      <Control field={field} value={value} onChange={onChange} />
    </div>
  );
}

/** Top-level gestructureerd veld: beheert state + schrijft JSON naar een verborgen input. */
export function StructuredField({ field, initial }: { field: FieldDef; initial: unknown }) {
  const [value, setValue] = useState<unknown>(() => {
    if (field.type === "group") return obj(initial);
    if (field.type === "list") return arr(initial).map(str);
    return arr(initial); // items
  });

  return (
    <div className="fld">
      <label>{field.label}</label>
      <input type="hidden" name={`f_${field.key}`} value={JSON.stringify(value)} />
      <Control field={field} value={value} onChange={setValue} />
      {field.help && <p className="t-sub" style={{ marginTop: 6 }}>{field.help}</p>}
    </div>
  );
}
