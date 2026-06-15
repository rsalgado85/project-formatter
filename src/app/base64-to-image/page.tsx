import type { Metadata } from "next";
import Base64ToImage from "@/features/base64/Base64ToImage";

export const metadata: Metadata = {
  title: "Base64 to Image - FormatterHub",
  description:
    "Decode Base64 strings back into images. Supports PNG, JPEG, GIF, WebP and SVG. Free, client-side, no data upload.",
};

export default function Base64ToImagePage() {
  return <Base64ToImage />;
}
