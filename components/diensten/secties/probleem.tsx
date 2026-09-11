import { Check, X } from "lucide-react";
import type { Vraagstuk } from "@/lib/content-blokken";
import "./secties.css";

/**
 * Secties die het probleem van de bezoeker adresseren. Gedeeld door de
 * richting-hubs en de dienstpagina's, zodat de opmaak niet op twee plekken
 * los van elkaar kan gaan afwijken. Elke sectie rendert niets als hij leeg is.
 */

export function VraagstukkenSectie({ vraagstukken }: { vraagstukken: Vraagstuk[] }) {
  if (!vraagstukken.length) return null;
  return (
    <section className="block" id="vraagstukken">
      <div className="wrap-wide">
        <div className="sec-head">
          <div className="kicker">Wanneer zet je dit in</div>
          <h2 className="sectie-h2">Hiervoor komen organisaties bij ons</h2>
        </div>
        <div className="chal-grid">
          {vraagstukken.map((v, i) => (
            <div className="chal-card" key={i}>
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
export function WelNietSectie({ titel, wel = [], niet = [] }: WelNietProps) {
  if (!wel.length && !niet.length) return null;
  return (
    <section className="block welniet">
      <div className="wrap-wide">
        <div className="sec-head">
          <div className="kicker">Eerlijk over de grenzen</div>
          <h2 className="sectie-h2">{titel || "Wanneer dit past, en wanneer niet"}</h2>
        </div>
        <div className="welniet-grid">
          {wel.length > 0 && (
            <div className="welniet-kolom">
              <h3>Dit past als…</h3>
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
            <div className="welniet-kolom welniet-kolom--niet">
              <h3>Dit past niet als…</h3>
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
