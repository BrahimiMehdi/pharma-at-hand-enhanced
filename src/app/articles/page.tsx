import ArticleCard from "@/components/Articles/ArticleCard";
import PageHeader from "@/components/PageHeader";
import { getArticles } from "@/components/queries";
import { constructeMetadata } from "@/lib/utils";

export const metadata = constructeMetadata({
  title: "Pharma at hand - articles",
  description: "Learn and find out interesting things about pharmacy",
});

export default async function Articles() {
  const articles = await getArticles();
  const [featured, ...rest] = articles;

  return (
    <main className="flex min-h-screen w-full flex-col gap-10 bg-background px-6 pb-16 pt-24 lg:px-12">
      <PageHeader
        crumbs={[{ label: "Articles" }]}
        title="Articles"
        subtitle="Guides and stories from students and associations, year by year."
      />
      {featured ? (
        <section className="flex flex-col gap-6">
          <ArticleCard article={featured} featured />
          {rest.length !== 0 && (
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))]">
              {rest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <p className="text-muted-foreground">No articles yet.</p>
      )}
    </main>
  );
}
