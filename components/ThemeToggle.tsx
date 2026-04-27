"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      style={{
        fontFamily: "ZT Yaglo, sans-serif",
        fontSize: "0.65rem",
        letterSpacing: "0.18em",
        color: "var(--c-nav-text)",
        background: "transparent",
        border: "1px solid var(--c-nav-text)",
        borderRadius: "999px",
        padding: "0.22rem 0.7rem",
        cursor: "pointer",
        textTransform: "uppercase",
        opacity: 0.55,
        transition: "opacity 0.2s",
        lineHeight: 1.4,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
    >
      <span className="theme-label-classic">Wine</span>
      <span className="theme-label-wine">Classic</span>
    </button>
  );
}
