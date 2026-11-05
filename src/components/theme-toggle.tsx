"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("algopath-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextDark = stored ? stored === "dark" : prefersDark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    window.localStorage.setItem("algopath-theme", nextDark ? "dark" : "light");
  }

  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      title={`Switch to ${dark ? "light" : "dark"} mode`}
    >
      {dark ? (
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.4A8.3 8.3 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" /></svg>
      )}
    </button>
  );
}
