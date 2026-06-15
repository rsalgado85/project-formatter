"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Layers,
  Cpu,
  Shield,
  Palette,
  Monitor,
  Sparkles,
  Zap,
  Code2,
  ExternalLink,
  Globe,
  Mail,
} from "lucide-react";
import { translations } from "@/lib/translations";
import { useLanguageStore } from "@/store/language";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const techStack = [
  { name: "Next.js 15", icon: Layers, color: "#FFFFFF" },
  { name: "React 19", icon: Cpu, color: "#61DAFB" },
  { name: "TypeScript", icon: Shield, color: "#3178C6" },
  { name: "TailwindCSS v4", icon: Palette, color: "#06B6D4" },
  { name: "shadcn/ui", icon: Monitor, color: "#A78BFA" },
  { name: "Framer Motion", icon: Sparkles, color: "#F5A623" },
  { name: "Zustand", icon: Zap, color: "#F97316" },
  { name: "lucide-react", icon: Code2, color: "#F5A623" },
];

const socialLinks = [
  {
    icon: ExternalLink,
    href: "https://github.com/rsalgado85",
    key: "github" as const,
  },
  {
    icon: Globe,
    href: "https://www.linkedin.com/in/robinsonsalgado",
    key: "linkedin" as const,
  },
  {
    icon: Mail,
    href: "mailto:rsalgado85@gmail.com",
    key: "email" as const,
  },
];

export default function AboutPage() {
  const language = useLanguageStore((s) => s.language);
  const t = translations[language].about;

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* ───── Header ───── */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            {language === "es" ? "Inicio" : "Home"}
          </Link>
        </div>
      </header>

      {/* ───── Main Content ───── */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-20">
        {/* ─── Hero ─── */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col items-center text-center space-y-6 pt-8"
        >
          <motion.div
            variants={fadeInUp}
            custom={0}
            className="size-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center"
          >
            <span className="text-3xl font-bold text-primary">
              {t.title
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            custom={1}
            className="text-3xl sm:text-4xl font-bold font-heading tracking-tight text-foreground"
          >
            {t.title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-base font-medium text-primary/80"
          >
            {t.role}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            custom={3}
            className="max-w-2xl text-muted-foreground leading-relaxed"
          >
            {t.bio}
          </motion.p>

          {/* Social links */}
          <motion.div
            variants={fadeInUp}
            custom={4}
            className="flex items-center gap-3"
          >
            {socialLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.socialAlt[link.key]}
                className="inline-flex items-center justify-center size-10 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                <link.icon className="size-4" />
              </a>
            ))}
          </motion.div>
        </motion.section>

        {/* ─── Stats ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {t.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                custom={i}
                className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4 text-center hover:border-primary/20 transition-colors"
              >
                <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── Tech Stack ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <motion.h2
              variants={fadeInUp}
              custom={0}
              className="text-2xl font-bold font-heading tracking-tight text-foreground"
            >
              {t.techHeading}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={1}
              className="text-sm text-muted-foreground max-w-lg mx-auto"
            >
              {t.techDesc}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {techStack.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  variants={fadeInUp}
                  custom={i + 2}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/20 hover:bg-muted/50 transition-colors"
                >
                  <div
                    className="flex items-center justify-center size-10 rounded-lg"
                    style={{
                      backgroundColor: `${tech.color}15`,
                    }}
                  >
                    <Icon
                      className="size-5"
                      style={{ color: tech.color }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ─── Timeline ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <motion.h2
              variants={fadeInUp}
              custom={0}
              className="text-2xl font-bold font-heading tracking-tight text-foreground"
            >
              {t.timelineHeading}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={1}
              className="text-sm text-muted-foreground max-w-lg mx-auto"
            >
              {t.timelineDesc}
            </motion.p>
          </div>

          <div className="relative pl-8 border-l-2 border-border space-y-8 ml-4">
            {t.timelineItems.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                custom={i + 2}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-[calc(2rem+5px)] top-1 size-3 rounded-full bg-primary border-2 border-background" />
                <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider">
                  {item.year}
                </span>
                <h3 className="text-base font-semibold text-foreground mt-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── Quote ─── */}
        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="relative border-l-4 border-primary/30 pl-6 py-2 italic text-muted-foreground max-w-2xl mx-auto"
        >
          <p className="text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
          <footer className="mt-3 text-sm font-medium text-foreground not-italic">
            {t.quoteAuthor}
          </footer>
        </motion.blockquote>
      </main>

      {/* ───── Footer ───── */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} FormatterHub.{" "}
            {language === "es"
              ? "Todos los derechos reservados."
              : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
}
