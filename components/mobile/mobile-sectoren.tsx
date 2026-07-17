import Link from "next/link";
import { Landmark, TrainFront, Banknote, HeartPulse, Factory, MessageCircleQuestion, ArrowRight } from "lucide-react";
import { MobileFx } from "./mobile-fx";

const ITEMS = [
  { slug: "publieke-sector", Icon: Landmark, naam: "Publieke sector", hook: "“Onze doorlooptijden groeien sneller dan onze formatie.”", p: "Van vergunningverlening tot subsidies: processen versnellen, papierstromen vervangen en volledig aantoonbaar werken.", kpi: "-40% doorlooptijd" },
  { slug: "mobiliteit", Icon: TrainFront, naam: "Mobiliteit", hook: "“Onze assets worden slimmer, onze systemen niet.”", p: "Van assetbeheer tot reizigersinformatie: systemen waarmee infra, OV en logistiek sneller schakelen.", kpi: "Realtime inzicht" },
  { slug: "banken", Icon: Banknote, naam: "Banken", hook: "“Elke innovatie strandt op compliance.”", p: "Compliant én wendbaar: kernprocessen digitaliseren zonder concessies aan toezicht en klantvertrouwen.", kpi: "Audit-proof" },
  { slug: "zorg", Icon: HeartPulse, naam: "Zorg", hook: "“Onze mensen registreren meer dan ze zorgen.”", p: "Registratielast weg en systemen die met zorgprofessionals meewerken: veilig en gekoppeld aan je EPD.", kpi: "Minder registratielast" },
  { slug: "manufacturing", Icon: Factory, naam: "Manufacturing", hook: "“Onze machines produceren data die niemand gebruikt.”", p: "Productie, planning en kwaliteit verbonden in applicaties die je operatie écht versnellen.", kpi: "Kortere omsteltijden" },
];

const WERKWIJZE = [
  { num: "01", h: "Geen inwerktijd", p: "We kennen de wetgeving, ketens en kernsystemen van jouw markt. Het eerste gesprek gaat meteen over jouw vraagstuk." },
  { num: "02", h: "Bewezen patronen", p: "Oplossingen die zich in jouw sector al bewezen hebben, sneller live, minder risico." },
  { num: "03", h: "Netwerk dat meedenkt", p: "Leer via onze partners en klanten van organisaties die hetzelfde vraagstuk al oplosten." },
];

export function MobileSectoren() {
  return (
    <div className="m-page m-sectoren only-mobile">
      <section className="mhero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Home</Link> / Sectoren
          </div>
          <div className="kicker on-dark">{"// Sectoren"}</div>
          <h1>Wij spreken de taal van <em>jouw sector</em>.</h1>
          <p>Business-specialist in vijf markten. We kennen de processen, de wetgeving en de systemen, zodat het eerste gesprek meteen de diepte in kan.</p>
        </div>
      </section>

      <section className="block">
        <div className="wrap slist">
          {ITEMS.map(({ slug, Icon, naam, hook, p, kpi }) => (
            <Link key={slug} href={`/sectoren/${slug}`} className="scard rv">
              <div className="top"><span className="icbox"><Icon /></span><h2>{naam}</h2></div>
              <div className="hook">{hook}</div>
              <p>{p}</p>
              <div className="foot"><span className="kpi">{kpi}</span><span className="go">Bekijk <ArrowRight /></span></div>
            </Link>
          ))}
          <Link href="/contact" className="scard alt rv">
            <div className="top"><span className="icbox"><MessageCircleQuestion /></span><h2>Jouw sector er niet bij?</h2></div>
            <p>Leg je vraagstuk voor, we vertellen eerlijk of we de juiste partner zijn.</p>
            <div className="foot" style={{ borderTop: 0, paddingTop: 0 }}><span /><span className="go">Neem contact op <ArrowRight /></span></div>
          </Link>
        </div>
      </section>

      <section className="block werkwijze">
        <div className="wrap">
          <div className="sec-head">
            <div className="kicker on-dark">Waarom sectorfocus</div>
            <h2 style={{ color: "#fff" }}>Wat sectorkennis je oplevert</h2>
          </div>
          <div className="wlist">
            {WERKWIJZE.map((w) => (
              <div className="wcard rv" key={w.num}>
                <div className="num">{w.num}</div>
                <h3>{w.h}</h3>
                <p>{w.p}</p>
              </div>
            ))}
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
