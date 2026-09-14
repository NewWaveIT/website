import "server-only";
import { getPagina } from "@/lib/paginas-data";
import { CONTACT_TERUGVAL, type Contactgegevens } from "@/lib/contactgegevens";

/** Alleen de cijfers: `+31610751254` wordt `31610751254`. */
function waNummer(telefoon: string): string {
  return telefoon.replace(/\D/g, "");
}

/**
 * De contactgegevens zoals ze op de site horen te staan: uit het CMS als de
 * redacteur ze heeft ingevuld, anders de terugval uit lib/contactgegevens.ts.
 * Ze hangen aan de contactpagina, want daar hoort een redacteur ze te zoeken.
 */
export async function getContactgegevens(): Promise<Contactgegevens> {
  const t = await getPagina("contact");
  const email = t.emailAdres || CONTACT_TERUGVAL.email;
  const telefoon = t.telefoonNummer || CONTACT_TERUGVAL.telefoon;
  const telefoonWeergave = t.telefoonWeergave || CONTACT_TERUGVAL.telefoonWeergave;
  return {
    email,
    telefoon,
    telefoonWeergave,
    whatsapp: `https://wa.me/${waNummer(telefoon)}`,
  };
}
