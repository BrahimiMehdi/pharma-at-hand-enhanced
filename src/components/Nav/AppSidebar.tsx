"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Calculator,
  CalendarStar,
  EnvelopeSimple,
  FolderOpen,
  HandsPraying,
  House,
  InstagramLogo,
  MapTrifold,
  Moon,
  Newspaper,
  SidebarSimple,
  Sun,
  TelegramLogo,
  UsersThree,
  type Icon,
} from "@/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export type YearLink = { slug: string; title: string };

type Props = {
  pathName: string;
  years: YearLink[];
  yearSlug?: string;
};

type Item = { href: string; label: string; icon: Icon; active: boolean };

const explore = [
  { href: "/", label: "Home", icon: House },
  { href: "/articles", label: "Articles", icon: Newspaper },
  { href: "/events", label: "Events", icon: CalendarStar },
  { href: "/clubs-and-ngo", label: "Clubs & NGO's", icon: UsersThree },
  { href: "/prayers", label: "Prayers", icon: HandsPraying },
  { href: "/contact", label: "Contact", icon: EnvelopeSimple },
];

/** Switching year keeps you on the same tool (guide, moyenne); anything else lands on the year's resources. */
function yearHref(target: string, pathName: string, current?: string) {
  if (current) {
    const rest = pathName.slice(`/years/${current}`.length);
    if (rest === "/guide" || rest === "/moyenne") return `/years/${target}${rest}`;
  }
  return `/years/${target}`;
}

function NavItems({ items }: { items: Item[] }) {
  return (
    <SidebarMenu>
      {items.map(({ href, label, icon: ItemIcon, active }) => (
        <SidebarMenuItem key={href}>
          <SidebarMenuButton asChild isActive={active} tooltip={label}>
            <Link href={href} aria-current={active ? "page" : undefined}>
              <ItemIcon size={20} weight={active ? "fill" : "duotone"} aria-hidden />
              <span>{label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

function YearSwitcher({ years, pathName, yearSlug }: Props) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Votre année</SidebarGroupLabel>
      <SidebarGroupContent>
        <ul
          className="grid gap-0.5 rounded-full bg-sidebar-accent p-1 ring-1 ring-inset ring-sidebar-border"
          style={{ gridTemplateColumns: `repeat(${Math.min(years.length, 6)}, minmax(0, 1fr))` }}
        >
          {years.map((year) => {
            const selected = year.slug === yearSlug;
            return (
              <li key={year.slug} className="min-w-0">
                <Link
                  href={yearHref(year.slug, pathName, yearSlug)}
                  aria-label={year.title}
                  title={year.title}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "flex h-8 items-center justify-center truncate rounded-full text-sm font-semibold tabular-nums transition-colors",
                    selected
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_2px_6px_-1px_hsl(var(--sidebar-primary)/0.5)]"
                      : "text-sidebar-foreground/65 hover:bg-background hover:text-sidebar-foreground"
                  )}
                >
                  {year.slug}
                </Link>
              </li>
            );
          })}
        </ul>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const label = resolvedTheme === "dark" ? "Mode clair" : "Mode sombre";
  return (
    <SidebarMenuButton
      tooltip={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={label}
    >
      <Moon size={20} weight="duotone" aria-hidden className="dark:hidden" />
      <Sun size={20} weight="duotone" aria-hidden className="hidden dark:block" />
      <span>
        <span className="dark:hidden">Mode sombre</span>
        <span className="hidden dark:inline">Mode clair</span>
      </span>
    </SidebarMenuButton>
  );
}

function CollapseButton() {
  const { state, toggleSidebar, isMobile } = useSidebar();
  if (isMobile) return null;
  const label = state === "expanded" ? "Réduire le menu" : "Agrandir le menu";
  return (
    <SidebarMenuButton tooltip={label} onClick={toggleSidebar} aria-label={`${label} (Ctrl + B)`}>
      <SidebarSimple size={20} weight="duotone" aria-hidden />
      <span className="flex flex-1 items-center justify-between">
        {label}
        <kbd className="rounded border border-sidebar-border bg-background px-1.5 font-sans text-[10px] font-medium text-sidebar-foreground/60">
          Ctrl B
        </kbd>
      </span>
    </SidebarMenuButton>
  );
}

export function AppSidebar({ pathName, years, yearSlug }: Props) {
  const { setOpenMobile } = useSidebar();
  const currentYear = years.find((year) => year.slug === yearSlug);

  // Close the mobile drawer after navigating.
  useEffect(() => {
    setOpenMobile(false);
  }, [pathName, setOpenMobile]);

  const exploreItems: Item[] = explore.map((item) => ({
    ...item,
    active: item.href === "/" ? pathName === "/" : pathName === item.href || pathName.startsWith(`${item.href}/`),
  }));

  const yearItems: Item[] = yearSlug
    ? [
        {
          href: `/years/${yearSlug}`,
          label: "Resources",
          icon: FolderOpen,
          active: pathName === `/years/${yearSlug}` || pathName === `/years/${yearSlug}/module`,
        },
        { href: `/years/${yearSlug}/guide`, label: "Guide", icon: MapTrifold, active: pathName === `/years/${yearSlug}/guide` },
        {
          href: `/years/${yearSlug}/moyenne`,
          label: "Calcul de moyenne",
          icon: Calculator,
          active: pathName === `/years/${yearSlug}/moyenne`,
        },
      ]
    : [];

  return (
    <Sidebar mobileTitle="Pharma at Hand">
      <nav id="main-nav" aria-label="Navigation principale" className="contents">
      <SidebarHeader className="relative overflow-hidden pb-4 pt-5">
        <div
          aria-hidden
          className="molecule-pattern pointer-events-none absolute inset-0 text-sidebar-primary opacity-[0.09] [mask-position:-14px_-18px] group-data-[collapsible=icon]:hidden"
        />
        <Link
          href="/"
          aria-label="Pharma at Hand, accueil"
          className="relative flex items-center gap-3 rounded-xl p-1 outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <img
            src="/icon-192x192.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-xl shadow-[0_4px_12px_-4px_rgba(37,99,235,0.6)]"
          />
          <span className="grid min-w-0 leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate text-[15px] font-bold tracking-tight">Pharma at Hand</span>
            <span className="truncate text-xs text-sidebar-foreground/60">All that you need in one place</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="pb-2">
        {years.length > 0 && <YearSwitcher years={years} pathName={pathName} yearSlug={yearSlug} />}

        {yearSlug && (
          <SidebarGroup>
            <SidebarGroupLabel>{currentYear?.title ?? `Année ${yearSlug}`}</SidebarGroupLabel>
            <SidebarGroupContent>
              <NavItems items={yearItems} />
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Explorer</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavItems items={exploreItems} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />
      <SidebarFooter className="pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <SidebarMenu>
          <SidebarMenuItem>
            <ThemeButton />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <CollapseButton />
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-1 px-1 group-data-[collapsible=icon]:hidden">
          <a
            href="https://www.instagram.com/pharma.at.hand/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <InstagramLogo size={20} weight="duotone" />
          </a>
          <a
            href="https://t.me/pharma_at_hand"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <TelegramLogo size={20} weight="duotone" />
          </a>
          <span className="ml-auto pr-1 text-[11px] text-sidebar-foreground/50">@pharma.at.hand</span>
        </div>
      </SidebarFooter>
      </nav>
      <SidebarRail />
    </Sidebar>
  );
}
