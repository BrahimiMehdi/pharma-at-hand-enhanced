import ArticleCard from "@/components/Articles/ArticleCard";
import { getArticles } from "@/components/queries";
export default async function Articles() {
  const articles =await getArticles()
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center justify-between px-12 p-24">
      <section className="flex w-full flex-col gap-y-8">
        <h1 className="text-2xl font-bold">Articles</h1>
        <div className="grid gap-8 [grid-template-columns:_repeat(_auto-fill,_minmax(18rem,_1fr));]">
          {articles.map((article,index)=>(
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
