"use client";

import { useState } from "react";
import {
  Boxes,
  BrainCircuit,
  Route,
  Building2,
  TrainFront,
  Banknote,
  HeartPulse,
  Factory,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

const REGISTRY: Record<string, LucideIcon> = {
  boxes: Boxes,
  "brain-circuit": BrainCircuit,
  route: Route,
  "building-2": Building2,
  "train-front": TrainFront,
  banknote: Banknote,
  "heart-pulse": HeartPulse,
  factory: Factory,
};

export function IconField({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: string[];
  defaultValue: string;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="fld">
      <label>{label}</label>
      <input type="hidden" name={name} value={value} />
      <div className="iconpick">
        {options.map((opt) => {
          const Icon = REGISTRY[opt] ?? HelpCircle;
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              className={`icontile${active ? " active" : ""}`}
              aria-pressed={active}
              onClick={() => setValue(opt)}
            >
              <Icon />
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
