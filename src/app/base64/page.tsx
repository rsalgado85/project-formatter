import type { Metadata } from "next";
import Base64Tool from "@/features/base64/Base64Tool";
import { ToolPageHeader, ToolPageDescription } from "@/components/ToolPageHeader";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder — FormatterHub",
  description:
    "Encode text to Base64 or decode Base64 back to readable text. Free, client-side, no data ever leaves your browser.",
};

export default function Base64Page() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <ToolPageHeader toolKey="base64" />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ToolPageDescription toolKey="base64" />
        <Base64Tool />
      </main>
    </div>
  );
}
