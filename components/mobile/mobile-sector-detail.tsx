import Link from "next/link";
import { Building2, TrainFront, Banknote, HeartPulse, Factory, Check, Play, ArrowRight } from "lucide-react";
import type { SectorDetail } from "@/lib/sectoren-detail";
import { MobileFx } from "./mobile-fx";

const ICONS = {
  "building-2": Building2,
  "train-front": TrainFront,
  banknote: Banknote,
  "heart-pulse": HeartPulse,
  factory: Factory,
};

export function MobileSectorDetail({ sector: s }: { sector: SectorDetail }) {
  const Icon = ICONS[s.icon];
  return (
    <div className="m-page m-sectordetail only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / <Link href="/sectoren">Sectoren</Link> / {s.naam}</div>
          <span className="badge"><Icon /> {s.naam}</span>
          <h1>{s.h1}</h1>
          <p>{s.intro}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
            <Link href="/contact" className="btn btn-primary">Plan een strategiegesprek <ArrowRight /></Link>
            <Link href="/contact?type=sectorrapport" className="btn btn-ghost-dark">Download sectorrapport</Link>
          </div>
          <div className="statgrid">
            {s.kpis.map((k, i) => (
              <div className="pstat" key={i}><div className="n">{k.n}</div><div className="l">{k.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker">Businessvraagstukken</div>
            <h2>De uitdagingen die we dagelijks oplossen</h2>
          </div>
          <div className="challist">
            {s.challenges.map((c, i) => (
              <div className="chal-card rv" key={i}>
                <div className="q">{c.q}</div>
                <h3>{c.titel}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "var(--eggshell)" }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker">Onze aanpak</div>
            <h2>Van vraagstuk naar werkende oplossing</h2>
          </div>
          {s.solutions.map((row, i) => (
            <div className="sol-card rv" key={i}>
              <div className="ph"><span>{row.ph}</span></div>
              <div className="kicker">{row.kicker}</div>
              <h3>{row.titel}</h3>
              <p>{row.p}</p>
              <ul>{row.punten.map((pt) => <li key={pt}><Check /> {pt}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="block outcomes">
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker on-dark">Resultaten in {s.naam.toLowerCase()}</div>
            <h2 style={{ color: "#fff" }}>Wat het oplevert</h2>
          </div>
          <div className="statgrid">
            {s.outcomes.map((o, i) => (
              <div className="pstat" key={i}><div className="n">{o.n}</div><div className="l">{o.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head"><div className="kicker">Klantverhaal</div><h2>{s.caseTitle}</h2></div>
          <div className="fcase rv">
            <div className="media">
              <div className="kb" style={{ backgroundImage: `url('${s.caseImage}')` }} />
              <button type="button" className="playbig" aria-label="Bekijk video"><Play /></button>
            </div>
            <div className="body">
              <div className="kicker">{s.caseSector}</div>
              <blockquote>{s.caseQuote}</blockquote>
              <div className="who"><strong>{s.caseNaam}</strong>, {s.caseRol}</div>
              <Link href="/klantverhalen/coa" className="btn btn-outline btn-block" style={{ marginTop: 14 }}>Lees het volledige verhaal</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Benieuwd wat dit voor jouw organisatie betekent?</h2>
          <Link href="/contact" className="btn">Plan een strategiegesprek <ArrowRight /></Link>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
