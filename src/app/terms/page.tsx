"use client";

import Link from "next/link";
import { ScrollText, ArrowLeft } from "lucide-react";
import { translations } from "@/lib/translations";
import { useLanguageStore } from "@/store/language";

export default function TermsPage() {
  const lang = useLanguageStore((s) => s.language);
  const t = translations[lang].terms;

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* ───── Header ───── */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            {lang === "es" ? "Inicio" : "Home"}
          </Link>
        </div>
      </header>

      {/* ───── Main Content ───── */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-2 mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
              <ScrollText className="size-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">
              {lang === "es" ? "Última actualización" : "Last updated"}:{" "}
              {t.lastUpdated}
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight text-foreground">
            {t.title}
          </h1>
        </div>

        <div className="space-y-10">
          {t.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                {section.heading}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </main>

      {/* ───── Footer ───── */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} FormatterHub.{" "}
            {lang === "es"
              ? "Todos los derechos reservados."
              : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
}
