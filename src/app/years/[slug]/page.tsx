import { getYear } from "@/components/queries";
import { ArrowRight, BookBookmark, Calculator, MapTrifold, PlayCircle } from "@/components/icons";
import Link from "next/link";
import { getYears,getDepartements } from "@/components/queries";
import DrivesSection from "@/components/DrivesSection";
import FounderCard from "@/components/FounderCard";
import PageHeader from "@/components/PageHeader";
import { countVideos } from "@/lib/video";

export async function generateStaticParams(){
  const years =  await getYears();
  const slugs = years.map((item)=>item.slug)
  return slugs.map((slug)=>({
    slug
  }))
}
export default async function Years(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const years = await getYear(params.slug);
  const deps = await getDepartements();
  const videoCount = years.modules.reduce((sum, module) => sum + countVideos(module), 0);
  const totalCoeff = years.modules.reduce((sum, module) => sum + module.coeff, 0);
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center gap-12 px-6 lg:px-12 p-24">
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          crumbs={[{ label: years.title }]}
          title={years.title}
          subtitle={
            <>
              {years.modules.length} modules · {years.drives.length} drives
              {videoCount !== 0 && <> · {videoCount} videos &amp; links</>}
            </>
          }
        />
        <FounderCard />
      </div>
      <section className="flex w-full flex-col gap-y-12">
        <nav aria-label="Year tools" className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))]">
          <Link
            href={`/years/${params.slug}/moyenne`}
            className="group flex items-center gap-4 rounded-xl border-2 border-transparent p-5 shadow-[0_10px_28px_-18px_rgba(79,70,229,0.7)] transition-transform duration-300 ease-out [background:linear-gradient(hsl(var(--card)),hsl(var(--card)))_padding-box,linear-gradient(120deg,#3b82f6,#8b5cf6_60%,#a855f7)_border-box] hover:-translate-y-1"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              <Calculator size={24} weight="duotone" aria-hidden />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-bold">Calcul de la moyenne</span>
              <span className="text-sm text-muted-foreground">Enter your marks, see your average live</span>
            </span>
            <ArrowRight size={20} aria-hidden className="shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
          </Link>
          {videoCount !== 0 && (
            <Link
              href={`/years/${params.slug}/module`}
              className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-red-500/10 text-red-500">
                <PlayCircle size={26} weight="duotone" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-bold">Videos &amp; courses</span>
                <span className="text-sm text-muted-foreground">{videoCount} resources, watch them here</span>
              </span>
              <ArrowRight size={20} aria-hidden className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
          {years.guide && (
            <Link
              href={`/years/${params.slug}/guide`}
              className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                <MapTrifold size={24} weight="duotone" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-bold">Year guide</span>
                <span className="text-sm text-muted-foreground">Read the guide for this year</span>
              </span>
              <ArrowRight size={20} aria-hidden className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </nav>

        <DrivesSection deps={deps} drives={years.drives} />

        {years.modules.length !== 0 && (
          <section aria-labelledby="modules-heading" className="flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="modules-heading" className="text-2xl font-bold">
                Videos &amp; Links
              </h2>
              <p className="text-sm text-muted-foreground">
                {years.modules.length} modules · coefficient total {totalCoeff}
              </p>
            </div>
            <ul className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))]">
              {years.modules.map((module) => {
                const count = countVideos(module);
                return (
                  <li key={module.name}>
                    <Link
                      href={{ pathname: `/years/${params.slug}/module`, query: { name: module.name } }}
                      className="group flex h-full items-center gap-4 rounded-xl border bg-card p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary"
                    >
                      <span
                        style={{ backgroundColor: module.color.hex }}
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl p-1.5 shadow-sm"
                      >
                        {module.image?.url ? (
                          <img src={module.image.url} alt="" loading="lazy" className="h-full w-full object-contain" />
                        ) : (
                          <BookBookmark weight="duotone" aria-hidden className="h-6 w-6 text-stone-900" />
                        )}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="line-clamp-2 font-bold leading-snug">{module.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {count !== 0 ? `${count} ${count > 1 ? "resources" : "resource"}` : "Coming soon"} · coeff {module.coeff}
                        </span>
                      </span>
                      <ArrowRight size={18} aria-hidden className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}
