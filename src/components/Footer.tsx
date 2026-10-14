import Link from "next/link";
import { categories, site } from "@/lib/site";
import { Logo } from "./Logo";
import { PinterestIcon } from "./icons";

const legal = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Nail designs, nail art ideas and simple nail care tips to keep your hands looking
            beautiful every single day.
          </p>
          <a
            href={site.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e60023] px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
          >
            <PinterestIcon className="size-4" />
            Follow on Pinterest
          </a>
        </div>

        <div>
          <h2 className="eyebrow">Categories</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="text-ink/80 transition hover:text-plum">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow">Nail Bliss</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink/80 transition hover:text-plum">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Oversized wordmark, as in the design reference */}
      <div aria-hidden className="select-none px-2 text-center">
        <span className="block bg-gradient-to-b from-petal to-white bg-clip-text whitespace-nowrap font-display text-[15.5vw] font-semibold uppercase leading-[0.8] tracking-[0.02em] text-transparent">
          Nail Bliss
        </span>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="font-script text-xl text-rose-deep">Healthy nails are always in style</p>
        </div>
      </div>
    </footer>
  );
}
