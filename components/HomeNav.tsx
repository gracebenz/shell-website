"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY >= window.innerHeight * 0.6);
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <header className={`site-nav${visible ? "" : " hidden"}`}>
      <Link href="/#events" className="nav-link">Events</Link>
      <Link href="/#hero" className="nav-brand">A Glass or Tu</Link>
      <Link href="/#blog" className="nav-link">Journal</Link>
    </header>
  );
}
