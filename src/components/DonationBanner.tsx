"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface DonationBannerProps {
  className?: string;
  onDonateClick?: () => void;
}

export function DonationBanner({ className, onDonateClick }: DonationBannerProps) {
  return (
    <div
      className={cn(
        "border-y border-border bg-muted/30",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-3 text-sm">
        <Heart className="h-4 w-4 text-red-500 fill-red-500 shrink-0" />
        <span className="text-muted-foreground">
          <span className="font-medium text-foreground">Support FormatterHub</span>
          {" — "}
          Help keep these tools free forever
        </span>
        {onDonateClick ? (
          <button
            onClick={onDonateClick}
            className="ml-1 font-medium text-primary hover:underline underline-offset-2"
          >
            Donate
          </button>
        ) : (
          <Link
            href="/donate"
            className="ml-1 font-medium text-primary hover:underline underline-offset-2"
          >
            Donate
          </Link>
        )}
      </div>
    </div>
  );
}
