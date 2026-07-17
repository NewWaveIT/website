import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, HeartPulse, Landmark, TrainFront, Banknote, Factory } from "lucide-react";
import { MobileFx } from "./mobile-fx";

const DIENSTEN = [
  { slug: "mendix", num: "01 · Applicaties", naam: "Mendix", img: "/assets/photos/overleg-laptop.png", alt: "Consultants werken aan een Mendix-applicatie", p: "Bedrijfskritische low-code applicaties die aansluiten op je landschap: van proof-of-concept tot productie in weken, niet maanden.", li: ["Van vergunningproces tot planningsysteem", "Integraties met je bestaande kernsystemen", "Kennisoverdracht zodat je team zelf verder kan"] },
  { slug: "ai", num: "02 · Intelligentie", naam: "AI", img: "/assets/photos/team-overleg-scherm.png", alt: "Team bespreekt AI-toepassing", p: "Strategische en verantwoorde inzet van AI binnen je bestaande IT-landschap. Geen hype, wél aantoonbare verbetering, met de mens aan het stuur.", li: ["AI-scan: van hype naar businesscase", "Werkende pilots binnen zes weken", "AVG- en AI Act-proof, zonder black boxes"] },
  { slug: "strategie", num: "03 · Richting", naam: "Digitale strategie", img: "/assets/photos/klantgesprek-tafel.png", alt: "Strategiesessie aan tafel", p: "Wij verbinden business en IT in een concreet plan en blijven aan boord tot het werkt. Geen dik rapport voor in de la.", li: ["Van ambitie naar geprioriteerde roadmap", "Businesscase per initiatief", "Begeleiding bij de verandering"] },
];

const SAMEN = [
  { num: "Strategie → Mendix", h: "Van roadmap naar werkende applicatie", p: "De roadmap bepaalt welke applicatie het eerst waarde oplevert; binnen weken staat de eerste versie in productie." },
  { num: "Mendix → AI", h: "Slimme processen in je eigen apps", p: "AI direct in je bedrijfsapplicaties: van slimme formulieren tot automatische triage van aanvragen." },
  { num: "AI → Strategie", h: "Data die je koers scherpt", p: "Inzichten uit pilots voeden de volgende strategische keuzes, leren en bijsturen in korte cycli." },
];

const SECTCHIPS = [
  { slug: "zorg", Icon: HeartPulse, naam: "Zorg" },
  { slug: "publieke-sector", Icon: Landmark, naam: "Publieke sector" },
  { slug: "mobiliteit", Icon: TrainFront, naam: "Mobiliteit" },
  { slug: "banken", Icon: Banknote, naam: "Banken" },
  { slug: "manufacturing", Icon: Factory, naam: "Manufacturing" },
];

export function MobileDiensten() {
  return (
    <div className="m-page m-diensten only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Diensten</div>
          <div className="kicker on-dark">{"// Diensten"}</div>
          <h1>Drie diensten, <em>één doel</em>: jouw resultaat.</h1>
          <p>Mendix, AI en digitale strategie, altijd vanuit jouw sectorvraagstuk, nooit vanuit de technologie.</p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          {DIENSTEN.map((d, i) => (
            <div className="dienst rv" key={d.slug} style={i === 0 ? { paddingTop: 0 } : undefined}>
              <div className="num">{d.num}</div>
              <h2>{d.naam}</h2>
              <div className="media-img"><Image src={d.img} alt={d.alt} fill sizes="100vw" /></div>
              <p>{d.p}</p>
              <ul>{d.li.map((x) => <li key={x}><Check /> {x}</li>)}</ul>
              <Link href={`/diensten/${d.slug}`} className="btn btn-primary btn-block">Ontdek {d.naam.split(" ")[0]} <ArrowRight /></Link>
            </div>
          ))}
        </div>
      </section>

      <section className="block samen">
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker on-dark">Sterker samen</div>
            <h2 style={{ color: "#fff" }}>Waarom de combinatie werkt</h2>
          </div>
          <div className="list">
            {SAMEN.map((s) => (
              <div className="scard rv" key={s.num}>
                <div className="num">{s.num}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "var(--eggshell)" }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker">Sectorkennis eerst</div>
            <h2>Altijd vanuit jouw sector</h2>
          </div>
          <div className="sectchips rv">
            {SECTCHIPS.map(({ slug, Icon, naam }) => (
              <Link key={slug} href={`/sectoren/${slug}`}><Icon /> {naam}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Niet zeker welke dienst bij jouw vraagstuk past?</h2>
          <Link href="/contact" className="btn">Plan een strategiegesprek <ArrowRight /></Link>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
