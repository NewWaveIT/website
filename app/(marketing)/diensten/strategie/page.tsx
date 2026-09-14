import { cacheLife } from "next/cache";
import { RichtingHub, richtingMetadata } from "@/components/diensten/richting-hub";

export function generateMetadata() {
  return richtingMetadata("strategie");
}

export default async function StrategieHubPage() {
  "use cache";
  cacheLife("content");

  return <RichtingHub richting="strategie" />;
}
