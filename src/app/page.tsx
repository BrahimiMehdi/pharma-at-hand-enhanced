import Link from "next/link";
import { getYears } from "@/components/queries";
import { ArrowRightCircle, GraduationCap } from "lucide-react";
import PwaButton from "@/components/PwaButton";
export default async function Home() {
  
  const years = await getYears()
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center justify-between px-6 lg:px-12 p-24">
      <section className="flex w-full flex-col gap-y-8">
        <div className="w-full gap-y-5 lg:flex-row flex-col flex items-center justify-between">
          <h1 className="font-bold lg:order-1 order-2 [text-wrap:balance;] sm:text-4xl lg:text-left text-center text-3xl lg:text-5xl leading-[3rem]">
            Unlock{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Boundless
            </span>{" "}
            Knowledge{" "}
          </h1>
          <img className="order-2 lg:order-2 w-40" src="/main.svg" alt="" />
        </div>
        <h2 className="max-w-5xl text-muted-foreground">
          Welcome to our student platform, your one-stop destination for academic success. Here, you'll find an
          extensive collection of resources, links, and videos curated specifically for students like you. Simplify your
          educational journey and access everything you need in one place.
        </h2>
        {/* <PwaButton /> */}

        <h3 className="text-2xl font-bold">Choose your year</h3>
        <div className="grid gap-8 [grid-template-columns:_repeat(_auto-fill,_minmax(14rem,_1fr));]  sm:[grid-template-columns:_repeat(_auto-fill,_minmax(18rem,_1fr));]">
          {years?.map((year, index) => (
            <Link
            href={`/years/${year.slug}`}
              key={index}
              className="border shadow-sm hover:border-primary  transition-all duration-300 ease-in-out hover:-translate-y-2 rounded-lg p-8  pb-10 flex flex-col gap-y-1"
            >
              <div className="w-full flex items-center justify-between">
              <GraduationCap strokeWidth={1.2}  className="w-12 mr-1 h-12" />
              <ArrowRightCircle  strokeWidth={1.2} className="w-6 mr-1 h-6" />
              </div>
              <h2 className="font-bold mt-2 text-xl">{year.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
