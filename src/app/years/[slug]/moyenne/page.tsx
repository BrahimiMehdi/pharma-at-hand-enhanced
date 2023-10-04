import { getYear } from "@/components/queries";
import { buttonVariants } from "@/components/ui/button";
import {  ArrowLeft } from "lucide-react";
import {columns} from "@/components/column"
import { DataTable } from "@/components/DataTable";
import Link from "next/link";
export default async function Years({ params }: { params: { slug: string } }) {
  const years = await getYear(params.slug);
  const total = years.modules.map((item)=>item.coeff).reduce((a, b) => a + b, 0)
  let modules:ColumnType[] = years.modules.map((item)=>{return{
    ...item,
    total:total,
    moyenneSansTp:0,
    moyenne:Math.floor(Math.random( )*5)
}})
modules[2].T1 = 10;
modules[2].T2 = 10;
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center justify-between px-6 lg:px-12 p-24">
      <div className="w-full mb-6">
     <Link href={`/`} className={buttonVariants({size:"icon",variant:"secondary"})}>
     <ArrowLeft strokeWidth={1.2} size={"28px"} />
     </Link>
     </div>
     <h1 className="text-2xl font-bold">Calcul Du moyenne</h1>
     <DataTable columns={columns} originalData={modules} />
    </main>
  );
}