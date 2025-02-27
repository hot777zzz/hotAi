"use client";

import { useTheme } from "@/lib/hooks/use-theme";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    // 应用主题色
    document.documentElement.style.setProperty("--primary", theme.primary);

    // 应用明暗模式
    if (theme.mode === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme.mode === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
}
