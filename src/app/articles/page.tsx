import ArticleCard from "@/components/Articles/ArticleCard";
import { getArticles } from "@/components/queries";
import { buttonVariants } from "@/components/ui/button";
import { constructeMetadata } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export const metadata = constructeMetadata({
  title: "Pharma at hand - articles",
  description: "Learn and find out interesting things about pharmacy",
});
export default async function Articles() {
  const articles = await getArticles();
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center justify-between lg:px-12 px-6 p-24">
      <div className="w-full mb-6">
        <Link aria-label="history-back" href={`/`} className={buttonVariants({ size: "icon", variant: "secondary" })}>
          <ArrowLeft strokeWidth={1.2} size={"28px"} />
        </Link>
      </div>
      <section className="flex w-full flex-col gap-y-8">
        <h1 className="text-2xl font-bold">Articles</h1>
        <div className="grid gap-8 [grid-template-columns:_repeat(_auto-fill,_minmax(18rem,_1fr));]">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
