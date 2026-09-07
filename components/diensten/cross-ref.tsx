import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./cross-ref.css";

interface CrossRefItem {
  label: string;
  href: string;
}

interface CrossRefProps {
  items: CrossRefItem[];
  titel?: string;
}

/** "Ook relevant vanuit …"-regel onderaan een richting-hub. Rendert niets zonder items. */
export function CrossRef({ items, titel = "Ook relevant" }: CrossRefProps) {
  if (items.length === 0) return null;
  return (
    <div className="crossref">
      <div className="kicker">{titel}</div>
      <ul>
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href}>
              {it.label} <ArrowRight aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
