import { ADSENSE_SRC } from "@/lib/ads";
import { getAllPosts, postUrl } from "@/lib/posts";
import { getCategory } from "@/lib/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const searchItems = getAllPosts().map((p) => ({
    title: p.title,
    href: postUrl(p),
    cover: p.cover,
    category: getCategory(p.category)?.name ?? "",
    keywords: p.tags.join(" "),
  }));

  return (
    <>
      <script async src={ADSENSE_SRC} crossOrigin="anonymous" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header posts={searchItems} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
