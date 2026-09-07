import type { Metadata } from "next";
import { RichtingHub } from "@/components/diensten/richting-hub";

export const metadata: Metadata = {
  title: "AI — van AI Agent in a Day tot de Opportunity Scan",
  description:
    "Twee diensten om met AI te starten: de AI Agent in a Day-workshop en de AI Opportunity Scan om de grootste kansen te prioriteren.",
  alternates: { canonical: "/diensten/ai" },
};

export const revalidate = 300;

export default function AiHubPage() {
  return <RichtingHub richting="ai" />;
}
