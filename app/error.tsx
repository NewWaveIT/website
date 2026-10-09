"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
      <main id="main">
        <FoutInhoud {...props} />
      </main>
      <Footer />
    </>
  );
}
