import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cookieloze anon-client voor het lezen van publieke content.
 *
 * De gewone server-client (`lib/supabase/server.ts`) leest request-cookies voor de
 * sessie, en `cookies()` is een dynamic API: elke pagina die hem aanraakt kan niet
 * meer geprerenderd worden. Publieke content heeft die sessie niet nodig — RLS geeft
 * anon alleen de `status='live'`-rijen — dus lezen we die zonder cookies. Daardoor
 * blijven de marketingpagina's statisch/ISR en doen `revalidate` en
 * `generateStaticParams` weer wat ze beloven.
 *
 * Gebruik dit uitsluitend voor publieke leesacties. Alles wat de ingelogde gebruiker
 * nodig heeft (admin, server actions) blijft op `lib/supabase/server.ts`.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
