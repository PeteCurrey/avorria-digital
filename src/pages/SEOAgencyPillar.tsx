import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import { HeroBand, SectionBand } from "@/components/ContentBand";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import heroImage from "@/assets/service-seo.jpg";
import { locations } from "@/data/locations";

const SEOAgencyPillar = () => {
  const painPoints = [
    "You get long reports but still don't know what's actually been done each month.",
    "Rankings may be up, but leads and revenue haven't shifted.",
    "Nobody can clearly explain how SEO ties into your overall funnel and sales process.",
    "You've got content, but no clear structure, clusters or internal linking strategy.",
    "Technical issues and slow pages keep getting 'added to the list' but never fixed.",
  ];

  const included = {
    technical: [
      "Full technical audit and prioritised fix list.",
      "Site architecture and internal linking strategy.",
      "Core Web Vitals, speed and crawlability improvements.",
      "Schema and structured data setup where relevant.",
    ],
    onPage: [
      "Page-level optimisation for key commercial pages.",
      "Title, meta, headings and content tuned for intent, not keyword stuffing.",
      "Improved UX elements that support conversion (CTAs, proof, clarity).",
    ],
    content: [
      "Keyword research focused on commercial and high-intent terms.",
      "Topic clusters and content plans tied to stages of your buyer journey.",
      "Briefs and/or full content creation where required.",
      "Ongoing optimisation of existing content.",
    ],
    local: [
      "Local landing pages planned and built properly.",
      "Google Business Profile optimisation and management.",
      "Citations and local SERP assets (where they matter).",
    ],
  };

  const timeline = [
    { period: "Month 0–1", title: "Audit & foundations", description: "Technical and content audit. Tracking and analytics clean-up. Quick on-page wins on high-impact pages." },
    { period: "Months 2–3", title: "Structure & content", description: "Implement core technical fixes. Roll out new information architecture and internal linking. Launch priority content and update existing assets." },
    { period: "Months 4–6", title: "Compounding gains", description: "Expand content clusters. Strengthen ranking positions for core terms. Tune pages and CTAs based on real conversion data." },
    { period: "Month 6+", title: "Scale and refine", description: "Double down where we see strongest ROI. Explore new keyword sets and assets. Continually reallocate effort based on what the data actually shows." },
  ];

  const faqs = [
    { question: "How long until we see results?", answer: "It depends where you're starting from, but most clients see early movement in 2–3 months and meaningful commercial impact in 4–6 months. We'll be clear about realistic timelines upfront." },
    { question: "Do you lock us into long contracts?", answer: "No. We normally recommend at least a 6-month runway for SEO, but we don't hide behind punitive long-term contracts." },
    { question: "Can you work with our in-house dev/content team?", answer: "Yes. We can either handle implementation end-to-end, or act as the strategic and technical layer that briefs your internal teams." },
    { question: "Will SEO replace paid ads?", answer: "Not usually. SEO and paid work best together – SEO for compounding inbound demand, paid for speed and control. We'll help you balance both." },
  ];

  const ukLocations = locations.filter(l => l.countryCode === "GB");
  const usLocations = locations.filter(l => l.countryCode === "US");
  const auLocations = locations.filter(l => l.countryCode === "AU");
  const nzLocations = locations.filter(l => l.countryCode === "NZ");
  const caLocations = locations.filter(l => l.countryCode === "CA");

  return (
    <>
      <ServiceSchema
        name="SEO Agency Services"
        description="Technical SEO, content strategy and organic search optimisation for B2B and service businesses. We focus on commercial keywords that drive qualified leads and revenue."
        url="/seo-agency"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 47 }}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "SEO Agency", url: "/seo-agency" }
      ]} />
      <SEOHead
        title="SEO Agency | Performance-Focused SEO Services"
        description="Expert SEO agency for B2B and service businesses. Technical SEO audits, content strategy, local SEO and on-page optimisation focused on commercial keywords that drive qualified leads."
        canonical="/seo-agency"
        keywords={["SEO agency", "SEO services", "technical SEO", "content strategy", "local SEO", "B2B SEO", "organic search"]}
      />

      <div className="min-h-screen">
        <HeroBand
          headline="SEO that connects rankings to revenue."
          body="We combine technical SEO, content strategy and on-site optimisation to win the searches that actually lead to pipeline – then remove the friction that stops those visitors becoming customers."
          backgroundImage={heroImage}
          cta={{ text: "Book an SEO strategy call", href: "/contact" }}
          secondaryCta={{ text: "Get a free SEO audit", href: "/free-seo-website-audit" }}
        />

        {/* Pain Points */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-10 text-center">
                If you're already paying for SEO, some of this might sting.
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

        {/* What's Included */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-16 text-center">
                What Avorria SEO actually covers.
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <ScrollReveal>
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">Technical & structure</h3>
                  <div className="space-y-4">
                    {included.technical.map((item, index) => (
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
                  <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">On-page optimisation</h3>
                  <div className="space-y-4">
                    {included.onPage.map((item, index) => (
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
                  <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">Content & keyword strategy</h3>
                  <div className="space-y-4">
                    {included.content.map((item, index) => (
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
                  <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">Local & multi-location SEO</h3>
                  <div className="space-y-4">
                    {included.local.map((item, index) => (
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

        {/* Timeline */}
        <SectionBand background="mesh" padding="large">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-16 text-center">How a typical SEO engagement runs.</h2>
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

        {/* Location Pages */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-section-headline font-light mb-6 text-center">SEO services by location</h2>
              <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
                We deliver results-focused SEO across the UK, USA, Australia, New Zealand and Canada.
              </p>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <ScrollReveal>
                <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">United Kingdom</h3>
                <div className="grid grid-cols-2 gap-3">
                  {ukLocations.map((location) => (
                    <Link
                      key={location.id}
                      to={`/seo-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      SEO {location.city} →
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
                      to={`/seo-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      SEO {location.city} →
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
                      to={`/seo-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      SEO {location.city} →
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
                      to={`/seo-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      SEO {location.city} →
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
                      to={`/seo-agency/${location.slug}`}
                      className="text-white/70 hover:text-accent transition-colors text-sm"
                    >
                      SEO {location.city} →
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
              <h2 className="text-section-headline font-light mb-6">Ready to talk SEO?</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Book a free strategy call to discuss your organic search goals, or request a free SEO audit of your site.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">
                    Book strategy call <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/free-seo-website-audit">Get free SEO audit</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default SEOAgencyPillar;
