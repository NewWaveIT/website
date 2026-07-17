import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Users, Scale, Sparkles, Leaf, MapPin, Award, Mail, ArrowRight } from "lucide-react";
import "./over-ons.css";

export const metadata: Metadata = {
  title: "Over ons — de ondernemende mens zorgt voor vooruitgang",
  description:
    "The New Wave IT: opgericht in 2023, kantoor in Utrecht. Wij realiseren maximale digitale impact met de mens als maat, via low-code en AI.",
  alternates: { canonical: "/over-ons" },
};

const WAARDEN = [
  { Icon: Users, titel: "De mens 100% centraal", p: "Technologie is het middel. We bouwen oplossingen rond de mensen die ermee moeten werken, bij jou en bij ons." },
  { Icon: Scale, titel: "Gelijk speelveld", p: "Beloning is bij ons gelijk en transparant voor iedereen met dezelfde ervaring, ongeacht gender of achtergrond." },
  { Icon: Sparkles, titel: "Verschillen versterken", p: "Elk mens is gelijk. We geloven dat diverse teams tot betere oplossingen komen, voor onze partners en elkaar." },
  { Icon: Leaf, titel: "Duurzaam ondernemen", p: "Ondernemen en maatschappelijke bijdrage horen bij elkaar. In 2030 is ons businessmodel 100% CO2-neutraal." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The New Wave IT",
  foundingDate: "2023",
  email: "hello@thenewwaveit.com",
  url: "https://thenewwaveit.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ganzenmarkt 6",
    postalCode: "3512 GD",
    addressLocality: "Utrecht",
    addressCountry: "NL",
  },
};

export default function OverOnsPage() {
  return (
    <div className="p-over">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="shero">
        <div className="badge-img">
          <Image src="/assets/photos/overleg-lachend.png" alt="" fill sizes="46vw" />
        </div>
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Over ons
          </div>
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"// Over ons"}
          </div>
          <h1>
            De ondernemende mens zorgt voor <em>vooruitgang</em>.
          </h1>
          <p>
            Wij geloven dat succesvolle verandering begint bij mensen. Daarom
            verzorgen wij alle randvoorwaarden voor onze Wavers, en helpen zij
            onze partners maximaal digitaal versnellen. Zo staat jouw organisatie
            klaar voor de dag van overmorgen.
          </p>
          <div className="kpis">
            <div>
              <div className="n">2023</div>
              <div className="l">Opgericht, kantoor in Utrecht</div>
            </div>
            <div>
              <div className="n">100%</div>
              <div className="l">De mens centraal, op elk project</div>
            </div>
            <div>
              <div className="n">2030</div>
              <div className="l">Doel: CO2-neutraal businessmodel</div>
            </div>
          </div>
        </div>
      </section>

      <section className="block missie">
        <div className="wrap-wide">
          <div className="grid">
            <div>
              <div className="kicker">Onze missie</div>
              <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 var(--space-5)" }}>
                Maximale digitale impact, met de mens als maat.
              </h2>
              <p>
                Onze missie is bedrijven te helpen maximale digitale impact te
                realiseren door technologie én mens centraal te stellen. Met
                innovatieve low-code- en AI-oplossingen versnellen wij digitale
                transformatie en dragen we bij aan een duurzame toekomst.
              </p>
              <p>
                Dat doen we door op elk project de mensen te kiezen van wie de
                ervaring, skills en ambitie het beste passen bij jouw vraagstuk.
                Ons doel? Dat elk mens werk doet dat aansluit bij zijn of haar
                persoonlijke doelen en drijfveren.
              </p>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/klantgesprek-tafel.png"
                alt="Wavers in gesprek met een klant"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="block waarden">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Waar wij voor staan</div>
            <h2>Vier overtuigingen die je terugziet in ons werk</h2>
          </div>
          <div className="grid">
            {WAARDEN.map(({ Icon, titel, p }) => (
              <div className="vcard" key={titel}>
                <div className="ic">
                  <Icon />
                </div>
                <h3>{titel}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block team">
        <div className="wrap-wide">
          <div className="grid">
            <div className="media-img">
              <Image
                src="/assets/photos/founders-trio.png"
                alt="Het team achter The New Wave IT"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
            <div>
              <div className="kicker">Het team</div>
              <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 var(--space-5)" }}>
                Ontmoet de Wavers.
              </h2>
              <p>
                Geen anonieme delivery-machine: je kent de mensen die jouw
                vraagstuk oplossen. Senior consultants en engineers die de taal
                van de boardroom én de werkvloer spreken, betrokken als partner.
              </p>
              <p>
                Van strategische sessies tot livegang en beheer: hetzelfde team
                blijft aan boord. Zo houden we vaart, kwaliteit en
                verantwoordelijkheid bij elkaar.
              </p>
              <div className="founder">
                <Image src="/assets/photos/portret-blauw.png" alt="Koen Wijsman" width={56} height={56} />
                <div>
                  <div className="nm">Koen Wijsman</div>
                  <div className="rl">CEO &amp; founder</div>
                </div>
                <Link href="/contact" className="btn btn-outline btn-sm" style={{ marginLeft: "auto" }}>
                  Kom kennismaken
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feiten">
        <div className="wrap-wide">
          <div className="row">
            <span className="f">
              <MapPin /> Ganzenmarkt 6, 3512 GD Utrecht
            </span>
            <span className="f">
              <Award /> Mijn Rotterdam · genomineerd Computable Awards
            </span>
            <span className="f">
              <Mail /> hello@thenewwaveit.com
            </span>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>Benieuwd wat onze mensen voor jouw doelen kunnen betekenen?</h2>
          <Link href="/contact" className="btn btn-on">
            Plan een strategiegesprek <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
