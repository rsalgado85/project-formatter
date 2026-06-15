"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { calculatePasswordStrength } from "@/lib/tools";
import { Eye, EyeOff, Check, X } from "lucide-react";

const SCORE_COLORS: Record<string, { bar: string; text: string; bg: string }> = {
  "Very Weak": { bar: "bg-red-500", text: "text-red-600 dark:text-red-400", bg: "bg-red-500/10" },
  "Weak": { bar: "bg-orange-500", text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500/10" },
  "Fair": { bar: "bg-yellow-500", text: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500/10" },
  "Good": { bar: "bg-lime-500", text: "text-lime-600 dark:text-lime-400", bg: "bg-lime-500/10" },
  "Strong": { bar: "bg-green-500", text: "text-green-600 dark:text-green-400", bg: "bg-green-500/10" },
  "Very Strong": { bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
};

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const strength = useMemo(() => {
    if (!password) return null;
    return calculatePasswordStrength(password);
  }, [password]);

  const colorInfo = strength ? SCORE_COLORS[strength.label] || SCORE_COLORS["Very Weak"] : null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight font-heading">
          Password Strength Checker
        </h1>
        <p className="text-sm text-muted-foreground">
          Check how strong your password is. Everything is analyzed locally —
          your password never leaves your browser.
        </p>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label htmlFor="password-input" className="text-sm font-medium">
          Enter a password to analyze
        </label>
        <div className="relative">
          <input
            id="password-input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type or paste a password..."
            className={cn(
              "w-full rounded-lg border bg-background px-4 py-3 pr-12 font-mono text-sm",
              "placeholder:text-muted-foreground/60",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
              "transition-shadow"
            )}
            autoComplete="off"
            spellCheck={false}
            aria-label="Password to analyze"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          We never store or transmit your password. All analysis is client-side only.
        </p>
      </div>

      {/* Results */}
      {strength && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Score + Progress Bar */}
          <div className="space-y-3 p-6 rounded-lg border bg-card">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Strength score</p>
                <p className="text-3xl font-bold tabular-nums font-mono">
                  {strength.score}
                  <span className="text-lg text-muted-foreground">/100</span>
                </p>
              </div>
              {colorInfo && (
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                    colorInfo.bg,
                    colorInfo.text
                  )}
                >
                  {strength.label}
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500 ease-out", colorInfo?.bar)}
                style={{ width: `${strength.score}%` }}
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">Entropy</p>
                <p className="text-lg font-semibold tabular-nums font-mono">
                  {strength.entropy.toLocaleString()}
                  <span className="text-xs text-muted-foreground ml-0.5">bits</span>
                </p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">Est. crack time</p>
                <p className="text-lg font-semibold tabular-nums">
                  {strength.crackTime}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Checks */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Detailed checks</h3>
            <div className="rounded-lg border divide-y">
              {strength.checks.map((check, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-sm",
                    check.passed
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <span>{check.label}</span>
                  {check.passed ? (
                    <Check className="size-4 text-green-500 shrink-0" />
                  ) : (
                    <X className="size-4 text-red-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!strength && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 rounded-lg border border-dashed">
          <div className="rounded-full bg-muted p-3">
            <Eye className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Enter a password above to see its strength analysis
          </p>
          <p className="text-xs text-muted-foreground/60">
            Score, entropy, crack time, and detailed checks will appear here
          </p>
        </div>
      )}
    </div>
  );
}
