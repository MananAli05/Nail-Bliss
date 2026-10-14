import Link from "next/link";

export function Logo({ size = "md", light = false }: { size?: "md" | "lg"; light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Nail Bliss home"
      className={`group inline-flex items-baseline gap-1 leading-none ${light ? "text-white" : "text-plum"}`}
    >
      <span
        className={`font-display font-semibold uppercase tracking-[0.22em] ${size === "lg" ? "text-3xl" : "text-xl sm:text-2xl"}`}
      >
        Nail
      </span>
      <span
        className={`font-script ${size === "lg" ? "text-5xl" : "text-3xl sm:text-4xl"} ${light ? "text-rose" : "text-rose-deep"} -ml-0.5 translate-y-1 transition-transform group-hover:-rotate-3`}
      >
        Bliss
      </span>
    </Link>
  );
}
