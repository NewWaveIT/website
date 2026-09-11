import Image from "next/image";
import parse, { Element, type HTMLReactParserOptions } from "html-react-parser";

const options: HTMLReactParserOptions = {
  replace: (node) => {
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

/** Rendert opgemaakte (gesaneerde) artikel-HTML; afbeeldingen via next/image. */
export function ArticleContent({ html }: { html: string }) {
  return <>{parse(html, options)}</>;
}
