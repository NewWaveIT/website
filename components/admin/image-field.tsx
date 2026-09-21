"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Upload } from "lucide-react";
import type { BeeldSoort } from "@/lib/beeld-eisen";
import { useBeeldUpload } from "./use-beeld-upload";
import { VerborgenWaarde } from "./verborgen-waarde";

/** Gecontroleerd upload-veld (preview + bestand kiezen + pad). Herbruikbaar, ook genest. */
export function ImageControl({
  value,
  onChange,
  soort = "inline",
}: {
  value: string;
  onChange: (v: string) => void;
  /** 'cover' hanteert een hogere ondergrens voor de breedte (zie MIN_BREEDTE). */
  soort?: BeeldSoort;
}) {
  const { bezig: busy, fout: err, melding: waarschuwing, verwerk } = useBeeldUpload(soort);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const uit = await verwerk(file);
    if (uit) onChange(uit.url);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="if-voorbeeld" />
      ) : null}
      <div className="if-knoppen">
        <button
          type="button"
          className="btn btn-outline"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
        >
          <Upload /> {value ? "Vervang afbeelding" : "Afbeelding uploaden"}
        </button>
        {busy && <span className="t-sub">Uploaden…</span>}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onFile}
          className="if-bestand"
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="of plak een pad/URL"
        className="if-pad"
      />
      {err && <p className="veldhulp veldfout">{err}</p>}
      {waarschuwing && <p className="veldhulp veldwaarschuwing">{waarschuwing}</p>}
    </>
  );
}

/** Top-level afbeeldingsveld met eigen label + verborgen input voor formulierverzending. */
export function ImageField({
  name,
  label,
  defaultValue,
  soort = "cover",
}: {
  name: string;
  label: string;
  defaultValue: string;
  soort?: "cover" | "inline";
}) {
  const [url, setUrl] = useState(defaultValue);
  return (
    <div className="fld">
      <label>{label}</label>
      <VerborgenWaarde name={name} value={url} />
      <ImageControl value={url} onChange={setUrl} soort={soort} />
    </div>
  );
}
