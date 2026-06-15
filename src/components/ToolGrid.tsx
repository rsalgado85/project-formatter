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
import { useLanguageStore } from "@/store/language";
import { translations } from "@/lib/translations";

interface Tool {
  id: string;
  titleKey: keyof typeof translations.en.tools;
  descKey: keyof typeof translations.en.tools;
  icon: React.ElementType;
  href: string;
  color: string;
}

const tools: Tool[] = [
  {
    id: "json-formatter",
    titleKey: "json",
    descKey: "json",
    icon: Braces,
    href: "/json-formatter",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "xml-formatter",
    titleKey: "xml",
    descKey: "xml",
    icon: Code2,
    href: "/xml-formatter",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    id: "yaml-converter",
    titleKey: "yaml",
    descKey: "yaml",
    icon: ArrowRightLeft,
    href: "/yaml-converter",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    id: "base64",
    titleKey: "base64",
    descKey: "base64",
    icon: Binary,
    href: "/base64",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    id: "password-generator",
    titleKey: "passwordGen",
    descKey: "passwordGen",
    icon: Key,
    href: "/password-tools",
    color: "bg-green-500/10 text-green-500",
  },
  {
    id: "base64-to-image",
    titleKey: "base64Image",
    descKey: "base64Image",
    icon: ImageIcon,
    href: "/base64-to-image",
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    id: "password-checker",
    titleKey: "passwordCheck",
    descKey: "passwordCheck",
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
  const lang = useLanguageStore((s) => s.language);
  const t = translations[lang];

  return (
    <section id="tools" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          {t.tools.heading}
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          {t.tools.subtitle}
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tools.map((tool) => {
          const toolData = t.tools[tool.titleKey] as { title: string; desc: string };
          const descData = t.tools[tool.descKey] as { title: string; desc: string };
          return (
            <motion.div key={tool.id} variants={cardVariants}>
              <Link href={tool.href} className="block group">
                <Card className="h-full transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/20 group-hover:shadow-lg group-hover:-translate-y-0.5">
                  <CardHeader>
                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${tool.color}`}
                    >
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{toolData.title}</CardTitle>
                    <CardDescription>{descData.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      {t.tools.useTool}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
