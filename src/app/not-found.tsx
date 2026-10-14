import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-8xl font-semibold text-petal">404</p>
      <h1 className="-mt-6 font-script text-6xl text-rose-deep">Oops, chipped!</h1>
      <p className="mt-4 text-muted">We couldn&apos;t find that page. It may have moved, or the link might be broken.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded-full bg-plum px-6 py-3 text-sm font-medium text-white hover:bg-plum-deep">
          Back to home
        </Link>
        <Link href="/search" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-plum ring-1 ring-line hover:ring-rose">
          Search
        </Link>
      </div>
    </div>
  );
}
