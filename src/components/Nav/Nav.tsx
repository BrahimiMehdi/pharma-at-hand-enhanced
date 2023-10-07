"use client";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./NavLink";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
 links:NavLinksType;
 slug:string | string[];
 open:boolean;
 setOpen : React.Dispatch<boolean>
}

export const Nav = ({ className,links,open ,setOpen,slug}: SidebarProps) => {

  return (
    <nav
      className={cn(
        `pb-12 justify-between transition-all duration-300 ease-in-out lg:shadow-none shadow-md z-10 flex flex-col fixed ${open ? "left-0" :"-left-full "} top-0 h-full w-full max-w-xl lg:max-w-xs bg-background`,
        className
      )}
    >
      <div className="space-y-4  py-4">
        <div className="px-3 py-2">
          <div className="w-full mb-2 px-4 items-center flex justify-between">
            <h2 className=" text-lg font-semibold tracking-tight">Pharma At Hand</h2>
            <Button  aria-label="menu-close"  className="" onClick={()=>setOpen(!open)} size={"icon"}>
              <X strokeWidth={1.4} size={"24px"} />
            </Button>
          </div>
          <div className="space-y-1 mt-6">
            {links.map((link,index)=>(
              <NavLink slug={slug} key={index} isActive={link.isActive} link={link.link}>
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
    
      </div>
      <div className="px-3 flex justify-end  ">
        <ThemeToggle />
      </div>
    </nav>
  );
};
