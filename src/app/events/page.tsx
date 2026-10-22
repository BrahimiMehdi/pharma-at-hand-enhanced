import { getEvents } from "@/components/queries";
import EventUpCard from "@/components/EventUpCard";
import PageHeader from "@/components/PageHeader";
import { InstagramLogo } from "@/components/icons";
import { constructeMetadata } from "@/lib/utils";

export const metadata = constructeMetadata({
  title: "Pharma at hand - events",
  description: "Congresses, salons and student activities for pharmacy students",
});

export default async function EventsPage() {
  const { upcoming, past } = await getEvents();

  return (
    <main className="flex min-h-screen w-full flex-col gap-12 bg-background px-6 pb-16 pt-24 lg:px-12">
      <PageHeader
        crumbs={[{ label: "Events" }]}
        title="Events"
        subtitle="Congresses, salons and student activities around pharmacy."
      />

      <section aria-labelledby="upcoming-heading" className="flex flex-col gap-5">
        <h2 id="upcoming-heading" className="text-2xl font-bold">
          Upcoming
        </h2>
        {upcoming.length !== 0 ? (
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(20rem,1fr))]">
            {upcoming.map((card) => (
              <EventUpCard key={`${card.title}-${card.date}`} card={card} />
            ))}
          </div>
        ) : (
          <div className="relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-2xl border bg-card p-6 text-center sm:flex-row sm:p-8 sm:text-left">
            <span aria-hidden className="molecule-pattern absolute inset-0 -z-10 text-primary opacity-[0.05]" />
            <img
              src="/illustrations/empty-events.webp"
              alt=""
              width={160}
              height={160}
              loading="lazy"
              className="h-32 w-32 shrink-0 rounded-2xl object-contain sm:h-36 sm:w-36"
            />
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <div>
                <h3 className="text-lg font-bold">No upcoming events right now</h3>
                <p className="mt-1 text-muted-foreground">New congresses and club activities are announced on our Instagram first.</p>
              </div>
              <a
                href="https://www.instagram.com/pharma.at.hand/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <InstagramLogo size={18} weight="duotone" aria-hidden />
                Follow @pharma.at.hand
              </a>
            </div>
          </div>
        )}
      </section>

      {past.length !== 0 && (
        <section aria-labelledby="past-heading" className="flex flex-col gap-5">
          <h2 id="past-heading" className="text-2xl font-bold">
            Past events
          </h2>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))]">
            {past.map((card) => (
              <EventUpCard key={`${card.title}-${card.date}`} card={card} past />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
