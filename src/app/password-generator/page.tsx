import { Metadata } from "next";
import PasswordGenerator from "@/features/password/PasswordGenerator";

export const metadata: Metadata = {
  title: "Password Generator — FormatterHub",
  description:
    "Generate strong, cryptographically secure passwords. Customize length and character types. All generation happens locally in your browser.",
};

export default function PasswordGeneratorPage() {
  return <PasswordGenerator />;
}
