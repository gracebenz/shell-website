"use client";

import { useActionState } from "react";
import { sendMagicLink, type LoginState } from "@/app/actions/auth";

const initial: LoginState = { status: "idle", message: "" };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(sendMagicLink, initial);

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl font-bold text-heading mb-2">Admin</h1>
        <p className="text-sm text-ink/50 mb-8">Enter your email to receive a login link.</p>

        {state.status === "success" ? (
          <p className="text-sm text-heading font-medium">{state.message}</p>
        ) : (
          <form action={formAction} className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="rounded-lg border border-rim/60 bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-accent/40"
            />

            {state.status === "error" && (
              <p className="text-sm text-accent">{state.message}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-heading px-6 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {pending ? "Sending…" : "Send login link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
