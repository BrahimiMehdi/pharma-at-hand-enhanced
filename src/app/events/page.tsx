import Link from "next/link";
import { getEvents, getYears } from "@/components/queries";
import { ArrowLeft, ArrowRightCircle, GraduationCap } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import CardsCarousel from "@/components/CardsCarousel";
export default async function Home() {
  const { upcoming, past } = await getEvents();

  return (
    <main className="flex px-6 lg:px-12 p-24 gap-y-8 bg-background min-h-screen relative flex-col items-center ">
      <div className="w-full mt-6 lg:mb-6  mb-6">
        <Link
          aria-label="history-back"
          href={`/`}
          className={buttonVariants({ size: "icon", variant: "secondary" })}
        >
          <ArrowLeft strokeWidth={1.2} size={"28px"} />
        </Link>
      </div>
      <section className="flex w-full flex-col gap-y-8">
        {upcoming.length !== 0 && (
          <div className="flex w-full flex-col gap-y-8">
            <h1 className="text-2xl font-bold">Upcoming Events</h1>
            <CardsCarousel size={2} cards={upcoming} />
          </div>
        )}
        {past.length !== 0 && (
          <div className="flex w-full flex-col gap-y-8">
            <h2 className="text-2xl font-bold">Past Events</h2>
            <CardsCarousel size={3} cards={past} />
          </div>
        )}
      </section>
    </main>
  );
}
