import { getYear } from "@/components/queries";
import { buttonVariants } from "@/components/ui/button";
import {  ArrowLeft } from "lucide-react";
import TableRow from "@/components/TableRow";
import TableFooter from "@/components/TableFooter";
import Moyenne
 from "@/components/Moyenne";
import Link from "next/link";
export default async function Years({ params }: { params: { slug: string } }) {
  const years = await getYear(params.slug);
  const total = years.modules.map((item)=>item.coeff).reduce((a, b) => a + b, 0)
  const modules = years.modules
  const heads = ["Module","T1","T2","T3","TP/TD","Coeff","Moyenne","Moy*Coeff"]
  const inputs = ["T1","T2","T3","T3"]
  return (
    <main className="flex bg-background min-h-screen gap-y-8 relative flex-col lg:items-start items-center justify-between px-6 lg:px-12 p-24">
      <div className="w-full mb-6">
     <Link href={`/`} className={buttonVariants({size:"icon",variant:"secondary"})}>
     <ArrowLeft strokeWidth={1.2} size={"28px"} />
     </Link>
     </div>
     <h1 className="text-2xl font-bold">Calcul Du moyenne</h1>
     <div className="grid w-full max-w-[64rem]  auto-rows-[4rem] grid-flow-row auto-cols-[8rem]  overflow-x-scroll  border">
        {/* Headers */}
        <div className="col-span-8   place-items-center grid-flow-col auto-cols-[8rem] grid  h-full">
        {heads.map((head,index)=>(
          <div key={index} className="w-full  p-3 text-center grid border-x place-items-center font-semibold h-full bg-muted">
            {head}
          </div>
        ))}
        </div>
        {/* Body */}
        {modules.map((module,index)=>(
            <TableRow key={index} inputs={inputs} module={module} />
        ))}
        <TableFooter />
     </div>
        <Moyenne totalCoeff={total} />
    </main>
  );
}