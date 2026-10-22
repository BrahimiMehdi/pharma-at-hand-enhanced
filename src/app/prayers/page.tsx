import CopyButton from "@/components/CopyButton";
import PageHeader from "@/components/PageHeader";
import { Quotes } from "@/components/icons";
import { getPrayers } from "@/components/queries";
import { arabic } from "@/lib/fonts";
import { constructeMetadata } from "@/lib/utils";

export const metadata = constructeMetadata({
  title: "Pharma at hand - prayers",
  description: "Duas for studying and exams",
});

export default async function Prayers() {
  const prayers = await getPrayers();
  return (
    <main className="flex min-h-screen w-full flex-col gap-10 bg-background px-6 pb-16 pt-24 lg:px-12">
      <PageHeader crumbs={[{ label: "Prayers" }]} title="Prayers" subtitle="Duas for studying, revising and exam days." />
      <ul className="grid gap-5 md:grid-cols-2">
        {prayers.map((prayer, index) => (
          <li key={index}>
            <figure className="relative isolate flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border bg-card p-6">
              <Quotes size={56} weight="fill" aria-hidden className="absolute -left-1 -top-2 -z-10 text-primary/[0.07]" />
              <blockquote lang="ar" dir="rtl" className={`${arabic.className} text-right text-2xl leading-[2.1] text-foreground`}>
                {prayer.prayer}
              </blockquote>
              <figcaption className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  {index + 1} / {prayers.length}
                </span>
                <CopyButton text={prayer.prayer} />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </main>
  );
}
