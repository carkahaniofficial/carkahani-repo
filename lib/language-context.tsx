"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ur"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  mounted: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)
  const [translations, setTranslations] = useState<Record<string, any>>({})

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [enTranslations, urTranslations] = await Promise.all([
          import("./translations/en.json"),
          import("./translations/ur.json"),
        ])

        setTranslations({
          en: enTranslations.default,
          ur: urTranslations.default,
        })
      } catch (error) {
        console.error("Failed to load translations:", error)
      }
    }

    loadTranslations()
    setMounted(true)

    const saved = localStorage.getItem("car-kahani-language") as Language
    if (saved && (saved === "en" || saved === "ur")) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (mounted) {
      localStorage.setItem("car-kahani-language", lang)
      document.documentElement.dir = lang === "ur" ? "rtl" : "ltr"
      document.documentElement.lang = lang
    }
  }

  const t = (key: string): string => {
    if (!translations[language]) return key
    return translations[language][key] || key
  }

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = language === "ur" ? "rtl" : "ltr"
      document.documentElement.lang = language
    }
  }, [language, mounted])

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
