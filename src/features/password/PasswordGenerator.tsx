"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { generatePassword, type PasswordOptions } from "@/lib/tools";
import { Copy, Check, RefreshCw, Eye, EyeOff } from "lucide-react";

type CharType = "uppercase" | "lowercase" | "numbers" | "symbols";

interface ToggleOption {
  key: CharType;
  label: string;
  chars: string;
}

const TOGGLE_OPTIONS: ToggleOption[] = [
  { key: "uppercase", label: "Uppercase (A-Z)", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
  { key: "lowercase", label: "Lowercase (a-z)", chars: "abcdefghijklmnopqrstuvwxyz" },
  { key: "numbers", label: "Numbers (0-9)", chars: "0123456789" },
  { key: "symbols", label: "Symbols (!@#$%^&*)", chars: "!@#$%^&*" },
];

interface StrengthInfo {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

function getStrengthInfo(length: number, activeTypes: number): StrengthInfo {
  if (length >= 20 && activeTypes === 4) {
    return {
      label: "Excellent",
      color: "bg-teal-500",
      bgColor: "bg-teal-500/10",
      textColor: "text-teal-600 dark:text-teal-400",
    };
  }
  if (length >= 16 && activeTypes === 4) {
    return {
      label: "Strong",
      color: "bg-green-500",
      bgColor: "bg-green-500/10",
      textColor: "text-green-600 dark:text-green-400",
    };
  }
  if (length >= 12 && activeTypes >= 3) {
    return {
      label: "Good",
      color: "bg-yellow-500",
      bgColor: "bg-yellow-500/10",
      textColor: "text-yellow-600 dark:text-yellow-400",
    };
  }
  if (length >= 8 && activeTypes >= 2) {
    return {
      label: "Fair",
      color: "bg-orange-500",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-600 dark:text-orange-400",
    };
  }
  return {
    label: "Weak",
    color: "bg-red-500",
    bgColor: "bg-red-500/10",
    textColor: "text-red-600 dark:text-red-400",
  };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState<Record<CharType, boolean>>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [entropy, setEntropy] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  const activeTypes = Object.values(options).filter(Boolean).length;
  const strengthInfo = getStrengthInfo(length, activeTypes);

  useEffect(() => {
    setMounted(true);
  }, []);

  const regenerate = useCallback(() => {
    const opts: PasswordOptions = {
      length,
      uppercase: options.uppercase,
      lowercase: options.lowercase,
      numbers: options.numbers,
      symbols: options.symbols,
    };
    const result = generatePassword(opts);
    setPassword(result.password);
    setEntropy(result.entropy);
  }, [length, options]);

  // Regenerate on mount and on any setting change
  useEffect(() => {
    if (mounted) {
      regenerate();
    }
  }, [mounted, regenerate]);

  const handleToggle = (key: CharType) => {
    // Don't allow toggling off if it's the last active option
    if (options[key] && activeTypes <= 1) return;
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = password;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight font-heading">
          Password Generator
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate strong, cryptographically secure passwords. All generation
          happens locally in your browser.
        </p>
      </div>

      {/* Generated Password Display */}
      <div className="space-y-3">
        <div
          className={cn(
            "relative rounded-lg border bg-muted/50 overflow-hidden",
            "transition-all duration-200"
          )}
        >
          <div className="flex items-center gap-2 px-4 py-3">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              className={cn(
                "flex-1 bg-transparent font-mono text-lg tracking-wider",
                "outline-none select-all",
                "text-foreground"
              )}
              aria-label="Generated password"
              spellCheck={false}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
            <button
              onClick={handleCopy}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                copied
                  ? "text-green-600 bg-green-500/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              aria-label="Copy password"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
            <button
              onClick={regenerate}
              className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Generate new password"
            >
              <RefreshCw className="size-4" />
            </button>
          </div>
        </div>

        {/* Strength Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Strength</span>
            <span className={cn("font-medium", strengthInfo.textColor)}>
              {strengthInfo.label}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-300", strengthInfo.color)}
              style={{
                width: `${Math.min(100, ((activeTypes / 4) * 40 + (Math.min(length, 32) / 32) * 60))}%`,
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground tabular-nums">
            Entropy: ~{entropy.toLocaleString()} bits
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-6 p-6 rounded-lg border bg-card">
        {/* Length Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="password-length" className="text-sm font-medium">
              Length
            </label>
            <span className="text-sm font-mono font-semibold tabular-nums">
              {length}
            </span>
          </div>
          <input
            id="password-length"
            type="range"
            min={8}
            max={128}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
              [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer"
            aria-valuemin={8}
            aria-valuemax={128}
            aria-valuenow={length}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>8</span>
            <span>128</span>
          </div>
        </div>

        {/* Character Type Toggles */}
        <div className="space-y-3">
          <span className="text-sm font-medium">Character types</span>
          <div className="space-y-2">
            {TOGGLE_OPTIONS.map((opt) => {
              const isActive = options[opt.key];
              const isLastActive = isActive && activeTypes <= 1;
              return (
                <label
                  key={opt.key}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                    isActive
                      ? "bg-primary/5 border-primary/20"
                      : "bg-muted/30 border-transparent hover:bg-muted/50",
                    isLastActive && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleToggle(opt.key)}
                    disabled={isLastActive}
                    className="sr-only"
                    aria-label={opt.label}
                  />
                  <div
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors",
                      "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                      isActive ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block size-4 rounded-full bg-white shadow ring-0 transition-transform",
                        isActive ? "translate-x-4" : "translate-x-0"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-sm flex-1",
                      isActive ? "font-medium text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={regenerate}
          className={cn(
            "w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5",
            "text-sm font-medium",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <RefreshCw className="size-4" />
          Generate Password
        </button>
      </div>
    </div>
  );
}
