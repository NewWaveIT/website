"use client";

import { FoutInhoud } from "@/components/fout/fout-inhoud";

/** Fout-vangnet binnen de marketinggroep: de layout levert de schil al. */
export default function Error(props: { error: Error & { digest?: string }; reset: () => void }) {
  return <FoutInhoud {...props} />;
}
