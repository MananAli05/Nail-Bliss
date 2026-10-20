"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";

export type SearchItem = { title: string; href: string; cover: string; category: string; keywords: string };

/** Header search with live post suggestions (replaces the browser's autofill list). */
export function HeaderSearch({ posts }: { posts: SearchItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [lastPath, setLastPath] = useState(pathname);
  const boxRef = useRef<HTMLFormElement>(null);

  // Reset after navigating
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setQuery("");
  }

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return posts
      .filter((p) => {
        const hay = `${p.title} ${p.category} ${p.keywords}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
      .slice(0, 5);
  }, [posts, query]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const showList = open && query.trim().length > 0;

  return (
    <form
      ref={boxRef}
      action="/search"
      role="search"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        if (active >= 0 && results[active]) router.push(results[active].href);
        else router.push(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search");
        setOpen(false);
      }}
      className="relative flex w-full items-center gap-2 sm:w-auto"
    >
      <label htmlFor="header-search" className="sr-only">
        Search articles
      </label>
      <div className="flex flex-1 items-center gap-2 rounded-full bg-blush px-4 ring-1 ring-line transition focus-within:bg-white focus-within:ring-2 focus-within:ring-rose sm:w-80">
        <Search className="size-4 shrink-0 text-muted" strokeWidth={1.75} />
        <input
          id="header-search"
          type="search"
          name="q"
          value={query}
          autoComplete="off"
          spellCheck={false}
          role="combobox"
          aria-expanded={showList}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => Math.min(i + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => Math.max(i - 1, -1));
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search nail ideas…"
          className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted/70 focus-visible:outline-none [&::-webkit-search-cancel-button]:cursor-pointer"
        />
      </div>
      <button className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-plum-deep">
        Search
      </button>

      {showList && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-line"
        >
          {results.length > 0 ? (
            <ul>
              {results.map((p, i) => (
                <li key={p.href} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      router.push(p.href);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition ${i === active ? "bg-blush" : ""}`}
                  >
                    <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-petal">
                      <Image src={p.cover} alt="" fill sizes="44px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-rose-deep">{p.category}</span>
                      <span className="block truncate text-sm font-medium text-ink">{p.title}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-muted">No posts match “{query}”.</p>
          )}
          <button
            type="submit"
            className="block w-full border-t border-line px-4 py-2.5 text-left text-sm font-semibold text-plum hover:bg-blush"
          >
            See all results for “{query.trim()}”
          </button>
        </div>
      )}
    </form>
  );
}
