import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, TrendingUp, LineChart, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { HeroBand, SectionBand } from "@/components/ContentBand";
import HeroGradient from "@/components/HeroGradient";

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
        {/* Hero Section - flows behind header */}
        <section className="relative min-h-[80vh] flex items-center section-dark overflow-hidden -mt-20 pt-20">
          <HeroGradient />
          <div className="container mx-auto px-6 relative z-10 py-32">
            <ScrollReveal>
              <div className="text-center max-w-4xl mx-auto space-y-8">
                <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4 border border-accent/20">
                  <span className="text-sm font-semibold text-accent uppercase tracking-wide">
                    Paid Media Management
                  </span>
                </div>
                <h1 className="text-display-lg text-foreground">
                  Paid media that ties spend to pipeline
                </h1>
                <p className="text-body-lg text-soft max-w-3xl mx-auto">
                  Google, Meta and LinkedIn campaigns structured around offers, not random keywords. We cut any spend that can't justify itself in hard numbers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto" asChild>
                    <Link to="/contact">
                      Book a strategy call
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                    <Link to="/free-seo-website-audit">Get a free audit</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Pain Points */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-display-md text-foreground mb-12 text-center">
                Tired of spending on ads that don't convert?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-10">
                <ul className="space-y-6">
                  {[
                    "Burning budget on \"awareness\" campaigns with no clear path to revenue",
                    "Agency optimizing for CTR and CPM while cost per qualified lead quietly doubles",
                    "Disconnected channels running in silos with no unified strategy",
                    "Attribution chaos – can't prove which campaigns actually drive pipeline"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-soft">
                      <span className="text-accent mr-4 mt-1 font-bold text-lg">✗</span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>

        {/* What We Do */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-display-md text-foreground mb-6">
                  How Avorria approaches paid media
                </h2>
                <p className="text-body-lg text-soft max-w-2xl mx-auto">
                  We structure campaigns around commercial offers, not vanity metrics. Every pound spent needs to justify itself in leads, opportunities or revenue.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Target,
                  title: "Offer-led campaign structure",
                  description: "We build campaigns around what you're actually selling – not generic \"brand awareness\". Every campaign maps to a specific offer, landing page, and commercial outcome."
                },
                {
                  icon: LineChart,
                  title: "Pipeline-first tracking",
                  description: "We connect ad spend to leads, opportunities and revenue using proper attribution. You'll know exactly which campaigns are worth scaling and which should be cut."
                },
                {
                  icon: TrendingUp,
                  title: "Ruthless optimization",
                  description: "Weekly reviews of what's working and what's not. We kill underperforming campaigns fast and double down on winners. No emotional attachment to creative that doesn't convert."
                },
                {
                  icon: Zap,
                  title: "Multi-channel coordination",
                  description: "Google Search, Meta, LinkedIn – we run them as a coordinated system, not separate campaigns. Messaging, offers and landing pages stay consistent while tactics adapt to each platform."
                }
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={0.1 * (i + 1)}>
                  <div className="group bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/50 transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <item.icon className="text-accent" size={28} />
                    </div>
                    <h3 className="text-heading-md text-foreground mb-4">
                      {item.title}
                    </h3>
                    <p className="text-soft leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* Platforms */}
        <SectionBand background="mesh" padding="large">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-display-md text-foreground mb-12 text-center">
                Platforms we manage
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Google Ads",
                  description: "Search, Display, Shopping and YouTube campaigns built around high-intent keywords and commercial queries."
                },
                {
                  title: "Meta (Facebook & Instagram)",
                  description: "Lead gen campaigns, retargeting funnels and lookalike audiences focused on qualified prospects, not just impressions."
                },
                {
                  title: "LinkedIn Ads",
                  description: "B2B campaigns targeting decision-makers by role, company size and industry with content that respects their time."
                }
              ].map((platform, i) => (
                <ScrollReveal key={platform.title} delay={0.1 * (i + 1)}>
                  <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center h-full">
                    <h3 className="text-heading-sm text-foreground mb-4">{platform.title}</h3>
                    <p className="text-soft">
                      {platform.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* CTA Section */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 rounded-3xl p-12 md:p-16 text-center">
                <h2 className="text-display-md text-foreground mb-6">
                  Ready to make your paid media accountable?
                </h2>
                <p className="text-body-lg text-soft mb-10 max-w-2xl mx-auto">
                  Book a free strategy call and we'll audit your current campaigns, show you where budget is being wasted, and build a plan focused on pipeline and revenue.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto" asChild>
                    <Link to="/contact">
                      Book a strategy call
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                    <Link to="/pricing">View pricing</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default PaidMedia;
