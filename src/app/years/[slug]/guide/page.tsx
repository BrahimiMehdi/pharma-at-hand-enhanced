import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getYear } from "@/components/queries";
import { FolderOpen, ArrowRightCircle, ArrowLeft } from "lucide-react";
import ArticleDetails from "@/components/Articles/ArticleDetails";
export default async function Years({ params }: { params: { slug: string } }) {
  const { guide } = await getYear(params.slug);
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center justify-between px-6 lg:px-12  p-12">
      <div className="w-full max-w-5xl mt-12 lg:mb-6">
        <Link aria-label="history-back" href={`/years/${params.slug}`} className={buttonVariants({ size: "icon", variant: "secondary" })}>
          <ArrowLeft strokeWidth={1.2} size={"28px"} />
        </Link>
      </div>
      {guide ? <ArticleDetails article={guide} /> : <h1>Something went wrong</h1>}
    </main>
  );
}
