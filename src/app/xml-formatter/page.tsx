import type { Metadata } from "next";
import XmlFormatter from "@/features/xml/XmlFormatter";
import { ToolPageHeader, ToolPageDescription } from "@/components/ToolPageHeader";

export const metadata: Metadata = {
  title: "XML Formatter — FormatterHub",
  description:
    "Pretty print, minify, validate, and download XML. Free online XML formatter with syntax highlighting.",
};

export default function XmlFormatterPage() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <ToolPageHeader toolKey="xml" />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ToolPageDescription toolKey="xml" />
        <XmlFormatter />
      </main>
    </div>
  );
}
