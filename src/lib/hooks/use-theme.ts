"use client";

import { useEffect, useState } from "react";

type Theme = {
  primary: string;
  mode: "light" | "dark" | "system";
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved
        ? JSON.parse(saved)
        : { primary: "346.8 77.2% 49.8%", mode: "system" };
    }
    return { primary: "346.8 77.2% 49.8%", mode: "system" };
  });

  useEffect(() => {
    // 应用主题色
    document.documentElement.style.setProperty("--primary", theme.primary);

    // 应用明暗模式
    const setMode = (mode: "light" | "dark") => {
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    if (theme.mode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setMode(mediaQuery.matches ? "dark" : "light");

      const handler = (e: MediaQueryListEvent) =>
        setMode(e.matches ? "dark" : "light");
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      setMode(theme.mode);
    }
  }, [theme]);

  const updateTheme = (newTheme: Partial<Theme>) => {
    const updated = { ...theme, ...newTheme };
    setTheme(updated);
    localStorage.setItem("theme", JSON.stringify(updated));
  };

  return { theme, updateTheme };
}
