"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Heart, Download, Share2 } from "lucide-react"
import Image from "next/image"
import { ImageModal } from "@/components/image-modal"

const galleryImages = [
  // Sports Cars
  {
    id: 1,
    title: "Porsche 911 Turbo S",
    category: "Sports",
    image: "https://hips.hearstapps.com/hmg-prod/images/2024-porsche-911-turbo-104-67360753d9afa.jpg?crop=0.513xw:0.433xh;0.250xw,0.358xh&resize=1200:*",
    photographer: "Car Kahani Team",
    likes: 245,
    downloads: 89,
  },
  {
    id: 2,
    title: "BMW M3 Competition",
    category: "Sports",
    image: "https://mediapool.bmwgroup.com/cache/P9/202206/P90468284/P90468284-the-first-ever-bmw-m3-touring-frozen-black-06-2022-600px.jpg",
    photographer: "Car Kahani Team",
    likes: 312,
    downloads: 124,
  },
  {
    id: 3,
    title: "Ferrari F8 Tributo",
    category: "Sports",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Ferrari_F8_Tributo_Genf_2019_1Y7A5665.jpg/1200px-Ferrari_F8_Tributo_Genf_2019_1Y7A5665.jpg",
    photographer: "Car Kahani Team",
    likes: 456,
    downloads: 178,
  },
  {
    id: 4,
    title: "Lamborghini Huracán",
    category: "Sports",
    image: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/huracan/evo/2022/10_06/over/hura_evo_over_01_m.jpg",
    photographer: "Car Kahani Team",
    likes: 389,
    downloads: 145,
  },
  {
    id: 5,
    title: "McLaren 720S",
    category: "Sports",
    image: "https://mclaren.scene7.com/is/image/mclaren/720S-Coupe_hero:crop-16x9?wid=1920&hei=1080",
    photographer: "Car Kahani Team",
    likes: 278,
    downloads: 98,
  },

  // Electric Vehicles
  {
    id: 6,
    title: "Tesla Model S Plaid",
    category: "EVs",
    image: "https://d2q97jj8nilsnk.cloudfront.net/images/tesla-model-s-plaid-0-60-fastest-tesla.jpg",
    photographer: "Car Kahani Team",
    likes: 189,
    downloads: 67,
  },
  {
    id: 7,
    title: "Tesla Model 3",
    category: "EVs",
    image: "https://media.ed.edmunds-media.com/tesla/model-3/2025/oem/2025_tesla_model-3_sedan_long-range_fq_oem_1_1600.jpg",
    photographer: "Car Kahani Team",
    likes: 234,
    downloads: 87,
  },
  {
    id: 8,
    title: "BMW iX Electric SUV",
    category: "EVs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxuf5cD3NRzo99Zv1WUrInk7UcM9svl7UKzA&s",
    photographer: "Car Kahani Team",
    likes: 167,
    downloads: 54,
  },
  {
    id: 9,
    title: "Polestar 2 Performance",
    category: "EVs",
    image: "https://hips.hearstapps.com/hmg-prod/images/651057-20220427-polestar-2-1651671152.jpg",
    photographer: "Car Kahani Team",
    likes: 201,
    downloads: 73,
  },
  {
    id: 10,
    title: "Lucid Air Dream",
    category: "EVs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZmTj6NpmUpNR184MuqHQQiB21s93wn7V7JA&s",
    photographer: "Car Kahani Team",
    likes: 156,
    downloads: 62,
  },

  // Classic Cars
  {
    id: 11,
    title: "Jaguar E-Type Classic",
    category: "Classics",
    image: "https://i.ytimg.com/vi/6Ox7BGd4j38/maxresdefault.jpg",
    photographer: "Car Kahani Team",
    likes: 445,
    downloads: 189,
  },
  {
    id: 12,
    title: "Porsche 356 Speedster",
    category: "Classics",
    image: "https://cdn.motor1.com/images/mgl/BoRM6/s1/1959-porsche-356-speedster-aquamarine-transitional-by-emory-motorsport.webp",
    photographer: "Car Kahani Team",
    likes: 356,
    downloads: 134,
  },
  {
    id: 13,
    title: "Mercedes 300SL Gullwing",
    category: "Classics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWWjSFR1zAYd8Gy8G0SkUxuCzh-6gGM2hX0A&s",
    photographer: "Car Kahani Team",
    likes: 523,
    downloads: 201,
  },
  {
    id: 14,
    title: "Ferrari 250 GTO",
    category: "Classics",
    image: "https://www.amalgamcollection.com/cdn/shop/products/DSCF0744_4000x2677_crop_center.jpg?v=1706011400",
    photographer: "Car Kahani Team",
    likes: 678,
    downloads: 245,
  },
  {
    id: 15,
    title: "Aston Martin DB5",
    category: "Classics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv8JfDefj_Nw0U7RixzsBXRInx3uANFPHlzA&s",
    photographer: "Car Kahani Team",
    likes: 398,
    downloads: 156,
  },

  // Muscle Cars
  {
    id: 16,
    title: "Ford Mustang GT",
    category: "Muscle",
    image: "https://hips.hearstapps.com/hmg-prod/images/2019-ford-mustang-shelby-gt-s-lead2-1566224220.jpg?crop=0.808xw:0.881xh;0.0743xw,0.00847xh&resize=640:*",
    photographer: "Car Kahani Team",
    likes: 334,
    downloads: 128,
  },
  {
    id: 17,
    title: "Chevrolet Camaro SS",
    category: "Muscle",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Lf83OIamK5bFqKEt68JGBJhUMuZpe9bvJA&s",
    photographer: "Car Kahani Team",
    likes: 289,
    downloads: 112,
  },
  {
    id: 18,
    title: "Dodge Challenger Hellcat",
    category: "Muscle",
    image: "https://hips.hearstapps.com/hmg-prod/images/2019-dodge-challenger-srt-hellcat-redeye-comparison-104-1581425446.jpg?crop=0.658xw:0.555xh;0.0896xw,0.293xh&resize=1200:*",
    photographer: "Car Kahani Team",
    likes: 456,
    downloads: 178,
  },
  {
    id: 19,
    title: "Shelby GT500",
    category: "Muscle",
    image: "https://robbreport.com/wp-content/uploads/2024/02/2-w-A-FrontSide.jpg?w=681&h=383&crop=1",
    photographer: "Car Kahani Team",
    likes: 412,
    downloads: 165,
  },
  {
    id: 20,
    title: "Plymouth Barracuda",
    category: "Muscle",
    image: "https://www.streetmachine.com.au/wp-content/uploads/2023/07/barracuda-1b.jpg",
    photographer: "Car Kahani Team",
    likes: 298,
    downloads: 98,
  },

  // Luxury Cars
  {
    id: 21,
    title: "Rolls-Royce Phantom",
    category: "Luxury",
    image: "https://hips.hearstapps.com/hmg-prod/images/phantom-scintilla-private-collection-0-1-66b50a5eddd44.jpg?crop=0.832xw:0.832xh;0.0849xw,0.168xh&resize=2048:*",
    photographer: "Car Kahani Team",
    likes: 567,
    downloads: 234,
  },
  {
    id: 22,
    title: "Bentley Continental GT",
    category: "Luxury",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ87zUq_k08KP3SZfDWhN8CuBlRBvBn8t8CsQ&s",
    photographer: "Car Kahani Team",
    likes: 445,
    downloads: 189,
  },
  {
    id: 23,
    title: "Mercedes-Maybach S-Class",
    category: "Luxury",
    image: "https://www.mercedes-benz.com/content/dam/brandhub/assets/vehicles/mercedes-maybach/mercedes-maybach-s-class-z223/teaser/11-2020/images/mercedes-maybach-s-class-z223-teaser-image-2560x1440-11-2020.cbv20241030153436.jpg/_jcr_content/renditions/mq7-original-aspect.jpeg",
    photographer: "Car Kahani Team",
    likes: 389,
    downloads: 156,
  },
  {
    id: 24,
    title: "BMW 7 Series",
    category: "Luxury",
    image: "https://mediapool.bmwgroup.com/cache/P9/202204/P90458181/P90458181-the-new-bmw-i7-xdrive60-04-2022-600px.jpg",
    photographer: "Car Kahani Team",
    likes: 298,
    downloads: 123,
  },

  // SUVs
  {
    id: 25,
    title: "Range Rover Sport",
    category: "SUVs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ7YSwxyh0ZuIodSXudSd_00IwTFWTuTR1ig&s",
    photographer: "Car Kahani Team",
    likes: 334,
    downloads: 145,
  },
  {
    id: 26,
    title: "Porsche Cayenne Turbo",
    category: "SUVs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35VrsADJhrCFmcXQF2GVcjIH8NmgNnRl3tQ&s",
    photographer: "Car Kahani Team",
    likes: 278,
    downloads: 112,
  },
  {
    id: 27,
    title: "BMW X5 M Competition",
    category: "SUVs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZO85tjmXeKzdZsamCaQTM715kicd-jThhog&s",
    photographer: "Car Kahani Team",
    likes: 245,
    downloads: 98,
  },
  {
    id: 28,
    title: "Mercedes-AMG G63",
    category: "SUVs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl_VPR7hs9PSeWynIKsczQkvQWNBl5exzHcw&s",
    photographer: "Car Kahani Team",
    likes: 456,
    downloads: 189,
  },

  // Hypercars
  {
    id: 29,
    title: "Bugatti Chiron",
    category: "Hypercars",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeNMQ85PLwqVzkRGJBh4jl73b8vjfleR45rA&s",
    photographer: "Car Kahani Team",
    likes: 789,
    downloads: 345,
  },
  {
    id: 30,
    title: "Koenigsegg Regera",
    category: "Hypercars",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYDYskJxSHtGDZux64wGep4X5x0mXJluArkA&s",
    photographer: "Car Kahani Team",
    likes: 678,
    downloads: 289,
  },
  {
    id: 31,
    title: "Pagani Huayra",
    category: "Hypercars",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-WiMiSp1iPtmv_80ELkezfjICv2cxginlGQ&s",
    photographer: "Car Kahani Team",
    likes: 567,
    downloads: 234,
  },
  {
    id: 32,
    title: "McLaren P1",
    category: "Hypercars",
    image: "https://mclaren.scene7.com/is/image/mclaren/1597-McLarenP1trade:crop-16x9?wid=1786&hei=1005",
    photographer: "Car Kahani Team",
    likes: 634,
    downloads: 267,
  },
]

