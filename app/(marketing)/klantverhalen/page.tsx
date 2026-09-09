import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, TrainFront, Banknote, HeartPulse, Factory } from "lucide-react";
import { getKlantverhalen } from "@/lib/klantverhalen-data";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { SlotCta } from "@/components/layout/slot-cta";
import "./klantverhalen.css";

export const metadata: Metadata = {
  title: "Klantverhalen — resultaat dat je kunt navragen",
  description:
    "Verhalen van organisaties in de publieke sector, mobiliteit, banken, zorg en manufacturing, verteld met de cijfers erbij.",
  alternates: { canonical: "/klantverhalen" },
};

const ICONS = {
  "building-2": Building2,
  "train-front": TrainFront,
  banknote: Banknote,
  "heart-pulse": HeartPulse,
  factory: Factory,
};

/** Sectorbeloftes: het type resultaat dat we per sector bieden — geen quotes,
 *  geen namen, alleen de capaciteit die we al aantoonbaar in huis hebben.
 *  Cijfers komen 1-op-1 uit lib/sectoren-detail.ts (kpis), niet los verzonnen. */
const SECTORBELOFTES: {
  slug: string;
  naam: string;
  icon: keyof typeof ICONS;
  belofte: string;
  kpis: { n: string; l: string }[];
}[] = [
  {
    slug: "publieke-sector",
    naam: "Publieke sector",
    icon: "building-2",
    belofte: "Digitale dienstverlening die burgers vertrouwen.",
    kpis: [
      { n: "Korter", l: "Doorlooptijd van aanvragen" },
      { n: "Sneller", l: "Live dan met traditionele bouw" },
      { n: "Auditproof", l: "En AVG-compliant opgeleverd" },
    ],
  },
  {
    slug: "mobiliteit",
    naam: "Mobiliteit",
    icon: "train-front",
    belofte: "Realtime grip op planning, assets en stromen.",
    kpis: [
      { n: "Realtime", l: "Inzicht in assets en stromen" },
      { n: "6–10×", l: "Sneller live met low-code" },
      { n: "24/7", l: "Beschikbaar en beheersbaar" },
    ],
  },
  {
    slug: "banken",
    naam: "Banken",
    icon: "banknote",
    belofte: "Compliant en wendbaar, zonder concessies.",
    kpis: [
      { n: "Audit-proof", l: "Herleidbaar en beheerst" },
      { n: "6–10×", l: "Sneller live met low-code" },
      { n: "100%", l: "Binnen toezicht en beleid" },
    ],
  },
  {
    slug: "zorg",
    naam: "Zorg",
    icon: "heart-pulse",
    belofte: "Meer tijd voor de patiënt, minder registratielast.",
    kpis: [
      { n: "Minder", l: "Registratielast" },
      { n: "6–10×", l: "Sneller live met low-code" },
      { n: "100%", l: "Veilig en gekoppeld aan je EPD" },
    ],
  },
  {
    slug: "manufacturing",
    naam: "Manufacturing",
    icon: "factory",
    belofte: "Productie die meebeweegt met de vraag.",
    kpis: [
      { n: "Kortere", l: "Omsteltijden en doorlooptijd" },
      { n: "6–10×", l: "Sneller live met low-code" },
      { n: "Realtime", l: "Zicht van shopfloor tot boardroom" },
    ],
  },
];

export default async function KlantverhalenPage() {
  "use cache";
  cacheLife("content");

  const verhalen = await getKlantverhalen();
  const featured = verhalen[0];
  return (
    <div className="p-klanten">
      <section className="dhero">
        <SectorHeroAnim theme="klantverhalen" />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Klantverhalen
          </div>
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"Klantverhalen"}
          </div>
          <h1>
            Resultaat dat je kunt <em>navragen</em>.
          </h1>
          <p>
            Business-impact, geen technische anekdote. Hier laten we zien wat er daadwerkelijk
            verandert bij een klant als strategie, Mendix en AI samenkomen: minder handwerk,
            snellere processen, meetbaar resultaat.
          </p>
        </div>
      </section>

      {featured && (
        <section className="block" style={{ background: "var(--eggshell)" }}>
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Uitgelicht</div>
              <h2>{featured.cardTitel}</h2>
            </div>
            <div className="case-mini">
              <div className="media">
                <Image
                  src={featured.image}
                  alt={featured.cardTitel}
                  fill
                  sizes="(max-width: 980px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="body">
                <div className="kicker">{featured.tag}</div>
                <blockquote>{featured.quote}</blockquote>
                <div className="who">
                  <strong>{featured.quoteNaam}</strong>, {featured.quoteRol}
                  <br />
                  <Link
                    href={`/klantverhalen/${featured.slug}`}
                    style={{
                      display: "inline-block",
                      marginTop: 14,
                      fontWeight: "var(--fw-semibold)",
                    }}
                  >
                    Lees het volledige verhaal →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="block">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Onze sectoren</div>
            <h2>Nog geen klantverhaal in jouw sector? Dit is wat je kunt verwachten.</h2>
            <p>
              We werken pas kort genoeg samen met organisaties als Moove om al hun verhaal te kunnen
              delen — de rest volgt. Hieronder alvast het type resultaat dat we per sector al
              aantoonbaar leveren.
            </p>
          </div>
          <div className="belofte-grid">
            {SECTORBELOFTES.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <Link href={`/sectoren/${s.slug}`} className="belofte-card" key={s.slug}>
                  <span className="ic">
                    <Icon />
                  </span>
                  <h3>{s.naam}</h3>
                  <p>{s.belofte}</p>
                  <div className="kpis">
                    {s.kpis.map((k, i) => (
                      <div className="kpi" key={i}>
                        <div className="n">{k.n}</div>
                        <div className="l">{k.l}</div>
                      </div>
                    ))}
                  </div>
                  <span className="more">
                    Bekijk {s.naam.toLowerCase()} <ArrowRight />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SlotCta titel="Herken je jouw vraagstuk in deze verhalen?" />
    </div>
  );
}
