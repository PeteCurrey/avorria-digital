
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Zap, CheckCircle } from "lucide-react";

const TechnicalSEO = () => {
  return (
    <>
      <SEOHead
        title="Technical SEO Services – Fix What's Holding You Back"
        description="Technical SEO that stops your site fighting itself. We fix crawl, speed, structure and duplication issues that quietly tax every campaign you run."
        canonical="/services/seo/technical"
        keywords={["technical SEO", "site speed", "crawl optimisation", "Core Web Vitals", "SEO audit", "site structure"]}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "SEO Services", url: "https://avorria.com/services/seo" },
        { name: "Technical SEO", url: "https://avorria.com/services/seo/technical" }
      ]} />
      <ServiceSchema
        name="Technical SEO Services"
        description="Technical SEO audits and implementation. Crawl optimisation, Core Web Vitals, site structure and duplication fixes."
        url="/services/seo/technical"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 41 }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-foreground">
              Technical SEO that stops your site fighting itself.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We fix the crawl, speed, structure and duplication issues that quietly tax every campaign you run.
            </p>
            <Button size="lg" variant="default">Get a technical SEO audit</Button>
          </div>
        </section>

        {/* Problems */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light mb-8 text-center text-foreground">The silent killers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Slow site, crawling issues, endless "we'll fix that later".</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Huge sites with messy architecture and duplicate content.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Random 404s, redirect chains, indexing chaos.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light mb-12 text-center text-foreground">What's included</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <Settings className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Full technical audit</h3>
                  <p className="text-muted-foreground">Complete audit with prioritised fix list so you know what matters most.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <Zap className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Crawl & indexation</h3>
                  <p className="text-muted-foreground">Crawlability, indexation and sitemap hygiene – making sure search engines can actually see your site.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <CheckCircle className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Architecture clean-up</h3>
                  <p className="text-muted-foreground">Site architecture and URL structure clean-up to eliminate confusion and duplication.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <Zap className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Core Web Vitals</h3>
                  <p className="text-muted-foreground">Performance optimisation, Core Web Vitals and UX basics that impact rankings and conversions.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <Settings className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Implementation support</h3>
                  <p className="text-muted-foreground">Dev-ready tickets or full implementation – depending on your team setup.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light mb-12 text-center text-foreground">The process</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-light text-primary">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2 text-foreground">Audit</h3>
                <p className="text-muted-foreground">Complete technical review and prioritised fix list.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-light text-primary">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2 text-foreground">Fix</h3>
                <p className="text-muted-foreground">Implementation in priority order with your team or ours.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-light text-primary">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2 text-foreground">Monitor</h3>
                <p className="text-muted-foreground">Ongoing monitoring to catch issues before they compound.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6 text-foreground">Stop fighting technical debt</h2>
            <Button size="lg" variant="default">Get a technical SEO audit</Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default TechnicalSEO;
