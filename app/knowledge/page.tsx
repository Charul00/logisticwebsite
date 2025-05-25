import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User, Clock, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageTransition from "@/components/page-transition"

export default function KnowledgePage() {
  const blogPosts = [
    {
      title: "The Future of Sustainable Logistics",
      excerpt:
        "Explore how the logistics industry is adopting sustainable practices to reduce environmental impact while maintaining efficiency.",
      date: "June 15, 2023",
      author: "John Smith",
      readTime: "5 min read",
      image: "/placeholder.svg?height=600&width=800",
      slug: "future-of-sustainable-logistics",
    },
    {
      title: "Optimizing Your Supply Chain in a Global Economy",
      excerpt:
        "Learn strategies for optimizing your supply chain to navigate the challenges of global trade and maximize efficiency.",
      date: "May 22, 2023",
      author: "Sarah Johnson",
      readTime: "7 min read",
      image: "/placeholder.svg?height=600&width=800",
      slug: "optimizing-supply-chain-global-economy",
    },
    {
      title: "The Impact of Technology on Modern Logistics",
      excerpt:
        "Discover how emerging technologies like AI, IoT, and blockchain are transforming the logistics industry.",
      date: "April 10, 2023",
      author: "Michael Chen",
      readTime: "6 min read",
      image: "/placeholder.svg?height=600&width=800",
      slug: "impact-technology-modern-logistics",
    },
    {
      title: "Navigating Customs Regulations for International Shipping",
      excerpt:
        "A comprehensive guide to understanding and navigating customs regulations for smooth international shipping.",
      date: "March 5, 2023",
      author: "Priya Patel",
      readTime: "8 min read",
      image: "/placeholder.svg?height=600&width=800",
      slug: "navigating-customs-regulations",
    },
    {
      title: "Last-Mile Delivery: Challenges and Solutions",
      excerpt:
        "Explore the challenges of last-mile delivery and innovative solutions to improve efficiency and customer satisfaction.",
      date: "February 18, 2023",
      author: "John Smith",
      readTime: "5 min read",
      image: "/placeholder.svg?height=600&width=800",
      slug: "last-mile-delivery-challenges-solutions",
    },
    {
      title: "Risk Management in Global Logistics",
      excerpt:
        "Learn effective strategies for identifying, assessing, and mitigating risks in your global logistics operations.",
      date: "January 30, 2023",
      author: "Sarah Johnson",
      readTime: "6 min read",
      image: "/placeholder.svg?height=600&width=800",
      slug: "risk-management-global-logistics",
    },
  ]

  const resources = [
    {
      title: "Logistics Industry Report 2023",
      description:
        "A comprehensive analysis of trends, challenges, and opportunities in the global logistics industry.",
      icon: <FileText className="h-10 w-10 text-primary" />,
      link: "#",
    },
    {
      title: "Supply Chain Optimization Guide",
      description: "Practical strategies and best practices for optimizing your supply chain operations.",
      icon: <FileText className="h-10 w-10 text-primary" />,
      link: "#",
    },
    {
      title: "International Shipping Checklist",
      description: "A detailed checklist to ensure compliance with regulations for international shipping.",
      icon: <FileText className="h-10 w-10 text-primary" />,
      link: "#",
    },
    {
      title: "Logistics Cost Reduction Strategies",
      description: "Effective strategies for reducing logistics costs without compromising service quality.",
      icon: <FileText className="h-10 w-10 text-primary" />,
      link: "#",
    },
  ]

  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-6">Knowledge Center</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Explore our collection of articles, guides, and resources to help you navigate the complex world of
                logistics and supply chain management.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg overflow-hidden shadow-sm border transition-all duration-300 hover:shadow-md hover:border-primary/50"
                >
                  <div className="relative h-48">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-3">{post.date}</span>
                      <User className="h-4 w-4 mr-1" />
                      <span className="mr-3">{post.author}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Link
                      href={`/knowledge/${post.slug}`}
                      className="text-primary font-medium inline-flex items-center hover:underline"
                    >
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link href="/knowledge/all">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10">Resources & Downloads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-6 shadow-sm border flex items-start space-x-4 transition-all duration-300 hover:shadow-md hover:border-primary/50"
                >
                  <div className="flex-shrink-0">{resource.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <Link
                      href={resource.link}
                      className="text-primary font-medium inline-flex items-center hover:underline"
                    >
                      Download <Download className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-primary/10 rounded-lg p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-8">
                  Subscribe to our newsletter to receive the latest insights, articles, and resources on logistics and
                  supply chain management.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
