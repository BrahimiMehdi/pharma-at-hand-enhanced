"use client"
import { ThemeProvider } from '@/components/ThemeProvider'
import NavLayout from '@/components/Nav/NavLayout'
import { useParams, usePathname } from "next/navigation"
import { CalendarCheck2, PenSquare,HardDrive, Home, Map } from "lucide-react";
import { extractFirstSubpath } from "@/lib/utils"

type Props = {
    children:React.ReactNode
}

function LayoutWrapper({children}: Props) {
    const {slug} = useParams()
  
  const pathName = usePathname();
  const current = extractFirstSubpath(pathName)
  const primaryLinks = ["/","/articles","/events"]
  const links = ()=>{
    if(primaryLinks.includes(current)){
      return [
        {
          link: "/",
          icon: <Home strokeWidth={1.2} size={"18px"} className="mr-2" />,
          name: "Home",
          isActive:true,
        },
        {
          link: "/articles",
          icon: <PenSquare strokeWidth={1.2} size={"18px"} className="mr-2" />,
          name: "Articles",
        },
        {
          link: "/events",
          icon: <CalendarCheck2 strokeWidth={1.2} size={"18px"} className="mr-2" />,
          name: "Events",
        },
      ]
    }
    else{
      
      return [
        {
          link: "/",
          icon: <Home strokeWidth={1.2} size={"18px"} className="mr-2" />,
          name: "Home",
          isActive:true,
        },
        {
          link: `/years/${slug}`,
          icon: <HardDrive strokeWidth={1.2} size={"18px"} className="mr-2" />,
          name: "Resources",
        },
        {
          link: `/years/${slug}/guide`,
          icon: <Map strokeWidth={1.2} size={"18px"} className="mr-2" />,
          name: "Guide",
        },
      ]
    }
    
  };
  return (
    <ThemeProvider attribute='class' disableTransitionOnChange defaultTheme='system'> 
      <NavLayout slug={slug} NavLinks={links()}>
        {children}
      </NavLayout>
      </ThemeProvider>
  )
}

export default LayoutWrapper