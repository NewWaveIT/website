"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/**
 * Fout-vangnet voor de publieke site. Vangt onverwachte fouten in de
 * marketingpagina's op en toont een nette, herstelbare pagina in de huisstijl
 * (i.p.v. de kale Next.js-standaardfout). Rendert in de root-layout, dus
 * header/footer expliciet — net als de 404.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log voor diagnose (kan later naar een monitoring-dienst).
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main id="main">
        <section className="notfound">
          <div className="wrap-wide">
            <div className="nf-code" aria-hidden="true">
              !
            </div>
            <h1>Er ging iets mis</h1>
            <p>
              Door een onverwachte fout konden we deze pagina niet laden. Probeer het opnieuw; lukt
              het dan nog steeds niet, ga terug naar de homepage of neem gerust contact met ons op.
            </p>
            <div className="nf-actions">
              <button type="button" onClick={reset} className="btn btn-primary">
                <RotateCcw /> Opnieuw proberen
              </button>
              <Link href="/" className="btn btn-outline">
                Naar de homepage <ArrowRight />
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
