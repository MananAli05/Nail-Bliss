import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { CategoryBadge } from "@/components/CategoryBadge";
import { JsonLd } from "@/components/JsonLd";
import { Pagination } from "@/components/Pagination";
import { PostCard } from "@/components/PostCard";
import { PinterestIcon } from "@/components/icons";
import { formatDate, getAllPosts, getFeaturedPosts, getPostsPage, getTotalPages, postUrl } from "@/lib/posts";
import { getCategory, site } from "@/lib/site";

export default function HomePage() {
  const all = getAllPosts();
  const featured = getFeaturedPosts();
  const lead = featured[0] ?? all[0];
  const side = all.filter((p) => p.slug !== lead?.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
      <h1 className="sr-only">{`${site.name}: nail designs, nail art ideas & nail care tips`}</h1>

      <AdSlot label="Top" className="mx-auto mt-6 max-w-3xl" />

      {/* ---------- Featured ---------- */}
      {lead && (
        <section aria-label="Featured" className="mt-8 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          <article className="group overflow-hidden rounded-2xl bg-plum">
            <Link href={postUrl(lead)} tabIndex={-1} aria-hidden className="relative block aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
              <Image
                src={lead.cover}
                alt={lead.imageAlt}
                fill
                preload
                sizes="(min-width: 1024px) 680px, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
              />
            </Link>
            <div className="p-6 sm:p-7">
              <CategoryBadge slug={lead.category} inverted />
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] text-white sm:text-[2.6rem]">
                <Link href={postUrl(lead)} className="hover:underline hover:decoration-rose hover:underline-offset-4">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-3 line-clamp-3 font-display text-lg leading-relaxed text-white/80">{lead.description}</p>
              <p className="mt-4 flex gap-4 text-xs font-medium text-white/70">
                <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                <span>{lead.readingMinutes} min read</span>
              </p>
            </div>
          </article>

          <div>
            <ul className="divide-y divide-line">
              {side.map((p) => (
                <li key={p.slug} className="flex gap-4 py-4 first:pt-0">
                  <Link href={postUrl(p)} tabIndex={-1} aria-hidden className="shrink-0 overflow-hidden rounded-lg">
                    <span className="relative block size-28">
                      <Image src={p.cover} alt="" fill sizes="112px" className="object-cover" />
                    </span>
                    <span className="block h-1" style={{ background: getCategory(p.category)?.color }} />
                  </Link>
                  <div>
                    <CategoryBadge slug={p.category} />
                    <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink">
                      <Link href={postUrl(p)} className="hover:text-plum hover:underline hover:decoration-rose">
                        {p.title}
                      </Link>
                    </h3>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={site.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-3 rounded-xl bg-white p-4 ring-1 ring-line transition hover:ring-rose"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e60023] text-white">
                <PinterestIcon className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-ink">Follow Nail Bliss on Pinterest</span>
                <span className="block text-xs text-muted">New nail ideas pinned every day</span>
              </span>
            </a>

            <AdSlot label="Featured side" className="mt-6" />
          </div>
        </section>
      )}

      {/* ---------- Latest ---------- */}
      <section className="mt-16">
        <h2 className="font-display text-4xl font-bold text-ink">Latest articles</h2>
        <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {getPostsPage(1).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        <Pagination current={1} total={getTotalPages()} />
      </section>

      <AdSlot label="Bottom" className="mx-auto mt-16 max-w-3xl" />
    </div>
  );
}
