/**
 * FormatterHub - Core Tool Utilities
 * Client-side safe utility functions for encoding, password generation, and strength analysis.
 */

// ─── General Utilities ──────────────────────────────────────────────────────

export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === "undefined") return Promise.resolve(false);
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => {
      // Fallback for older browsers
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        return true;
      } catch {
        return false;
      }
    });
}

export function downloadFile(
  content: string,
  filename: string,
  mimeType: string = "text/plain"
): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function countLines(text: string): number {
  if (!text) return 0;
  return text.split("\n").length;
}

export function countChars(text: string): number {
  return text.length;
}

// ─── JSON ────────────────────────────────────────────────────────────────────

export function formatJson(
  input: string,
  mode: "pretty" | "minify"
): { result: string; error?: string } {
  if (!input.trim()) return { result: "" };
  try {
    const parsed = JSON.parse(input);
    if (mode === "minify") {
      return { result: JSON.stringify(parsed) };
    }
    return { result: JSON.stringify(parsed, null, 2) };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid JSON";
    return { result: "", error: msg };
  }
}

export function validateJson(input: string): string | null {
  if (!input.trim()) return "Input is empty";
  try {
    JSON.parse(input);
    return null;
  } catch (e) {
    return e instanceof Error ? e.message : "Invalid JSON";
  }
}

// ─── XML ─────────────────────────────────────────────────────────────────────

export function formatXml(
  input: string,
  mode: "pretty" | "minify"
): { result: string; error?: string } {
  if (!input.trim()) return { result: "" };

  try {
    // Use DOMParser for XML validation and formatting
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "application/xml");

    const parseError = doc.querySelector("parsererror");
    if (parseError) {
      return { result: "", error: parseError.textContent || "Invalid XML" };
    }

    if (mode === "minify") {
      // Simple minification: remove whitespace between tags
      let minified = input
        .replace(/>\s+</g, "><")
        .replace(/\s{2,}/g, " ")
        .trim();
      return { result: minified };
    }

    // Pretty print using XMLSerializer with formatting
    const serializer = new XMLSerializer();
    const raw = serializer.serializeToString(doc);

    // Manual pretty-print: add indentation
    let formatted = "";
    let indent = 0;
    const lines = raw
      .replace(/></g, ">\n<")
      .replace(/\n+/g, "\n")
      .split("\n");

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Closing tag
      if (trimmed.startsWith("</")) {
        indent = Math.max(0, indent - 1);
        formatted += "  ".repeat(indent) + trimmed + "\n";
        continue;
      }

      // Self-closing tag or opening tag
      formatted += "  ".repeat(indent) + trimmed + "\n";

      // Opening tag (not self-closing and not a declaration)
      if (
        trimmed.startsWith("<") &&
        !trimmed.startsWith("<?") &&
        !trimmed.endsWith("/>") &&
        !trimmed.includes("</")
      ) {
        // Check it's not a single-line element (has matching close on same line)
        const tagName = trimmed.match(/<(\w+)/)?.[1];
        if (tagName && !trimmed.includes(`</${tagName}>`)) {
          indent++;
        }
      }
    }

    return { result: formatted.trim() };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "XML processing error";
    return { result: "", error: msg };
  }
}

export function validateXml(input: string): string | null {
  if (!input.trim()) return "Input is empty";
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "application/xml");
    const parseError = doc.querySelector("parsererror");
    if (parseError) {
      return parseError.textContent || "Invalid XML";
    }
    return null;
  } catch (e) {
    return e instanceof Error ? e.message : "XML validation error";
  }
}

// ─── YAML / JSON Conversion ──────────────────────────────────────────────────

interface ConversionResult {
  result: string;
  error?: string;
}

/**
 * Simple YAML to JSON converter (client-side, supports basic YAML structures).
 * Does NOT use external libraries — pure TypeScript parser.
 */
