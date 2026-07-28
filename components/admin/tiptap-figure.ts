import { Node, mergeAttributes } from "@tiptap/core";
import type { DOMOutputSpec } from "@tiptap/pm/model";

type FigureAttrs = {
  src: string | null;
  alt: string;
  align: string;
  caption: string;
  width: number | null;
  height: number | null;
};

/**
 * Afbeelding met uitlijning en optioneel bijschrift, als één blok-node
 * (<figure data-align><img><figcaption></figure>). Atom-node: als geheel
 * selecteerbaar, uitlijning/bijschrift via de werkbalk.
 */
export const FigureImage = Node.create({
  name: "figureImage",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: "" },
      align: { default: "center" },
      caption: { default: "" },
      width: { default: null },
      height: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure[data-type="image"]',
        getAttrs: (node) => {
          const el = node as HTMLElement;
          const img = el.querySelector("img");
          const cap = el.querySelector("figcaption");
          const w = img?.getAttribute("width");
          const h = img?.getAttribute("height");
          return {
            src: img?.getAttribute("src") ?? null,
            alt: img?.getAttribute("alt") ?? "",
            align: el.getAttribute("data-align") ?? "center",
            caption: cap?.textContent ?? "",
            width: w ? Number(w) : null,
            height: h ? Number(h) : null,
          };
        },
      },
    ];
  },

  renderHTML({ node }) {
    const { src, alt, align, caption, width, height } = node.attrs as FigureAttrs;
    const attrs = { "data-type": "image", "data-align": align };
    const imgAttrs: Record<string, unknown> = { src, alt };
    if (width) imgAttrs.width = width;
    if (height) imgAttrs.height = height;
    const img: DOMOutputSpec = ["img", mergeAttributes(imgAttrs)];
    return (
      caption
        ? ["figure", attrs, img, ["figcaption", {}, caption]]
        : ["figure", attrs, img]
    ) as DOMOutputSpec;
  },
});
