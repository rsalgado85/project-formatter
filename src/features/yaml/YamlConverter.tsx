"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  ArrowRightLeft,
  CheckCircle2,
  Copy,
  Download,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  copyToClipboard,
  downloadFile,
  countLines,
  countChars,
  yamlToJson,
  jsonToYaml,
} from "@/lib/tools";

type ConversionDirection = "yaml-to-json" | "json-to-yaml";

// Simple YAML syntax highlighting
function highlightYaml(yaml: string): React.ReactNode {
  if (!yaml) return null;

  const lines = yaml.split("\n");
  return (
    <>
      {lines.map((line, idx) => {
        const trimmed = line.trimEnd();
        const indent = line.search(/\S/);

        // Comment
        if (trimmed.startsWith("#")) {
          return (
            <span key={idx}>
              {" ".repeat(Math.max(0, indent))}
              <span className="text-zinc-400 dark:text-zinc-500 italic">
                {trimmed}
              </span>
              {idx < lines.length - 1 ? "\n" : ""}
            </span>
          );
        }

        // Key: value line
        const colonIdx = trimmed.indexOf(":");
        if (colonIdx !== -1 && !trimmed.startsWith("- ") && !trimmed.startsWith('"') && !trimmed.startsWith("'")) {
          const key = trimmed.slice(0, colonIdx);
          const rest = trimmed.slice(colonIdx);
          return (
            <span key={idx}>
              {" ".repeat(Math.max(0, indent))}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {key}
              </span>
              <span>: </span>
              {rest.slice(1).trim() && (
                <HighlightYamlValue value={rest.slice(1).trim()} />
              )}
              {idx < lines.length - 1 ? "\n" : ""}
            </span>
          );
        }

        // Array item
        if (trimmed.startsWith("- ")) {
          const rest = trimmed.slice(2).trim();
          const itemColonIdx = rest.indexOf(":");
          if (itemColonIdx !== -1) {
            const key = rest.slice(0, itemColonIdx);
            const val = rest.slice(itemColonIdx + 1).trim();
            return (
              <span key={idx}>
                {" ".repeat(Math.max(0, indent))}
                <span className="text-purple-600 dark:text-purple-400">- </span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {key}
                </span>
                <span>: </span>
                {val && <HighlightYamlValue value={val} />}
                {idx < lines.length - 1 ? "\n" : ""}
              </span>
            );
          }
          return (
            <span key={idx}>
              {" ".repeat(Math.max(0, indent))}
              <span className="text-purple-600 dark:text-purple-400">- </span>
              {rest && <HighlightYamlValue value={rest} />}
              {idx < lines.length - 1 ? "\n" : ""}
            </span>
          );
        }

        return (
          <span key={idx}>
            {line}
            {idx < lines.length - 1 ? "\n" : ""}
          </span>
        );
      })}
    </>
  );
}

function HighlightYamlValue({ value }: { value: string }) {
  if (value === "null" || value === "~") {
    return (
      <span className="text-purple-600 dark:text-purple-400">{value}</span>
    );
  }
  if (value === "true" || value === "false") {
    return (
      <span className="text-purple-600 dark:text-purple-400">{value}</span>
    );
  }
  if (/^-?\d+\.?\d*$/.test(value)) {
    return (
      <span className="text-orange-600 dark:text-orange-400">{value}</span>
    );
  }
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return (
      <span className="text-green-600 dark:text-green-400">{value}</span>
    );
  }
  return <span className="text-green-600 dark:text-green-400">{value}</span>;
}

// JSON syntax highlighting (reused pattern)
function highlightJsonForYaml(json: string): React.ReactNode {
  if (!json) return null;

  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const tokenRegex =
    /("(?:[^"\\]|\\.)*")\s*:|("(?:[^"\\]|\\.)*")|(true|false|null)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\],:]|\s+)/g;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(json)) !== null) {
    if (match.index > i) {
      const between = json.slice(i, match.index);
      if (between.trim()) {
        parts.push(<span key={key++}>{between}</span>);
      }
    }
    i = tokenRegex.lastIndex;

    if (match[1] !== undefined) {
      parts.push(
        <span key={key++} className="text-blue-600 dark:text-blue-400">
          {match[1]}
        </span>
      );
      parts.push(<span key={key++}>: </span>);
    } else if (match[2] !== undefined) {
      parts.push(
        <span key={key++} className="text-green-600 dark:text-green-400">
          {match[0]}
        </span>
      );
    } else if (match[3] !== undefined) {
      parts.push(
        <span key={key++} className="text-purple-600 dark:text-purple-400">
          {match[0]}
        </span>
      );
    } else if (match[4] !== undefined) {
      parts.push(
        <span key={key++} className="text-orange-600 dark:text-orange-400">
          {match[0]}
        </span>
      );
    } else {
      parts.push(<span key={key++}>{match[0]}</span>);
    }
  }

  if (i < json.length) {
    parts.push(<span key={key++}>{json.slice(i)}</span>);
  }

  return <>{parts}</>;
}

