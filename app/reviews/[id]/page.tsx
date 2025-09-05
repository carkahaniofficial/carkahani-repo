"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, ArrowLeft, Share2, Heart, Gauge, Zap, Fuel, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

// Mock detailed review data with updated image URLs
const reviewsData: Record<string, any> = {
  "1": {
    id: 1,
    title: "2024 Porsche 911 Turbo S",
    brand: "Porsche",
    category: "Sports Car",
    rating: 4.8,
    reviewCount: 24,
    price: "$230,000",
    year: 2024,
    summary: "The ultimate sports car experience with incredible performance and luxury.",
    mainImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop&crop=center",
    ],
    specs: {
      engine: "3.8L Twin-Turbo Flat-6",
      horsepower: "640 hp",
      torque: "590 lb-ft",
      acceleration: "0-60 mph in 2.6s",
      topSpeed: "205 mph",
      transmission: "8-Speed PDK",
      drivetrain: "AWD",
      fuelEconomy: "15/22 mpg",
    },
    pros: [
      "Incredible acceleration and top speed",
      "Exceptional build quality and luxury",
      "Advanced all-wheel-drive system",
      "Timeless 911 design language",
      "Daily drivable despite performance",
    ],
    cons: ["Very expensive price point", "Limited rear seat space", "High maintenance costs", "Firm ride quality"],
    review: `The 2024 Porsche 911 Turbo S represents the pinnacle of sports car engineering, combining breathtaking performance with everyday usability. The twin-turbocharged flat-six engine delivers an intoxicating 640 horsepower, propelling this machine from 0-60 mph in just 2.6 seconds.

The interior showcases Porsche's commitment to luxury, with premium materials throughout and an intuitive infotainment system. The driving experience is nothing short of extraordinary, with precise steering, exceptional grip, and a soundtrack that will give you goosebumps.

While the price tag is substantial, the 911 Turbo S justifies every penny with its combination of performance, luxury, and that unmistakable Porsche character that has made it an icon for decades.`,
  },
  "2": {
    id: 2,
    title: "Tesla Model S Plaid",
    brand: "Tesla",
    category: "Electric Sedan",
    rating: 4.6,
    reviewCount: 18,
    price: "$135,000",
    year: 2024,
    summary: "Electric performance redefined with ludicrous speed and cutting-edge tech.",
    mainImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center",
    ],
    specs: {
      engine: "Tri-Motor Electric",
      horsepower: "1,020 hp",
      torque: "1,050 lb-ft",
      acceleration: "0-60 mph in 1.99s",
      topSpeed: "200 mph",
      transmission: "Single-Speed",
      drivetrain: "AWD",
      range: "396 miles EPA",
    },
    pros: [
      "Fastest production sedan ever made",
      "Incredible range and efficiency",
      "Cutting-edge autopilot technology",
      "Minimalist luxury interior",
      "Over-the-air software updates",
    ],
    cons: [
      "Build quality inconsistencies",
      "Limited service network",
      "Yoke steering wheel polarizing",
      "High replacement part costs",
    ],
    review: `The Tesla Model S Plaid is a technological tour de force that redefines what an electric vehicle can be. With over 1,000 horsepower from its tri-motor setup, it delivers acceleration that borders on the surreal - 0-60 mph in under 2 seconds.

The minimalist interior centers around a massive touchscreen that controls virtually every function. While some may miss traditional controls, the interface is intuitive and responsive. The autopilot system represents the cutting edge of autonomous driving technology.

Range anxiety is virtually eliminated with 396 miles of EPA-rated range, and the Supercharger network makes long-distance travel feasible. This is the future of performance cars, wrapped in a practical sedan package.`,
  },
}

interface ReviewPageProps {
  params: {
    id: string
  }
}

export default function ReviewPage({ params }: ReviewPageProps) {
  const [isSaved, setIsSaved] = useState(false)
  const review = reviewsData[params.id]

  if (!review) {
    notFound()
  }

  const handleSaveReview = () => {
    setIsSaved(!isSaved)
    const savedReviews = JSON.parse(localStorage.getItem("savedReviews") || "[]")
    if (!isSaved) {
      savedReviews.push(review.id)
      localStorage.setItem("savedReviews", JSON.stringify(savedReviews))
    } else {
      const updatedSaved = savedReviews.filter((id: number) => id !== review.id)
      localStorage.setItem("savedReviews", JSON.stringify(updatedSaved))
    }
  }

  const handleShareReview = async () => {
    const shareUrl = `${window.location.origin}/reviews/${review.id}`
    const shareData = {
      title: review.title,
      text: `Check out this review of the ${review.title}`,
      url: shareUrl,
    }

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        console.log("Review shared successfully")
      } catch (err: any) {
        console.log("Error sharing:", err)
        // Fallback to clipboard if user cancels or error occurs
        if (err.name !== "AbortError") {
          copyToClipboard(shareUrl)
        }
      }
    } else {
      // Fallback: copy to clipboard
      copyToClipboard(shareUrl)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert("Review link copied to clipboard!")
    } catch (err) {
      // Final fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      alert("Review link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/reviews" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Reviews
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge>{review.category}</Badge>
              <Badge variant="outline">{review.year}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{review.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(review.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{review.rating}/5</span>
                <span className="text-muted-foreground">({review.reviewCount} reviews)</span>
              </div>
              <span className="text-2xl font-bold text-primary">{review.price}</span>
            </div>
            <p className="text-lg text-muted-foreground mb-6">{review.summary}</p>
            <div className="flex gap-4">
              <Button
                className={`flex items-center gap-2 ${isSaved ? "bg-red-500 hover:bg-red-600" : ""}`}
                onClick={handleSaveReview}
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save Review"}
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent" onClick={handleShareReview}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src={review.mainImage || "/placeholder.svg"}
              alt={review.title}
              width={600}
              height={400}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Engine</p>
                  <p className="font-semibold">{review.specs.engine}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Gauge className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horsepower</p>
                  <p className="font-semibold">{review.specs.horsepower}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">0-60 mph</p>
                  <p className="font-semibold">{review.specs.acceleration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Fuel className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Top Speed</p>
                  <p className="font-semibold">{review.specs.topSpeed}</p>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Torque:</span>
                <span className="ml-2 font-medium">{review.specs.torque}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Transmission:</span>
                <span className="ml-2 font-medium">{review.specs.transmission}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Drivetrain:</span>
                <span className="ml-2 font-medium">{review.specs.drivetrain}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Fuel Economy:</span>
                <span className="ml-2 font-medium">{review.specs.fuelEconomy || review.specs.range}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Review Content */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Full Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {review.review.split("\n\n").map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4 text-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Pros */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Pros</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {review.pros.map((pro: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Cons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Cons</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {review.cons.map((con: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-6">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {review.gallery.map((image: string, index: number) => (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${review.title} gallery ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => {
                  window.open(image, "_blank")
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
