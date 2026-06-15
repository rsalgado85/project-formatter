"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLanguageStore } from "@/store/language";
import { translations } from "@/lib/translations";

const footerLinks = [
  { label: "GitHub", href: "https://github.com/formatterhub" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  const lang = useLanguageStore((s) => s.language);
  const t = translations[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Branding */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t.footer.madeWith.split("❤️")[0]}
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            {t.footer.madeWith.split("❤️")[1]}
          </p>

          {/* Links */}
          <nav className="flex items-center gap-4">
            {footerLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-4">
                {i > 0 && (
                  <Separator orientation="vertical" className="h-3" />
                )}
                <Link
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            {t.footer.rights.replace("{year}", String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
}
