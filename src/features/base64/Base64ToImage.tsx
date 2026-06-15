"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { decodeBase64Image } from "@/lib/tools";
import { Copy, Download, ImageIcon, AlertCircle, Upload, Trash2 } from "lucide-react";

export default function Base64ToImage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{
    dataUrl: string;
    mimeType: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("image.png");

  const process = useCallback((value: string) => {
    if (!value.trim()) {
      setOutput(null);
      setError(null);
      return;
    }

    const { dataUrl, mimeType, error: decodeError } = decodeBase64Image(value);
    if (decodeError) {
      setOutput(null);
      setError(decodeError);
    } else {
      setOutput({ dataUrl, mimeType });
      setError(null);

      // Auto-detect filename extension
      const ext = mimeType.split("/")[1] || "png";
      setFileName(`image.${ext}`);
    }
  }, []);

  const handleInputChange = (value: string) => {
    setInput(value);
    setCopied(false);
    process(value);
  };

  const handleCopyBase64 = async () => {
    if (!input) return;
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = input;
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
    const a = document.createElement("a");
    a.href = output.dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleClear = () => {
    setInput("");
    setOutput(null);
    setError(null);
    setCopied(false);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        handleInputChange(text);
      }
    } catch {
      // Clipboard read not supported
    }
  };

  const charCount = input.length;

  // Determine image dimensions from the rendered output
  const getImageSize = () => {
    if (!output) return null;
    // Estimate from base64 length: ~4/3 * base64 length ≈ original bytes
    const estimatedBytes = Math.round((output.dataUrl.length * 3) / 4);
    const kb = (estimatedBytes / 1024).toFixed(1);
    return kb;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight font-heading">
          Base64 to Image
        </h1>
        <p className="text-sm text-muted-foreground">
          Decode a Base64 string back into an image. Paste data URIs or raw
          Base64. All processing happens in your browser.
        </p>
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Panel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="b64img-input" className="text-sm font-medium">
              Base64 input
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground tabular-nums">
                {charCount.toLocaleString()} character
                {charCount !== 1 ? "s" : ""}
              </span>
              <button
                onClick={handlePasteFromClipboard}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Paste from clipboard"
              >
                <Upload className="size-3" />
                Paste
              </button>
            </div>
          </div>
          <textarea
            id="b64img-input"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Paste a Base64 image string or data URI..."
            rows={12}
            className={cn(
              "w-full rounded-lg border bg-background px-4 py-3 font-mono text-xs",
              "resize-y min-h-[200px]",
              "placeholder:text-muted-foreground/60",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
              "transition-shadow",
              error && "border-destructive/50"
            )}
            spellCheck={false}
          />
          {error && (
            <div className="flex items-start gap-2 text-destructive text-sm">
              <AlertCircle className="size-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Trash2 className="size-3" />
              Clear input
            </button>
            {input && (
              <button
                onClick={handleCopyBase64}
                className={cn(
                  "inline-flex items-center gap-1 text-xs transition-colors",
                  copied
                    ? "text-green-600"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Copy className="size-3" />
                {copied ? "Copied!" : "Copy Base64"}
              </button>
            )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Image output</label>
            {output && (
              <span className="text-xs text-muted-foreground tabular-nums">
                {getImageSize()} KB · {output.mimeType}
              </span>
            )}
          </div>
          <div
            className={cn(
              "w-full rounded-lg border bg-muted/50 flex items-center justify-center",
              "min-h-[200px] p-4",
              error && "border-destructive/50"
            )}
          >
            {error ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <AlertCircle className="size-8 text-destructive/60" />
                <span className="text-sm">{error}</span>
              </div>
            ) : output ? (
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="relative w-full max-w-[400px] bg-background rounded-lg border p-2 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={output.dataUrl}
                    alt="Decoded Base64 image"
                    className="max-w-full max-h-[400px] object-contain rounded"
                    onError={() => {
                      setError("The image could not be rendered. The data may be corrupted or not a valid image format.");
                      setOutput(null);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
                <ImageIcon className="size-8" />
                <span className="text-sm">
                  Decoded image will appear here...
                </span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          {output && !error && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium border bg-background hover:bg-muted transition-colors"
                aria-label="Download image"
              >
                <Download className="size-3.5" />
                Download
              </button>
              <a
                href={output.dataUrl}
                download={fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium border bg-background hover:bg-muted transition-colors"
              >
                <ImageIcon className="size-3.5" />
                Open full size
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground space-y-2">
        <p className="font-medium text-foreground">💡 Tips</p>
        <ul className="list-disc pl-4 space-y-1 text-xs">
          <li>
            Supports <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">data:image/png;base64,...</code>{" "}
            data URIs and raw Base64 strings.
          </li>
          <li>
            Detects image format automatically: PNG, JPEG, GIF, WebP, and SVG.
          </li>
          <li>
            You can paste directly with the <strong>Paste</strong> button or{" "}
            <kbd className="px-1 py-0.5 rounded bg-muted font-mono text-xs">Ctrl+V</kbd>{" "}
            in the textarea.
          </li>
          <li>All processing is client-side — your image data never leaves your browser.</li>
        </ul>
      </div>
    </div>
  );
}
