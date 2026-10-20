import Link from "next/link";

const pageHref = (n: number) => (n === 1 ? "/" : `/page/${n}`);

/** Numbered pages: 1 2 … last, plus Newer / Older, like the reference site. */
export function Pagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;

  const pages = new Set([1, total, current - 1, current, current + 1]);
  const list = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);

  const btn = "grid h-11 min-w-11 place-items-center rounded-lg px-3 text-sm font-semibold transition";
  const idle = `${btn} bg-white text-ink ring-1 ring-line hover:ring-rose hover:text-plum`;

  return (
    <nav aria-label="Pagination" className="mt-14 flex flex-wrap items-center justify-center gap-2">
      {current > 1 && (
        <Link href={pageHref(current - 1)} className={idle} rel="prev">
          Newer
        </Link>
      )}
      {list.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          {i > 0 && n - list[i - 1] > 1 && <span className={`${btn} text-muted`}>…</span>}
          {n === current ? (
            <span aria-current="page" className={`${btn} bg-plum text-white`}>
              {n}
            </span>
          ) : (
            <Link href={pageHref(n)} className={idle}>
              {n}
            </Link>
          )}
        </span>
      ))}
      {current < total && (
        <Link href={pageHref(current + 1)} className={idle} rel="next">
          Older
        </Link>
      )}
    </nav>
  );
}
