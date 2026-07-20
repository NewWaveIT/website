"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { uploadImage } from "@/app/admin/content/actions";

export function ImageField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadImage(fd);
    setBusy(false);
    if (res.error) setErr(res.error);
    else if (res.url) setUrl(res.url);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="fld">
      <label htmlFor={`img-${name}`}>{label}</label>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          style={{
            maxHeight: 120,
            maxWidth: "100%",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-default)",
            display: "block",
            marginBottom: 10,
          }}
        />
      ) : null}
      <input
        id={`img-${name}`}
        name={name}
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="/assets/… of geüploade URL"
      />
      <div style={{ marginTop: 8, display: "flex", gap: 10, alignItems: "center" }}>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onFile}
          disabled={busy}
          style={{ fontSize: "var(--text-xs)" }}
        />
        {busy && <span className="t-sub">Uploaden…</span>}
      </div>
      {err && (
        <p className="t-sub" style={{ marginTop: 6, color: "var(--danger-500)" }}>
          {err}
        </p>
      )}
    </div>
  );
}
