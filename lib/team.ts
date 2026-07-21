/** Teamleden voor de /over-ons-teamsectie. */

export interface Teamlid {
  slug: string;
  naam: string;
  rol: string;
  foto: string;
  bio: string;
}

/** Standaardteam (fallback op de site + seed voor het CMS). Aanpasbaar in het CMS. */
export const TEAMLEDEN: Teamlid[] = [
  {
    slug: "koen-wijsman",
    naam: "Koen Wijsman",
    rol: "CEO & founder",
    foto: "/assets/photos/portret-blauw.webp",
    bio: "Verbindt business en IT en staat directies bij in hun digitale koers.",
  },
  {
    slug: "mitchel-wallaart",
    naam: "Mitchel Wallaart",
    rol: "Operations lead",
    foto: "/assets/photos/portret-3.webp",
    bio: "Zorgt dat opdrachten soepel lopen en dat nieuwe Wavers zich thuis voelen.",
  },
  {
    slug: "sanne-willems",
    naam: "Sanne Willems",
    rol: "AI Engineer",
    foto: "/assets/photos/portret-bordeaux.webp",
    bio: "Brengt AI van experiment naar geborgd, uitlegbaar proces.",
  },
  {
    slug: "jesse-de-boer",
    naam: "Jesse de Boer",
    rol: "Lead Mendix Consultant",
    foto: "/assets/photos/portret-duimen.webp",
    bio: "Bouwt bedrijfskritische low-code applicaties en coacht teams.",
  },
];
