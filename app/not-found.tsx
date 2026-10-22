import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileShellMetContact } from "@/components/layout/schil-cms";
import { NietGevonden } from "@/components/fout/niet-gevonden";

/**
 * 404 voor routes buiten `app/(marketing)`, bijvoorbeeld /medewerkerspakket.
 * Daar is alleen de root-layout, dus de schil staat hier expliciet. Binnen de
 * marketinggroep vangt `app/(marketing)/not-found.tsx` hem op, zonder schil.
 *
 * De mobiele schil hoort erbij: op een telefoon is `<Header />` verborgen, en een
 * verdwaalde bezoeker heeft dan nergens een menu of logo.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <MobileShellMetContact />
      <main id="main">
        <NietGevonden />
      </main>
      <Footer />
    </>
  );
}
