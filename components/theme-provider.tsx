"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("car-kahani-theme") as Theme
    if (saved && (saved === "light" || saved === "dark" || saved === "system")) {
      setTheme(saved)
    }
  }, [])

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    if (mounted) {
      localStorage.setItem("car-kahani-theme", newTheme)
      applyTheme(newTheme)
    }
  }

  const applyTheme = (currentTheme: Theme) => {
    const root = document.documentElement
    root.classList.remove("light", "dark")

    if (currentTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(currentTheme)
    }
  }

  useEffect(() => {
    if (mounted) {
      applyTheme(theme)
    }
  }, [theme, mounted])

  useEffect(() => {
    if (mounted && theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => applyTheme("system")

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, mounted])

  return <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, mounted }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
