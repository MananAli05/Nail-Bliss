import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { type PostMeta, postUrl } from "@/lib/post-utils";
import { getCategory } from "@/lib/site";

/** Standard blog card: real cover photo, category, title, excerpt. */
export function PostCard({
  post,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  aspect = "aspect-[4/5]",
}: {
  post: PostMeta;
  sizes?: string;
  aspect?: string;
}) {
  const category = getCategory(post.category);
  const href = postUrl(post);

  return (
    <article className="group">
      <Link href={href} className={`relative block overflow-hidden rounded-2xl bg-petal ${aspect}`}>
        <Image
          src={post.cover}
          alt={post.imageAlt}
          fill
          sizes={sizes}
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="pt-4">
        {category && (
          <Link href={`/${category.slug}`} className="eyebrow hover:text-plum">
            {category.name}
          </Link>
        )}
        <h3 className="mt-1.5 font-display text-[1.4rem] font-semibold leading-tight text-plum">
          <Link href={href} className="hover:underline hover:decoration-rose hover:decoration-2 hover:underline-offset-4">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{post.description}</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Clock className="size-3.5" strokeWidth={1.75} />
          {post.readingMinutes} min read
        </p>
      </div>
    </article>
  );
}
