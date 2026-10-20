import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, DM_Sans, Pinyon_Script } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCategory, site } from "@/lib/site";
import { getAllPosts, postUrl } from "@/lib/posts";
import { adsenseClient } from "@/lib/ads";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  other: process.env.NEXT_PUBLIC_PINTEREST_VERIFY
    ? { "p:domain_verify": process.env.NEXT_PUBLIC_PINTEREST_VERIFY }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#fdf4f6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${pinyon.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header
          posts={getAllPosts().map((p) => ({
            title: p.title,
            href: postUrl(p),
            cover: p.cover,
            category: getCategory(p.category)?.name ?? "",
            keywords: p.tags.join(" "),
          }))}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {adsenseClient && (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        )}
      </body>
    </html>
  );
}
