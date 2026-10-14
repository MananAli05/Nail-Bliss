import Image from "next/image";
import Link from "next/link";
import { type PostMeta, postUrl } from "@/lib/post-utils";
import { PinButton } from "./PinButton";

/** The full Pinterest graphic, shown at its natural ratio for masonry grids. */
export function PinCard({ post }: { post: PostMeta }) {
  const href = postUrl(post);
  return (
    <figure className="group relative overflow-hidden rounded-2xl bg-white shadow-soft">
      <Link href={href} aria-label={post.title}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          width={post.imageWidth}
          height={post.imageHeight}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="h-auto w-full"
        />
      </Link>
      <PinButton
        url={href}
        image={post.image}
        description={post.pinDescription ?? post.title}
        className="absolute right-2.5 top-2.5 !px-3 !py-1.5 !text-xs sm:opacity-0 sm:transition sm:group-hover:opacity-100 sm:focus:opacity-100"
      />
    </figure>
  );
}
