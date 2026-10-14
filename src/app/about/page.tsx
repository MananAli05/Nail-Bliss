import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { categories, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Nail Bliss, a nail inspiration blog sharing nail designs, nail art ideas, nail shapes and nail care tips.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <StaticPage title="About" script="Nail Bliss" path="/about">
      <p>
        Hi, and welcome to <strong>{site.name}</strong>! We&apos;re a nail-obsessed corner of the internet
        made for anyone who has ever saved a manicure photo and thought, <em>&ldquo;I need these nails.&rdquo;</em>
      </p>
      <p>
        What started as a Pinterest board full of pretty nails has grown into a community of nail lovers
        across the USA and beyond. This blog is where we go deeper than a single pin: real tips, clear
        step-by-step guides and honest advice that actually helps your manicure look better and last longer.
      </p>
      <h2>What you&apos;ll find here</h2>
      <ul>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/${c.slug}`}>{c.name}</Link>: {c.short.toLowerCase()}.
          </li>
        ))}
      </ul>
      <h2>Our promise</h2>
      <p>
        Every post is written to be genuinely useful, whether you&apos;re doing your nails at home on a
        Sunday night or bringing inspiration to your next salon appointment. We keep things simple,
        friendly and beginner-safe, and we update posts when we learn something better.
      </p>
      <p>
        Have a question or a nail design you&apos;d love to see? <Link href="/contact">Say hello</Link>, we
        read every message.
      </p>
    </StaticPage>
  );
}
