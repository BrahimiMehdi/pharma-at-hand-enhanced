"use client";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";
import { Instagram, Send, X ,Mail} from "lucide-react";
import { Button,buttonVariants } from "../ui/button";
import NavLink from "./NavLink";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  links: NavLinksType;
  slug: string | string[];
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}

export const Nav = ({ className, links, open, setOpen, slug }: SidebarProps) => {
  return (
    <nav
      className={cn(
        `pb-12 justify-between transition-all duration-300  ease-in-out lg:shadow-none shadow-md z-10 flex flex-col fixed ${
          open ? "left-0" : "-left-full "
        } top-0 h-full w-full max-w-xl lg:max-w-xs bg-background`,
        className
      )}
    >
      <div className="space-y-4  py-4">
        <div className="px-3 py-2">
          <div className="w-full mb-2  items-center flex justify-between">
           <img className="w-16 dark:invert" src="/logoTransparent.svg" alt="" />
            <Button aria-label="menu-close" className="" onClick={() => setOpen(!open)} size={"icon"}>
              <X strokeWidth={1.4} size={"24px"} />
            </Button>
          </div>
          <div className="space-y-1 mt-6">
            {links.map((link, index) => (
              <NavLink slug={slug} key={index} isActive={link.isActive} link={link.link}>
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className=" text-lg font-semibold tracking-tight">Contact</h2>

          <div className="space-y-1 mt-6">
            <NavLink slug={"/contact"} link={"/contact"}>
              <Mail strokeWidth={1.2} size={"18px"} className="mr-2" />
              <span>Contact</span>
            </NavLink>
          </div>
          
        </div>
      </div>
      <div className="px-3 flex justify-between items-center  ">
      <div className="space-y-1 flex items-center justify-center gap-x-8">
            <a className={buttonVariants({variant:"ghost",size:"icon"})} href="http://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
            <a className={buttonVariants({variant:"ghost",size:"icon"})} href="http://instagram.com" target="_blank" rel="noopener noreferrer">
              <Send />
            </a>
          </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};
