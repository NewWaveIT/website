import { JsonLd } from "@/components/json-ld";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { PaginaHero } from "@/components/layout/pagina-hero";
import Image from "next/image";
import { Users, Target, Award, Leaf, MapPin, Mail } from "lucide-react";
import { getPagina } from "@/lib/paginas-data";
import { getTeamleden } from "@/lib/team-data";
import { AWARD } from "@/lib/award";
import { SlotCta } from "@/components/layout/slot-cta";
import { TeamCarousel } from "@/components/team-carousel";
import { SITE_URL } from "@/lib/site";
import "./over-ons.css";

export const metadata: Metadata = {
  title: "Over ons — de mens als maat",
  description:
    "The New Wave IT: opgericht in 2023, kantoor in Utrecht. Wij realiseren maximale digitale impact met de mens als maat, via low-code en AI.",
  alternates: { canonical: "/over-ons" },
};

/** Het nummer staat erbij als tekst: `waarde${i + 1}` levert een sleutel van
    type `waarde${number}Titel` op, en die kan de compiler niet nakijken. */
const WAARDEN = [
  { nr: "1", Icon: Users },
  { nr: "2", Icon: Target },
  { nr: "3", Icon: Award },
  { nr: "4", Icon: Leaf },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The New Wave IT",
  foundingDate: "2023",
  email: "hello@thenewwaveit.com",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ganzenmarkt 6",
    postalCode: "3512 GD",
    addressLocality: "Utrecht",
    addressCountry: "NL",
  },
};

export default async function OverOnsPage() {
  "use cache";
  cacheLife("content");

  const [t, team] = await Promise.all([getPagina("over-ons"), getTeamleden()]);
  return (
    <div className="p-over">
      <JsonLd data={jsonLd} />

      <PaginaHero
        kruimels={[{ naam: "Over ons", pad: "/over-ons" }]}
        kicker="Over ons"
        titel={t.heroTitleStart ?? ""}
        accent={t.heroAccent}
        staart="."
        lead={t.heroLead}
        achtergrond={
          <div className="badge-img">
            <Image
              src="/assets/photos/team-presentatie-applaus.webp"
              alt=""
              fill
              sizes="46vw"
              priority
            />
          </div>
        }
      >
        <a className="award-badge" href={AWARD.url} target="_blank" rel="noopener noreferrer">
          <Award /> {AWARD.label}
        </a>
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
      </PaginaHero>

      <section className="block missie">
        <div className="wrap-wide">
          <div className="grid">
            <div>
              <div className="kicker">Onze missie</div>
              <h2>{t.missieTitel}</h2>
              <p>{t.missieP1}</p>
              <p>{t.missieP2}</p>
            </div>
            <div className="media-img">
              <Image
                src="/assets/photos/team-brainstorm-postits.webp"
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
            <div className="kicker">{t.waardenKicker}</div>
            <h2>{t.waardenTitel}</h2>
          </div>
          <div className="grid">
            {WAARDEN.map(({ nr, Icon }) => (
              <div className="vcard" key={nr}>
                <div className="ic">
                  <Icon />
                </div>
                <h3>{t[`waarde${nr}Titel`]}</h3>
                <p>{t[`waarde${nr}Tekst`]}</p>
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
                src="/assets/photos/founders-trio.webp"
                alt="Het team achter The New Wave IT"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
            <div>
              <div className="kicker">Het team</div>
              <h2>{t.teamTitel}</h2>
              <p>{t.teamP1}</p>
              <p>{t.teamP2}</p>
              <Link href="/contact" className="btn btn-outline btn-sm">
                Kom kennismaken
              </Link>
            </div>
          </div>
          <TeamCarousel team={team} />
        </div>
      </section>

      <section className="feiten">
        <div className="wrap-wide">
          <div className="row">
            <span className="f">
              <MapPin /> Ganzenmarkt 6, 3512 GD Utrecht
            </span>
            <span className="f">
              <Mail /> hello@thenewwaveit.com
            </span>
          </div>
        </div>
      </section>

      <SlotCta titel={t.ctaTitel ?? ""} />
    </div>
  );
}
