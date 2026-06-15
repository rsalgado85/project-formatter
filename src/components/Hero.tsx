"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    } as const,
  },
} as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/5 via-transparent to-transparent blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl px-4 sm:px-6 py-24 sm:py-32 lg:py-40 text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Developer Formatting Tools
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-xl font-medium text-muted-foreground sm:text-2xl"
        >
          That Just Work
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          Fast, free and privacy-friendly formatting utilities for developers.
          All processing happens in your browser — nothing leaves your machine.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <a
            href="#tools"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore Tools
          </a>
          <a
            href="/donate"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            Support Us
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
