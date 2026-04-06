import type { Metadata } from "next";
import { Rubik_Mono_One, Space_Grotesk, Fraunces, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { SearchDialog } from "@/components/search-dialog";
import { getAllPostMeta } from "@/lib/posts";
import "./globals.css";

const display = Rubik_Mono_One({
  variable: "--font-display-var",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const heading = Space_Grotesk({
  variable: "--font-heading-var",
  subsets: ["latin"],
  display: "swap",
});

const body = Fraunces({
  variable: "--font-body-var",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://blog.itsblakeyeon.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "blake — streetwise thinking about products",
    template: "%s · blake",
  },
  description:
    "Blake's blog. Essays and notes on work, product, business, brand, and AI.",
  openGraph: {
    title: "blake",
    description: "Streetwise thinking about products.",
    url: SITE_URL,
    siteName: "blake",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "blake",
    description: "Streetwise thinking about products.",
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: "blake — RSS" }],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const posts = getAllPostMeta();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${heading.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          {children}
          <SearchDialog posts={posts} />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
