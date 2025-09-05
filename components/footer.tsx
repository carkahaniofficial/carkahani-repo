"use client"
import Link from "next/link"
import { Instagram, Youtube, Facebook } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000927062309660cc17c372d1d1-RTrV00uvSOWTWHwYSeGZDy0yTwCB8B.png"
                alt="Car Kahani Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="font-bold text-xl">Car Kahani</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md text-sm sm:text-base">{t("footerTagline")}</p>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/carkahani_official"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link
                href="https://www.youtube.com/@carkahani_official"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link
                href="https://facebook.com/CarKahani"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/reviews"
                  className="text-gray-300 hover:text-primary transition-colors text-sm sm:text-base"
                >
                  {t("reviews")}
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-gray-300 hover:text-primary transition-colors text-sm sm:text-base">
                  {t("carsInfo")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-300 hover:text-primary transition-colors text-sm sm:text-base"
                >
                  {t("gallery")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors text-sm sm:text-base">
                  {t("about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">{t("categories")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/gallery?category=sports"
                  className="text-gray-300 hover:text-primary transition-colors text-sm sm:text-base"
                >
                  {t("sportsCars")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery?category=classics"
                  className="text-gray-300 hover:text-primary transition-colors text-sm sm:text-base"
                >
                  {t("classicCars")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery?category=evs"
                  className="text-gray-300 hover:text-primary transition-colors text-sm sm:text-base"
                >
                  {t("electricVehicles")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery?category=luxury"
                  className="text-gray-300 hover:text-primary transition-colors text-sm sm:text-base"
                >
                  {t("luxuryCars")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-300 text-xs sm:text-sm">
            © 2025 Car Kahani. {t("allRightsReserved")} | Har Car Ki Apni Kahani
          </p>
        </div>
      </div>
    </footer>
  )
}
