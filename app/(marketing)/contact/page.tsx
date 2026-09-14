import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import { PaginaHero } from "@/components/layout/pagina-hero";
import Image from "next/image";
import {
  Phone,
  Mail,
  MessageCircle,
  CalendarCheck,
  ArrowRight,
  MapPin,
  Linkedin,
} from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { getPagina } from "@/lib/paginas-data";
import { getDienstOpties } from "@/lib/services-data";
import { getContactpersoon } from "@/lib/team-data";
import "./contact.css";

/** Alleen cijfers/+ voor een tel:-URI. */
function telHref(nummer: string): string {
  return `tel:${nummer.replace(/[^\d+]/g, "")}`;
}

export const metadata: Metadata = {
  title: "Plan een gesprek",
  description:
    "Bel, mail, app of plan een vrijblijvend gesprek met een practice lead van The New Wave IT. Ook voor een korte vraag. Reactie binnen één werkdag.",
  alternates: { canonical: "/contact" },
};

/**
 * Volledig statisch. De voorinvulling uit ?dienst= en ?type= doet het formulier
 * zelf in de browser, zodat deze pagina niet per bezoek gerenderd hoeft te
 * worden voor iets wat alleen een keuzelijst anders zet.
 */
export default async function ContactPage() {
  "use cache";
  cacheLife("content");

  const [t, sales, diensten] = await Promise.all([
    getPagina("contact"),
    getContactpersoon("sales"),
    getDienstOpties(),
  ]);

  // Sales-contactpersoon (dynamisch), met terugval op een standaard.
  const salesNaam = sales?.naam || "Koen Wijsman";
  const salesFoto = sales?.foto || "/assets/photos/portret-blauw.webp";
  const salesTel = sales?.telefoon || "06–10751254";
  const salesLinkedin = sales?.linkedin || "https://www.linkedin.com/company/the-new-wave-it";

  return (
    <div className="p-contact">
      <PaginaHero
        toon="licht"
        kruimels={[{ naam: "Contact", pad: "/contact" }]}
        kicker="Contact"
        titel={t.heroTitleStart ?? ""}
        accent={t.heroAccent}
        staart="?"
        lead={t.heroLead}
      />

      <section className="block manieren" aria-labelledby="manieren">
        <div className="wrap-wide">
          {/* Het ontwerp heeft hier geen zichtbare kop; zonder deze h2 springt de
              koppenstructuur van h1 naar h3. */}
          <h2 id="manieren" className="sr-only">
            {t.manierenKop}
          </h2>
          <div className="opts">
            <a href="tel:+31610751254" className="opt">
              <span className="ic">
                <Phone />
              </span>
              <h3>{t.manier1Titel}</h3>
              <p>{t.manier1Tekst}</p>
              <span className="go">
                06–10751254 <ArrowRight />
              </span>
            </a>
            <a href="mailto:hello@thenewwaveit.com" className="opt">
              <span className="ic">
                <Mail />
              </span>
              <h3>{t.manier2Titel}</h3>
              <p>{t.manier2Tekst}</p>
              <span className="go">
                hello@thenewwaveit.com <ArrowRight />
              </span>
            </a>
            <a
              href="https://wa.me/31610751254"
              target="_blank"
              rel="noopener noreferrer"
              className="opt"
            >
              <span className="ic">
                <MessageCircle />
              </span>
              <h3>{t.manier3Titel}</h3>
              <p>{t.manier3Tekst}</p>
              <span className="go">
                {t.manier3Knop} <ArrowRight />
              </span>
            </a>
            <a href="#gesprek" className="opt">
              <span className="ic">
                <CalendarCheck />
              </span>
              <h3>{t.manier4Titel}</h3>
              <p>{t.manier4Tekst}</p>
              <span className="go">
                {t.manier4Knop} <ArrowRight />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="block" id="gesprek">
        <div className="wrap-wide contact-grid">
          <ContactForm diensten={diensten} />
          <aside className="aside">
            <div className="expect">
              <h3>{t.verwachtTitel}</h3>
              <ol>
                {(["1", "2", "3"] as const).map((n) => (
                  <li key={n}>
                    <div>
                      <strong>{t[`verwacht${n}Titel`]}</strong>
                      {t[`verwacht${n}Tekst`]}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="expert">
              <Image
                className="avatar"
                src={salesFoto}
                alt={`${salesNaam}, contactpersoon bij The New Wave IT`}
                width={76}
                height={76}
              />
              <div>
                <div className="role">{t.expertKop}</div>
                <h4>{salesNaam}</h4>
                <div className="links">
                  <a href={telHref(salesTel)}>{salesTel}</a>
                  <a href={salesLinkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="direct">
              <h3>{t.adresTitel}</h3>
              <a
                href="https://maps.google.com/?q=Ganzenmarkt+6+Utrecht"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin /> {t.adresRegel}
              </a>
              <a
                href="https://www.linkedin.com/company/the-new-wave-it"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin /> Volg ons op LinkedIn
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="cta">
        <div className="wrap-wide">
          <h2>{t.ctaTitel}</h2>
          <Link href="/klantverhalen" className="btn btn-on">
            Bekijk klantverhalen <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
