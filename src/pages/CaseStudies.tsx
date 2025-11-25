import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp } from "lucide-react";

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground animate-fade-in">
            Real clients. Real metrics.{" "}
            <span className="font-semibold text-accent">Real results.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-in-up">
            Explore how we've helped businesses like yours achieve measurable growth through strategic digital marketing.
          </p>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-xl transition-all group animate-fade-in-up"
              >
                <CardContent className="p-8 space-y-4 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-md">
                      {study.service}
                    </span>
                    <TrendingUp className="text-accent" size={20} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="text-4xl font-light text-accent">{study.metric}</div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {study.metricLabel}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{study.industry}</p>
                    <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                    <p className="text-xs text-muted-foreground italic">{study.details}</p>
                  </div>
                  <Link
                    to={study.href}
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-sm transition-colors mt-auto"
                  >
                    View full case study
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

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
  );
};

export default CaseStudies;
