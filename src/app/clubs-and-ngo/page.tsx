import { getClubs } from "@/components/queries";
import Image from "next/image";
import { Instagram ,Globe} from "lucide-react";
export default async function Home() {
  
  const clubs = await getClubs()
  return (
    <main className="flex bg-background min-h-screen relative flex-col items-center justify-between px-6 lg:px-12 p-24">

        <div className="grid w-full gap-8  sm:[grid-template-columns:_repeat(_auto-fill,_minmax(24rem,_1fr));]">
          {clubs?.map((club, index) => (
            <div
              key={index}
              className="border justify-between shadow-sm hover:border-primary  transition-all duration-300 ease-in-out hover:-translate-y-2 rounded-lg p-8  pb-10 flex flex-col gap-y-1"
            >

              <div className="w-full flex justify-between items-center">
              <h2 className="font-bold mt-2 text-xl">{club.name}</h2>
              <Image className="object-contain max-h-16 max-w-[5rem]" alt={club.name} src={club.logo.url} width={club.logo.width} height={club.logo.height} />
              </div>
              <p className="text-xs mt-3 text-muted-foreground">{club.description}</p>
              <div className="w-full mt-4 flex gap-x-12 items-center">
                <a href={club.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram strokeWidth={1.6}  size={"28px"}  />
                </a>
               {club.website && <a href={club.website} target="_blank" rel="noopener noreferrer">
                <Globe strokeWidth={1.6}  size={"28px"}  />
                </a>
                }
          
              </div>
            </div>
          ))}
        </div>
    </main>
  );
}