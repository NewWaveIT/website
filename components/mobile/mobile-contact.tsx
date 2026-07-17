import Link from "next/link";
import { Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { MobileFx } from "./mobile-fx";

export function MobileContact() {
  return (
    <div className="m-page m-contact only-mobile">
      <section className="mhero light">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link> / Contact</div>
          <div className="kicker">{"// Contact"}</div>
          <h1>Waar kunnen we je <em>mee helpen</em>?</h1>
          <p>Bel, mail, app of kom langs, je zit nergens aan vast.</p>
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
            <h3>Wat je kunt verwachten</h3>
            <ol>
              <li><div><strong>Voorbereiding</strong>We verdiepen ons vooraf in jouw sector en organisatie.</div></li>
              <li><div><strong>Het gesprek</strong>45 minuten met een practice lead, over jouw businessvraagstuk.</div></li>
              <li><div><strong>Concreet vervolg</strong>Binnen drie dagen een eerste analyse, geheel vrijblijvend.</div></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Liever eerst zien wat we voor anderen deden?</h2>
          <Link href="/klantverhalen" className="btn">Bekijk klantverhalen <ArrowRight /></Link>
        </div>
      </section>

      <MobileFx />
    </div>
  );
}
