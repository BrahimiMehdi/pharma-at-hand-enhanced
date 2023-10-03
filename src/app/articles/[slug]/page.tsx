import { getArticle } from "@/components/queries";
import ArticleDetails from "@/components/Articles/ArticleDetails";
export default async function Articles({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  return (
    <main className="flex bg-background min-h-screen relative flex-col items-start px-6 lg:px-12  p-12">
      <ArticleDetails article={article} />
    </main>
  );
}
