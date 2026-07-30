import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import type { Vacature } from "@/lib/vacatures";
import { MobileFx } from "./mobile-fx";

export function MobileWerkenBij({ vacatures, werken }: { vacatures: Vacature[]; werken: Record<string, string> }) {
  return (
    <div className="m-page m-werken only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Werken bij</div>
          <div className="kicker on-dark">{"Werken bij The New Wave IT"}</div>
          <h1>{werken.heroTitleStart}<em>{werken.heroAccent}</em>.</h1>
          <p>{werken.heroLeadMobiel}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
            <a href="#vacatures" className="btn btn-primary">Bekijk vacatures <ArrowRight /></a>
            <Link href="/over-ons" className="btn btn-ghost-dark">Leer ons eerst kennen</Link>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head"><div className="kicker">{werken.groeiKicker}</div><h2>{werken.groeiTitel}</h2></div>
          <div className="glist">
            {["1", "2", "3"].map((n) => (
              <div className="gcard rv" key={n}><div className="num">{`0${n}`}</div><h3>{werken[`groei${n}Titel`]}</h3><p>{werken[`groei${n}Tekst`]}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "var(--eggshell)" }}>
        <div className="wrap">
          <div className="sec-head"><div className="kicker">{werken.tpKicker}</div><h2>{werken.tpTitel}</h2></div>
          <div className="tplist">
            {["1", "2", "3"].map((n) => (
              <div className="tp rv" key={n}><h3>{werken[`tp${n}Titel`]}</h3><p>{werken[`tp${n}Tekst`]}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="block cultuur" id="cultuur">
        <div className="wrap">
          <div className="media-img rv"><Image src="/assets/photos/team-presentatie-breed.webp" alt="Wavers tijdens een kennissessie" fill sizes="100vw" /></div>
          <div className="kicker">{werken.cultuurKicker}</div>
          <h2 style={{ fontSize: "var(--text-xl)", margin: "12px 0 16px" }}>{werken.cultuurTitel}</h2>
          <ul className="rv">
            {["1", "2", "3", "4"].map((n) => <li key={n}><Check /> {werken[`cultuur${n}`]}</li>)}
          </ul>
        </div>
      </section>

      <section className="block vacatures" id="vacatures">
        <div className="wrap">
          <div className="sec-head"><div className="kicker on-dark">Vacatures</div><h2 style={{ color: "#fff" }}>Kom de golf versterken.</h2></div>
          {vacatures.map((v) => (
            <Link key={v.slug} href={`/vacatures/${v.slug}`} className="vrow rv">
              <div><h3>{v.functietitel}</h3><span className="meta">{v.discipline} · {v.locatie}</span></div>
              <ArrowRight className="arrow" />
            </Link>
          ))}
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-on-dark-muted)", marginTop: 20, lineHeight: 1.6 }}>
            Staat jouw rol er niet tussen? Stuur een open sollicitatie naar{" "}
            <a href="mailto:hello@thenewwaveit.com" style={{ color: "var(--orange-400)" }}>hello@thenewwaveit.com</a>.
          </p>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>{werken.ctaTitel}</h2>
          <Link href="/contact" className="btn">Plan een kennismaking <ArrowRight /></Link>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
