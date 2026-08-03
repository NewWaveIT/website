"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { login, type LoginState } from "./actions";

const initial: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? "Inloggen…" : "Inloggen"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initial);
  return (
    <div className="cms-login">
      <div className="box">
        <Image
          src="/assets/logos/logo-horizontal-espresso.png"
          alt="The New Wave IT"
          width={180}
          height={30}
          style={{ height: 30, width: "auto" }}
        />
        <h1>CMS-login</h1>
        <p>Log in om content en inzendingen te beheren.</p>
        {state.error && <div className="err">{state.error}</div>}
        <form action={formAction}>
          <div className="fld">
            <label htmlFor="email">E-mailadres</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="fld">
            <label htmlFor="password">Wachtwoord</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
