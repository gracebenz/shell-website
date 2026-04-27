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
      <div className="signup-wrap" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {state.status === "success" && (
          <p style={{ fontFamily: "Giomori, Georgia, serif", fontStyle: "italic", fontSize: "0.9rem", color: "var(--color-gold)" }}>
            {state.message}
          </p>
        )}
        {state.status !== "success" && (
          <p style={{ fontFamily: "Klomisk, sans-serif", fontSize: "0.72rem", color: "var(--color-dim)", letterSpacing: "0.05em" }}>
            You are on the list.
          </p>
        )}
        <button
          onClick={handleUnsign}
          disabled={unsignPending}
          className="back-link"
          style={{ marginBottom: 0 }}
        >
          {unsignPending ? "Removing…" : "Remove my name"}
        </button>
      </div>
    );
  }

  return (
    <div className="signup-wrap">
      <span className="signup-label">Reserve your place</span>
      <form action={formAction}>
        <div className="signup-row">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="signup-input"
          />
          <button
            type="submit"
            disabled={pending}
            className="signup-btn"
          >
            {pending ? "…" : "Sign Up"}
          </button>
        </div>
        {state.status === "error" && (
          <p style={{ fontFamily: "Klomisk, sans-serif", fontSize: "0.65rem", color: "var(--color-gold)", marginTop: "0.75rem", letterSpacing: "0.05em" }}>
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
