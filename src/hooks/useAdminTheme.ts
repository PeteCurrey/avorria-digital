'use client';
import { useState, useEffect, useCallback } from "react";

type AdminTheme = "dark" | "light";

const STORAGE_KEY = "avorria-admin-theme";

export function useAdminTheme() {
  const [theme, setThemeState] = useState<AdminTheme>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as AdminTheme) || "dark";
    } catch {
      return "dark";
    }
  });

  const setTheme = useCallback((t: AdminTheme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // No DOM side-effects here — the component applies the class
  return { theme, setTheme, toggle, isDark: theme === "dark" };
}

