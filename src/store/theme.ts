import { create } from "zustand";

type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  _hydrated: boolean;
  _hydrate: () => void;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("formatterhub-theme");
  if (stored === "dark" || stored === "light") return stored;
  return null;
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "dark",
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    localStorage.setItem("formatterhub-theme", next);
    applyTheme(next);
    set({ theme: next });
  },
  setTheme: (theme: Theme) => {
    localStorage.setItem("formatterhub-theme", theme);
    applyTheme(theme);
    set({ theme });
  },
  _hydrated: false,
  _hydrate: () => {
    if (get()._hydrated) return;
    const stored = getStoredTheme();
    const theme = stored ?? getSystemTheme();
    applyTheme(theme);
    set({ theme, _hydrated: true });
  },
}));
