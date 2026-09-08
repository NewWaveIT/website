import Image from "next/image";
import { Check, Plus } from "lucide-react";
import type { AanpakRow, Pijler } from "@/lib/content-blokken";
import "./secties.css";

/** Wat we doen en hoe. Gedeeld door de richting-hubs en de dienstpagina's. */

export function PijlersSectie({
  pijlers,
  intro,
  naam,
}: {
  pijlers: Pijler[];
  intro?: string;
  naam: string;
}) {
  if (!pijlers.length) return null;
  return (
    <section className="block" id="diensten" style={{ background: "var(--eggshell)" }}>
      <div className="wrap-wide">
        <div className="sec-head">
          <div className="kicker">Wat we doen</div>
          <h2 className="sectie-h2">Onze {naam}-diensten</h2>
          {intro && <p>{intro}</p>}
        </div>
        <div className="pillars">
          {pijlers.map((p) => (
            <div className="pillar" key={p.num}>
              <div className="num">{p.num}</div>
              <h3>{p.titel}</h3>
              <p>{p.p}</p>
              {p.items.map((it, idx) => (
                <details key={idx} open={idx === 0}>
                  <summary>
                    {it.summary} <Plus />
                  </summary>
                  <p>{it.p}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AanpakSectie({ aanpak }: { aanpak: AanpakRow[] }) {
  if (!aanpak.length) return null;
  return (
    <section className="block sol" id="aanpak" style={{ background: "var(--paper)" }}>
      <div className="wrap-wide">
        <div className="sec-head">
          <div className="kicker">Onze aanpak</div>
          <h2 className="sectie-h2">Zo pakken we het aan</h2>
        </div>
        {aanpak.map((row, i) => (
          <div className={i % 2 === 1 ? "sol-row rev" : "sol-row"} key={i}>
            <div className="txt">
              <div className="kicker">{row.kicker}</div>
              <h3>{row.titel}</h3>
              <p>{row.p}</p>
              <ul>
                {row.punten.map((pt, idx) => (
                  <li key={idx}>
                    <Check /> {pt}
                  </li>
                ))}
              </ul>
            </div>
            {row.img && (
              <div className="ph">
                <Image
                  src={row.img}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
