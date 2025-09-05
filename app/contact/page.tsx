"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, Send, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("https://formspree.io/f/meolppgp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Contact Form Submission",
          message: formData.message,
          _replyto: formData.email,
          _subject: `Car Kahani Contact: ${formData.subject || "New Message"}`,
          _format: "plain",
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        console.log("[v0] Form submitted successfully to Formspree")
      } else {
        const errorData = await response.json()
        console.error("[v0] Formspree error:", errorData)
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get in touch with the Car Kahani team. We'd love to hear from you!
            </p>
            <p className="text-primary text-sm mt-2 font-medium">
              ✓ Messages sent directly to carkahaniofficial@gmail.com
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Have a question, suggestion, or just want to say hello? Fill out the form below and we'll get back to
                  you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✓ Thank you for your message!</p>
                    <p className="text-green-700 text-sm mt-1">
                      We've received your inquiry and will respond within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">❌ Sorry, there was an error sending your message.</p>
                    <p className="text-red-700 text-sm mt-1">
                      Please try again or contact us directly at carkahaniofficial@gmail.com
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us what's on your mind..."
                      className="min-h-32"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels. We're here to help with all your automotive needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">carkahaniofficial@gmail.com</p>
                    <p className="text-xs text-muted-foreground mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+923132423207</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM PST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">123 Green Town Street</p>
                    <p className="text-muted-foreground">Karachi,Pakistan 75230</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
                <CardDescription>
                  Stay connected with Car Kahani on social media for the latest updates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Link
                    href="https://instagram.com/carkahani_official"
                    className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted transition-colors group"
                  >
                    <Instagram className="h-6 w-6 text-pink-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-muted-foreground">carkahani_official</p>
                    </div>
                  </Link>
                </div>
                <div className="flex gap-4 mt-4">
                  <Link
                    href="https://www.youtube.com/@carkahani_official"
                    className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted transition-colors group"
                  >
                    <Youtube className="h-6 w-6 text-red-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium">YouTube</p>
                      <p className="text-sm text-muted-foreground">Car Kahani Official</p>
                    </div>
                  </Link>
                </div>
                <div className="flex gap-4 mt-4">
                  <Link
                    href="https://facebook.com/CarKahani"
                    className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted transition-colors group"
                  >
                    <Facebook className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium">Facebook</p>
                      <p className="text-sm text-muted-foreground">Car Kahani</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">How can I submit my car for review?</h4>
                  <p className="text-sm text-muted-foreground">
                    Send us an email with your car details and high-quality photos. We'll get back to you within 48
                    hours.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Do you accept guest articles?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! We welcome automotive enthusiasts to contribute. Please include writing samples with your
                    pitch.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">How can I advertise with Car Kahani?</h4>
                  <p className="text-sm text-muted-foreground">
                    Contact our business development team at hello@carkahani.com for advertising opportunities and
                    partnerships.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Be part of the growing Car Kahani family of automotive enthusiasts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">50K+</h3>
              <p className="text-muted-foreground">Community Members</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Instagram className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">25K+</h3>
              <p className="text-muted-foreground">Instagram Followers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Youtube className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">100K+</h3>
              <p className="text-muted-foreground">YouTube Subscribers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">1K+</h3>
              <p className="text-muted-foreground">Monthly Inquiries</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
