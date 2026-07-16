export type ClassValue = string | number | null | false | undefined;

/** Voegt classnames samen; filtert falsy waarden. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
