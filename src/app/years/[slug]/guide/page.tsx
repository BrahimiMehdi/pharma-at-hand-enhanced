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
    <main className="flex bg-background min-h-screen relative flex-col items-start px-6 lg:px-12  p-12">
      <div className="w-full mt-12 lg:mb-6 max-w-5xl mb-6">
        <PageHeader crumbs={[{ label: title, href: `/years/${params.slug}` }, { label: "Guide" }]} />
      </div>
      {guide ? <ArticleDetails article={guide} /> : <h1>Something went wrong</h1>}

    </main>
  );
}
