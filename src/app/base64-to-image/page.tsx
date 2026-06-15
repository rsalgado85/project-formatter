import type { Metadata } from "next";
import Base64ToImage from "@/features/base64/Base64ToImage";
import { ToolPageHeader, ToolPageDescription } from "@/components/ToolPageHeader";

export const metadata: Metadata = {
  title: "Base64 to Image — FormatterHub",
  description:
    "Decode Base64 strings back into images. Supports PNG, JPEG, GIF, WebP and SVG. Free, client-side, no data upload.",
};

export default function Base64ToImagePage() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <ToolPageHeader toolKey="base64Image" />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ToolPageDescription toolKey="base64Image" />
        <Base64ToImage />
      </main>
    </div>
  );
}
