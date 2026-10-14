import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  script,
  href,
  linkLabel = "View all",
  center = false,
}: {
  eyebrow: string;
  title: string;
  script?: string;
  href?: string;
  linkLabel?: string;
  center?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-4 ${center ? "flex-col items-center text-center" : "items-end justify-between"}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-4xl font-medium leading-none text-plum sm:text-5xl">
          {title}{" "}
          {script && <span className="font-script text-[1.15em] font-normal text-rose-deep">{script}</span>}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-2 text-sm font-medium text-plum"
        >
          {linkLabel}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" strokeWidth={1.75} />
        </Link>
      )}
    </div>
  );
}
