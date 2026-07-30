import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import type { Klantverhaal } from "@/lib/klantverhalen";
import { MobileFx } from "./mobile-fx";

const FILTERS = ["Alle", "Publieke sector", "Mobiliteit", "Banken", "Zorg", "Manufacturing"];

export function MobileKlantverhalen({ verhalen }: { verhalen: Klantverhaal[] }) {
  const featured = verhalen[0];
  return (
    <div className="m-page m-klanten only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Klantverhalen</div>
          <div className="kicker on-dark">{"Klantverhalen"}</div>
          <h1>Resultaat dat je kunt <em>navragen</em>.</h1>
          <p>Geen beloftes maar bewijs, verteld met de cijfers erbij. Bel ze gerust, dat vinden ze niet erg.</p>
        </div>
      </section>

      {featured && (
        <section className="block" style={{ background: "var(--eggshell)" }}>
          <div className="wrap">
            <div className="sec-head"><div className="kicker">Uitgelicht</div><h2>{featured.cardTitel}</h2></div>
            <div className="fcase rv">
              <div className="media">
                <div className="kbwrap"><div className="kb" style={{ backgroundImage: `url('${featured.image}')` }} /></div>
                <button type="button" className="playbig" aria-label="Bekijk video"><Play /></button>
              </div>
              <div className="body">
                <div className="kicker">{featured.tag}</div>
                <blockquote>{featured.quote}</blockquote>
                <div className="who"><strong>{featured.quoteNaam}</strong>, {featured.quoteRol}</div>
                <Link href={`/klantverhalen/${featured.slug}`} className="btn btn-outline btn-block" style={{ marginTop: 16 }}>
                  Lees het volledige verhaal <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="block">
        <div className="wrap">
          <div className="hscroll" style={{ marginBottom: 20 }}>
            {FILTERS.map((f, i) => (
              <span key={f} className={i === 0 ? "fchip on" : "fchip"}>{f}</span>
            ))}
          </div>
          <div className="cgrid">
            {verhalen.map((k) => (
              <Link key={k.slug} href={`/klantverhalen/${k.slug}`} className="ccard rv">
                <div className="cover" style={{ backgroundImage: `url('${k.image}')` }}>
                  <span className="cat">{k.sector}</span>
                </div>
                <div className="cbody">
                  <div className="metric">{k.metric}</div>
                  <h3>{k.cardTitel}</h3>
                  <p className="org">{k.org}</p>
                  <span className="more">Lees het verhaal <ArrowRight /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Herken je jouw vraagstuk in deze verhalen?</h2>
          <Link href="/contact" className="btn">Plan een strategiegesprek <ArrowRight /></Link>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
