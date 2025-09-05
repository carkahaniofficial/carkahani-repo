"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/language-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("reviews"), href: "/reviews" },
    { name: t("carsInfo"), href: "/cars" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("blog"), href: "/blog" },
    { name: t("contact"), href: "/contact" },
    { name: t("about"), href: "/about" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 lg:space-x-3 text-primary-foreground flex-shrink-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000927062309660cc17c372d1d1-RTrV00uvSOWTWHwYSeGZDy0yTwCB8B.png"
              alt="Car Kahani Logo"
              width={32}
              height={32}
              className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
            />
            <span className="font-bold text-lg sm:text-xl lg:text-2xl">Car Kahani</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-primary-foreground hover:text-primary-foreground/80 px-4 py-3 rounded-md text-base xl:text-lg font-medium transition-all duration-200 hover:underline underline-offset-4 hover:bg-primary-foreground/10"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="hidden sm:flex items-center space-x-3 lg:space-x-4">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-primary-foreground hover:text-primary-foreground/80 h-8 w-8 sm:h-9 sm:w-9 p-0"
              >
                {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-primary-foreground/10">
          <div className="px-4 py-3 space-y-1 bg-primary/95 backdrop-blur-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 hover:bg-primary-foreground/10"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile theme and language toggles */}
            <div className="flex items-center justify-center space-x-4 pt-4 pb-2 border-t border-primary-foreground/10 mt-4">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
