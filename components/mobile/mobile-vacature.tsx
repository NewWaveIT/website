import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, Phone } from "lucide-react";
import type { Vacature } from "@/lib/vacatures";
import { MobileFx } from "./mobile-fx";

const PROCES = [
  { num: "01", titel: "Kennismaken", p: "Videocall of koffie met Mitchel. Geen assessment, wél een goed gesprek." },
  { num: "02", titel: "Verdieping", p: "Inhoudelijk gesprek met de practice lead: casuïstiek uit echte opdrachten." },
  { num: "03", titel: "Meet the Wavers", p: "Lunch of borrel met je toekomstige team. Jij interviewt ons net zo hard." },
  { num: "04", titel: "Voorstel", p: "Transparant aanbod, inclusief groeipad. Bedenktijd hoort erbij." },
];

export function MobileVacature({ v, andere }: { v: Vacature; andere: Vacature[] }) {
  return (
    <div className="m-page m-vacature only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / <Link href="/werken-bij">Werken bij</Link> / Vacature</div>
          <div className="tags">{v.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          <h1>{v.functietitel}</h1>
          <p>{v.intro}</p>
          <a href="#solliciteer" className="btn btn-primary btn-block" style={{ marginTop: 22 }}>Solliciteer direct <ArrowRight /></a>
        </div>
      </section>

      <section className="block vac-body">
        <div className="wrap">
          {v.secties.map((sectie) => (
            <section className="rv" key={sectie.titel}>
              <h2>{sectie.titel}</h2>
              <ul>{sectie.items.map((it) => <li key={it}><Check /> {it}</li>)}</ul>
            </section>
          ))}
          <div className="facts rv">
            <dl style={{ margin: 0 }}>
              <div className="frow"><dt>Team</dt><dd>{v.facts.team}</dd></div>
              <div className="frow"><dt>Niveau</dt><dd>{v.facts.niveau}</dd></div>
              <div className="frow"><dt>Locatie</dt><dd>{v.facts.locatie}</dd></div>
              <div className="frow"><dt>Uren</dt><dd>{v.facts.uren}</dd></div>
              <div className="frow"><dt>Salaris</dt><dd>{v.facts.salaris}</dd></div>
            </dl>
          </div>
          <div className="apply-card rv" id="solliciteer">
            <div className="rec">
              <Image src="/assets/photos/portret-3.png" alt="Mitchel Wallaart, recruiter" width={52} height={52} />
              <div>
                <div className="role">Recruiter</div>
                <h4>Mitchel Wallaart</h4>
                <div style={{ fontSize: "var(--text-sm)" }}><a href="tel:+31610751254">06–10751254</a> · <a href="mailto:hello@thenewwaveit.com">Mail</a></div>
              </div>
            </div>
            <a href="mailto:hello@thenewwaveit.com" className="btn btn-primary btn-block">Solliciteer direct <ArrowRight /></a>
            <p className="note">Binnen twee werkdagen reactie. Geen brief nodig, je cv of LinkedIn is genoeg.</p>
          </div>
        </div>
      </section>

      <section className="block proces">
        <div className="wrap">
          <div className="sec-head"><div className="kicker">Zo solliciteer je</div><h2>Vier stappen, twee weken</h2></div>
          <div className="steplist">
            {PROCES.map((s) => (
              <div className="step rv" key={s.num}><div className="num">{s.num}</div><h3>{s.titel}</h3><p>{s.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="block vacatures">
        <div className="wrap">
          <div className="sec-head"><div className="kicker on-dark">Andere vacatures</div><h2 style={{ color: "#fff" }}>Ook op zoek naar…</h2></div>
          {andere.map((a) => (
            <Link key={a.slug} href={`/vacatures/${a.slug}`} className="vrow">
              <div><h3>{a.functietitel}</h3><span className="meta">{a.discipline} · {a.locatie}</span></div>
              <ArrowRight className="arrow" />
            </Link>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Twijfel je nog? Bel gewoon even met Mitchel.</h2>
          <a href="tel:+31610751254" className="btn">06–10751254 <Phone /></a>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
