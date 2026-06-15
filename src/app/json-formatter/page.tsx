import type { Metadata } from "next";
import JsonFormatter from "@/features/json/JsonFormatter";
import { ToolPageHeader, ToolPageDescription } from "@/components/ToolPageHeader";

export const metadata: Metadata = {
  title: "JSON Formatter — FormatterHub",
  description:
    "Pretty print, minify, validate, and download JSON. Free online JSON formatter with syntax highlighting.",
};

export default function JsonFormatterPage() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <ToolPageHeader toolKey="json" />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ToolPageDescription toolKey="json" />
        <JsonFormatter />
      </main>
    </div>
  );
}
