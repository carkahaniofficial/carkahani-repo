"use client"

import Image from "next/image"
import { useState } from "react"
import { ImageIcon, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  loading?: "lazy" | "eager"
  onClick?: () => void
  aspectRatio?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  sizes,
  priority = false,
  loading = "lazy",
  onClick,
  aspectRatio,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const getImageSrc = () => {
    if (hasError) return "/placeholder.jpg"
    if (!src || src.trim() === "") return "/placeholder.jpg"
    return src
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatio && `aspect-[${aspectRatio}]`,
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {/* Loading State */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
          <AlertCircle className="h-8 w-8 mb-2" />
          <span className="text-sm">Image not available</span>
        </div>
      )}

      {/* Actual Image */}
      <Image
        src={getImageSrc() || "/placeholder.jpg"}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-all duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          onClick && "hover:scale-105",
          fill ? "object-cover" : "",
        )}
        {...props}
      />
    </div>
  )
}
