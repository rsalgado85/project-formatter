"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Braces,
  Code2,
  ArrowRightLeft,
  Binary,
  ImageIcon,
  Key,
  Shield,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

const tools: Tool[] = [
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description:
      "Format, validate, and prettify JSON data. Minify or expand with a single click.",
    icon: Braces,
    href: "/json-formatter",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "xml-formatter",
    title: "XML Formatter",
    description:
      "Make XML readable. Indent, validate, and convert between XML structures.",
    icon: Code2,
    href: "/xml-formatter",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    id: "yaml-converter",
    title: "YAML Converter",
    description:
      "Convert between YAML, JSON, and XML. Validate YAML syntax effortlessly.",
    icon: ArrowRightLeft,
    href: "/yaml-converter",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    id: "base64",
    title: "Base64 Encoder / Decoder",
    description:
      "Encode and decode Base64 strings. Supports UTF-8 and binary data.",
    icon: Binary,
    href: "/base64",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description:
      "Generate strong, cryptographically secure passwords with custom rules.",
    icon: Key,
    href: "/password-tools",
    color: "bg-green-500/10 text-green-500",
  },
  {
    id: "base64-to-image",
    title: "Base64 to Image",
    description:
      "Decode Base64 strings back into images. Supports PNG, JPEG, GIF, WebP and SVG.",
    icon: ImageIcon,
    href: "/base64-to-image",
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    id: "password-checker",
    title: "Password Strength Checker",
    description:
      "Check how strong your password is and get tips to improve it.",
    icon: Shield,
    href: "/password-tools#checker",
    color: "bg-rose-500/10 text-rose-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" } as const,
  },
};

export function ToolGrid() {
  return (
    <section id="tools" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          All Developer Tools
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Privacy-first utilities. Every tool runs entirely in your browser —
          your data is never uploaded anywhere.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tools.map((tool) => (
          <motion.div key={tool.id} variants={cardVariants}>
            <Link href={tool.href} className="block group">
              <Card className="h-full transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/20 group-hover:shadow-lg group-hover:-translate-y-0.5">
                <CardHeader>
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${tool.color}`}
                  >
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Use Tool
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
