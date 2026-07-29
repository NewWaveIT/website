import "server-only";

import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

/** True als de service_role-sleutel beschikbaar is (nodig voor gebruikersbeheer). */
export function hasServiceRole(): boolean {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Supabase-client met de service_role-sleutel. Uitsluitend server-side:
 * omzeilt RLS en geeft toegang tot de Auth Admin API (gebruikersbeheer).
 * Vereist SUPABASE_SERVICE_ROLE_KEY als server-env.
 */
export function createAdminClient(): SupabaseClient {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY ontbreekt.");
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
