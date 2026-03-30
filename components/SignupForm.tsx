"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { signupForEvent, unsignupFromEvent, type SignupState } from "@/app/actions/signup";

const initial: SignupState = { status: "idle", message: "" };

function storageKey(eventId: string) {
  return `signed-up:${eventId}`;
}

export default function SignupForm({ eventId }: { eventId: string }) {
  const [signedUpName, setSignedUpName] = useState<string | null>(null);
  const action = signupForEvent.bind(null, eventId);
  const [state, formAction, pending] = useActionState(action, initial);
  const [unsignPending, startUnsign] = useTransition();

  useEffect(() => {
    const stored = localStorage.getItem(storageKey(eventId));
    if (stored) setSignedUpName(stored);
  }, [eventId]);

  useEffect(() => {
    if (state.status === "success" && state.name) {
      localStorage.setItem(storageKey(eventId), state.name);
      setSignedUpName(state.name);
    }
  }, [state.status, state.name, eventId]);

  function handleUnsign() {
    if (!signedUpName) return;
    startUnsign(async () => {
      const { error } = await unsignupFromEvent(eventId, signedUpName);
      if (!error) {
        localStorage.removeItem(storageKey(eventId));
        setSignedUpName(null);
      }
    });
  }

  if (signedUpName) {
    return (
      <div className="flex flex-col gap-2">
        {state.status === "success" && (
          <p className="text-sm italic" style={{ fontFamily: "Giomori, Georgia, serif", color: "#2d0719" }}>{state.message}</p>
        )}
        {state.status !== "success" && (
          <p className="text-sm text-ink/60">You're signed up.</p>
        )}
        <button
          onClick={handleUnsign}
          disabled={unsignPending}
          className="self-start text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-rim/40 text-rim/70 hover:border-rim/70 hover:text-ink/70 transition-colors disabled:opacity-40"
        >
          {unsignPending ? "Removing…" : "Never Mind"}
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex items-center">
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="h-9 flex-1 min-w-0 rounded-l-full border border-r-0 border-rim/40 bg-canvas px-4 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink transition-colors"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-9 shrink-0 rounded-r-full bg-ink px-5 text-sm uppercase tracking-wide text-canvas transition-opacity hover:opacity-75 disabled:opacity-40 whitespace-nowrap"
        >
          {pending ? "…" : "Sign Up"}
        </button>
      </div>

      {state.status === "error" && (
        <p className="pl-4 text-xs text-accent">{state.message}</p>
      )}
    </form>
  );
}
