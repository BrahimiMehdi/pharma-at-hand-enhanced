import NavLayout from "@/components/Nav/NavLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { constructeMetadata } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import type { Viewport } from "next";
import { Toaster } from "@/components/ui/sonner"
import { getYearLinks } from "@/components/queries";
import "./globals.css";
const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
export const dynamic ="force-static"
export const metadata = constructeMetadata()
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The sidebar's year switcher is a nicety; never fail the whole page over it.
  const years = await getYearLinks().catch(() => []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} bg-background`}>
        <Script  defer src={`https://www.googletagmanager.com/gtag/js?id=${process.env.ANALYTICS_TAG}`} />
        <Script   defer id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.ANALYTICS_TAG}');
        `}
        </Script>
        <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="system">
          <NavLayout years={years}>{children}</NavLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
