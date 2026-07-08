"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const THEME_KEY = "promptpin-theme";
const THEME_EVENT = "promptpin-theme-change";

function getThemeSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(THEME_KEY) === "dark";
}

function getServerSnapshot() {
  return false;
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);

  function toggleTheme() {
    const nextIsDark = !isDark;

    window.localStorage.setItem(THEME_KEY, nextIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      aria-pressed={isDark}
      className={`flex h-8 w-14 items-center rounded-full p-1 transition ${
        isDark ? "bg-zinc-950" : "bg-zinc-200"
      }`}
      onClick={toggleTheme}
      type="button"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition ${
          isDark ? "translate-x-6 text-zinc-950" : "translate-x-0 text-amber-600"
        }`}
      >
        {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
}
