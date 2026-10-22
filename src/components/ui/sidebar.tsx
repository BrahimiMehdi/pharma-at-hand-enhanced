"use client";

// Adapted from shadcn/ui's Sidebar (Tailwind v3 build). Differences: the drawer takes over below `lg`
// rather than `md`, and the open state persists in localStorage because the root layout is static
// and cannot read a cookie.

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { SidebarSimple } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_STORAGE_KEY = "sidebar_state";
const SIDEBAR_WIDTH = "17rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "4rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

const SidebarProvider = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, style, children, ...props }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    const [open, setOpenState] = React.useState(true);
    // Transitions stay off until the saved state is applied, so a collapsed sidebar doesn't animate shut on load.
    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
      try {
        if (window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "false") setOpenState(false);
      } catch {}
      const id = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(id);
    }, []);

    const setOpen = React.useCallback((value: boolean) => {
      setOpenState(value);
      try {
        window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(value));
      } catch {}
    }, []);

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) setOpenMobile((value) => !value);
      else setOpen(!open);
    }, [isMobile, open, setOpen]);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContextValue>(
      () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
      [state, open, setOpen, isMobile, openMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            data-ready={ready || undefined}
            className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { collapsible?: "offcanvas" | "icon" | "none"; mobileTitle?: string }
>(({ collapsible = "icon", mobileTitle = "Menu", className, children, ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          closeLabel="Fermer le menu"
          className="w-[--sidebar-width] p-0 text-sidebar-foreground [&>button]:hidden"
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
          side="left"
        >
          <SheetTitle className="sr-only">{mobileTitle}</SheetTitle>
          <SheetDescription className="sr-only">Navigation du site</SheetDescription>
          <div className="flex h-full w-full flex-col bg-sidebar">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="group peer hidden text-sidebar-foreground lg:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
    >
      {/* Reserves the sidebar's width in the page flow. */}
      <div
        className={cn(
          "relative h-svh w-[--sidebar-width] bg-transparent group-data-[ready]/sidebar-wrapper:transition-[width] group-data-[ready]/sidebar-wrapper:duration-200 group-data-[ready]/sidebar-wrapper:ease-out",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-10 hidden h-svh w-[--sidebar-width] border-r border-sidebar-border lg:flex",
          "group-data-[ready]/sidebar-wrapper:transition-[left,width] group-data-[ready]/sidebar-wrapper:duration-200 group-data-[ready]/sidebar-wrapper:ease-out",
          "group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
          "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
          className
        )}
        {...props}
      >
        <div data-sidebar="sidebar" className="flex h-full w-full flex-col bg-sidebar">
          {children}
        </div>
      </div>
    </div>
  );
});
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentProps<typeof Button>>(
  ({ className, onClick, children, ...props }, ref) => {
    const { toggleSidebar, open, isMobile, openMobile } = useSidebar();
    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        aria-expanded={isMobile ? openMobile : open}
        className={cn("h-9 w-9", className)}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        {children ?? <SidebarSimple size={20} />}
      </Button>
    );
  }
);
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar, state } = useSidebar();
    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label={state === "expanded" ? "Réduire la barre latérale" : "Agrandir la barre latérale"}
        tabIndex={-1}
        onClick={toggleSidebar}
        title={state === "expanded" ? "Réduire" : "Agrandir"}
        className={cn(
          "absolute inset-y-0 -right-2 z-20 hidden w-4 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border lg:flex",
          "cursor-w-resize group-data-[state=collapsed]:cursor-e-resize",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative flex min-h-svh min-w-0 flex-1 flex-col bg-background", className)} {...props} />
));
SidebarInset.displayName = "SidebarInset";

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} data-sidebar="header" className={cn("flex flex-col gap-2 p-3", className)} {...props} />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-3", className)} {...props} />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, React.ComponentProps<typeof Separator>>(
  ({ className, ...props }, ref) => (
    <Separator ref={ref} data-sidebar="separator" className={cn("mx-3 w-auto bg-sidebar-border", className)} {...props} />
  )
);
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="content"
    className={cn(
      "flex min-h-0 flex-1 flex-col gap-1 overflow-auto overscroll-contain group-data-[collapsible=icon]:overflow-hidden",
      className
    )}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} data-sidebar="group" className={cn("relative flex w-full min-w-0 flex-col px-3 py-2", className)} {...props} />
));
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        data-sidebar="group-label"
        className={cn(
          "flex h-8 shrink-0 items-center rounded-md px-2.5 text-xs font-semibold text-sidebar-foreground/60 outline-none transition-[margin,opacity] duration-200 ease-out",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-0.5", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  [
    "peer/menu-button relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-2.5 text-left text-sm font-medium outline-none transition-[width,height,padding,background-color,color] duration-150",
    "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground",
    "focus-visible:ring-2 focus-visible:ring-sidebar-ring active:bg-sidebar-accent",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[active=true]:bg-sidebar-primary/10 data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary",
    "group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:!px-[11px]",
    "[&>span:last-child]:truncate [&>svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      size: {
        default: "h-10",
        lg: "h-12",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild = false, isActive = false, size, tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ size }), className)}
      {...props}
    />
  );

  if (!tooltip) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
