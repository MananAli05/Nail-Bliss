import Script from "next/script";
import { adsenseClient } from "@/lib/ads";
import { getAllPosts, postUrl } from "@/lib/posts";
import { getCategory } from "@/lib/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Public site frame: header, footer and ads. The admin panel renders without it. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  );
}
