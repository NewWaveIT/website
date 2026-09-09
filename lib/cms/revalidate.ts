import "server-only";
import { revalidatePath } from "next/cache";

/**
 * Ververs de publieke site na een contentwijziging.
 *
 * Bewust grofmazig: één contentwijziging maakt de hele site ongeldig. Hier
 * stond eerder een kaart van contenttype naar de routes die het raakt, met
 * regels als "/sectoren/[slug]:page". Die moest bij élke nieuwe pagina worden
 * bijgewerkt en dat ging mis: verwijderen ververste niets, en sorteren wees
 * naar een pagina die proposities niet eens rendert.
 *
 * De kosten van grofmazig zijn hier nihil. Elke publieke pagina is al ISR met
 * `revalidate = 300`, dus hij wordt sowieso elke vijf minuten opnieuw
 * opgebouwd; dit vervroegt dat alleen. Regeneratie is lui — pagina's worden pas
 * hergebouwd als iemand ze bezoekt — en het gaat om zo'n veertig pagina's en
 * een handvol contentwijzigingen per dag.
 *
 * De sitemap staat er los bij: die hangt niet onder de marketinglayout.
 */
export function revalidateContent(): void {
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
}
