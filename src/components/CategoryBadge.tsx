import Link from "next/link";
import { getCategory } from "@/lib/site";

export function CategoryBadge({ slug, inverted = false }: { slug: string; inverted?: boolean }) {
  const category = getCategory(slug);
  if (!category) return null;
  return (
    <Link
      href={`/${category.slug}`}
      className="relative z-10 inline-block rounded-md px-2.5 py-1 text-xs font-bold transition hover:opacity-85"
      style={inverted ? { background: "#fff", color: category.color } : { background: category.color, color: "#fff" }}
    >
      {category.name}
    </Link>
  );
}
