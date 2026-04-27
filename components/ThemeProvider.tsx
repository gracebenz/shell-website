"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "classic" | "wine";

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "classic",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeCtx);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("classic");

  useEffect(() => {
    const saved = localStorage.getItem("shell-theme") as Theme | null;
    if (saved === "wine") {
      setTheme("wine");
      document.documentElement.setAttribute("data-theme", "wine");
    }
  }, []);

  function toggle() {
    const next: Theme = theme === "classic" ? "wine" : "classic";
    setTheme(next);
    localStorage.setItem("shell-theme", next);
    if (next === "wine") {
      document.documentElement.setAttribute("data-theme", "wine");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}
