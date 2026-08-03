"use client";

import { useState } from "react";

export function SelectField({
  name,
  label,
  options,
  defaultValue,
  help,
}: {
  name: string;
  label: string;
  options: string[];
  defaultValue: string;
  help?: string;
}) {
  const initial = options.includes(defaultValue) ? defaultValue : (options[0] ?? "");
  const [value, setValue] = useState(initial);

  return (
    <div className="fld">
      <label>{label}</label>
      <input type="hidden" name={name} value={value} />
      <div className="choicechips">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`chip${value === opt ? " on" : ""}`}
            aria-pressed={value === opt}
            onClick={() => setValue(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {help && (
        <p className="t-sub" style={{ marginTop: 8 }}>
          {help}
        </p>
      )}
    </div>
  );
}
