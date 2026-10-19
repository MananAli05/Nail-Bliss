import Image from "next/image";
import Link from "next/link";
import { formatDate, type PostMeta, postUrl } from "@/lib/post-utils";
import { getCategory } from "@/lib/site";
import { CategoryBadge } from "./CategoryBadge";

/** Article card: large clear image with category-colored underline, badge, title, excerpt, date. */
export function PostCard({
  post,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw",
}: {
  post: PostMeta;
  sizes?: string;
}) {
  const href = postUrl(post);
  const color = getCategory(post.category)?.color;

  return (
    <article className="group">
      <Link href={href} className="block overflow-hidden rounded-xl bg-petal" tabIndex={-1} aria-hidden>
        <span className="relative block aspect-[4/3]">
          <Image
            src={post.cover}
            alt={post.imageAlt}
            fill
            sizes={sizes}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </span>
        <span className="block h-1.5" style={{ background: color }} />
      </Link>
      <div className="pt-4">
        <CategoryBadge slug={post.category} />
        <h3 className="mt-3 font-display text-[1.6rem] font-bold leading-[1.1] text-ink">
          <Link href={href} className="transition hover:text-plum">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 font-display text-[1.08rem] leading-relaxed text-muted">
          {post.description}{" "}
          <Link href={href} className="font-sans text-sm font-semibold text-plum hover:underline">
            Read on…
          </Link>
        </p>
        <p className="mt-3 flex gap-4 text-xs font-medium text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes} min read</span>
        </p>
      </div>
    </article>
  );
}
