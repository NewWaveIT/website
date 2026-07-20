import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import type { Vacature } from "@/lib/vacatures";
import { MobileFx } from "./mobile-fx";

const GROEI = [
  { num: "01", h: "Persoonlijk groeipad", p: "Activiteiten on-the-job, cursussen en trainingen, gekozen op jouw ambitie, niet een standaardlijstje." },
  { num: "02", h: "Open feedbackcultuur", p: "Regelmatige eerlijke feedback, plus elk half jaar 360°-feedback uit je omgeving." },
  { num: "03", h: "Learning week", p: "Jaarlijks een volle week samen ontwikkelen: vakinhoudelijk én persoonlijk." },
];
const TP = [
  { h: "Presteren", p: "Uitdagende opdrachten bij partners in onze vijf sectoren. Een rol op maat die jij zelf kiest." },
  { h: "Groeien", p: "Zeggenschap over de koers: je beslist mee over strategie en investeringen." },
  { h: "Ontspannen", p: "Werk dat aansluit bij jouw doelen, met ruimte voor rust. Elektrische auto van de zaak." },
];
const CULTUUR = [
  "Gelijke, transparante beloning bij gelijke ervaring",
  "Projecten gekozen op jouw ervaring, skills én ambitie",
  "Meebeslissen over strategie en investeringen",
  "Maatschappelijke impact: duurzaamheid en gelijkheid",
];

export function MobileWerkenBij({ vacatures }: { vacatures: Vacature[] }) {
  return (
    <div className="m-page m-werken only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Werken bij</div>
          <div className="kicker on-dark">{"// Werken bij The New Wave IT"}</div>
          <h1>Word een <em>Waver</em>.</h1>
          <p>Een gelijk speelveld, een open cultuur en alle ruimte om te groeien. Jij zorgt voor de versnelling bij onze partners.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
            <a href="#vacatures" className="btn btn-primary">Bekijk vacatures <ArrowRight /></a>
            <Link href="/over-ons" className="btn btn-ghost-dark">Leer ons eerst kennen</Link>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head"><div className="kicker">Groei &amp; ontwikkeling</div><h2>Elke dag samen beter worden</h2></div>
          <div className="glist">
            {GROEI.map((g) => (
              <div className="gcard rv" key={g.num}><div className="num">{g.num}</div><h3>{g.h}</h3><p>{g.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "var(--eggshell)" }}>
        <div className="wrap">
          <div className="sec-head"><div className="kicker">Total People</div><h2>Presteren, groeien én ontspannen</h2></div>
          <div className="tplist">
            {TP.map((t) => (
              <div className="tp rv" key={t.h}><h3>{t.h}</h3><p>{t.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="block cultuur" id="cultuur">
        <div className="wrap">
          <div className="media-img rv"><Image src="/assets/photos/team-presentatie-breed.png" alt="Wavers tijdens een kennissessie" fill sizes="100vw" /></div>
          <div className="kicker">Onze cultuur</div>
          <h2 style={{ fontSize: "var(--text-xl)", margin: "12px 0 16px" }}>Ondernemende mensen, gelijk speelveld.</h2>
          <ul className="rv">
            {CULTUUR.map((c) => <li key={c}><Check /> {c}</li>)}
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
          <h2>Eerst een kop koffie? Kom kennismaken.</h2>
          <Link href="/contact" className="btn">Plan een kennismaking <ArrowRight /></Link>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
