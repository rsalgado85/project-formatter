import { Metadata } from "next";
import Base64Tool from "@/features/base64/Base64Tool";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder — FormatterHub",
  description:
    "Encode text to Base64 or decode Base64 back to readable text. Free, client-side, no data ever leaves your browser.",
};

export default function Base64Page() {
  return <Base64Tool />;
}
