import "./globals.css";
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
      <body className={montserrat.className}>
        <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="system">
          <NavLayout>{children}</NavLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
