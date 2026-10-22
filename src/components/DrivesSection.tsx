"use client";

import { useState } from "react";
import { ArrowSquareOut, ArrowUpRight, FolderOpen, FolderSimple } from "@/components/icons";
import { latestDrive } from "@/lib/drives";
import { cn } from "@/lib/utils";

type Props = {
  drives: DriveType[];
  deps: DepartmentType[];
};

const DEFAULT_DEP = "fac-alger";

function DrivesSection({ drives, deps }: Props) {
  const [selected, setSelected] = useState(deps.some((dep) => dep.slug === DEFAULT_DEP) ? DEFAULT_DEP : deps[0]?.slug);
  const depDrives = drives.filter((drive) => (drive?.departement?.slug ?? DEFAULT_DEP) === selected);
  const featured = latestDrive(depDrives);
  const others = depDrives.filter((drive) => drive !== featured);

  return (
    <section aria-labelledby="drives-heading" className="flex w-full flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="drives-heading" className="text-2xl font-bold">
          Drives
        </h2>
        {deps.length > 1 && (
          <div role="group" aria-label="Faculty" className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-muted p-1">
            {deps.map((dep) => (
              <button
                key={dep.slug}
                type="button"
                aria-pressed={dep.slug === selected}
                onClick={() => setSelected(dep.slug)}
                className={cn(
                  "h-8 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors",
                  dep.slug === selected ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {dep.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {depDrives.length === 0 ? (
        <p className="rounded-xl border border-dashed p-6 text-muted-foreground">No drives for this faculty yet.</p>
      ) : (
        <div
          key={selected}
          className="grid gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out motion-reduce:animate-none lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
        >
          {featured && (
            <a
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative isolate flex min-h-[11rem] flex-col justify-between overflow-hidden rounded-2xl bg-blue-50 p-6 text-blue-950 ring-1 ring-inset ring-blue-200/80 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-20px_rgba(37,99,235,0.55)] hover:ring-blue-300 dark:bg-blue-500/10 dark:text-blue-50 dark:ring-blue-400/20 dark:hover:ring-blue-400/40"
            >
              <span aria-hidden className="molecule-pattern absolute inset-0 -z-10 text-blue-500 opacity-[0.07]" />
              <span className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-inset ring-blue-100 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-400/20">
                  <FolderOpen size={28} weight="duotone" aria-hidden />
                </span>
                <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
                  Latest
                </span>
              </span>
              <span className="mt-6 flex items-end justify-between gap-4">
                <span className="min-w-0">
                  <span className="block text-sm text-blue-700/80 dark:text-blue-200/80">Drive</span>
                  <span className="block truncate text-3xl font-bold tracking-tight tabular-nums">{featured.name}</span>
                </span>
                <ArrowUpRight
                  size={24}
                  weight="bold"
                  aria-hidden
                  className="shrink-0 text-blue-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-blue-300"
                />
              </span>
            </a>
          )}

          {others.length !== 0 && (
            <ul className="grid content-start grid-cols-2 gap-2">
              {others.map((drive) => (
                <li key={drive.link}>
                  <a
                    href={drive.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-3 rounded-xl border bg-card px-3.5 py-3 transition-colors hover:border-primary"
                  >
                    <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-primary sm:grid">
                      <FolderSimple size={20} weight="duotone" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 truncate font-semibold tabular-nums">{drive.name}</span>
                    <ArrowSquareOut
                      size={16}
                      aria-hidden
                      className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export default DrivesSection;