export default function YamlConverter() {
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<ConversionDirection>("yaml-to-json");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isYamlToJson = direction === "yaml-to-json";

  const output = useMemo(() => {
    if (!input.trim()) {
      setError(null);
      return "";
    }

    if (isYamlToJson) {
      const { result, error: convError } = yamlToJson(input);
      setError(convError || null);
      return result;
    } else {
      const { result, error: convError } = jsonToYaml(input);
      setError(convError || null);
      return result;
    }
  }, [input, direction, isYamlToJson]);

  const handleCopy = useCallback(async () => {
    const textToCopy = error ? input : output;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [input, output, error]);

  const handleDownload = useCallback(() => {
    const content = error ? input : output;
    if (isYamlToJson) {
      downloadFile(content, "output.json", "application/json");
    } else {
      downloadFile(content, "output.yaml", "application/yaml");
    }
  }, [input, output, error, isYamlToJson]);

  const handleClear = useCallback(() => {
    setInput("");
    setError(null);
  }, []);

  const handleSwap = useCallback(() => {
    if (output && !error) {
      setInput(output);
    }
    setDirection(isYamlToJson ? "json-to-yaml" : "yaml-to-json");
  }, [output, error, isYamlToJson]);

  const inputLines = countLines(input);
  const inputChars = countChars(input);
  const outputLines = countLines(output);
  const outputChars = countChars(output);

  const inputPlaceholder = isYamlToJson
    ? 'name: John Doe\nage: 30\nactive: true\nhobbies:\n  - coding\n  - chess'
    : '{"name": "John Doe", "age": 30, "active": true}';

  const inputLabel = isYamlToJson ? "YAML Input" : "JSON Input";
  const outputLabel = isYamlToJson ? "JSON Output" : "YAML Output";

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Direction tabs */}
        <div className="flex items-center rounded-lg border border-border bg-muted/50 p-0.5">
          <button
            onClick={() => setDirection("yaml-to-json")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              isYamlToJson
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            YAML &rarr; JSON
          </button>
          <button
            onClick={() => setDirection("json-to-yaml")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              !isYamlToJson
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            JSON &rarr; YAML
          </button>
        </div>

        <button
          onClick={handleSwap}
          disabled={!output || !!error}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-40 disabled:pointer-events-none"
          title="Swap input and output"
        >
          <ArrowRightLeft className="size-3" />
          Swap
        </button>

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
          {error ? (
            <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
              <XCircle className="size-3.5" />
              {error}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
              <CheckCircle2 className="size-3.5" />
              Valid {isYamlToJson ? "YAML" : "JSON"}
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
              {inputLabel}
            </label>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {inputLines} lines &middot; {inputChars.toLocaleString()} chars
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder={inputPlaceholder}
            spellCheck={false}
            className={cn(
              "flex-1 min-h-[400px] w-full rounded-lg border bg-background p-4 font-mono text-sm leading-relaxed resize-y transition-colors placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/50",
              error && input.trim()
                ? "border-red-500 dark:border-red-400 focus:ring-red-500/30"
                : !error && output
                  ? "border-green-500 dark:border-green-400 focus:ring-green-500/30"
                  : "border-border"
            )}
          />
        </div>

        {/* Output panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {outputLabel}
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
                : !error && output
                  ? "border-green-500/30 dark:border-green-400/30"
                  : "border-border"
            )}
          >
            {output ? (
              <pre className="whitespace-pre-wrap break-words">
                <code>
                  {isYamlToJson
                    ? highlightJsonForYaml(output)
                    : highlightYaml(output)}
                </code>
              </pre>
            ) : error ? (
              <p className="text-muted-foreground/50 italic">
                Fix input errors to see output
              </p>
            ) : (
              <p className="text-muted-foreground/50 italic">
                Converted output will appear here
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