const categories = ["All", "Sports", "EVs", "Classics", "Muscle", "Luxury", "SUVs", "Hypercars"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [visibleImages, setVisibleImages] = useState(12)
  const [likedImages, setLikedImages] = useState<number[]>([])

  const filteredImages = galleryImages.filter((image) => {
    const matchesCategory = selectedCategory === "All" || image.category === selectedCategory
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const displayedImages = filteredImages.slice(0, visibleImages)
  const hasMoreImages = visibleImages < filteredImages.length

  const modalImages = filteredImages.map((image) => ({
    id: image.id,
    src: image.image,
    alt: image.title,
    title: image.title,
    category: image.category,
    photographer: image.photographer,
    likes: image.likes,
    downloads: image.downloads,
  }))

  const handleHeartClick = (imageId: number) => {
    setLikedImages((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]))
  }

  const handleDownloadClick = async (image: any) => {
    try {
      const response = await fetch(image.image)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${image.title.replace(/\s+/g, "-")}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const handleShareClick = async (image: any) => {
    const shareData = {
      title: image.title,
      text: `Check out this amazing ${image.title} photo!`,
      url: image.image,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(image.image).then(() => {
        alert("Image link copied to clipboard!")
      })
    }
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleNavigateModal = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleImages((prev) => prev + 12)
      setIsLoading(false)
    }, 500)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setVisibleImages(12)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setVisibleImages(12)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Section */}
      <section className="bg-muted py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-balance">
              Car Gallery
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-pretty">
              Stunning automotive photography showcasing the beauty and power of cars across all categories
            </p>
            <p className="text-primary text-sm mt-2 font-medium">
              ✓ {galleryImages.length}+ high-quality car images from all categories
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search gallery..."
                className="pl-10 h-11 sm:h-12 text-base"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent h-11 sm:h-12">
              <Filter className="h-4 w-4" />
              <span className="text-sm sm:text-base">Filter</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex gap-2 sm:gap-3 justify-start sm:justify-center overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap min-w-fit px-3 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm ${
                selectedCategory === category ? "" : "bg-transparent"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Results Count */}
      <section className="px-4 max-w-7xl mx-auto mb-4">
        <p className="text-sm text-muted-foreground text-center">
          Showing {displayedImages.length} of {filteredImages.length} images
          {filteredImages.length !== galleryImages.length && ` (${galleryImages.length} total)`}
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayedImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg bg-card shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <div className="aspect-[4/5] sm:aspect-[3/4] relative">
                  <Image
                    src={image.image || "/placeholder.svg"}
                    alt={image.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onClick={() => handleImageClick(index)}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2 sm:gap-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className={`bg-white/90 text-black hover:bg-white h-8 w-8 sm:h-9 sm:w-9 p-0 ${
                        likedImages.includes(image.id) ? "text-red-500" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleHeartClick(image.id)
                      }}
                    >
                      <Heart
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${likedImages.includes(image.id) ? "fill-current" : ""}`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 text-black hover:bg-white h-8 w-8 sm:h-9 sm:w-9 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownloadClick(image)
                      }}
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 text-black hover:bg-white h-8 w-8 sm:h-9 sm:w-9 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShareClick(image)
                      }}
                    >
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>

                {/* Category Badge */}
                <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-primary text-primary-foreground text-xs">
                  {image.category}
                </Badge>
              </div>

              {/* Image Info */}
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {image.title}
                </h3>
                <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                  <span className="truncate">by {image.photographer}</span>
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-2">
                    <span className="flex items-center gap-1">
                      <Heart
                        className={`h-3 w-3 ${likedImages.includes(image.id) ? "text-red-500 fill-current" : ""}`}
                      />
                      <span className="hidden xs:inline">{image.likes + (likedImages.includes(image.id) ? 1 : 0)}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span className="hidden xs:inline">{image.downloads}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMoreImages && (
          <div className="text-center mt-8 sm:mt-12">
            <Button
              size="lg"
              variant="outline"
              className="px-6 sm:px-8 bg-transparent"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : `Load More Images (${filteredImages.length - visibleImages} remaining)`}
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No images found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setVisibleImages(12)
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-primary">{galleryImages.length}+</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">High-Quality Images</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-primary">8</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Categories</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-primary">15K+</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Downloads</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-primary">35K+</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Likes</p>
            </div>
          </div>
        </div>
      </section>

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={modalImages}
        currentIndex={currentImageIndex}
        onNavigate={handleNavigateModal}
      />

      <Footer />
    </div>
  )
}
