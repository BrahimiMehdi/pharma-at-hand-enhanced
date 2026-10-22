import Calculator from "@/components/moyenne/Calculator";
import { getYear, getYears } from "@/components/queries";
import PageHeader from "@/components/PageHeader";
import { constructeMetadata } from "@/lib/utils";

export async function generateStaticParams() {
  const years = await getYears();
  return years.map((item) => ({ slug: item.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const year = await getYear(slug);
  return constructeMetadata({
    title: `Calcul de la moyenne - ${year.title} | Pharma at hand`,
    description: `Calculez votre moyenne de ${year.title} en pharmacie : notes T1, T2, T3 et TP, coefficients et moyenne générale en direct.`,
  });
}

export default async function MoyennePage({ params }: PageProps) {
  const { slug } = await params;
  const year = await getYear(slug);
  const modules = year.modules;
  const totalCoeff = modules.reduce((sum, item) => sum + item.coeff, 0);

  return (
    <main className="flex min-h-screen w-full flex-col bg-background px-6 pb-16 pt-24 lg:px-12">
      <div className="mb-8">
        <PageHeader
          crumbs={[{ label: year.title, href: `/years/${slug}` }, { label: "Calcul de la moyenne" }]}
          title="Calcul de la moyenne"
          subtitle={
            modules.length !== 0 ? `${year.title} · ${modules.length} modules · coefficient total ${totalCoeff}` : year.title
          }
        />
      </div>

      {modules.length !== 0 ? (
        <Calculator modules={modules} />
      ) : (
        <p className="text-lg text-muted-foreground">Aucun module disponible pour cette année pour le moment.</p>
      )}
    </main>
  );
}
