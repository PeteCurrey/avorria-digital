import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, X, TrendingUp } from "lucide-react";
import { HeroBand, SectionBand, ContentBand } from "@/components/ContentBand";
import serviceWebDesign from "@/assets/service-web-design.jpg";

const WebDesign = () => {
  const painPoints = [
    "You've had a redesign, but enquiries and sales barely moved.",
    "Your homepage looks like a brochure, not a clear path to 'work with us'.",
    "Service pages list what you do but don't explain outcomes or process.",
    "There's no obvious CTA or next step above the fold.",
    "Tracking is patchy, so you're guessing which pages actually convert.",
  ];

  const whatWeBuild = {
    websites: [
      "High-conversion homepages focused on your primary offers.",
      "Service pages that sell outcomes, not just list features.",
      "About and proof sections that build trust fast.",
      "Clear site navigation and journeys for different types of visitors.",
    ],
    landingPages: [
      "Campaign-specific landing pages for ads and outbound.",
      "Lead magnet and webinar funnels.",
      "Simple, focused flows for audits, demo requests and estimates.",
      "Testing plans to improve performance over time.",
    ],
    underTheHood: [
      "Modern, fast, SEO-friendly stack.",
      "Responsive design across all devices.",
      "Clean, maintainable code and reusable components.",
      "Tracking and event setup for forms, calls, scrolls and key interactions.",
    ],
  };

  const approach = [
    {
      step: "01",
      title: "Discovery & diagnosis",
      description:
        "We review your current site, analytics and funnel. We map where visitors drop off, what they're missing and what needs to change to support your sales process.",
    },
    {
      step: "02",
      title: "Wireframes & messaging",
      description:
        "We design the structure and messaging first: what goes where, which proof sits by which CTA, how we handle objections and educate different buyer types.",
    },
    {
      step: "03",
      title: "Visual design & build",
      description:
        "Once the bones are right, we apply your brand and build the site or pages on a modern stack. Fast, responsive and easy to extend.",
    },
    {
      step: "04",
      title: "Launch, measure, refine",
      description:
        "We don't throw it live and disappear. We monitor behaviour, test improvements and refine based on actual performance, not opinions.",
    },
  ];

  const goodSigns = [
    "Visitors understand what you do and who you're for in under five seconds.",
    "There's always a clear, relevant next step: book a call, request an audit, view pricing.",
    "Social proof and case studies are placed where they actually influence decisions.",
    "Forms are short, focused and explain what happens after you submit.",
    "Your team can tell, in hard numbers, how the site is contributing to pipeline.",
  ];

  const caseSnippets = [
    "Rebuilt homepage, service pages and contact flow – +63% increase in qualified enquiries in three months with the same traffic.",
    "Simplified landing pages and added proof around the offer – 34% drop in cost per lead from paid campaigns.",
  ];

  const faqs = [
    {
      question: "Do you only do full rebuilds?",
      answer:
        "No. Sometimes a focused set of changes to structure, messaging and key pages is more effective than a ground-up rebuild. We'll tell you honestly which route makes sense.",
    },
    {
      question: "Can you work with our existing CMS or tech stack?",
      answer:
        "In most cases, yes. If your current setup is genuinely holding you back, we'll recommend a sensible migration path instead of a shiny rebuild for the sake of it.",
    },
    {
      question: "Who writes the copy?",
      answer:
        "We can handle copy end-to-end, collaborate with your team or provide detailed wireframes and messaging outlines for your writers to work from.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Smaller landing page or funnel projects can be turned around in weeks. Full website rebuilds usually run over a few months depending on complexity.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Conversion-Led Web Design & Development | Avorria</title>
        <meta name="description" content="Websites, landing pages and funnels that look sharp and sell hard. Built on a modern stack with SEO, speed and CRO wired in from day one." />
        
        <meta property="og:title" content="Conversion-Led Web Design & Development | Avorria" />
        <meta property="og:description" content="Websites, landing pages and funnels that look sharp and sell hard. Built on a modern stack with SEO, speed and CRO wired in from day one." />
        <meta property="og:url" content="https://avorria.com/services/web-design" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Conversion-Led Web Design & Development | Avorria" />
        <meta name="twitter:description" content="Websites, landing pages and funnels that look sharp and sell hard. Built on a modern stack with SEO, speed and CRO wired in from day one." />
        
        <link rel="canonical" href="https://avorria.com/services/web-design" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Web Design and Development",
            "provider": {
              "@type": "Organization",
              "name": "Avorria",
              "url": "https://avorria.com"
            },
            "areaServed": {
              "@type": "Country",
              "name": "United Kingdom"
            },
            "description": "Websites, landing pages and funnels that look sharp and sell hard. Built on a modern stack with SEO, speed and CRO wired in from day one."
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
                "name": "Web Design",
                "item": "https://avorria.com/services/web-design"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroBand
          headline="Websites and funnels that look sharp and sell hard."
          body="We design and build web experiences that feel like top-tier agency work – but every section, layout and CTA is engineered for conversions, not awards."
          cta={{ text: "Talk about a rebuild", href: "/contact" }}
          secondaryCta={{ text: "Request a website teardown", href: "/free-seo-website-audit?focus=web" }}
          minHeight="70vh"
        />

        {/* Pain Points - Dark gradient */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12 text-center">
              If your site looks good but converts badly, it's not "fine".
            </h2>
            <div className="space-y-4 mb-10">
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                  <X className="text-accent flex-shrink-0 mt-0.5" size={22} />
                  <span className="text-lg text-white/90">{point}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xl text-white font-medium">
              Pretty is optional. Clarity and conversion are not. Your site is either helping your pipeline or quietly taxing it.
            </p>
          </div>
        </SectionBand>

        {/* Content Band - What we build visual */}
        <ContentBand
          subheadline="What we build"
          headline="Websites, landing pages & funnels."
          body="Every asset we create is designed to look premium and perform commercially – from high-conversion homepages to campaign-specific landing pages."
          image={serviceWebDesign}
          imageAlt="Web design showcase"
          background="dark"
          reverse
        >
          <div className="grid grid-cols-1 gap-3 mt-6">
            {whatWeBuild.websites.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="text-accent flex-shrink-0 mt-0.5" size={18} />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </ContentBand>

        {/* Full What We Build - Light section */}
        <SectionBand background="light" padding="large">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-16 text-center text-foreground">
              What Avorria designs and builds.
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Websites</h3>
                <div className="space-y-4">
                  {whatWeBuild.websites.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={18} />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Landing pages & funnels</h3>
                <div className="space-y-4">
                  {whatWeBuild.landingPages.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={18} />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Under the hood</h3>
                <div className="space-y-4">
                  {whatWeBuild.underTheHood.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={18} />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionBand>

        {/* Our Approach - Dark mesh */}
        <SectionBand background="mesh" padding="large">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">Design, dev and CRO in one loop.</h2>
            </div>
            <div className="space-y-6">
              {approach.map((phase, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 p-8 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/20 text-accent text-xl font-semibold">
                      {phase.step}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">{phase.title}</h3>
                    <p className="text-white/70 leading-relaxed text-lg">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* What Good Looks Like - Light */}
        <SectionBand background="light" padding="large">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12 text-foreground text-center">
              Signs your site is finally doing its job.
            </h2>
            <div className="space-y-4">
              {goodSigns.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card">
                  <CheckCircle2 className="text-accent flex-shrink-0 mt-0.5" size={22} />
                  <span className="text-foreground text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* Case Snippets - Dark gradient */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 mb-12">
              {caseSnippets.map((snippet, index) => (
                <div key={index} className="flex items-start gap-5 p-8 rounded-xl bg-white/5 border border-white/10">
                  <TrendingUp className="text-accent flex-shrink-0" size={32} />
                  <p className="text-white text-xl leading-relaxed">{snippet}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" asChild className="border-white/20 text-white hover:bg-white/10">
                <Link to="/free-seo-website-audit?focus=web">Request a website teardown</Link>
              </Button>
              <Button variant="accent" size="lg" asChild>
                <Link to="/websites-we-would-fire">View 'Websites We'd Fire' gallery</Link>
              </Button>
            </div>
          </div>
        </SectionBand>

        {/* Web Design by Location - Light */}
        <SectionBand background="light" padding="default">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-light mb-4 text-foreground">Web design by location</h2>
              <p className="text-lg text-muted-foreground">
                Looking for a local web design partner?
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Web Design Sheffield</h3>
                <p className="text-muted-foreground mb-6">
                  Conversion-focused websites for Sheffield businesses.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/web-design/sheffield">
                    Learn more
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
              <div className="p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Web Design Across the UK</h3>
                <p className="text-muted-foreground mb-6">
                  We work with businesses across the UK and beyond.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contact">
                    Get in touch
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </SectionBand>

        {/* FAQ - Dark */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">FAQ – Web Design & Dev</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/10 bg-white/5 px-6 rounded-lg"
                >
                  <AccordionTrigger className="text-left font-semibold text-white hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionBand>

        {/* Final CTA - Mesh */}
        <SectionBand background="mesh" padding="large">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Need your website to behave like a sales asset?
            </h2>
            <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto">
              Send us your current site and we'll show you exactly what we'd change, in what order, and why – no drama, no jargon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/free-seo-website-audit?focus=web">
                  Request a website teardown
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                <Link to="/contact">Talk about a rebuild</Link>
              </Button>
            </div>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default WebDesign;
