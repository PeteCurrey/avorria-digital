'use client';
import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, TrendingUp, Target, MapPin } from "lucide-react";
import { LandingPage } from "@/types/landingPage";
import LandingPageForm from "./LandingPageForm";
import { getCityImage } from "@/data/cityImages";
import { locations } from "@/data/locations";
import { services } from "@/data/services";
import { Location, Service } from "@/types/landingPage";

// Helper to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get service URL prefix based on service slug
const getServiceUrlPrefix = (serviceSlug: string): string => {
  const prefixMap: Record<string, string> = {
    seo: "/seo-agency",
    "web-design": "/web-design",
    "paid-media": "/paid-media-agency",
    "digital-marketing": "/digital-marketing-agency",
    "content-email": "/content-email-agency",
  };
  return prefixMap[serviceSlug] || `/${serviceSlug}`;
};

// Nearby Locations Section Component
const NearbyLocationsSection = ({
  currentLocation,
  service,
}: {
  currentLocation: Location;
  service: Service;
}) => {
  const nearbyLocations = useMemo(() => {
    if (!currentLocation.coords) return [];
    
    // Filter locations in the same country and calculate distances
    const sameCountryLocations = locations
      .filter((loc) => 
        loc.countryCode === currentLocation.countryCode && 
        loc.slug !== currentLocation.slug &&
        loc.slug !== "uk" && // Exclude generic entries
        loc.coords
      )
      .map((loc) => ({
        ...loc,
        distance: calculateDistance(
          currentLocation.coords!.lat,
          currentLocation.coords!.lng,
          loc.coords!.lat,
          loc.coords!.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 6);

    return sameCountryLocations;
  }, [currentLocation]);

  if (nearbyLocations.length === 0) return null;

  const serviceUrlPrefix = getServiceUrlPrefix(service.slug);

  return (
    <section className="py-16 px-6 bg-background border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <MapPin className="h-5 w-5 text-accent" />
          <h2 className="text-2xl font-light text-foreground">
            {service.name} in nearby locations
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {nearbyLocations.map((loc) => (
            <Link
              key={loc.slug}
              to={`${serviceUrlPrefix}/${loc.slug}`}
              className="group p-4 bg-secondary rounded-lg hover:bg-accent/10 transition-colors text-center"
            >
              <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                {loc.city}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(loc.distance)} km away
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/locations"
            className="text-accent hover:text-accent/80 text-sm font-medium inline-flex items-center"
          >
            View all locations
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Related Services Section Component
const RelatedServicesSection = ({
  currentService,
  location,
}: {
  currentService: Service;
  location: Location;
}) => {
  const otherServices = services.filter((s) => s.slug !== currentService.slug);

  return (
    <section className="py-16 px-6 bg-secondary border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-light text-foreground mb-8">
          Other services in {location.city}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherServices.map((s) => {
            const urlPrefix = getServiceUrlPrefix(s.slug);
            return (
              <Link
                key={s.slug}
                to={`${urlPrefix}/${location.slug}`}
                className="group p-6 bg-background rounded-lg border border-border hover:border-accent transition-colors"
              >
                <p className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                  {s.name}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {s.shortDescription}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/industries"
            className="text-accent hover:text-accent/80 text-sm font-medium inline-flex items-center"
          >
            Browse by industry
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

interface LandingPageTemplateProps {
  page: LandingPage;
}

const LandingPageTemplate = ({ page }: LandingPageTemplateProps) => {
  const {
    heroHeadline,
    heroSubheadline,
    primaryCTA,
    secondaryCTA,
    problemBullets,
    solutionBullets,
    keyMetrics,
    testimonialSnippet,
    processSteps,
    workingWithYou,
    pricingSnapshot,
    faqList,
    metaTitle,
    metaDescription,
    heroImage,
    service,
    industry,
    location,
  } = page;

  // Track page view
  useEffect(() => {
    // Hook for analytics tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_title: metaTitle,
        page_path: window.pathname,
      });
    }
  }, [metaTitle]);

  const contextLine = (() => {
    if (industry && location) {
      return `For ${industry.name} in ${location.city}`;
    }
    if (industry) {
      return `For ${industry.name}`;
    }
    if (location) {
      return `In ${location.city}, ${location.country}`;
    }
    return null;
  })();

  // Generate structured data for SEO
  const generateFAQSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqList.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  };

  const generateServiceSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.name}${location ? ` in ${location.city}` : ""}${
        industry ? ` for ${industry.name}` : ""
      }`,
      provider: {
        "@type": "Organization",
        name: "Avorria",
      },
      areaServed: location
        ? {
            "@type": "City",
            name: location.city,
          }
        : undefined,
      description: metaDescription,
    };
  };

  const generateBreadcrumbSchema = () => {
    const items = [
      { name: "Home", url: "https://avorria.com" },
      { name: "Services", url: "https://avorria.com/services" },
    ];

    if (service) {
      items.push({ name: service.name, url: `https://avorria.com${service.pillarPageUrl}` });
    }

    items.push({ name: metaTitle, url: `https://avorria.com${window.pathname}` });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  };

  return (
    <>
      
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://avorria.com${window.pathname}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`https://avorria.com${window.pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://avorria.com/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://avorria.com/og-image.jpg" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(generateFAQSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(generateServiceSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(generateBreadcrumbSchema())}</script>
      

      <div className="min-h-screen">
        {/* Hero Section with City/Industry Background */}
        <section 
          className="relative min-h-[85vh] flex items-center -mt-20 pt-20 overflow-hidden"
          style={{
            backgroundImage: heroImage 
              ? `url(${heroImage})`
              : location?.slug && getCityImage(location.slug) 
                ? `url(${getCityImage(location.slug)})`
                : 'linear-gradient(to bottom, hsl(var(--background)), hsl(var(--secondary)))',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[hsl(220,25%,8%)]" />
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="space-y-6 md:space-y-8 animate-fade-in">
                {contextLine && (
                  <p className="text-sm font-semibold text-accent uppercase tracking-widest">
                    {contextLine}
                  </p>
                )}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-white/90">
                  {heroHeadline}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/85 max-w-3xl">{heroSubheadline}</p>
                
                {/* CTA Box - matching Home page styling */}
                <div className="inline-block p-6 md:p-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="accent"
                      size="lg"
                      asChild
                      className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
                      onClick={() => {
                        // Track CTA click
                        if (typeof window !== "undefined" && (window as any).gtag) {
                          (window as any).gtag("event", "cta_click", {
                            cta_text: primaryCTA,
                            cta_location: "hero",
                          });
                        }
                      }}
                    >
                      <Link href="/contact">
                        {primaryCTA}
                        <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      asChild
                      className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
                    >
                      <Link href="/contact">{secondaryCTA}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-card border border-border rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">
                    Performance Dashboard
                  </span>
                  <Target className="text-accent" size={20} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {keyMetrics.slice(0, 4).map((metric, index) => (
                    <div key={index}>
                      <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                      <p className="text-3xl font-semibold text-foreground">{metric.value}</p>
                      <p className="text-xs text-accent flex items-center mt-1">
                        <TrendingUp size={14} className="mr-1" /> Real result
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-light mb-10 text-foreground text-center">
              Tired of {service.name.toLowerCase()} that doesn't move the needle?
            </h2>
            <Card className="border-border">
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {problemBullets.map((problem, index) => (
                    <li key={index} className="flex items-start text-muted-foreground">
                      <span className="text-accent mr-3 mt-1 font-bold">✗</span>
                      <span className="text-lg">{problem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <p className="text-center text-lg text-foreground mt-8 font-medium">
              We focus on metrics that actually matter to your business.
            </p>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl font-light mb-4 text-foreground text-center">
              How Avorria approaches {service.name.toLowerCase()}
              {industry ? ` for ${industry.name.toLowerCase()}` : ""}
              {location ? ` in ${location.city}` : ""}
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {service.longDescription}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {solutionBullets.map((solution, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                  <p className="text-foreground text-lg">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Metrics Section */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4 text-foreground">Real results, real impact</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These aren't theoretical—they're actual outcomes from clients like you.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {keyMetrics.map((metric, index) => (
                <Card key={index} className="border-border hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 space-y-4 text-center">
                    <div className="text-5xl font-light text-accent mb-4">{metric.value}</div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      {metric.label}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        {processSteps && processSteps.length > 0 && (
          <section className="py-24 px-6 bg-secondary">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light mb-4 text-foreground">How we work</h2>
              </div>
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                        <div className="md:w-20 mb-4 md:mb-0">
                          <span className="inline-block w-12 h-12 rounded-full bg-accent/10 text-accent font-semibold flex items-center justify-center text-lg">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonial */}
        {testimonialSnippet && (
          <section className="py-24 px-6 bg-background">
            <div className="container mx-auto max-w-4xl">
              <Card className="border-border">
                <CardContent className="p-10">
                  <p className="text-xl text-foreground leading-relaxed italic mb-6">
                    "{testimonialSnippet.quote}"
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-foreground">{testimonialSnippet.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonialSnippet.role}, {testimonialSnippet.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Working With You Section */}
        {workingWithYou && (
          <section className="py-24 px-6 bg-secondary">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-4xl font-light mb-8 text-foreground text-center">
                Working with {industry ? industry.name.toLowerCase() : "you"}
                {location ? ` in ${location.city}` : ""}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">{workingWithYou}</p>
              </div>
            </div>
          </section>
        )}

        {/* Pricing Snapshot */}
        {pricingSnapshot && (
          <section className="py-24 px-6 bg-background">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-4xl font-light mb-10 text-foreground text-center">
                Investment & engagement
              </h2>
              <Card className="border-border">
                <CardContent className="p-10">
                  <p className="text-lg text-muted-foreground leading-relaxed">{pricingSnapshot}</p>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Link
                      to="/pricing"
                      className="inline-flex items-center text-accent hover:text-accent/80 font-medium"
                    >
                      View full pricing & packages
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-4 text-foreground">
                Questions answered
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqList.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border bg-background px-6 rounded-lg"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* High-Intent Conversion Form */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-light mb-6 text-foreground">
                Tell us about your{" "}
                {industry ? industry.name.toLowerCase() : "business"}
                {location ? ` in ${location.city}` : ""} and we'll show you what's realistically
                achievable
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Book a free strategy call or request a custom proposal. We respond within 24 hours.
              </p>
            </div>
            <LandingPageForm
              serviceName={service.name}
              industryName={industry?.name}
              locationName={location?.city}
            />
          </div>
        </section>

        {/* Nearby Locations Section */}
        {location && (
          <NearbyLocationsSection 
            currentLocation={location} 
            service={service} 
          />
        )}

        {/* Related Services Section */}
        {location && (
          <RelatedServicesSection 
            currentService={service} 
            location={location} 
          />
        )}

        {/* Internal Links Footer */}
        <section className="py-16 px-6 bg-secondary border-t border-border">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <Link
                  to={service.pillarPageUrl}
                  className="text-accent hover:text-accent/80 font-medium text-lg block"
                >
                  All {service.name} Services →
                </Link>
              </div>
              <div>
                <Link
                  to="/free-seo-website-audit"
                  className="text-accent hover:text-accent/80 font-medium text-lg block"
                >
                  Free SEO & Website Audit →
                </Link>
              </div>
              <div>
                <Link
                  to="/project-estimator"
                  className="text-accent hover:text-accent/80 font-medium text-lg block"
                >
                  Project Estimator →
                </Link>
                <p className="text-xs text-muted-foreground mt-1">Not sure scope or budget?</p>
              </div>
              <div>
                <Link
                  to="/case-studies"
                  className="text-accent hover:text-accent/80 font-medium text-lg block"
                >
                  View Case Studies →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPageTemplate;

