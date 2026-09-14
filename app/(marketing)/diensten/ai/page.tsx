import { cacheLife } from "next/cache";
import { RichtingHub, richtingMetadata } from "@/components/diensten/richting-hub";

export function generateMetadata() {
  return richtingMetadata("ai");
}

export default async function AiHubPage() {
  "use cache";
  cacheLife("content");

  return <RichtingHub richting="ai" />;
}
