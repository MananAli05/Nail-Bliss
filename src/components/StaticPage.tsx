import { Breadcrumbs } from "./Breadcrumbs";

export function StaticPage({
  title,
  script,
  path,
  updated,
  children,
}: {
  title: string;
  script?: string;
  path: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
      <Breadcrumbs items={[{ name: title, href: path }]} />
      <header className="mt-10 text-center">
        <h1 className="font-display text-5xl font-medium text-plum sm:text-6xl">
          {title} {script && <span className="font-script font-normal text-rose-deep">{script}</span>}
        </h1>
        {updated && <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>}
      </header>
      <div className="article mt-12 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-10">{children}</div>
    </div>
  );
}
