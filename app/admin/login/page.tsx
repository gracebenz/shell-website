"use client";

import { useActionState, useState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

const initial: LoginState = { status: "idle", message: "" };

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initial);
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 5vw" }}>
      <div style={{ width: "100%", maxWidth: "22rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 className="admin-heading">Admin</h1>
          <div className="admin-rule" />
        </div>

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label className="admin-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                name="password"
                type={visible ? "text" : "password"}
                required
                autoFocus
                placeholder="••••••••"
                className="admin-input"
                style={{ paddingRight: "2.8rem" }}
              />
              <button
                type="button"
                onClick={() => setVisible(v => !v)}
                style={{
                  position: "absolute",
                  right: "0.85rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-dim)",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-dim)")}
                aria-label={visible ? "Hide password" : "Show password"}
              >
                <EyeIcon open={visible} />
              </button>
            </div>
          </div>

          {state.status === "error" && (
            <p style={{ fontFamily: "Klomisk, sans-serif", fontSize: "var(--text-sm)", color: "rgba(220,80,80,0.9)" }}>
              {state.message}
            </p>
          )}

          <button type="submit" disabled={pending} className="admin-btn-primary" style={{ marginTop: "0.5rem" }}>
            {pending ? "…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
