import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Globe, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageTransition from "@/components/page-transition"

export default function AboutPage() {
  const stats = [
    { icon: <Globe className="h-8 w-8 text-primary" />, value: "50+", label: "Countries Served" },
    { icon: <Users className="h-8 w-8 text-primary" />, value: "500+", label: "Satisfied Clients" },
    { icon: <Award className="h-8 w-8 text-primary" />, value: "15+", label: "Years Experience" },
    { icon: <Clock className="h-8 w-8 text-primary" />, value: "24/7", label: "Customer Support" },
  ]

  const team = [
    {
      name: "John Smith",
      position: "CEO & Founder",
      image: "/images/team-member-1.png",
      bio: "With over 20 years of experience in the logistics industry, John has led Shegar Logistics to become a trusted name in global transportation.",
    },
    {
      name: "Sarah Johnson",
      position: "Operations Director",
      image: "/images/team-member-2.png",
      bio: "Sarah oversees all operational aspects of our business, ensuring efficient and reliable service delivery to our clients worldwide.",
    },
    {
      name: "Michael Chen",
      position: "Global Freight Manager",
      image: "/images/team-member-3.png",
      bio: "Michael specializes in optimizing freight routes and negotiating with carriers to provide cost-effective solutions for our clients.",
    },
    {
      name: "Priya Patel",
      position: "Customer Relations Head",
      image: "/images/team-member-4.png",
      bio: "Priya leads our customer service team, focusing on building strong relationships and ensuring client satisfaction at every step.",
    },
  ]

  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-6 slide-up">About Shegar Logistics</h1>
              <p className="text-xl text-muted-foreground mb-8 slide-up stagger-1">
                A trusted partner in global logistics with a commitment to excellence, reliability, and customer
                satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="slide-in-right">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2008, Shegar Logistics began as a small freight forwarding company with a vision to
                  simplify global trade through efficient logistics solutions.
                </p>
                <p className="text-muted-foreground mb-4">
                  Over the years, we have grown into a comprehensive logistics provider, expanding our services to
                  include air freight, sea freight, road transport, warehousing, and supply chain management.
                </p>
                <p className="text-muted-foreground mb-4">
                  Today, we serve clients across various industries, from e-commerce and retail to manufacturing and
                  healthcare, providing tailored logistics solutions that meet their specific needs.
                </p>
                <p className="text-muted-foreground">
                  Our commitment to innovation, reliability, and customer satisfaction has made us a trusted partner for
                  businesses looking to optimize their supply chain and expand their global reach.
                </p>
              </div>
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl slide-in-left">
                <Image
                  src="/images/logistics-operations.png"
                  alt="Shegar Logistics history"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center zoom-in`} style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 slide-up">Our Mission & Values</h2>
              <p className="text-muted-foreground slide-up stagger-1">
                At Shegar Logistics, we are guided by a clear mission and strong values that shape everything we do.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border slide-in-right">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground mb-6">
                  To provide innovative and reliable logistics solutions that enable our clients to focus on their core
                  business while we handle the complexities of global transportation and supply chain management.
                </p>
                <p className="text-muted-foreground">
                  We aim to be the preferred logistics partner for businesses worldwide, known for our commitment to
                  excellence, sustainability, and customer satisfaction.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border slide-in-left">
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <ul className="space-y-4">
                  {[
                    "Excellence in service delivery",
                    "Integrity in all our dealings",
                    "Innovation in logistics solutions",
                    "Reliability and accountability",
                    "Sustainability and environmental responsibility",
                    "Customer-centric approach",
                  ].map((value, index) => (
                    <li
                      key={index}
                      className={`flex items-start slide-up`}
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 slide-up">Our Leadership Team</h2>
              <p className="text-muted-foreground slide-up stagger-1">
                Meet the experienced professionals who lead Shegar Logistics with expertise and vision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] zoom-in`}
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="relative h-64">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.position}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-100 dark:from-primary/20 dark:to-blue-900/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 zoom-in">Ready to Partner with Shegar Logistics?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 zoom-in stagger-1">
              Join our growing list of satisfied clients and experience the difference of working with a dedicated
              logistics partner.
            </p>
            <Button asChild size="lg" className="zoom-in stagger-2 group">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
