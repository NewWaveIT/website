import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/** Globale 404 — rendert in de root-layout, dus header/footer expliciet. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="notfound">
          <div className="wrap-wide">
            <div className="nf-code">404</div>
            <h1>Deze pagina bestaat niet (meer)</h1>
            <p>
              De link is mogelijk verouderd of verkeerd getypt. Ga terug naar de homepage, bekijk
              onze sectoren, of neem gerust contact op.
            </p>
            <div className="nf-actions">
              <Link href="/" className="btn btn-primary">
                Naar de homepage <ArrowRight />
              </Link>
              <Link href="/sectoren" className="btn btn-outline">
                Bekijk sectoren
              </Link>
              <a href="tel:+31610751254" className="nf-tel">
                Of bel 06–10751254
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
