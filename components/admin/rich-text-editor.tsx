"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useRef, useState } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  ImagePlus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Captions,
  Trash2,
  Undo,
  Redo,
} from "lucide-react";
import { uploadImage } from "@/app/admin/content/actions";
import { FigureImage } from "./tiptap-figure";
import { Modal } from "./modal";

/** Actieve modal-status binnen de werkbalk. */
type RtePrompt =
  | { kind: "link"; url: string }
  | { kind: "image"; url: string; width: number | null; height: number | null; alt: string; caption: string }
  | { kind: "caption"; alt: string; caption: string };

function Btn({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`rte-btn${active ? " on" : ""}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor, lite }: { editor: Editor; lite: boolean }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [prompt, setPrompt] = useState<RtePrompt | null>(null);
  const imgSelected = editor.isActive("figureImage");
  const align = (editor.getAttributes("figureImage").align as string) ?? "center";

  const openLink = () => {
    const prev = (editor.getAttributes("link").href as string | undefined) ?? "";
    setPrompt({ kind: "link", url: prev || "https://" });
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadImage(fd);
    setBusy(false);
    if (fileRef.current) fileRef.current.value = "";
    if (res.error || !res.url) {
      setPrompt(null);
      window.alert(res.error ?? "Uploaden mislukt.");
      return;
    }
    setPrompt({ kind: "image", url: res.url, width: res.width ?? null, height: res.height ?? null, alt: "", caption: "" });
  };

  const setAlign = (a: string) => editor.chain().focus().updateAttributes("figureImage", { align: a }).run();
  const openCaption = () => {
    setPrompt({
      kind: "caption",
      alt: (editor.getAttributes("figureImage").alt as string) ?? "",
      caption: (editor.getAttributes("figureImage").caption as string) ?? "",
    });
  };

  // Past de actieve modal toe op de editor en sluit de modal.
  const applyPrompt = () => {
    if (!prompt) return;
    if (prompt.kind === "link") {
      const url = prompt.url.trim();
      if (url === "" || url === "https://") editor.chain().focus().extendMarkRange("link").unsetLink().run();
      else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } else if (prompt.kind === "image") {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "figureImage",
          attrs: {
            src: prompt.url,
            alt: prompt.alt.trim(),
            align: "center",
            caption: prompt.caption.trim(),
            width: prompt.width,
            height: prompt.height,
          },
        })
        .run();
    } else {
      editor.chain().focus().updateAttributes("figureImage", { alt: prompt.alt.trim(), caption: prompt.caption.trim() }).run();
    }
    setPrompt(null);
  };

  return (
    <div className="rte-bar">
      {!lite && (
        <>
          <Btn title="Kop" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 /></Btn>
          <Btn title="Subkop" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 /></Btn>
        </>
      )}
      <Btn title="Vet" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold /></Btn>
      <Btn title="Cursief" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic /></Btn>
      <Btn title="Opsomming" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List /></Btn>
      <Btn title="Genummerd" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered /></Btn>
      <Btn title="Link" active={editor.isActive("link")} onClick={openLink}><LinkIcon /></Btn>
      {!lite && (
        <>
          <Btn title="Citaat" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote /></Btn>
          <Btn title={busy ? "Uploaden…" : "Afbeelding"} disabled={busy} onClick={() => fileRef.current?.click()}><ImagePlus /></Btn>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        </>
      )}
      <span className="rte-sep" />
      <Btn title="Ongedaan maken" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo /></Btn>
      <Btn title="Opnieuw" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo /></Btn>

      {!lite && imgSelected && (
        <div className="rte-ctx">
          <span className="rte-ctx-lbl">Afbeelding:</span>
          <Btn title="Links (tekst eromheen)" active={align === "left"} onClick={() => setAlign("left")}><AlignLeft /></Btn>
          <Btn title="Midden" active={align === "center"} onClick={() => setAlign("center")}><AlignCenter /></Btn>
          <Btn title="Rechts (tekst eromheen)" active={align === "right"} onClick={() => setAlign("right")}><AlignRight /></Btn>
          <Btn title="Volle breedte" active={align === "full"} onClick={() => setAlign("full")}><Maximize2 /></Btn>
          <Btn title="Bijschrift & omschrijving" onClick={openCaption}><Captions /></Btn>
          <Btn title="Verwijderen" onClick={() => editor.chain().focus().deleteSelection().run()}><Trash2 /></Btn>
        </div>
      )}

      {prompt && (
        <Modal
          title={prompt.kind === "link" ? "Link" : prompt.kind === "image" ? "Afbeelding invoegen" : "Bijschrift & omschrijving"}
          onClose={() => setPrompt(null)}
          footer={
            <>
              <button type="button" className="btn btn-outline" onClick={() => setPrompt(null)}>
                Annuleren
              </button>
              <button type="button" className="btn btn-primary" onClick={applyPrompt}>
                {prompt.kind === "image" ? "Invoegen" : "Toepassen"}
              </button>
            </>
          }
        >
          {prompt.kind === "link" ? (
            <div className="fld" style={{ marginBottom: 0 }}>
              <label htmlFor="rte-link">Link-URL</label>
              <input
                id="rte-link"
                type="text"
                autoFocus
                value={prompt.url}
                onChange={(e) => setPrompt({ ...prompt, url: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyPrompt())}
                placeholder="https://"
              />
              <p className="t-sub" style={{ marginTop: 6 }}>Laat leeg (of “https://”) om de link te verwijderen.</p>
            </div>
          ) : prompt.kind === "image" ? (
            <>
              <div className="fld">
                <img src={prompt.url} alt="" style={{ maxWidth: "100%", borderRadius: "var(--radius-md)", display: "block" }} />
              </div>
              <div className="fld">
                <label htmlFor="rte-alt">Omschrijving (alt-tekst)</label>
                <input
                  id="rte-alt"
                  type="text"
                  autoFocus
                  value={prompt.alt}
                  onChange={(e) => setPrompt({ ...prompt, alt: e.target.value })}
                  placeholder="Wat is er te zien? (voor SEO en schermlezers)"
                />
              </div>
              <div className="fld" style={{ marginBottom: 0 }}>
                <label htmlFor="rte-cap">Bijschrift (optioneel)</label>
                <input
                  id="rte-cap"
                  type="text"
                  value={prompt.caption}
                  onChange={(e) => setPrompt({ ...prompt, caption: e.target.value })}
                  placeholder="Zichtbaar onder de afbeelding"
                />
              </div>
            </>
          ) : (
            <>
              <div className="fld">
                <label htmlFor="rte-alt2">Omschrijving (alt-tekst)</label>
                <input
                  id="rte-alt2"
                  type="text"
                  autoFocus
                  value={prompt.alt}
                  onChange={(e) => setPrompt({ ...prompt, alt: e.target.value })}
                  placeholder="Wat is er te zien? (voor SEO en schermlezers)"
                />
              </div>
              <div className="fld" style={{ marginBottom: 0 }}>
                <label htmlFor="rte-cap2">Bijschrift (optioneel)</label>
                <input
                  id="rte-cap2"
                  type="text"
                  value={prompt.caption}
                  onChange={(e) => setPrompt({ ...prompt, caption: e.target.value })}
                  placeholder="Zichtbaar onder de afbeelding"
                />
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

export function RichTextEditor({
  name,
  label,
  defaultValue,
  help,
  variant = "full",
}: {
  name: string;
  label: string;
  defaultValue: string;
  help?: string;
  variant?: "full" | "lite";
}) {
  const lite = variant === "lite";
  const [html, setHtml] = useState(defaultValue || "");
  const editor = useEditor({
    immediatelyRender: false,
    extensions: lite
      ? [
          StarterKit.configure({ link: false, heading: false }),
          Link.configure({ openOnClick: false, autolink: true }),
        ]
      : [
          StarterKit.configure({ link: false }),
          Link.configure({ openOnClick: false, autolink: true }),
          FigureImage,
        ],
    content: defaultValue || "",
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  return (
    <div className="fld">
      <label>{label}</label>
      <input type="hidden" name={name} value={html} />
      <div className={`rte${lite ? " rte-lite" : ""}`}>
        {editor && (
          <>
            <Toolbar editor={editor} lite={lite} />
            <EditorContent editor={editor} />
          </>
        )}
      </div>
      {help && <p className="t-sub" style={{ marginTop: 6 }}>{help}</p>}
    </div>
  );
}
