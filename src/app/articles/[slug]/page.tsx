import { getArticle, getArticles } from "@/components/queries";
import ArticleDetails from "@/components/Articles/ArticleDetails";
import PageHeader from "@/components/PageHeader";
import { Metadata, ResolvingMetadata } from "next";
import { constructeMetadata } from "@/lib/utils";
type Props = {
  params: Promise<{ slug: string }>
}
export async function generateStaticParams(){
  const articles =  await getArticles();
  const slugs = articles.map((item)=>item.slug)
  return slugs.map((slug)=>({
    slug
  }))
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params
 
  // fetch data
  const article = await getArticle(slug);
 
  // optionally access and extend (rather than replace) parent metadata
 
  return constructeMetadata({title:`Pharma at hand - ${article.title}`,description:article.description,image:article.image.url})
}

export default async function Articles({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return (
    <main className="flex min-h-screen w-full flex-col gap-8 bg-background px-6 pb-16 pt-24 lg:px-12">
      <PageHeader crumbs={[{ label: "Articles", href: "/articles" }, { label: article.title }]} />
      <ArticleDetails article={article} />
    </main>
  );
}
