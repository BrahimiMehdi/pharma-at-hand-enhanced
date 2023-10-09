import "./globals.css";
import { MainContextProvider } from "./context/MainContext";
import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["cyrillic"] });
export const metadata: Metadata = {
  title: "Pharma at Hand",
  description: "All the resources you need for pharmacy",
  manifest: "/manifest.json",
};
import NavLayout from "@/components/Nav/NavLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-background`}>
        <Script strategy="afterInteractive" defer src={`https://www.googletagmanager.com/gtag/js?id=${process.env.ANALYTICS_TAG}`} />
        <Script  strategy="afterInteractive" defer id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.ANALYTICS_TAG}');
        `}
        </Script>
        <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="system">
          <MainContextProvider>
            <NavLayout>{children}</NavLayout>
          </MainContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
