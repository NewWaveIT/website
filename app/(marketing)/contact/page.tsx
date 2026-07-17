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
import { MobileContact } from "@/components/mobile/mobile-contact";
import "./contact.css";
import "./mobile.css";

export const metadata: Metadata = {
  title: "Plan een strategiegesprek",
  description:
    "Bel, mail, app of plan een vrijblijvend strategiegesprek van 45 minuten met een practice lead van The New Wave IT. Reactie binnen één werkdag.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <MobileContact />
      <div className="only-desktop">
      <section className="chero">
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / Contact
          </div>
          <div className="kicker" style={{ marginTop: "var(--space-6)" }}>
            {"// Contact"}
          </div>
          <h1>
            Waar kunnen we je <em>mee helpen</em>?
          </h1>
          <p>
            Een strategiegesprek plannen kan, maar een korte vraag stellen mag ook
            gewoon. Bel, mail, app of kom langs, je zit nergens aan vast.
          </p>
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
              <h3>Plan een strategiegesprek</h3>
              <p>45 minuten met een practice lead over jouw vraagstuk. Vrijblijvend en zonder verkooppraatje.</p>
              <span className="go">
                Plan het gesprek <ArrowRight />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="block" id="gesprek">
        <div className="wrap-wide contact-grid">
          <ContactForm />
          <aside className="aside">
            <div className="expect">
              <h3>Wat je kunt verwachten</h3>
              <ol>
                <li>
                  <div>
                    <strong>Voorbereiding</strong>
                    We verdiepen ons vooraf in jouw sector en organisatie, zodat
                    het gesprek meteen de diepte in kan.
                  </div>
                </li>
                <li>
                  <div>
                    <strong>Het gesprek</strong>
                    45 minuten met een practice lead, over jouw businessvraagstuk,
                    niet over onze diensten.
                  </div>
                </li>
                <li>
                  <div>
                    <strong>Concreet vervolg</strong>
                    Binnen drie dagen een eerste analyse met mogelijke routes,
                    geheel vrijblijvend.
                  </div>
                </li>
              </ol>
            </div>
            <div className="expert">
              <Image
                className="avatar"
                src="/assets/photos/portret-blauw.png"
                alt="Koen Wijsman, CEO van The New Wave IT"
                width={76}
                height={76}
              />
              <div>
                <div className="role">Je spreekt met o.a.</div>
                <h4>Koen Wijsman</h4>
                <div className="links">
                  <a href="tel:+31610751254">06–10751254</a>
                  <a
                    href="https://www.linkedin.com/company/the-new-wave-it"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="direct">
              <h3>Bezoekadres</h3>
              <a href="#">
                <MapPin /> Utrecht — koffie staat klaar
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
          <h2>Liever eerst zien wat we voor anderen deden?</h2>
          <Link href="/klantverhalen" className="btn btn-on">
            Bekijk klantverhalen <ArrowRight />
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
