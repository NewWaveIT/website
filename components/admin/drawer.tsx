"use client";

import { useId } from "react";
import { X } from "lucide-react";
import { useDialoog } from "@/lib/hooks/use-dialoog";
import { cn } from "@/lib/utils";

/**
 * Het detailpaneel dat vanaf rechts inschuift, op /admin/aanvragen en
 * /admin/sollicitaties. Twee keer bijna dezelfde honderd regels, dus nu één
 * component — en daarmee ook één plek waar de dialoogafspraken staan.
 *
 * Blijft in de DOM staan als hij dicht is, want de transitie moet ergens
 * vandaan komen. Daarom `inert`: anders staan de sluitknop en de statusknoppen
 * van een onzichtbaar paneel gewoon in de tabvolgorde.
 */
export function Drawer({
  open,
  titel,
  subtitel,
  onClose,
  children,
  footer,
}: {
  open: boolean;
  titel: string;
  subtitel?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const titelId = useId();
  const paneelRef = useDialoog<HTMLElement>(open, onClose);

  return (
    <div className={cn("drawer-wrap", open && "open")} inert={!open}>
      <div className="overlay" onClick={onClose} aria-hidden="true" />
      <aside
        className="drawer"
        ref={paneelRef}
        // Alleen een dialoog zolang er iets in staat. Dicht is de inhoud weg,
        // en dan zou `aria-labelledby` naar een id wijzen dat niet bestaat.
        role={open ? "dialog" : undefined}
        aria-modal={open ? "true" : undefined}
        aria-labelledby={open ? titelId : undefined}
        tabIndex={-1}
      >
        {open && (
          <>
            <div className="dhead">
              <div className="dtitel">
                <h2 id={titelId}>{titel}</h2>
                {subtitel && <div className="sub">{subtitel}</div>}
              </div>
              <button type="button" className="x" onClick={onClose} aria-label="Sluiten">
                <X />
              </button>
            </div>
            <div className="dbody">{children}</div>
            {footer && <div className="dfoot">{footer}</div>}
          </>
        )}
      </aside>
    </div>
  );
}

/**
 * De statusknoppen in een drawer. `aria-pressed` in plaats van alleen een
 * `.on`-klasse: zonder dat hoort een schermlezer vier knoppen met een naam en
 * geen enkele aanwijzing welke fase de aanvraag nú heeft.
 */
export function Statusbalk<T extends string>({
  label,
  opties,
  labels,
  waarde,
  onKies,
}: {
  label: string;
  opties: readonly T[];
  labels: Record<T, string>;
  waarde: T;
  onKies: (s: T) => void;
}) {
  const labelId = useId();
  return (
    <div className="fld">
      <span className="lbl" id={labelId}>
        {label}
      </span>
      <div className="statusbar" role="group" aria-labelledby={labelId}>
        {opties.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={s === waarde}
            className={cn(s === waarde && "on")}
            onClick={() => onKies(s)}
          >
            {labels[s]}
          </button>
        ))}
      </div>
    </div>
  );
}
