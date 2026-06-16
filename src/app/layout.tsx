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

const BASE_URL = "https://formatter-hub.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "FormatterHub - Developer Formatting Tools",
    description:
      "Fast, free and privacy-friendly formatting utilities for developers. All processing happens in your browser.",
    type: "website",
    url: BASE_URL,
    siteName: "FormatterHub",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/favicon.svg`,
        width: 512,
        height: 512,
        alt: "FormatterHub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FormatterHub - Developer Formatting Tools",
    description:
      "Fast, free and privacy-friendly formatting utilities for developers. All processing happens in your browser.",
    images: [`${BASE_URL}/favicon.svg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FormatterHub",
  url: BASE_URL,
  description:
    "Fast, free and privacy-friendly formatting utilities for developers. JSON, XML, YAML, Base64, Password tools — all client-side.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
