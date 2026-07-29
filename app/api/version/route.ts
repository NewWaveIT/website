import { NextResponse } from "next/server";

// Publiek diagnose-endpoint: laat zien welke commit/branch er live draait.
// Geen geheimen — de commit-SHA is niet gevoelig. Handig om te verifiëren of
// een Vercel-deploy daadwerkelijk de laatste code serveert.
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? "local",
    ref: process.env.VERCEL_GIT_COMMIT_REF ?? null,
    message: process.env.VERCEL_GIT_COMMIT_MESSAGE ?? null,
    env: process.env.VERCEL_ENV ?? "local",
    builtFor: "cms-diagnose",
  });
}
