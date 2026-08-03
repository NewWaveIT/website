"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { seedContent } from "@/app/admin/content/actions";

export function SeedButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function run() {
    if (
      !confirm(
        "De huidige websitecontent als bewerkbare items in het CMS zetten? Bestaande items blijven ongemoeid.",
      )
    ) {
      return;
    }
    setBusy(true);
    setMsg("");
    const res = await seedContent();
    setBusy(false);
    if (res.error) {
      setMsg(`Fout: ${res.error}`);
    } else {
      setMsg(
        res.toegevoegd > 0 ? `${res.toegevoegd} item(s) toegevoegd.` : "Alles stond al in het CMS.",
      );
      router.refresh();
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
      <button type="button" className="btn btn-outline" onClick={run} disabled={busy}>
        {busy ? "Bezig…" : "Importeer bestaande content"}
      </button>
      {msg && (
        <span className="sub" style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          {msg}
        </span>
      )}
    </div>
  );
}
