/** De schermen die de ontwerpweergave kent, op één plek zodat de index, de
 *  route en de WCAG-gate niet uit elkaar kunnen lopen. */
export const SCHERMEN = [
  {
    sleutel: "lijst",
    titel: "Contentlijst",
    toelichting: "Overzicht met zoeken, filters, statuslabels en slepen.",
  },
  {
    sleutel: "editor",
    titel: "Editor: bestaand item",
    toelichting: "Een pagina openen en bewerken.",
  },
  {
    sleutel: "editor-nieuw",
    titel: "Editor: nieuw item",
    toelichting: "Wat je ziet als je op Nieuw klikt.",
  },
  { sleutel: "aanvragen", titel: "Aanvragenbord", toelichting: "Opvolging met kaartjes en lade." },
] as const;

export type SchermSleutel = (typeof SCHERMEN)[number]["sleutel"];
