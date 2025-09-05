import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, User, Clock, Search, ArrowRight, Eye } from "lucide-react"
import Link from "next/link"
import { OptimizedImage } from "@/components/optimized-image"

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Electric Vehicles: What to Expect in 2025",
    slug: "future-electric-vehicles-2025",
    excerpt:
      "Exploring the latest developments in EV technology, battery innovations, and what the automotive landscape will look like in the coming year.",
    content: "Full article content here...",
    author: "Sarah Johnson",
    publishedAt: "2024-12-15",
    readTime: "8 min read",
    category: "Technology",
    tags: ["Electric Vehicles", "Technology", "Future"],
    image: "/modern-ev-charging.png",
    views: 1245,
    featured: true,
    externalUrl: "https://www.caranddriver.com/news/a45875832/electric-vehicle-trends-2025/",
  },
  {
    id: 2,
    title: "Top 10 Car Modifications for Performance Enthusiasts",
    slug: "top-10-car-modifications-performance",
    excerpt:
      "From turbochargers to suspension upgrades, discover the most effective modifications to boost your car's performance on the track and street.",
    content: "Full article content here...",
    author: "Mike Rodriguez",
    publishedAt: "2024-12-12",
    readTime: "12 min read",
    category: "Modifications",
    tags: ["Performance", "Modifications", "Tuning"],
    image: "/bmw-m3-competition-blue-sedan.jpg",
    views: 892,
    featured: false,
    externalUrl: "https://www.motortrend.com/how-to/best-car-modifications-performance/",
  },
  {
    id: 3,
    title: "Classic Car Restoration: A Beginner's Complete Guide",
    slug: "classic-car-restoration-beginners-guide",
    excerpt:
      "Everything you need to know about restoring classic cars, from finding the right project to finishing touches that bring vintage beauties back to life.",
    content: "Full article content here...",
    author: "David Chen",
    publishedAt: "2024-12-10",
    readTime: "15 min read",
    category: "Restoration",
    tags: ["Classic Cars", "Restoration", "DIY"],
    image: "/modern-sports-car-on-highway-at-sunset-with-dramat.jpg",
    views: 2156,
    featured: true,
    externalUrl: "https://www.hagerty.com/media/maintenance-and-tech/classic-car-restoration-guide/",
  },
  {
    id: 4,
    title: "Autonomous Driving: How Close Are We Really?",
    slug: "autonomous-driving-how-close-are-we",
    excerpt:
      "An in-depth analysis of current autonomous driving technology, regulatory challenges, and realistic timelines for fully self-driving cars.",
    content: "Full article content here...",
    author: "Emily Watson",
    publishedAt: "2024-12-08",
    readTime: "10 min read",
    category: "Technology",
    tags: ["Autonomous Driving", "AI", "Future"],
    image: "/autonomous-self-driving-car-technology.jpg",
    views: 1678,
    featured: false,
    externalUrl: "https://www.autonews.com/technology/autonomous-driving-reality-check-2024",
  },
  {
    id: 5,
    title: "Supercar Showdown: McLaren vs Ferrari vs Lamborghini",
    slug: "supercar-showdown-mclaren-ferrari-lamborghini",
    excerpt:
      "Comparing the latest offerings from three legendary supercar manufacturers in terms of performance, design, and driving experience.",
    content: "Full article content here...",
    author: "Alex Thompson",
    publishedAt: "2024-12-05",
    readTime: "14 min read",
    category: "Reviews",
    tags: ["Supercars", "Comparison", "Performance"],
    image: "/hypercar-speed-test-track.jpg",
    views: 3421,
    featured: true,
    externalUrl: "https://www.topgear.com/car-reviews/group-tests",
  },
  {
    id: 6,
    title: "Sustainable Materials in Modern Car Manufacturing",
    slug: "sustainable-materials-car-manufacturing",
    excerpt:
      "How automotive manufacturers are incorporating eco-friendly materials and sustainable practices in modern vehicle production.",
    content: "Full article content here...",
    author: "Lisa Park",
    publishedAt: "2024-12-03",
    readTime: "9 min read",
    category: "Industry",
    tags: ["Sustainability", "Manufacturing", "Environment"],
    image: "/tesla-model-s-plaid-white-electric-car.jpg",
    views: 756,
    featured: false,
    externalUrl: "https://www.automotiveworld.com/articles/sustainable-materials-automotive/",
  },
]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const recentPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Section */}
      <section className="bg-muted py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">Car Kahani Blog</h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-pretty">
              Latest news, insights, and stories from the automotive world
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search articles..." className="pl-10 h-11 sm:h-12" />
            </div>
            <Select>
              <SelectTrigger className="w-full h-11 sm:h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="modifications">Modifications</SelectItem>
                <SelectItem value="restoration">Restoration</SelectItem>
                <SelectItem value="reviews">Reviews</SelectItem>
                <SelectItem value="industry">Industry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Featured Articles</h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Our most popular and trending automotive content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {featuredPosts.slice(0, 2).map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <OptimizedImage
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  aspectRatio="16/9"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-primary text-primary-foreground text-xs sm:text-sm">
                  {post.category}
                </Badge>
                <Badge className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-yellow-500 text-white text-xs sm:text-sm">
                  Featured
                </Badge>
              </div>

              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-sm sm:text-base">{post.excerpt}</CardDescription>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span className="truncate">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="hidden sm:inline">{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span className="hidden xs:inline">{post.views}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="sm" asChild>
                  <Link
                    href={post.externalUrl || `/blog/${post.slug}`}
                    target={post.externalUrl ? "_blank" : "_self"}
                    rel={post.externalUrl ? "noopener noreferrer" : ""}
                  >
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Third featured post - full width */}
        {featuredPosts[2] && (
          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative">
                <OptimizedImage
                  src={featuredPosts[2].image || "/placeholder.svg"}
                  alt={featuredPosts[2].title}
                  aspectRatio="16/10"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-primary text-primary-foreground text-xs sm:text-sm">
                    {featuredPosts[2].category}
                  </Badge>
                  <Badge className="bg-yellow-500 text-white text-xs sm:text-sm">Featured</Badge>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {featuredPosts[2].title}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">{featuredPosts[2].excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{featuredPosts[2].author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{featuredPosts[2].readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{featuredPosts[2].views}</span>
                    </div>
                  </div>
                </div>
                <Button asChild>
                  <Link
                    href={featuredPosts[2].externalUrl || `/blog/${featuredPosts[2].slug}`}
                    target={featuredPosts[2].externalUrl ? "_blank" : "_self"}
                    rel={featuredPosts[2].externalUrl ? "noopener noreferrer" : ""}
                  >
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        )}
      </section>

      {/* Recent Posts */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto bg-muted/30">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Recent Articles</h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Stay updated with the latest automotive news and insights
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {recentPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <OptimizedImage
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  aspectRatio="16/9"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-primary text-primary-foreground text-xs">
                  {post.category}
                </Badge>
              </div>

              <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                <CardTitle className="text-sm sm:text-base md:text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs sm:text-sm">{post.excerpt}</CardDescription>
              </CardHeader>

              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-transparent" size="sm" variant="outline" asChild>
                  <Link
                    href={post.externalUrl || `/blog/${post.slug}`}
                    target={post.externalUrl ? "_blank" : "_self"}
                    rel={post.externalUrl ? "noopener noreferrer" : ""}
                  >
                    Read More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button size="lg" variant="outline">
            Load More Articles
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
