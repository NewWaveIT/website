import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ArrowRight,
  Landmark,
  TrainFront,
  Banknote,
  HeartPulse,
  Factory,
} from "lucide-react";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { MobileDiensten } from "@/components/mobile/mobile-diensten";
import { getPagina } from "@/lib/paginas-data";
import "./diensten.css";
import "./mobile.css";

export const metadata: Metadata = {
  title: "Diensten — Mendix, AI en digitale strategie",
  description:
    "Drie diensten, één doel: jouw resultaat. Wij combineren Mendix, AI en digitale strategie tot oplossingen die werken voor de mensen die ermee werken.",
  alternates: { canonical: "/diensten" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    { "@type": "Service", position: 1, name: "Mendix", url: "https://thenewwaveit.com/diensten/mendix" },
    { "@type": "Service", position: 2, name: "AI", url: "https://thenewwaveit.com/diensten/ai" },
    { "@type": "Service", position: 3, name: "Digitale strategie", url: "https://thenewwaveit.com/diensten/strategie" },
  ],
};

export const revalidate = 300;

export default async function DienstenPage() {
  const t = await getPagina("diensten");
  return (
    <>
      <MobileDiensten />
    <div className="p-diensten only-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="dhero">
        <SectorHeroAnim theme="diensten" />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Diensten
          </div>
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"// Diensten"}
          </div>
          <h1>
            {t.heroTitleStart}
            <em>{t.heroAccent}</em>
            {t.heroTitleEnd}
          </h1>
          <p>{t.heroLead}</p>
        </div>
      </section>

      <section className="block">
        <div className="wrap-wide">
          <div className="dienst-row" style={{ paddingTop: 0 }}>
            <div className="txt">
              <div className="num">01 · Applicaties</div>
              <h2>Mendix</h2>
              <p>
                Bedrijfskritische low-code applicaties die aansluiten op je
                landschap: van proof-of-concept tot productie in weken, niet
                maanden. Schaalbaar, beheerbaar en gebouwd rond je mensen.
              </p>
              <ul>
                <li>
                  <Check /> Van vergunningproces tot planningsysteem
                </li>
                <li>
                  <Check /> Integraties met je bestaande kernsystemen
                </li>
                <li>
                  <Check /> Kennisoverdracht zodat je team zelf verder kan
                </li>
              </ul>
              <div className="acts">
                <Link href="/diensten/mendix" className="btn btn-primary">
                  Ontdek Mendix <ArrowRight />
                </Link>
                <Link href="/klantverhalen">Bekijk cases →</Link>
              </div>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/overleg-laptop.png"
                alt="Consultants werken aan een Mendix-applicatie"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="dienst-row rev">
            <div className="txt">
              <div className="num">02 · Intelligentie</div>
              <h2>AI</h2>
              <p>
                Strategische en verantwoorde inzet van AI binnen je bestaande
                IT-landschap. Geen hype, wél oplossingen die processen aantoonbaar
                verbeteren en uitlegbaar blijven, met de mens aan het stuur.
              </p>
              <ul>
                <li>
                  <Check /> AI-scan: van hype naar businesscase
                </li>
                <li>
                  <Check /> Werkende pilots binnen zes weken
                </li>
                <li>
                  <Check /> AVG- en AI Act-proof, zonder black boxes
                </li>
              </ul>
              <div className="acts">
                <Link href="/diensten/ai" className="btn btn-primary">
                  Ontdek AI <ArrowRight />
                </Link>
                <Link href="/klantverhalen">Bekijk cases →</Link>
              </div>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/team-overleg-scherm.png"
                alt="Team bespreekt een AI-toepassing"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="dienst-row" style={{ borderBottom: 0, paddingBottom: 0 }}>
            <div className="txt">
              <div className="num">03 · Richting</div>
              <h2>Digitale strategie</h2>
              <p>
                Wij verbinden business en IT in een concreet plan en blijven aan
                boord tot het werkt. Geen dik rapport voor in de la, maar
                mijlpalen die je operatie meteen merkt.
              </p>
              <ul>
                <li>
                  <Check /> Van ambitie naar geprioriteerde roadmap
                </li>
                <li>
                  <Check /> Businesscase per initiatief
                </li>
                <li>
                  <Check /> Begeleiding bij de verandering, niet alleen het plan
                </li>
              </ul>
              <div className="acts">
                <Link href="/diensten/strategie" className="btn btn-primary">
                  Ontdek Strategie <ArrowRight />
                </Link>
                <Link href="/klantverhalen">Bekijk cases →</Link>
              </div>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/klantgesprek-tafel.png"
                alt="Strategiesessie aan tafel"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="block samen">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker on-dark">Sterker samen</div>
            <h2 style={{ color: "#fff", fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0" }}>
              Waarom de combinatie werkt
            </h2>
            <p style={{ color: "var(--text-on-dark-muted)" }}>
              De meeste vraagstukken vragen niet om één dienst, maar om de juiste
              mix. Zo grijpen ze in elkaar.
            </p>
          </div>
          <div className="grid">
            <div className="scard">
              <div className="num">Strategie → Mendix</div>
              <h3>Van roadmap naar werkende applicatie</h3>
              <p>
                De roadmap bepaalt welke applicatie het eerst waarde oplevert;
                binnen weken staat de eerste versie in productie.
              </p>
            </div>
            <div className="scard">
              <div className="num">Mendix → AI</div>
              <h3>Slimme processen in je eigen apps</h3>
              <p>
                AI direct in je bedrijfsapplicaties: van slimme formulieren tot
                automatische triage van aanvragen.
              </p>
            </div>
            <div className="scard">
              <div className="num">AI → Strategie</div>
              <h3>Data die je koers scherpt</h3>
              <p>
                Inzichten uit pilots voeden de volgende strategische keuzes,
                leren en bijsturen in korte cycli.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block sect-strip">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Sectorkennis eerst</div>
            <h2>Altijd vanuit jouw sector</h2>
            <p>
              Elke dienst begint bij het businessvraagstuk van jouw sector,
              bekijk hoe we dat per markt aanpakken.
            </p>
          </div>
          <div className="row">
            <Link href="/sectoren/publieke-sector" className="sect-chip">
              <Landmark /> Publieke sector
            </Link>
            <Link href="/sectoren/mobiliteit" className="sect-chip">
              <TrainFront /> Mobiliteit
            </Link>
            <Link href="/sectoren/banken" className="sect-chip">
              <Banknote /> Banken
            </Link>
            <Link href="/sectoren/zorg" className="sect-chip">
              <HeartPulse /> Zorg
            </Link>
            <Link href="/sectoren/manufacturing" className="sect-chip">
              <Factory /> Manufacturing
            </Link>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>{t.ctaTitel}</h2>
          <Link href="/contact" className="btn btn-on">
            Plan een strategiegesprek <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
