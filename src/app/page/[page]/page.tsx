import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Pagination } from "@/components/Pagination";
import { PostCard } from "@/components/PostCard";
import { getPostsPage, getTotalPages } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: getTotalPages() - 1 }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: PageProps<"/page/[page]">): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Latest Nail Articles: Page ${page}`,
    alternates: { canonical: `/page/${page}` },
  };
}

export default async function ArchivePage({ params }: PageProps<"/page/[page]">) {
  const page = Number((await params).page);
  const total = getTotalPages();
  if (!Number.isInteger(page) || page < 2 || page > total) notFound();
  const posts = getPostsPage(page);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <AdSlot label="Top" className="mx-auto mt-6 max-w-3xl" />
      <section className="mt-10">
        <h1 className="font-display text-4xl font-bold text-ink">
          Latest articles <span className="text-2xl font-semibold text-muted">· Page {page}</span>
        </h1>
        <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        <Pagination current={page} total={total} />
      </section>
      <AdSlot label="Bottom" className="mx-auto mt-12 max-w-3xl" />
    </div>
  );
}
