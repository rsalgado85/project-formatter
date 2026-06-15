"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sun, Moon, Menu, X, Coffee, Globe } from "lucide-react";
import { useThemeStore } from "@/store/theme";
import { useLanguageStore } from "@/store/language";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "JSON Formatter", href: "/json-formatter" },
  { label: "XML Formatter", href: "/xml-formatter" },
  { label: "YAML Converter", href: "/yaml-converter" },
  { label: "Base64", href: "/base64" },
  { label: "Base64 → Img", href: "/base64-to-image" },
  { label: "Password Tools", href: "/password-tools" },
  { label: "About", href: "/about", esLabel: "Acerca de" },
];

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const lang = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const t = translations[lang];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border",
        "bg-background/70 backdrop-blur-xl backdrop-saturate-150",
        "supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Code2 className="h-4 w-4" />
          </div>
          <span className="font-heading text-base font-semibold tracking-tight">
            FormatterHub
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-muted/50"
            >
              {lang === "es" && "esLabel" in link ? link.esLabel : link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Language toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setLanguage(lang === "en" ? "es" : "en")}
            aria-label={lang === "en" ? "Cambiar a español" : "Switch to English"}
          >
            <Globe className="h-4 w-4" />
          </Button>

          {/* Donate button (desktop) */}
          <Link href="/donate" className="hidden sm:inline-flex">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Coffee className="h-3.5 w-3.5" />
              {t.header.donate}
            </Button>
          </Link>

          {/* Hamburger (mobile) */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <nav className="flex flex-col p-3 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-muted/50"
                >
                  {lang === "es" && "esLabel" in link ? link.esLabel : link.label}
                </Link>
              ))}
              <Link
                href="/donate"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Coffee className="h-3.5 w-3.5" />
                {t.header.donate}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
