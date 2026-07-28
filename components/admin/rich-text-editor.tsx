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
  const imgSelected = editor.isActive("figureImage");
  const align = (editor.getAttributes("figureImage").align as string) ?? "center";

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link-URL (leeg = verwijderen):", prev ?? "https://");
    if (url === null) return;
    if (url === "") editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
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
      window.alert(res.error ?? "Uploaden mislukt.");
      return;
    }
    const alt = window.prompt("Omschrijving van de afbeelding (voor SEO/toegankelijkheid):", "") ?? "";
    const caption = window.prompt("Bijschrift (optioneel, leeg = geen):", "") ?? "";
    editor
      .chain()
      .focus()
      .insertContent({
        type: "figureImage",
        attrs: { src: res.url, alt, align: "center", caption, width: res.width ?? null, height: res.height ?? null },
      })
      .run();
  };

  const setAlign = (a: string) => editor.chain().focus().updateAttributes("figureImage", { align: a }).run();
  const editCaption = () => {
    const prev = (editor.getAttributes("figureImage").caption as string) ?? "";
    const caption = window.prompt("Bijschrift (leeg = geen):", prev);
    if (caption === null) return;
    editor.chain().focus().updateAttributes("figureImage", { caption }).run();
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
      <Btn title="Link" active={editor.isActive("link")} onClick={setLink}><LinkIcon /></Btn>
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
          <Btn title="Bijschrift" onClick={editCaption}><Captions /></Btn>
          <Btn title="Verwijderen" onClick={() => editor.chain().focus().deleteSelection().run()}><Trash2 /></Btn>
        </div>
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
