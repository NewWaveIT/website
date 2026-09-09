import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Heette tot Next 16 "middleware"; de functionaliteit is ongewijzigd, alleen de
 * bestandsnaam en de exportnaam. Ververst de Supabase-sessie vóór elke
 * /admin-request, zodat `requireAdmin()` op een geldige sessie kan rekenen.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
