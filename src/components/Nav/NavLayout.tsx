"use client"

import { Nav } from "./Nav";
import { Menu } from "lucide-react";
import { useState,useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
type Props = {
  children: React.ReactNode;
  NavLinks : NavLinksType;
  slug:string | string[]
};

function NavLayout({ children,NavLinks ,slug}: Props) {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  useEffect(() => {
    setOpen(false)
  }, [path])
  
  return (
    <div className="flex relative pl-0 lg:pl-80">
      <Nav setOpen={setOpen} open={open} slug={slug} links={NavLinks} />
      <div className="w-full lg:border-l">
        <div className="w-full bg-background relative pt-8  lg:hidden px-6 ">
        <Button   onClick={()=>setOpen(!open)} size={"icon"}>
              <Menu strokeWidth={1.4} size={"24px"} />
            </Button>
        </div>
        {children}
        </div>
    </div>
  );
}

export default NavLayout;
