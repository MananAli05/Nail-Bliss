import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { PinCard } from "@/components/PinCard";
import { PostCard } from "@/components/PostCard";
import { SectionHeading } from "@/components/SectionHeading";
import { PinterestIcon } from "@/components/icons";
import { formatDate, getAllPosts, getFeaturedPosts, getPostsByCategory, postUrl } from "@/lib/posts";
import { categories, getCategory, site } from "@/lib/site";

export default function HomePage() {
  const all = getAllPosts();
  const featured = getFeaturedPosts();
  const lead = featured[0] ?? all[0];
  const trending = all.filter((p) => p.slug !== lead?.slug).slice(0, 3);
  const leadCategory = lead && getCategory(lead.category);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          description: site.description,
          potentialAction: {
            "@type": "SearchAction",
            target: `${site.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />

      <div className="border-b border-line bg-white/60">
        <h1 className="mx-auto max-w-7xl px-4 py-3 text-center text-[0.8rem] tracking-wide text-muted sm:px-6 lg:px-8">
          Nail designs, nail art ideas &amp; nail care tips, updated every week
        </h1>
      </div>

      {/* ---------- Lead story + trending ---------- */}
      {lead && (
        <section className="mx-auto grid max-w-7xl gap-10 px-4 pt-8 sm:px-6 lg:grid-cols-[1.55fr_1fr] lg:gap-12 lg:px-8 lg:pt-12">
          <article className="group">
            <Link href={postUrl(lead)} className="relative block aspect-[4/3] overflow-hidden rounded-3xl bg-petal sm:aspect-[16/11]">
              <Image
                src={lead.cover}
                alt={lead.imageAlt}
                fill
                preload
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-plum">
                Editor&apos;s pick
              </span>
            </Link>
            <div className="mt-6 max-w-2xl">
              <p className="text-xs text-muted">
                {leadCategory && (
                  <Link href={`/${leadCategory.slug}`} className="eyebrow mr-2 hover:text-plum">
                    {leadCategory.name}
                  </Link>
                )}
                <time dateTime={lead.date}>{formatDate(lead.date)}</time>
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-plum sm:text-5xl">
                <Link href={postUrl(lead)} className="hover:underline hover:decoration-rose hover:decoration-2 hover:underline-offset-8">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">{lead.description}</p>
              <Link
                href={postUrl(lead)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-plum"
              >
                Read the full post
                <ArrowRight className="size-4 transition group-hover:translate-x-1" strokeWidth={1.75} />
              </Link>
            </div>
          </article>

          <aside>
            <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-plum">
              Trending now
              <span className="h-px flex-1 bg-line" />
            </h2>
            <ol className="mt-2 divide-y divide-line">
              {trending.map((p) => {
                const c = getCategory(p.category);
                return (
                  <li key={p.slug}>
                    <Link href={postUrl(p)} className="group flex gap-4 py-5">
                      <span className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-petal sm:size-28">
                        <Image src={p.cover} alt="" fill sizes="112px" className="object-cover transition duration-500 group-hover:scale-105" />
                      </span>
                      <span>
                        <span className="eyebrow">{c?.name}</span>
                        <span className="mt-1 block font-display text-xl font-semibold leading-snug text-plum group-hover:underline group-hover:decoration-rose">
                          {p.title}
                        </span>
                        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                          <Clock className="size-3.5" strokeWidth={1.75} />
                          {p.readingMinutes} min read
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>

            <div className="mt-4 flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e60023] text-white">
                <PinterestIcon className="size-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink">Find us on Pinterest</p>
                <p className="text-xs text-muted">New nail ideas pinned daily</p>
              </div>
              <a
                href={site.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-plum px-4 py-2 text-xs font-semibold text-white hover:bg-plum-deep"
              >
                Follow
              </a>
            </div>
          </aside>
        </section>
      )}

      {/* ---------- Categories ---------- */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Explore" title="Browse by category" />
        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {categories.map((c) => {
            const count = getPostsByCategory(c.slug).length;
            return (
              <li key={c.slug} className="w-[44%] shrink-0 snap-start sm:w-auto">
                <Link href={`/${c.slug}`} className="group block">
                  <span className="relative block aspect-[3/4] overflow-hidden rounded-2xl bg-petal">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 44vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span className="mt-3 block font-display text-xl font-semibold leading-tight text-plum group-hover:underline group-hover:decoration-rose sm:text-2xl">
                    {c.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {count > 0 ? `${count} ${count === 1 ? "article" : "articles"}` : c.short}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------- Latest ---------- */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Fresh on the blog" title="Latest posts" href="/search" linkLabel="All posts" />
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {all.slice(0, 8).map((p) => (
            <PostCard key={p.slug} post={p} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      </section>

      <div className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <AdSlot label="Home — between sections" />
      </div>

      {/* ---------- Pins ---------- */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Save for later" title="Most saved pins" />
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Our printable-style nail guides, made for Pinterest. Tap any pin to read the full post, or hit Save to
          keep it on your board.
        </p>
        <div className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {featured.map((p) => (
            <PinCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* ---------- Pinterest band ---------- */}
      <section className="mt-20 bg-plum text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-rose">Join us on Pinterest</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-tight sm:text-5xl">
              Your next manicure is one pin away
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/75">
              Follow Nail Bliss for fresh nail designs, seasonal color ideas and easy at-home tutorials, pinned every
              day.
            </p>
            <a
              href={site.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-plum transition hover:bg-petal"
            >
              <PinterestIcon className="size-4 text-[#e60023]" />
              Follow on Pinterest
            </a>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {categories.slice(1, 4).map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 17vw, 33vw" className="object-cover transition duration-700 hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
