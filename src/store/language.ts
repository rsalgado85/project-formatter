"use client";

import { create } from "zustand";
import type { Language } from "@/lib/translations";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("formatterhub-lang");
  if (stored === "en" || stored === "es") return stored;
  // Detect browser language
  const browserLang = navigator.language.slice(0, 2);
  if (browserLang === "es") return "es";
  return "en";
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  setLanguage: (lang) => {
    localStorage.setItem("formatterhub-lang", lang);
    set({ language: lang });
  },
}));
