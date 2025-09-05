"use client"

import type React from "react"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { useLanguage } from "@/lib/language-context"
import "./globals.css"

function DynamicHtml({ children }: { children: React.ReactNode }) {
  const { language, mounted } = useLanguage()

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div lang={language} dir={language === "ur" ? "rtl" : "ltr"}>
      {children}
    </div>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <DynamicHtml>{children}</DynamicHtml>
      </Suspense>
    </ThemeProvider>
  )
}
