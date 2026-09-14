import { cacheLife } from "next/cache";
import { RichtingHub, richtingMetadata } from "@/components/diensten/richting-hub";

export function generateMetadata() {
  return richtingMetadata("mendix");
}

export default async function MendixHubPage() {
  "use cache";
  cacheLife("content");

  return <RichtingHub richting="mendix" />;
}
