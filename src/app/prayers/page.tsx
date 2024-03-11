import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getPrayers } from "@/components/queries";
export default async function Prayers() {
    const prayers = await getPrayers()
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
        <h1 className="text-2xl font-bold">Prayers</h1>
        
      <div className="grid text-right w-full  gap-8 mt-12 [grid-template-columns:_repeat(_auto-fill,_minmax(12rem,_1fr));] sm:[grid-template-columns:_repeat(_auto-fill,_minmax(24rem,_1fr));]">
        {prayers.map((prayer,index)=>(
            <p key={index} lang="ar" className="rounded-md outline outline-primary/40 p-6">
                {prayer.prayer}
            </p>
        ))}
        
      </div>
      </section>
    </main>
  );
}
