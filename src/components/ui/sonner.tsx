"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "oklch(0.623 0.214 259.815)",
          "--normal-text": "white",
          "--normal-border": "white",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
