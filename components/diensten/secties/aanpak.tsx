import Image from "next/image";
import { Check, Plus } from "lucide-react";
import type { AanpakRow, Pijler } from "@/lib/content-blokken";
import "./secties.css";
import { vulIn } from "@/lib/utils";
import { getPagina } from "@/lib/paginas-data";
import { SectieKop } from "@/components/sectie-kop";

/** Wat we doen en hoe. Gedeeld door de richting-hubs en de dienstpagina's. */

export async function PijlersSectie({
  pijlers,
  intro,
  naam,
}: {
  pijlers: Pijler[];
  intro?: string;
  naam: string;
}) {
  if (!pijlers.length) return null;
  const t = await getPagina("dienst-detail");
  return (
    <section className="block pijlers" id="diensten">
      <div className="wrap-wide">
        <SectieKop
          kicker={t.pijlersKicker}
          titel={vulIn(t.pijlersTitel, { naam })}
          intro={intro}
          groot
        />
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

export async function AanpakSectie({ aanpak }: { aanpak: AanpakRow[] }) {
  if (!aanpak.length) return null;
  const t = await getPagina("dienst-detail");
  return (
    <section className="block sol" id="aanpak">
      <div className="wrap-wide">
        <SectieKop kicker={t.aanpakKicker} titel={t.aanpakTitel} groot />
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
                <Image src={row.img} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
