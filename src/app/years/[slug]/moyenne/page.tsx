import { getYear } from "@/components/queries";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TableRowWrapper from "@/components/TableRow";
// import TableRow from "@/components/TableRow";
import TableFooter from "@/components/TableFooter";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Moyenne from "@/components/Moyenne";
import Link from "next/link";
export default async function Years({ params }: { params: { slug: string } }) {
  const years = await getYear(params.slug);
  const total = years.modules.map((item) => item.coeff).reduce((a, b) => a + b, 0);
  const modules = years.modules;
  const heads = ["Module", "T1", "T2", "T3", "TP/TD", "Coeff", "Moyenne", "Moy*Coeff"];
  const inputs = ["T1", "T2", "T3", "T3"];
  return (
    <main className="flex bg-background min-h-screen gap-y-16 relative flex-col lg:items-start items-center px-6 lg:px-12 p-24">
      <div className="w-full mb-6">
        <Link aria-label="history-back" href={`/years/${params.slug}`} className={buttonVariants({ size: "icon", variant: "secondary" })}>
          <ArrowLeft strokeWidth={1.2} size={"28px"} />
        </Link>
      </div>
      <h1 className="text-2xl font-bold">Calcul Du moyenne</h1>

      {modules.length !==0 ? <>
        <Table>
        <TableHeader>
          <TableRow>
            {heads.map((item,index) => (
              <TableHead key={index} className="text-center">{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {modules.map((item, index) => (
            <TableRowWrapper module={item} key={index} inputs={inputs} />
          ))}
        </TableBody>
      </Table>
      <Moyenne totalCoeff={total} />
      </> : <p className="text-lg text-muted-foreground">
        No modules found
        </p>}
    </main>
  );
}
