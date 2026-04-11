'use client';
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Globe } from "lucide-react";
import { locations, getLocationsByCountry } from "@/data/locations";

const Locations = () => {
  const countries = [
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
  ];

  const services = [
    { slug: "seo-agency", name: "SEO" },
    { slug: "digital-marketing-agency", name: "Digital Marketing" },
    { slug: "paid-media-agency", name: "Paid Media" },
    { slug: "web-design", name: "Web Design" },
  ];

  return (
    <>
      <SEOHead
        title="Service Locations | UK, USA, Australia & Canada"
        description="Avorria provides SEO, digital marketing, paid media and web design services across the UK, USA, Australia, New Zealand and Canada. Find expert marketing in your city."
        canonical="/locations"
        keywords={["digital marketing agency locations", "SEO agency UK", "SEO agency USA", "marketing agency near me"]}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "Locations", url: "https://avorria.com/locations" }
      ]} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center -mt-20 pt-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                Global Reach, Local Expertise
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6 text-foreground">
                Marketing services wherever you are
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                From London to Sydney, New York to Toronto—we deliver results-driven 
                digital marketing, SEO, paid media, and web design services across 5 countries 
                and 38+ cities.
              </p>
              <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <Globe className="h-5 w-5 text-accent" />
                <span>5 Countries</span>
                <span className="text-border">|</span>
                <MapPin className="h-5 w-5 text-accent" />
                <span>38+ Cities</span>
              </div>
            </div>
          </div>
        </section>

        {/* Locations by Country */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            {countries.map((country) => {
              const countryLocations = getLocationsByCountry(country.code).filter(
                (loc) => loc.slug !== "uk" // Filter out generic "UK" entry from city list
              );
              
              if (countryLocations.length === 0) return null;

              return (
                <div key={country.code} className="mb-16 last:mb-0">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-3xl">{country.flag}</span>
                    <h2 className="text-2xl font-light text-foreground">{country.name}</h2>
                    <span className="text-sm text-muted-foreground">
                      ({countryLocations.length} {countryLocations.length === 1 ? "city" : "cities"})
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {countryLocations.map((location) => (
                      <Card key={location.id} className="border-border hover:shadow-lg transition-all group">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-accent" />
                            {location.city}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">{location.region}</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">Services available:</p>
                          <div className="flex flex-wrap gap-2">
                            {services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/${service.slug}/${location.slug}`}
                                className="inline-flex items-center text-xs px-2.5 py-1 bg-secondary text-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Links Table */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light mb-4 text-foreground">
                Quick links by service
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Jump directly to any service in any location.
              </p>
            </div>

            {services.map((service) => (
              <div key={service.slug} className="mb-12 last:mb-0">
                <h3 className="text-xl font-semibold text-foreground mb-6 pb-2 border-b border-border">
                  {service.name}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {locations
                    .filter((loc) => loc.slug !== "uk")
                    .map((location) => (
                      <Link
                        key={`${service.slug}-${location.slug}`}
                        href={`/${service.slug}/${location.slug}`}
                        className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                      >
                        <ArrowRight className="h-3 w-3" />
                        {location.city}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-light mb-6 text-foreground">
              Don't see your city?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We work with clients globally, regardless of location. Our remote-first 
              approach means we can deliver the same exceptional results wherever you're based.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/industries">Browse by Industry</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Locations;


