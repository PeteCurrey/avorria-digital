import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Building2, Car, Truck } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { caseStudies, getFeaturedCaseStudies, filterOptions } from "@/data/caseStudies";
import { CaseHero } from "@/components/case-studies/CaseHero";
import { CaseFeaturedCarousel } from "@/components/case-studies/CaseFeaturedCarousel";
import { CaseFilterBar } from "@/components/case-studies/CaseFilterBar";
import { CaseGrid } from "@/components/case-studies/CaseGrid";

interface FilterState {
  sector: string;
  service: string;
  outcome: string;
  year: string;
}

const CaseStudies = () => {
  const [filters, setFilters] = useState<FilterState>({
    sector: "all",
    service: "all",
    outcome: "all",
    year: "all",
  });

  const featuredCases = getFeaturedCaseStudies();

  // Track page view
  useEffect(() => {
    trackEvent("case_lobby_viewed", {});
  }, []);

  // Filter cases
  const filteredCases = useMemo(() => {
    return caseStudies.filter((cs) => {
      if (filters.sector !== "all" && cs.sector !== filters.sector) return false;
      if (filters.service !== "all" && !cs.services.includes(filters.service)) return false;
      if (filters.outcome !== "all" && cs.outcome !== filters.outcome) return false;
      if (filters.year !== "all" && cs.year.toString() !== filters.year) return false;
      return true;
    });
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ sector: "all", service: "all", outcome: "all", year: "all" });
  };

  const handleTileClick = (slug: string) => {
    trackEvent("case_tile_clicked", { case_slug: slug });
  };

  const sectorHighlights = [
    {
      icon: Building2,
      title: "Facilities Management",
      description: "Digital transformation for FM providers",
    },
    {
      icon: Truck,
      title: "Specialist Lifting & Crane Hire",
      description: "Technical clarity for complex services",
    },
    {
      icon: Car,
      title: "Automotive & Classic Cars",
      description: "Premium digital experiences for automotive",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Digital Marketing Case Studies | Website Design Portfolio | Avorria</title>
        <meta 
          name="description" 
          content="Explore Avorria's portfolio of digital marketing case studies. See real results from website redesigns, SEO campaigns, and AI marketing projects across facilities management, automotive, and specialist industries." 
        />
        <meta name="keywords" content="digital marketing case studies, website design portfolio, AI marketing projects, SEO case studies, web design results" />
        <link rel="canonical" href="https://avorria.com/case-studies" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Digital Marketing Case Studies | Avorria" />
        <meta property="og:description" content="Real results for real businesses. Explore our portfolio of website redesigns, SEO campaigns, and digital transformations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://avorria.com/case-studies" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Digital Marketing Case Studies",
            "description": "Portfolio of digital marketing case studies showcasing website design, SEO, and marketing results",
            "publisher": {
              "@type": "Organization",
              "name": "Avorria Digital Marketing"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": caseStudies.slice(0, 5).map((cs, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": cs.title,
                "url": `https://avorria.com/case-studies/${cs.slug}`
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[hsl(220,25%,8%)]">
        {/* Hero */}
        <CaseHero
          isLobby
          headline="Our Work"
          subheadline="Real results for real businesses. Every case study represents a partnership built on strategy, execution, and measurable outcomes — from facilities management to classic cars."
          ctaText="Start your project"
          ctaHref="/contact"
          backgroundMedia={{
            type: "image",
            src: "/lovable-uploads/70db8621-9460-4970-9e76-0d752b57fa5c.jpg",
          }}
        />

        {/* Sector Highlights */}
        <section className="py-16 px-6 border-b border-white/5">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">Diverse Expertise</span>
              <h2 className="text-2xl md:text-3xl font-light text-white">From crane hire to classic cars — we make complex simple</h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {sectorHighlights.map((sector, index) => (
                <motion.div
                  key={sector.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors"
                >
                  <sector.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">{sector.title}</h3>
                  <p className="text-white/60 text-sm">{sector.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Carousel */}
        <CaseFeaturedCarousel
          cases={featuredCases}
          onCaseClick={handleTileClick}
        />

        {/* Filter Bar */}
        <CaseFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          options={filterOptions}
          resultCount={filteredCases.length}
        />

        {/* Case Grid */}
        <CaseGrid cases={filteredCases} onTileClick={handleTileClick} />

        {/* Capabilities Strip */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 text-sm text-white/50"
            >
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" /> AI Integration</span>
              <span className="px-2">•</span>
              <span>Website Redesign</span>
              <span className="px-2">•</span>
              <span>Brand Development</span>
              <span className="px-2">•</span>
              <span>SEO & Content</span>
              <span className="px-2">•</span>
              <span>Local SEO</span>
              <span className="px-2">•</span>
              <span>UX Optimisation</span>
              <span className="px-2">•</span>
              <span>Paid Media</span>
            </motion.div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 px-6 section-gradient">
          <div className="container mx-auto text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Ready to become our next success story?
              </h2>
              <p className="text-xl text-white/70 mb-10">
                Whether you need a complete digital transformation or targeted improvements, we'll build a strategy around your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">
                    Book a strategy call
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-white/20 text-white hover:bg-white/10">
                  <Link to="/web-design/studio">Try the Studio</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudies;
