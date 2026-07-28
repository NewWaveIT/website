import Link from "next/link";
import { Building2, Play, ArrowRight } from "lucide-react";
import type { Klantverhaal } from "@/lib/klantverhalen";
import { MobileFx } from "./mobile-fx";

export function MobileCase({ k, meer }: { k: Klantverhaal; meer: Klantverhaal[] }) {
  return (
    <div className="m-page m-case only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / <Link href="/klantverhalen">Klantverhalen</Link> / {k.sector}</div>
          <span className="tag"><Building2 /> {k.tag}</span>
          <h1>{k.h1}</h1>
          <p>{k.intro}</p>
          <div className="video">
            <div className="kb" style={{ backgroundImage: `url('${k.image}')` }} />
            <button type="button" className="playbig" aria-label="Bekijk klantvideo"><Play /></button>
            <span className="cap">Klantvideo</span>
          </div>
        </div>
      </section>

      <div className="impact">
        <div className="wrap statgrid">
          {k.impact.map((m, i) => (
            <div className="pstat" key={i}><div className="n">{m.n}</div><div className="l">{m.l}</div></div>
          ))}
        </div>
      </div>

      <section className="block">
        <div className="wrap">
          <div className="prose rv">
            <h2>De uitdaging</h2>
            <div dangerouslySetInnerHTML={{ __html: k.challenge }} />
            <p className="pull">{k.pull}</p>
            <h2>De aanpak</h2>
            {k.aanpak.map((p, i) => <p key={i}>{p}</p>)}
            <h2>Het resultaat</h2>
            <div dangerouslySetInnerHTML={{ __html: k.resultaat }} />
          </div>
          <div className="aside-card rv">
            <h4>Over dit project</h4>
            <div className="row"><span className="k">Sector</span><span className="v">{k.aside.sector}</span></div>
            <div className="row"><span className="k">Diensten</span><span className="v">{k.aside.diensten}</span></div>
            <div className="row"><span className="k">Doorlooptijd</span><span className="v">{k.aside.doorlooptijd}</span></div>
            <div className="row"><span className="k">Team</span><span className="v">{k.aside.team}</span></div>
          </div>
        </div>
      </section>

      <section className="block qblock">
        <div className="wrap rv">
          <blockquote>{k.quote}</blockquote>
          <div className="who"><strong>{k.quoteNaam}</strong>, {k.quoteRol}</div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head"><div className="kicker">Meer klantverhalen</div><h2>Resultaten in andere sectoren</h2></div>
          <div className="postlist">
            {meer.map((m) => (
              <Link key={m.slug} href={`/klantverhalen/${m.slug}`} className="post rv">
                <div className="cover" style={{ backgroundImage: `url('${m.image}')` }} />
                <div><span className="cat">{m.sector}</span><h3>{m.cardTitel}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Herken je dit vraagstuk in jouw organisatie?</h2>
          <Link href="/contact" className="btn">Plan een strategiegesprek <ArrowRight /></Link>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