export function yamlToJson(yamlInput: string): ConversionResult {
  if (!yamlInput.trim()) return { result: "" };

  try {
    const lines = yamlInput.split("\n");
    const root: Record<string, unknown> = {};
    const stack: Array<{ obj: Record<string, unknown>; indent: number }> = [
      { obj: root, indent: -1 },
    ];

    let currentArray: unknown[] | null = null;
    let arrayIndent = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trimEnd();

      if (!trimmed || trimmed.startsWith("#")) continue;

      const indent = line.search(/\S/);

      // Pop stack for dedent
      while (
        stack.length > 1 &&
        stack[stack.length - 1].indent >= indent &&
        indent >= 0
      ) {
        stack.pop();
      }

      // Array item
      if (trimmed.startsWith("- ")) {
        const value = trimmed.slice(2).trim();
        const colonIdx = value.indexOf(":");

        // Don't confuse YAML header separator "---" with " - "
        if (trimmed === "---") continue;

        if (!currentArray || indent > arrayIndent + 1) {
          currentArray = [];
          const parent = stack[stack.length - 1].obj;
          const lastKey = Object.keys(parent).pop() || "items";
          // Find which key this array belongs to by looking back
          let arrayKey = lastKey;
          for (let j = i - 1; j >= 0; j--) {
            const prevLine = lines[j].trim();
            if (prevLine.endsWith(":") && !prevLine.startsWith("-")) {
              arrayKey = prevLine.slice(0, -1).trim();
              break;
            }
          }
          parent[arrayKey] = currentArray;
          arrayIndent = indent;
        } else if (indent < arrayIndent) {
          currentArray = null;
          arrayIndent = -1;
          continue;
        }

        if (colonIdx !== -1) {
          const key = value.slice(0, colonIdx).trim();
          const val = value.slice(colonIdx + 1).trim();
          const obj: Record<string, unknown> = {};
          obj[key] = parseYamlValue(val);
          currentArray.push(obj);
        } else {
          currentArray.push(parseYamlValue(value));
        }
        continue;
      }

      // Key: value pair
      const colonIdx = trimmed.indexOf(":");
      if (colonIdx === -1) continue;

      const key = trimmed.slice(0, colonIdx).trim();
      const rawValue = trimmed.slice(colonIdx + 1).trim();

      const parent = stack[stack.length - 1].obj;

      if (rawValue === "" || rawValue === "|" || rawValue === ">") {
        // Nested object follows — multi-line value
        if (rawValue === "|" || rawValue === ">") {
          // Literal block scalar
          const blockLines: string[] = [];
          let j = i + 1;
          while (j < lines.length) {
            const nextLine = lines[j];
            const nextIndent = nextLine.search(/\S/);
            if (nextIndent <= indent && nextLine.trim() !== "") break;
            blockLines.push(nextLine.trimEnd());
            j++;
          }
          i = j - 1;
          parent[key] = blockLines.join("\n");
        } else {
          // Object with child properties
          const newObj: Record<string, unknown> = {};
          parent[key] = newObj;
          stack.push({ obj: newObj, indent });
          currentArray = null;
          arrayIndent = -1;
        }
      } else {
        parent[key] = parseYamlValue(rawValue);
      }
    }

    return { result: JSON.stringify(root, null, 2) };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid YAML";
    return { result: "", error: msg };
  }
}

