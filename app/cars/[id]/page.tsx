"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Heart,
  Share2,
  BookOpen,
  Gauge,
  Zap,
  Calendar,
  DollarSign,
  Settings,
  Car,
  Star,
  MessageSquare,
  User,
  ThumbsUp,
  BarChart3,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { ImageModal } from "@/components/image-modal"

const carsData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Suzuki Alto",
    brand: "Suzuki",
    category: "Budget Car",
    year: 2025,
    priceRange: "PKR 23-25 Lakh",
    mainImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop&crop=center", // Front view
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&crop=center", // Interior
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center", // Side profile
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop&crop=center", // Rear view
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center", // Engine bay
    ],
    description:
      "Pakistan's most popular compact car with excellent fuel economy and reliability. Perfect for city driving.",
    kahani:
      "Suzuki Alto ki kahani 1979 mein shuru hui jab Suzuki ne ise Japan mein launch kiya. Pakistan mein ye 2000 mein aayi aur ab tak lakhs families ka bharosa hai. Iska lightweight design aur fuel efficiency ne ise middle class ka favorite banaya. Pak Suzuki ne local assembly start ki aur ye quickly Pakistan ki roads pe common sight ban gayi. Alto ka simple maintenance aur affordable parts ne ise long-term ownership ke liye ideal banaya.",
    specs: {
      engine: "1.0L 3-Cylinder",
      horsepower: "67 hp",
      torque: "90 Nm",
      topSpeed: "165 km/h",
      acceleration: "0-100 km/h in 13.2s",
      transmission: "5-Speed Manual/AGS",
      drivetrain: "Front-Wheel Drive",
      fuelEconomy: "22 km/l (combined)",
      fuelType: "Petrol",
      weight: "760 kg",
      length: "3,395 mm",
      width: "1,475 mm",
      height: "1,490 mm",
      wheelbase: "2,360 mm",
      groundClearance: "160 mm",
    },
    features: [
      "Power Steering",
      "Central Locking",
      "Electric Windows",
      "Air Conditioning",
      "Dual Airbags (VXL)",
      "ABS with EBD (VXL)",
      "Immobilizer",
      "12V Power Outlet",
    ],
    safety: [
      "Dual Airbags (VXL variant)",
      "ABS with EBD (VXL variant)",
      "Seat Belt Reminder",
      "Door Ajar Warning",
      "Immobilizer",
      "Child Lock",
      "Impact Absorbing Body",
      "Collapsible Steering Column",
    ],
    availability: "Available nationwide through Pak Suzuki dealerships",
    proscons: {
      pros: ["Excellent fuel economy", "Low maintenance cost", "Easy to park", "Reliable engine", "Good resale value"],
      cons: [
        "Limited rear space",
        "Basic interior",
        "Road noise at highway speeds",
        "Manual transmission only in base variant",
      ],
    },
  },
  "2": {
    id: 2,
    name: "Honda Civic",
    brand: "Honda",
    category: "Sedan",
    year: 2024,
    priceRange: "PKR 85-95 Lakh",
    mainImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop&crop=center", // Front view
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center", // Interior
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop&crop=center", // Side profile
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center", // Rear view
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center", // Engine bay
    ],
    description: "Sporty premium sedan with turbocharged performance and cutting-edge technology.",
    kahani:
      "Honda Civic 1972 se duniya mein hai aur Pakistan mein 1994 se. Current 11th generation mein turbo engine aur premium features hain. Young professionals aur enthusiasts ka favorite hai.",
    specs: {
      engine: "1.5L Turbocharged",
      horsepower: "180 hp",
      torque: "240 Nm",
      topSpeed: "200 km/h",
      acceleration: "0-100 km/h in 8.2s",
      transmission: "CVT",
      drivetrain: "Front-Wheel Drive",
      fuelEconomy: "13-15 km/l",
      fuelType: "Petrol",
      weight: "1,330 kg",
      length: "4,674 mm",
      width: "1,802 mm",
      height: "1,415 mm",
      wheelbase: "2,735 mm",
      groundClearance: "134 mm",
    },
    features: [
      "Honda SENSING",
      "9-inch Touchscreen",
      "Wireless Apple CarPlay",
      "Bose Audio System",
      "Dual Zone Climate",
      "Remote Engine Start",
      "LED Headlights",
      "Sunroof",
    ],
    safety: [
      "Honda SENSING Suite",
      "Collision Mitigation",
      "Lane Keeping Assist",
      "Adaptive Cruise Control",
      "6 Airbags",
      "Vehicle Stability Assist",
      "ABS with EBD",
      "Tire Pressure Monitoring",
    ],
    availability: "Available at Honda Atlas dealerships",
    proscons: {
      pros: ["Turbocharged performance", "Premium interior", "Advanced safety", "Sporty design", "Honda reliability"],
      cons: ["Premium pricing", "Turbo lag", "CVT transmission", "Maintenance costs"],
    },
  },
  "3": {
    id: 3,
    name: "Toyota Corolla",
    brand: "Toyota",
    category: "Sedan",
    year: 2024,
    priceRange: "PKR 59-75 Lakh",
    mainImage: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop&crop=center", // Front view
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center", // Interior
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop&crop=center", // Side profile
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center", // Rear view
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center", // Engine bay
    ],
    description: "World's best-selling sedan with legendary reliability and comfort. The perfect family car.",
    kahani:
      "Toyota Corolla ki shuruat 1966 mein hui aur ye duniya ki sabse zyada bikne wali car hai. Pakistan mein 1993 se ye road pe hai aur har generation ne naye standards set kiye hain. Indus Motor Company ne local assembly start ki aur Corolla quickly Pakistani families ka favorite ban gaya. Iska resale value aur durability legendary hai.",
    specs: {
      engine: "1.6L 4-Cylinder",
      horsepower: "121 hp",
      torque: "154 Nm",
      topSpeed: "180 km/h",
      acceleration: "0-100 km/h in 11.5s",
      transmission: "CVT/6-Speed Manual",
      drivetrain: "Front-Wheel Drive",
      fuelEconomy: "14-16 km/l",
      fuelType: "Petrol",
      weight: "1,310 kg",
      length: "4,630 mm",
      width: "1,780 mm",
      height: "1,435 mm",
      wheelbase: "2,700 mm",
      groundClearance: "140 mm",
    },
    features: [
      "Toyota Safety Sense 2.0",
      "8-inch Touchscreen Infotainment",
      "Wireless Phone Charging",
      "Dual Zone Climate Control",
      "Push Button Start",
      "Smart Entry System",
      "LED Headlights",
      "Cruise Control",
    ],
    safety: [
      "7 SRS Airbags",
      "Vehicle Stability Control",
      "ABS with EBD & BA",
      "Hill Start Assist",
      "Pre-Collision System",
      "Lane Departure Alert",
      "Automatic High Beam",
      "ISOFIX Child Seat Anchors",
    ],
    availability: "Available at Toyota dealerships across Pakistan",
    proscons: {
      pros: [
        "Excellent build quality",
        "Strong resale value",
        "Comfortable ride",
        "Reliable CVT transmission",
        "Comprehensive safety features",
      ],
      cons: ["Higher price point", "CVT can feel sluggish", "Road noise on rough surfaces", "Limited rear headroom"],
    },
  },
  "4": {
    id: 4,
    name: "BMW 3 Series",
    brand: "BMW",
    category: "Luxury Sedan",
    year: 2024,
    priceRange: "PKR 1.2-1.5 Crore",
    mainImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center", // Front view
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&crop=center", // Interior
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center", // Side profile
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop&crop=center", // Rear view
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center", // Engine bay
    ],
    description: "The ultimate driving machine with perfect balance of luxury and performance.",
    kahani:
      "BMW 3 Series 1975 mein launch hui aur luxury sports sedan ka benchmark bani. Pakistan mein ye status symbol hai aur driving enthusiasts ka dream car hai.",
    specs: {
      engine: "2.0L Twin-Turbo",
      horsepower: "255 hp",
      torque: "400 Nm",
      topSpeed: "250 km/h (limited)",
      acceleration: "0-100 km/h in 5.8s",
      transmission: "8-Speed Automatic",
      drivetrain: "Rear-Wheel Drive",
      fuelEconomy: "10-12 km/l",
      fuelType: "Premium Petrol",
      weight: "1,540 kg",
      length: "4,709 mm",
      width: "1,827 mm",
      height: "1,442 mm",
      wheelbase: "2,851 mm",
      groundClearance: "140 mm",
    },
    features: [
      "iDrive 7.0",
      "12.3-inch Digital Cluster",
      "10.25-inch Display",
      "Harman Kardon Audio",
      "Gesture Control",
      "Wireless Charging",
      "Ambient Lighting",
      "M Sport Package",
    ],
    safety: [
      "BMW Active Protection",
      "6 Airbags",
      "Dynamic Stability Control",
      "ABS with Cornering Brake Control",
      "Attention Assistant",
      "Park Distance Control",
      "Runflat Tires",
      "BMW Assist",
    ],
    availability: "Available through BMW authorized dealers",
    proscons: {
      pros: [
        "Exceptional driving dynamics",
        "Luxury interior",
        "Advanced technology",
        "Strong performance",
        "BMW heritage",
      ],
      cons: ["High purchase price", "Expensive maintenance", "Premium fuel requirement", "Limited rear space"],
    },
  },
  "5": {
    id: 5,
    name: "Mercedes C-Class",
    brand: "Mercedes-Benz",
    category: "Luxury Sedan",
    year: 2024,
    priceRange: "PKR 1.8-2.2 Crore",
    mainImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center", // Front view
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&crop=center", // Interior
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center", // Side profile
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop&crop=center", // Rear view
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center", // Engine bay
    ],
    description: "Epitome of luxury and comfort with advanced safety features.",
    kahani:
      "Mercedes-Benz C-Class 1993 mein launch hui aur luxury car segment mein revolution layi. Pakistan mein business class ka preferred choice hai aur German engineering ka symbol hai.",
    specs: {
      engine: "2.0L Turbocharged",
      horsepower: "255 hp",
      torque: "400 Nm",
      topSpeed: "250 km/h (limited)",
      acceleration: "0-100 km/h in 6.0s",
      transmission: "9G-TRONIC Automatic",
      drivetrain: "Rear-Wheel Drive",
      fuelEconomy: "9-11 km/l",
      fuelType: "Premium Petrol",
      weight: "1,640 kg",
      length: "4,751 mm",
      width: "1,820 mm",
      height: "1,437 mm",
      wheelbase: "2,865 mm",
      groundClearance: "107 mm",
    },
    features: [
      "MBUX Infotainment",
      "12.3-inch Digital Cluster",
      "11.9-inch Central Display",
      "Burmester Audio",
      "Ambient Lighting",
      "Wireless Charging",
      "Voice Control",
      "Mercedes me connect",
    ],
    safety: [
      "Mercedes-Benz Intelligent Drive",
      "9 Airbags",
      "Active Brake Assist",
      "Attention Assist",
      "Blind Spot Assist",
      "Lane Keeping Assist",
      "PRE-SAFE System",
      "Adaptive Brake Lights",
    ],
    availability: "Available through Mercedes-Benz authorized dealers",
    proscons: {
      pros: [
        "Luxurious interior",
        "Advanced safety systems",
        "Smooth ride quality",
        "Premium materials",
        "Mercedes heritage",
      ],
      cons: ["High purchase price", "Expensive maintenance", "Complex technology", "Premium fuel requirement"],
    },
  },
  "6": {
    id: 6,
    name: "Audi A4",
    brand: "Audi",
    category: "Luxury Sedan",
    year: 2024,
    priceRange: "PKR 1.5-1.8 Crore",
    mainImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop&crop=center", // Front view
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&crop=center", // Interior
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center", // Side profile
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop&crop=center", // Rear view
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center", // Engine bay
    ],
    description: "German engineering at its finest with sporty handling and advanced technology.",
    kahani:
      "Audi A4 1994 mein launch hui aur compact executive car segment mein apni jagah banayi. Iska quattro all-wheel drive system aur premium interior famous hain. Pakistan mein business executives ka preferred choice hai.",
    specs: {
      engine: "2.0L Turbocharged",
      horsepower: "188 hp",
      torque: "320 Nm",
      topSpeed: "240 km/h",
      acceleration: "0-100 km/h in 7.3s",
      transmission: "7-Speed S tronic",
      drivetrain: "Front-Wheel Drive",
      fuelEconomy: "12-14 km/l",
      fuelType: "Premium Petrol",
      weight: "1,500 kg",
      length: "4,762 mm",
      width: "1,847 mm",
      height: "1,428 mm",
      wheelbase: "2,820 mm",
      groundClearance: "120 mm",
    },
    features: [
      "MMI Touch Response",
      "Audi Virtual Cockpit",
      "Bang & Olufsen 3D Sound",
      "Ambient Lighting",
      "Wireless Charging",
      "Audi Drive Select",
      "Panoramic Sunroof",
      "Matrix LED Headlights",
    ],
    safety: [
      "Audi Pre Sense Basic",
      "Audi Pre Sense Front",
      "Adaptive Cruise Control",
      "Lane Departure Warning",
      "Blind Spot Monitoring",
      "Rear Cross Traffic Assist",
      "Parking System Plus",
      "6 Airbags",
    ],
    availability: "Available through Audi authorized dealers",
    proscons: {
      pros: ["Sporty handling", "Premium interior", "Advanced technology", "Comfortable ride", "Audi brand image"],
      cons: ["Expensive maintenance", "Premium fuel requirement", "Limited rear space", "Complex electronics"],
    },
  },
  "7": {
    id: 7,
    name: "Honda Civic",
    brand: "Honda",
    category: "Premium Sedan",
    year: 2025,
    priceRange: "PKR 86-99 Lakh",
    mainImage: "/honda-civic-black-sporty-sedan-2024.jpg",
    gallery: [
      "/honda-civic-black-sporty-sedan-2024.jpg",
      "/honda-civic-interior-premium.jpg",
      "/honda-civic-side-sporty.jpg",
      "/honda-civic-rear-aggressive.jpg",
      "/honda-civic-turbo-engine.jpg",
    ],
    description: "Sporty premium sedan with turbocharged performance and cutting-edge technology.",
    kahani:
      "Honda Civic 1972 se duniya mein hai aur Pakistan mein 1994 se. Current 11th generation mein turbo engine aur premium features hain. Young professionals aur enthusiasts ka favorite hai.",
    specs: {
      engine: "1.5L Turbocharged",
      horsepower: "180 hp",
      torque: "240 Nm",
      topSpeed: "200 km/h",
      acceleration: "0-100 km/h in 8.2s",
      transmission: "CVT",
      drivetrain: "Front-Wheel Drive",
      fuelEconomy: "13-15 km/l",
      fuelType: "Petrol",
      weight: "1,330 kg",
      length: "4,674 mm",
      width: "1,802 mm",
      height: "1,415 mm",
      wheelbase: "2,735 mm",
      groundClearance: "134 mm",
    },
    features: [
      "Honda SENSING",
      "9-inch Touchscreen",
      "Wireless Apple CarPlay",
      "Bose Audio System",
      "Dual Zone Climate",
      "Remote Engine Start",
      "LED Headlights",
      "Sunroof",
    ],
    safety: [
      "Honda SENSING Suite",
      "Collision Mitigation",
      "Lane Keeping Assist",
      "Adaptive Cruise Control",
      "6 Airbags",
      "Vehicle Stability Assist",
      "ABS with EBD",
      "Tire Pressure Monitoring",
    ],
    availability: "Available at Honda Atlas dealerships",
    proscons: {
      pros: ["Turbocharged performance", "Premium interior", "Advanced safety", "Sporty design", "Honda reliability"],
      cons: ["Premium pricing", "Turbo lag", "CVT transmission", "Maintenance costs"],
    },
  },
  "8": {
    id: 8,
    name: "Honda City",
    brand: "Honda",
    category: "Mid-Range Sedan",
    year: 2025,
    priceRange: "PKR 46-52 Lakh",
    mainImage: "/honda-city-white-compact-sedan.jpg",
    gallery: [
      "/honda-city-white-compact-sedan.jpg",
      "/honda-city-interior-spacious.jpg",
      "/honda-city-side-elegant.jpg",
      "/honda-city-rear-refined.jpg",
      "/honda-city-engine-reliable.jpg",
    ],
    description: "Compact sedan with spacious interior and excellent fuel efficiency.",
    kahani:
      "Honda City 1996 mein launch hui aur Asia Pacific region mein bahut popular hai. Pakistan mein 2009 se available hai aur middle class families ka trusted choice hai.",
    specs: {
      engine: "1.5L 4-Cylinder",
      horsepower: "119 hp",
      torque: "145 Nm",
      topSpeed: "190 km/h",
      acceleration: "0-100 km/h in 10.7s",
      transmission: "CVT/6-Speed Manual",
      drivetrain: "Front-Wheel Drive",
      fuelEconomy: "16-18 km/l",
      fuelType: "Petrol",
      weight: "1,135 kg",
      length: "4,549 mm",
      width: "1,748 mm",
      height: "1,467 mm",
      wheelbase: "2,600 mm",
      groundClearance: "165 mm",
    },
    features: [
      "8-inch Touchscreen",
      "Honda CONNECT",
      "Cruise Control",
      "Automatic Climate Control",
      "Push Button Start",
      "Smart Key",
      "LED Headlights",
      "Rear Camera",
    ],
    safety: [
      "6 Airbags",
      "Honda SENSING",
      "ABS with EBD",
      "Vehicle Stability Control",
      "Hill Start Assist",
      "Emergency Stop Signal",
      "ISOFIX Anchors",
      "Security System",
    ],
    availability: "Available at Honda Atlas dealerships nationwide",
    proscons: {
      pros: ["Spacious cabin", "Fuel efficient", "Reliable engine", "Good resale value", "Honda build quality"],
      cons: ["CVT transmission feel", "Road noise", "Limited rear headroom", "Basic interior materials"],
    },
  },
  "9": {
    id: 9,
    name: "BMW 3 Series",
    brand: "BMW",
    category: "Luxury Sedan",
    year: 2025,
    priceRange: "PKR 1.2-1.5 Crore",
    mainImage: "/bmw-3-series-blue-luxury-sedan.jpg",
    gallery: [
      "/bmw-3-series-blue-luxury-sedan.jpg",
      "/bmw-3-series-interior-luxury.jpg",
      "/bmw-3-series-side-dynamic.jpg",
      "/bmw-3-series-rear-elegant.jpg",
      "/bmw-3-series-engine-powerful.jpg",
    ],
    description: "The ultimate driving machine with perfect balance of luxury and performance.",
    kahani:
      "BMW 3 Series 1975 mein launch hui aur luxury sports sedan ka benchmark bani. Pakistan mein ye status symbol hai aur driving enthusiasts ka dream car hai.",
    specs: {
      engine: "2.0L Twin-Turbo",
      horsepower: "255 hp",
      torque: "400 Nm",
      topSpeed: "250 km/h (limited)",
      acceleration: "0-100 km/h in 5.8s",
      transmission: "8-Speed Automatic",
      drivetrain: "Rear-Wheel Drive",
      fuelEconomy: "10-12 km/l",
      fuelType: "Premium Petrol",
      weight: "1,540 kg",
      length: "4,709 mm",
      width: "1,827 mm",
      height: "1,442 mm",
      wheelbase: "2,851 mm",
      groundClearance: "140 mm",
    },
    features: [
      "iDrive 7.0",
      "12.3-inch Digital Cluster",
      "10.25-inch Display",
      "Harman Kardon Audio",
      "Gesture Control",
      "Wireless Charging",
      "Ambient Lighting",
      "M Sport Package",
    ],
    safety: [
      "BMW Active Protection",
      "6 Airbags",
      "Dynamic Stability Control",
      "ABS with Cornering Brake Control",
      "Attention Assistant",
      "Park Distance Control",
      "Runflat Tires",
      "BMW Assist",
    ],
    availability: "Available through BMW authorized dealers",
    proscons: {
      pros: [
        "Exceptional driving dynamics",
        "Luxury interior",
        "Advanced technology",
        "Strong performance",
        "BMW heritage",
      ],
      cons: ["High purchase price", "Expensive maintenance", "Premium fuel requirement", "Limited rear space"],
    },
  },
  "10": {
    id: 10,
    name: "BMW X5",
    brand: "BMW",
    category: "Luxury SUV",
    year: 2025,
    priceRange: "PKR 2.2-2.8 Crore",
    mainImage: "/bmw-x5-black-luxury-suv.jpg",
    gallery: [
      "/bmw-x5-black-luxury-suv.jpg",
      "/bmw-x5-interior-premium.jpg",
      "/bmw-x5-side-commanding.jpg",
      "/bmw-x5-rear-sophisticated.jpg",
      "/bmw-x5-engine-v6.jpg",
    ],
    description: "Luxury SUV that combines BMW's driving dynamics with SUV practicality.",
    kahani:
      "BMW X5 1999 mein launch hui aur luxury SUV segment create ki. Ye pehli BMW SUV thi jo Sports Activity Vehicle concept layi. Pakistan mein elite class ka preferred choice hai.",
    specs: {
      engine: "3.0L Twin-Turbo Inline-6",
      horsepower: "335 hp",
      torque: "450 Nm",
      topSpeed: "250 km/h (limited)",
      acceleration: "0-100 km/h in 5.5s",
      transmission: "8-Speed Automatic",
      drivetrain: "All-Wheel Drive (xDrive)",
      fuelEconomy: "8-10 km/l",
      fuelType: "Premium Petrol",
      weight: "2,070 kg",
      length: "4,922 mm",
      width: "2,004 mm",
      height: "1,745 mm",
      wheelbase: "2,975 mm",
      groundClearance: "214 mm",
    },
    features: [
      "BMW iDrive 8.0",
      "12.3-inch Digital Cluster",
      "14.9-inch Control Display",
      "Panoramic Sunroof",
      "4-Zone Climate",
      "Harman Kardon Surround",
      "Gesture Control",
      "Air Suspension",
    ],
    safety: [
      "BMW Active Protection",
      "8 Airbags",
      "Dynamic Stability Control",
      "BMW Assist",
      "Parking Assistant",
      "Surround View Camera",
      "Lane Departure Warning",
      "Active Cruise Control",
    ],
    availability: "Available through BMW authorized dealers in major cities",
    proscons: {
      pros: [
        "Commanding presence",
        "Luxury appointments",
        "Advanced technology",
        "All-weather capability",
        "Strong performance",
      ],
      cons: ["Very expensive", "High running costs", "Fuel consumption", "Complex electronics"],
    },
  },
  "11": {
    id: 11,
    name: "Mercedes-Benz C-Class",
    brand: "Mercedes-Benz",
    category: "Luxury Sedan",
    year: 2025,
    priceRange: "PKR 1.4-1.8 Crore",
    mainImage: "/mercedes-benz-c-class-silver-luxury-sedan.jpg",
    gallery: [
      "/mercedes-benz-c-class-silver-luxury-sedan.jpg",
      "/mercedes-benz-c-class-interior-elegant.jpg",
      "/mercedes-benz-c-class-side-refined.jpg",
      "/mercedes-benz-c-class-rear-sophisticated.jpg",
      "/mercedes-benz-c-class-engine-advanced.jpg",
    ],
    description: "Epitome of luxury and comfort with advanced safety features.",
    kahani:
      "Mercedes-Benz C-Class 1993 mein launch hui aur luxury car segment mein revolution layi. Pakistan mein business class ka preferred choice hai aur German engineering ka symbol hai.",
    specs: {
      engine: "2.0L Turbocharged",
      horsepower: "255 hp",
      torque: "400 Nm",
      topSpeed: "250 km/h (limited)",
      acceleration: "0-100 km/h in 6.0s",
      transmission: "9G-TRONIC Automatic",
      drivetrain: "Rear-Wheel Drive",
      fuelEconomy: "9-11 km/l",
      fuelType: "Premium Petrol",
      weight: "1,640 kg",
      length: "4,751 mm",
      width: "1,820 mm",
      height: "1,437 mm",
      wheelbase: "2,865 mm",
      groundClearance: "107 mm",
    },
    features: [
      "MBUX Infotainment",
      "12.3-inch Digital Cluster",
      "11.9-inch Central Display",
      "Burmester Audio",
      "Ambient Lighting",
      "Wireless Charging",
      "Voice Control",
      "Mercedes me connect",
    ],
    safety: [
      "Mercedes-Benz Intelligent Drive",
      "9 Airbags",
      "Active Brake Assist",
      "Attention Assist",
      "Blind Spot Assist",
      "Lane Keeping Assist",
      "PRE-SAFE System",
      "Adaptive Brake Lights",
    ],
    availability: "Available through Mercedes-Benz authorized dealers",
    proscons: {
      pros: [
        "Luxurious interior",
        "Advanced safety systems",
        "Smooth ride quality",
        "Premium materials",
        "Mercedes heritage",
      ],
      cons: ["High purchase price", "Expensive maintenance", "Complex technology", "Premium fuel requirement"],
    },
  },
  "12": {
    id: 12,
    name: "Mercedes-Benz S-Class",
    brand: "Mercedes-Benz",
    category: "Ultra Luxury Sedan",
    year: 2025,
    priceRange: "PKR 3.5-4.5 Crore",
    mainImage: "/mercedes-s-class-black-luxury-sedan.jpg",
    gallery: [
      "/mercedes-s-class-black-luxury-sedan.jpg",
      "/mercedes-s-class-interior-opulent.jpg",
      "/mercedes-s-class-side-majestic.jpg",
      "/mercedes-s-class-rear-executive.jpg",
      "/mercedes-s-class-engine-v6.jpg",
    ],
    description: "Flagship luxury sedan with cutting-edge technology and unmatched comfort.",
    kahani:
      "S-Class Mercedes ka flagship hai jo 1972 se luxury standards set kar raha hai. Har generation mein future technology introduce karta hai aur automotive innovation ka leader hai.",
    specs: {
      engine: "3.0L Twin-Turbo V6 + EQBoost",
      horsepower: "429 hp",
      torque: "520 Nm",
      topSpeed: "250 km/h (limited)",
      acceleration: "0-100 km/h in 4.9s",
      transmission: "9G-TRONIC Automatic",
      drivetrain: "All-Wheel Drive (4MATIC)",
      fuelEconomy: "7-9 km/l",
      fuelType: "Premium Petrol",
      weight: "2,110 kg",
      length: "5,179 mm",
      width: "1,921 mm",
      height: "1,503 mm",
      wheelbase: "3,106 mm",
      groundClearance: "125 mm",
    },
    features: [
      "MBUX Hyperscreen",
      "12.8-inch OLED Display",
      "Burmester 4D Surround Sound",
      "Executive Rear Seats",
      "Massage Function",
      "Air Balance Package",
      "Magic Body Control",
      "Chauffeur Package",
    ],
    safety: [
      "Mercedes-Benz Intelligent Drive",
      "11 Airbags",
      "PRE-SAFE Impulse",
      "Active Distance Assist",
      "Active Steering Assist",
      "Evasive Steering Assist",
      "Active Brake Assist",
      "Car-to-X Communication",
    ],
    availability: "Available through Mercedes-Benz flagship showrooms",
    proscons: {
      pros: ["Ultimate luxury", "Cutting-edge technology", "Exceptional comfort", "Advanced safety", "Prestige value"],
      cons: ["Extremely expensive", "Very high running costs", "Complex systems", "Size limitations"],
    },
  },
  "13": {
    id: 13,
    name: "Porsche 911",
    brand: "Porsche",
    category: "Sports Car",
    year: 2025,
    priceRange: "PKR 4-6 Crore",
    mainImage: "/red-porsche-911.png",
    gallery: [
      "/red-porsche-911.png",
      "/porsche-911-interior-sporty.jpg",
      "/porsche-911-side-iconic.jpg",
      "/porsche-911-rear-distinctive.jpg",
      "/porsche-911-engine-flat6.jpg",
    ],
    description: "Iconic sports car with timeless design and exceptional performance engineering.",
    kahani:
      "Porsche 911 ki kahani 1963 mein shuru hui aur ye duniya ki sabse iconic sports car ban gayi. Iska unique rear-engine design aur distinctive silhouette 60 saal baad bhi unchanged hai. Pakistan mein ye ultimate status symbol hai.",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      horsepower: "379 hp",
      torque: "450 Nm",
      topSpeed: "293 km/h",
      acceleration: "0-100 km/h in 4.2s",
      transmission: "8-Speed PDK Dual-Clutch",
      drivetrain: "Rear-Wheel Drive",
      fuelEconomy: "9-11 km/l",
      fuelType: "Premium Petrol",
      weight: "1,515 kg",
      length: "4,519 mm",
      width: "1,852 mm",
      height: "1,300 mm",
      wheelbase: "2,450 mm",
      groundClearance: "108 mm",
    },
    features: [
      "Porsche Communication Management",
      "Sport Chrono Package",
      "Adaptive Suspension (PASM)",
      "Porsche Torque Vectoring",
      "Launch Control",
      "Sport Response Button",
      "Bose Surround Sound",
      "Porsche Connect",
    ],
    safety: [
      "Porsche Stability Management",
      "Multiple Airbags",
      "ABS with Brake Assist",
      "Electronic Brake Distribution",
      "Traction Control",
      "Roll Bars",
      "Tire Pressure Monitoring",
      "Side Impact Protection",
    ],
    availability: "Available through authorized Porsche dealers in major cities",
    proscons: {
      pros: [
        "Timeless design",
        "Exceptional build quality",
        "Outstanding performance",
        "Daily usable supercar",
        "Strong heritage",
      ],
      cons: ["Very expensive", "High maintenance costs", "Limited rear seats", "Premium fuel requirement"],
    },
  },
  "14": {
    id: 14,
    name: "Porsche Cayenne",
    brand: "Porsche",
    category: "Luxury SUV",
    year: 2025,
    priceRange: "PKR 2.8-3.5 Crore",
    mainImage: "/porsche-cayenne-white-luxury-suv.jpg",
    gallery: [
      "/porsche-cayenne-white-luxury-suv.jpg",
      "/porsche-cayenne-interior-premium.jpg",
      "/porsche-cayenne-side-athletic.jpg",
      "/porsche-cayenne-rear-sporty.jpg",
      "/porsche-cayenne-engine-v6.jpg",
    ],
    description: "Sports SUV that brings Porsche DNA to the SUV segment.",
    kahani:
      "Cayenne 2002 mein launch hui aur Porsche ki pehli SUV thi. Initially controversial thi lekin company ko financially save kiya aur SUV segment mein sports car DNA introduce ki.",
    specs: {
      engine: "3.0L Twin-Turbo V6",
      horsepower: "335 hp",
      torque: "450 Nm",
      topSpeed: "245 km/h",
      acceleration: "0-100 km/h in 5.9s",
      transmission: "8-Speed Tiptronic",
      drivetrain: "All-Wheel Drive",
      fuelEconomy: "8-10 km/l",
      fuelType: "Premium Petrol",
      weight: "2,085 kg",
      length: "4,918 mm",
      width: "1,983 mm",
      height: "1,696 mm",
      wheelbase: "2,895 mm",
      groundClearance: "230 mm",
    },
    features: [
      "Porsche Communication Management",
      "12.3-inch Touchscreen",
      "Bose Surround Sound",
      "Panoramic Sunroof",
      "Air Suspension",
      "Sport Chrono Package",
      "Porsche Connect",
      "Adaptive Cruise Control",
    ],
    safety: [
      "Porsche Stability Management",
      "8 Airbags",
      "Lane Change Assist",
      "Park Assist",
      "Surround View Camera",
      "Traffic Sign Recognition",
      "Emergency Brake Assist",
      "Porsche Side Impact Protection",
    ],
    availability: "Available through Porsche authorized dealers",
    proscons: {
      pros: [
        "Sports car performance in SUV",
        "Luxury interior",
        "Advanced technology",
        "All-terrain capability",
        "Porsche heritage",
      ],
      cons: ["Very expensive", "High running costs", "Fuel consumption", "Complex systems"],
    },
  },
  "15": {
    id: 15,
    name: "Lamborghini Huracán",
    brand: "Lamborghini",
    category: "Supercar",
    year: 2025,
    priceRange: "PKR 8-12 Crore",
    mainImage: "/lamborghini-huracan-orange-supercar.jpg",
    gallery: [
      "/lamborghini-huracan-orange-supercar.jpg",
      "/lamborghini-huracan-interior-racing.jpg",
      "/lamborghini-huracan-side-aggressive.jpg",
      "/lamborghini-huracan-rear-dramatic.jpg",
      "/lamborghini-huracan-engine-v10.jpg",
    ],
    description: "Italian masterpiece with naturally aspirated V10 and aggressive styling.",
    kahani:
      "Lamborghini Huracán 2014 mein launch hui aur Gallardo ka successor bani. Spanish fighting bull ke naam pe rakha gaya aur Italian craftsmanship ka perfect example hai.",
    specs: {
      engine: "5.2L Naturally Aspirated V10",
      horsepower: "630 hp",
      torque: "600 Nm",
      topSpeed: "325 km/h",
      acceleration: "0-100 km/h in 2.9s",
      transmission: "7-Speed Dual-Clutch",
      drivetrain: "All-Wheel Drive",
      fuelEconomy: "4-6 km/l",
      fuelType: "Premium Petrol",
      weight: "1,422 kg",
      length: "4,520 mm",
      width: "1,933 mm",
      height: "1,165 mm",
      wheelbase: "2,620 mm",
      groundClearance: "135 mm",
    },
    features: [
      "Lamborghini Infotainment System",
      "Digital Cockpit",
      "Carbon Fiber Interior",
      "Alcantara Upholstery",
      "Launch Control",
      "Dynamic Steering",
      "Magnetic Ride Control",
      "Track Telemetry",
    ],
    safety: [
      "Lamborghini Dinamica Veicolo Integrata",
      "Multiple Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "Hill Hold Control",
      "Tire Pressure Monitoring",
      "Roll Cage",
    ],
    availability: "Available through Lamborghini authorized dealers",
    proscons: {
      pros: [
        "Naturally aspirated V10",
        "Stunning design",
        "Track-focused performance",
        "Italian craftsmanship",
        "Exclusive ownership",
      ],
      cons: ["Extremely expensive", "Very high running costs", "Limited practicality", "Maintenance complexity"],
    },
  },
  "16": {
    id: 16,
    name: "Lamborghini Aventador",
    brand: "Lamborghini",
    category: "Supercar",
    year: 2025,
    priceRange: "PKR 15-20 Crore",
    mainImage: "/lamborghini-aventador-yellow-supercar.jpg",
    gallery: [
      "/lamborghini-aventador-yellow-supercar.jpg",
      "/lamborghini-aventador-interior-exotic.jpg",
      "/lamborghini-aventador-side-dramatic.jpg",
      "/lamborghini-aventador-rear-aggressive.jpg",
      "/lamborghini-aventador-engine-v12.jpg",
    ],
    description: "Flagship V12 supercar with dramatic scissor doors and thunderous exhaust note.",
    kahani:
      "Aventador 2011 mein launch hui aur Murciélago ka replacement bani. Spanish fighting bull Aventador ke naam pe hai aur Lamborghini ki flagship model hai.",
    specs: {
      engine: "6.5L Naturally Aspirated V12",
      horsepower: "769 hp",
      torque: "720 Nm",
      topSpeed: "350 km/h",
      acceleration: "0-100 km/h in 2.8s",
      transmission: "7-Speed ISR",
      drivetrain: "All-Wheel Drive",
      fuelEconomy: "3-5 km/l",
      fuelType: "Premium Petrol",
      weight: "1,575 kg",
      length: "4,797 mm",
      width: "2,030 mm",
      height: "1,136 mm",
      wheelbase: "2,700 mm",
      groundClearance: "140 mm",
    },
    features: [
      "Lamborghini Infotainment",
      "TFT Digital Display",
      "Carbon Fiber Monocoque",
      "Scissor Doors",
      "Launch Control",
      "Ego Mode",
      "Corsa Mode",
      "Track Telemetry",
    ],
    safety: [
      "LDV Integrated Vehicle Dynamics",
      "Carbon Fiber Safety Cell",
      "Multiple Airbags",
      "ABS with EBD",
      "Electronic Stability Control",
      "Traction Control",
      "Roll Cage Integration",
      "Fire Suppression",
    ],
    availability: "Extremely limited availability through Lamborghini boutiques",
    proscons: {
      pros: [
        "Naturally aspirated V12",
        "Iconic scissor doors",
        "Track performance",
        "Exclusive design",
        "Investment potential",
      ],
      cons: ["Astronomical price", "Extreme running costs", "Very limited practicality", "Maintenance complexity"],
    },
  },
  "17": {
    id: 17,
    name: "Ferrari F8 Tributo",
    brand: "Ferrari",
    category: "Supercar",
    year: 2025,
    priceRange: "PKR 12-15 Crore",
    mainImage: "/ferrari-f8-tributo-red-supercar.jpg",
    gallery: [
      "/ferrari-f8-tributo-red-supercar.jpg",
      "/ferrari-f8-tributo-interior-racing.jpg",
      "/ferrari-f8-tributo-side-aerodynamic.jpg",
      "/ferrari-f8-tributo-rear-aggressive.jpg",
      "/ferrari-f8-tributo-engine-v8.jpg",
    ],
    description: "Mid-engine masterpiece from Maranello with racing DNA.",
    kahani:
      "Ferrari F8 Tributo 2019 mein launch hui aur 488 GTB ka evolution hai. Ferrari ki V8 engine heritage ko tribute deti hai aur Maranello ki engineering excellence ka symbol hai.",
    specs: {
      engine: "3.9L Twin-Turbo V8",
      horsepower: "710 hp",
      torque: "770 Nm",
      topSpeed: "340 km/h",
      acceleration: "0-100 km/h in 2.9s",
      transmission: "7-Speed Dual-Clutch",
      drivetrain: "Rear-Wheel Drive",
      fuelEconomy: "4-6 km/l",
      fuelType: "Premium Petrol",
      weight: "1,330 kg",
      length: "4,611 mm",
      width: "1,979 mm",
      height: "1,206 mm",
      wheelbase: "2,650 mm",
      groundClearance: "130 mm",
    },
    features: [
      "Ferrari Infotainment",
      "Digital Cockpit",
      "Carbon Fiber Interior",
      "Manettino Dial",
      "Launch Control",
      "Ferrari Dynamic Enhancer",
      "Side Slip Control",
      "Track Telemetry",
    ],
    safety: [
      "Ferrari Stability Control",
      "Multiple Airbags",
      "ABS with EBD",
      "Electronic Differential",
      "Traction Control",
      "Hill Hold Control",
      "Tire Pressure Monitoring",
      "Roll Cage",
    ],
    availability: "Available through Ferrari authorized dealers",
    proscons: {
      pros: [
        "Twin-turbo V8 performance",
        "Mid-engine balance",
        "Ferrari heritage",
        "Track capability",
        "Stunning design",
      ],
      cons: ["Extremely expensive", "High running costs", "Limited practicality", "Maintenance requirements"],
    },
  },
  "18": {
    id: 18,
    name: "Ferrari 812 Superfast",
    brand: "Ferrari",
    category: "Supercar",
    year: 2025,
    priceRange: "PKR 18-22 Crore",
    mainImage: "/ferrari-812-superfast-red-coupe.jpg",
    gallery: [
      "/ferrari-812-superfast-red-coupe.jpg",
      "/ferrari-812-superfast-interior-luxury.jpg",
      "/ferrari-812-superfast-side-elegant.jpg",
      "/ferrari-812-superfast-rear-powerful.jpg",
      "/ferrari-812-superfast-engine-v12.jpg",
    ],
    description: "Front-engine V12 grand tourer with breathtaking performance and Italian elegance.",
    kahani:
      "812 Superfast 2017 mein launch hui aur F12berlinetta ka successor hai. Ferrari ki most powerful naturally aspirated V12 hai aur grand touring tradition continue karta hai.",
    specs: {
      engine: "6.5L Naturally Aspirated V12",
      horsepower: "789 hp",
      torque: "718 Nm",
      topSpeed: "340 km/h",
      acceleration: "0-100 km/h in 2.9s",
      transmission: "7-Speed Dual-Clutch",
      drivetrain: "Rear-Wheel Drive",
      fuelEconomy: "3-5 km/l",
      fuelType: "Premium Petrol",
      weight: "1,525 kg",
      length: "4,657 mm",
      width: "1,971 mm",
      height: "1,276 mm",
      wheelbase: "2,720 mm",
      groundClearance: "135 mm",
    },
    features: [
      "Ferrari Infotainment",
      "Digital Instrument Cluster",
      "Carbon Fiber Trim",
      "Manettino Selector",
      "Launch Control",
      "Ferrari Peak Performance",
      "Virtual Short Wheelbase",
      "Telemetry System",
    ],
    safety: [
      "Ferrari Stability Control",
      "Multiple Airbags",
      "ABS with EBD",
      "Electronic Differential",
      "Traction Control",
      "Hill Start Assist",
      "Tire Pressure Monitoring",
      "Roll Cage Integration",
    ],
    availability: "Available through Ferrari flagship dealers",
    proscons: {
      pros: [
        "Naturally aspirated V12",
        "Grand touring comfort",
        "Ferrari exclusivity",
        "Track performance",
        "Timeless design",
      ],
      cons: ["Astronomical price", "Extreme running costs", "Limited rear visibility", "Maintenance complexity"],
    },
  },
  "19": {
    id: 19,
    name: "Bugatti Chiron",
    brand: "Bugatti",
    category: "Hypercar",
    year: 2025,
    priceRange: "PKR 80-100 Crore",
    mainImage: "/bugatti-chiron-blue-hypercar.jpg",
    gallery: [
      "/bugatti-chiron-blue-hypercar.jpg",
      "/bugatti-chiron-interior-luxury.jpg",
      "/bugatti-chiron-side-elegant.jpg",
      "/bugatti-chiron-rear-distinctive.jpg",
      "/bugatti-chiron-engine-w16.jpg",
    ],
    description: "The pinnacle of automotive engineering with unmatched luxury and mind-bending performance.",
    kahani:
      "Bugatti Chiron 2016 mein launch hui aur automotive industry ka crown jewel bani. Ye Veyron ka successor hai aur engineering ki hadh hai. Sirf 500 units banaye gaye, har ek masterpiece hai.",
    specs: {
      engine: "8.0L Quad-Turbo W16",
      horsepower: "1,479 hp",
      torque: "1,600 Nm",
      topSpeed: "420 km/h (electronically limited)",
      acceleration: "0-100 km/h in 2.4s",
      transmission: "7-Speed Dual-Clutch",
      drivetrain: "All-Wheel Drive",
      fuelEconomy: "3-4 km/l",
      fuelType: "Premium Petrol",
      weight: "1,995 kg",
      length: "4,544 mm",
      width: "2,038 mm",
      height: "1,212 mm",
      wheelbase: "2,711 mm",
      groundClearance: "120 mm",
    },
    features: [
      "Handcrafted Interior",
      "Diamond-Cut Aluminum Dashboard",
      "Bespoke Audio System",
      "Climate Control with Air Purification",
      "Customizable Drive Modes",
      "Active Aerodynamics",
      "Michelin Pilot Sport Cup 2",
      "Exclusive Telemetry",
    ],
    safety: [
      "Advanced Carbon Fiber Monocoque",
      "Multiple Airbags",
      "Electronic Stability Program",
      "ABS with Brake Assist",
      "Traction Control",
      "Tire Pressure Monitoring",
      "Roll Cage Integration",
      "Fire Suppression System",
    ],
    availability: "Extremely limited availability through Bugatti boutiques worldwide",
    proscons: {
      pros: [
        "Unmatched performance",
        "Exquisite craftsmanship",
        "Exclusive ownership",
        "Engineering marvel",
        "Investment value",
      ],
      cons: [
        "Astronomical price",
        "Extremely high running costs",
        "Limited practicality",
        "Requires special maintenance",
      ],
    },
  },
  "20": {
    id: 20,
    name: "Tesla Model S",
    brand: "Tesla",
    category: "Electric Luxury Sedan",
    year: 2025,
    priceRange: "PKR 2.5-3 Crore",
    mainImage: "/tesla-model-s-white-electric-sedan.jpg",
    gallery: [
      "/tesla-model-s-white-electric-sedan.jpg",
      "/tesla-model-s-interior-minimalist.jpg",
      "/tesla-model-s-side-aerodynamic.jpg",
      "/tesla-model-s-rear-clean.jpg",
      "/tesla-model-s-frunk-storage.jpg",
    ],
    description: "Revolutionary electric luxury sedan that redefined the automotive industry.",
    kahani:
      "Tesla Model S 2012 mein launch hui aur electric car revolution ki shuruat ki. Over-the-air updates aur autopilot technology game-changer hai. Pakistan mein imported units available hain.",
    specs: {
      engine: "Dual Motor Electric",
      horsepower: "670 hp",
      torque: "1,020 Nm",
      topSpeed: "250 km/h",
      acceleration: "0-100 km/h in 3.2s",
      transmission: "Single-Speed Automatic",
      drivetrain: "All-Wheel Drive",
      range: "652 km (EPA)",
      fuelType: "Electric",
      weight: "2,162 kg",
      length: "4,979 mm",
      width: "1,964 mm",
      height: "1,445 mm",
      wheelbase: "2,960 mm",
      groundClearance: "140 mm",
    },
    features: [
      "17-inch Touchscreen",
      "Autopilot",
      "Over-the-Air Updates",
      "Supercharger Network",
      "Premium Audio",
      "Glass Roof",
      "HEPA Air Filter",
      "Bioweapon Defense Mode",
    ],
    safety: [
      "5-Star Safety Rating",
      "8 Airbags",
      "Automatic Emergency Braking",
      "Blind Spot Monitoring",
      "Lane Departure Warning",
      "Collision Avoidance",
      "Sentry Mode",
      "PIN to Drive",
    ],
    availability: "Available through Tesla authorized importers",
    proscons: {
      pros: ["Zero emissions", "Instant torque", "Advanced technology", "Over-the-air updates", "Supercharger network"],
      cons: ["High initial cost", "Limited charging infrastructure", "Battery replacement cost", "Service network"],
    },
  },
  "21": {
    id: 21,
    name: "Tesla Model 3",
    brand: "Tesla",
    category: "Electric Sedan",
    year: 2025,
    priceRange: "PKR 1.8-2.2 Crore",
    mainImage: "/tesla-model-3-blue-electric-sedan.jpg",
    gallery: [
      "/tesla-model-3-blue-electric-sedan.jpg",
      "/tesla-model-3-interior-modern.jpg",
      "/tesla-model-3-side-sleek.jpg",
      "/tesla-model-3-rear-simple.jpg",
      "/tesla-model-3-charging-port.jpg",
    ],
    description: "Mass-market electric sedan that made EVs accessible to mainstream buyers.",
    kahani:
      "Model 3 2017 mein launch hui aur Tesla ki sabse affordable car hai. Iska minimalist interior aur autopilot features revolutionary hain. Electric mobility ka future represent karta hai.",
    specs: {
      engine: "Single/Dual Motor Electric",
      horsepower: "283 hp",
      torque: "420 Nm",
      topSpeed: "225 km/h",
      acceleration: "0-100 km/h in 5.3s",
      transmission: "Single-Speed Automatic",
      drivetrain: "Rear-Wheel Drive",
      range: "491 km (EPA)",
      fuelType: "Electric",
      weight: "1,611 kg",
      length: "4,694 mm",
      width: "1,849 mm",
      height: "1,443 mm",
      wheelbase: "2,875 mm",
      groundClearance: "140 mm",
    },
    features: [
      "15-inch Touchscreen",
      "Autopilot",
      "Over-the-Air Updates",
      "Mobile Connector",
      "Premium Audio",
      "Glass Roof",
      "Sentry Mode",
      "Dog Mode",
    ],
    safety: [
      "5-Star Safety Rating",
      "8 Airbags",
      "Automatic Emergency Braking",
      "Blind Spot Monitoring",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Side Collision Warning",
      "Cabin Overheat Protection",
    ],
    availability: "Available through Tesla authorized importers",
    proscons: {
      pros: [
        "Affordable electric option",
        "Minimalist design",
        "Advanced autopilot",
        "Low running costs",
        "Environmental friendly",
      ],
      cons: ["Limited charging network", "Interior materials", "Service availability", "Battery degradation"],
    },
  },
}

