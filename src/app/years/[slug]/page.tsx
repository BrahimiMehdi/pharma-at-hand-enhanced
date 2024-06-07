import { getYear } from "@/components/queries";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getYears,getDepartements } from "@/components/queries";
import DrivesSection from "@/components/DrivesSection";

export async function generateStaticParams(){
  const years =  await getYears();
  const slugs = years.map((item)=>item.slug)
  return slugs.map((slug)=>({
    slug
  }))
}
export default async function Years({ params,searchParams }: { params: { slug: string },searchParams:any }) {
  const years = await getYear(params.slug);
  const deps = await getDepartements();
  
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center justify-between px-6 lg:px-12 p-24">
      <div className="w-full mb-6">
     <Link aria-label="history-back" href={`/`} className={buttonVariants({size:"icon",variant:"secondary"})}>
     <ArrowLeft strokeWidth={1.2} size={"28px"} />
     </Link>
     </div>
      <section className="flex w-full flex-col gap-y-8">

        
        <DrivesSection deps={deps} drives={years.drives} />
        
        {years.modules.length!==0 && <h2 className="text-2xl font-bold">Videos & Links</h2>}

        <div className="grid gap-8 [grid-template-columns:_repeat(_auto-fill,_minmax(16rem,_1fr));]">
        {years.modules?.map((module, index) => (
            <Link
              href={{
                pathname:`/years/${params.slug}/module`,
                query:{
                  name:module.name
                }
              }}
              key={index}
              
              className={` border shadow-sm hover:border-primary  transition-all duration-300 ease-in-out hover:-translate-y-2 rounded-lg p-4 flex items-center justify-between`}
            >
              <h2 className="font-bold mt-2 text-lg">{module.name}</h2>
              <div style={{backgroundColor:module.color.hex}} className="rounded-md max-h-10 p-1  h-full aspect-square">
                <Image src={module.image.url} alt={module.name} width={module.image.width} height={module.image.height} />
              </div>
             
            </Link>
          ))}
         
        </div>
        {/* <iframe src="https://drive.google.com/embeddedfolderview?id=1-0XNtD_MwS5pocD9j0qkJ6-huon76b1u#list" className="w-full h-96" /> */}
      </section>
    </main>
  );
}
