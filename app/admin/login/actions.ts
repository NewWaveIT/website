"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { magDoor } from "@/lib/rate-limit";

export interface LoginState {
  error?: string;
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Vul e-mailadres en wachtwoord in." };

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { error: "Supabase is niet geconfigureerd (ontbrekende env-variabelen)." };
  }

  /* Elke publieke server action krijgt hier een rem (zie CONTRIBUTING); deze
     was de enige zonder. Tien pogingen per tien minuten per IP is ruim voor
     iemand die zich vertypt en niets voor wie wachtwoorden afgaat. */
  if (!(await magDoor("admin-login", 10, 600))) {
    return { error: "Te veel pogingen. Probeer het over een paar minuten opnieuw." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  /* Eén boodschap voor elke reden. Het bericht van Supabase verschilt per geval
     ("Invalid login credentials" tegen "Email not confirmed") en vertelt een
     buitenstaander daarmee of een adres bestaat. */
  if (error) return { error: "Inloggen mislukt. Controleer je e-mailadres en wachtwoord." };

  redirect("/admin");
}
