import Link from "next/link";
import Image from "next/image";
import { Users, Scale, Sparkles, Leaf, MapPin, Award, Mail, ArrowRight } from "lucide-react";
import { MobileFx } from "./mobile-fx";

const WAARDEN = [
  { Icon: Users, h: "De mens 100% centraal", p: "We bouwen oplossingen rond de mensen die ermee moeten werken." },
  { Icon: Scale, h: "Gelijk speelveld", p: "Beloning is gelijk en transparant bij gelijke ervaring, ongeacht gender of achtergrond." },
  { Icon: Sparkles, h: "Verschillen versterken", p: "Diverse teams komen tot betere oplossingen, voor onze partners en elkaar." },
  { Icon: Leaf, h: "Duurzaam ondernemen", p: "In 2030 is ons businessmodel 100% CO2-neutraal." },
];

export function MobileOverOns() {
  return (
    <div className="m-page m-over only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Over ons</div>
          <div className="kicker on-dark">{"// Over ons"}</div>
          <h1>De ondernemende mens zorgt voor <em>vooruitgang</em>.</h1>
          <p>Succesvolle verandering begint bij mensen. Wij verzorgen de randvoorwaarden voor onze Wavers, zij helpen onze partners maximaal digitaal versnellen.</p>
          <div className="statgrid">
            <div className="pstat"><div className="n">2023</div><div className="l">Opgericht, kantoor in Utrecht</div></div>
            <div className="pstat"><div className="n">100%</div><div className="l">De mens centraal</div></div>
            <div className="pstat"><div className="n">2030</div><div className="l">CO2-neutraal businessmodel</div></div>
          </div>
        </div>
      </section>

      <section className="block missie">
        <div className="wrap">
          <div className="media-img rv"><Image src="/assets/photos/klantgesprek-tafel.png" alt="Wavers in gesprek met een klant" fill sizes="100vw" /></div>
          <div className="kicker">Onze missie</div>
          <h2 style={{ fontSize: "var(--text-xl)", margin: "12px 0 14px" }}>Maximale digitale impact, met de mens als maat.</h2>
          <p>Met innovatieve low-code- en AI-oplossingen versnellen wij digitale transformatie en dragen we bij aan een duurzame toekomst.</p>
          <p>Op elk project kiezen we de mensen van wie ervaring, skills en ambitie het beste passen bij jouw vraagstuk.</p>
        </div>
      </section>

      <section className="block" style={{ background: "var(--eggshell)" }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker">Waar wij voor staan</div>
            <h2>Vier overtuigingen die je terugziet in ons werk</h2>
          </div>
          <div className="vlist">
            {WAARDEN.map(({ Icon, h, p }) => (
              <div className="vcard rv" key={h}>
                <span className="icbox"><Icon /></span>
                <div><h3>{h}</h3><p>{p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block team">
        <div className="wrap">
          <div className="media-img rv"><Image src="/assets/photos/founders-trio.png" alt="Het team achter The New Wave IT" fill sizes="100vw" /></div>
          <div className="kicker">Het team</div>
          <h2 style={{ fontSize: "var(--text-xl)", margin: "12px 0 14px" }}>Ontmoet de Wavers.</h2>
          <p>Je kent de mensen die jouw vraagstuk oplossen: senior consultants en engineers die de taal van boardroom én werkvloer spreken. Hetzelfde team blijft aan boord, van sessie tot beheer.</p>
          <div className="founder rv">
            <Image src="/assets/photos/portret-blauw.png" alt="Koen Wijsman" width={48} height={48} />
            <div><div className="nm">Koen Wijsman</div><div className="rl">CEO &amp; founder</div></div>
            <Link href="/contact" className="btn btn-outline" style={{ marginLeft: "auto", minHeight: 40, padding: "8px 14px", fontSize: "var(--text-xs)" }}>Kennismaken</Link>
          </div>
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
          <h2>Benieuwd wat onze mensen voor jouw doelen kunnen betekenen?</h2>
          <Link href="/contact" className="btn">Plan een strategiegesprek <ArrowRight /></Link>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
