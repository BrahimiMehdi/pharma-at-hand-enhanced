"use client";

import { Nav } from "./Nav";
import { Calculator, Menu, Users2 ,BookMarked} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { useParams, usePathname } from "next/navigation";
import { CalendarCheck2, PenSquare, HardDrive, Home, Map } from "lucide-react";
import {gsap,Power3} from "gsap";
import { extractFirstSubpath } from "@/lib/utils";
type Props = {
  children: React.ReactNode;
};

function NavLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  useEffect(() => {

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(max-width:1024px)", () => {
        setOpen(false);
      });
    });
    return () => {
      ctx.revert();
    };
  }, [pathName]);
  const { slug } = useParams();

  const current = extractFirstSubpath(pathName);
  const primaryLinks = ["/", "/articles", "/events","/contact", "/clubs-and-ngo","/prayers"];
  const NavLinks = () => {
    if (primaryLinks.includes(current)) {
      return [
        {
          link: "/",
          icon: <Home strokeWidth={1.2} size={"18px"} className="mr-2" />,
          name: "Home",
          isActive: true,
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
        {
          link: "/clubs-and-ngo",
          icon: <Users2 strokeWidth={1.2} size={"20px"} className="mr-2" />,
          name: "Clubs & NGO's",
        },
        {
          link: "/prayers",
          icon: <BookMarked strokeWidth={1.2} size={"20px"} className="mr-2" />,
          name: "Prayers",
        },
      ];
    } else {
      return [
        {
          link: "/",
          icon: <Home strokeWidth={1.2} size={"18px"} className="mr-2" />,
          name: "Home",
          isActive: true,
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
        {
          link: `/years/${slug}/moyenne`,
          icon: <Calculator strokeWidth={1.2} size={"18px"} className="mr-2" />,
          name: "Calcule",
        },
      ];
    }
  };

  return (
    <div
      className={`flex relative transition-all duration-300 ease-in-out lg:pl-80 pl-0`}
    >
      <Nav pathName={pathName} setOpen={setOpen} open={open} slug={slug} links={NavLinks()} />
      <div className={`w-full lg:border-l  lg:border-l-secondary`}>
        <div className="w-full lg:hidden fixed top-0 z-[9] lg:px-12  left-0 pt-8   px-6 ">
         {!open && <Button aria-label="menu-open" onClick={() => setOpen(!open)} size={"icon"}>
            <Menu strokeWidth={1.4} size={"24px"} />
          </Button>}
        </div>
        {children}
      </div>
    </div>
  );
}

export default NavLayout;
