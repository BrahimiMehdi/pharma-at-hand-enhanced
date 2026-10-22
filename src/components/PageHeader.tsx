import Link from "next/link";
import { CaretRight, House } from "@/components/icons";

export type Crumb = { label: string; href?: string };

type Props = {
  /** Trail after Home; the last crumb is the current page. */
  crumbs: Crumb[];
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Optional visual shown left of the title (module icon, etc.). */
  media?: React.ReactNode;
};

export default function PageHeader({ crumbs, title, subtitle, media }: Props) {
  return (
    <header className="w-full">
      <nav aria-label="Breadcrumb">
        <ol className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-1 text-sm text-muted-foreground">
          <li>
            <Link
              href="/"
              className="-ml-1.5 inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors hover:bg-accent hover:text-foreground"
            >
              <House size={16} weight="duotone" aria-hidden />
              Home
            </Link>
          </li>
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return (
              <li key={`${crumb.label}-${index}`} className="flex min-w-0 items-center gap-1">
                <CaretRight size={12} weight="bold" aria-hidden className="shrink-0 text-muted-foreground/60" />
                {crumb.href && !last ? (
                  <Link
                    href={crumb.href}
                    className="truncate rounded-md px-1.5 py-1 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className="truncate px-1.5 py-1 font-medium text-foreground">
                    {crumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {title && (
        <div className="mt-3 flex items-center gap-4">
          {media}
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight [text-wrap:balance]">{title}</h1>
            {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
      )}
    </header>
  );
}
