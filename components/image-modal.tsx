"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageData {
  id: number
  src: string
  alt: string
  title: string
  category?: string
  photographer?: string
  likes?: number
  downloads?: number
}

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: ImageData[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export function ImageModal({ isOpen, onClose, images, currentIndex, onNavigate }: ImageModalProps) {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const currentImage = images[currentIndex]

  // Reset zoom and position when image changes
  useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [currentIndex])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1)
          }
          break
        case "ArrowRight":
          if (currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1)
          }
          break
        case "+":
        case "=":
          setZoom((prev) => Math.min(prev + 0.25, 3))
          break
        case "-":
          setZoom((prev) => Math.max(prev - 0.25, 0.5))
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage.src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `car-kahani-${currentImage.title.replace(/\s+/g, "-").toLowerCase()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(currentImage.src)
        const blob = await response.blob()
        const file = new File([blob], `${currentImage.title}.jpg`, { type: "image/jpeg" })

        await navigator.share({
          title: currentImage.title,
          text: `Check out this amazing car image from Car Kahani: ${currentImage.title}`,
          files: [file],
        })
      } catch (error) {
        console.error("Share failed:", error)
        // Fallback to copying link
        handleCopyLink()
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyLink()
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
      console.log("Link copied to clipboard")
    } catch (error) {
      console.error("Copy failed:", error)
    }
  }

  if (!isOpen || !currentImage) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentImage.category && (
              <Badge className="bg-primary text-primary-foreground">{currentImage.category}</Badge>
            )}
            <span className="text-white text-sm">
              {currentIndex + 1} of {images.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="text-white hover:bg-white/20"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-white text-sm min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="text-white hover:bg-white/20"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            {/* Action Buttons */}
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-white hover:bg-white/20"
              title="Download Image"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-white hover:bg-white/20"
              title="Share Image"
            >
              <Share2 className="h-4 w-4" />
            </Button>

            {/* Close Button */}
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <Button
          variant="ghost"
          size="lg"
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12 p-0"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}

      {currentIndex < images.length - 1 && (
        <Button
          variant="ghost"
          size="lg"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12 p-0"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}

      {/* Main Image Container */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4 pt-20 pb-20"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
        <div
          className={cn(
            "relative max-w-full max-h-full transition-transform duration-200",
            zoom > 1 ? "cursor-grab" : "cursor-zoom-in",
            isDragging ? "cursor-grabbing" : "",
          )}
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={(e) => {
            e.stopPropagation()
            if (zoom === 1) {
              handleZoomIn()
            }
          }}
        >
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.alt}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain select-none"
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-4">
        <div className="text-center">
          <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">{currentImage.title}</h3>
          <div className="flex items-center justify-center gap-4 text-white/80 text-sm">
            {currentImage.photographer && <span>by {currentImage.photographer}</span>}
            {currentImage.likes && (
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {currentImage.likes}
              </span>
            )}
            {currentImage.downloads && (
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                {currentImage.downloads}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Touch/Mobile Instructions */}
      <div className="absolute bottom-4 left-4 text-white/60 text-xs hidden sm:block">
        <p>Use arrow keys to navigate • +/- to zoom • ESC to close</p>
      </div>
    </div>
  )
}
