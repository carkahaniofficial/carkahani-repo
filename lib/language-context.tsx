"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ur"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    reviews: "Reviews",
    carsInfo: "Cars Info",
    gallery: "Gallery",
    blog: "Blog",
    contact: "Contact",
    about: "About",

    // Hero Section
    heroTitle: "Every Car Has Its Own",
    heroStory: "Story",
    heroSubtitle: "Discover the stories behind every car. Reviews, news, and passion for automotive excellence.",
    exploreReviews: "Explore Reviews",
    viewGallery: "View Gallery",

    // Featured Reviews
    featuredReviews: "Featured Reviews",
    featuredSubtitle: "In-depth reviews of the latest and greatest cars from around the world",
    readFullReview: "Read Full Review",
    viewAllReviews: "View All Reviews",

    // Stats
    carReviews: "Car Reviews",
    communityMembers: "Community Members",
    carsInDatabase: "Cars in Database",

    // Latest News
    latestNews: "Latest News",
    newsSubtitle: "Stay updated with the latest automotive news and industry trends",
    readMore: "Read More",
    viewAllNews: "View All News",

    // Footer
    footerTagline: "Your ultimate destination for car reviews, news, and automotive stories.",
    quickLinks: "Quick Links",
    categories: "Categories",
    sportsCars: "Sports Cars",
    classicCars: "Classic Cars",
    electricVehicles: "Electric Vehicles",
    luxuryCars: "Luxury Cars",
    allRightsReserved: "All rights reserved.",

    // Theme
    lightMode: "Light Mode",
    darkMode: "Dark Mode",

    // Cars Database
    searchCars: "Search cars...",
    filterByBrand: "Filter by Brand",
    filterByCategory: "Filter by Category",
    allBrands: "All Brands",
    allCategories: "All Categories",
    viewDetails: "View Details",
    price: "Price",
    engine: "Engine",
    power: "Power",
    topSpeed: "Top Speed",
    acceleration: "0-100 km/h",
    backToCars: "Back to Cars Database",
  },
  ur: {
    // Navigation
    home: "ہوم",
    reviews: "جائزے",
    carsInfo: "کاروں کی معلومات",
    gallery: "گیلری",
    blog: "بلاگ",
    contact: "رابطہ",
    about: "ہمارے بارے میں",

    // Hero Section
    heroTitle: "ہر کار کی اپنی",
    heroStory: "کہانی",
    heroSubtitle: "ہر کار کی کہانی دریافت کریں۔ جائزے، خبریں، اور آٹوموٹو کی بہترین کے لیے جذبہ۔",
    exploreReviews: "جائزے دیکھیں",
    viewGallery: "گیلری دیکھیں",

    // Featured Reviews
    featuredReviews: "نمایاں جائزے",
    featuredSubtitle: "دنیا بھر کی جدید ترین اور بہترین کاروں کے تفصیلی جائزے",
    readFullReview: "مکمل جائزہ پڑھیں",
    viewAllReviews: "تمام جائزے دیکھیں",

    // Stats
    carReviews: "کار جائزے",
    communityMembers: "کمیونٹی ممبرز",
    carsInDatabase: "ڈیٹابیس میں کاریں",

    // Latest News
    latestNews: "تازہ خبریں",
    newsSubtitle: "جدید ترین آٹوموٹو خبروں اور انڈسٹری کے رجحانات سے اپ ڈیٹ رہیں",
    readMore: "مزید پڑھیں",
    viewAllNews: "تمام خبریں دیکھیں",

    // Footer
    footerTagline: "کار جائزے، خبریں، اور آٹوموٹو کہانیوں کی حتمی منزل۔",
    quickLinks: "فوری لنکس",
    categories: "کیٹگریز",
    sportsCars: "اسپورٹس کاریں",
    classicCars: "کلاسک کاریں",
    electricVehicles: "برقی گاڑیاں",
    luxuryCars: "لگژری کاریں",
    allRightsReserved: "تمام حقوق محفوظ ہیں۔",

    // Theme
    lightMode: "روشن موڈ",
    darkMode: "تاریک موڈ",

    // Cars Database
    searchCars: "کاریں تلاش کریں...",
    filterByBrand: "برانڈ کے ذریعے فلٹر کریں",
    filterByCategory: "کیٹگری کے ذریعے فلٹر کریں",
    allBrands: "تمام برانڈز",
    allCategories: "تمام کیٹگریز",
    viewDetails: "تفصیلات دیکھیں",
    price: "قیمت",
    engine: "انجن",
    power: "طاقت",
    topSpeed: "زیادہ سے زیادہ رفتار",
    acceleration: "0-100 کلومیٹر فی گھنٹہ",
    backToCars: "کاروں کے ڈیٹابیس میں واپس",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
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
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
