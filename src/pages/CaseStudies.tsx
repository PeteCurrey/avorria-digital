import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { HeroBand, SectionBand } from "@/components/ContentBand";
import { trackEvent, EVENTS, trackCTAClick } from "@/lib/tracking";

const CaseStudies = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "SEO", "Paid Media", "Web Design", "Content"];

  // Track page view on mount
  useEffect(() => {
    trackEvent(EVENTS.CASE_STUDY_LIST_VIEWED, {
      filters_applied: activeFilter === "All" ? "" : `service=${activeFilter}`,
    });
  }, []);

  // Track filter changes
  useEffect(() => {
    if (activeFilter !== "All") {
      trackEvent(EVENTS.CASE_STUDY_LIST_VIEWED, {
        filters_applied: `service=${activeFilter}`,
      });
    }
  }, [activeFilter]);

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
        <HeroBand
          headline="Proof that we actually move the numbers."
          body="These are real client engagements with real outcomes. We treat case studies as operating playbooks, not trophies."
          minHeight="60vh"
        />

        {/* Filters - Sticky */}
        <section className="py-6 px-6 bg-[hsl(220,25%,8%)] border-b border-white/10 sticky top-20 z-40 backdrop-blur-md">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "bg-white/5 text-white/80 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Grid - Light */}
        <SectionBand background="light" padding="large">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudies.map((study, index) => (
                <Link
                  key={index}
                  to={study.href}
                  onClick={() => trackEvent(EVENTS.CASE_STUDY_OPENED, {
                    case_study_slug: study.href.split('/').pop(),
                    case_study_industry: study.industry.toLowerCase().replace(/ /g, '_'),
                    primary_service: study.service.toLowerCase().replace(/ /g, '_'),
                  })}
                  className="group block p-8 rounded-xl border border-border bg-card hover:shadow-[var(--shadow-card-hover)] hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                      {study.service}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <TrendingUp className="text-accent" size={20} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-4xl lg:text-5xl font-light text-gradient-accent">
                      {study.metric}
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                      {study.metricLabel}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{study.industry}</p>
                    <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                    <p className="text-xs text-muted-foreground italic">{study.details}</p>
                  </div>
                  
                  <div className="mt-6 inline-flex items-center text-accent font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                    View full case study
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                  </div>
                </Link>
              ))}
            </div>

            {filteredStudies.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No case studies found for this filter.</p>
              </div>
            )}
          </div>
        </SectionBand>

        {/* CTA Section - Dark gradient */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6">
              Want results like these for your business?
            </h2>
            <p className="text-lg md:text-xl text-white/75 mb-10 max-w-2xl mx-auto">
              Every business is different. Book a strategy call to discuss your goals and how we can help you achieve them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/contact" onClick={() => trackCTAClick('book_strategy_call', '/contact', 'case_studies_cta')}>
                  Book a Strategy Call
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                <Link to="/services" onClick={() => trackCTAClick('view_services', '/services', 'case_studies_cta')}>View Our Services</Link>
              </Button>
            </div>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default CaseStudies;
