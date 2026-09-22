/**
 * Het e-mailadres en telefoonnummer van de organisatie, op één plek.
 *
 * Ze stonden op elf plekken hardgecodeerd: de footer, het mobiele menu, de
 * slot-CTA, de contactpagina, over-ons, twee foutpagina's, twee server actions,
 * de mailtemplates en de structured data. Een nummer dat verandert, verandert
 * dan op tien plekken mee en op één niet — en welke dat is merk je pas als
 * iemand belt.
 *
 * Dit bestand heeft bewust géén `server-only`: de foutpagina is een client
 * component en heeft juist dán een telefoonnummer nodig. De lezer die het CMS
 * erbij haalt staat in lib/contact-data.ts, zoals elke andere seed-en-lezer.
 *
 * De waarden hieronder zijn de koude start, precies zoals de seed dat is voor
 * de contenttypen: staat er iets in het CMS, dan wint dat. Wat níet uit het CMS
 * komt is de foutpagina en de mailtemplate — die moeten het ook doen als de
 * database onbereikbaar is, en dat is nu juist het moment waarop iemand het
 * telefoonnummer nodig heeft.
 */
export const CONTACT_TERUGVAL = {
  email: "orders@thenewwaveit.com",
  /** Voor `tel:`- en `wa.me`-links: internationaal, zonder opmaak. */
  telefoon: "+31610751254",
  /** Zoals het op het scherm staat. */
  telefoonWeergave: "06–10751254",
} as const;

export interface Contactgegevens {
  email: string;
  telefoon: string;
  telefoonWeergave: string;
  /** Afgeleid van het nummer, zodat die twee niet uit elkaar kunnen lopen. */
  whatsapp: string;
}
