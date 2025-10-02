import NavLayout from "@/components/Nav/NavLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { constructeMetadata } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { MainContextProvider } from "./context/MainContext";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
const montserrat = Montserrat({ subsets: ["cyrillic"] });
export const dynamic ="force-static"
export const metadata = constructeMetadata()
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
          <MainContextProvider>
            <NavLayout>
              {children}</NavLayout>
            <Toaster />
          </MainContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
