import { NextResponse } from "next/server";

// Publiek diagnose-endpoint: laat zien welke build er live draait. Handig om te
// verifiëren of een Vercel-deploy daadwerkelijk de laatste code serveert.
//
// Alleen de SHA en de omgeving. Het commitbericht en de branchnaam stonden hier
// ook, en die zijn wél vertellend: "Fix: lek in adminlogin" op een publieke URL
// is een aanwijzing die je niet weggeeft. De SHA is genoeg om een deploy te
// herkennen; wie de repo mag zien, zoekt het bericht daar op.
//
// Bewust niet dynamisch: dit zijn build-eigenschappen. De waarde hoort bij de
// build die hem serveert, dus meegeprerenderd is precies goed.

export function GET() {
  return NextResponse.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? "local",
    env: process.env.VERCEL_ENV ?? "local",
    builtFor: "cms-diagnose",
  });
}
