import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, TrendingUp, Clock, Users } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { HeroBand, SectionBand } from "@/components/ContentBand";
import heroCityscape from "@/assets/hero-cityscape.jpg";

interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  service: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string; description: string }[];
  testimonial?: { quote: string; author: string; role: string };
  timeline: string;
  teamSize: string;
}

const caseStudies: Record<string, CaseStudy> = {
  "professional-services-seo": {
    slug: "professional-services-seo",
    title: "Professional Services Firm SEO Transformation",
    industry: "Professional Services",
    service: "SEO",
    challenge: "A mid-sized professional services firm was invisible in search results for their key services. Despite having strong expertise, they relied entirely on referrals and had no organic pipeline.",
    solution: "We implemented a comprehensive SEO strategy including technical fixes, content architecture overhaul, and targeted content creation focused on high-intent commercial keywords.",
    results: [
      { metric: "+184%", value: "Organic Leads", description: "Increase in qualified organic leads in 6 months" },
      { metric: "Top 3", value: "Rankings", description: "For 12 priority commercial keywords" },
      { metric: "£240k", value: "Pipeline", description: "New pipeline attributed to organic search" },
    ],
    testimonial: {
      quote: "Avorria transformed our online presence. We went from relying entirely on referrals to having a steady stream of qualified inbound leads.",
      author: "Managing Partner",
      role: "Professional Services Firm"
    },
    timeline: "6 months",
    teamSize: "3 specialists"
  },
  "multi-location-local-seo": {
    slug: "multi-location-local-seo",
    title: "Multi-Location Brand Local SEO Domination",
    industry: "Multi-Location Services",
    service: "Local SEO",
    challenge: "A service brand with 15+ locations was losing local search visibility to competitors. Their Google Business Profiles were inconsistent and they had no local landing page strategy.",
    solution: "We built a scalable local SEO system including optimised GBP profiles, location-specific landing pages, and a review generation strategy.",
    results: [
      { metric: "+132%", value: "Local Traffic", description: "Increase in local organic traffic" },
      { metric: "+89%", value: "Enquiries", description: "Growth in location-specific enquiries" },
      { metric: "15", value: "Locations", description: "All ranking in local pack for key terms" },
    ],
    timeline: "9 months",
    teamSize: "2 specialists"
  },
  "b2b-saas-demand-gen": {
    slug: "b2b-saas-demand-gen",
    title: "B2B SaaS Demand Generation Engine",
    industry: "B2B SaaS",
    service: "SEO & Content",
    challenge: "A B2B SaaS company had traffic but no demos. Their content attracted the wrong audience and their site didn't convert visitors into trial signups.",
    solution: "We rebuilt their content strategy around buyer-intent keywords, optimised key landing pages for conversion, and implemented proper tracking to measure content ROI.",
    results: [
      { metric: "2.4x", value: "Pipeline", description: "Increase in inbound pipeline within a year" },
      { metric: "+156%", value: "Demo Requests", description: "Growth in qualified demo requests" },
      { metric: "38%", value: "Lower CAC", description: "Reduction in customer acquisition cost" },
    ],
    timeline: "12 months",
    teamSize: "4 specialists"
  },
  "ecommerce-paid-media": {
    slug: "ecommerce-paid-media",
    title: "E-commerce Brand Paid Media Turnaround",
    industry: "E-commerce",
    service: "Paid Media",
    challenge: "An e-commerce brand was burning budget on paid ads with declining ROAS. Their campaigns were poorly structured and targeting was too broad.",
    solution: "We restructured their Google Ads and Meta campaigns, implemented proper conversion tracking, and built a testing framework for creative and audiences.",
    results: [
      { metric: "+67%", value: "ROAS", description: "Improvement in return on ad spend" },
      { metric: "-42%", value: "CPA", description: "Reduction in cost per acquisition" },
      { metric: "£1.2M", value: "Revenue", description: "Attributed to paid campaigns in 6 months" },
    ],
    testimonial: {
      quote: "They took our paid media from a cost centre to our primary growth driver. The difference is night and day.",
      author: "Head of Marketing",
      role: "E-commerce Brand"
    },
    timeline: "6 months",
    teamSize: "2 specialists"
  },
  "trades-web-redesign": {
    slug: "trades-web-redesign",
    title: "Trades Business Website Redesign",
    industry: "Trades & Home Services",
    service: "Web Design",
    challenge: "A successful trades business had an outdated website that didn't reflect their quality. Mobile experience was poor and they had no way to capture leads online.",
    solution: "We designed and built a modern, mobile-first website with clear service pages, trust signals, and optimised conversion paths for quote requests.",
    results: [
      { metric: "+215%", value: "Enquiries", description: "Increase in online quote requests" },
      { metric: "3.2s → 1.1s", value: "Load Time", description: "Improvement in page load speed" },
      { metric: "+78%", value: "Mobile Conv.", description: "Increase in mobile conversion rate" },
    ],
    timeline: "8 weeks",
    teamSize: "3 specialists"
  },
  "healthcare-content-strategy": {
    slug: "healthcare-content-strategy",
    title: "Healthcare Provider Content Strategy",
    industry: "Healthcare",
    service: "Content Marketing",
    challenge: "A private healthcare provider needed to build authority and trust online. They had no content strategy and were losing visibility to competitors with stronger content.",
    solution: "We developed a comprehensive content strategy including pillar content, patient education resources, and thought leadership pieces for their specialist team.",
    results: [
      { metric: "+340%", value: "Organic Traffic", description: "Growth in organic traffic over 12 months" },
      { metric: "45", value: "Ranking Keywords", description: "New first-page rankings for key terms" },
      { metric: "+92%", value: "Patient Enquiries", description: "Increase in enquiries from organic search" },
    ],
    timeline: "12 months",
    teamSize: "2 specialists"
  },
};

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? caseStudies[slug] : null;

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Case Study Not Found</h1>
          <Button asChild>
            <Link to="/case-studies">View All Case Studies</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{caseStudy.title} | Avorria Case Study</title>
        <meta name="description" content={`${caseStudy.challenge.substring(0, 155)}...`} />
        <meta property="og:title" content={`${caseStudy.title} | Avorria Case Study`} />
        <meta property="og:url" content={`https://avorria.com/case-studies/${caseStudy.slug}`} />
        <link rel="canonical" href={`https://avorria.com/case-studies/${caseStudy.slug}`} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <HeroBand
          headline={caseStudy.title}
          body={caseStudy.challenge}
          backgroundImage={heroCityscape}
          cta={{ text: "Get similar results", href: "/contact" }}
        />

        {/* Quick Stats */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center gap-3 text-white/70">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                  {caseStudy.industry}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Clock size={18} />
                <span>{caseStudy.timeline}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Users size={18} />
                <span>{caseStudy.teamSize}</span>
              </div>
            </div>

            {/* Results Grid */}
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-12 text-center">The Results</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {caseStudy.results.map((result, index) => (
                <ScrollReveal key={index}>
                  <Card className="border-white/10 bg-white/5 text-center p-8">
                    <CardContent className="p-0">
                      <div className="text-5xl font-bold text-accent mb-2">{result.metric}</div>
                      <div className="text-xl font-semibold text-white mb-2">{result.value}</div>
                      <p className="text-white/60">{result.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* Solution */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-8 text-center">The Solution</h2>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-10">
                <p className="text-xl text-white/90 leading-relaxed">{caseStudy.solution}</p>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <SectionBand background="dark" padding="large">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <blockquote className="text-2xl md:text-3xl text-white/90 font-light italic mb-8">
                  "{caseStudy.testimonial.quote}"
                </blockquote>
                <div>
                  <p className="text-white font-semibold">{caseStudy.testimonial.author}</p>
                  <p className="text-white/60">{caseStudy.testimonial.role}</p>
                </div>
              </ScrollReveal>
            </div>
          </SectionBand>
        )}

        {/* CTA */}
        <SectionBand background="mesh" padding="large">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-6">Want results like this?</h2>
              <p className="text-xl text-white/80 mb-10">
                Let's discuss how we can help you achieve similar outcomes for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">
                    Book a strategy call <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <Link to="/case-studies">
                    <ArrowLeft className="mr-2" size={18} /> View all case studies
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default CaseStudyDetail;