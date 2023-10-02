import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getYear } from "@/components/queries";
import { FolderOpen,ArrowRightCircle } from "lucide-react";
export default async function Years({ params }: { params: { slug: string } }) {
  const years = await getYear(params.slug);
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center justify-between px-12 p-24">
      <section className="flex w-full flex-col gap-y-8">
        
        <h1 className="text-2xl font-bold">Choose your drive</h1>
        
      </section>
    </main>
  );
}