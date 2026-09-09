import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * De client waarmee publieke formulieren hun inzending wegschrijven.
 *
 * Waarom niet de anon-client: die sleutel staat in elke browser. Zolang `anon`
 * insert-rechten had op contact_aanvragen, sollicitaties en de cv-bucket, kon
 * iedereen rechtstreeks naar de Supabase-API posten en zo de honeypot, de
 * validatie én `magDoor()` overslaan — die zitten allemaal in de server action.
 * De limieten golden dus alleen voor wie het formulier netjes gebruikte.
 *
 * Alle drie de formulieren schrijven al server-side (ook de bestandsupload),
 * dus `anon` heeft die rechten niet nodig. Ze zijn ingetrokken in
 * supabase/migrations/20260909180000_inzendingen-alleen-via-server.sql, en dit
 * is het enige pad dat overblijft.
 *
 * Deze client omzeilt RLS. Gebruik hem uitsluitend voor de insert van een
 * inzending die de action al heeft gevalideerd — nooit om iets te lezen of om
 * een tabel te raken waar de bezoeker niets te zoeken heeft.
 */
export function inzendingClient() {
  return createAdminClient();
}
