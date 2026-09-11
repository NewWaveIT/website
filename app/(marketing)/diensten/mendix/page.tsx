import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { RichtingHub } from "@/components/diensten/richting-hub";

export const metadata: Metadata = {
  title: "Mendix: van App in a Day tot Fusion Team",
  description:
    "Drie diensten om met Mendix te starten of op te schalen: App in a Day, de Mendix Scale Sessie en de Fusion Team Startsprint.",
  alternates: { canonical: "/diensten/mendix" },
};

export default async function MendixHubPage() {
  "use cache";
  cacheLife("content");

  return <RichtingHub richting="mendix" />;
}
