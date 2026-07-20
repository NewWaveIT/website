"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { uploadImage } from "@/app/admin/content/actions";

/** Gecontroleerd upload-veld (preview + bestand kiezen + pad). Herbruikbaar, ook genest. */
export function ImageControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
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
    else if (res.url) onChange(res.url);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
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
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/assets/… of geüploade URL"
      />
      <div style={{ marginTop: 8, display: "flex", gap: 10, alignItems: "center" }}>
        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} disabled={busy} style={{ fontSize: "var(--text-xs)" }} />
        {busy && <span className="t-sub">Uploaden…</span>}
      </div>
      {err && (
        <p className="t-sub" style={{ marginTop: 6, color: "var(--danger-500)" }}>
          {err}
        </p>
      )}
    </>
  );
}

/** Top-level afbeeldingsveld met eigen label + verborgen input voor formulierverzending. */
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
  return (
    <div className="fld">
      <label>{label}</label>
      <input type="hidden" name={name} value={url} />
      <ImageControl value={url} onChange={setUrl} />
    </div>
  );
}
