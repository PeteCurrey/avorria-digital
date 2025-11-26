import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";

const CaseStudies = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "SEO", "Paid Media", "Web Design", "Content"];

  const caseStudies = [
    {
      title: "184% Increase in Organic Leads",
      industry: "Professional Services",
      service: "SEO",
      description: "Full technical SEO overhaul and strategic content program delivered consistent lead growth for a B2B consulting firm.",
      metric: "+184%",
      metricLabel: "Organic Leads",
      details: "6-month engagement",
      href: "/case-studies/professional-services-seo",
    },
    {
      title: "3.2x ROAS in 90 Days",
      industry: "SaaS",
      service: "Paid Media",
      description: "Complete Google Ads restructure with conversion tracking and landing page optimization doubled return on ad spend.",
      metric: "3.2x",
      metricLabel: "ROAS",
      details: "3-month campaign",
      href: "/case-studies/saas-paid-media",
    },
    {
      title: "Complete Website Redesign",
      industry: "Multi-Location Business",
      service: "Web Design",
      description: "Modern, conversion-focused redesign with technical SEO increased leads by 127% within 6 months of launch.",
      metric: "+127%",
      metricLabel: "Lead Volume",
      details: "Full website rebuild",
      href: "/case-studies/multi-location-web-design",
    },
    {
      title: "220% Local Search Visibility Increase",
      industry: "Home Services",
      service: "SEO",
      description: "Comprehensive local SEO strategy with GMB optimization and location pages drove massive visibility gains.",
      metric: "+220%",
      metricLabel: "Local Visibility",
      details: "4-month campaign",
      href: "/case-studies/home-services-local-seo",
    },
    {
      title: "Content Strategy Drives 340% Traffic Growth",
      industry: "Financial Services",
      service: "Content",
      description: "Strategic pillar content and topic clusters built authority and organic traffic for a fintech startup.",
      metric: "+340%",
      metricLabel: "Organic Traffic",
      details: "9-month content program",
      href: "/case-studies/fintech-content-strategy",
    },
    {
      title: "£180k Attributed Revenue from Organic",
      industry: "Legal Services",
      service: "SEO",
      description: "Bottom-funnel keyword strategy with conversion tracking proved clear SEO ROI and revenue attribution.",
      metric: "£180k",
      metricLabel: "Attributed Revenue",
      details: "12-month engagement",
      href: "/case-studies/legal-services-seo-revenue",
    },
  ];

  const filteredStudies =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((study) => study.service === activeFilter);

  return (
    <>
      <Helmet>
        <title>Case Studies – Proven Pipeline Uplift | Avorria</title>
        <meta name="description" content="Real examples of how we've lifted organic leads, reduced CPL and cleaned up tracking for teams that were stuck." />
        
        <meta property="og:title" content="Case Studies – Proven Pipeline Uplift | Avorria" />
        <meta property="og:description" content="Real examples of how we've lifted organic leads, reduced CPL and cleaned up tracking for teams that were stuck." />
        <meta property="og:url" content="https://avorria.com/case-studies" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Case Studies – Proven Pipeline Uplift | Avorria" />
        <meta name="twitter:description" content="Real examples of how we've lifted organic leads, reduced CPL and cleaned up tracking for teams that were stuck." />
        
        <link rel="canonical" href="https://avorria.com/case-studies" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": caseStudies.map((study, index) => ({
              "@type": "Article",
              "position": index + 1,
              "name": study.title,
              "description": study.description,
              "url": `https://avorria.com${study.href}`,
              "about": {
                "@type": "Service",
                "serviceType": study.service
              }
            }))
          })}
        </script>
      </Helmet>

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background via-secondary to-background relative overflow-hidden">
        {/* Subtle gradient mesh */}
        <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40" />
        
        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground">
              Proof that we actually move the numbers.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
              These are real client engagements with real outcomes. We treat case studies as operating playbooks, not trophies.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 bg-background border-b border-border sticky top-20 z-40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <ScrollRevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={80}>
            {filteredStudies.map((study, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-[var(--shadow-card-hover)] transition-all duration-[var(--duration-base)] hover:-translate-y-1 group"
              >
                <CardContent className="p-8 space-y-4 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-accent/20 to-accent/10 text-accent text-xs font-semibold rounded-md">
                      {study.service}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-[var(--duration-base)]">
                      <TrendingUp className="text-accent" size={20} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="text-4xl lg:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-accent to-[hsl(280,75%,60%)]">
                      {study.metric}
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {study.metricLabel}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-[var(--duration-base)]">
                      {study.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{study.industry}</p>
                    <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                    <p className="text-xs text-muted-foreground italic">{study.details}</p>
                  </div>
                  <Link
                    to={study.href}
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-sm transition-all duration-[var(--duration-fast)] mt-auto group/link"
                  >
                    View full case study
                    <ArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform duration-[var(--duration-fast)]" size={16} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </ScrollRevealGrid>

          {filteredStudies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No case studies found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6 text-foreground">
            Want results like these for your business?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Every business is different. Book a strategy call to discuss your goals and how we can help you achieve them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact">
                Book a Strategy Call
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default CaseStudies;
