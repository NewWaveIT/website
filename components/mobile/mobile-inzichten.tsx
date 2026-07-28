"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Artikel } from "@/lib/inzichten";
import { MobileFx } from "./mobile-fx";

const ALLE = "Alle";
const CATEGORIEEN = ["Mendix", "AI", "Strategie", "Publieke sector", "Mobiliteit", "Banken", "Zorg", "Manufacturing"];

export function MobileInzichten({ artikelen }: { artikelen: Artikel[] }) {
  const [actief, setActief] = useState(ALLE);
  const beschikbaar = CATEGORIEEN.filter((c) => artikelen.some((a) => a.discipline === c || a.sector === c));
  const chips = [ALLE, ...beschikbaar];
  const gefilterd =
    actief === ALLE ? artikelen : artikelen.filter((a) => a.discipline === actief || a.sector === actief);
  const featured = gefilterd[0];
  const rest = gefilterd.slice(1);

  return (
    <div className="m-page m-inzichten only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Inzichten</div>
          <div className="kicker on-dark">{"// Inzichten"}</div>
          <h1>Kennis die je <em>morgen</em> kunt gebruiken.</h1>
          <p>Praktische artikelen over Mendix, AI en digitale strategie, zonder jargon.</p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="hscroll" style={{ marginBottom: 20 }}>
            {chips.map((c) => (
              <button key={c} type="button" className={c === actief ? "fchip on" : "fchip"} onClick={() => setActief(c)}>
                {c}
              </button>
            ))}
          </div>

          {featured && (
            <Link href={`/inzichten/${featured.slug}`} className="feat">
              <div className="media" style={{ backgroundImage: `url('${featured.image}')` }} />
              <div className="body">
                <div className="kicker on-dark">Uitgelicht · {featured.cat}</div>
                <h2>{featured.titel}</h2>
                <p>{featured.intro}</p>
                <div className="meta">{featured.leestijd} leestijd · {featured.datum} · {featured.auteur}</div>
              </div>
            </Link>
          )}

          <div className="plist">
            {rest.map((a) => (
              <Link key={a.slug} href={`/inzichten/${a.slug}`} className="post">
                <div className="cover" style={{ backgroundImage: `url('${a.image}')` }} />
                <div>
                  <span className="cat">{a.cat}</span>
                  <h3>{a.titel}</h3>
                  <div className="meta">{a.leestijd} · {a.datum}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block nieuwsbrief" style={{ background: "var(--eggshell)" }}>
        <div className="wrap">
          <div className="inner rv">
            <div className="kicker">Nieuwsbrief</div>
            <h2>Eén mail per maand, alleen het beste</h2>
            <p>Onze scherpste inzichten over technologie in jouw sector. Geen sales, uitschrijven kan altijd.</p>
            <form action="/contact">
              <input type="email" placeholder="naam@organisatie.nl" aria-label="E-mailadres" />
              <button type="submit" className="btn btn-primary btn-block">Aanmelden</button>
            </form>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Liever sparren dan lezen?</h2>
          <Link href="/contact" className="btn">Plan een strategiegesprek <ArrowRight /></Link>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
