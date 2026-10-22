/** Wat een klik op een link betekent voor de navigatie-indicator. Puur, zodat het te testen is. */

export interface LinkKlik {
  href: string;
  target: string | null;
  download: boolean;
  /** `MouseEvent.button`: 0 is de gewone linkermuisklik. */
  knop: number;
  /** Cmd/Ctrl/Shift/Alt ingedrukt: de bezoeker opent een nieuw tabblad of venster. */
  modifier: boolean;
}

/**
 * Begint deze klik een navigatie binnen de site naar een andere pagina?
 *
 * Nee bij: een andere herkomst, een nieuw tabblad of venster, een download, een
 * link die alleen het anker (`#…`) wijzigt, of dezelfde pagina. Daar komt geen
 * paginawissel van, en een voortgangsbalk die nooit klaar komt is erger dan geen balk.
 */
export function isPaginawissel(klik: LinkKlik, huidig: string): boolean {
  if (klik.knop !== 0 || klik.modifier || klik.download) return false;
  if (klik.target && klik.target !== "_self") return false;

  let doel: URL;
  let nu: URL;
  try {
    nu = new URL(huidig);
    doel = new URL(klik.href, nu);
  } catch {
    return false;
  }
  if (doel.origin !== nu.origin) return false;
  return doel.pathname !== nu.pathname || doel.search !== nu.search;
}
