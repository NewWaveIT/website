import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { getVacatures } from "@/lib/vacatures-data";
import { getPagina } from "@/lib/paginas-data";
import { MobileWerkenBij } from "@/components/mobile/mobile-werken-bij";
import "./werken-bij.css";
import "./mobile.css";

export const metadata: Metadata = {
  title: "Werken bij — word een Waver",
  description:
    "Werken bij The New Wave IT: een gelijk speelveld, open feedbackcultuur, persoonlijk groeipad en een jaarlijkse learning week. Bekijk onze vacatures.",
  alternates: { canonical: "/werken-bij" },
};

export const revalidate = 300;

export default async function WerkenBijPage() {
  const vacatures = await getVacatures();
  const t = await getPagina("werken-bij");
  return (
    <>
      <MobileWerkenBij vacatures={vacatures} werken={t} />
    <div className="p-werken only-desktop">
      <section className="shero">
        <div className="cutout">
          <Image src="/assets/photos/cutout-spreker-groen.webp" alt="" fill sizes="32vw" />
        </div>
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Werken bij
          </div>
          <div className="kicker on-dark" style={{ marginTop: "var(--space-6)" }}>
            {"// Werken bij The New Wave IT"}
          </div>
          <h1>
            {t.heroTitleStart}
            <em>{t.heroAccent}</em>.
          </h1>
          <p>{t.heroLead}</p>
          <div className="hero-actions">
            <a href="#vacatures" className="btn btn-primary">
              Bekijk vacatures <ArrowRight />
            </a>
            <Link href="/over-ons" className="btn btn-ghost-dark">
              Leer ons eerst kennen
            </Link>
          </div>
        </div>
      </section>

      <section className="block groei">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">{t.groeiKicker}</div>
            <h2>{t.groeiTitel}</h2>
            <p>{t.groeiIntro}</p>
          </div>
          <div className="grid">
            {["1", "2", "3"].map((n) => (
              <div className="gcard" key={n}>
                <div className="num">{`0${n}`}</div>
                <h3>{t[`groei${n}Titel`]}</h3>
                <p>{t[`groei${n}Tekst`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block totalpeople">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">{t.tpKicker}</div>
            <h2>{t.tpTitel}</h2>
            <p>{t.tpIntro}</p>
          </div>
          <div className="grid">
            {["1", "2", "3"].map((n) => (
              <div className="tp" key={n}>
                <h3>{t[`tp${n}Titel`]}</h3>
                <p>{t[`tp${n}Tekst`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block cultuur" id="cultuur">
        <div className="wrap-wide">
          <div className="grid">
            <div className="media-img">
              <Image
                src="/assets/photos/team-presentatie-breed.webp"
                alt="Wavers tijdens een kennissessie"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
            <div>
              <div className="kicker">{t.cultuurKicker}</div>
              <h2 style={{ fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 var(--space-5)" }}>
                {t.cultuurTitel}
              </h2>
              <p>{t.cultuurP}</p>
              <ul>
                {["1", "2", "3", "4"].map((n) => (
                  <li key={n}>
                    <Check /> {t[`cultuur${n}`]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="block vacatures" id="vacatures">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker on-dark">Vacatures</div>
            <h2 style={{ color: "#fff", fontSize: "var(--text-3xl)", fontWeight: "var(--fw-extrabold)", margin: "var(--space-4) 0 0" }}>
              Kom de golf versterken.
            </h2>
          </div>
          <div className="list">
            {vacatures.map((v) => (
              <Link href={`/vacatures/${v.slug}`} className="vrow" key={v.slug}>
                <h3>{v.functietitel}</h3>
                <span className="meta">{v.discipline}</span>
                <span className="meta">{v.locatie}</span>
                <ArrowRight className="arrow" />
              </Link>
            ))}
          </div>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-on-dark-muted)", marginTop: "var(--space-6)" }}>
            Staat jouw rol er niet tussen? Stuur een open sollicitatie naar{" "}
            <a href="mailto:hello@thenewwaveit.com" style={{ color: "var(--orange-400)" }}>
              hello@thenewwaveit.com
            </a>{" "}
            of bel Mitchel: 06–10751254.
          </p>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>{t.ctaTitel}</h2>
          <a href="#vacatures" className="btn btn-on">
            Bekijk alle vacatures <ArrowRight />
          </a>
        </div>
      </section>
    </div>
    </>
  );
}
