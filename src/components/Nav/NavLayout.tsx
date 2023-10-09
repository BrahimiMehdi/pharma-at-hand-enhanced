"use client";

import { Nav } from "./Nav";
import { Calculator, Menu, Users2 } from "lucide-react";
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
  const primaryLinks = ["/", "/articles", "/events","/contact", "/coming-soon", "/clubs-and-ngo"];
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
          link: "/coming-soon",
          icon: <CalendarCheck2 strokeWidth={1.2} size={"18px"} className="mr-2" />,
          name: "Events",
        },
        {
          link: "/clubs-and-ngo",
          icon: <Users2 strokeWidth={1.2} size={"20px"} className="mr-2" />,
          name: "Clubs & NGO's",
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
      className={`flex relative transition-all duration-300 ease-in-out  ${open ? "lg:pl-80 pl-0" : "lg:pl-0 pl-0"}`}
    >
      <Nav setOpen={setOpen} open={open} slug={slug} links={NavLinks()} />
      <div className="w-full lg:border-l  ">
        <div className="w-full fixed top-0 z-[9] lg:px-12  left-0 pt-8   px-6 ">
          <Button aria-label="menu-open" onClick={() => setOpen(!open)} size={"icon"}>
            <Menu strokeWidth={1.4} size={"24px"} />
          </Button>
        </div>
        <div className="animate-fade-up fade-in-0 fade-out-100"  >{children}</div>
      </div>
    </div>
  );
}

export default NavLayout;
