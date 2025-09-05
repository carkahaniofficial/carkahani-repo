"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for car reviews with updated image URLs
const carReviews = [
  {
    id: 1,
    title: "2024 Porsche 911 Turbo S",
    brand: "Porsche",
    category: "Sports",
    rating: 4.8,
    reviewCount: 24,
    summary: "The ultimate sports car experience with incredible performance and luxury.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&crop=center",
    price: "$230,000",
    year: 2024,
  },
  {
    id: 2,
    title: "Tesla Model S Plaid",
    brand: "Tesla",
    category: "Electric",
    rating: 4.6,
    reviewCount: 18,
    summary: "Electric performance redefined with ludicrous speed and cutting-edge tech.",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&crop=center",
    price: "$135,000",
    year: 2024,
  },
  {
    id: 3,
    title: "BMW M3 Competition",
    brand: "BMW",
    category: "Sports",
    rating: 4.7,
    reviewCount: 31,
    summary: "The perfect blend of daily usability and track-ready performance.",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center",
    price: "$75,000",
    year: 2024,
  },
  {
    id: 4,
    title: "Mercedes-AMG GT 63 S",
    brand: "Mercedes",
    category: "Luxury",
    rating: 4.5,
    reviewCount: 15,
    summary: "Luxury meets performance in this stunning grand tourer.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center",
    price: "$165,000",
    year: 2024,
  },
  {
    id: 5,
    title: "Audi RS6 Avant",
    brand: "Audi",
    category: "Wagon",
    rating: 4.4,
    reviewCount: 22,
    summary: "The ultimate performance wagon for the family-minded enthusiast.",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop&crop=center",
    price: "$120,000",
    year: 2024,
  },
  {
    id: 6,
    title: "Lamborghini Huracán EVO",
    brand: "Lamborghini",
    category: "Supercar",
    rating: 4.9,
    reviewCount: 12,
    summary: "Pure Italian passion and engineering excellence in supercar form.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center",
    price: "$280,000",
    year: 2024,
  },
  {
    id: 7,
    title: "Ferrari F8 Tributo",
    brand: "Ferrari",
    category: "Supercar",
    rating: 4.9,
    reviewCount: 8,
    summary: "Mid-engine masterpiece from Maranello with racing DNA.",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&crop=center",
    price: "$280,000",
    year: 2024,
  },
  {
    id: 8,
    title: "McLaren 720S",
    brand: "McLaren",
    category: "Supercar",
    rating: 4.8,
    reviewCount: 14,
    summary: "British engineering excellence with mind-bending performance.",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop&crop=center",
    price: "$300,000",
    year: 2024,
  },
  {
    id: 9,
    title: "Bugatti Chiron",
    brand: "Bugatti",
    category: "Hypercar",
    rating: 5.0,
    reviewCount: 3,
    summary: "The pinnacle of automotive engineering and luxury.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center",
    price: "$3,000,000",
    year: 2024,
  },
  {
    id: 10,
    title: "Koenigsegg Jesko",
    brand: "Koenigsegg",
    category: "Hypercar",
    rating: 4.9,
    reviewCount: 2,
    summary: "Swedish hypercar engineering at its absolute finest.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop&crop=center",
    price: "$3,500,000",
    year: 2024,
  },
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [visibleReviews, setVisibleReviews] = useState(6)

  const filteredReviews = carReviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === "" || review.brand === selectedBrand
    const matchesCategory = selectedCategory === "" || review.category === selectedCategory
    return matchesSearch && matchesBrand && matchesCategory
  })

  const displayedReviews = filteredReviews.slice(0, visibleReviews)
  const hasMoreReviews = visibleReviews < filteredReviews.length

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 6)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setVisibleReviews(6) // Reset visible reviews when searching
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Car Reviews</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              In-depth reviews and ratings of the latest cars from top automotive experts
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search reviews..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 border rounded-md bg-background"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                <option value="Porsche">Porsche</option>
                <option value="Tesla">Tesla</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Audi">Audi</option>
                <option value="Lamborghini">Lamborghini</option>
                <option value="Ferrari">Ferrari</option>
                <option value="McLaren">McLaren</option>
                <option value="Bugatti">Bugatti</option>
                <option value="Koenigsegg">Koenigsegg</option>
              </select>
              <select
                className="px-3 py-2 border rounded-md bg-background"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Sports">Sports</option>
                <option value="Electric">Electric</option>
                <option value="Luxury">Luxury</option>
                <option value="Wagon">Wagon</option>
                <option value="Supercar">Supercar</option>
                <option value="Hypercar">Hypercar</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map((review) => (
            <Card key={review.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg cursor-pointer">
                <Image
                  src={
                    review.image ||
                    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop&crop=center"
                  }
                  alt={review.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src =
                      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop&crop=center"
                  }}
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = review.image
                    link.download = `${review.title.replace(/\s+/g, "-")}.jpg`
                    link.target = "_blank"
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{review.category}</Badge>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{review.brand}</Badge>
                  <span className="text-sm font-semibold text-primary">{review.price}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{review.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(review.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {review.rating}/5 ({review.reviewCount} reviews)
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">{review.summary}</CardDescription>
                <Button className="w-full" asChild>
                  <Link href={`/reviews/${review.id}`}>Read Full Review</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {hasMoreReviews && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" onClick={handleLoadMore}>
              Load More Reviews ({filteredReviews.length - visibleReviews} remaining)
            </Button>
          </div>
        )}

        {filteredReviews.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground text-lg">No reviews found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setSelectedBrand("")
                setSelectedCategory("")
                setVisibleReviews(6)
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
