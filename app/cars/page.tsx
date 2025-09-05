"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Zap, Gauge, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useMemo } from "react"
import { useLanguage } from "@/lib/language-context"

const formatPrice = (priceRange: string) => {
  return priceRange
    .replace(/PKR\s*/g, "PKR ")
    .replace(/(\d+(?:\.\d+)?)\s*Lakh/g, "$1L")
    .replace(/(\d+(?:\.\d+)?)\s*Crore/g, "$1Cr")
    .replace(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)\s*Lakh/g, "$1-$2L")
    .replace(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)\s*Crore/g, "$1-$2Cr")
    .replace(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)\s*Lakh-(\d+(?:\.\d+)?)\s*Crore/g, "$1L-$2Cr")
}

const carsData = [
  {
    id: 1,
    name: "Suzuki Alto",
    brand: "Suzuki",
    category: "Budget Car",
    year: 2025,
    engine: "1.0L 3-Cylinder",
    horsepower: 67,
    torque: "90 Nm",
    topSpeed: "165 km/h",
    acceleration: "13.2s",
    priceRange: "PKR 23-25 Lakh",
    priceValue: 2400000,
    fuelType: "Petrol",
    transmission: "5-Speed Manual/AGS",
    drivetrain: "FWD",
    image: "/suzuki-alto-white-compact-car.jpg",
    description: "Pakistan's most popular compact car with excellent fuel economy and reliability.",
    kahani: "Suzuki Alto ki kahani 1979 mein shuru hui jab Suzuki ne ise Japan mein launch kiya.",
    companyStory: "Suzuki Motor Corporation ki shuruaat 1909 mein Michio Suzuki ne ki thi.",
  },
  {
    id: 2,
    name: "Suzuki Swift",
    brand: "Suzuki",
    category: "Compact Hatchback",
    year: 2025,
    engine: "1.2L 4-Cylinder",
    horsepower: 83,
    torque: "113 Nm",
    topSpeed: "175 km/h",
    acceleration: "11.5s",
    priceRange: "PKR 35-40 Lakh",
    priceValue: 3750000,
    fuelType: "Petrol",
    transmission: "5-Speed Manual/CVT",
    drivetrain: "FWD",
    image: "/suzuki-swift-red-hatchback.jpg",
    description: "Sporty hatchback with agile handling and modern features for urban driving.",
    kahani: "Swift ki kahani 2004 mein shuru hui jab Suzuki ne global market ke liye ise design kiya.",
    companyStory: "Suzuki Motor Corporation ki shuruaat 1909 mein Michio Suzuki ne ki thi.",
  },
  {
    id: 3,
    name: "Toyota Corolla",
    brand: "Toyota",
    category: "Sedan",
    year: 2025,
    engine: "1.6L 4-Cylinder",
    horsepower: 121,
    torque: "154 Nm",
    topSpeed: "190 km/h",
    acceleration: "10.8s",
    priceRange: "PKR 59-69 Lakh",
    priceValue: 6400000,
    fuelType: "Petrol",
    transmission: "6-Speed Manual/CVT",
    drivetrain: "FWD",
    image: "/toyota-corolla-silver-sedan.jpg",
    description: "World's best-selling sedan with proven reliability and comfort.",
    kahani: "Corolla ki shuruat 1966 mein hui aur ye duniya ki sabse zyada bikne wali car hai.",
    companyStory: "Toyota Motor Corporation ki buniyad 1937 mein Kiichiro Toyoda ne rakhi thi.",
  },
  {
    id: 4,
    name: "Honda Civic",
    brand: "Honda",
    category: "Sedan",
    year: 2025,
    engine: "1.5L Turbo",
    horsepower: 180,
    torque: "240 Nm",
    topSpeed: "200 km/h",
    acceleration: "8.2s",
    priceRange: "PKR 86-99 Lakh",
    priceValue: 9250000,
    fuelType: "Petrol",
    transmission: "CVT",
    drivetrain: "FWD",
    image: "/honda-civic-black-sedan.jpg",
    description: "Premium sedan with turbocharged performance and advanced technology.",
    kahani: "Honda Civic 1972 mein launch hui aur compact car segment mein revolution layi.",
    companyStory: "Honda Motor Company ki shuruaat 1948 mein Soichiro Honda ne ki thi.",
  },
  {
    id: 5,
    name: "Toyota Prius",
    brand: "Toyota",
    category: "EVs",
    year: 2025,
    engine: "1.8L Hybrid",
    horsepower: 121,
    torque: "142 Nm",
    topSpeed: "180 km/h",
    acceleration: "10.6s",
    priceRange: "PKR 1.2-1.4Cr",
    priceValue: 13000000,
    fuelType: "Hybrid",
    transmission: "eCVT",
    drivetrain: "FWD",
    image: "/toyota-prius-blue-hybrid.jpg",
    description: "Pioneer hybrid vehicle with exceptional fuel efficiency and eco-friendly technology.",
    kahani: "Prius 1997 mein duniya ki pehli mass-production hybrid car ban kar history banayi.",
    companyStory: "Toyota Motor Corporation ki buniyad 1937 mein Kiichiro Toyoda ne rakhi thi.",
  },
  {
    id: 6,
    name: "Changan Alsvin",
    brand: "Changan",
    category: "Sedan",
    year: 2025,
    engine: "1.5L 4-Cylinder",
    horsepower: 107,
    torque: "145 Nm",
    topSpeed: "180 km/h",
    acceleration: "11.8s",
    priceRange: "PKR 46-54 Lakh",
    priceValue: 5000000,
    fuelType: "Petrol",
    transmission: "5-Speed Manual/DCT",
    drivetrain: "FWD",
    image: "/changan-alsvin-white-sedan.jpg",
    description: "Modern Chinese sedan offering great value with contemporary design and features.",
    kahani: "Changan Alsvin Pakistan mein 2021 mein launch hui aur affordable luxury segment mein jagah banayi.",
    companyStory: "Changan Automobile ki shuruaat 1862 mein hui aur ye China ki oldest car company hai.",
  },
  {
    id: 7,
    name: "MG HS",
    brand: "MG",
    category: "SUVs",
    year: 2025,
    engine: "1.5L Turbo",
    horsepower: 162,
    torque: "250 Nm",
    topSpeed: "190 km/h",
    acceleration: "9.6s",
    priceRange: "PKR 89-99 Lakh",
    priceValue: 9400000,
    fuelType: "Petrol",
    transmission: "7-Speed DCT",
    drivetrain: "FWD",
    image: "/mg-hs-red-suv.jpg",
    description: "Stylish compact SUV with turbocharged performance and premium features.",
    kahani: "MG HS 2018 mein launch hui aur compact SUV segment mein naya standard set kiya.",
    companyStory: "MG Motor ki shuruaat 1924 mein UK mein hui aur ab ye Chinese ownership mein hai.",
  },
  {
    id: 8,
    name: "Kia Sportage",
    brand: "Kia",
    category: "SUVs",
    year: 2025,
    engine: "2.0L 4-Cylinder",
    horsepower: 161,
    torque: "192 Nm",
    topSpeed: "190 km/h",
    acceleration: "10.1s",
    priceRange: "PKR 1.15-1.35Cr",
    priceValue: 12500000,
    fuelType: "Petrol",
    transmission: "6-Speed Automatic",
    drivetrain: "FWD/AWD",
    image: "/kia-sportage-gray-suv.jpg",
    description: "Reliable compact SUV with bold design and comprehensive safety features.",
    kahani: "Kia Sportage 1993 mein launch hui aur Kia ki pehli SUV thi jo global success bani.",
    companyStory: "Kia Motors ki shuruaat 1944 mein South Korea mein hui aur ab ye Hyundai ka hissa hai.",
  },
  {
    id: 9,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    category: "SUVs",
    year: 2025,
    engine: "2.0L 4-Cylinder",
    horsepower: 156,
    torque: "192 Nm",
    topSpeed: "188 km/h",
    acceleration: "10.5s",
    priceRange: "PKR 1.25-1.45Cr",
    priceValue: 13500000,
    fuelType: "Petrol",
    transmission: "6-Speed Automatic",
    drivetrain: "FWD/AWD",
    image: "/hyundai-tucson-blue-suv.jpg",
    description: "Modern compact SUV with distinctive design and advanced technology.",
    kahani:
      "Hyundai Tucson 2004 mein launch hui aur compact SUV segment mein Hyundai ka strong presence establish kiya.",
    companyStory: "Hyundai Motor Company ki shuruaat 1967 mein Chung Ju-yung ne South Korea mein ki.",
  },
  {
    id: 10,
    name: "Isuzu D-Max",
    brand: "Isuzu",
    category: "Pickup",
    year: 2025,
    engine: "3.0L Turbo Diesel",
    horsepower: 190,
    torque: "450 Nm",
    topSpeed: "175 km/h",
    acceleration: "10.2s",
    priceRange: "PKR 1.1-1.3Cr",
    priceValue: 12000000,
    fuelType: "Diesel",
    transmission: "6-Speed Manual/Automatic",
    drivetrain: "4WD",
    image: "/isuzu-dmax-white-pickup.jpg",
    description: "Rugged pickup truck built for work and adventure with excellent towing capacity.",
    kahani: "Isuzu D-Max 2002 mein launch hui aur commercial vehicle segment mein reliability ka symbol bani.",
    companyStory: "Isuzu Motors ki shuruaat 1916 mein Japan mein hui aur ye commercial vehicles mein specialist hai.",
  },
  {
    id: 11,
    name: "BMW 3 Series",
    brand: "BMW",
    category: "Luxury",
    year: 2025,
    engine: "2.0L Turbo",
    horsepower: 255,
    torque: "400 Nm",
    topSpeed: "250 km/h",
    acceleration: "5.8s",
    priceRange: "PKR 1.8-2.2Cr",
    priceValue: 20000000,
    fuelType: "Petrol",
    transmission: "8-Speed Automatic",
    drivetrain: "RWD",
    image: "/bmw-3-series-white-luxury.jpg",
    description: "Ultimate driving machine with perfect balance of performance and luxury.",
    kahani: "BMW 3 Series 1975 mein launch hui aur luxury sports sedan segment define kiya.",
    companyStory: "BMW ki shuruaat 1916 mein aircraft engines banane se hui, phir cars mein expand kiya.",
  },
  {
    id: 12,
    name: "Mercedes C-Class",
    brand: "Mercedes-Benz",
    category: "Luxury",
    year: 2025,
    engine: "2.0L Turbo",
    horsepower: 258,
    torque: "400 Nm",
    topSpeed: "250 km/h",
    acceleration: "6.0s",
    priceRange: "PKR 2.0-2.5Cr",
    priceValue: 22500000,
    fuelType: "Petrol",
    transmission: "9-Speed Automatic",
    drivetrain: "RWD",
    image: "/mercedes-c-class-silver-luxury.jpg",
    description: "Epitome of luxury and refinement with cutting-edge technology.",
    kahani: "Mercedes C-Class 1993 mein launch hui aur compact luxury segment mein benchmark set kiya.",
    companyStory: "Mercedes-Benz ki shuruaat 1886 mein Karl Benz ne ki, duniya ki pehli automobile company.",
  },
  {
    id: 13,
    name: "Audi A4",
    brand: "Audi",
    category: "Luxury",
    year: 2025,
    engine: "2.0L TFSI",
    horsepower: 245,
    torque: "370 Nm",
    topSpeed: "250 km/h",
    acceleration: "6.1s",
    priceRange: "PKR 1.9-2.3Cr",
    priceValue: 21000000,
    fuelType: "Petrol",
    transmission: "7-Speed S-Tronic",
    drivetrain: "Quattro AWD",
    image: "/audi-a4-black-luxury.jpg",
    description: "Sophisticated luxury sedan with Quattro all-wheel drive technology.",
    kahani: "Audi A4 1994 mein launch hui aur premium sedan segment mein technology leadership establish ki.",
    companyStory:
      "Audi ki shuruaat 1909 mein August Horch ne ki, four rings logo char companies ka merger represent karta hai.",
  },
  {
    id: 14,
    name: "Porsche 911",
    brand: "Porsche",
    category: "Sports",
    year: 2025,
    engine: "3.0L Twin-Turbo",
    horsepower: 379,
    torque: "450 Nm",
    topSpeed: "293 km/h",
    acceleration: "4.2s",
    priceRange: "PKR 4.5-6.0Cr",
    priceValue: 52500000,
    fuelType: "Petrol",
    transmission: "8-Speed PDK",
    drivetrain: "RWD",
    image: "/porsche-911-red-sports.jpg",
    description: "Iconic sports car with timeless design and exceptional performance.",
    kahani: "Porsche 911 1963 mein launch hui aur sports car ki definition change kar di.",
    companyStory: "Porsche ki shuruaat 1931 mein Ferdinand Porsche ne ki, engineering excellence ka symbol.",
  },
  {
    id: 15,
    name: "Ferrari F8 Tributo",
    brand: "Ferrari",
    category: "Sports",
    year: 2025,
    engine: "3.9L Twin-Turbo V8",
    horsepower: 710,
    torque: "770 Nm",
    topSpeed: "340 km/h",
    acceleration: "2.9s",
    priceRange: "PKR 12-15Cr",
    priceValue: 135000000,
    fuelType: "Petrol",
    transmission: "7-Speed DCT",
    drivetrain: "RWD",
    image: "/ferrari-f8-yellow-supercar.jpg",
    description: "Italian masterpiece with breathtaking performance and stunning design.",
    kahani: "Ferrari F8 Tributo 2019 mein launch hui, V8 engine ki tribute ke roop mein.",
    companyStory: "Ferrari ki shuruaat 1939 mein Enzo Ferrari ne ki, racing aur luxury ka perfect combination.",
  },
  {
    id: 16,
    name: "Lamborghini Huracán",
    brand: "Lamborghini",
    category: "Sports",
    year: 2025,
    engine: "5.2L V10",
    horsepower: 630,
    torque: "600 Nm",
    topSpeed: "325 km/h",
    acceleration: "3.2s",
    priceRange: "PKR 10-12Cr",
    priceValue: 110000000,
    fuelType: "Petrol",
    transmission: "7-Speed DCT",
    drivetrain: "AWD",
    image: "/lamborghini-huracan-green-supercar.jpg",
    description: "Raging bull with naturally aspirated V10 and all-wheel drive precision.",
    kahani: "Lamborghini Huracán 2014 mein launch hui, Gallardo ka successor ban kar.",
    companyStory: "Lamborghini ki shuruaat 1963 mein Ferruccio Lamborghini ne ki, Ferrari ko challenge karne ke liye.",
  },
  {
    id: 17,
    name: "Tesla Model S",
    brand: "Tesla",
    category: "EVs",
    year: 2025,
    engine: "Dual Motor Electric",
    horsepower: 670,
    torque: "844 Nm",
    topSpeed: "250 km/h",
    acceleration: "3.1s",
    priceRange: "PKR 3.5-4.5Cr",
    priceValue: 40000000,
    fuelType: "Electric",
    transmission: "Single-Speed",
    drivetrain: "AWD",
    image: "/tesla-model-s-white-electric.jpg",
    description: "Revolutionary electric sedan with autopilot and over-the-air updates.",
    kahani: "Tesla Model S 2012 mein launch hui aur electric vehicle revolution ki shuruat ki.",
    companyStory: "Tesla ki shuruaat 2003 mein Elon Musk ne ki, sustainable transport ka vision lekar.",
  },
  {
    id: 18,
    name: "Ford Mustang GT",
    brand: "Ford",
    category: "Muscle",
    year: 2025,
    engine: "5.0L V8",
    horsepower: 450,
    torque: "529 Nm",
    topSpeed: "250 km/h",
    acceleration: "4.3s",
    priceRange: "PKR 1.8-2.2Cr",
    priceValue: 20000000,
    fuelType: "Petrol",
    transmission: "10-Speed Automatic",
    drivetrain: "RWD",
    image: "/ford-mustang-blue-muscle.jpg",
    description: "American muscle car icon with thunderous V8 power and aggressive styling.",
    kahani: "Ford Mustang 1964 mein launch hui aur American muscle car revolution ki shuruat ki.",
    companyStory: "Ford Motor Company ki shuruaat 1903 mein Henry Ford ne ki.",
  },
  {
    id: 19,
    name: "Chevrolet Camaro SS",
    brand: "Chevrolet",
    category: "Muscle",
    year: 2025,
    engine: "6.2L V8",
    horsepower: 455,
    torque: "617 Nm",
    topSpeed: "250 km/h",
    acceleration: "4.0s",
    priceRange: "PKR 2.0-2.5Cr",
    priceValue: 22500000,
    fuelType: "Petrol",
    transmission: "10-Speed Automatic",
    drivetrain: "RWD",
    image: "/chevrolet-camaro-yellow-muscle.jpg",
    description: "Iconic American muscle car with supercharged V8 and track-ready performance.",
    kahani: "Chevrolet Camaro 1966 mein launch hui, Ford Mustang ka direct competitor ban kar.",
    companyStory: "Chevrolet ki shuruaat 1911 mein Louis Chevrolet aur William Durant ne ki.",
  },
  {
    id: 20,
    name: "Dodge Challenger Hellcat",
    brand: "Dodge",
    category: "Muscle",
    year: 2025,
    engine: "6.2L Supercharged V8",
    horsepower: 717,
    torque: "881 Nm",
    topSpeed: "280 km/h",
    acceleration: "3.4s",
    priceRange: "PKR 2.5-3.0Cr",
    priceValue: 27500000,
    fuelType: "Petrol",
    transmission: "8-Speed Automatic",
    drivetrain: "RWD",
    image: "/dodge-challenger-orange-muscle.jpg",
    description: "Most powerful muscle car with supercharged Hellcat engine and retro styling.",
    kahani: "Dodge Challenger 1970 mein launch hui, muscle car era ka icon ban kar.",
    companyStory: "Dodge ki shuruaat 1900 mein Dodge Brothers ne ki, American automotive history ka hissa.",
  },
]

