"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Artikel } from "@/lib/inzichten";
import { ArtikelKaart } from "@/components/artikel-kaart";

const ALLE = "Alle";
const CATEGORIEEN = [
  "Mendix",
  "AI",
  "Strategie",
  "Publieke sector",
  "Mobiliteit",
  "Banken",
  "Zorg",
  "Manufacturing",
];

export interface LijstTeksten {
  inzichtenLeeg: string;
  inzichtenMeer: string;
}

export function InzichtenList({ artikelen, tk }: { artikelen: Artikel[]; tk: LijstTeksten }) {
  const [actief, setActief] = useState(ALLE);

  // Alleen filters tonen waarvoor er artikelen zijn.
  const beschikbaar = CATEGORIEEN.filter((c) =>
    artikelen.some((a) => a.discipline === c || a.sector === c),
  );
  const chips = [ALLE, ...beschikbaar];

  const gefilterd =
    actief === ALLE
      ? artikelen
      : artikelen.filter((a) => a.discipline === actief || a.sector === actief);
  const featured = gefilterd[0];
  const grid = gefilterd.slice(1, 7);

  /**
   * Lege staat. Alleen voor "helemaal geen artikelen": de filterknoppen worden
   * hierboven al beperkt tot categorieën die artikelen hébben, dus een filter
   * zonder treffers bestaat niet. Zonder deze tekst stond er een rij knoppen
   * boven witruimte en leek de pagina stuk.
   */
  if (artikelen.length === 0) {
    return (
      <p className="leeg" role="status">
        {tk.inzichtenLeeg}
      </p>
    );
  }

  return (
    <>
      <div className="filters">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            className={c === actief ? "fchip on" : "fchip"}
            onClick={() => setActief(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <Link href={`/inzichten/${featured.slug}`} className="feat">
          <div className="media">
            <Image
              src={featured.image}
              alt={featured.titel}
              fill
              sizes="(max-width: 980px) 100vw, 45vw"
            />
          </div>
          <div className="body">
            <div className="kicker on-dark">Uitgelicht · {featured.cat}</div>
            <h2>{featured.titel}</h2>
            <p>{featured.intro}</p>
            <div className="meta">
              {featured.leestijd} leestijd · {featured.datum} · door {featured.auteur}
            </div>
          </div>
        </Link>
      )}

      <div className="cards3">
        {grid.map((a) => (
          <ArtikelKaart key={a.slug} artikel={a} meerLabel={tk.inzichtenMeer} />
        ))}
      </div>
    </>
  );
}
