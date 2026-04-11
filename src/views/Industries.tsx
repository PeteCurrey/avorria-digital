'use client';
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Building2, ShoppingBag, Wrench, MapPin, Monitor } from "lucide-react";
import { industries } from "@/data/industries";
import { services } from "@/data/services";

const Industries = () => {
  // Filter to unique industries (remove duplicates by slug)
  const uniqueIndustries = industries.filter((industry, index, self) =>
    index === self.findIndex((i) => i.slug === industry.slug)
  );

  const industryIcons: Record<string, React.ReactNode> = {
    "trades-home-services": <Wrench className="h-8 w-8" />,
    "trades": <Wrench className="h-8 w-8" />,
    "professional-services": <Building2 className="h-8 w-8" />,
    "b2b-saas": <Monitor className="h-8 w-8" />,
    "saas-tech": <Monitor className="h-8 w-8" />,
    "ecommerce-brands": <ShoppingBag className="h-8 w-8" />,
    "ecommerce": <ShoppingBag className="h-8 w-8" />,
    "multi-location-brands": <MapPin className="h-8 w-8" />,
    "multi-location": <MapPin className="h-8 w-8" />,
  };

// ------------------------------ Service-Industry Landing Pages ------------------------------
  const servicesWithIndustryPages = [
    { slug: "seo", name: "SEO", prefix: "/seo" },
    { slug: "web-design", name: "Web Design", prefix: "/web-design" },
    { slug: "paid-media", name: "Paid Media", prefix: "/paid-media" },
    { slug: "digital-marketing", name: "Digital Marketing", prefix: "/digital-marketing" },
  ];

  return (
    <>
      <SEOHead
        title="Industry-Specific Marketing Solutions"
        description="Tailored digital marketing, SEO, web design and paid media for trades, professional services, SaaS, e-commerce and multi-location businesses."
        canonical="/industries"
        keywords={["industry marketing", "trades marketing", "SaaS marketing", "B2B marketing", "e-commerce marketing"]}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "Industries", url: "https://avorria.com/industries" }
      ]} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center -mt-20 pt-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                Industry Expertise
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6 text-foreground">
                Marketing solutions built for your industry
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Every industry has unique challenges. We've developed specialized strategies 
                that address the specific pain points and opportunities in your sector.
              </p>
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact">
                  Discuss Your Industry
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light mb-4 text-foreground">Industries we serve</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Click on any industry to explore our specialized services and see how we can help your business grow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {uniqueIndustries.map((industry) => (
                <Card key={industry.id} className="border-border hover:shadow-lg transition-all group">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-3 rounded-lg bg-accent/10 text-accent">
                        {industryIcons[industry.slug] || <Target className="h-8 w-8" />}
                      </div>
                      <CardTitle className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {industry.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Common challenges:</p>
                      <ul className="space-y-1">
                        {industry.painPoints.slice(0, 3).map((point, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-accent mr-2 mt-0.5"> · </span>
                            <span className="line-clamp-1">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Typical deal size:</p>
                      <p className="text-sm font-medium text-foreground">{industry.typicalDealSize}</p>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-3">Our services for {industry.name}:</p>
                      <div className="flex flex-wrap gap-2">
                        {servicesWithIndustryPages.map((service) => (
                          <Link
                            key={service.slug}
                            href={`${service.prefix}/for/${industry.slug}`}
                            className="inline-flex items-center text-xs px-3 py-1.5 bg-secondary text-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            {service.name}
                            <ArrowRight className="ml-1" size={12} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services by Industry Matrix */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light mb-4 text-foreground">
                Find your service by industry
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quick links to all our industry-specific service pages.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-foreground font-semibold">Industry</th>
                    {servicesWithIndustryPages.map((service) => (
                      <th key={service.slug} className="text-center p-4 text-foreground font-semibold">
                        {service.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {uniqueIndustries.map((industry) => (
                    <tr key={industry.id} className="border-b border-border hover:bg-background/50">
                      <td className="p-4 text-foreground font-medium">{industry.name}</td>
                      {servicesWithIndustryPages.map((service) => (
                        <td key={service.slug} className="text-center p-4">
                          <Link
                            href={`${service.prefix}/for/${industry.slug}`}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <ArrowRight size={16} />
                          </Link>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-light mb-6 text-foreground">
              Don't see your industry?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We work with businesses across all sectors. Let's discuss your specific needs 
              and create a customized strategy for your market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact">
                  Book a Strategy Call
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Industries;


