"use client"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getLanguageDisplay = () => {
    switch (language) {
      case "en":
        return "EN"
      case "ur":
        return "اردو"
      default:
        return "EN"
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-primary-foreground/80">
        <Languages className="h-[1.2rem] w-[1.2rem]" />
        <span className="ml-2 text-sm font-medium">EN</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-primary-foreground/80">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="ml-2 text-sm font-medium">{getLanguageDisplay()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ur")}>اردو</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
