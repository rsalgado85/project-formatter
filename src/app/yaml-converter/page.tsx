import type { Metadata } from "next";
import YamlConverter from "@/features/yaml/YamlConverter";

export const metadata: Metadata = {
  title: "YAML Converter — FormatterHub",
  description:
    "Convert between YAML and JSON formats. Free online YAML to JSON and JSON to YAML converter.",
};

export default function YamlConverterPage() {
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
            YAML Converter
          </h1>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-muted-foreground">
          Convert between YAML and JSON formats.
        </p>
        <YamlConverter />
      </main>
    </div>
  );
}
