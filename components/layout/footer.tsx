import Link from "next/link";
import Image from "next/image";
import { FOOTER_SECTOREN, FOOTER_BEDRIJF } from "@/lib/nav";
import { CopyrightJaar } from "./copyright-jaar";
import { CONTACT_TERUGVAL } from "@/lib/contactgegevens";

/**
 * `email` als prop en niet als eigen databaseleesactie: de footer staat ook op
 * app/error.tsx, en dat is een client component. Die kan geen async server
 * component renderen, en hoort al helemaal niet op de database te wachten op
 * het moment dat er net iets is misgegaan. De marketinglayout geeft de waarde
 * uit het CMS mee; de foutpagina laat de terugval staan.
 */
/** Zelfde reden als bij `email`: de foutpagina rendert deze footer ook, en die
 *  mag niet op de database wachten. De marketinglayout geeft het CMS mee. */
const STANDAARD: FooterTeksten = {
  footerBlurb:
    "De business-specialist in publieke sector, mobiliteit, banken, zorg en manufacturing. Technologie als middel, jouw resultaat als doel.",
  footerKopSectoren: "Sectoren",
  footerKopBedrijf: "Bedrijf",
  footerKopContact: "Contact",
  footerPrivacy: "Privacybeleid",
};

export interface FooterTeksten {
  footerBlurb: string;
  footerKopSectoren: string;
  footerKopBedrijf: string;
  footerKopContact: string;
  footerPrivacy: string;
}

export function Footer({
  email = CONTACT_TERUGVAL.email,
  tk = STANDAARD,
}: {
  email?: string;
  tk?: FooterTeksten;
}) {
  return (
    <footer className="site-footer">
      <div className="wrap-wide">
        <div className="foot-top">
          <div>
            <Image
              className="foot-logo"
              src="/assets/logos/logo-horizontal-white.png"
              alt="The New Wave IT"
              width={190}
              height={30}
            />
            <p className="foot-blurb">{tk.footerBlurb}</p>
          </div>
          {/* prefetch uit: de voettekst staat op elke pagina en haalde daarmee
              de RSC-payload van elf routes op zodra hij in beeld kwam -- op
              /contact 131 kB die de bezoeker in de regel niet gebruikt. De
              navigatie boven en de CTA's in de tekst prefetchen wel. */}
          <div>
            <h2>{tk.footerKopSectoren}</h2>
            {FOOTER_SECTOREN.map((link) => (
              <Link key={link.href} href={link.href} prefetch={false}>
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <h2>{tk.footerKopBedrijf}</h2>
            {FOOTER_BEDRIJF.map((link) => (
              <Link key={link.href} href={link.href} prefetch={false}>
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <h2>{tk.footerKopContact}</h2>
            <a href={`mailto:${email}`}>{email}</a>
            <a
              href="https://www.linkedin.com/company/the-new-wave-it"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <Link href="/contact">Plan een gesprek</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>
            © <CopyrightJaar /> The New Wave IT
          </span>
          <span>
            <Link href="/privacy" prefetch={false}>
              {tk.footerPrivacy}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
