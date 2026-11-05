import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { kiesPlak, MAX_KOPPEN_VOOR_INTRO } from "@/lib/cms/vacature-tekst";

/**
 * Twee dingen voor de vacaturetekst:
 *
 * 1. **Plakken in één keer.** Platte tekst met meerdere regels (uit LinkedIn of Word) wordt
 *    opgemaakt tot koppen, alinea's en opsommingen; zie `lib/cms/vacature-tekst.ts`. Een
 *    plakactie die al echte lijsten of koppen draagt laten we aan de editor.
 * 2. **De intro zichtbaar maken.** De eerste alinea komt als intro in de header van de pagina.
 *    Zonder aanwijzing weet niemand dat, dus die alinea krijgt een label. De regel is dezelfde
 *    als in `splitsVacature`: de eerste alinea, met hooguit {@link MAX_KOPPEN_VOOR_INTRO}
 *    koppen ervoor.
 */
export const VacatureTekst = Extension.create({
  name: "vacatureTekst",

  addProseMirrorPlugins() {
    const editor = this.editor;
    return [
      new Plugin({
        key: new PluginKey("vacaturePlakken"),
        props: {
          handlePaste(_view, event) {
            const klembord = event.clipboardData;
            if (!klembord) return false;
            const html = kiesPlak(klembord.getData("text/html"), klembord.getData("text/plain"));
            if (!html) return false;
            event.preventDefault();
            editor.commands.insertContent(html);
            return true;
          },
        },
      }),
      new Plugin({
        key: new PluginKey("vacatureIntro"),
        props: {
          decorations(state) {
            let koppen = 0;
            let klaar = false;
            let doel: { van: number; tot: number } | null = null;
            state.doc.forEach((node, offset) => {
              if (klaar) return;
              if (node.type.name === "heading" && koppen < MAX_KOPPEN_VOOR_INTRO) {
                koppen++;
                return;
              }
              // Een alinea is de intro. Alles anders (een lijst, een vierde kop): geen intro.
              if (node.type.name === "paragraph")
                doel = { van: offset, tot: offset + node.nodeSize };
              klaar = true;
            });
            if (!doel) return DecorationSet.empty;
            const { van, tot } = doel as { van: number; tot: number };
            return DecorationSet.create(state.doc, [
              Decoration.node(van, tot, {
                class: "rte-intro",
                "data-label": "Intro in de header",
              }),
            ]);
          },
        },
      }),
    ];
  },
});
