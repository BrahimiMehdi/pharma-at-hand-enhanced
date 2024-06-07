import { getYear, getYears } from "@/components/queries";
import { ArrowLeft } from "lucide-react";
import ModuleSection from "@/components/ModuleSection";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Years({
  params,
  searchParams,
}: {
  params: { slug: string; query: any };
  searchParams: any;
}) {
  const years = await getYear(params.slug);
  const modules = years.modules.filter((module) => module.video.length !== 0 || module.cours.length!==0);
  const filteredModules = modules.filter((module) => module.name === searchParams.name);

  const name: string | undefined = searchParams.name;
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center gap-y-16 px-6 lg:px-12 p-24">
      <div className="w-full">
        <Link aria-label="history-back" href={`/years/${params.slug}`} className={buttonVariants({ size: "icon", variant: "secondary" })}>
          <ArrowLeft strokeWidth={1.2} size={"28px"} />
        </Link>
      </div>
      {filteredModules.length === 0 && !name && <h1>No resources found</h1>}
      {filteredModules.length !== 0 ? (
        filteredModules?.map((module, index) => <ModuleSection  key={index} module={module} />)
      ) : !name ? (
        modules.map((module, index) => <ModuleSection  key={index} module={module} />)
      ) : (
        <h1>No resources found</h1>
      )}

    </main>
  );
}
