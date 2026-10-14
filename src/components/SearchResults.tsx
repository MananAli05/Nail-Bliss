"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/post-utils";
import { PostCard } from "./PostCard";
import { Search } from "lucide-react";

type SearchablePost = PostMeta & { categoryName: string };

export function SearchResults({ posts }: { posts: SearchablePost[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") ?? "");

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return posts;
    return posts.filter((p) => {
      const hay = [p.title, p.description, p.categoryName, ...p.tags].join(" ").toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [posts, query]);

  return (
    <>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.replace(query ? `/search?q=${encodeURIComponent(query)}` : "/search", { scroll: false });
        }}
        className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 shadow-soft ring-1 ring-line focus-within:ring-rose"
      >
        <Search className="size-5 shrink-0 text-rose-deep" strokeWidth={1.75} />
        <label htmlFor="q" className="sr-only">
          Search
        </label>
        <input
          id="q"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “almond”, “french tip” or “chipping”"
          className="w-full bg-transparent py-2 text-base outline-none placeholder:text-muted/70"
        />
        <button className="rounded-full bg-plum px-5 py-2.5 text-sm font-medium text-white hover:bg-plum-deep">Search</button>
      </form>

      <p className="mt-6 text-center text-sm text-muted" aria-live="polite">
        {query ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${query}”` : `${posts.length} posts`}
      </p>

      {results.length > 0 ? (
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-12 max-w-md text-center">
          <p className="font-script text-5xl text-rose-deep">Oh no!</p>
          <p className="mt-3 text-muted">Nothing matched that search. Try a simpler word, like “pink” or “short”.</p>
        </div>
      )}
    </>
  );
}
