import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, TrendingUp } from "lucide-react";

const LocalSEO = () => {
  return (
    <>
      <SEOHead
        title="Local SEO Services – Get the Phone Ringing"
        description="Local SEO that actually gets the phone ringing. Show up in local results with optimised profiles and landing pages that convert."
        canonical="/services/seo/local"
        keywords={["local SEO", "Google Business Profile", "local search", "near me SEO", "local landing pages", "map pack"]}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "SEO Services", url: "https://avorria.com/services/seo" },
        { name: "Local SEO", url: "https://avorria.com/services/seo/local" }
      ]} />
      <ServiceSchema
        name="Local SEO Services"
        description="Local SEO that gets the phone ringing. Google Business Profile optimisation, local landing pages and review strategy for multi-location brands."
        url="/services/seo/local"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 33 }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-foreground">
              Local SEO that actually gets the phone ringing.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We help your locations show up where it matters – in the local results your customers actually click, with landing pages and profiles that convert, not just exist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default">Book a local SEO call</Button>
              <Button size="lg" variant="outline">Request a local SEO audit</Button>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light mb-8 text-center text-foreground">Sound familiar?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Show up for "[service] near me" but get low-quality or no leads.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Google Business Profiles are inconsistent, half-filled or unmanaged.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Location pages are thin, duplicated or non-existent.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light mb-12 text-center text-foreground">What we do</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <MapPin className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Strategic local mapping</h3>
                  <p className="text-muted-foreground">Proper local keyword mapping and location strategy that targets where your customers actually search.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <Phone className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Profile optimisation</h3>
                  <p className="text-muted-foreground">Google Business Profile optimisation and review strategy that builds trust and drives action.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <TrendingUp className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Unique location pages</h3>
                  <p className="text-muted-foreground">Built-out, unique local landing pages with clear CTAs and proof – not thin duplicate content.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <TrendingUp className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Local tracking</h3>
                  <p className="text-muted-foreground">Track calls, forms and direction clicks so you know which locations and tactics actually drive revenue.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Case Snippet */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl font-light text-foreground mb-4">
              "Multi-location service brand → +74% local enquiries in 6 months after rebuilding location pages and profiles."
            </blockquote>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6 text-foreground">Ready to get local SEO right?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default">Book a local SEO call</Button>
              <Button size="lg" variant="outline">Request a local SEO audit</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LocalSEO;
