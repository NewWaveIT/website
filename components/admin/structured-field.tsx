"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type { FieldDef } from "@/lib/cms/schema";
import { ImageControl } from "./image-field";
import { VerborgenWaarde } from "./verborgen-waarde";

type Obj = Record<string, unknown>;

const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const obj = (v: unknown): Obj =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : {};
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
      <div className="sf-lijst">
        {list.map((item, i) => (
          <div key={i} className="sf-regel">
            <input
              type="text"
              value={item}
              placeholder={field.placeholder}
              onChange={(e) => onChange(list.map((x, j) => (j === i ? e.target.value : x)))}
            />
            <button
              type="button"
              className="btn btn-outline iconbtn"
              aria-label="Verwijderen"
              onClick={() => onChange(list.filter((_, j) => j !== i))}
            >
              <Trash2 />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline sf-toevoegen"
          onClick={() => onChange([...list, ""])}
        >
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
          <SubLabelled
            key={sub.key}
            field={sub}
            value={o[sub.key]}
            onChange={(v) => onChange({ ...o, [sub.key]: v })}
          />
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
      const a = next[i];
      const b = next[j];
      if (!a || !b) return;
      next[i] = b;
      next[j] = a;
      set(next);
    };
    return (
      <div className="sf-items">
        {rows.map((row, i) => (
          <div key={i} className="sf-item">
            <div className="sf-item-kop">
              <span className="t-sub sf-item-titel">
                {itemLabel} {i + 1}
              </span>
              <div className="sf-item-acties">
                <button
                  type="button"
                  className="btn btn-outline iconbtn"
                  aria-label="Omhoog"
                  onClick={() => move(i, -1)}
                >
                  <ChevronUp />
                </button>
                <button
                  type="button"
                  className="btn btn-outline iconbtn"
                  aria-label="Omlaag"
                  onClick={() => move(i, 1)}
                >
                  <ChevronDown />
                </button>
                <button
                  type="button"
                  className="btn btn-outline iconbtn sf-verwijder"
                  aria-label="Verwijderen"
                  onClick={() => set(rows.filter((_, j) => j !== i))}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
            <div className="sf-velden">
              {(field.of ?? []).map((sub) => (
                <SubLabelled
                  key={sub.key}
                  field={sub}
                  value={row[sub.key]}
                  onChange={(v) => set(rows.map((r, j) => (j === i ? { ...r, [sub.key]: v } : r)))}
                />
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline sf-toevoegen"
          onClick={() => set([...rows, {}])}
        >
          <Plus /> {itemLabel} toevoegen
        </button>
      </div>
    );
  }

  if (field.type === "image") {
    return <ImageControl value={str(value)} onChange={onChange} />;
  }

  if (field.type === "textarea" || field.type === "markdown") {
    return (
      <textarea
        value={str(value)}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="sf-tekst"
      />
    );
  }
  return (
    <input
      type={field.type === "number" ? "number" : "text"}
      value={str(value)}
      placeholder={field.placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/** Subveld met een klein label erboven. */
function SubLabelled({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  return (
    <div className="sf-sub">
      <label>{field.label}</label>
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
      <VerborgenWaarde name={`f_${field.key}`} value={JSON.stringify(value)} />
      <Control field={field} value={value} onChange={setValue} />
      {field.help && <p className="veldhulp">{field.help}</p>}
    </div>
  );
}
