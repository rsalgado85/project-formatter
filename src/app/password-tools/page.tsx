import type { Metadata } from "next";
import PasswordGenerator from "@/features/password/PasswordGenerator";
import PasswordStrengthChecker from "@/features/password/PasswordStrengthChecker";
import { ToolPageHeader, ToolPageDescription } from "@/components/ToolPageHeader";

export const metadata: Metadata = {
  title: "Password Tools — FormatterHub",
  description:
    "Generate strong passwords and check their strength. Cryptographically secure generation and detailed analysis — all client-side.",
};

export default function PasswordToolsPage() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <ToolPageHeader toolKey="passwordTools" />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 mb-10">
          <ToolPageDescription toolKey="passwordTools" />
        </div>

        {/* Generator */}
        <section className="mb-16 pb-16 border-b border-border">
          <PasswordGenerator />
        </section>

        {/* Strength Checker */}
        <section className="pb-16">
          <PasswordStrengthChecker />
        </section>
      </main>
    </div>
  );
}
