import Link from "next/link";
import {
  Layers,
  BrainCircuit,
  Route,
  Landmark,
  Truck,
  HeartPulse,
  Factory,
  Check,
  ArrowRight,
  Play,
  type LucideIcon,
} from "lucide-react";
import type { MobileDetailData } from "@/lib/mobile-detail";
import { MobileFx } from "./mobile-fx";

const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  "brain-circuit": BrainCircuit,
  route: Route,
  landmark: Landmark,
  truck: Truck,
  "heart-pulse": HeartPulse,
  factory: Factory,
};

/**
 * Mobiele dienst- én sectordetailpagina. Geport uit ui_kits/website/mobile-dienst-*.html
 * en mobile-sector-*.html. Sectoren tonen businessvraagstukken (+ eventueel een
 * klantverhaalkaart), diensten tonen een stappenaanpak. Alleen zichtbaar ≤767px.
 */
export function MobileDetail({ data: d }: { data: MobileDetailData }) {
  const Icon = ICONS[d.badgeIcon] ?? Layers;
  const parent =
    d.kind === "dienst"
      ? { label: "Diensten", href: "/diensten" }
      : { label: "Sectoren", href: "/sectoren" };

  return (
    <div className="m-page m-detail only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href={parent.href}>{parent.label}</Link> / {d.crumb}
          </div>
          <span className="badge">
            <Icon /> {d.badgeLabel}
          </span>
          <h1>{d.h1}</h1>
          <p>{d.intro}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
            {d.ctas.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className={`btn ${c.variant === "ghost-dark" ? "btn-ghost-dark" : "btn-primary"}`}
              >
                {c.label}
                {c.variant === "ghost-dark" ? null : <ArrowRight />}
              </Link>
            ))}
          </div>
          <div className="statgrid">
            {d.heroStats.map((s, i) => (
              <div className="pstat" key={i}>
                <div className="n">{s.n}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {d.vraagstukken && (
        <section className="block">
          <div className="wrap">
            <div className="sec-head">
              <div className="kicker">Businessvraagstukken</div>
              <h2>De uitdagingen die we dagelijks oplossen</h2>
            </div>
            <div className="challist">
              {d.vraagstukken.map((c, i) => (
                <div className="chal-card rv" key={i}>
                  <div className="q">{c.q}</div>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="block"
        style={d.kind === "sector" ? { background: "var(--eggshell)" } : undefined}
      >
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker">{d.aanpakKicker}</div>
            <h2>{d.aanpakTitle}</h2>
          </div>
          {d.sols.map((row, i) => (
            <div className="sol-card rv" key={i}>
              <div className="ph">
                <span>{row.ph}</span>
              </div>
              {row.kicker && <div className="kicker">{row.kicker}</div>}
              <h3>{row.h}</h3>
              <p>{row.p}</p>
              <ul>
                {row.items.map((it) => (
                  <li key={it}>
                    <Check /> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {d.steps && (
        <section className="block" style={{ background: "var(--eggshell)" }}>
          <div className="wrap">
            <div className="sec-head">
              <div className="kicker">Zo werken we</div>
              <h2>{d.stepsTitle}</h2>
            </div>
            <div className="steplist">
              {d.steps.map((s) => (
                <div className="step rv" key={s.num}>
                  <div className="num">{s.num}</div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="block outcomes">
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker on-dark">{d.outcomesKicker}</div>
            <h2 style={{ color: "#fff" }}>Wat het oplevert</h2>
          </div>
          <div className="statgrid">
            {d.outcomes.map((o, i) => (
              <div className="pstat" key={i}>
                <div className="n">{o.n}</div>
                <div className="l">{o.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {d.case && (
        <section className="block">
          <div className="wrap">
            <div className="sec-head">
              <div className="kicker">Klantverhaal</div>
              <h2>{d.case.title}</h2>
            </div>
            <div className="fcase rv">
              <div className="media">
                <div className="kb" style={{ backgroundImage: `url('${d.case.img}')` }} />
                <button type="button" className="playbig" aria-label="Bekijk video">
                  <Play />
                </button>
              </div>
              <div className="body">
                <div className="kicker">{d.case.kicker}</div>
                <blockquote>{d.case.quote}</blockquote>
                <div className="who">
                  <strong>{d.case.naam}</strong>, {d.case.rol}
                </div>
                <Link href={d.case.href} className="btn btn-outline btn-block" style={{ marginTop: 14 }}>
                  Lees het volledige verhaal
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="cta">
        <div className="wrap">
          <h2>{d.ctaTitle}</h2>
          <Link href="/contact" className="btn">
            Plan een strategiegesprek <ArrowRight />
          </Link>
          <a href="tel:+31610751254" style={{ display: "block", marginTop: 14, color: "#fff", fontWeight: "var(--fw-semibold)", opacity: 0.9 }}>of bel 06–10751254</a>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
