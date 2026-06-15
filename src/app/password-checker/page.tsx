import { Metadata } from "next";
import PasswordStrengthChecker from "@/features/password/PasswordStrengthChecker";

export const metadata: Metadata = {
  title: "Password Strength Checker — FormatterHub",
  description:
    "Check how strong your password is. Get a score, entropy estimate, crack time, and detailed analysis — all client-side, nothing leaves your browser.",
};

export default function PasswordCheckerPage() {
  return <PasswordStrengthChecker />;
}
