import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import { getKlantverhalen } from "@/lib/klantverhalen-data";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { MobileKlantverhalen } from "@/components/mobile/mobile-klantverhalen";
import "./klantverhalen.css";
import "./mobile.css";

export const metadata: Metadata = {
  title: "Klantverhalen — resultaat dat je kunt navragen",
  description:
    "Verhalen van organisaties in de publieke sector, mobiliteit, banken, zorg en manufacturing, verteld met de cijfers erbij.",
  alternates: { canonical: "/klantverhalen" },
};

export const revalidate = 300;

const FILTERS = ["Alle", "Publieke sector", "Mobiliteit", "Banken", "Zorg", "Manufacturing"];

export default async function KlantverhalenPage() {
  const verhalen = await getKlantverhalen();
  const featured = verhalen[0];
  return (
    <>
      <MobileKlantverhalen verhalen={verhalen} />
    <div className="p-klanten only-desktop">
      <section className="dhero">
        <SectorHeroAnim theme="klantverhalen" />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Klantverhalen
          </div>
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"Klantverhalen"}
          </div>
          <h1>
            Resultaat dat je kunt <em>navragen</em>.
          </h1>
          <p>
            Geen beloftes maar bewijs: verhalen van organisaties in onze sectoren,
            verteld met de cijfers erbij. Bel ze gerust, dat vinden ze niet erg.
          </p>
        </div>
      </section>

      {featured && (
        <section className="block" style={{ background: "var(--eggshell)" }}>
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Uitgelicht</div>
              <h2>{featured.cardTitel}</h2>
            </div>
            <div className="case-mini">
              <div className="media">
                <Image src={featured.image} alt={featured.cardTitel} fill sizes="(max-width: 980px) 100vw, 45vw" style={{ objectFit: "cover" }} />
                <button type="button" className="playbig" aria-label="Bekijk video">
                  <Play />
                </button>
              </div>
              <div className="body">
                <div className="kicker">{featured.tag}</div>
                <blockquote>{featured.quote}</blockquote>
                <div className="who">
                  <strong>{featured.quoteNaam}</strong>, {featured.quoteRol}
                  <br />
                  <Link
                    href={`/klantverhalen/${featured.slug}`}
                    style={{ display: "inline-block", marginTop: 14, fontWeight: "var(--fw-semibold)" }}
                  >
                    Lees het volledige verhaal →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="block">
        <div className="wrap-wide">
          <div className="filters">
            {FILTERS.map((f, i) => (
              <span className={i === 0 ? "fchip on" : "fchip"} key={f}>
                {f}
              </span>
            ))}
          </div>
          <div className="cgrid">
            {verhalen.map((k) => (
              <Link href={`/klantverhalen/${k.slug}`} className="ccard" key={k.slug}>
                <div className="cover">
                  <Image src={k.image} alt={k.cardTitel} fill sizes="(max-width: 980px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  <span className="cat">{k.sector}</span>
                </div>
                <div className="cbody">
                  <div className="metric">{k.metric}</div>
                  <h3>{k.cardTitel}</h3>
                  <p className="org">{k.org}</p>
                  <span className="more">
                    Lees het verhaal <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>Herken je jouw vraagstuk in deze verhalen?</h2>
          <Link href="/contact" className="btn btn-on">
            Plan een strategiegesprek <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
