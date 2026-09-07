import Link from "next/link";
import { Boxes, BrainCircuit, Route, ArrowRight } from "lucide-react";
import { RICHTINGEN, type ServiceRichting } from "@/lib/services";
import type { DienstMatrix as Matrix } from "@/lib/services-data";
import { ServiceCard } from "./service-card";
import "./niveau.css";
import "./dienst-matrix.css";

const ICON: Record<ServiceRichting, typeof Boxes> = {
  mendix: Boxes,
  ai: BrainCircuit,
  strategie: Route,
};

interface DienstMatrixProps {
  matrix: Matrix;
  /** Korte toelichting onder het niveaulabel van een richting-overstijgende rij. */
  breedNoot: string;
}

/**
 * De keuzematrix: kies een richting (kolom) en begin bij het instapniveau
 * (bovenste rij). Niveaus die richting-overstijgend werken lopen als één rij
 * over de volle breedte door.
 */
export function DienstMatrix({ matrix, breedNoot }: DienstMatrixProps) {
  /** Aantal diensten dat op de richtingpagina zelf staat. */
  const aantalPerRichting = (richting: ServiceRichting) =>
    matrix.rijen.reduce(
      (n, rij) =>
        n +
        (rij.layout === "kolommen"
          ? rij.cellen.filter((c) => c.richting === richting).length
          : rij.diensten.filter((s) => s.richting === richting).length),
      0,
    );

  return (
    <div className="dmatrix">
      <div className="dmatrix-kop">
        <div className="dmatrix-hoek" aria-hidden="true" />
        {RICHTINGEN.map(({ key, naam, href }) => {
          const Icon = ICON[key];
          const n = aantalPerRichting(key);
          return (
            <Link href={href} className="dmatrix-richting" key={key}>
              <span className="ic">
                <Icon aria-hidden="true" />
              </span>
              <span className="naam">{naam}</span>
              <span className="meta">
                {n} {n === 1 ? "dienst" : "diensten"} <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>

      {matrix.rijen.map((rij) => (
        <div className="dmatrix-rij niveau-rij" key={rij.familie}>
          <div className={`niveau-stap${rij.niveau === 1 ? " niveau-stap--instap" : ""}`}>
            <span className="num">{String(rij.niveau).padStart(2, "0")}</span>
            <h3>{rij.label}</h3>
            <p>{rij.kicker}</p>
            {rij.niveau === 1 && <span className="begin">Begin hier</span>}
            {rij.layout === "breed" && breedNoot && <span className="noot">{breedNoot}</span>}
          </div>

          {rij.layout === "kolommen" ? (
            rij.cellen.map((cel) => (
              <ServiceCard service={cel.service} compact toonFase key={cel.richting} />
            ))
          ) : (
            <div className="dmatrix-breed">
              {rij.diensten.map((s) => (
                <ServiceCard service={s} compact toonFase key={s.slug} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
