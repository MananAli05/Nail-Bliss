"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/site";
import { HeaderSearch, type SearchItem } from "./HeaderSearch";
import { Logo } from "./Logo";

const nav = [
  { href: "/", label: "Home", color: "#e89ab2" },
  ...categories.map((c) => ({ href: `/${c.slug}`, label: c.name, color: c.color })),
];

export function Header({ posts }: { posts: SearchItem[] }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-5">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <Logo />
          <HeaderSearch posts={posts} />
        </div>

        <nav aria-label="Categories" className="-mx-4 mt-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
          <ul className="flex gap-2">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-plum bg-plum text-white"
                        : "border-line bg-white text-ink hover:border-rose hover:bg-blush"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="size-2 rounded-full"
                      style={{ background: active ? "#fff" : item.color }}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
