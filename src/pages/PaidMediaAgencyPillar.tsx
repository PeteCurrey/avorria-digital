import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { HeroBand, SectionBand } from "@/components/ContentBand";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import heroImage from "@/assets/service-paid-media.jpg";
import { locations } from "@/data/locations";

const PaidMediaAgencyPillar = () => {
  const painPoints = [
    "You're spending money on ads but can't tie clicks to actual revenue.",
    "Your agency talks about impressions and reach, but you want leads and sales.",
    "Conversion tracking is a mess so nobody really knows what's working.",
    "Creative is stale, audiences are fatigued, and performance is declining.",
    "You're paying management fees on top of ad spend but not seeing proportional results.",
  ];

  const platforms = [
    { title: "Google Ads", description: "Search, Shopping, Display and YouTube campaigns targeting high-intent buyers actively looking for solutions like yours." },
    { title: "Meta Ads", description: "Facebook and Instagram campaigns that reach your ideal customers with compelling creative and precise targeting." },
    { title: "LinkedIn Ads", description: "B2B campaigns targeting decision-makers by job title, company, industry and more." },
    { title: "Microsoft Ads", description: "Often overlooked but cost-effective reach across Bing, LinkedIn audience network and more." },
  ];

  const approach = [
    { title: "Audit & Strategy", description: "We audit your current setup, tracking and creative. Then build a strategy aligned with your commercial goals." },
    { title: "Tracking Setup", description: "Proper conversion tracking so we can actually measure what matters – leads, pipeline, revenue." },
    { title: "Campaign Build", description: "Campaigns structured for performance with clear audience targeting, ad creative and bidding strategies." },
    { title: "Optimisation", description: "Continuous testing and optimisation. We reallocate budget to what's working and kill what isn't." },
    { title: "Reporting", description: "Clear reporting that connects ad spend to business outcomes. No vanity metrics." },
  ];

  const faqs = [
    { question: "What's your minimum ad spend requirement?", answer: "We typically work with clients spending £3,000–£50,000+ per month on ads. Below that, the management fees often don't make economic sense." },
    { question: "Do you charge a percentage of ad spend?", answer: "We offer both percentage-based and flat fee models. Happy to discuss what makes sense for your situation." },
    { question: "Can you work with our existing accounts?", answer: "Yes. We can audit and optimise existing campaigns or build new ones from scratch. Either way, you own the accounts." },
    { question: "How do you handle creative?", answer: "We can work with your existing creative team, provide briefs for designers, or handle creative production in-house depending on scope." },
  ];

  const ukLocations = locations.filter(l => l.countryCode === "GB");
  const usLocations = locations.filter(l => l.countryCode === "US");
  const auLocations = locations.filter(l => l.countryCode === "AU");
  const nzLocations = locations.filter(l => l.countryCode === "NZ");
  const caLocations = locations.filter(l => l.countryCode === "CA");

  return (
    <>
      <ServiceSchema
        name="Paid Media Agency Services"
        description="Performance-focused paid media campaigns across Google Ads, Meta Ads and LinkedIn. We focus on leads and revenue, not impressions and clicks."
        url="/paid-media-agency"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 28 }}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Paid Media Agency", url: "/paid-media-agency" }
      ]} />
      <Helmet>
        <title>Paid Media Agency | Google Ads, Meta Ads & LinkedIn | Avorria</title>
        <meta name="description" content="Paid media agency focused on leads and revenue. Google Ads, Meta Ads and LinkedIn campaigns with proper tracking and clear ROI reporting." />
        <meta name="keywords" content="paid media agency, Google Ads agency, Meta Ads, Facebook Ads, LinkedIn Ads, PPC agency" />
        <meta property="og:title" content="Paid Media Agency | Avorria" />
        <meta property="og:description" content="Performance-focused paid media campaigns that deliver ROI, not just impressions." />
        <meta property="og:url" content="https://avorria.com/paid-media-agency" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://avorria.com/paid-media-agency" />
      </Helmet>

      <div className="min-h-screen">
        <HeroBand
          headline="Paid media that delivers ROI, not just impressions."
          body="Google Ads, Meta Ads and LinkedIn campaigns engineered for leads and revenue. Proper tracking, transparent reporting, and a relentless focus on what actually moves the needle."
          backgroundImage={heroImage}
          cta={{ text: "Book a paid media review", href: "/contact" }}
          secondaryCta={{ text: "Get a free audit", href: "/free-seo-website-audit" }}
        />

        {/* Pain Points */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-10 text-center">
                Tired of paying for clicks that don't convert?
              </h2>
            </ScrollReveal>
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-10">
              <ul className="space-y-5">
                {painPoints.map((point, index) => (
                  <li key={index} className="flex items-start text-white/80">
                    <X className="text-accent mr-4 mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionBand>

        {/* Platforms */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-16 text-center">
                Platforms we manage
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8">
              {platforms.map((platform, index) => (
                <ScrollReveal key={index}>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 h-full">
                    <h3 className="text-xl font-semibold text-white mb-4">{platform.title}</h3>
                    <p className="text-white/70 leading-relaxed">{platform.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* Our Approach */}
        <SectionBand background="mesh" padding="large">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-16 text-center">Our approach</h2>
            </ScrollReveal>
            <div className="space-y-6">
              {approach.map((step, index) => (
                <ScrollReveal key={index}>
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-semibold">{index + 1}</span>
                    </div>
                    <div className="flex-1 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-white/70 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* Location Pages */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-6 text-center">Paid media by location</h2>
              <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
                Local paid media expertise across the UK, USA, Australia, New Zealand and Canada.
              </p>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <ScrollReveal>
                <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">United Kingdom</h3>
                <div className="grid grid-cols-2 gap-3">
                  {ukLocations.map((location) => (
                    <Link
                      key={location.id}
                      to={`/paid-media-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      {location.city} →
                    </Link>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">United States</h3>
                <div className="grid grid-cols-2 gap-3">
                  {usLocations.map((location) => (
                    <Link
                      key={location.id}
                      to={`/paid-media-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      {location.city} →
                    </Link>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">Australia</h3>
                <div className="grid grid-cols-2 gap-3">
                  {auLocations.map((location) => (
                    <Link
                      key={location.id}
                      to={`/paid-media-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      {location.city} →
                    </Link>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">New Zealand</h3>
                <div className="grid grid-cols-2 gap-3">
                  {nzLocations.map((location) => (
                    <Link
                      key={location.id}
                      to={`/paid-media-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      {location.city} →
                    </Link>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">Canada</h3>
                <div className="grid grid-cols-2 gap-3">
                  {caLocations.map((location) => (
                    <Link
                      key={location.id}
                      to={`/paid-media-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      {location.city} →
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </SectionBand>

        {/* FAQ */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-12 text-center">Frequently asked questions</h2>
            </ScrollReveal>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/10 bg-black/20 backdrop-blur-sm px-6 rounded-lg"
                >
                  <AccordionTrigger className="text-left font-semibold text-white hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionBand>

        {/* CTA */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-6">Ready to improve your paid media ROI?</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Book a free paid media review to see where you're leaving money on the table.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">
                    Book paid media review <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/free-seo-website-audit">Get free audit</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default PaidMediaAgencyPillar;
