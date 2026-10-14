import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { getAllPosts, getPostsByCategory, postUrl } from "@/lib/posts";
import { absoluteUrl, categories, getCategory, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name}: Ideas, Tips & Inspiration`,
    description: category.description,
    alternates: { canonical: `/${category.slug}` },
    openGraph: {
      title: `${category.name} | ${site.name}`,
      description: category.description,
      url: `/${category.slug}`,
      images: [{ url: category.image, alt: category.imageAlt }],
    },
  };
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const posts = getPostsByCategory(category.slug);
  const elsewhere = posts.length ? [] : getAllPosts().slice(0, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.description,
          url: absoluteUrl(`/${category.slug}`),
          hasPart: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: absoluteUrl(postUrl(p)) })),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: category.name, href: `/${category.slug}` }]} />

        <header className="mt-6 grid items-center gap-8 overflow-hidden rounded-3xl bg-white ring-1 ring-line md:grid-cols-[1fr_1.1fr]">
          <div className="order-2 p-6 sm:p-10 md:order-1">
            <p className="eyebrow">Category</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-none text-plum sm:text-6xl">{category.name}</h1>
            <p className="mt-5 max-w-md leading-relaxed text-muted">{category.intro}</p>
            {posts.length > 0 && (
              <p className="mt-6 text-sm font-medium text-ink/70">
                {posts.length} {posts.length === 1 ? "article" : "articles"}
              </p>
            )}
          </div>
          <div className="relative order-1 aspect-[16/10] md:order-2 md:aspect-auto md:h-full md:min-h-80">
            <Image src={category.image} alt={category.imageAlt} fill preload sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
          </div>
        </header>

        <nav aria-label="Categories" className="-mx-4 mt-8 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <ul className="flex gap-2">
            {categories.map((c) => (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={`/${c.slug}`}
                  aria-current={c.slug === category.slug ? "page" : undefined}
                  className={`inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-medium transition ${
                    c.slug === category.slug ? "bg-plum text-white" : "bg-white text-ink/75 ring-1 ring-line hover:text-plum hover:ring-rose"
                  }`}
                >
                  <Image src={c.image} alt="" width={28} height={28} className="size-7 rounded-full object-cover" />
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <>
            <div className="mt-10 rounded-2xl border border-dashed border-rose bg-white/60 px-6 py-8 text-center">
              <p className="font-display text-2xl font-semibold text-plum">New {category.name.toLowerCase()} posts are on the way</p>
              <p className="mt-2 text-sm text-muted">In the meantime, here are some reader favorites.</p>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {elsewhere.map((p) => (
                <PostCard key={p.slug} post={p} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
              ))}
            </div>
          </>
        )}

        <AdSlot label="Category — bottom" className="mt-12" />
      </div>
    </>
  );
}
