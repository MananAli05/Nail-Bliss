import type { Metadata } from "next";
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
  const elsewhere = posts.length ? [] : getAllPosts().slice(0, 3);

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

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Breadcrumbs items={[{ name: category.name, href: `/${category.slug}` }]} />

        <header className="mt-6 border-b border-line pb-8">
          <h1 className="flex items-center gap-3 font-display text-4xl font-bold text-ink sm:text-5xl">
            <span aria-hidden className="size-3 rounded-full" style={{ background: category.color }} />
            {category.name}
          </h1>
          <p className="mt-3 max-w-2xl font-display text-lg leading-relaxed text-muted">{category.intro}</p>
        </header>

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {elsewhere.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </>
        )}

        <AdSlot label="Category — bottom" className="mt-12" />
      </div>
    </>
  );
}
