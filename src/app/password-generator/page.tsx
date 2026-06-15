import type { Metadata } from "next";
import PasswordGenerator from "@/features/password/PasswordGenerator";

export const metadata: Metadata = {
  title: "Password Generator — FormatterHub",
  description:
    "Generate strong, cryptographically secure passwords. Customize length and character types. All generation happens locally in your browser.",
};

export default function PasswordGeneratorPage() {
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
            Password Generator
          </h1>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-muted-foreground">
          Generate strong, cryptographically secure passwords with custom length
          and character types.
        </p>
        <PasswordGenerator />
      </main>
    </div>
  );
}
