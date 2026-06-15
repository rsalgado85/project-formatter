import type { Metadata } from "next";
import YamlConverter from "@/features/yaml/YamlConverter";
import { ToolPageHeader, ToolPageDescription } from "@/components/ToolPageHeader";

export const metadata: Metadata = {
  title: "YAML Converter — FormatterHub",
  description:
    "Convert between YAML and JSON formats. Free online YAML to JSON and JSON to YAML converter.",
};

export default function YamlConverterPage() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <ToolPageHeader toolKey="yaml" />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ToolPageDescription toolKey="yaml" />
        <YamlConverter />
      </main>
    </div>
  );
}
