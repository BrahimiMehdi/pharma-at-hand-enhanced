import { getYear } from "@/components/queries";
import { FolderOpen, ArrowRightCircle } from "lucide-react";
import ModuleSection from "@/components/ModuleSection";
import Image from "next/image";
export default async function Years({
  params,
  searchParams,
}: {
  params: { slug: string; query: any };
  searchParams: any;
}) {
  const years = await getYear(params.slug);
  const filteredModules = years.modules.filter((module) => module.name === searchParams.name);
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center gap-y-12 px-6 lg:px-12 p-24">
      {filteredModules.length !== 0
        ? filteredModules?.map((module, index) => <ModuleSection key={index} module={module} />)
        : years.modules.map((module, index) => <ModuleSection key={index} module={module} />)}

      {/* <iframe src="https://drive.google.com/embeddedfolderview?id=1-0XNtD_MwS5pocD9j0qkJ6-huon76b1u#list" className="w-full h-96" /> */}
    </main>
  );
}
