import { Check, X } from "lucide-react";
import type { Vraagstuk } from "@/lib/content-blokken";
import "./secties.css";
import { getPagina } from "@/lib/paginas-data";
import { SectieKop } from "@/components/sectie-kop";

/**
 * Secties die het probleem van de bezoeker adresseren. Gedeeld door de
 * richting-hubs en de dienstpagina's, zodat de opmaak niet op twee plekken
 * los van elkaar kan gaan afwijken. Elke sectie rendert niets als hij leeg is.
 */

export async function VraagstukkenSectie({ vraagstukken }: { vraagstukken: Vraagstuk[] }) {
  if (!vraagstukken.length) return null;
  const t = await getPagina("dienst-detail");
  return (
    <section className="block" id="vraagstukken">
      <div className="wrap-wide">
        <SectieKop kicker={t.vraagstukkenKicker} titel={t.vraagstukkenTitel} groot />
        <div className="chal-grid">
          {vraagstukken.map((v, i) => (
            <div className="chal-card kaart" key={i}>
              <div className="q">{v.q}</div>
              <h3>{v.titel}</h3>
              <p>{v.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface WelNietProps {
  titel?: string;
  wel?: string[];
  niet?: string[];
}

/** "Wanneer wel, wanneer niet" — het eerlijke nee, naast waar het juist past. */
export async function WelNietSectie({ titel, wel = [], niet = [] }: WelNietProps) {
  if (!wel.length && !niet.length) return null;
  const t = await getPagina("dienst-detail");
  return (
    <section className="block welniet">
      <div className="wrap-wide">
        <SectieKop
          kicker={t.welNietKicker}
          titel={titel || "Wanneer dit past, en wanneer niet"}
          groot
        />
        <div className="welniet-grid">
          {wel.length > 0 && (
            <div className="welniet-kolom kaart">
              <h3>{t.welTitel}</h3>
              <ul>
                {wel.map((r) => (
                  <li key={r}>
                    <Check aria-hidden="true" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {niet.length > 0 && (
            <div className="welniet-kolom welniet-kolom--niet kaart">
              <h3>{t.nietTitel}</h3>
              <ul>
                {niet.map((r) => (
                  <li key={r}>
                    <X aria-hidden="true" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
