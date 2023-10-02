"use client"

import Link from "next/link"
import { extractFirstSubpath } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { usePathname } from "next/navigation"
type Props = {
    children:React.ReactNode;
    link:string
    isActive?:boolean;
    slug:string | string[];
}

function NavLink({children,slug,link}: Props) {
  const pathName = usePathname();
  const current = extractFirstSubpath(pathName)
  const isActive = pathName === link 
  const variant = isActive ? "secondary" : "ghost"
   console.log(link);
   

    
  return (
    <Link href={link} className={buttonVariants({variant:variant,size:"full",position:"start",className:"overflow-hidden"})}  >
             {children}
    </Link>
  )
}

export default NavLink