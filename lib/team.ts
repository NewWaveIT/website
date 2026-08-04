/** Teamleden voor de /over-ons-teamsectie. */

export interface Teamlid {
  slug: string;
  naam: string;
  rol: string;
  foto: string;
  bio: string;
  /** Contactrol: "Sales", "Recruitment", "Sales & recruitment" of leeg. Bepaalt
   *  welk teamlid als contactpersoon op de contact- resp. vacaturepagina toont. */
  contactrol?: string;
  telefoon?: string;
  email?: string;
  linkedin?: string;
}

/** Standaardteam (fallback op de site + seed voor het CMS). Aanpasbaar in het CMS. */
export const TEAMLEDEN: Teamlid[] = [
  {
    slug: "koen-wijsman",
    naam: "Koen Wijsman",
    rol: "CEO & founder",
    foto: "/assets/photos/portret-blauw.webp",
    bio: "Verbindt business en IT en staat directies bij in hun digitale koers.",
    contactrol: "Sales",
    telefoon: "06–10751254",
    linkedin: "https://www.linkedin.com/company/the-new-wave-it",
  },
  {
    slug: "mitchel-wallaart",
    naam: "Mitchel Wallaart",
    rol: "Operations lead",
    foto: "/assets/photos/portret-3.webp",
    bio: "Zorgt dat opdrachten soepel lopen en dat nieuwe Wavers zich thuis voelen.",
    contactrol: "Recruitment",
    telefoon: "06–10751254",
    email: "hello@thenewwaveit.com",
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
