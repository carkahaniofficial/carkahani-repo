import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Instagram, Youtube, Facebook, Car, Users, Award, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-muted py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary text-primary-foreground">About Car Kahani</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Har Car Ki Apni <span className="text-primary">Kahani</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Pakistan's premier automotive platform where every car has a story to tell. From budget-friendly rides to
            luxury supercars, we bring you comprehensive reviews, detailed specifications, and the fascinating stories
            behind every vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/cars">Explore Cars Database</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent">
              <Link href="/reviews">Read Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Car Kahani ki shuruat 2025 mein hui jab hum ne dekha ke Pakistan mein automotive content ki kami hai.
                Hamara mission hai ke har car enthusiast ko accurate, detailed aur comprehensive information mile.
              </p>
              <p>
                Suzuki Alto se lekar Bugatti Chiron tak, har car ki apni unique kahani hai. Hum ye kahaniyaan aap tak
                pahunchate hain - kaise bani, kahan bani, kya features hain, aur kyun ye special hai.
              </p>
              <p>
                Car Kahani sirf reviews nahi, balke ek complete automotive ecosystem hai jahan aap cars ki detailed
                specifications, latest news, upcoming events, aur industry trends ke baare mein jan sakte hain.
              </p>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/car-enthusiast-reviewing-luxury-sports-car-in-mode.jpg"
              alt="Car Kahani Team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Founder</h2>
            <p className="text-muted-foreground">The passionate car enthusiast behind Car Kahani</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1754720784319.jpg-OxaVSOahjdJY4p1WelMlBGmnalpwwC.jpeg"
                    alt="Farhan Mehmood"
                    width={200}
                    height={200}
                    className="rounded-full shadow-lg object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Farhan Mehmood</h3>
                  <Badge className="mb-4">Founder & Car Enthusiast</Badge>
                  <p className="text-muted-foreground mb-6">
                    Farhan Mehmood ek passionate car enthusiast hain jo bachpan se cars ke deewane hain. Engineering
                    background aur automotive industry experience ke saath, unhone 2025 mein Car Kahani ko Pakistan ka
                    leading automotive platform banaya hai.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button variant="outline" size="sm" asChild className="bg-transparent">
                      <Link href="https://instagram.com/carkahani_official" className="flex items-center gap-2">
                        <Instagram className="h-4 w-4" />
                        @carkahani_official
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="bg-transparent">
                      <Link href="https://www.youtube.com/@carkahani_official" className="flex items-center gap-2">
                        <Youtube className="h-4 w-4" />
                        CarKahani
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="bg-transparent">
                      <Link href="https://facebook.com/CarKahani" className="flex items-center gap-2">
                        <Facebook className="h-4 w-4" />
                        CarKahani
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Car Kahani by Numbers</h2>
          <p className="text-muted-foreground">Our impact on Pakistan's automotive community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Car className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-2xl font-bold">500+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Cars Reviewed</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-2xl font-bold">100K+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Monthly Readers</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-2xl font-bold">50+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Brand Partnerships</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-2xl font-bold">25+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Cities Covered</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hamara mission hai Pakistan mein automotive awareness badhana aur har car buyer ko informed decisions
                  lene mein madad karna. Hum accurate information, honest reviews, aur comprehensive guides provide
                  karte hain.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Car Kahani ko Pakistan ka #1 automotive platform banana jahan har car enthusiast apni zarurat ki har
                  information mil sake. Hum chahte hain ke har Pakistani ko cars ke baare mein sahi knowledge ho.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
