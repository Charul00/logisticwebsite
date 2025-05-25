import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Ship, Plane, Truck, Package, BarChart3, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageTransition from "@/components/page-transition"

export default function ServicesPage() {
  const services = [
    {
      id: "air-freight",
      icon: <Plane className="h-12 w-12 text-primary" />,
      title: "Air Freight",
      description:
        "Our air freight services offer speed and reliability for time-sensitive shipments. We work with leading airlines to ensure your cargo reaches its destination on schedule.",
      features: [
        "Express air freight for urgent deliveries",
        "Consolidated air freight for cost efficiency",
        "Charter services for oversized or special cargo",
        "Door-to-door delivery options",
        "Customs clearance assistance",
      ],
      image: "/images/Airtrial.png",
    },
    {
      id: "sea-freight",
      icon: <Ship className="h-12 w-12 text-primary" />,
      title: "Sea Freight",
      description:
        "Our sea freight solutions are ideal for large volume shipments where cost-effectiveness is a priority. We offer both FCL (Full Container Load) and LCL (Less than Container Load) options.",
      features: [
        "FCL shipping for exclusive use of containers",
        "LCL shipping for smaller shipments",
        "Special equipment for oversized cargo",
        "Refrigerated containers for temperature-sensitive goods",
        "Port-to-port and door-to-door services",
      ],
      image: "/images/SeaTrial.png",
    },
    {
      id: "road-transport",
      icon: <Truck className="h-12 w-12 text-primary" />,
      title: "Road Transport",
      description:
        "Our road transportation network covers local, regional, and cross-border deliveries. We maintain a modern fleet of vehicles to handle various types of cargo.",
      features: [
        "FTL (Full Truck Load) services",
        "LTL (Less than Truck Load) options",
        "Temperature-controlled transportation",
        "Specialized vehicles for oversized cargo",
        "Express delivery services",
      ],
      image: "/images/road-transport-new-removebg-preview.png",
    },
    {
      id: "warehousing",
      icon: <Package className="h-12 w-12 text-primary" />,
      title: "Warehousing",
      description:
        "Our warehousing services provide secure storage and efficient distribution for your goods. Our facilities are strategically located to optimize your supply chain.",
      features: [
        "Short and long-term storage solutions",
        "Inventory management systems",
        "Pick and pack services",
        "Cross-docking capabilities",
        "Value-added services (labeling, kitting, etc.)",
      ],
      image: "/images/warehousing-new-removebg-preview.png",
    },
    {
      id: "supply-chain",
      icon: <BarChart3 className="h-12 w-12 text-primary" />,
      title: "Supply Chain Solutions",
      description:
        "Our comprehensive supply chain solutions help optimize your entire logistics process from sourcing to final delivery, improving efficiency and reducing costs.",
      features: [
        "Supply chain consulting and design",
        "Demand planning and forecasting",
        "Inventory optimization",
        "Logistics network analysis",
        "Performance metrics and reporting",
      ],
      image: "/images/supply-chain-new-removebg-preview.png",
    },
    {
      id: "cargo-insurance",
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Cargo Insurance",
      description:
        "Protect your valuable shipments with our comprehensive cargo insurance options, providing peace of mind throughout the transportation process.",
      features: [
        "All-risk coverage options",
        "Named perils coverage",
        "Door-to-door protection",
        "Quick and efficient claims process",
        "Customized insurance solutions",
      ],
      image: "/images/cargo-insurance.png",
    },
  ]

  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-6 slide-up">Our Services</h1>
              <p className="text-xl text-muted-foreground mb-8 slide-up stagger-1">
                Comprehensive logistics solutions tailored to meet your business needs. From air and sea freight to
                warehousing and supply chain management.
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div key={service.id} id={service.id} className="scroll-mt-20">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
                  >
                    <div className={`${index % 2 === 1 ? "lg:col-start-2 slide-in-left" : "slide-in-right"}`}>
                      <div className="mb-4">{service.icon}</div>
                      <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                      <p className="text-muted-foreground mb-6">{service.description}</p>
                      <ul className="space-y-2 mb-8">
                        {service.features.map((feature, i) => (
                          <li
                            key={i}
                            className={`flex items-start slide-up`}
                            style={{ animationDelay: `${0.1 * (i + 1)}s` }}
                          >
                            <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="group">
                        <Link href="/contact">
                          Request a Quote
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                    <div
                      className={`relative h-[400px] rounded-lg overflow-hidden ${index % 2 === 1 ? "lg:col-start-1 slide-in-right" : "slide-in-left"}`}
                    >
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-100 dark:from-primary/20 dark:to-blue-900/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 zoom-in">Need a Customized Logistics Solution?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 zoom-in stagger-1">
              Our team of experts is ready to develop a tailored logistics plan that meets your specific requirements.
            </p>
            <Button asChild size="lg" className="zoom-in stagger-2 group">
              <Link href="/contact">
                Contact Our Team
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
