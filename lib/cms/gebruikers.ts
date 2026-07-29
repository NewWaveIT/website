import "server-only";

import { createAdminClient, hasServiceRole } from "@/lib/supabase/admin";

export interface Gebruiker {
  id: string;
  email: string;
  naam: string;
  laatsteLogin: string | null;
  aangemaakt: string;
  actief: boolean;
}

/** Of gebruikersbeheer beschikbaar is (service_role ingesteld). */
export function gebruikersBeschikbaar(): boolean {
  return hasServiceRole();
}

function isGeband(bannedUntil?: string | null): boolean {
  if (!bannedUntil) return false;
  const t = new Date(bannedUntil).getTime();
  return Number.isFinite(t) && t > Date.now();
}

/** Alle CMS-gebruikers via de Supabase Auth Admin API, gesorteerd op naam. */
export async function listGebruikers(): Promise<Gebruiker[]> {
  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (error) throw error;
  return data.users
    .map((u) => {
      const bannedUntil = (u as unknown as { banned_until?: string | null }).banned_until;
      return {
        id: u.id,
        email: u.email ?? "",
        naam: (u.user_metadata?.naam as string) || (u.email?.split("@")[0] ?? ""),
        laatsteLogin: u.last_sign_in_at ?? null,
        aangemaakt: u.created_at,
        actief: !isGeband(bannedUntil),
      } satisfies Gebruiker;
    })
    .sort((a, b) => a.naam.localeCompare(b.naam, "nl"));
}