function parseYamlValue(raw: string): unknown {
  const trimmed = raw.trim();
  if (trimmed === "null" || trimmed === "~" || trimmed === "") return null;
  if (trimmed === "true" || trimmed === "yes" || trimmed === "on") return true;
  if (trimmed === "false" || trimmed === "no" || trimmed === "off") return false;

  // Number
  if (/^-?\d+\.?\d*$/.test(trimmed)) {
    return trimmed.includes(".") ? parseFloat(trimmed) : parseInt(trimmed, 10);
  }

  // Quoted string
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

/**
 * Convert JSON string to YAML format.
 */
export function jsonToYaml(jsonInput: string): ConversionResult {
  if (!jsonInput.trim()) return { result: "" };

  try {
    const obj = JSON.parse(jsonInput);
    return { result: toYaml(obj) };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid JSON";
    return { result: "", error: msg };
  }
}

function toYaml(obj: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);

  if (obj === null || obj === undefined) return pad + "null\n";

  if (typeof obj === "string") {
    // Check if string needs quoting
    if (
      /[:\n#\{\}\[\],&*?!|>'"%@`]/.test(obj) ||
      obj.startsWith(" ") ||
      obj.endsWith(" ") ||
      obj === "true" ||
      obj === "false" ||
      obj === "null" ||
      /^-?\d+\.?\d*$/.test(obj)
    ) {
      return pad + `"${obj.replace(/"/g, '\\"')}"\n`;
    }
    return pad + obj + "\n";
  }

  if (typeof obj === "number" || typeof obj === "boolean") {
    return pad + String(obj) + "\n";
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return pad + "[]\n";
    let result = "";
    for (const item of obj) {
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        const entries = Object.entries(item as Record<string, unknown>);
        result += pad + "- " + entries[0]?.[0] + ": " + stringifyYamlValue(entries[0]?.[1]) + "\n";
        for (let i = 1; i < entries.length; i++) {
          result += pad + "  " + entries[i][0] + ": " + stringifyYamlValue(entries[i][1]) + "\n";
        }
      } else if (typeof item === "object" && item !== null) {
        result += pad + "-\n" + toYaml(item, indent + 1);
      } else {
        result += pad + "- " + stringifyYamlValue(item) + "\n";
      }
    }
    return result;
  }

  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return pad + "{}\n";
    let result = "";
    for (const [key, value] of entries) {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        result += pad + key + ":\n" + toYaml(value, indent + 1);
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          result += pad + key + ": []\n";
        } else {
          result += pad + key + ":\n" + toYaml(value, indent + 1);
        }
      } else {
        result += pad + key + ": " + stringifyYamlValue(value) + "\n";
      }
    }
    return result;
  }

  return pad + String(obj) + "\n";
}

function stringifyYamlValue(value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "string") {
    if (
      /[:\n#\{\}\[\],&*?!|>'"%@`]/.test(value) ||
      value.startsWith(" ") ||
      value.endsWith(" ") ||
      value === "true" ||
      value === "false" ||
      value === "null" ||
      /^-?\d+\.?\d*$/.test(value)
    ) {
      return `"${value.replace(/"/g, '\\"')}"`;
    }
    return value;
  }
  return String(value);
}

// ─── Base64 ───────────────────────────────────────────────────────────────────

