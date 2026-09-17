/**
 * LinkedIn-icoon in de stijl van de rest.
 *
 * Lucide heeft in 1.0 alle merkiconen geschrapt, dus `Linkedin` bestaat daar
 * niet meer en er is geen vervanger. Dit is dezelfde lijntekening als de versie
 * die we gebruikten — lucide staat onder de MIT-licentie, dus overnemen mag —
 * met dezelfde afmetingen en `currentColor`, zodat de knop op de contactpagina
 * er ongewijzigd uitziet.
 *
 * Het is bewust geen officieel LinkedIn-logo: dat is een lijntekening in onze
 * eigen iconenstijl, en dat was het hiervoor ook.
 */
export function LinkedinIcoon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