export default function CarsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [activeFilter, setActiveFilter] = useState("All")
  const [visibleCars, setVisibleCars] = useState(8)

  const filteredCars = useMemo(() => {
    return carsData.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.kahani.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" ||
        activeFilter === "All" ||
        car.category.toLowerCase() === selectedCategory.toLowerCase() ||
        car.category.toLowerCase() === activeFilter.toLowerCase()

      const matchesBrand = selectedBrand === "all" || car.brand.toLowerCase() === selectedBrand.toLowerCase()

      return matchesSearch && matchesCategory && matchesBrand
    })
  }, [searchTerm, selectedCategory, selectedBrand, activeFilter])

  const displayedCars = filteredCars.slice(0, visibleCars)
  const hasMoreCars = visibleCars < filteredCars.length

  const handleCategoryFilter = (category: string) => {
    setActiveFilter(category)
    setSelectedCategory(category === "All" ? "all" : category.toLowerCase())
    setVisibleCars(8)
  }

  const handleLoadMore = () => {
    setVisibleCars((prev) => prev + 8)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setVisibleCars(8)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setVisibleCars(8)
  }

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value)
    setVisibleCars(8)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Section */}
      <section className="bg-muted py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Cars Database</h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Comprehensive information about cars from budget to hypercars - har car ki apni kahani
            </p>
            <p className="text-primary text-sm mt-2 font-medium">
              ✓ {carsData.length}+ cars with detailed specifications and stories
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search cars, brands, categories, or stories..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="mid-range">Mid-Range</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="luxury suv">Luxury SUV</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="ultra luxury">Ultra Luxury</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="muscle">Muscle</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="supercar">Supercar</SelectItem>
                <SelectItem value="hypercar">Hypercar</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedBrand} onValueChange={handleBrandChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                <SelectItem value="suzuki">Suzuki</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="haval">Haval</SelectItem>
                <SelectItem value="changan">Changan</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                <SelectItem value="porsche">Porsche</SelectItem>
                <SelectItem value="lamborghini">Lamborghini</SelectItem>
                <SelectItem value="ferrari">Ferrari</SelectItem>
                <SelectItem value="bugatti">Bugatti</SelectItem>
                <SelectItem value="tesla">Tesla</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="chevrolet">Chevrolet</SelectItem>
                <SelectItem value="dodge">Dodge</SelectItem>
                <SelectItem value="jaguar">Jaguar</SelectItem>
                <SelectItem value="lucid">Lucid</SelectItem>
                <SelectItem value="rivian">Rivian</SelectItem>
                <SelectItem value="polestar">Polestar</SelectItem>
                <SelectItem value="aston martin">Aston Martin</SelectItem>
                <SelectItem value="mclaren">McLaren</SelectItem>
                <SelectItem value="koenigsegg">Koenigsegg</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 sm:py-8 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            "All",
            "Budget",
            "Compact",
            "Mid-Range",
            "SUV",
            "Premium",
            "Luxury",
            "Sports",
            "Muscle",
            "Classic",
            "Supercar",
            "Hypercar",
            "Electric",
            "Hybrid",
          ].map((category) => (
            <Button
              key={category}
              variant={category === activeFilter ? "default" : "outline"}
              size="sm"
              className={category === activeFilter ? "" : "bg-transparent"}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Results Count */}
      <section className="px-4 max-w-7xl mx-auto mb-4">
        <p className="text-sm text-muted-foreground text-center">
          Showing {displayedCars.length} of {filteredCars.length} cars
          {filteredCars.length !== carsData.length && ` (${carsData.length} total)`}
        </p>
      </section>

      {/* Cars Grid */}
      <section className="py-4 sm:py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayedCars.map((car) => (
            <Card key={car.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  width={300}
                  height={200}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/modern-sports-car-on-highway-at-sunset-with-dramat.jpg"
                  }}
                />
                <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-primary text-primary-foreground text-xs">
                  {car.category}
                </Badge>
                <Badge variant="outline" className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 text-xs">
                  {car.year}
                </Badge>
              </div>

              <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {car.brand}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{car.fuelType}</span>
                </div>
                <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors line-clamp-1">
                  {car.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs sm:text-sm">{car.description}</CardDescription>
              </CardHeader>

              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span className="font-medium">{car.horsepower} hp</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Gauge className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span className="font-medium">{car.topSpeed}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span className="font-medium">0-60: {car.acceleration}</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span className="font-medium text-xs">From {formatPrice(car.priceRange.split("-")[0])}</span>
                  </div>
                </div>

                <Button className="w-full" size="sm" asChild>
                  <Link href={`/cars/${car.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreCars && (
          <div className="text-center mt-8 sm:mt-12">
            <Button size="lg" variant="outline" onClick={handleLoadMore} className="bg-transparent">
              Load More Cars ({filteredCars.length - visibleCars} remaining)
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No cars found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedBrand("all")
                setActiveFilter("All")
                setVisibleCars(8)
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
