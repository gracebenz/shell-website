"use client";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HeroAnchorNav() {
  return (
    <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
      <button
        onClick={() => scrollTo("events")}
        className="see-all"
        style={{ margin: 0, color: "var(--color-dim)" }}
      >
        Events
      </button>
      <span style={{ color: "var(--color-gold)", opacity: 0.4, fontSize: "var(--text-xs)" }}>✦</span>
      <button
        onClick={() => scrollTo("blog")}
        className="see-all"
        style={{ margin: 0, color: "var(--color-dim)" }}
      >
        Journal
      </button>
    </div>
  );
}
