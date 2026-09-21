import Image from "next/image";
import parse, {
  Element,
  domToReact,
  type DOMNode,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { kopSlug } from "@/lib/artikel-koppen";

/**
 * Elke h2 krijgt hetzelfde anker als de inhoudsopgave ernaast berekent (zie
 * lib/artikel-koppen.ts). Twee koppen met dezelfde tekst tellen door, anders
 * wijzen twee items naar hetzelfde anker.
 */
function maakOpties(): HTMLReactParserOptions {
  const gezien = new Map<string, number>();
  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (node instanceof Element && node.name === "h2") {
        const tekst = (node.children as DOMNode[])
          .map((k) => ("data" in k ? String(k.data) : ""))
          .join("")
          .trim();
        const basis = kopSlug(tekst || "kop");
        const n = (gezien.get(basis) ?? 0) + 1;
        gezien.set(basis, n);
        return (
          <h2 id={n === 1 ? basis : `${basis}-${n}`}>
            {domToReact(node.children as DOMNode[], options)}
          </h2>
        );
      }
      if (node instanceof Element && node.name === "img") {
        const { src, alt, width, height } = node.attribs;
        if (!src) return null;
        const w = Number(width) || 1200;
        const h = Number(height) || 800;
        return (
          <Image
            src={src}
            alt={alt ?? ""}
            width={w}
            height={h}
            sizes="(max-width: 720px) 100vw, 720px"
            className="artikel-beeld"
          />
        );
      }
      return undefined;
    },
  };
  return options;
}

/** Rendert opgemaakte (gesaneerde) artikel-HTML; afbeeldingen via next/image. */
export function ArticleContent({ html }: { html: string }) {
  // Nieuwe opties per aanroep: de teller voor dubbele koppen mag niet blijven
  // staan tussen twee artikelen door.
  return <>{parse(html, maakOpties())}</>;
}
