"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ theme: "light", resolvedTheme: "light", setTheme: () => {} });

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [resolvedTheme, setResolvedTheme] = useState("light");

  const applyTheme = useCallback((nextTheme) => {
    const resolved = nextTheme === "system" ? systemTheme() : nextTheme;
    document.documentElement.setAttribute("data-theme", resolved);
    document.documentElement.style.colorScheme = resolved;
    setResolvedTheme(resolved);
  }, []);

  useEffect(() => {
    let stored = "light";
    try { stored = localStorage.getItem("theme") || "light"; } catch {}
    // Theme storage is a browser-only external source and is read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(stored);
    applyTheme(stored);
  }, [applyTheme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => { if (theme === "system") applyTheme("system"); };
    media.addEventListener("change", handleSystemChange);
    return () => media.removeEventListener("change", handleSystemChange);
  }, [applyTheme, theme]);

  const setTheme = useCallback((nextTheme) => {
    const value = typeof nextTheme === "function" ? nextTheme(theme) : nextTheme;
    setThemeState(value);
    try { localStorage.setItem("theme", value); } catch {}
    applyTheme(value);
  }, [applyTheme, theme]);

  const context = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);
  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
