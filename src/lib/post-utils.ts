// Browser-safe post types and helpers (no `fs`), shared by server and client components.

export type PostMeta = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  category: string;
  date: string;
  updated?: string;
  image: string;
  /** Real photo used on cards; falls back to the pin image */
  cover: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  pinDescription?: string;
  featured?: boolean;
  tags: string[];
  readingMinutes: number;
};

export function postUrl(post: Pick<PostMeta, "category" | "slug">) {
  return `/${post.category}/${post.slug}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
