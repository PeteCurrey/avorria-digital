'use client';
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, BarChart3, MousePointer2, X } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import { HeroBand, SectionBand } from "@/components/ContentBand";
const heroServicesDigital = "/assets/hero-services-digital.jpg";

const Analytics = () => {
  const painPoints = [
    "You've got Google Analytics installed, but nobody really knows what the numbers mean.",
    "Marketing can't tell you which channels are actually driving revenue.",
    "Your tracking is broken, duplicated or missing entirely.",
    "You make decisions based on gut feel because the data is too messy to trust.",
    "You've got dashboards, but they don't connect to sales or pipeline.",
  ];

  const analyticsIncluded = [
    "Complete analytics audit and cleanup.",
    "GA4 setup and configuration done properly.",
    "Event tracking for key user actions.",
    "Custom dashboards showing metrics that matter.",
    "Attribution modelling to understand channel performance.",
    "Integration with CRM and sales data.",
  ];

  const croIncluded = [
    "Conversion funnel analysis and mapping.",
    "Heatmaps and user behaviour analysis.",
    "A/B testing strategy and implementation.",
    "Landing page optimisation.",
    "Form and checkout optimisation.",
    "CRO roadmap prioritised by impact.",
  ];

  const timeline = [
    {
      period: "Week 1",
      title: "Audit & discovery",
      description:
        "We audit your current tracking setup, identify gaps and understand your key conversion points and business goals.",
    },
    {
      period: "Weeks 2–3",
      title: "Setup & implementation",
      description:
        "Clean implementation of tracking, event setup, and initial dashboard configuration.",
    },
    {
      period: "Week 4",
      title: "Dashboards & insights",
      description:
        "Custom dashboards that show the metrics that matter, with clear connections to pipeline and revenue.",
    },
    {
      period: "Ongoing",
      title: "Optimise & test",
      description:
        "Continuous CRO testing, tracking refinement, and regular insights to improve conversion rates.",
    },
  ];

  const deliverables = [
    "Clean, accurate tracking across your digital properties.",
    "Custom dashboards in Looker Studio or your preferred tool.",
    "Monthly analytics reports with actionable insights.",
    "CRO testing roadmap and results documentation.",
    "Training for your team to understand and use the data.",
  ];

  const faqs = [
    {
      question: "Do you work with GA4, or other platforms?",
      answer:
        "We work primarily with GA4, but also support Mixpanel, Amplitude, Segment and other analytics platforms depending on your needs.",
    },
    {
      question: "Can you connect our analytics to our CRM?",
      answer:
        "Yes. We regularly integrate with HubSpot, Salesforce, Pipedrive and others to show the full journey from click to closed deal.",
    },
    {
      question: "How do you prioritise CRO tests?",
      answer:
        "We use a combination of traffic, impact potential and ease of implementation. We focus on high-traffic pages with clear conversion goals first.",
    },
    {
      question: "What if our current tracking is a mess?",
      answer:
        "That's common. We start with a complete audit, then systematically fix issues before building anything new. Clean data is the foundation.",
    },
  ];

  return (
    <>
      <SEOHead
        title="Analytics & Conversion Optimisation"
        description="Analytics setup, tracking and CRO that connects marketing activity to pipeline and revenue – not just dashboards full of vanity metrics."
        canonical="/services/analytics"
        keywords={["analytics", "conversion optimisation", "CRO", "GA4 setup", "tracking", "attribution modelling", "A/B testing"]}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "Services", url: "https://avorria.com/services" },
        { name: "Analytics & CRO", url: "https://avorria.com/services/analytics" }
      ]} />
      <ServiceSchema
        name="Analytics & Conversion Optimisation"
        description="Analytics setup, tracking and conversion rate optimisation for revenue-focused teams. GA4, attribution modelling and A/B testing."
        url="/services/analytics"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 26 }}
      />
      <FAQSchema faqs={faqs} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroBand
          headline="Know what's working. Fix what isn't."
          body="We set up analytics properly, build dashboards that matter, and run CRO programs that turn more visitors into customers – so you can make decisions based on data, not guesswork."
          backgroundImage={heroServicesDigital}
          cta={{ text: "Book an analytics review", href: "/contact" }}
          secondaryCta={{ text: "Get a free tracking audit", href: "/free-seo-website-audit" }}
        />

        {/* Pain Points */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-10 text-center">
                The data problem most teams ignore.
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
            <p className="text-center text-xl text-white/90 mt-10 font-medium max-w-3xl mx-auto">
              Good data isn't optional – it's the foundation of every good marketing decision. Let us fix yours.
            </p>
          </div>
        </SectionBand>

        {/* What's Included */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-16 text-center">
                What we cover.
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <ScrollReveal>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="text-accent" size={28} />
                    <h3 className="text-2xl font-semibold text-white border-l-4 border-accent pl-4">Analytics & Tracking</h3>
                  </div>
                  <div className="space-y-4">
                    {analyticsIncluded.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                        <p className="text-white/80">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MousePointer2 className="text-accent" size={28} />
                    <h3 className="text-2xl font-semibold text-white border-l-4 border-accent pl-4">Conversion Optimisation</h3>
                  </div>
                  <div className="space-y-4">
                    {croIncluded.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                        <p className="text-white/80">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </SectionBand>

        {/* Process Timeline */}
        <SectionBand background="mesh" padding="large">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-section-headline font-light mb-4">How we work together.</h2>
              </div>
            </ScrollReveal>
            <div className="space-y-6">
              {timeline.map((phase, index) => (
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

        {/* Deliverables */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-12 text-center">What you get.</h2>
            </ScrollReveal>
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-10 space-y-6">
              <ul className="space-y-5">
                {deliverables.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="text-accent mr-4 mt-1 flex-shrink-0" size={22} />
                    <span className="text-white/90 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionBand>

        {/* Quote */}
        <SectionBand background="dark" padding="large">
          <OpinionatedQuote quote="If you can't trust your data, you're just guessing. And guessing is expensive." />
        </SectionBand>

        {/* FAQs */}
        <SectionBand background="mesh" padding="large">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-12 text-center">FAQs</h2>
            </ScrollReveal>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border border-white/10 rounded-xl bg-black/20 px-6 data-[state=open]:bg-black/30">
                  <AccordionTrigger className="text-lg text-white hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionBand>

        {/* CTA */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-6">Ready for data you can trust?</h2>
              <p className="text-xl text-white/80 mb-10">
                Let's fix your tracking and build dashboards that actually help you make better decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <Link href="/contact">
                    Book a tracking review <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button variant="outline-dark" size="lg" asChild>
                  <Link href="/services">View all services</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default Analytics;

