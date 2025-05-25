"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import PageTransition from "@/components/page-transition"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryImages = [
    {
      src: "/images/flight-computer-graphic-airplane-wireless-cap.jpg",
      alt: "Air freight operations",
      category: "Air Freight",
      description: "Our air freight services offer speed and reliability for time-sensitive shipments. We work with leading airlines to ensure your cargo reaches its destination on schedule with express delivery options for urgent packages and consolidated services for cost efficiency."
    },
    {
      src: "/images/aerial-view-cargo-ship-cargo-container-harbor.jpg",
      alt: "Sea freight container ship",
      category: "Sea Freight",
      description: "Our sea freight solutions are ideal for large volume shipments where cost-effectiveness is a priority. We offer both FCL (Full Container Load) and LCL (Less than Container Load) options, supported by an extensive global network of shipping partners."
    },
    {
      src: "/images/pexels-shuaizhi-tian-485596-20882743.jpg",
      alt: "Truck fleet",
      category: "Road Transport",
      description: "Our road transportation network covers local, regional, and cross-border deliveries. We maintain a modern fleet of vehicles to handle various types of cargo with FTL, LTL, and specialized vehicle options for oversized or temperature-sensitive goods."
    },
    {
      src: "/images/medium-shot-man-warehouse.jpg",
      alt: "Warehouse operations",
      category: "Warehousing",
      description: "Our warehousing facilities provide secure storage and efficient distribution for your goods. Strategically located to optimize your supply chain, we offer inventory management systems, pick and pack services, and value-added solutions."
    },
    {
      src: "/images/AdobeStock_627373679_Preview.jpeg",
      alt: "Supply chain management",
      category: "Supply Chain",
      description: "Our supply chain solutions help optimize your entire logistics process from sourcing to final delivery. We provide consulting services, demand planning, inventory optimization, network analysis, and performance metrics to improve efficiency."
    },
    {
      src: "/images/AdobeStock_947565193_Preview.jpeg",
      alt: "Logistics team meeting",
      category: "Team",
      description: "Our experienced team of logistics professionals works collaboratively to design and implement customized solutions for your business. We combine industry expertise with innovative thinking to overcome complex logistics challenges."
    },
    {
      src: "/images/full-shot-man-carrying-box.jpg",
      alt: "Cargo loading",
      category: "Operations",
      description: "Our operational teams ensure smooth handling of your cargo at every stage. From careful loading and secure packaging to prompt delivery, we maintain the highest standards of care and efficiency throughout the logistics process."
    },
    {
      src: "/images/technological-futuristic-holograms-logistics-means-transport.jpg",
      alt: "Global logistics network",
      category: "Network",
      description: "Our extensive global logistics network connects businesses across continents. With partners in key markets worldwide, we provide seamless international transportation and local expertise for efficient and reliable service delivery."
    },
    {
      src: "/images/contract-male-sunny-sand-career.jpg",
      alt: "Customer service team",
      category: "Customer Service",
      description: "Our dedicated customer service representatives are available to assist with all your logistics needs. We provide personalized support, regular updates on shipment status, and prompt resolution of any issues that may arise."
    },
    {
      src: "/images/military-it-professional-gathers-intelligence-from-world-map-projection.jpg",
      alt: "Technology and tracking systems",
      category: "Technology",
      description: "We leverage advanced technology for real-time tracking, route optimization, and inventory management. Our digital solutions enhance visibility across the supply chain, allowing for better decision-making and improved service delivery."
    },
    {
      src: "/images/AdobeStock_1166360659_Preview.jpeg",
      alt: "Sustainable logistics practices",
      category: "Sustainability",
      description: "We are committed to sustainable logistics practices that minimize environmental impact. From carbon footprint reduction to eco-friendly packaging options, we integrate sustainability into all aspects of our operations."
    },
    {
      src: "/images/aS5qcGc.webp",
      alt: "International shipping",
      category: "Global Shipping",
      description: "Our global shipping services connect businesses to markets worldwide. We handle all customs documentation, compliance requirements, and international regulations to ensure smooth cross-border movement of your goods."
    },
  ]

  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-6 slide-up">Gallery</h1>
              <p className="text-xl text-muted-foreground mb-8 slide-up stagger-1">
                Explore our logistics operations through our gallery of images showcasing our services, facilities, and
                team.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="text-white p-4 w-full">
                        <div className="text-sm font-medium text-primary mb-1">{image.category}</div>
                        <div className="text-lg font-bold">{image.alt}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative max-w-5xl max-h-[85vh] w-full bg-black rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-[65vh] w-full">
                  <Image
                    src={galleryImages[selectedImage].src || "/placeholder.svg"}
                    alt={galleryImages[selectedImage].alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-6">
                  <div className="text-sm font-medium text-primary mb-1">{galleryImages[selectedImage].category}</div>
                  <div className="text-xl font-bold mb-3">{galleryImages[selectedImage].alt}</div>
                  <p className="text-sm text-gray-200 leading-relaxed">{galleryImages[selectedImage].description}</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute left-4 top-1/2 transform -translate-y-1/2 flex space-x-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev! - 1))
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="sr-only">Previous</span>
                </button>
              </motion.div>

              <motion.div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev! + 1))
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="sr-only">Next</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
