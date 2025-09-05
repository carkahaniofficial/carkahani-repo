"use client"

import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense, useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { useLanguage } from "@/lib/language-context"
import "./globals.css"

function DynamicHtml({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang={mounted ? language : "en"} dir={mounted && language === "ur" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>{children}</body>
    </html>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <DynamicHtml>
      <ThemeProvider>
        <Suspense
          fallback={
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          {children}
        </Suspense>
      </ThemeProvider>
      <Analytics />
    </DynamicHtml>
  )
}
