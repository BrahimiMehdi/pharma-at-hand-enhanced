"use client";

import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { countVideos } from "@/lib/video";
import VideoLibrary from "./VideoLibrary";

type Props = {
  slug: string;
  yearTitle: string;
  modules: ModuleType[];
};

// The page is statically rendered, so the selected module (?name=) is read on the client.
export default function ModuleBrowser({ slug, yearTitle, modules }: Props) {
  const name = useSearchParams().get("name");
  const shown = name ? modules.filter((module) => module.name === name) : modules;
  const single = shown.length === 1 ? shown[0] : undefined;

  return (
    <>
      <div className="mb-8">
        <PageHeader
          crumbs={[
            { label: yearTitle, href: `/years/${slug}` },
            ...(single ? [{ label: "Videos & courses", href: `/years/${slug}/module` }, { label: single.name }] : [{ label: "Videos & courses" }]),
          ]}
          title={single ? single.name : "Videos & courses"}
          subtitle={single ? `${yearTitle} · coeff ${single.coeff} · ${countVideos(single)} resources` : yearTitle}
          media={
            single ? (
              <span
                style={{ backgroundColor: single.color.hex }}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl p-1.5 shadow-sm"
              >
                <img src={single.image.url} alt="" className="h-full w-full object-contain" />
              </span>
            ) : undefined
          }
        />
      </div>

      {shown.length !== 0 ? (
        <VideoLibrary key={name ?? "all"} modules={shown} showModuleHeadings={!single} />
      ) : (
        <p className="text-lg text-muted-foreground">No resources found for this module.</p>
      )}
    </>
  );
}

export function ModuleHeaderFallback({ slug, yearTitle }: { slug: string; yearTitle: string }) {
  return (
    <div className="mb-8">
      <PageHeader crumbs={[{ label: yearTitle, href: `/years/${slug}` }, { label: "Videos & courses" }]} />
      <div className="mt-3 h-9 w-64 max-w-full animate-pulse rounded-md bg-muted" />
    </div>
  );
}
