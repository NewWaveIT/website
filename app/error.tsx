"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileShell } from "@/components/layout/mobile-shell";
import { CONTACT_TERUGVAL } from "@/lib/contactgegevens";
import { FoutInhoud } from "@/components/fout/fout-inhoud";

/**
 * Fout-vangnet voor routes buiten `app/(marketing)`. Schil expliciet, net als
 * bij de 404 ernaast; binnen de marketinggroep doet
 * `app/(marketing)/error.tsx` het zonder.
 */
export default function Error(props: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <Header />
      {/* Client component, dus de vaste terugval i.p.v. de CMS-lezer: bij een storing is dit juist
          het moment waarop de database er niet hoeft te zijn. */}
      <MobileShell email={CONTACT_TERUGVAL.email} />
      <main id="main">
        <FoutInhoud {...props} />
      </main>
      <Footer />
    </>
  );
}
