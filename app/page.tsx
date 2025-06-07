import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Ship, Plane, Truck, Package, BarChart3, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageTransition from "@/components/page-transition"
import HeroCarousel from "@/components/hero-carousel"

export default function Home() {
  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden">
          {/* Image Carousel */}
          <div className="absolute inset-0 z-0">
            <HeroCarousel />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-10"></div>
          <div className="relative z-10 h-full">
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pb-16 pt-40 fade-in">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 slide-up stagger-3 text-glass-effect">
                    <span className="inline-block gradient-text-primary animate-text-shimmer text-pop-up">Global Logistics Solutions</span>
                    <br />
                    <span className="inline-block gradient-text-secondary animate-text-glow text-scale-bounce stagger-5">for Your Business</span>
                  </h1>
                  <p className="text-xl mb-8 text-white/90 slide-up stagger-8">
                    Reliable, efficient, and cost-effective logistics services tailored to your needs.
                  </p>
                  <div className="flex flex-wrap gap-4 fade-in stagger-12">
                    <Button asChild size="lg" className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <Link href="/services" className="group">
                        Our Services
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse-slower"></div>
          {/* Animated floating particles */}
          <div className="absolute top-20 left-1/3 w-3 h-3 bg-white/30 rounded-full blur-sm animate-bounce-slow"></div>
          <div className="absolute top-40 right-1/3 w-2 h-2 bg-white/20 rounded-full blur-sm animate-bounce-slower"></div>
          <div className="absolute bottom-40 left-10 w-4 h-4 bg-primary/30 rounded-full blur-sm animate-bounce-medium"></div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 slide-up">Our Logistics Services</h2>
              <p className="text-muted-foreground slide-up stagger-1">
                We offer comprehensive logistics solutions to meet all your transportation and supply chain needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Plane className="h-10 w-10 text-primary" />,
                  title: "Air Freight",
                  description: "Fast and reliable air freight services for time-sensitive shipments worldwide.",
                  image: "/images/Airtrial.webp",
                },
                {
                  icon: <Ship className="h-10 w-10 text-primary" />,
                  title: "Sea Freight",
                  description: "Cost-effective sea freight solutions for large volume shipments across the globe.",
                  image: "/images/SeaTrial.jpg",
                },
                {
                  icon: <Truck className="h-10 w-10 text-primary" />,
                  title: "Road Transport",
                  description: "Efficient road transportation services for local and regional deliveries.",
                  image: "/images/road-transport-new-removebg-preview.jpg",
                },
                {
                  icon: <Package className="h-10 w-10 text-primary" />,
                  title: "Warehousing",
                  description: "Secure warehousing and distribution services to optimize your supply chain.",
                  image: "/images/warehousing-new-removebg-preview.jpg",
                },
                {
                  icon: <BarChart3 className="h-10 w-10 text-primary" />,
                  title: "Supply Chain Solutions",
                  description: "End-to-end supply chain management to improve efficiency and reduce costs.",
                  image: "/images/supply-chain-new-removebg-preview.webp",
                },
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Cargo Insurance",
                  description: "Comprehensive cargo insurance to protect your valuable shipments.",
                  image: "/images/cargo-insurance.png",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border transition-all duration-500 hover:shadow-md hover:border-primary/50 hover:translate-y-[-5px] slide-up stagger-${index + 1}`}
                >
                  <div className="relative h-48 w-full mb-6 rounded-md overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-contain transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link
                    href={`/services#${service.title.toLowerCase().replace(" ", "-")}`}
                    className="text-primary font-medium inline-flex items-center hover:underline group"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="slide-in-right">
                <h2 className="text-3xl font-bold mb-6">Why Choose Shegar Logistics?</h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Global Network",
                      description:
                        "Our extensive global network ensures your cargo reaches any destination efficiently.",
                    },
                    {
                      title: "Experienced Team",
                      description:
                        "Our team of logistics experts brings years of industry experience to every shipment.",
                    },
                    {
                      title: "Custom Solutions",
                      description: "We tailor our services to meet your specific logistics requirements.",
                    },
                    {
                      title: "Advanced Technology",
                      description:
                        "Real-time tracking and monitoring systems for complete visibility of your shipments.",
                    },
                    {
                      title: "24/7 Support",
                      description:
                        "Our customer service team is available around the clock to assist with any inquiries.",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex gap-4 slide-up stagger-${index + 1}`}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button asChild className="group">
                    <Link href="/about">
                      Learn More About Us
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[500px] rounded-lg overflow-hidden  slide-in-left">
                <Image
                  src="/images/19238-removebg-preview.png"
                  alt="Logistics operations"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-100 dark:from-primary/20 dark:to-blue-900/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 zoom-in">Ready to Optimize Your Logistics?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 zoom-in stagger-1">
              Contact us today to discuss how Shegar Logistics can help streamline your supply chain and reduce
              transportation costs.
            </p>
            <Button asChild size="lg" className="zoom-in stagger-2 group">
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
