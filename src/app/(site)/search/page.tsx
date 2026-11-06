import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/components/SearchResults";
import { getAllPosts } from "@/lib/posts";
import { getCategory } from "@/lib/site";

export const metadata: Metadata = {
  title: "Search Nail Ideas",
  description: "Search Nail Bliss for nail designs, nail art ideas, nail shapes and nail care tips.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const posts = getAllPosts().map((p) => ({
    ...p,
    categoryName: getCategory(p.category)?.name ?? "",
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <p className="eyebrow text-center">Search</p>
      <h1 className="mt-2 text-center font-display text-5xl font-medium text-plum sm:text-6xl">
        Find your <span className="font-script font-normal text-rose-deep">next</span> nails
      </h1>
      <Suspense>
        <SearchResults posts={posts} />
      </Suspense>
    </div>
  );
}
