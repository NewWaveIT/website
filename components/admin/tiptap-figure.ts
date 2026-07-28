import { Node, mergeAttributes } from "@tiptap/core";
import type { DOMOutputSpec } from "@tiptap/pm/model";

type FigureAttrs = { src: string | null; alt: string; align: string; caption: string };

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
          return {
            src: img?.getAttribute("src") ?? null,
            alt: img?.getAttribute("alt") ?? "",
            align: el.getAttribute("data-align") ?? "center",
            caption: cap?.textContent ?? "",
          };
        },
      },
    ];
  },

  renderHTML({ node }) {
    const { src, alt, align, caption } = node.attrs as FigureAttrs;
    const attrs = { "data-type": "image", "data-align": align };
    const img: DOMOutputSpec = ["img", mergeAttributes({ src, alt })];
    return (
      caption
        ? ["figure", attrs, img, ["figcaption", {}, caption]]
        : ["figure", attrs, img]
    ) as DOMOutputSpec;
  },
});
