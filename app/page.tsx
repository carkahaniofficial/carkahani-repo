"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ArrowRight, Calendar, Users, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useState } from "react"
import { ImageModal } from "@/components/image-modal"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Car Kahani",
  description:
    "Every Car Has Its Own Story - Discover in-depth car reviews, latest automotive news, and passion for automotive excellence.",
  url: "https://car-kahani.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://car-kahani.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

export default function HomePage() {
  const { t } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop&crop=center",
      alt: "Sports car hero image",
      title: "Modern Sports Car at Sunset",
      category: "Hero",
    },
  ]

  const reviewImages = [
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&crop=center",
      alt: "2024 Porsche 911 Turbo S",
      title: "2024 Porsche 911 Turbo S",
      category: "Review",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&crop=center",
      alt: "Tesla Model S Plaid",
      title: "Tesla Model S Plaid",
      category: "Review",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center",
      alt: "BMW M3 Competition",
      title: "BMW M3 Competition",
      category: "Review",
    },
  ]

  const newsImages = [
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop&crop=center",
      alt: "Electric Vehicle Sales Surge in 2024",
      title: "Electric Vehicle Sales Surge in 2024",
      category: "News",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center",
      alt: "New Hypercar Breaks Speed Records",
      title: "New Hypercar Breaks Speed Records",
      category: "News",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&crop=center",
      alt: "Autonomous Driving Technology Advances",
      title: "Autonomous Driving Technology Advances",
      category: "News",
    },
  ]

  const allImages = [...heroImages, ...reviewImages, ...newsImages]

  const handleImageClick = (imageId: number) => {
    const index = allImages.findIndex((img) => img.id === imageId)
    if (index !== -1) {
      setCurrentImageIndex(index)
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <main>
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => handleImageClick(1)}>
              <Image
                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop&crop=center"
                alt="Sports car hero image - Modern luxury sports car on highway at sunset"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center text-white max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 lg:px-8">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 lg:mb-8 xl:mb-12 text-balance">
                {t("heroTitle")} <span className="text-primary">{t("heroStory")}</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-8 lg:mb-12 xl:mb-16 text-balance opacity-90 max-w-4xl mx-auto">
                {t("heroSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 xl:gap-8 justify-center">
                <Button
                  size="lg"
                  className="text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8"
                  asChild
                >
                  <Link href="/reviews">
                    {t("exploreReviews")} <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  asChild
                >
                  <Link href="/gallery">{t("viewGallery")}</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Featured Reviews Section */}
          <section className="py-12 sm:py-16 lg:py-24 xl:py-32 px-4 lg:px-8 max-w-7xl xl:max-w-8xl mx-auto">
            <header className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">
                {t("featuredReviews")}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg lg:text-xl xl:text-2xl max-w-2xl lg:max-w-4xl mx-auto">
                {t("featuredSubtitle")}
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
              {[
                {
                  title: "2024 Porsche 911 Turbo S",
                  rating: 4.8,
                  summary: "The ultimate sports car experience with incredible performance and luxury.",
                  image:
                    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&crop=center",
                  imageId: 2,
                },
                {
                  title: "Tesla Model S Plaid",
                  rating: 4.6,
                  summary: "Electric performance redefined with ludicrous speed and cutting-edge tech.",
                  image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&crop=center",
                  imageId: 3,
                },
                {
                  title: "BMW M3 Competition",
                  rating: 4.7,
                  summary: "The perfect blend of daily usability and track-ready performance.",
                  image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center",
                  imageId: 4,
                },
              ].map((review, index) => (
                <article key={index}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div
                      className="relative overflow-hidden rounded-t-lg cursor-pointer"
                      onClick={() => handleImageClick(review.imageId)}
                    >
                      <Image
                        src={review.image || "/placeholder.svg"}
                        alt={`${review.title} - Car review image`}
                        width={400}
                        height={300}
                        className="w-full h-40 sm:h-48 lg:h-56 xl:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader className="p-4 sm:p-6 lg:p-8">
                      <CardTitle className="text-lg sm:text-xl lg:text-2xl">{review.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center"
                          role="img"
                          aria-label={`Rating: ${review.rating} out of 5 stars`}
                        >
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 lg:h-5 lg:w-5 ${
                                i < Math.floor(review.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm lg:text-base text-muted-foreground">{review.rating}/5</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 lg:p-8 pt-0">
                      <CardDescription className="mb-4 lg:mb-6 text-sm sm:text-base lg:text-lg">
                        {review.summary}
                      </CardDescription>
                      <Button variant="outline" className="w-full bg-transparent lg:text-base" asChild>
                        <Link href={`/reviews/${index + 1}`}>{t("readFullReview")}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-8 lg:mt-12 xl:mt-16">
              <Button size="lg" className="lg:text-lg lg:px-8 lg:py-6" asChild>
                <Link href="/reviews">
                  {t("viewAllReviews")} <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="bg-muted py-12 sm:py-16 lg:py-24 xl:py-32" aria-labelledby="stats-heading">
            <div className="max-w-7xl xl:max-w-8xl mx-auto px-4 lg:px-8">
              <h2 id="stats-heading" className="sr-only">
                Car Kahani Statistics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 text-center">
                <div className="flex flex-col items-center">
                  <div
                    className="bg-primary text-primary-foreground rounded-full p-3 sm:p-4 lg:p-6 xl:p-8 mb-4 lg:mb-6"
                    aria-hidden="true"
                  >
                    <Star className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 xl:h-16 xl:w-16" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 lg:mb-4">500+</h3>
                  <p className="text-muted-foreground text-sm sm:text-base lg:text-lg xl:text-xl">{t("carReviews")}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="bg-primary text-primary-foreground rounded-full p-3 sm:p-4 lg:p-6 xl:p-8 mb-4 lg:mb-6"
                    aria-hidden="true"
                  >
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 xl:h-16 xl:w-16" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 lg:mb-4">50K+</h3>
                  <p className="text-muted-foreground text-sm sm:text-base lg:text-lg xl:text-xl">
                    {t("communityMembers")}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="bg-primary text-primary-foreground rounded-full p-3 sm:p-4 lg:p-6 xl:p-8 mb-4 lg:mb-6"
                    aria-hidden="true"
                  >
                    <Zap className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 xl:h-16 xl:w-16" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 lg:mb-4">1000+</h3>
                  <p className="text-muted-foreground text-sm sm:text-base lg:text-lg xl:text-xl">
                    {t("carsInDatabase")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Latest News */}
          <section className="py-12 sm:py-16 lg:py-24 xl:py-32 px-4 lg:px-8 max-w-7xl xl:max-w-8xl mx-auto">
            <header className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">
                {t("latestNews")}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg lg:text-xl xl:text-2xl max-w-2xl lg:max-w-4xl mx-auto">
                {t("newsSubtitle")}
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
              {[
                {
                  title: "Electric Vehicle Sales Surge in 2024",
                  date: "Dec 15, 2024",
                  summary: "EV adoption continues to accelerate with new models and improved infrastructure.",
                  image:
                    "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop&crop=center",
                  imageId: 5,
                },
                {
                  title: "New Hypercar Breaks Speed Records",
                  date: "Dec 12, 2024",
                  summary: "Latest hypercar achieves unprecedented speeds on the test track.",
                  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center",
                  imageId: 6,
                },
                {
                  title: "Autonomous Driving Technology Advances",
                  date: "Dec 10, 2024",
                  summary: "Major breakthroughs in self-driving technology promise safer roads.",
                  image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&crop=center",
                  imageId: 7,
                },
              ].map((news, index) => (
                <article key={index}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div
                      className="relative overflow-hidden rounded-t-lg cursor-pointer"
                      onClick={() => handleImageClick(news.imageId)}
                    >
                      <Image
                        src={news.image || "/placeholder.svg"}
                        alt={`${news.title} - Automotive news image`}
                        width={300}
                        height={200}
                        className="w-full h-32 sm:h-40 lg:h-48 xl:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader className="p-4 sm:p-6 lg:p-8">
                      <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                        <time dateTime="2024-12-15">{news.date}</time>
                      </div>
                      <CardTitle className="text-base sm:text-lg lg:text-xl xl:text-2xl">{news.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 lg:p-8 pt-0">
                      <CardDescription className="mb-4 lg:mb-6 text-sm sm:text-base lg:text-lg">
                        {news.summary}
                      </CardDescription>
                      <Button variant="outline" size="sm" className="lg:text-base bg-transparent" asChild>
                        <Link href={`/blog/${index + 1}`}>{t("readMore")}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-8 lg:mt-12 xl:mt-16">
              <Button size="lg" className="lg:text-lg lg:px-8 lg:py-6" asChild>
                <Link href="/blog">
                  {t("viewAllNews")} <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          images={allImages}
          currentIndex={currentImageIndex}
          onNavigate={setCurrentImageIndex}
        />

        <Footer />
      </div>
    </>
  )
}
