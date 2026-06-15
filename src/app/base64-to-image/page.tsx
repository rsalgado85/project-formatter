import type { Metadata } from "next";
import Base64ToImage from "@/features/base64/Base64ToImage";

export const metadata: Metadata = {
  title: "Base64 to Image — FormatterHub",
  description:
    "Decode Base64 strings back into images. Supports PNG, JPEG, GIF, WebP and SVG. Free, client-side, no data upload.",
};

export default function Base64ToImagePage() {
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
            Base64 to Image
          </h1>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-muted-foreground">
          Decode Base64 strings back into visible images. Supports PNG,
          JPEG, GIF, WebP, and SVG formats. All processing happens in your browser.
        </p>
        <Base64ToImage />
      </main>
    </div>
  );
}
