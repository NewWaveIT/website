import Link from "next/link";
import { ChevronRight } from "lucide-react";
import "./fase-tijdlijn.css";

export interface FaseTijdlijnItem {
  nummer: number;
  titel: string;
  tekst: string;
  services: { slug: string; naam: string }[];
}

interface FaseTijdlijnProps {
  fases: FaseTijdlijnItem[];
  /** "vol" = volledige tijdlijn (overzichtspagina), "lite" = verkorte versie op een richting-hub. */
  variant?: "vol" | "lite";
  /** lite: welke fasenummers bij deze richting horen. */
  actieveFases?: number[];
}

/**
 * De 5-fasenlijn als "spine" van /diensten: elke fase toont de diensten die
 * daar thuishoren als klikbare chip naar de bijbehorende kaart (#svc-<slug>).
 * Op een richting-hub tonen we alleen een verkorte variant met terugverwijzing.
 */
export function FaseTijdlijn({ fases, variant = "vol", actieveFases }: FaseTijdlijnProps) {
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
    <div className="fase-tijdlijn">
      {fases.map((f, i) => (
        <div className="fase-item" key={f.nummer}>
          <div className="fase-num">{`0${f.nummer}`}</div>
          <h3>{f.titel}</h3>
          <p>{f.tekst}</p>
          {f.services.length > 0 && (
            <div className="fase-chips">
              {f.services.map((s) => (
                <a className="fase-chip" href={`#svc-${s.slug}`} key={s.slug}>
                  {s.naam}
                </a>
              ))}
            </div>
          )}
          {i < fases.length - 1 && <ChevronRight className="fase-arrow" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
