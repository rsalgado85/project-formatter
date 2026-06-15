import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Coffee, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Donate — FormatterHub",
  description:
    "Support FormatterHub — help keep these developer tools free, fast, and privacy-friendly forever.",
};

const PRESET_AMOUNTS = [3, 5, 10, 20];

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Home
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-red-500/10">
              <Heart className="size-8 text-red-500 fill-red-500" />
            </div>
            <h1 className="text-2xl font-bold font-heading tracking-tight">
              Support FormatterHub
            </h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Help keep these tools free, fast, and ad-free for developers everywhere. Every donation makes a difference.
            </p>
          </div>

          <div className="space-y-4 rounded-xl border bg-card p-6 text-left">
            <p className="text-sm font-medium">Choose an amount</p>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_AMOUNTS.map((amt) => (
                <a
                  key={amt}
                  href={`https://paypal.me/rsalgado85/${amt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-lg border border-border px-3 py-3 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  ${amt}
                </a>
              ))}
            </div>
            <a
              href="https://paypal.me/rsalgado85"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Coffee className="size-4" />
              Donate via PayPal
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            You&apos;ll be redirected to PayPal to complete your donation.
          </p>
        </div>
      </main>
    </div>
  );
}