interface CarPageProps {
  params: {
    id: string
  }
}

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const car = carsData[params.id]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!car) {
    notFound()
  }

  const modalImages = [
    {
      id: 0,
      src: car.mainImage,
      alt: car.name,
      title: `${car.name} - Main Image`,
      category: car.category,
    },
    ...car.gallery.map((image: string, index: number) => ({
      id: index + 1,
      src: image,
      alt: `${car.name} gallery ${index + 1}`,
      title: `${car.name} - Gallery ${index + 1}`,
      category: car.category,
    })),
  ]

  const handleImageClick = (imageIndex: number) => {
    setCurrentImageIndex(imageIndex)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Back Navigation */}
      {/* <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <Button variant="ghost" asChild className="mb-4 sm:mb-6">
          <Link href="/cars" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cars Database
          </Link>
        </Button>
      </div> */}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          <div>
            <div className="mb-4 sm:mb-6">
              <Button variant="ghost" className="mb-4 p-0 h-auto text-muted-foreground hover:text-foreground" asChild>
                <Link href="/cars" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t("backToCars")}
                </Link>
              </Button>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-primary text-primary-foreground">{car.category}</Badge>
                <Badge variant="outline">{car.brand}</Badge>
                <Badge variant="outline">{car.year}</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">{car.name}</h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary mb-4 sm:mb-6">{car.priceRange}</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-6 sm:mb-8">
              <Button className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Save Car
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src={car.mainImage || "/car-placeholder.png"}
              alt={car.name}
              width={600}
              height={400}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleImageClick(0)}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/car-placeholder.png"
              }}
            />
          </div>
        </div>
      </section>

      {/* Car Ki Kahani */}
      <section className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Car Ki Kahani
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{car.kahani}</p>
          </CardContent>
        </Card>
      </section>

      {/* Key Specifications */}
      <section className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Key Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("power")}</p>
                  <p className="font-semibold text-sm sm:text-base">{car.specs.horsepower}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Gauge className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("topSpeed")}</p>
                  <p className="font-semibold text-sm sm:text-base">{car.specs.topSpeed}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("acceleration")}</p>
                  <p className="font-semibold text-sm sm:text-base">{car.specs.acceleration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("price")}</p>
                  <p className="font-semibold text-xs sm:text-sm">{car.priceRange}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Detailed Specifications */}
      <section className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Engine & Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                {t("engine")} & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">{t("engine")}:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.engine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Horsepower:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.horsepower}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Torque:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.torque}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Transmission:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.transmission}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Drivetrain:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.drivetrain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Fuel Economy:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.fuelEconomy || car.specs.range}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dimensions & Weight */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Dimensions & Weight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Length:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Width:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.width}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Height:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Wheelbase:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.wheelbase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Weight:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Ground Clearance:</span>
                  <span className="font-medium text-sm sm:text-base">{car.specs.groundClearance}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features, Safety, Pros & Cons */}
      <section className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {car.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Safety */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Safety Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {car.safety.map((safety: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{safety}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pros & Cons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Pros & Cons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-600 mb-2 text-sm sm:text-base">Pros</h4>
                  <ul className="space-y-1">
                    {car.proscons.pros.map((pro: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-2 text-sm sm:text-base">Cons</h4>
                  <ul className="space-y-1">
                    {car.proscons.cons.map((con: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Availability */}
      <section className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Availability in Pakistan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm sm:text-base">{car.availability}</p>
          </CardContent>
        </Card>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {car.gallery.map((image: string, index: number) => (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <Image
                src={image || "/car-placeholder.png"}
                alt={`${car.name} gallery ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => handleImageClick(index + 1)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/car-placeholder.png"
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Expert Review */}
      <section className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Expert Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Overall Rating */}
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">4.2</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Overall Rating</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    The {car.name} delivers excellent value in its segment with strong performance, modern features, and
                    reliable build quality. A solid choice for Pakistani roads.
                  </p>
                </div>
              </div>

              {/* Rating Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold text-primary">4.5</div>
                  <div className="text-xs text-muted-foreground">Performance</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold text-primary">4.0</div>
                  <div className="text-xs text-muted-foreground">Comfort</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold text-primary">4.2</div>
                  <div className="text-xs text-muted-foreground">Fuel Economy</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold text-primary">3.8</div>
                  <div className="text-xs text-muted-foreground">Value</div>
                </div>
              </div>

              {/* Detailed Review */}
              <div className="prose prose-sm max-w-none">
                <h4 className="font-semibold mb-2">Performance & Driving Experience</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  The {car.name} offers impressive performance with its {car.specs?.engine || "modern engine"}
                  delivering {car.specs?.horsepower || "adequate power"} of horsepower. The acceleration is smooth and
                  responsive, making it suitable for both city driving and highway cruising.
                </p>

                <h4 className="font-semibold mb-2">Interior & Comfort</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  The cabin is well-designed with quality materials and thoughtful ergonomics. Seating is comfortable
                  for long journeys, and the infotainment system is intuitive. Climate control works effectively in
                  Pakistan's varying weather conditions.
                </p>

                <h4 className="font-semibold mb-2">Fuel Economy & Running Costs</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  With rising fuel prices in Pakistan, the {car.name} delivers competitive fuel economy. Maintenance
                  costs are reasonable with good parts availability through authorized dealers.
                </p>

                <h4 className="font-semibold mb-2">Final Verdict</h4>
                <p className="text-muted-foreground text-sm">
                  The {car.name} is a well-rounded vehicle that offers good value for money in the Pakistani market. It
                  successfully balances performance, comfort, and efficiency, making it a recommended choice for buyers
                  in this segment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* User Reviews */}
      <section className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              User Reviews
            </CardTitle>
            <CardDescription>Real experiences from {car.name} owners in Pakistan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Review 1 */}
              <div className="border-b pb-6 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">Ahmad Khan</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">Karachi • 6 months ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      "Excellent car for Pakistani roads. The build quality is impressive and fuel economy is better
                      than expected. AC works great in Karachi's heat. Highly recommended!"
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Verified Owner</span>
                      <button className="flex items-center gap-1 hover:text-foreground">
                        <ThumbsUp className="h-3 w-3" />
                        24
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="border-b pb-6 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">Fatima Ali</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">Lahore • 3 months ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      "Great family car with good safety features. The interior is spacious and comfortable. Only
                      complaint is the price could be more competitive compared to other options."
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Verified Owner</span>
                      <button className="flex items-center gap-1 hover:text-foreground">
                        <ThumbsUp className="h-3 w-3" />
                        18
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="border-b pb-6 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">Hassan Sheikh</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">Islamabad • 1 month ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      "Smooth driving experience and good performance on highways. Maintenance is affordable and parts
                      are easily available. Would buy again!"
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Verified Owner</span>
                      <button className="flex items-center gap-1 hover:text-foreground">
                        <ThumbsUp className="h-3 w-3" />
                        31
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Review Button */}
              <div className="pt-4">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Write a Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Compare with Similar Cars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Comparison Car 1 */}
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop&crop=center"
                    alt="Toyota Corolla"
                    width={60}
                    height={40}
                    className="rounded object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-sm">Toyota Corolla</h4>
                    <p className="text-xs text-muted-foreground">PKR 59-69 Lakh</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Power:</span>
                    <span>121 hp</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel Economy:</span>
                    <span>14-16 km/l</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent" asChild>
                  <Link href="/cars/3">Compare</Link>
                </Button>
              </div>

              {/* Comparison Car 2 */}
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop&crop=center"
                    alt="Changan Alsvin"
                    width={60}
                    height={40}
                    className="rounded object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-sm">Changan Alsvin</h4>
                    <p className="text-xs text-muted-foreground">PKR 46-54 Lakh</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Power:</span>
                    <span>107 hp</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel Economy:</span>
                    <span>13-15 km/l</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent" asChild>
                  <Link href="/cars/6">Compare</Link>
                </Button>
              </div>

              {/* View All Comparisons */}
              <div className="border rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium mb-2">View All Comparisons</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/compare">Compare Cars</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 mb-8 sm:mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-medium text-sm mb-2">What is the fuel average of {car.name}?</h4>
                <p className="text-sm text-muted-foreground">
                  The {car.name} delivers approximately 12-15 km/l in city conditions and 16-18 km/l on highways,
                  depending on driving conditions and maintenance.
                </p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-medium text-sm mb-2">Is {car.name} good for Pakistani roads?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, the {car.name} is well-suited for Pakistani road conditions with adequate ground clearance and
                  robust build quality to handle various road surfaces.
                </p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-medium text-sm mb-2">What is the resale value of {car.name}?</h4>
                <p className="text-sm text-muted-foreground">
                  The {car.name} maintains good resale value due to brand reputation and reliability. Expect 60-70%
                  value retention after 3-4 years with proper maintenance.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Are spare parts easily available?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, spare parts for {car.name} are readily available through authorized dealers and aftermarket
                  suppliers across major cities in Pakistan.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={modalImages}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
      />

      <Footer />
    </div>
  )
}
