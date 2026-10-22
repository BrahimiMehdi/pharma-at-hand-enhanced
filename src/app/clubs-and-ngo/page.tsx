import { getClubs } from "@/components/queries";
import PageHeader from "@/components/PageHeader";
import { ArrowUpRight, Globe, InstagramLogo } from "@/components/icons";
import { constructeMetadata } from "@/lib/utils";

export const metadata = constructeMetadata({
  title: "Pharma at hand - clubs & NGOs",
  description: "Student clubs and associations at the faculty of pharmacy",
});

function instagramHandle(url: string) {
  try {
    const handle = new URL(url).pathname.split("/").filter(Boolean)[0];
    return handle ? `@${handle}` : "Instagram";
  } catch {
    return "Instagram";
  }
}

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Website";
  }
}

const linkClass =
  "inline-flex min-w-0 items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary";

export default async function Clubs() {
  const clubs = await getClubs();
  return (
    <main className="flex min-h-screen w-full flex-col gap-10 bg-background px-6 pb-16 pt-24 lg:px-12">
      <PageHeader
        crumbs={[{ label: "Clubs & NGO's" }]}
        title="Clubs & NGO's"
        subtitle="Student clubs and associations you can join at the faculty."
      />
      <ul className="grid gap-6 md:grid-cols-2">
        {clubs.map((club) => (
          <li key={club.name}>
            <article className="flex h-full flex-col gap-4 rounded-2xl border bg-card p-6 transition-colors hover:border-primary/50">
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border bg-white p-2">
                  {club.logo?.url && (
                    <img src={club.logo.url} alt="" width={club.logo.width} height={club.logo.height} loading="lazy" className="max-h-full max-w-full object-contain" />
                  )}
                </span>
                <h2 className="text-xl font-bold tracking-tight">{club.name}</h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{club.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-1">
                {club.instagram && (
                  <a href={club.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <InstagramLogo size={16} weight="duotone" aria-hidden className="shrink-0" />
                    <span className="truncate">{instagramHandle(club.instagram)}</span>
                  </a>
                )}
                {club.website && (
                  <a href={club.website} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Globe size={16} weight="duotone" aria-hidden className="shrink-0" />
                    <span className="truncate">{hostname(club.website)}</span>
                    <ArrowUpRight size={14} aria-hidden className="shrink-0" />
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
