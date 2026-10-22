import { Suspense } from "react";
import { getYear } from "@/components/queries";
import ModuleBrowser, { ModuleHeaderFallback } from "@/components/videos/ModuleBrowser";
import { countVideos } from "@/lib/video";

export default async function ModulePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const year = await getYear(slug);
  const modules = year.modules.filter((module) => countVideos(module) !== 0);

  return (
    <main className="flex min-h-screen w-full flex-col bg-background px-6 pb-16 pt-24 lg:px-12">
      <Suspense
        fallback={<ModuleHeaderFallback slug={slug} yearTitle={year.title} />}
      >
        <ModuleBrowser slug={slug} yearTitle={year.title} modules={modules} />
      </Suspense>
    </main>
  );
}
