import Link from "next/link";
import { getYears } from "@/components/queries";
import { ArrowLeft, ArrowRightCircle, GraduationCap } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Carousel from "@/components/Carousel";
export default async function Home() {
  const years = await getYears();

  return (
    <main className="flex px-6 lg:px-12 p-24 gap-y-8 bg-background min-h-screen relative flex-col items-center ">
      <div className="w-full mt-6 lg:mb-6  mb-6">
        <Link
          aria-label="history-back"
          href={`/articles`}
          className={buttonVariants({ size: "icon", variant: "secondary" })}
        >
          <ArrowLeft strokeWidth={1.2} size={"28px"} />
        </Link>
      </div>
      <div className="  w-full   overflow-x-hidden">
        <Carousel size={2} cards={years} />
      </div>
    </main>
  );
}
