import Link from "next/link";
import { Check, ArrowRight, Plus } from "lucide-react";
import type { Service } from "@/lib/services";
import "./service-card.css";

const RICHTING_LABEL: Record<string, string> = {
  mendix: "Mendix",
  ai: "AI",
  strategie: "Strategie",
};

interface ServiceCardProps {
  service: Service;
  /** Toont een fase-badge — koppelt de kaart aan het volwassenheidsmodel onderaan /diensten. */
  toonFase?: boolean;
  /**
   * Compact: doelgroep, beschrijving en resultaten zitten achter een uitklap.
   * Gebruikt in de keuzematrix, waar negen kaarten naast elkaar staan.
   */
  compact?: boolean;
}

/** Eén kaart uit de dienstencatalogus. `id="svc-<slug>"` is het ankerdoel vanaf de fasenlijn. */
export function ServiceCard({ service: s, toonFase = false, compact = false }: ServiceCardProps) {
  const href = `/contact?dienst=${s.slug}&type=${s.ctaType}`;

  const diepte = (
    <>
      <p className="svc-doelgroep">Voor: {s.doelgroep}</p>
      <p className="svc-beschrijving">{s.beschrijving}</p>
      <ul className="svc-res">
        {s.resultaten.map((r) => (
          <li key={r}>
            <Check aria-hidden="true" /> {r}
          </li>
        ))}
      </ul>
      <p className="svc-stap">Logische volgende stap: {s.volgendeStap}</p>
    </>
  );

  return (
    <div className={`svc-card${compact ? " svc-card--compact" : ""}`} id={`svc-${s.slug}`}>
      {(toonFase && s.fase) || s.richting ? (
        <div className="svc-top">
          {toonFase && s.fase && <span className="svc-fase">Fase {s.fase}</span>}
          {s.richting && <span className="svc-richting">{RICHTING_LABEL[s.richting]}</span>}
        </div>
      ) : null}
      <h3>{s.naam}</h3>
      <p className="svc-pitch">{s.pitch}</p>
      <div className="svc-feiten">
        <span>{s.duur}</span>
        {s.groepsgrootte && <span>{s.groepsgrootte}</span>}
      </div>
      <div className="svc-prijs">
        {s.prijzen.map((p) => (
          <div key={p.label}>
            <strong>{p.label}</strong>
            {p.variant && <span> {p.variant}</span>}
          </div>
        ))}
      </div>

      {compact ? (
        <details className="svc-diepte">
          <summary>
            Wat je meeneemt <Plus aria-hidden="true" />
          </summary>
          {diepte}
        </details>
      ) : (
        diepte
      )}

      <div className="svc-acts">
        <Link href={href} className="btn btn-primary btn-sm">
          {s.ctaLabel} <ArrowRight aria-hidden="true" />
        </Link>
        {s.detailSlug && (
          <Link href={`/diensten/${s.detailSlug}`} className="svc-meer">
            Meer over deze dienst <ArrowRight aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
