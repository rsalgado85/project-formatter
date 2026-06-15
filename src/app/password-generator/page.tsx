import type { Metadata } from "next";
import PasswordGenerator from "@/features/password/PasswordGenerator";
import { ToolPageHeader, ToolPageDescription } from "@/components/ToolPageHeader";

export const metadata: Metadata = {
  title: "Password Generator — FormatterHub",
  description:
    "Generate strong, cryptographically secure passwords. Customize length and character types. All generation happens locally in your browser.",
};

export default function PasswordGeneratorPage() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <ToolPageHeader toolKey="passwordGen" />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ToolPageDescription toolKey="passwordGen" />
        <PasswordGenerator />
      </main>
    </div>
  );
}
