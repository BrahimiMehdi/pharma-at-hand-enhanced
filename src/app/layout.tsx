import "./globals.css"
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['cyrillic'] })
import LayoutWrapper from "@/components/LayoutWrapper"
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        </body>
    </html>
  )
}
