import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default async function ComingSoon() {
  
    return (
        <main className="flex bg-background gap-y-8 min-h-screen relative flex-col items-center justify-center px-12 ">
    <div className="w-full mb-6 mt-8">
    <Link aria-label="history-back" href={"/"} className={buttonVariants({ size: "icon", variant: "secondary" })}>
          <ArrowLeft strokeWidth={1.2} size={"28px"} />
        </Link>
    </div>
          
         
          <h1 className="lg:text-8xl text-5xl lg:text-left text-center font-bold">Coming <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                soon
              </span></h1>
              <img className="w-full max-w-xl" src="/404-lab.svg" alt="" />
      </main>
    );
  }