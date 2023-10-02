"use client";
import { ForwardedRef, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { ChevronRight, Menu } from "lucide-react";
import NavLink from "./NavLink";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
 links:NavLinksType;
 slug:string | string[]
}

export const Nav = ({ className,links ,slug}: SidebarProps) => {

  return (
    <nav
      className={cn(
        "pb-12 justify-between flex flex-col fixed left-0 top-0 h-full w-full max-w-xs bg-background",
        className
      )}
    >
      <div className="space-y-4  py-4">
        <div className="px-3 py-2">
          <div className="w-full flex justify-between">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Pharma At Hand</h2>
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
