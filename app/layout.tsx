import type React from "react"
import { LanguageProvider } from "@/lib/language-context"
import ClientLayout from "./clientLayout"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Car Kahani - Every Car Has Its Own Story",
    template: "%s | Car Kahani",
  },
  description:
    "Discover the stories behind every car. In-depth reviews, latest automotive news, and passion for automotive excellence. Your ultimate destination for car reviews and automotive stories.",
  keywords: [
    "car reviews",
    "automotive news",
    "car stories",
    "vehicle reviews",
    "car database",
    "automotive blog",
    "car gallery",
    "sports cars",
    "electric vehicles",
    "luxury cars",
  ],
  authors: [{ name: "Car Kahani Team" }],
  creator: "Car Kahani",
  publisher: "Car Kahani",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://car-kahani.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "ur-PK": "/ur-PK",
    },
  },
  openGraph: {
    title: "Car Kahani - Every Car Has Its Own Story",
    description:
      "Discover the stories behind every car. In-depth reviews, latest automotive news, and passion for automotive excellence.",
    url: "https://car-kahani.vercel.app",
    siteName: "Car Kahani",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=630&fit=crop&crop=center",
        width: 1200,
        height: 630,
        alt: "Car Kahani - Every Car Has Its Own Story",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Kahani - Every Car Has Its Own Story",
    description:
      "Discover the stories behind every car. In-depth reviews, latest automotive news, and passion for automotive excellence.",
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=630&fit=crop&crop=center"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <ClientLayout>{children}</ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
