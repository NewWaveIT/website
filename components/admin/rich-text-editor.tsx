"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useState } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";

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

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link-URL (leeg = verwijderen):", prev ?? "https://");
    if (url === null) return;
    if (url === "") editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };
  return (
    <div className="rte-bar">
      <Btn title="Kop" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 /></Btn>
      <Btn title="Subkop" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 /></Btn>
      <Btn title="Vet" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold /></Btn>
      <Btn title="Cursief" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic /></Btn>
      <Btn title="Opsomming" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List /></Btn>
      <Btn title="Genummerd" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered /></Btn>
      <Btn title="Citaat" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote /></Btn>
      <Btn title="Link" active={editor.isActive("link")} onClick={setLink}><LinkIcon /></Btn>
      <span className="rte-sep" />
      <Btn title="Ongedaan maken" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo /></Btn>
      <Btn title="Opnieuw" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo /></Btn>
    </div>
  );
}

export function RichTextEditor({
  name,
  label,
  defaultValue,
  help,
}: {
  name: string;
  label: string;
  defaultValue: string;
  help?: string;
}) {
  const [html, setHtml] = useState(defaultValue || "");
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: defaultValue || "",
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  return (
    <div className="fld">
      <label>{label}</label>
      <input type="hidden" name={name} value={html} />
      <div className="rte">
        {editor && (
          <>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
          </>
        )}
      </div>
      {help && <p className="t-sub" style={{ marginTop: 6 }}>{help}</p>}
    </div>
  );
}
