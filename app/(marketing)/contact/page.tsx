import type { Metadata } from "next";
import Link from "next/link";
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
import { getContactpersoon } from "@/lib/team-data";
import { getServices } from "@/lib/services-data";
import { CONTACT_TYPES } from "@/lib/services-vragen";
import "./contact.css";

/** Alleen cijfers/+ voor een tel:-URI. */
function telHref(t: string): string {
  return `tel:${t.replace(/[^\d+]/g, "")}`;
}

export const metadata: Metadata = {
  title: "Plan een gesprek",
  description:
    "Bel, mail, app of plan een vrijblijvend gesprek met een practice lead van The New Wave IT. Ook voor een korte vraag. Reactie binnen één werkdag.",
  alternates: { canonical: "/contact" },
};

// Geen `revalidate`: deze pagina leest ?dienst= en ?type= uit de queryparameters
// en is daarmee altijd dynamisch — een statische cache zou de voorinvulling
// van het formulier negeren.
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ dienst?: string; type?: string }>;
}) {
  const [t, sales, services, params] = await Promise.all([
    getPagina("contact"),
    getContactpersoon("sales"),
    getServices(),
    searchParams,
  ]);

  // Sales-contactpersoon (dynamisch), met terugval op een standaard.
  const salesNaam = sales?.naam || "Koen Wijsman";
  const salesFoto = sales?.foto || "/assets/photos/portret-blauw.webp";
  const salesTel = sales?.telefoon || "06–10751254";
  const salesLinkedin = sales?.linkedin || "https://www.linkedin.com/company/the-new-wave-it";

  // Nooit een ongefilterde queryparameter doorgeven aan een formulierveld.
  const dienstPreset = services.some((s) => s.slug === params.dienst) ? (params.dienst ?? "") : "";
  const type = params.type && CONTACT_TYPES.includes(params.type) ? params.type : "gesprek";
  const diensten = services.map((s) => ({
    slug: s.slug,
    naam: s.naam,
    familie: s.familie,
    ctaType: s.ctaType,
  }));

  return (
    <div className="p-contact">
      <section className="chero">
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Contact
          </div>
          <div className="kicker" style={{ marginTop: "var(--space-6)" }}>
            {"Contact"}
          </div>
          <h1>
            {t.heroTitleStart}
            <em>{t.heroAccent}</em>?
          </h1>
          <p>{t.heroLead}</p>
        </div>
      </section>

      <section className="block" style={{ paddingBottom: 0 }}>
        <div className="wrap-wide">
          <div className="opts">
            <a href="tel:+31610751254" className="opt">
              <span className="ic">
                <Phone />
              </span>
              <h3>Bel ons direct</h3>
              <p>Op werkdagen tussen 9 en 17 uur krijg je meteen iemand aan de lijn.</p>
              <span className="go">
                06–10751254 <ArrowRight />
              </span>
            </a>
            <a href="mailto:hello@thenewwaveit.com" className="opt">
              <span className="ic">
                <Mail />
              </span>
              <h3>Stuur een mail</h3>
              <p>Stel je vraag, hoe klein ook. Binnen één werkdag een reactie van een echt mens.</p>
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
              <h3>App met ons</h3>
              <p>Liever appen? Stuur een berichtje via WhatsApp, we reageren snel.</p>
              <span className="go">
                Start een chat <ArrowRight />
              </span>
            </a>
            <a href="#gesprek" className="opt">
              <span className="ic">
                <CalendarCheck />
              </span>
              <h3>Plan een gesprek</h3>
              <p>
                20 tot 45 minuten met een practice lead, afhankelijk van je vraag. Vrijblijvend en
                zonder verkooppraatje.
              </p>
              <span className="go">
                Plan het gesprek <ArrowRight />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="block" id="gesprek">
        <div className="wrap-wide contact-grid">
          <ContactForm type={type} diensten={diensten} dienstPreset={dienstPreset} />
          <aside className="aside">
            <div className="expect">
              <h3>{t.verwachtTitel}</h3>
              <ol>
                {["1", "2", "3"].map((n) => (
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
                <div className="role">Je spreekt met o.a.</div>
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
              <h3>Bezoekadres</h3>
              <a
                href="https://maps.google.com/?q=Ganzenmarkt+6+Utrecht"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin /> Ganzenmarkt 6, Utrecht — koffie staat klaar
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
