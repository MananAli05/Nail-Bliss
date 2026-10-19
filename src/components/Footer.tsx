import Link from "next/link";
import { categories, site } from "@/lib/site";
import { Logo } from "./Logo";
import { PinterestIcon } from "./icons";

const company = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.6fr_1fr_0.8fr_0.8fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 font-display text-[1.05rem] leading-relaxed text-muted">
            Daily nail designs, nail art ideas, nail shapes and nail care tips, written in simple language so anyone
            can try them at home.
          </p>
          <a
            href={site.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e60023] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <PinterestIcon className="size-4" />
            Follow on Pinterest
          </a>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">Categories</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="inline-flex items-center gap-2.5 text-ink/80 transition hover:text-plum">
                  <span aria-hidden className="size-2 rounded-full" style={{ background: c.color }} />
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">Company</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink/80 transition hover:text-plum">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">Legal</h2>
          <ul className="mt-4 space-y-3 text-sm">
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

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-ink">
              © {year} {site.name}. All rights reserved.
            </p>
            <a href="#" className="text-sm font-semibold text-plum underline underline-offset-4">
              Back to top
            </a>
          </div>
          <p className="mt-3 max-w-3xl font-display text-[0.98rem] leading-relaxed text-muted">
            All articles and images on this website are protected by copyright. Copying or republishing without written
            permission is not allowed. The information here is for general inspiration only and is not a substitute for
            advice from a nail professional or dermatologist.
          </p>
        </div>
      </div>
    </footer>
  );
}
