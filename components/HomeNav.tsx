"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ztBold = {
  fontFamily: "ZT Yaglo, sans-serif",
  fontWeight: 400,
  fontSize: "0.9rem",
  color: "#e9c3b9",
  WebkitTextStroke: "0.8px #e9c3b9",
} as React.CSSProperties;

export default function HomeNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      setVisible(window.scrollY >= window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 md:px-16 py-4 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        backgroundColor: "#2d0719",
      }}
    >
      <nav className="flex items-center gap-6">
        <Link href="#events" className="tracking-widest uppercase inline-block" style={ztBold}>
          Events
        </Link>
        <Link
          href="#hero"
          style={{ fontFamily: "Giomori, Georgia, serif", fontStyle: "italic", color: "#f0494e", letterSpacing: "0.05em" }}
          className="text-xl md:text-2xl uppercase"
        >
          A Glass or Tu
        </Link>
        <Link href="#blog" className="tracking-widest uppercase inline-block" style={ztBold}>
          Blog
        </Link>
      </nav>
    </header>
  );
}
