"use client";

import { useEffect } from "react";
import Link from "next/link";
import { unstable_isUnrecognizedActionError } from "next/navigation";
import { ArrowRight, RotateCcw } from "lucide-react";
import { CONTACT_TERUGVAL } from "@/lib/contactgegevens";
import { VerouderdeVersie } from "@/components/fout/verouderde-versie";

/**
 * De inhoud van het fout-vangnet voor de publieke site, zonder schil.
 *
 * Om dezelfde reden los als `NietGevonden`: binnen `app/(marketing)` levert de
 * layout de header, de `<main>` en de voettekst al, daarbuiten niet. Zie de
 * toelichting daar.
 */
export function FoutInhoud({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Expliciet `boolean`, niet het afgeleide type: de helper is een type
  // predicate en `UnrecognizedActionError` is structureel gelijk aan `Error`,
  // waardoor TypeScript `error` anders tot `never` versmalt.
  const verouderd: boolean = unstable_isUnrecognizedActionError(error);

  useEffect(() => {
    // Log voor diagnose (kan later naar een monitoring-dienst). Een verouderde
    // versie is geen storing, dus die hoeft niet in de logs.
    if (!verouderd) console.error(error);
  }, [error, verouderd]);

  return (
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
            Door een onverwachte fout konden we deze pagina niet laden. Probeer het opnieuw; lukt
            het dan nog steeds niet, ga terug naar de homepage of neem gerust contact met ons op.
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
  );
}
