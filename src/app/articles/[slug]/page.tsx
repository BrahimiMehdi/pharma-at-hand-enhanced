import { getArticle, getArticles } from "@/components/queries";
import ArticleDetails from "@/components/Articles/ArticleDetails";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { constructeMetadata } from "@/lib/utils";
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateStaticParams(){
  const articles =  await getArticles();
  const slugs = articles.map((item)=>item.slug)
  return slugs.map((slug)=>({
    slug
  }))
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const article = await getArticle(slug);
 
  // optionally access and extend (rather than replace) parent metadata
 
  return constructeMetadata({title:`Pharma at hand - ${article.title}`,description:article.description,image:article.image.url})
}

export default async function Articles({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  return (
    <main className="flex bg-background min-h-screen relative flex-col items-start px-6 lg:px-12  p-12">
      <div className="w-full mt-12 lg:mb-6 max-w-5xl mb-6">
        <Link aria-label="history-back" href={`/articles`} className={buttonVariants({ size: "icon", variant: "secondary" })}>
          <ArrowLeft strokeWidth={1.2} size={"28px"} />
        </Link>
      </div>
      <ArticleDetails article={article} />
    </main>
  );
}
