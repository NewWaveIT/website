"use client";

import { useState } from "react";
import Image from "next/image";

export interface TeamOptie {
  slug: string;
  naam: string;
  foto: string;
}

export function AuthorField({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: TeamOptie[];
  defaultValue: string;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="fld">
      <label>{label}</label>
      <input type="hidden" name={name} value={value} />
      {options.length === 0 ? (
        <p className="t-sub">Nog geen teamleden. Voeg ze toe onder Teamleden.</p>
      ) : (
        <div className="authorpick">
          {options.map((o) => {
            const active = value === o.slug || value === o.naam;
            return (
              <button
                key={o.slug}
                type="button"
                className={`authortile${active ? " active" : ""}`}
                aria-pressed={active}
                onClick={() => setValue(active ? "" : o.slug)}
              >
                <span className="av">
                  <Image src={o.foto} alt="" fill sizes="44px" style={{ objectFit: "cover" }} />
                </span>
                <span className="nm">{o.naam}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
