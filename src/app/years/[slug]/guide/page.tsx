import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getYear } from "@/components/queries";
import { FolderOpen, ArrowRightCircle } from "lucide-react";
import ArticleDetails from "@/components/Articles/ArticleDetails";
export default async function Years({ params }: { params: { slug: string } }) {
  const { guide } = await getYear(params.slug);
 
  
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center justify-between px-12 p-24">
      {guide ? <ArticleDetails article={guide} /> : <h1>Something went wrong</h1>}
    </main>
  );
}