export function encodeBase64(text: string): string {
  try {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch {
    return "";
  }
}

export function decodeBase64(encoded: string): { result: string; error?: string } {
  try {
    const binary = atob(encoded.trim());
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder("utf-8", { fatal: true });
    return { result: decoder.decode(bytes) };
  } catch {
    return { result: "", error: "Invalid Base64 input. Please check your encoded string." };
  }
}

// ─── Password Generation ──────────────────────────────────────────────────────

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export interface PasswordResult {
  password: string;
  entropy: number;
}

/**
 * Generate a cryptographically secure password using crypto.getRandomValues.
 */
export function generatePassword(options: PasswordOptions): PasswordResult {
  const { length, uppercase, lowercase, numbers, symbols } = options;

  const charSets: string[] = [];
  if (uppercase) charSets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (lowercase) charSets.push("abcdefghijklmnopqrstuvwxyz");
  if (numbers) charSets.push("0123456789");
  if (symbols) charSets.push("!@#$%^&*");

  // If no options selected, default to lowercase
  if (charSets.length === 0) {
    charSets.push("abcdefghijklmnopqrstuvwxyz");
  }

  const allChars = charSets.join("");
  const poolSize = allChars.length;
  const entropy = length * Math.log2(poolSize);

  // Ensure at least one character from each selected set
  const passwordChars: string[] = [];
  const randomValues = new Uint32Array(length * 2);
  crypto.getRandomValues(randomValues);

  // First, pick one from each set
  for (let i = 0; i < charSets.length; i++) {
    const set = charSets[i];
    passwordChars.push(set[randomValues[i] % set.length]);
  }

  // Fill the rest randomly
  for (let i = charSets.length; i < length; i++) {
    passwordChars.push(allChars[randomValues[i] % poolSize]);
  }

  // Fisher-Yates shuffle with crypto randomness
  const shuffleValues = new Uint32Array(length);
  crypto.getRandomValues(shuffleValues);
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = shuffleValues[i] % (i + 1);
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  return {
    password: passwordChars.join(""),
    entropy: Math.round(entropy * 100) / 100,
  };
}

// ─── Password Strength ────────────────────────────────────────────────────────

export interface StrengthCheck {
  label: string;
  passed: boolean;
}

export interface StrengthResult {
  score: number;
  label: string;
  entropy: number;
  crackTime: string;
  checks: StrengthCheck[];
}

/**
 * Calculate password strength entirely client-side.
 * Never stores or transmits the password.
 */
export function calculatePasswordStrength(password: string): StrengthResult {
  const checks: StrengthCheck[] = [];
  let score = 0;

  // Length checks
  const len8 = password.length >= 8;
  const len12 = password.length >= 12;
  const len16 = password.length >= 16;

  checks.push({ label: "Length ≥ 8", passed: len8 });
  checks.push({ label: "Length ≥ 12", passed: len12 });
  checks.push({ label: "Length ≥ 16", passed: len16 });

  if (len8) score += 15;
  if (len12) score += 10;
  if (len16) score += 5;

  // Character type checks
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  checks.push({ label: "Contains uppercase", passed: hasUpper });
  checks.push({ label: "Contains lowercase", passed: hasLower });
  checks.push({ label: "Contains numbers", passed: hasNumber });
  checks.push({ label: "Contains symbols", passed: hasSymbol });

  if (hasUpper) score += 10;
  if (hasLower) score += 10;
  if (hasNumber) score += 10;
  if (hasSymbol) score += 15;

  // Pattern checks
  const hasCommonPattern = /(?:abc|bcd|cde|def|efg|123|234|345|456|567|678|789|qwerty|asdfgh|zxcvbn)/i.test(password);
  const hasRepeatedChars = /(.)\1{2,}/.test(password);

  const noCommonPattern = !hasCommonPattern;
  const noRepeatedChars = !hasRepeatedChars;

  checks.push({ label: "No common patterns", passed: noCommonPattern });
  checks.push({ label: "No repeated characters", passed: noRepeatedChars });

  if (noCommonPattern) score += 10;
  else score -= 10;
  if (noRepeatedChars) score += 5;
  else score -= 5;

  // Clamp score to 0-100
  score = Math.max(0, Math.min(100, score));

  // Calculate entropy
  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSymbol) poolSize += 32;
  if (poolSize === 0) poolSize = 1;

  const entropy = password.length * Math.log2(poolSize);

  // Determine label based on score
  let label: string;
  if (score >= 90) label = "Very Strong";
  else if (score >= 75) label = "Strong";
  else if (score >= 60) label = "Good";
  else if (score >= 45) label = "Fair";
  else if (score >= 30) label = "Weak";
  else label = "Very Weak";

  // Crack time estimation
  let crackTime: string;
  if (entropy < 28) crackTime = "Instantly";
  else if (entropy < 36) crackTime = "Seconds";
  else if (entropy < 60) crackTime = "Hours/Days";
  else if (entropy < 128) crackTime = "Centuries";
  else crackTime = "Millions of years";

  return {
    score,
    label,
    entropy: Math.round(entropy * 100) / 100,
    crackTime,
    checks,
  };
}
