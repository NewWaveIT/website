import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ARTIKELEN } from "@/lib/inzichten";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { MobileInzichten } from "@/components/mobile/mobile-inzichten";
import "./inzichten.css";
import "./mobile.css";

export const metadata: Metadata = {
  title: "Inzichten — kennis die je morgen kunt gebruiken",
  description:
    "Praktische artikelen over Mendix, AI en digitale strategie, geschreven vanuit de vraagstukken van onze vijf sectoren, zonder jargon.",
  alternates: { canonical: "/inzichten" },
};

const FILTERS = ["Alle", "AI", "Mendix", "Strategie", "Sectoren"];

export default function InzichtenPage() {
  const featured = ARTIKELEN[0];
  const grid = ARTIKELEN.slice(1, 7);
  return (
    <>
      <MobileInzichten />
    <div className="p-inzichten only-desktop">
      <section className="dhero">
        <SectorHeroAnim theme="inzichten" />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Inzichten
          </div>
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"// Inzichten"}
          </div>
          <h1>
            Kennis die je <em>morgen</em> kunt gebruiken.
          </h1>
          <p>
            Praktische artikelen over Mendix, AI en digitale strategie, geschreven
            vanuit de vraagstukken van onze vijf sectoren, zonder jargon.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap-wide">
          <div className="filters">
            {FILTERS.map((f, i) => (
              <span className={i === 0 ? "fchip on" : "fchip"} key={f}>
                {f}
              </span>
            ))}
          </div>

          <Link href={`/inzichten/${featured.slug}`} className="feat">
            <div className="media" style={{ backgroundImage: `url('${featured.image}')` }} />
            <div className="body">
              <div className="kicker on-dark">Uitgelicht · {featured.cat}</div>
              <h2>{featured.titel}</h2>
              <p>{featured.intro}</p>
              <div className="meta">
                {featured.leestijd} leestijd · {featured.datum} · door {featured.auteur}
              </div>
            </div>
          </Link>

          <div className="cards3">
            {grid.map((a) => (
              <Link href={`/inzichten/${a.slug}`} className="post" key={a.slug}>
                <div className="cover" style={{ backgroundImage: `url('${a.image}')` }}>
                  <span className="cat">{a.cat}</span>
                </div>
                <div className="pbody">
                  <div className="meta">
                    {a.leestijd} · {a.datum}
                  </div>
                  <h3>{a.titel}</h3>
                  <span className="more">
                    Lees meer <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block nieuwsbrief">
        <div className="wrap-wide">
          <div className="inner">
            <div>
              <div className="kicker">Nieuwsbrief</div>
              <h2>Eén mail per maand, alleen het beste</h2>
              <p>
                Onze scherpste inzichten over technologie in jouw sector. Geen
                sales, uitschrijven kan altijd.
              </p>
            </div>
            <form action="/contact">
              <input type="email" placeholder="naam@organisatie.nl" aria-label="E-mailadres" />
              <button type="submit" className="btn btn-primary">
                Aanmelden
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>Liever sparren dan lezen?</h2>
          <Link href="/contact" className="btn btn-on">
            Plan een strategiegesprek <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
