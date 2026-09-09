import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * De huidige ingelogde gebruiker, of null. Veilig: verifieert bij de
 * auth-server in plaats van een cookie te vertrouwen.
 *
 * Zonder Supabase-config meteen null. Dat is dezelfde check als in
 * lib/supabase/middleware.ts, en hij staat hier bewust vóór `createClient`:
 * die gooit zonder url en key, en die fout sloeg door tot een generieke
 * "Er ging iets mis"-pagina in plaats van de login.
 *
 * Wat hier níét mag staan is een try/catch om het geheel. Next gebruikt
 * exceptions als controlestroom — `cookies()` breekt tijdens het prerenderen
 * expres af — en die opvangen laat een adminpagina als uitgelogde, statische
 * pagina renderen met status 200 in plaats van door te sturen. Vang dus alleen
 * op wat je kent.
 */
export async function getCurrentUser() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

/** Vereist een ingelogde gebruiker; stuurt anders naar de login. */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}
