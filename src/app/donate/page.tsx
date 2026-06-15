"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Coffee, ArrowLeft } from "lucide-react";
import { useLanguageStore } from "@/store/language";
import { translations } from "@/lib/translations";

const PRESETS = [3, 5, 10];

export default function DonatePage() {
  const lang = useLanguageStore((s) => s.language);
  const t = translations[lang];
  const [selectedPreset, setSelectedPreset] = useState<number | null>(5);
  const [customAmount, setCustomAmount] = useState("20");
  const [isCustomActive, setIsCustomActive] = useState(false);

  const amount = isCustomActive
    ? Number(customAmount) || 0
    : selectedPreset ?? 0;

  const handleDonate = () => {
    if (amount <= 0) return;
    window.open(
      `https://paypal.me/rsalgado85/${amount}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            {lang === "en" ? "Home" : "Inicio"}
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-red-500/10">
              <Heart className="size-8 text-red-500 fill-red-500" />
            </div>
            <h1 className="text-2xl font-bold font-heading tracking-tight">
              {t.donate.title}
            </h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              {t.donate.desc}
            </p>
          </div>

          {/* Amount selection */}
          <div className="space-y-6 rounded-xl border bg-card p-6 text-left">
            <p className="text-sm font-medium">{t.donate.chooseAmount}</p>

            {/* Preset buttons + editable $20 */}
            <div className="grid grid-cols-4 gap-2">
              {PRESETS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelectedPreset(amt);
                    setIsCustomActive(false);
                  }}
                  className={`flex items-center justify-center rounded-lg border px-3 py-3 text-sm font-medium transition-all ${
                    selectedPreset === amt && !isCustomActive
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border hover:border-primary/40 hover:bg-muted"
                  }`}
                >
                  ${amt}
                </button>
              ))}

              {/* Editable $20 field */}
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setIsCustomActive(true);
                  }}
                  onFocus={() => setIsCustomActive(true)}
                  className={`w-full rounded-lg border bg-transparent py-3 pl-7 pr-1.5 text-sm font-medium outline-none transition-all text-center ${
                    isCustomActive
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/40"
                  }`}
                />
              </div>
            </div>

            {/* Donate button */}
            <button
              onClick={handleDonate}
              disabled={amount <= 0}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Coffee className="size-4" />
              {t.donate.paypalButton}{amount > 0 ? ` — $${amount}` : ""}
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            {t.donate.redirectNote}
          </p>
        </div>
      </main>
    </div>
  );
}
