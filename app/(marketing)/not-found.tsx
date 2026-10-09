import { NietGevonden } from "@/components/fout/niet-gevonden";

/**
 * 404 binnen de marketinggroep. Geen header, `<main>` of voettekst: die levert
 * `app/(marketing)/layout.tsx` al. Zonder dit bestand viel een onbekende
 * marketing-URL terug op de 404 in de root, die de schil wél meebrengt -- en
 * dan stond alles er twee keer.
 */
export default function NotFound() {
  return <NietGevonden />;
}
