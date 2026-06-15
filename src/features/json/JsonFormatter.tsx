"use client";

import React, { useState, useCallback, useMemo } from "react";
import { CheckCircle2, Copy, Download, Minus, Plus, RotateCcw, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  copyToClipboard,
  downloadFile,
  countLines,
  countChars,
  formatJson,
  validateJson,
} from "@/lib/tools";

type FormatMode = "pretty" | "minify";

// Simple JSON syntax highlighting
function highlightJson(json: string): React.ReactNode {
  if (!json) return null;

  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  // Tokenize JSON
  const tokenRegex =
    /("(?:[^"\\]|\\.)*")\s*:|("(?:[^"\\]|\\.)*")|(true|false|null)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\],:]|\s+)/g;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(json)) !== null) {
    // Text between tokens
    if (match.index > i) {
      const between = json.slice(i, match.index);
      if (between.trim()) {
        parts.push(<span key={key++}>{between}</span>);
      }
    }
    i = tokenRegex.lastIndex;

    if (match[1] !== undefined) {
      // Key (string followed by colon)
      parts.push(
        <span key={key++} className="text-blue-600 dark:text-blue-400">
          {match[1]}
        </span>
      );
      parts.push(<span key={key++}>: </span>);
    } else if (match[2] !== undefined) {
      // String value
      parts.push(
        <span key={key++} className="text-green-600 dark:text-green-400">
          {match[0]}
        </span>
      );
    } else if (match[3] !== undefined) {
      // Boolean / null
      parts.push(
        <span key={key++} className="text-purple-600 dark:text-purple-400">
          {match[0]}
        </span>
      );
    } else if (match[4] !== undefined) {
      // Number
      parts.push(
        <span key={key++} className="text-orange-600 dark:text-orange-400">
          {match[0]}
        </span>
      );
    } else {
      // Brackets, braces, commas, whitespace
      parts.push(<span key={key++}>{match[0]}</span>);
    }
  }

  // Remaining text
  if (i < json.length) {
    parts.push(<span key={key++}>{json.slice(i)}</span>);
  }

  return <>{parts}</>;
}

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<FormatMode>("pretty");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatted = useMemo(() => {
    if (!input.trim()) {
      setError(null);
      return "";
    }

    const { result, error: formatError } = formatJson(input, mode);
    setError(formatError || null);
    return result;
  }, [input, mode]);

  const isValid = useMemo(() => {
    if (!input.trim()) return null;
    return validateJson(input) === null;
  }, [input]);

  const handleCopy = useCallback(async () => {
    const textToCopy = error ? input : formatted;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [input, formatted, error]);

  const handleDownload = useCallback(() => {
    const content = error ? input : formatted;
    downloadFile(content, "output.json", "application/json");
  }, [input, formatted, error]);

  const handleClear = useCallback(() => {
    setInput("");
    setError(null);
  }, []);

  const inputLines = countLines(input);
  const inputChars = countChars(input);
  const outputLines = countLines(formatted);
  const outputChars = countChars(formatted);

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center rounded-lg border border-border bg-muted/50 p-0.5">
          <button
            onClick={() => setMode("pretty")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              mode === "pretty"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Plus className="size-3" />
            Pretty Print
          </button>
          <button
            onClick={() => setMode("minify")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              mode === "minify"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Minus className="size-3" />
            Minify
          </button>
        </div>

        <div className="flex-1" />

        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <RotateCcw className="size-3" />
          Clear
        </button>

        <button
          onClick={handleCopy}
          disabled={!input}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          {copied ? (
            <CheckCircle2 className="size-3 text-green-500" />
          ) : (
            <Copy className="size-3" />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={handleDownload}
          disabled={!input || !!error}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          <Download className="size-3" />
          Download
        </button>
      </div>

      {/* Status indicator */}
      {input.trim() && (
        <div className="flex items-center gap-2">
          {isValid === true && (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
              <CheckCircle2 className="size-3.5" />
              Valid JSON
            </span>
          )}
          {isValid === false && (
            <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
              <XCircle className="size-3.5" />
              Invalid JSON
            </span>
          )}
        </div>
      )}

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Input
            </label>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {inputLines} lines &middot; {inputChars.toLocaleString()} chars
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Error will be updated by useMemo
            }}
            placeholder='{"key": "value"}'
            spellCheck={false}
            className={cn(
              "flex-1 min-h-[400px] w-full rounded-lg border bg-background p-4 font-mono text-sm leading-relaxed resize-y transition-colors placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/50",
              error && input.trim()
                ? "border-red-500 dark:border-red-400 focus:ring-red-500/30"
                : isValid
                  ? "border-green-500 dark:border-green-400 focus:ring-green-500/30"
                  : "border-border"
            )}
          />
          {error && input.trim() && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-mono break-all">
              {error}
            </p>
          )}
        </div>

        {/* Output panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Output
            </label>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {outputLines} lines &middot; {outputChars.toLocaleString()} chars
            </span>
          </div>
          <div
            className={cn(
              "flex-1 min-h-[400px] w-full rounded-lg border bg-background p-4 font-mono text-sm leading-relaxed overflow-auto transition-colors",
              error && input.trim()
                ? "border-red-500/30 bg-muted/30"
                : isValid && formatted
                  ? "border-green-500/30 dark:border-green-400/30"
                  : "border-border"
            )}
          >
            {formatted ? (
              <pre className="whitespace-pre-wrap break-words">
                <code>{highlightJson(formatted)}</code>
              </pre>
            ) : error ? (
              <p className="text-muted-foreground/50 italic">
                Fix input errors to see output
              </p>
            ) : (
              <p className="text-muted-foreground/50 italic">
                Formatted output will appear here
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
