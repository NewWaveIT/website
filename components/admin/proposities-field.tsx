"use client";

import { useState } from "react";

export type PropositieOptie = { slug: string; titel: string; nummer?: number };

/**
 * Meervoudige keuze van proposities voor een sector (PMC-koppeling).
 * Schrijft een JSON-array van slugs naar een verborgen input.
 */
export function PropositiesField({
  name,
  label,
  options,
  defaultValue,
  help,
}: {
  name: string;
  label: string;
  options: PropositieOptie[];
  defaultValue: string[];
  help?: string;
}) {
  const [sel, setSel] = useState<string[]>(defaultValue ?? []);
  const toggle = (slug: string) =>
    setSel((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]));

  return (
    <div className="fld">
      <label>{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(sel)} />
      {options.length === 0 ? (
        <p className="t-sub">
          Nog geen proposities aangemaakt. Voeg ze eerst toe onder ‘Proposities’.
        </p>
      ) : (
        <div className="choicechips">
          {options.map((o) => (
            <button
              key={o.slug}
              type="button"
              className={`chip${sel.includes(o.slug) ? " on" : ""}`}
              aria-pressed={sel.includes(o.slug)}
              onClick={() => toggle(o.slug)}
            >
              {o.titel}
            </button>
          ))}
        </div>
      )}
      <p className="t-sub" style={{ marginTop: 8 }}>
        {help ?? "Leeg = alle proposities tonen op deze sectorpagina."}
      </p>
    </div>
  );
}
