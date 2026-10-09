import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NietGevonden } from "@/components/fout/niet-gevonden";

/**
 * 404 voor routes buiten `app/(marketing)`, bijvoorbeeld /medewerkerspakket.
 * Daar is alleen de root-layout, dus de schil staat hier expliciet. Binnen de
 * marketinggroep vangt `app/(marketing)/not-found.tsx` hem op, zonder schil.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <NietGevonden />
      </main>
      <Footer />
    </>
  );
}
