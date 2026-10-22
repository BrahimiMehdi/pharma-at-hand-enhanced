import { getYear, getYears } from "@/components/queries";
import PageHeader from "@/components/PageHeader";
import ArticleDetails from "@/components/Articles/ArticleDetails";
export async function generateStaticParams(){
  const years =  await getYears();
  const slugs = years.map((item)=>item.slug)
  return slugs.map((slug)=>({
    slug
  }))
}
export default async function Years(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { guide, title } = await getYear(params.slug);
  return (
    <main className="flex min-h-screen w-full flex-col gap-8 bg-background px-6 pb-16 pt-24 lg:px-12">
      <PageHeader crumbs={[{ label: title, href: `/years/${params.slug}` }, { label: "Guide" }]} />
      {guide ? <ArticleDetails article={guide} /> : <p className="text-muted-foreground">No guide for this year yet.</p>}

    </main>
  );
}
