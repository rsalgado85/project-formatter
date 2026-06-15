"use client";

import { useLanguageStore } from "@/store/language";
import { translations } from "@/lib/translations";
import type { Translations } from "@/lib/translations";

type ToolPageKey = keyof Translations["toolPages"];

interface ToolPageHeaderProps {
  toolKey: ToolPageKey;
}

export function ToolPageHeader({ toolKey }: ToolPageHeaderProps) {
  const lang = useLanguageStore((s) => s.language);
  const t = translations[lang];

  // toolPages entries are either { title, desc } objects or the "home" string
  const toolData = t.toolPages[toolKey];

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; {t.toolPages.home}
        </a>
        <div className="h-4 w-px bg-border" />
        <h1 className="text-sm font-semibold text-foreground">
          {typeof toolData === "object" ? toolData.title : toolData}
        </h1>
      </div>
    </header>
  );
}

export function ToolPageDescription({ toolKey }: ToolPageHeaderProps) {
  const lang = useLanguageStore((s) => s.language);
  const t = translations[lang];
  const toolData = t.toolPages[toolKey];

  if (typeof toolData !== "object" || !("desc" in toolData)) return null;

  return (
    <p className="mb-6 text-sm text-muted-foreground">
      {toolData.desc}
    </p>
  );
}
