/**
 * Witte tekst op flame (#f15822) haalt bewust geen AA — dat is een merkkeuze,
 * vastgelegd in CLAUDE.md.
 *
 * Die uitzondering stond eerder als `disableRules(["color-contrast"])`, dus
 * regelbreed. Daarmee glipte álles wat verder niet haalde er ook doorheen:
 * oranje tekst op wit (3,4:1), het kruimelpad op de donkere hero (2,9:1),
 * partnerlogo's op wit (2,65:1). De regel staat aan en alleen déze ene
 * combinatie wordt achteraf weggefilterd, op de gemeten kleuren zelf.
 *
 * Staat los van de spec omdat twee suites hem gebruiken: de desktopgate in
 * `toegankelijkheid.spec.ts` en de mobiele in `mobiel.spec.ts`.
 */

const MERKUITZONDERING = { voorgrond: "#ffffff", achtergrond: "#f15822" };

/** Is deze melding de merkcombinatie wit-op-flame? */
export function isMerkuitzondering(node: { any?: { message?: string }[] }): boolean {
  const m = node.any?.[0]?.message ?? "";
  return (
    m.includes(`foreground color: ${MERKUITZONDERING.voorgrond}`) &&
    m.includes(`background color: ${MERKUITZONDERING.achtergrond}`)
  );
}

/** Laat alleen contrastfouten over die niet onder de merkuitzondering vallen. */
export function zonderMerkuitzondering<
  T extends { id: string; nodes: { any?: { message?: string }[] }[] },
>(violations: T[]): T[] {
  return violations
    .map((v) =>
      v.id === "color-contrast"
        ? { ...v, nodes: v.nodes.filter((n) => !isMerkuitzondering(n)) }
        : v,
    )
    .filter((v) => v.nodes.length > 0);
}

/** Leesbare melding bij een rode test: wélk element, niet alleen hoeveel. */
export function beschrijf(
  violations: { id: string; impact?: string | null; help: string; nodes: { target: unknown }[] }[],
): string {
  return violations
    .map(
      (v) => `${v.id} (${v.impact}): ${v.help}\n    ${v.nodes.map((n) => n.target).join("\n    ")}`,
    )
    .join("\n  ");
}
