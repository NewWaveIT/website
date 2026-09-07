import Link from "next/link";
import { ChevronRight } from "lucide-react";
import "./fase-tijdlijn.css";

export interface FaseTijdlijnItem {
  nummer: number;
  titel: string;
  tekst: string;
}

interface FaseTijdlijnProps {
  fases: FaseTijdlijnItem[];
  /** "vol" = volledige tijdlijn (overzichtspagina), "lite" = verkorte versie op een richting-hub. */
  variant?: "vol" | "lite";
  /** lite: welke fasenummers bij deze richting horen. */
  actieveFases?: number[];
  /** vol: label van de link onder de strip terug naar de keuzematrix. */
  cta?: string;
}

/**
 * Het volwassenheidsmodel: vijf fasen om jezelf te plaatsen. Bewust alléén
 * positionering — welke dienst bij welke fase hoort staat als fase-badge op de
 * kaarten in de keuzematrix. Zo zijn alle vijf de fasen gelijkwaardig, ook de
 * fasen die (nog) geen eigen dienst hebben.
 */
export function FaseTijdlijn({ fases, variant = "vol", actieveFases, cta }: FaseTijdlijnProps) {
  if (variant === "lite") {
    return (
      <div className="fase-tijdlijn--lite">
        <div className="fase-lite-rij">
          {fases.map((f) => (
            <span
              key={f.nummer}
              className={`fase-dot${actieveFases?.includes(f.nummer) ? " fase-dot--actief" : ""}`}
              title={f.titel}
            >
              {f.nummer}
            </span>
          ))}
        </div>
        <Link href="/diensten#fasen" className="fase-lite-link">
          Bekijk het volledige stappenplan <ChevronRight aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="fase-tijdlijn">
        {fases.map((f, i) => (
          <div className="fase-item" key={f.nummer}>
            <div className="fase-num">{`0${f.nummer}`}</div>
            <h3>{f.titel}</h3>
            <p>{f.tekst}</p>
            {i < fases.length - 1 && <ChevronRight className="fase-arrow" aria-hidden="true" />}
          </div>
        ))}
      </div>
      {cta && (
        <a href="#kies-je-richting" className="fase-cta">
          {cta} <ChevronRight aria-hidden="true" />
        </a>
      )}
    </>
  );
}
