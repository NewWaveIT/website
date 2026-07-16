import Link from "next/link";
import Image from "next/image";
import { FOOTER_SECTOREN, FOOTER_BEDRIJF } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap-wide">
        <div className="foot-top">
          <div>
            <Image
              src="/assets/logos/logo-horizontal-white.png"
              alt="The New Wave IT"
              width={190}
              height={30}
              style={{ height: 30, width: "auto" }}
            />
            <p className="foot-blurb">
              De business-specialist in publieke sector, mobiliteit, banken, zorg
              en manufacturing. Technologie als middel, jouw resultaat als doel.
            </p>
          </div>
          <div>
            <h5>Sectoren</h5>
            {FOOTER_SECTOREN.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <h5>Bedrijf</h5>
            {FOOTER_BEDRIJF.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <h5>Contact</h5>
            <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a>
            <a
              href="https://www.linkedin.com/company/the-new-wave-it"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <Link href="/contact">Plan een strategiegesprek</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} The New Wave IT</span>
          <span>Privacy · Voorwaarden</span>
        </div>
      </div>
    </footer>
  );
}
