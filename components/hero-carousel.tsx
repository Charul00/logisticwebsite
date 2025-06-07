"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const heroImages = [
  {
    src: "/images/aerial-view-cargo-ship-cargo-container-harbor.jpg",
    alt: "Cargo ships at harbor",
  },
  {
    src: "/images/technological-futuristic-holograms-logistics-means-transport.jpg",
    alt: "Futuristic logistics technology",
  },
  {
    src: "/images/pexels-shuaizhi-tian-485596-20882743.jpg",
    alt: "Logistics operations",
  },
  {
    src: "/images/home-2.jpg",
    alt: "Modern logistics",
  },
  {
    src: "/images/home-page.jpg",
    alt: "Logistics background",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isPlaying])

  const pauseAutoplay = () => setIsPlaying(false)
  const resumeAutoplay = () => setIsPlaying(true)

  return (
    <div 
      className="hero-carousel"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div className="carousel-track">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentSlide 
                ? "active" 
                : index === (currentSlide + 1) % heroImages.length 
                ? "next" 
                : index === (currentSlide - 1 + heroImages.length) % heroImages.length 
                ? "prev" 
                : ""
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>


    </div>
  )
}
