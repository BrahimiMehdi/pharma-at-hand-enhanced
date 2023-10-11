import {  ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { constructeMetadata } from "@/lib/utils";
export const metadata = constructeMetadata({title:"Pharam at hand - contact",description:"Contact us or leave us resources that you think we left out"})

export default async function Clubs() {
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center gap-y-8 px-6 lg:px-12 p-24">
      <div className="w-full mb-6">
        <Link aria-label="history-back" href={`/`} className={buttonVariants({ size: "icon", variant: "secondary" })}>
          <ArrowLeft strokeWidth={1.2} size={"28px"} />
        </Link>
      </div>
        <ContactForm />
    </main>
  );
}
