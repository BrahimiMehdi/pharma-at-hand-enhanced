import { getYear } from "@/components/queries";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Book, BookMarked, BookOpen } from "lucide-react";
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
      <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 py-6 rounded-2xl px-6 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg text-white">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-xl">Pharma At Hand</h3>
            <p className="text-white/90">
              Founded and maintained by{" "}
              <a href="https://www.instagram.com/brahimi__mehdi/" className="font-semibold underline hover:text-blue-200 transition-colors" target="_blank" rel="noopener noreferrer">
                 Brahimi Mehdi
              </a>
            </p>
            <p className="text-sm text-white/80">Pharmacy student platform • Est. 2023</p>
          </div>
          <div className="flex gap-3">
        
            <a href="https://www.instagram.com/brahimi__mehdi/" className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-full" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
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
              <div style={{backgroundColor:module.color.hex}} className="rounded-md grid place-items-center max-h-10 p-1  h-full aspect-square">
                <BookMarked className="w-6 h-6 text-stone-900" /> 
              </div>
             
            </Link>
          ))}
         
        </div>
        {/* <iframe src="https://drive.google.com/embeddedfolderview?id=1-0XNtD_MwS5pocD9j0qkJ6-huon76b1u#list" className="w-full h-96" /> */}
      </section>
    </main>
  );
}
