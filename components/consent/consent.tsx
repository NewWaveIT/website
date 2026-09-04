"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "tnw-consent";

type Choice = "granted" | "denied" | null;

/**
 * Cookie-toestemming + Google Analytics. GA laadt uitsluitend ná 'Accepteren'
 * (opt-in, AVG/ePrivacy) én alleen als NEXT_PUBLIC_GA_ID is ingesteld.
 * Functionele (inlog-)cookies vallen hier niet onder.
 */
export function Consent() {
  const [choice, setChoice] = useState<Choice>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount-detectie + localStorage-lezen: synchroniseert met een extern
    // systeem dat tijdens SSR niet bestaat (anders hydration-mismatch).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const v = localStorage.getItem(KEY);
      if (v === "granted" || v === "denied") setChoice(v);
    } catch {
      // localStorage niet beschikbaar — banner blijft tonen
    }
  }, []);

  const decide = (v: Exclude<Choice, null>) => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      // negeer
    }
    setChoice(v);
  };

  if (!mounted) return null;

  return (
    <>
      {choice === "granted" && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {choice === null && (
        <div className="cookie-banner" role="dialog" aria-label="Cookie-toestemming">
          <div className="cookie-inner">
            <p>
              We gebruiken alleen functionele cookies. Met jouw toestemming plaatsen we ook
              analytische cookies om de site te verbeteren. Zie ons{" "}
              <Link href="/privacy">privacybeleid</Link>.
            </p>
            <div className="cookie-actions">
              <button type="button" className="cookie-btn ghost" onClick={() => decide("denied")}>
                Alleen functioneel
              </button>
              <button
                type="button"
                className="cookie-btn primary"
                onClick={() => decide("granted")}
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
