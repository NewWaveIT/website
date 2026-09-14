"use client";

import { useId } from "react";
import { X } from "lucide-react";
import { useDialoog } from "@/lib/hooks/use-dialoog";

/** Nette, in-stijl modal voor de CMS. Sluit op Esc, kruisje en klik buiten. */
export function Modal({
  title,
  onClose,
  children,
  footer,
  width,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
}) {
  const titelId = useId();
  const paneelRef = useDialoog<HTMLDivElement>(true, onClose);

  return (
    <div
      className="modal-ov"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        ref={paneelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titelId}
        tabIndex={-1}
        style={width ? { maxWidth: width } : undefined}
      >
        <div className="mhead">
          <h2 id={titelId}>{title}</h2>
          <button type="button" className="x" onClick={onClose} aria-label="Sluiten">
            <X />
          </button>
        </div>
        <div className="mbody">{children}</div>
        {footer && <div className="mfoot">{footer}</div>}
      </div>
    </div>
  );
}
