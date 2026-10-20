import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { getCategory } from "./site";
import type { PostMeta } from "./post-utils";

export { formatDate, postUrl, type PostMeta } from "./post-utils";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type TocItem = { id: string; text: string };

export type Post = PostMeta & {
  html: string;
  toc: TocItem[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&amp;|&/g, "and")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function decodeEntities(text: string) {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function render(markdown: string) {
  const toc: TocItem[] = [];
  const marked = new Marked({
    renderer: {
      heading({ tokens, depth, text }) {
        const inner = this.parser.parseInline(tokens);
        const id = slugify(text);
        if (depth === 2) toc.push({ id, text: decodeEntities(inner.replace(/<[^>]+>/g, "")).replace(/^\d+\.\s*/, "") });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
    },
  });
  const html = marked.parse(markdown, { async: false });
  return { html, toc };
}

function readFile(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const { html, toc } = render(content);
  const words = content.split(/\s+/).filter(Boolean).length;

  if (!getCategory(data.category)) {
    throw new Error(`Post "${file}" has unknown category "${data.category}"`);
  }

  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    seoTitle: data.seoTitle,
    description: data.description,
    category: data.category,
    date: new Date(data.date).toISOString(),
    updated: data.updated ? new Date(data.updated).toISOString() : undefined,
    image: data.image,
    cover: data.cover ?? data.image,
    imageAlt: data.imageAlt,
    imageWidth: data.imageWidth,
    imageHeight: data.imageHeight,
    pinDescription: data.pinDescription,
    featured: Boolean(data.featured),
    tags: data.tags ?? [],
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html,
    toc,
  };
}

let cache: Post[] | null = null;

function loadAll(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  cache = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readFile)
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

function toMeta(post: Post): PostMeta {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { html, toc, ...meta } = post;
  return meta;
}

export function getAllPosts(): PostMeta[] {
  return loadAll().map(toMeta);
}

export function getPost(category: string, slug: string): Post | undefined {
  return loadAll().find((p) => p.slug === slug && p.category === category);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPosts(): PostMeta[] {
  const all = getAllPosts();
  const featured = all.filter((p) => p.featured);
  return featured.length ? featured : all.slice(0, 6);
}

export function getRelatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const score = (p: PostMeta) =>
    (p.category === post.category ? 10 : 0) +
    p.tags.filter((t) => post.tags.includes(t)).length;
  return others.sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export const PER_PAGE = 9;

export function getTotalPages() {
  return Math.max(1, Math.ceil(getAllPosts().length / PER_PAGE));
}

export function getPostsPage(page: number): PostMeta[] {
  return getAllPosts().slice((page - 1) * PER_PAGE, page * PER_PAGE);
}
