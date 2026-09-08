import type { Metadata } from "next";
import { RichtingHub } from "@/components/diensten/richting-hub";

export const metadata: Metadata = {
  title: "Strategie — bepaal je koers",
  description:
    "Twee diensten om koers te bepalen: AI-strategie voor de directie en IT-strategie op low-code en AI voor de CIO.",
  alternates: { canonical: "/diensten/strategie" },
};

export const revalidate = 300;

export default function StrategieHubPage() {
  return <RichtingHub richting="strategie" />;
}
