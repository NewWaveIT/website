/** Teamleden voor de /over-ons-teamsectie. */

export interface Teamlid {
  slug: string;
  naam: string;
  rol: string;
  /** Optioneel: alleen invullen als er een echte, goedgekeurde profielfoto is.
   *  Leeg = de teamcarousel toont een neutraal avatar-icoon. */
  foto?: string;
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
    telefoon: "+31 6 83 17 09 76",
    email: "hello@thenewwaveit.com",
  },
  {
    slug: "jeroen-plooij",
    naam: "Jeroen Plooij",
    rol: "Mendix Consultant",
    bio: "",
  },
  {
    slug: "sonny-van-rein",
    naam: "Sonny van Rein",
    rol: "Mendix Consultant",
    bio: "",
  },
  {
    slug: "aclan-aksoy",
    naam: "Aclan Aksoy",
    rol: "Mendix Consultant",
    bio: "",
  },
  {
    slug: "thijs-van-den-bosch",
    naam: "Thijs van den Bosch",
    rol: "Mendix Consultant",
    bio: "",
  },
  {
    slug: "remco-den-hartog",
    naam: "Remco den Hartog",
    rol: "Mendix Consultant",
    bio: "",
  },
  {
    slug: "furkan-karacaer",
    naam: "Furkan Karacaer",
    rol: "Mendix Consultant",
    bio: "",
  },
  {
    slug: "naufal-el-amrani",
    naam: "Naufal el Amrani",
    rol: "Marketing stagiair",
    bio: "",
  },
];
