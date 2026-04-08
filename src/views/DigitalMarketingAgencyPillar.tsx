'use client';
import Link from "next/link";
import SEOHead from "@/components/seo/SEOHead";
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
import heroImage from "@/assets/hero-services-digital.jpg";
import { locations } from "@/data/locations";

const DigitalMarketingAgencyPillar = () => {
  const painPoints = [
    "Your SEO, paid media and content teams are siloed and don't speak to each other.",
    "You're paying for multiple agencies but nobody owns the full-funnel picture.",
    "Reports show activity, but you can't trace it to pipeline or revenue.",
    "Your brand feels inconsistent across channels because each team does their own thing.",
    "Nobody can tell you which marketing efforts are actually driving business.",
  ];

  const services = [
    { title: "SEO & Organic Search", description: "Technical SEO, content strategy and on-page optimisation to win commercial searches that drive qualified leads." },
    { title: "Paid Media", description: "Google Ads, Meta Ads and LinkedIn campaigns engineered for leads and revenue, not vanity metrics." },
    { title: "Web Design & Development", description: "Conversion-focused websites that look sharp and behave like sales assets with proper tracking." },
    { title: "Content Marketing", description: "Long-form SEO content and thought leadership tied to your buyer journey and sales process." },
    { title: "Email & Automation", description: "Automated sequences and campaigns that nurture leads and accelerate pipeline velocity." },
    { title: "Analytics & Attribution", description: "Clean tracking setups that show you what's actually working and where to invest next." },
  ];

  const approach = [
    { period: "Discovery", title: "Understand your business", description: "We start by understanding your market, customers, competition and goals. No cookie-cutter strategies." },
    { period: "Strategy", title: "Build the roadmap", description: "A clear, integrated plan that aligns SEO, paid, content and web around your commercial objectives." },
    { period: "Execute", title: "Deliver the work", description: "We handle execution across channels with a single point of accountability. No finger-pointing between agencies." },
    { period: "Optimise", title: "Learn and improve", description: "Continuous optimisation based on real data. We reallocate effort and budget to what's actually working." },
  ];

  const faqs = [
    { question: "Do we need to use all your services?", answer: "No. Many clients start with one or two services and expand over time. We'll recommend what makes sense for your stage and budget." },
    { question: "How do you coordinate across channels?", answer: "Single account team, unified reporting, weekly syncs. We treat your marketing as one interconnected system, not separate projects." },
    { question: "What size companies do you work with?", answer: "Primarily SMBs and mid-market B2B companies. Teams who want grown-up marketing but aren't ready for enterprise agency prices." },
    { question: "What does engagement look like?", answer: "Monthly retainers with clear deliverables and dashboards. We work like an extension of your team, not a vendor you have to chase." },
  ];

  const ukLocations = locations.filter(l => l.countryCode === "GB");
  const usLocations = locations.filter(l => l.countryCode === "US");
  const auLocations = locations.filter(l => l.countryCode === "AU");
  const nzLocations = locations.filter(l => l.countryCode === "NZ");
  const caLocations = locations.filter(l => l.countryCode === "CA");

  return (
    <>
      <ServiceSchema
        name="Digital Marketing Agency Services"
        description="Integrated digital marketing for B2B and service businesses. SEO, paid media, web design and content strategy under one roof with clear tracking and reporting."
        url="/digital-marketing-agency"
        aggregateRating={{ ratingValue: 4.8, reviewCount: 35 }}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Digital Marketing Agency", url: "/digital-marketing-agency" }
      ]} />
      <SEOHead
        title="Digital Marketing Agency | Full-Funnel Growth"
        description="Integrated digital marketing agency for B2B and service businesses. SEO, paid media, web design and content strategy under one roof with clear tracking."
        canonical="/digital-marketing-agency"
        keywords={["digital marketing agency", "integrated marketing", "SEO", "paid media", "content marketing", "B2B marketing"]}
      />

      <div className="min-h-screen">
        <HeroBand
          headline="Digital marketing that drives pipeline, not noise."
          body="Integrated SEO, paid media, web and content strategies for B2B and service businesses who want marketing that actually connects to revenue."
          backgroundImage={heroImage}
          cta={{ text: "Book a strategy call", href: "/contact" }}
          secondaryCta={{ text: "Get a free audit", href: "/free-seo-website-audit" }}
        />

        {/* Pain Points */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-10 text-center">
                Sound familiar?
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

        {/* Services */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-16 text-center">
                Everything you need under one roof.
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ScrollReveal key={index}>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 h-full">
                    <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                    <p className="text-white/70 leading-relaxed">{service.description}</p>
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
              <h2 className="text-section-headline font-light mb-16 text-center">How we work</h2>
            </ScrollReveal>
            <div className="space-y-6">
              {approach.map((phase, index) => (
                <ScrollReveal key={index}>
                  <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-black/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                      <div className="md:w-36 mb-4 md:mb-0">
                        <span className="inline-block px-4 py-2 bg-accent/20 text-accent font-semibold rounded-lg text-sm">
                          {phase.period}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-white mb-2">{phase.title}</h3>
                        <p className="text-white/70 leading-relaxed">{phase.description}</p>
                      </div>
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
              <h2 className="text-section-headline font-light mb-6 text-center">Digital marketing by location</h2>
              <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
                Integrated digital marketing services across the UK, USA, Australia, New Zealand and Canada.
              </p>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <ScrollReveal>
                <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">United Kingdom</h3>
                <div className="grid grid-cols-2 gap-3">
                  {ukLocations.map((location) => (
                    <Link
                      key={location.id}
                      href={`/digital-marketing-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      {location.city} Ã¢â€ â€™
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
                      href={`/digital-marketing-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      {location.city} Ã¢â€ â€™
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
                      href={`/digital-marketing-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      {location.city} Ã¢â€ â€™
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
                      href={`/digital-marketing-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      {location.city} Ã¢â€ â€™
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
                      href={`/digital-marketing-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      {location.city} Ã¢â€ â€™
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
              <h2 className="text-section-headline font-light mb-6">Ready to grow?</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Book a free strategy call to discuss how integrated digital marketing can drive your pipeline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <Link href="/contact">
                    Book strategy call <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/free-seo-website-audit">Get free audit</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default DigitalMarketingAgencyPillar;


