import type { Metadata } from "next";
import PasswordStrengthChecker from "@/features/password/PasswordStrengthChecker";
import { ToolPageHeader, ToolPageDescription } from "@/components/ToolPageHeader";

export const metadata: Metadata = {
  title: "Password Strength Checker — FormatterHub",
  description:
    "Check how strong your password is. Get a score, entropy estimate, crack time, and detailed analysis — all client-side, nothing leaves your browser.",
};

export default function PasswordCheckerPage() {
  return (
    <div className="flex flex-col min-h-full bg-background">
      <ToolPageHeader toolKey="passwordCheck" />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ToolPageDescription toolKey="passwordCheck" />
        <PasswordStrengthChecker />
      </main>
    </div>
  );
}
