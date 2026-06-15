import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FormatterHub - Developer Formatting Tools",
  description:
    "Fast, free and privacy-friendly formatting utilities for developers. JSON, XML, YAML, Base64, Password tools — all client-side.",
  keywords: [
    "formatter",
    "json formatter",
    "xml formatter",
    "yaml converter",
    "base64 encoder",
    "password generator",
    "developer tools",
    "privacy",
    "client-side",
  ],
  authors: [{ name: "FormatterHub" }],
  openGraph: {
    title: "FormatterHub - Developer Formatting Tools",
    description:
      "Fast, free and privacy-friendly formatting utilities for developers. All processing happens in your browser.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
