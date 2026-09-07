import "server-only";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

/**
 * Server-side rate-limit per IP + actie, afgedwongen in Postgres via de atomische
 * `check_rate_limit`-functie (supabase/migrations/20260907120000_rate-limits.sql) —
 * in-memory tellers werken niet betrouwbaar op serverless (geen gedeeld geheugen
 * tussen invocations). Fail-safe zoals lib/email.ts: bij een DB-fout staat de
 * aanvraag toe, zodat een storing in de rate-limiter zelf nooit een geldige
 * inzending blokkeert.
 */
export async function magDoor(
  actie: string,
  maxPogingen: number,
  vensterSeconden: number,
): Promise<boolean> {
  const forwardedFor = (await headers()).get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "onbekend";

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("check_rate_limit", {
      p_key: `${actie}:${ip}`,
      p_max_attempts: maxPogingen,
      p_window_seconds: vensterSeconden,
    });
    if (error) return true;
    return data === true;
  } catch {
    return true;
  }
}
