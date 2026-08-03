import { buildHeroSvg } from "@/lib/sector-hero-svg";

/**
 * Geanimeerde hero-vignette voor sector-/dienstpagina's (port van sector-hero.js).
 * De SVG wordt server-side gegenereerd; de animaties zijn pure CSS-keyframes
 * (zie globals.css). Respecteert prefers-reduced-motion.
 */
export function SectorHeroAnim({ theme }: { theme: string }) {
  const svg = buildHeroSvg(theme);
  if (!svg) return null;
  return (
    <div className="shero-anim" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />
  );
}
