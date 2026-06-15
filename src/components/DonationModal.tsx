"use client";

import { useState } from "react";
import { Coffee, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/language";
import { translations } from "@/lib/translations";

const PRESETS = [3, 5, 10];

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DonationModal({ open, onOpenChange }: DonationModalProps) {
  const lang = useLanguageStore((s) => s.language);
  const t = translations[lang];
  const [selectedPreset, setSelectedPreset] = useState<number | null>(5);
  const [customAmount, setCustomAmount] = useState("20");
  const [isCustomActive, setIsCustomActive] = useState(false);

  const amount = isCustomActive
    ? Number(customAmount) || 0
    : selectedPreset ?? 0;

  function handleDonate() {
    if (amount <= 0) return;
    window.open(
      `https://paypal.me/rsalgado85/${amount}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            {t.donate.title}
          </DialogTitle>
          <DialogDescription>{t.donate.desc}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Preset amounts grid */}
          <div className="grid grid-cols-4 gap-2">
            {PRESETS.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setSelectedPreset(amt);
                  setIsCustomActive(false);
                }}
                className={`flex items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
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
                className={`w-full rounded-lg border bg-transparent py-2.5 pl-7 pr-1.5 text-sm font-medium outline-none transition-all text-center ${
                  isCustomActive
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/40"
                }`}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {lang === "en" ? "Cancel" : "Cancelar"}
          </Button>
          <Button onClick={handleDonate} disabled={amount <= 0}>
            <Coffee className="h-4 w-4" />
            {t.donate.paypalButton}
            {amount > 0 ? ` — $${amount}` : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
