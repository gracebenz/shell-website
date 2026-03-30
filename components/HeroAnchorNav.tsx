"use client";

const linkStyle = {
  fontFamily: "ZT Yaglo, sans-serif",
  fontWeight: 400,
  fontSize: "1.5rem",
  color: "#e9c3b9",
  letterSpacing: "0.20em",
  textTransform: "uppercase",
  textShadow: "0 0 2px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.85), 0 4px 20px rgba(0,0,0,0.60)",
  WebkitTextStroke: "0.8px #e9c3b9",
} as React.CSSProperties;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HeroAnchorNav() {
  return (
    <nav className="flex gap-8 tracking-widest uppercase">
      <button onClick={() => scrollTo("events")} className="inline-block transition-all hover:scale-110 cursor-pointer bg-transparent border-0 p-0" style={linkStyle}>
        Events
      </button>
      <button onClick={() => scrollTo("blog")} className="inline-block transition-all hover:scale-110 cursor-pointer bg-transparent border-0 p-0" style={linkStyle}>
        Blog
      </button>
    </nav>
  );
}
