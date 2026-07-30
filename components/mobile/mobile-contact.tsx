import Link from "next/link";
import { Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { MobileFx } from "./mobile-fx";

export function MobileContact({ contact }: { contact: Record<string, string> }) {
  return (
    <div className="m-page m-contact only-mobile">
      <section className="mhero light">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Contact</div>
          <div className="kicker">{"Contact"}</div>
          <h1>{contact.heroTitleStart}<em>{contact.heroAccent}</em>?</h1>
          <p>{contact.heroLeadMobiel}</p>
        </div>
      </section>

      <section className="block" style={{ paddingBottom: 0 }}>
        <div className="wrap opts">
          <a href="tel:+31610751254" className="opt rv">
            <span className="icbox"><Phone /></span>
            <div><h3>Bel ons direct</h3><p>Werkdagen 9–17 uur: meteen iemand aan de lijn. 06–10751254</p></div>
            <ArrowRight className="arrow" />
          </a>
          <a href="mailto:hello@thenewwaveit.com" className="opt rv">
            <span className="icbox"><Mail /></span>
            <div><h3>Stuur een mail</h3><p>Binnen één werkdag reactie. hello@thenewwaveit.com</p></div>
            <ArrowRight className="arrow" />
          </a>
          <a href="https://wa.me/31610751254" target="_blank" rel="noopener noreferrer" className="opt rv">
            <span className="icbox"><MessageCircle /></span>
            <div><h3>App met ons</h3><p>Liever appen? Via WhatsApp reageren we snel.</p></div>
            <ArrowRight className="arrow" />
          </a>
        </div>
      </section>

      <section className="block" id="gesprek">
        <div className="wrap">
          <ContactForm />
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="expect rv">
            <h3>{contact.verwachtTitel}</h3>
            <ol>
              {["1", "2", "3"].map((n) => (
                <li key={n}><div><strong>{contact[`verwacht${n}Titel`]}</strong>{contact[`verwacht${n}Tekst`]}</div></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>{contact.ctaTitel}</h2>
          <Link href="/klantverhalen" className="btn">Bekijk klantverhalen <ArrowRight /></Link>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
