import Link from "next/link";
import Image from "next/image";
import { Users, Scale, Sparkles, Leaf, MapPin, Award, Mail, ArrowRight } from "lucide-react";
import type { Teamlid } from "@/lib/team";
import { MobileFx } from "./mobile-fx";

const WAARDE_ICONS = [Users, Scale, Sparkles, Leaf];

export function MobileOverOns({ over, team }: { over: Record<string, string>; team: Teamlid[] }) {
  return (
    <div className="m-page m-over only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Over ons</div>
          <div className="kicker on-dark">{"Over ons"}</div>
          <h1>{over.heroTitleStart}<em>{over.heroAccent}</em>.</h1>
          <p>{over.heroLeadMobiel}</p>
          <div className="statgrid">
            <div className="pstat"><div className="n">2023</div><div className="l">Opgericht, kantoor in Utrecht</div></div>
            <div className="pstat"><div className="n">100%</div><div className="l">De mens centraal</div></div>
            <div className="pstat"><div className="n">2030</div><div className="l">CO2-neutraal businessmodel</div></div>
          </div>
        </div>
      </section>

      <section className="block missie">
        <div className="wrap">
          <div className="media-img rv"><Image src="/assets/photos/klantgesprek-tafel.webp" alt="Wavers in gesprek met een klant" fill sizes="100vw" /></div>
          <div className="kicker">Onze missie</div>
          <h2 style={{ fontSize: "var(--text-xl)", margin: "12px 0 14px" }}>{over.missieTitel}</h2>
          <p>{over.missieP1}</p>
          <p>{over.missieP2}</p>
        </div>
      </section>

      <section className="block" style={{ background: "var(--eggshell)" }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker">{over.waardenKicker}</div>
            <h2>{over.waardenTitel}</h2>
          </div>
          <div className="vlist">
            {WAARDE_ICONS.map((Icon, i) => (
              <div className="vcard rv" key={i}>
                <span className="icbox"><Icon /></span>
                <div><h3>{over[`waarde${i + 1}Titel`]}</h3><p>{over[`waarde${i + 1}Tekst`]}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block team">
        <div className="wrap">
          <div className="media-img rv"><Image src="/assets/photos/founders-trio.webp" alt="Het team achter The New Wave IT" fill sizes="100vw" /></div>
          <div className="kicker">Het team</div>
          <h2 style={{ fontSize: "var(--text-xl)", margin: "12px 0 14px" }}>{over.teamTitel}</h2>
          <p>{over.teamP1}</p>
          <div className="m-team-grid rv">
            {team.map((m) => (
              <div className="m-tcard" key={m.slug}>
                <div className="pf"><Image src={m.foto} alt={m.naam} fill sizes="45vw" style={{ objectPosition: "top" }} /></div>
                <div className="nm">{m.naam}</div>
                <div className="rl">{m.rol}</div>
              </div>
            ))}
          </div>
          <Link href="/contact" className="btn btn-outline btn-block" style={{ marginTop: 18 }}>Kom kennismaken</Link>
        </div>
      </section>

      <section className="feiten">
        <div className="wrap">
          <span className="f"><MapPin /> Ganzenmarkt 6, 3512 GD Utrecht</span>
          <span className="f"><Award /> Genomineerd Computable Awards</span>
          <span className="f"><Mail /> hello@thenewwaveit.com</span>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>{over.ctaTitel}</h2>
          <Link href="/contact" className="btn">Plan een strategiegesprek <ArrowRight /></Link>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
