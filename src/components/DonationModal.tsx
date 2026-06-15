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
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [3, 5, 10, 20];

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DonationModal({ open, onOpenChange }: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const amount = isCustom ? Number(customAmount) || 0 : selectedAmount ?? 0;

  function handleDonate() {
    if (amount <= 0) return;
    window.open(
      `https://paypal.me/formatterhub/${amount}`,
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
            Support FormatterHub
          </DialogTitle>
          <DialogDescription>
            Choose an amount to help keep these tools free and ad-free for
            developers everywhere.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Preset amounts */}
          <div className="grid grid-cols-4 gap-2">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setSelectedAmount(amt);
                  setIsCustom(false);
                }}
                className={cn(
                  "flex items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                  selectedAmount === amt && !isCustom
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/40 hover:bg-muted"
                )}
              >
                ${amt}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <input
              type="number"
              min="1"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setIsCustom(true);
              }}
              onFocus={() => setIsCustom(true)}
              className={cn(
                "w-full rounded-lg border bg-transparent py-2.5 pl-7 pr-3 text-sm outline-none transition-colors",
                "border-border placeholder:text-muted-foreground",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
                isCustom && "border-primary"
              )}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleDonate} disabled={amount <= 0}>
            <Coffee className="h-4 w-4" />
            Donate ${amount > 0 ? amount : "—"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
