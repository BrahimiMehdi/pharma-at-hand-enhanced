import "./globals.css";
import { MainContextProvider } from "./context/MainContext";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["cyrillic"] });
export const metadata: Metadata = {
  title: "Pharma at Hand",
  description: "All the resources you need for pharmacy",
  manifest:"/manifest.json"
};
import NavLayout from "@/components/Nav/NavLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-background`}>
        <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="system">
            <MainContextProvider>
          <NavLayout>
              {children}
          </NavLayout>
            </MainContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
