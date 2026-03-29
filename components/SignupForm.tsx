"use client";

import { useActionState, useEffect, useState } from "react";
import { signupForEvent, type SignupState } from "@/app/actions/signup";

const initial: SignupState = { status: "idle", message: "" };

function storageKey(eventId: string) {
  return `signed-up:${eventId}`;
}

export default function SignupForm({ eventId }: { eventId: string }) {
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const action = signupForEvent.bind(null, eventId);
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (localStorage.getItem(storageKey(eventId))) {
      setAlreadySignedUp(true);
    }
  }, [eventId]);

  useEffect(() => {
    if (state.status === "success") {
      localStorage.setItem(storageKey(eventId), "1");
    }
  }, [state.status, eventId]);

  if (alreadySignedUp) {
    return (
      <p className="text-ink/60 text-sm">You're already signed up for this one.</p>
    );
  }

  if (state.status === "success") {
    return (
      <p className="text-heading font-serif text-lg italic">{state.message}</p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-ink/70">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Grace"
          className="rounded-lg border border-rim/60 bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-accent">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-lg bg-heading px-6 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-80 disabled:opacity-40"
      >
        {pending ? "Signing up…" : "Sign me up"}
      </button>
    </form>
  );
}
