"use client";

import { useEffect } from "react";
import Link from "next/link";
import { unstable_isUnrecognizedActionError } from "next/navigation";
import { ArrowRight, RotateCcw } from "lucide-react";
import { CONTACT_TERUGVAL } from "@/lib/contactgegevens";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VerouderdeVersie } from "@/components/fout/verouderde-versie";

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
  // Een server action die de server niet meer kent: er is een nieuwe versie
  // uitgerold terwijl deze tab openstond. Daar helpt `reset()` niet tegen,
  // alleen herladen -- zie `VerouderdeVersie`.
  const verouderd = unstable_isUnrecognizedActionError(error);

  useEffect(() => {
    // Log voor diagnose (kan later naar een monitoring-dienst). Een verouderde
    // versie is geen storing, dus die hoeft niet in de logs.
    if (!verouderd) console.error(error);
  }, [error, verouderd]);

  return (
    <>
      <Header />
      <main id="main">
        <section className="notfound">
          <div className="wrap-wide">
            <div className="nf-code" aria-hidden="true">
              !
            </div>
            <h1>{verouderd ? "Er is zojuist een nieuwe versie uitgerold" : "Er ging iets mis"}</h1>
            {verouderd ? (
              <VerouderdeVersie />
            ) : (
              <p>
                Door een onverwachte fout konden we deze pagina niet laden. Probeer het opnieuw;
                lukt het dan nog steeds niet, ga terug naar de homepage of neem gerust contact met
                ons op.
              </p>
            )}
            <div className="nf-actions">
              {!verouderd && (
                <button type="button" onClick={reset} className="btn btn-primary">
                  <RotateCcw /> Opnieuw proberen
                </button>
              )}
              <Link href="/" className="btn btn-outline">
                Naar de homepage <ArrowRight />
              </Link>
              <a href={`tel:${CONTACT_TERUGVAL.telefoon}`} className="nf-tel">
                Of bel {CONTACT_TERUGVAL.telefoonWeergave}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
