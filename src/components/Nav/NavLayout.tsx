"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { List } from "@/components/icons";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar, type YearLink } from "./AppSidebar";

type Props = {
  children: React.ReactNode;
  years: YearLink[];
};

function NavLayout({ children, years }: Props) {
  const pathName = usePathname();
  const { slug } = useParams();
  const yearSlug = pathName.startsWith("/years/") && typeof slug === "string" ? slug : undefined;

  return (
    <SidebarProvider>
      <AppSidebar pathName={pathName} years={years} yearSlug={yearSlug} />
      <SidebarInset>
        <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:hidden">
          <SidebarTrigger
            variant="default"
            aria-label="Ouvrir le menu"
            aria-controls="main-nav"
            className="h-10 w-10 shadow-[0_4px_12px_-4px_rgba(37,99,235,0.6)]"
          >
            <List size={22} weight="bold" />
          </SidebarTrigger>
          <Link href="/" className="flex items-center gap-2.5 rounded-md" aria-label="Pharma at Hand, accueil">
            <img src="/icon-192x192.png" alt="" width={28} height={28} className="h-7 w-7 rounded-lg" />
            <span className="text-sm font-bold tracking-tight">Pharma at Hand</span>
          </Link>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default NavLayout;
