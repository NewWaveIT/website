import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, HeartPulse, Landmark, TrainFront, Banknote, Factory } from "lucide-react";
import { MobileFx } from "./mobile-fx";

const DIENSTEN = [
  { slug: "mendix", num: "01 · Applicaties", naam: "Mendix", img: "/assets/photos/overleg-laptop.webp", alt: "Consultants werken aan een Mendix-applicatie", p: "Bedrijfskritische low-code applicaties die aansluiten op je landschap: van proof-of-concept tot productie in weken, niet maanden.", li: ["Van vergunningproces tot planningsysteem", "Integraties met je bestaande kernsystemen", "Kennisoverdracht zodat je team zelf verder kan"] },
  { slug: "ai", num: "02 · Intelligentie", naam: "AI", img: "/assets/photos/team-overleg-scherm.webp", alt: "Team bespreekt AI-toepassing", p: "Strategische en verantwoorde inzet van AI binnen je bestaande IT-landschap. Geen hype, wél aantoonbare verbetering, met de mens aan het stuur.", li: ["AI-scan: van hype naar businesscase", "Werkende pilots binnen zes weken", "AVG- en AI Act-proof, zonder black boxes"] },
  { slug: "strategie", num: "03 · Richting", naam: "Digitale strategie", img: "/assets/photos/klantgesprek-tafel.webp", alt: "Strategiesessie aan tafel", p: "Wij verbinden business en IT in een concreet plan en blijven aan boord tot het werkt. Geen dik rapport voor in de la.", li: ["Van ambitie naar geprioriteerde roadmap", "Businesscase per initiatief", "Begeleiding bij de verandering"] },
];

const SECTCHIPS = [
  { slug: "zorg", Icon: HeartPulse, naam: "Zorg" },
  { slug: "publieke-sector", Icon: Landmark, naam: "Publieke sector" },
  { slug: "mobiliteit", Icon: TrainFront, naam: "Mobiliteit" },
  { slug: "banken", Icon: Banknote, naam: "Banken" },
  { slug: "manufacturing", Icon: Factory, naam: "Manufacturing" },
];

export function MobileDiensten({ diensten }: { diensten: Record<string, string> }) {
  return (
    <div className="m-page m-diensten only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Diensten</div>
          <div className="kicker on-dark">{"Diensten"}</div>
          <h1>{diensten.heroTitleStart}<em>{diensten.heroAccent}</em>{diensten.heroTitleEnd}</h1>
          <p>{diensten.heroLeadMobiel}</p>
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

      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker">Zo werken we</div>
            <h2>Van vraagstuk naar livegang in 5 fasen</h2>
          </div>
          <div className="fasen">
            {[
              { titel: "Strategische sessies", tekst: "Samen maken we het vraagstuk scherp." },
              { titel: "Delivery-model", tekst: "We zetten de aanpak op en scherpen die aan." },
              { titel: "Eén use case", tekst: "We kiezen één concrete casus om mee te starten." },
              { titel: "Direct bouwen", tekst: "We bouwen meteen, met Mendix en AI." },
              { titel: "Itereren naar live", tekst: "In korte cycli verbeteren richting livegang." },
            ].map((f, i) => (
              <div className="fase rv" key={f.titel}>
                <div className="fnum">{`0${i + 1}`}</div>
                <div>
                  <h3>{f.titel}</h3>
                  <p>{f.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block samen">
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker on-dark">{diensten.samenKicker}</div>
            <h2 style={{ color: "#fff" }}>{diensten.samenTitel}</h2>
          </div>
          <div className="list">
            {[
              { n: "1", num: "Strategie → Mendix" },
              { n: "2", num: "Mendix → AI" },
              { n: "3", num: "AI → Strategie" },
            ].map(({ n, num }) => (
              <div className="scard rv" key={n}>
                <div className="num">{num}</div>
                <h3>{diensten[`samen${n}Titel`]}</h3>
                <p>{diensten[`samen${n}Tekst`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "var(--eggshell)" }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker">{diensten.sectstripKicker}</div>
            <h2>{diensten.sectstripTitel}</h2>
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
          <h2>{diensten.ctaTitel}</h2>
          <Link href="/contact" className="btn">Plan een strategiegesprek <ArrowRight /></Link>
          <a href="tel:+31610751254" style={{ display: "block", marginTop: 14, color: "#fff", fontWeight: "var(--fw-semibold)", opacity: 0.9 }}>of bel 06–10751254</a>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
