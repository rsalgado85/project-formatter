"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useThemeStore((s) => s._hydrate);
  const theme = useThemeStore((s) => s.theme);
  const hydrated = useThemeStore((s) => s._hydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Avoid flash of wrong theme — render nothing until hydrated
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background text-foreground" suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground" suppressHydrationWarning>
      {children}
    </div>
  );
}
