import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, TrendingUp, LineChart, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const PaidMedia = () => {
  return (
    <>
      <Helmet>
        <title>Paid Media that Ties Spend to Pipeline | Avorria</title>
        <meta
          name="description"
          content="Google, Meta and LinkedIn campaigns structured around offers, not random keywords. We cut any spend that can't justify itself in hard numbers."
        />
        <link rel="canonical" href="https://avorria.com/services/paid-media" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Paid Media that Ties Spend to Pipeline | Avorria" />
        <meta property="og:description" content="Google, Meta and LinkedIn campaigns structured around offers, not random keywords. We cut any spend that can't justify itself in hard numbers." />
        <meta property="og:url" content="https://avorria.com/services/paid-media" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://avorria.com/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paid Media that Ties Spend to Pipeline | Avorria" />
        <meta name="twitter:description" content="Google, Meta and LinkedIn campaigns structured around offers, not random keywords. We cut any spend that can't justify itself in hard numbers." />
        <meta name="twitter:image" content="https://avorria.com/og-image.jpg" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Paid Media Management",
            "serviceType": "Paid media management",
            "provider": {
              "@type": "Organization",
              "name": "Avorria",
              "url": "https://avorria.com"
            },
            "areaServed": {
              "@type": "Country",
              "name": "United Kingdom"
            },
            "description": "Google, Meta and LinkedIn campaigns structured around offers, not random keywords. We cut any spend that can't justify itself in hard numbers.",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://avorria.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://avorria.com/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Paid Media",
                "item": "https://avorria.com/services/paid-media"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background via-background to-secondary">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center max-w-4xl mx-auto space-y-8">
                <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
                  <span className="text-sm font-semibold text-accent uppercase tracking-wide">
                    Paid Media Management
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-light leading-tight text-foreground">
                  Paid media that ties spend to pipeline
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Google, Meta and LinkedIn campaigns structured around offers, not random keywords. We cut any spend that can't justify itself in hard numbers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button variant="accent" size="lg" asChild>
                    <Link to="/contact">
                      Book a strategy call
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/free-seo-website-audit">Get a free audit</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-5xl">
            <ScrollReveal>
              <h2 className="text-4xl font-light mb-12 text-foreground text-center">
                Tired of spending on ads that don't convert?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Card className="border-border">
                <CardContent className="p-10">
                  <ul className="space-y-4">
                    <li className="flex items-start text-muted-foreground">
                      <span className="text-accent mr-3 mt-1 font-bold">✗</span>
                      <span className="text-lg">Burning budget on "awareness" campaigns with no clear path to revenue</span>
                    </li>
                    <li className="flex items-start text-muted-foreground">
                      <span className="text-accent mr-3 mt-1 font-bold">✗</span>
                      <span className="text-lg">Agency optimizing for CTR and CPM while cost per qualified lead quietly doubles</span>
                    </li>
                    <li className="flex items-start text-muted-foreground">
                      <span className="text-accent mr-3 mt-1 font-bold">✗</span>
                      <span className="text-lg">Disconnected channels running in silos with no unified strategy</span>
                    </li>
                    <li className="flex items-start text-muted-foreground">
                      <span className="text-accent mr-3 mt-1 font-bold">✗</span>
                      <span className="text-lg">Attribution chaos – can't prove which campaigns actually drive pipeline</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light mb-4 text-foreground">
                  How Avorria approaches paid media
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We structure campaigns around commercial offers, not vanity metrics. Every pound spent needs to justify itself in leads, opportunities or revenue.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal delay={0.1}>
                <Card className="border-border hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <Target className="text-accent" size={24} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      Offer-led campaign structure
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We build campaigns around what you're actually selling – not generic "brand awareness". Every campaign maps to a specific offer, landing page, and commercial outcome.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Card className="border-border hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <LineChart className="text-accent" size={24} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      Pipeline-first tracking
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We connect ad spend to leads, opportunities and revenue using proper attribution. You'll know exactly which campaigns are worth scaling and which should be cut.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <Card className="border-border hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <TrendingUp className="text-accent" size={24} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      Ruthless optimization
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Weekly reviews of what's working and what's not. We kill underperforming campaigns fast and double down on winners. No emotional attachment to creative that doesn't convert.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <Card className="border-border hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <Zap className="text-accent" size={24} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      Multi-channel coordination
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Google Search, Meta, LinkedIn – we run them as a coordinated system, not separate campaigns. Messaging, offers and landing pages stay consistent while tactics adapt to each platform.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="py-24 px-6 bg-secondary">
          <div className="container mx-auto max-w-5xl">
            <ScrollReveal>
              <h2 className="text-4xl font-light mb-12 text-foreground text-center">
                Platforms we manage
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8">
              <ScrollReveal delay={0.1}>
                <Card className="border-border">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Google Ads</h3>
                    <p className="text-muted-foreground">
                      Search, Display, Shopping and YouTube campaigns built around high-intent keywords and commercial queries.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Card className="border-border">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Meta (Facebook & Instagram)</h3>
                    <p className="text-muted-foreground">
                      Lead gen campaigns, retargeting funnels and lookalike audiences focused on qualified prospects, not just impressions.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <Card className="border-border">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-3">LinkedIn Ads</h3>
                    <p className="text-muted-foreground">
                      B2B campaigns targeting decision-makers by role, company size and industry with content that respects their time.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-4xl">
            <ScrollReveal>
              <Card className="border-border bg-gradient-to-br from-accent/5 to-accent/10">
                <CardContent className="p-12 text-center">
                  <h2 className="text-4xl font-light mb-6 text-foreground">
                    Ready to make your paid media accountable?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Book a free strategy call and we'll audit your current campaigns, show you where budget is being wasted, and build a plan focused on pipeline and revenue.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="accent" size="lg" asChild>
                      <Link to="/contact">
                        Book a strategy call
                        <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/pricing">View pricing</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default PaidMedia;
