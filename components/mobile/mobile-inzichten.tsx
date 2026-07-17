import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ARTIKELEN } from "@/lib/inzichten";
import { MobileFx } from "./mobile-fx";

const FILTERS = ["Alle", "AI", "Mendix", "Strategie", "Sectoren"];

export function MobileInzichten() {
  const featured = ARTIKELEN[0];
  const rest = ARTIKELEN.slice(1);
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
            {FILTERS.map((f, i) => (
              <span key={f} className={i === 0 ? "fchip on" : "fchip"}>{f}</span>
            ))}
          </div>

          <Link href={`/inzichten/${featured.slug}`} className="feat rv">
            <div className="media" style={{ backgroundImage: `url('${featured.image}')` }} />
            <div className="body">
              <div className="kicker on-dark">Uitgelicht · {featured.cat}</div>
              <h2>{featured.titel}</h2>
              <p>{featured.intro}</p>
              <div className="meta">{featured.leestijd} leestijd · {featured.datum} · {featured.auteur}</div>
            </div>
          </Link>

          <div className="plist">
            {rest.map((a) => (
              <Link key={a.slug} href={`/inzichten/${a.slug}`} className="post rv">
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
