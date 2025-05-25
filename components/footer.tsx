"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-gSAleeJ5o1DEsV7kn33WbtYsuQAtlp.png"
                  alt="Shegar Logistics Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg">Shegar Logistics</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Providing reliable logistics solutions for businesses worldwide. We connect businesses with efficient
              transportation and supply chain management.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
                { icon: <Twitter size={18} />, label: "Twitter", href: "#" },
                { icon: <Instagram size={18} />, label: "Instagram", href: "#" },
                { icon: <Linkedin size={18} />, label: "LinkedIn", href: "#" },
              ].map((social, index) => (
                <motion.div key={social.label} whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "About Us", href: "/about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm group flex items-center"
                  >
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-1 h-1 bg-primary rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                { label: "Air Freight", href: "/services#air-freight" },
                { label: "Sea Freight", href: "/services#sea-freight" },
                { label: "Road Transport", href: "/services#road-transport" },
                { label: "Warehousing", href: "/services#warehousing" },
                { label: "Supply Chain Solutions", href: "/services#supply-chain" },
              ].map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm group flex items-center"
                  >
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-1 h-1 bg-primary rounded-full"></span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  123 Logistics Way, Business District, City, Country
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">info@shegarlogistics.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Shegar Logistics. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
