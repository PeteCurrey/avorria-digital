import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, Mail, FileText, X } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import { HeroBand, SectionBand } from "@/components/ContentBand";
import heroContentEmail from "@/assets/service-content-email.jpg";
const ContentEmail = () => {
  const painPoints = ["You've got a blog, but it's not driving any leads – just random traffic that never converts.", "Your email list is gathering dust because nobody knows what to send or when.", "Content gets produced, but there's no strategy connecting it to your sales process.", "You're creating content for the sake of it, without clear commercial intent.", "Your email open rates are fine, but nothing actually happens after people read them."];
  const contentIncluded = ["Content strategy tied to your buyer journey and commercial goals.", "Keyword research focused on high-intent, bottom-of-funnel terms.", "Topic clusters and pillar content planning.", "Long-form SEO content that ranks and converts.", "Case studies, comparison pages and sales enablement assets.", "Content refresh and optimisation for existing assets."];
  const emailIncluded = ["Email strategy and sequence mapping.", "Welcome sequences that educate and qualify.", "Nurture sequences for leads not ready to buy.", "Re-engagement campaigns for cold lists.", "Newsletter strategy and execution.", "Integration with your CRM and sales process."];
  const timeline = [{
    period: "Week 1–2",
    title: "Audit & strategy",
    description: "We review your existing content and email setup, identify gaps and map out a plan tied to your sales process and commercial goals."
  }, {
    period: "Weeks 3–6",
    title: "Foundation content",
    description: "Launch core content assets – pillar pages, key blog posts, and foundational email sequences that work while you sleep."
  }, {
    period: "Months 2–3",
    title: "Scale & optimise",
    description: "Expand content clusters, refine email sequences based on data, and build out sales enablement materials."
  }, {
    period: "Ongoing",
    title: "Compound & convert",
    description: "Regular content production, email campaigns, and continuous optimisation based on what's actually driving pipeline."
  }];
  const deliverables = ["Monthly content calendar with clear commercial rationale.", "Email sequences mapped to buyer journey stages.", "Performance dashboards showing content traffic, engagement and leads.", "Regular optimisation recommendations based on real data.", "Quarterly strategy reviews to refine approach."];
  const faqs = [{
    question: "Do you write the content or just strategy?",
    answer: "Both. We can handle everything from strategy through to writing and publishing, or work alongside your in-house team to execute on our plans."
  }, {
    question: "What email platforms do you work with?",
    answer: "Most of them – HubSpot, ActiveCampaign, Mailchimp, ConvertKit, Klaviyo and more. We'll work with what you have or recommend alternatives if needed."
  }, {
    question: "How do you measure content success?",
    answer: "Traffic and rankings matter, but we focus on leads and pipeline. Every piece of content should have a clear role in moving people toward a conversion."
  }, {
    question: "How often should we be sending emails?",
    answer: "It depends on your audience and offer. We'll help you find the right cadence that keeps you top of mind without burning your list."
  }];
  return <>
      <Helmet>
        <title>Content & Email Marketing That Drives Pipeline | Avorria</title>
        <meta name="description" content="Strategic content marketing and email automation that attracts the right people and moves them through your funnel – not just blog posts and newsletters." />
        
        <meta property="og:title" content="Content & Email Marketing That Drives Pipeline | Avorria" />
        <meta property="og:description" content="Strategic content marketing and email automation that attracts the right people and moves them through your funnel." />
        <meta property="og:url" content="https://avorria.com/services/content-email" />
        <meta property="og:type" content="website" />
        
        <link rel="canonical" href="https://avorria.com/services/content-email" />
        
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Content & Email Marketing",
          "provider": {
            "@type": "Organization",
            "name": "Avorria",
            "url": "https://avorria.com"
          },
          "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
          },
          "description": "Strategic content marketing and email automation that drives qualified leads and pipeline."
        })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://avorria.com"
          }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://avorria.com/services"
          }, {
            "@type": "ListItem",
            "position": 3,
            "name": "Content & Email",
            "item": "https://avorria.com/services/content-email"
          }]
        })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroBand headline="Content and email that feed your pipeline." body="We create strategic content that attracts the right people and email sequences that move them through your funnel – not just blog posts and newsletters that nobody reads." backgroundImage={heroContentEmail} cta={{
        text: "Book a content strategy call",
        href: "/contact"
      }} secondaryCta={{
        text: "Get a free content audit",
        href: "/free-seo-website-audit"
      }} />

        {/* Pain Points */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline mb-10 font-extralight text-4xl text-center">
                Sound familiar?
              </h2>
            </ScrollReveal>
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-10">
              <ul className="space-y-5">
                {painPoints.map((point, index) => <li key={index} className="flex items-start text-white/80">
                    <X className="text-accent mr-4 mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg leading-relaxed">{point}</span>
                  </li>)}
              </ul>
            </div>
            <p className="text-center text-xl text-white/90 mt-10 font-medium max-w-3xl mx-auto">
              You don't need more content for content's sake. You need a clear system that attracts, educates and converts the right people.
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
                    <FileText className="text-accent" size={28} />
                    <h3 className="text-2xl font-semibold text-white border-l-4 border-accent pl-4">Content Marketing</h3>
                  </div>
                  <div className="space-y-4">
                    {contentIncluded.map((item, index) => <div key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                        <p className="text-white/80">{item}</p>
                      </div>)}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Mail className="text-accent" size={28} />
                    <h3 className="text-2xl font-semibold text-white border-l-4 border-accent pl-4">Email Marketing</h3>
                  </div>
                  <div className="space-y-4">
                    {emailIncluded.map((item, index) => <div key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                        <p className="text-white/80">{item}</p>
                      </div>)}
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
              {timeline.map((phase, index) => <ScrollReveal key={index}>
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
                </ScrollReveal>)}
            </div>
          </div>
        </SectionBand>

        {/* Deliverables */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-12 text-center">What you get as a client.</h2>
            </ScrollReveal>
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-10 space-y-6">
              <ul className="space-y-5">
                {deliverables.map((item, index) => <li key={index} className="flex items-start">
                    <CheckCircle2 className="text-accent mr-4 mt-1 flex-shrink-0" size={22} />
                    <span className="text-white/90 text-lg">{item}</span>
                  </li>)}
              </ul>
            </div>
          </div>
        </SectionBand>

        {/* Quote */}
        <SectionBand background="dark" padding="large">
          <OpinionatedQuote quote="If your content isn't connected to your sales process, it's just expensive noise." />
        </SectionBand>

        {/* FAQs */}
        <SectionBand background="mesh" padding="large">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-12 text-center">FAQs</h2>
            </ScrollReveal>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => <AccordionItem key={index} value={`faq-${index}`} className="border border-white/10 rounded-xl bg-black/20 px-6 data-[state=open]:bg-black/30">
                  <AccordionTrigger className="text-lg text-white hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </SectionBand>

        {/* CTA */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-6">Ready to make content work?</h2>
              <p className="text-xl text-white/80 mb-10">
                Let's build a content and email system that actually drives pipeline, not just page views.
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
    </>;
};
export default ContentEmail;