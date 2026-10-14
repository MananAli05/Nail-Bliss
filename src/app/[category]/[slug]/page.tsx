import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PinButton } from "@/components/PinButton";
import { PostCard } from "@/components/PostCard";
import { ArrowRight, Clock } from "lucide-react";
import { formatDate, getAllPosts, getPost, getPostsByCategory, getRelatedPosts, postUrl } from "@/lib/posts";
import { absoluteUrl, categories, getCategory, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) return {};
  const url = postUrl(post);
  return {
    title: post.seoTitle ?? post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.seoTitle ?? post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: getCategory(post.category)?.name,
      tags: post.tags,
      images: [{ url: post.image, width: post.imageWidth, height: post.imageHeight, alt: post.imageAlt }],
    },
  };
}

/** Puts an in-article ad just before the second H2, so it lands after the intro + first section. */
function splitForAd(html: string): [string, string] {
  const first = html.indexOf("<h2");
  const second = first === -1 ? -1 : html.indexOf("<h2", first + 3);
  if (second === -1) return [html, ""];
  return [html.slice(0, second), html.slice(second)];
}

export default async function PostPage({ params }: PageProps<"/[category]/[slug]">) {
  const { category: categorySlug, slug } = await params;
  const post = getPost(categorySlug, slug);
  if (!post) notFound();
  const category = getCategory(post.category)!;
  const url = postUrl(post);
  const related = getRelatedPosts(post, 3);
  const popular = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 4);
  const [before, after] = splitForAd(post.html);
  const pinText = post.pinDescription ?? post.title;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: [absoluteUrl(post.image)],
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          mainEntityOfPage: absoluteUrl(url),
          articleSection: category.name,
          keywords: post.tags.join(", "),
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: category.name, href: `/${category.slug}` }, { name: post.title, href: url }]} />

        <header className="mx-auto mt-10 max-w-3xl text-center">
          <Link href={`/${category.slug}`} className="inline-block rounded-full bg-petal px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-plum transition hover:bg-rose/50">
            {category.name}
          </Link>
          <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.02] text-plum sm:text-6xl">{post.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden className="text-rose">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" strokeWidth={1.75} />
              {post.readingMinutes} min read
            </span>
          </div>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-16">
          <article className="min-w-0">
            {/* Pin image */}
            <figure className="group relative mx-auto max-w-xl">
              <div className="overflow-hidden rounded-[2rem] shadow-lift ring-8 ring-white">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  width={post.imageWidth}
                  height={post.imageHeight}
                  preload
                  sizes="(min-width: 640px) 576px, 100vw"
                  quality={85}
                  className="h-auto w-full"
                />
              </div>
              <PinButton url={url} image={post.image} description={pinText} className="absolute right-5 top-5" />
              <figcaption className="mt-4 text-center text-sm text-muted">
                <span className="font-script text-2xl text-rose-deep">Save this pin</span> for your next manicure
              </figcaption>
            </figure>

            {post.toc.length > 2 && (
              <nav aria-label="Table of contents" className="mx-auto mt-12 max-w-2xl rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
                <p className="font-display text-2xl font-semibold text-plum">In this post</p>
                <ol className="mt-4 grid gap-2 text-[0.95rem] sm:grid-cols-2 sm:gap-x-8">
                  {post.toc.map((t, i) => (
                    <li key={t.id} className="flex gap-3">
                      <span className="font-display text-lg leading-6 text-rose-deep">{String(i + 1).padStart(2, "0")}</span>
                      <a href={`#${t.id}`} className="leading-6 text-ink/80 transition hover:text-plum">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="mx-auto mt-10 max-w-2xl">
              <div className="article" dangerouslySetInnerHTML={{ __html: before }} />
              {after && (
                <>
                  <AdSlot label="In-article" className="my-10" />
                  <div className="article" dangerouslySetInnerHTML={{ __html: after }} />
                </>
              )}

              {post.tags.length > 0 && (
                <ul className="mt-12 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <li key={t}>
                      <Link
                        href={`/search?q=${encodeURIComponent(t)}`}
                        className="inline-block rounded-full bg-white px-3.5 py-1.5 text-xs text-ink/70 ring-1 ring-line transition hover:text-plum hover:ring-rose"
                      >
                        #{t}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* Save-for-later card */}
              <div className="mt-12 flex flex-col items-center gap-6 rounded-[2rem] bg-gradient-to-br from-petal via-white to-lavender p-6 text-center ring-1 ring-line sm:flex-row sm:p-8 sm:text-left">
                <Image
                  src={post.image}
                  alt=""
                  width={post.imageWidth}
                  height={post.imageHeight}
                  sizes="112px"
                  className="w-28 shrink-0 rounded-2xl object-cover shadow-soft"
                />
                <div>
                  <p className="font-display text-2xl font-semibold text-plum">Loved these ideas?</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Save this post to your Pinterest board so you can find it again before your next nail appointment.
                  </p>
                  <PinButton url={url} image={post.image} description={pinText} label="Save to Pinterest" className="mt-4" />
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
              <div className="relative aspect-[16/9]">
                <Image src={categories[1].image} alt="" fill sizes="300px" className="object-cover" />
              </div>
              <div className="p-6">
                <p className="font-display text-2xl font-semibold text-plum">Welcome to Nail Bliss</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Nail designs, step-by-step nail art and simple nail care tips for real life, from our Pinterest boards
                  to your next manicure.
                </p>
                <Link href="/about" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
                  More about us <ArrowRight className="size-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>

            <AdSlot label="Sidebar" className="min-h-[250px]" />

            <div className="rounded-3xl bg-white p-6 ring-1 ring-line">
              <p className="eyebrow">Categories</p>
              <ul className="mt-4 space-y-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}`}
                      className={`flex items-center gap-3 rounded-xl px-2 py-2 text-sm transition hover:bg-petal ${c.slug === category.slug ? "bg-petal text-plum" : "text-ink/80"}`}
                    >
                      <Image src={c.image} alt="" width={36} height={36} className="size-9 rounded-full object-cover" />
                      <span className="flex-1">{c.name}</span>
                      <span className="text-xs text-muted">{getPostsByCategory(c.slug).length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {popular.length > 0 && (
              <div className="rounded-3xl bg-white p-6 ring-1 ring-line">
                <p className="eyebrow">Popular right now</p>
                <ul className="mt-4 space-y-4">
                  {popular.map((p) => (
                    <li key={p.slug}>
                      <Link href={postUrl(p)} className="group flex gap-3">
                        <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                          <Image src={p.cover} alt="" fill sizes="64px" className="object-cover" />
                        </span>
                        <span className="font-display text-[1.05rem] font-semibold leading-snug text-plum group-hover:underline group-hover:decoration-rose">
                          {p.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-center">Keep reading</p>
          <h2 className="mt-2 text-center font-display text-4xl font-medium text-plum sm:text-5xl">
            You&apos;ll also <span className="font-script font-normal text-rose-deep">love</span>
          </h2>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
