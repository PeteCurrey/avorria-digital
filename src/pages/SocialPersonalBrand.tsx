import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
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
import { ArrowRight, CheckCircle2, Users, Sparkles, X } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import { HeroBand, SectionBand } from "@/components/ContentBand";
import heroSocialBrand from "@/assets/service-social-brand.jpg";

const SocialPersonalBrand = () => {
  const painPoints = [
    "You know you should be posting on LinkedIn, but you never have time to do it consistently.",
    "Your competitors are everywhere, while your profile feels like a ghost town.",
    "You're great at what you do, but nobody knows it because you're not visible.",
    "You've tried posting, but it feels awkward and nothing seems to get traction.",
    "You want to be seen as a thought leader, but don't know where to start.",
  ];

  const personalBrandIncluded = [
    "Personal brand audit and positioning strategy.",
    "Content pillars and messaging framework.",
    "Voice and tone development that sounds like you.",
    "Profile optimisation for LinkedIn and other platforms.",
    "Authority positioning within your niche.",
  ];

  const contentSystemIncluded = [
    "Done-for-you content creation (posts, carousels, threads).",
    "Content calendar and publishing schedule.",
    "Engagement strategy and community building.",
    "Performance tracking and optimisation.",
    "Repurposing content across platforms.",
    "Ghostwriting for thought leadership pieces.",
  ];

  const timeline = [
    {
      period: "Week 1",
      title: "Discovery & positioning",
      description:
        "We get to know you, your expertise and your goals. We audit your current presence and define your unique positioning.",
    },
    {
      period: "Week 2",
      title: "Strategy & setup",
      description:
        "Content pillars, messaging framework, and profile optimisation. We build the foundation for consistent visibility.",
    },
    {
      period: "Weeks 3–4",
      title: "Launch & iterate",
      description:
        "First content goes live. We track engagement, refine the approach, and find what resonates with your audience.",
    },
    {
      period: "Ongoing",
      title: "Consistent presence",
      description:
        "Regular content creation, publishing and engagement. You show up consistently without the daily grind.",
    },
  ];

  const deliverables = [
    "Monthly content package tailored to your voice and goals.",
    "Managed publishing schedule across chosen platforms.",
    "Monthly performance reports with engagement metrics.",
    "Quarterly strategy reviews to refine positioning.",
    "Direct access to your content team.",
  ];

  const faqs = [
    {
      question: "Do you write in my voice or will it sound generic?",
      answer:
        "Everything sounds like you. We spend time upfront understanding your perspective, language and opinions, then create content that reflects your authentic voice.",
    },
    {
      question: "Which platforms do you cover?",
      answer:
        "We focus primarily on LinkedIn for B2B founders and executives, but can extend to Twitter/X, Instagram and others depending on where your audience is.",
    },
    {
      question: "How much of my time does this require?",
      answer:
        "Minimal. After the initial strategy phase, we typically need 30 minutes per month for a check-in call. Everything else is handled for you.",
    },
    {
      question: "What if I don't like the content?",
      answer:
        "You approve everything before it goes live. We'll refine until it feels right, and we get better at matching your voice over time.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Social & Personal Brand for Founders | Avorria</title>
        <meta name="description" content="Done-for-you personal brand and social content for founders who want to be the obvious choice in their market – without spending hours on LinkedIn." />
        
        <meta property="og:title" content="Social & Personal Brand for Founders | Avorria" />
        <meta property="og:description" content="Done-for-you personal brand and social content for founders who want to be visible." />
        <meta property="og:url" content="https://avorria.com/services/social-personal-brand" />
        <meta property="og:type" content="website" />
        
        <link rel="canonical" href="https://avorria.com/services/social-personal-brand" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Personal Brand & Social Media Management",
            "provider": {
              "@type": "Organization",
              "name": "Avorria",
              "url": "https://avorria.com"
            },
            "areaServed": {
              "@type": "Country",
              "name": "United Kingdom"
            },
            "description": "Done-for-you personal brand building and social content for founders and executives."
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
                "name": "Social & Personal Brand",
                "item": "https://avorria.com/services/social-personal-brand"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroBand
          headline="Be the obvious choice in your market."
          body="Done-for-you personal brand and social content for founders who want to be visible without spending hours on LinkedIn. We handle everything – you just approve and show up."
          backgroundImage={heroSocialBrand}
          cta={{ text: "Book a brand strategy call", href: "/contact" }}
          secondaryCta={{ text: "See how it works", href: "#how-it-works" }}
        />

        {/* Pain Points */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-10 text-center">
                The founder visibility problem.
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
              Your expertise should be visible. Let us handle the content while you focus on running your business.
            </p>
          </div>
        </SectionBand>

        {/* What's Included */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-16 text-center">
                What we handle.
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <ScrollReveal>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-accent" size={28} />
                    <h3 className="text-2xl font-semibold text-white border-l-4 border-accent pl-4">Personal Brand Strategy</h3>
                  </div>
                  <div className="space-y-4">
                    {personalBrandIncluded.map((item, index) => (
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
                    <Users className="text-accent" size={28} />
                    <h3 className="text-2xl font-semibold text-white border-l-4 border-accent pl-4">Content System</h3>
                  </div>
                  <div className="space-y-4">
                    {contentSystemIncluded.map((item, index) => (
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
                <h2 className="text-section-headline font-light mb-4">How it works.</h2>
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
          <OpinionatedQuote quote="Your competitors are being seen. The question is whether you want to be invisible or the obvious choice." />
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
              <h2 className="text-section-headline font-light mb-6">Ready to be visible?</h2>
              <p className="text-xl text-white/80 mb-10">
                Let's build your personal brand so you become the obvious choice in your market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">
                    Book a strategy call <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button variant="outline-dark" size="lg" asChild>
                  <Link to="/services">View all services</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default SocialPersonalBrand;