"use client";

import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { encodeBase64, decodeBase64 } from "@/lib/tools";
import { Copy, Download, ArrowLeftRight, Check, AlertCircle } from "lucide-react";

type Tab = "encode" | "decode";

export default function Base64Tool() {
  const [tab, setTab] = useState<Tab>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const process = useCallback(
    (value: string, currentTab: Tab) => {
      if (!value.trim()) {
        setOutput("");
        setError(null);
        return;
      }

      if (currentTab === "encode") {
        const encoded = encodeBase64(value);
        setOutput(encoded);
        setError(null);
      } else {
        const { result, error } = decodeBase64(value);
        setOutput(result);
        setError(error || null);
      }
    },
    []
  );

  const handleInputChange = (value: string) => {
    setInput(value);
    process(value, tab);
  };

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    setOutput("");
    setError(null);
    setCopied(false);
    if (newTab !== tab) {
      process(input, newTab);
    }
  };

  const handleSwap = () => {
    const newTab: Tab = tab === "encode" ? "decode" : "encode";
    setTab(newTab);
    setInput(output);
    setOutput("");
    setError(null);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = tab === "encode" ? "encoded.txt" : "decoded.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setCopied(false);
    inputRef.current?.focus();
  };

  const charCount = input.length;
  const outputCharCount = output.length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight font-heading">
          Base64 Encoder / Decoder
        </h1>
        <p className="text-sm text-muted-foreground">
          Encode text to Base64 or decode Base64 back to text. All processing
          happens in your browser.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "encode"}
          onClick={() => handleTabChange("encode")}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
            tab === "encode"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Encode
        </button>
        <button
          role="tab"
          aria-selected={tab === "decode"}
          onClick={() => handleTabChange("decode")}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
            tab === "decode"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Decode
        </button>
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Panel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="base64-input"
              className="text-sm font-medium"
            >
              {tab === "encode" ? "Text to encode" : "Base64 to decode"}
            </label>
            <span className="text-xs text-muted-foreground tabular-nums">
              {charCount.toLocaleString()} character{charCount !== 1 ? "s" : ""}
            </span>
          </div>
          <textarea
            ref={inputRef}
            id="base64-input"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={
              tab === "encode"
                ? "Enter text to encode..."
                : "Enter Base64 string to decode..."
            }
            rows={10}
            className={cn(
              "w-full rounded-lg border bg-background px-4 py-3 font-mono text-sm",
              "resize-y min-h-[200px]",
              "placeholder:text-muted-foreground/60",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
              "transition-shadow"
            )}
            spellCheck={false}
          />
          <button
            onClick={handleClear}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear input
          </button>
        </div>

        {/* Output Panel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              {tab === "encode" ? "Encoded output" : "Decoded output"}
            </label>
            <span className="text-xs text-muted-foreground tabular-nums">
              {outputCharCount.toLocaleString()} character
              {outputCharCount !== 1 ? "s" : ""}
            </span>
          </div>
          <div
            className={cn(
              "w-full rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm",
              "min-h-[200px] break-all whitespace-pre-wrap",
              error && "border-destructive/50 bg-destructive/5"
            )}
            role="textbox"
            aria-readonly="true"
            aria-label={tab === "encode" ? "Encoded output" : "Decoded output"}
          >
            {error ? (
              <div className="flex items-start gap-2 text-destructive">
                <AlertCircle className="size-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            ) : output ? (
              output
            ) : (
              <span className="text-muted-foreground/60">
                {tab === "encode" ? "Encoded text will appear here..." : "Decoded text will appear here..."}
              </span>
            )}
          </div>

          {/* Action buttons */}
          {output && !error && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCopy}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium",
                  "border bg-background hover:bg-muted transition-colors",
                  copied && "border-green-500/50 text-green-600"
                )}
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <Check className="size-3.5" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium border bg-background hover:bg-muted transition-colors"
                aria-label="Download output"
              >
                <Download className="size-3.5" />
                Download
              </button>
              <button
                onClick={handleSwap}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium border bg-background hover:bg-muted transition-colors"
                aria-label="Swap direction"
              >
                <ArrowLeftRight className="size-3.5" />
                Swap direction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
