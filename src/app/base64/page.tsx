import type { Metadata } from "next";
import Base64Tool from "@/features/base64/Base64Tool";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder — FormatterHub",
  description:
    "Encode text to Base64 or decode Base64 back to readable text. Free, client-side, no data ever leaves your browser.",
};

export default function Base64Page() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Home
          </a>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-sm font-semibold text-foreground">
            Base64 Encoder / Decoder
          </h1>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-muted-foreground">
          Encode text to Base64 or decode Base64 strings back to readable text.
          All processing happens in your browser.
        </p>
        <Base64Tool />
      </main>
    </div>
  );
}
