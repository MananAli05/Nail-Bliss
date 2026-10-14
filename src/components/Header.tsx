"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/lib/site";
import { Logo } from "./Logo";
import { House, Menu, Search, X } from "lucide-react";

const nav: { href: string; label: string; image?: string }[] = [
  { href: "/", label: "Home" },
  ...categories.map((c) => ({ href: `/${c.slug}`, label: c.name, image: c.image })),
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close menus after navigating
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background,box-shadow] duration-300 ${
        scrolled || open ? "bg-white/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-blush/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-3 py-2 text-[0.82rem] font-medium tracking-wide transition-colors ${
                    isActive(item.href) ? "bg-petal text-plum" : "text-ink/80 hover:bg-petal/60 hover:text-plum"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            aria-expanded={searchOpen}
            className="grid size-10 place-items-center rounded-full text-plum transition hover:bg-petal"
          >
            <Search className="size-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full text-plum transition hover:bg-petal lg:hidden"
          >
            {open ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-line bg-white/95 backdrop-blur-md">
          <form action="/search" className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
            <Search className="size-5 shrink-0 text-rose-deep" strokeWidth={1.75} />
            <input
              autoFocus
              type="search"
              name="q"
              placeholder="Search nail designs, shapes, tips…"
              className="w-full bg-transparent py-2 text-base outline-none placeholder:text-muted/70"
            />
            <button className="rounded-full bg-plum px-5 py-2 text-sm font-medium text-white transition hover:bg-plum-deep">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-white transition-[opacity,visibility] duration-300 sm:top-20 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="px-6 pb-10 pt-6">
          <ul className="divide-y divide-line">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 py-3 font-display text-2xl ${
                    isActive(item.href) ? "text-plum" : "text-ink"
                  }`}
                >
                  {item.image ? (
                    <Image src={item.image} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                  ) : (
                    <span className="grid size-12 place-items-center rounded-full bg-petal text-plum"><House className="size-5" strokeWidth={1.75} /></span>
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
