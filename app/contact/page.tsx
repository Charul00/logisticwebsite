"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"
import PageTransition from "@/components/page-transition"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        service: "",
        message: "",
      })
    }, 1500)
  }

  const offices = [
    {
      city: "New York",
      address: "123 Logistics Way, New York, NY 10001, USA",
      phone: "+1 (212) 555-7890",
      email: "newyork@shegarlogistics.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
    },
    {
      city: "London",
      address: "456 Shipping Street, London, EC1A 1BB, UK",
      phone: "+44 20 7946 0958",
      email: "london@shegarlogistics.com",
      hours: "Mon-Fri: 9:00 AM - 5:30 PM",
    },
    {
      city: "Singapore",
      address: "789 Harbor Road, Singapore, 049316",
      phone: "+65 6123 4567",
      email: "singapore@shegarlogistics.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
    },
  ]

  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Get in touch with our team for inquiries, quotes, or to discuss how we can help with your logistics
                needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                {isSubmitted ? (
                  <div className="bg-primary/10 rounded-lg p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your message has been sent successfully. Our team will get back to you shortly.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formState.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Enter subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service of Interest</Label>
                      <Select value={formState.service} onValueChange={(value) => handleSelectChange("service", value)}>
                        <SelectTrigger id="service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="air-freight">Air Freight</SelectItem>
                          <SelectItem value="sea-freight">Sea Freight</SelectItem>
                          <SelectItem value="road-transport">Road Transport</SelectItem>
                          <SelectItem value="warehousing">Warehousing</SelectItem>
                          <SelectItem value="supply-chain">Supply Chain Solutions</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Offices</h2>
                <div className="space-y-8">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-card rounded-lg p-6 shadow-sm border">
                      <h3 className="text-xl font-bold mb-4">{office.city} Office</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{office.address}</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{office.phone}</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{office.email}</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{office.hours}</span>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Find Us</h2>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=500&width=1200" alt="Map location" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg max-w-md text-center">
                  <h3 className="text-xl font-bold mb-2">Shegar Logistics Headquarters</h3>
                  <p className="mb-4">123 Logistics Way, Business District, City, Country</p>
                  <Button>Get Directions</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
