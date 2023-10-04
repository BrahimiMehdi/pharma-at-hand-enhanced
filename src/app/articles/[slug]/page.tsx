import { getArticle } from "@/components/queries";
import ArticleDetails from "@/components/Articles/ArticleDetails";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default async function Articles({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  return (
    <main className="flex bg-background min-h-screen relative flex-col items-start px-6 lg:px-12  p-12">
      <div className="w-full mt-12 lg:mb-6 max-w-5xl mb-6">
        <Link href={`/articles`} className={buttonVariants({ size: "icon", variant: "secondary" })}>
          <ArrowLeft strokeWidth={1.2} size={"28px"} />
        </Link>
      </div>
      <ArticleDetails article={article} />
    </main>
  );
}
