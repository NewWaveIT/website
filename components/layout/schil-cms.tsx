import { cacheLife } from "next/cache";
import { getContactgegevens } from "@/lib/contact-data";
import { Footer } from "./footer";
import { MobileShell } from "./mobile-shell";

/**
 * De twee schil-onderdelen die een CMS-waarde nodig hebben, elk in hun eigen
 * cache-scope.
 *
 * Waarom niet gewoon in de layout: die rendert `children`, en een `"use cache"`
 * daaromheen zou elke pagina in dezelfde scope trekken. Zonder die scope leest
 * de layout ongecachete data tijdens het prerenderen, en dan weigert Next de
 * hele route statisch te bouwen — dat was precies de foutmelding.
 *
 * Zo blijft de layout synchroon en cachet elk onderdeel zijn eigen stukje.
 */
export async function MobileShellMetContact() {
  "use cache";
  cacheLife("content");
  const contact = await getContactgegevens();
  return <MobileShell email={contact.email} />;
}

export async function FooterMetContact() {
  "use cache";
  cacheLife("content");
  const contact = await getContactgegevens();
  return <Footer email={contact.email} />;
}
