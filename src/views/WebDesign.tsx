'use client';
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  X,
  TrendingUp,
  Palette,
  Code2,
  Gauge,
  LayoutTemplate,
  Layers,
  MousePointerClick,
  Quote,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionBand } from "@/components/ContentBand";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { LogoWall } from "@/components/LogoWall";
import HorizontalScroll from "@/components/HorizontalScroll";
import SectionNav from "@/components/SectionNav";
import ParallaxBackground from "@/components/ParallaxBackground";
import FloatingElements from "@/components/FloatingElements";
import { StickyImageSection } from "@/components/StickyImageSection";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTestimonialsPublic } from "@/hooks/useTestimonials";

import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
const serviceWebDesign = "/assets/service-web-design.jpg";
const heroCityscape = "/assets/hero-cityscape.jpg";
const heroWebDesignVideo = "/assets/hero-web-design.mp4";
const heroServicesDigital = "/assets/hero-services-digital.jpg";
import { useIsMobile } from "@/hooks/use-mobile";
import { locations } from "@/data/locations";

const painPoints = [
  "You've had a redesign, but enquiries and sales barely moved.",
  "Your homepage looks like a brochure, not a clear path to 'work with us'.",
  "Service pages list what you do but don't explain outcomes or process.",
  "There's no obvious CTA or next step above the fold.",
  "Tracking is patchy, so you're guessing which pages actually convert.",
];

const processSteps = [
  {
    phase: "Week 1-2",
    title: "Discovery & Diagnosis",
    description: "We review your current site, analytics and funnel. We map where visitors drop off, what they're missing and what needs to change to support your sales process.",
  },
  {
    phase: "Week 3-4",
    title: "Wireframes & Messaging",
    description: "We design the structure and messaging first: what goes where, which proof sits by which CTA, how we handle objections and educate different buyer types.",
  },
  {
    phase: "Week 5-8",
    title: "Visual Design & Build",
    description: "Once the bones are right, we apply your brand and build the site on a modern stack. Fast, responsive, SEO-ready and easy to extend.",
  },
  {
    phase: "Week 9+",
    title: "Launch, Measure, Refine",
    description: "We don't throw it live and disappear. We monitor behaviour, test improvements and refine based on actual performance, not opinions.",
  },
];

const webDesignComparisons = [
  {
    category: "Strategy",
    avorria: "Conversion-first design driven by buyer journeys",
    typical: "Pretty templates with no commercial logic",
  },
  {
    category: "Messaging",
    avorria: "Copy written around outcomes and objections",
    typical: "Generic 'we are passionate' filler copy",
  },
  {
    category: "Performance",
    avorria: "Core Web Vitals, SEO and speed built in from day one",
    typical: "Speed as an afterthought, bloated plugins",
  },
  {
    category: "CRO",
    avorria: "Every page has a clear CTA and conversion path",
    typical: "Contact page buried in the footer",
  },
  {
    category: "Post-Launch",
    avorria: "Ongoing measurement, testing and refinement",
    typical: "Handover and disappear after launch",
  },
  {
    category: "Ownership",
    avorria: "You own everything - code, design, assets",
    typical: "Locked into proprietary platforms or builders",
  },
];

const faqs = [
  {
    question: "Do you only do full rebuilds?",
    answer: "No. Sometimes a focused set of changes to structure, messaging and key pages is more effective than a ground-up rebuild. We'll tell you honestly which route makes sense.",
  },
  {
    question: "Can you work with our existing CMS or tech stack?",
    answer: "In most cases, yes. If your current setup is genuinely holding you back, we'll recommend a sensible migration path instead of a shiny rebuild for the sake of it.",
  },
  {
    question: "Who writes the copy?",
    answer: "We can handle copy end-to-end, collaborate with your team or provide detailed wireframes and messaging outlines for your writers to work from.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Smaller landing page or funnel projects can be turned around in weeks. Full website rebuilds usually run over a few months depending on complexity.",
  },
  {
    question: "Can I use the Web Design Studio to brief my project?",
    answer: "Absolutely. Our interactive Studio tool walks you through purpose, structure, personality and features - then generates a professional design brief you can share with us or use internally. It's the fastest way to get aligned before a strategy call.",
  },
];

const sectionNavItems = [
  { id: "hero", label: "Overview" },
  { id: "intro", label: "What We Build" },
  { id: "pain-points", label: "The Problem" },
  { id: "process", label: "Process" },
  { id: "deliverables", label: "Deliverables" },
  { id: "comparison", label: "Why Us" },
  { id: "studio", label: "Studio" },
  { id: "testimonials", label: "Clients" },
  { id: "locations", label: "Locations" },
  { id: "faq", label: "FAQs" },
];

const WebDesign = () => {
  const { data: testimonials } = useTestimonialsPublic();
  const isMobile = useIsMobile();
  const activeSection = useScrollSpy(sectionNavItems, 120);

  const ukLocations = locations.filter(l => l.countryCode === "GB");
  const usLocations = locations.filter(l => l.countryCode === "US");
  const auLocations = locations.filter(l => l.countryCode === "AU");
  const nzLocations = locations.filter(l => l.countryCode === "NZ");
  const caLocations = locations.filter(l => l.countryCode === "CA");

  return (
    <>
      
      <ServiceSchema
        name="Web Design and Development"
        description="Websites, landing pages and funnels that look sharp and sell hard. Built on a modern stack with SEO, speed and CRO wired in from day one."
        url="/services/web-design"
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Web Design", url: "/services/web-design" },
      ]} />

      {/* Scroll-spy dot navigation */}
      <SectionNav sections={sectionNavItems} activeId={activeSection} />

      <div className="min-h-screen">
        {/* 1. HERO: Video Background (desktop) / Image (mobile) */}
        <section id="hero" className="relative overflow-hidden" style={{ minHeight: "75vh" }}>
          <div className="absolute inset-0">
            {!isMobile ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={serviceWebDesign}
                className="w-full h-full object-cover"
              >
                <source src={heroWebDesignVideo} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={serviceWebDesign} 
                alt="Conversion-focused web design and development for service businesses - Avorria Digital" 
                className="w-full h-full object-cover" 
                loading="eager" 
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[hsl(var(--background))]" />
          </div>

          <div className="relative z-10 flex flex-col justify-center min-h-[75vh] px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-accent text-sm font-medium tracking-widest uppercase mb-6"
              >
                Web Design & Development
              </motion.span>

              <motion.h1
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]"
              >
                Websites that look sharp and{" "}
                <span className="text-accent font-normal">sell hard.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
              >
                Every section, layout and CTA is engineered for conversions, not awards.
                Built on a modern stack with SEO, speed and CRO wired in from day one.
              </motion.p>

              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button variant="accent" size="lg" asChild>
                  <Link href="/contact">
                    Talk About a Rebuild
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline-dark" size="lg" asChild>
                  <Link href="/web-design/studio">
                    <Sparkles className="mr-2" size={18} />
                    Build Your Brief
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. LOGO WALL */}
        <div className="bg-background border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <LogoWall title="Trusted by growing businesses" />
          </div>
        </div>

        {/* 3. INTRODUCTION */}
        <section id="intro" className="relative">
          <FloatingElements />
          <SectionBand background="light">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <ScrollReveal>
                  <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-6 leading-tight">
                    What we design and build
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Most agency websites are designed to impress other designers - not to convert
                      visitors into customers. The result? Sites that look premium but quietly tax
                      your pipeline because nobody knows what to do next.
                    </p>
                    <p>
                      We take a different approach. Every page starts with a commercial question:
                      what does this visitor need to believe, see or do before they'll take the next
                      step? Then we design the structure, messaging and proof around that answer.
                    </p>
                    <p>
                      The result is a website that looks like top-tier agency work but performs like
                      a sales tool - because that's exactly what it is.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { icon: LayoutTemplate, title: "Conversion-first layouts", desc: "Every page has a clear purpose, hierarchy and path to the next step." },
                      { icon: Code2, title: "Modern, fast stack", desc: "SEO-friendly, responsive and built for performance from the ground up." },
                      { icon: MousePointerClick, title: "CRO wired in", desc: "Forms, CTAs and tracking set up properly so you know what's working." },
                      { icon: Layers, title: "Full ownership", desc: "You own the code, the design and every asset we create. No lock-ins." },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-lg border border-border bg-card space-y-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <item.icon className="text-accent" size={20} />
                        </div>
                        <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </SectionBand>
        </section>

        {/* 4. PAIN POINTS */}
        <section id="pain-points">
          <SectionBand background="gradient" padding="large">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-center">
                  If your site looks good but converts badly, it's not \"fine\".
                </h2>
                <p className="text-lg text-white/70 text-center mb-12 max-w-2xl mx-auto">
                  Pretty is optional. Clarity and conversion are not.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-10">
                  <ul className="space-y-6">
                    {painPoints.map((item, i) => (
                      <li key={i} className="flex items-start text-white/80">
                        <span className="text-red-400 mr-4 mt-0.5 flex-shrink-0">
                          <X size={20} />
                        </span>
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </SectionBand>
        </section>

        <OpinionatedQuote quote="A beautiful website that doesn't convert is just an expensive business card. Your site should be your hardest-working salesperson - available 24/7, never off-message, always closing." />

        {/* 5. WHAT WE BUILD: Three-column */}
        <SectionBand background="light" padding="large">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-4">
                  What Avorria designs and builds
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Websites",
                  icon: Palette,
                  items: [
                    "High-conversion homepages focused on your primary offers.",
                    "Service pages that sell outcomes, not just list features.",
                    "About and proof sections that build trust fast.",
                    "Clear navigation and journeys for different visitor types.",
                  ],
                },
                {
                  title: "Landing Pages & Funnels",
                  icon: LayoutTemplate,
                  items: [
                    "Campaign-specific landing pages for ads and outbound.",
                    "Lead magnet and webinar funnels.",
                    "Simple, focused flows for audits, demos and estimates.",
                    "Testing plans to improve performance over time.",
                  ],
                },
                {
                  title: "Under the Hood",
                  icon: Code2,
                  items: [
                    "Modern, fast, SEO-friendly stack.",
                    "Responsive design across all devices.",
                    "Clean, maintainable code and reusable components.",
                    "Tracking and event setup for forms, calls and key interactions.",
                  ],
                },
              ].map((col, ci) => (
                <ScrollReveal key={col.title} delay={ci * 0.1}>
                  <div className="p-6 rounded-xl border border-border bg-card h-full">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                      <col.icon className="text-accent" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-5">{col.title}</h3>
                    <div className="space-y-3">
                      {col.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="text-accent flex-shrink-0 mt-0.5" size={16} />
                          <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* 6. PROCESS: Horizontal Scroll */}
        <section id="process">
          <SectionBand background="dark" overflowVisible={true}>
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">
                    Design, dev and CRO in one loop
                  </h2>
                  <p className="text-lg text-white/70 max-w-2xl mx-auto">
                    A clear, phased approach from diagnosis to launch and beyond.
                  </p>
                </div>
              </ScrollReveal>

              {/* Desktop: Horizontal scroll */}
              <div className="hidden lg:block">
                <HorizontalScroll>
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex-shrink-0 w-[380px]">
                      <div className="p-8 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm h-full space-y-4">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm">
                            {index + 1}
                          </span>
                          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
                            {step.phase}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </HorizontalScroll>
              </div>

              {/* Mobile: Vertical stack */}
              <div className="lg:hidden grid md:grid-cols-2 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="p-6 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm h-full space-y-4">
                      <span className="text-accent text-sm font-semibold tracking-wider uppercase">
                        {step.phase}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionBand>
        </section>

        {/* 7. DELIVERABLES */}
        <section id="deliverables">
          <SectionBand background="light">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-4">
                    Signs your site is finally doing its job
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Visitors understand what you do and who you're for in under five seconds",
                  "There's always a clear, relevant next step on every page",
                  "Social proof and case studies are placed where they influence decisions",
                  "Forms are short, focused and explain what happens after submit",
                  "Your team can tell, in hard numbers, how the site contributes to pipeline",
                  "Core Web Vitals pass with flying colours",
                  "Every page is indexed and ranking for target keywords",
                  "Conversion tracking captures every meaningful interaction",
                  "The site looks and performs identically across all devices",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card"
                  >
                    <CheckCircle2 className="text-accent flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionBand>
        </section>

        {/* 8. COMPARISON GRID */}
        <section id="comparison" className="py-24 md:py-32 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-4">
                Avorria vs. typical web design agencies
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're not the cheapest. But here's why clients stay.
              </p>
            </motion.div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
                <div className="p-4 md:p-6 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </div>
                <div className="p-4 md:p-6 text-sm font-medium text-accent uppercase tracking-wider text-center border-x border-border">
                  Avorria
                </div>
                <div className="p-4 md:p-6 text-sm font-medium text-muted-foreground uppercase tracking-wider text-center">
                  Typical Agency
                </div>
              </div>

              {webDesignComparisons.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, x: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`grid grid-cols-3 group hover:bg-muted/30 transition-colors ${
                    index < webDesignComparisons.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="p-4 md:p-6 flex items-center">
                    <span className="font-medium text-foreground">{row.category}</span>
                  </div>
                  <div className="p-4 md:p-6 border-x border-border bg-accent/5 group-hover:bg-accent/10 transition-colors">
                    <div className="flex items-start gap-3">
                      <Check className="text-accent flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-foreground">{row.avorria}</span>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-start gap-3">
                      <X className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-muted-foreground">{row.typical}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. STUDIO CTA: Sticky Image Section */}
        <section id="studio">
          <StickyImageSection
            backgroundImage={serviceWebDesign}
            overlay="heavy"
            minHeight="auto"
          >
            <div className="py-24 md:py-32">
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <ScrollReveal>
                    <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
                      Interactive Tool
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
                      Build your design brief in minutes
                    </h2>
                    <p className="text-white/70 leading-relaxed mb-4">
                      Our Web Design Studio walks you through purpose, structure, personality and features -
                      then generates a professional design brief you can share with us or use internally.
                    </p>
                    <p className="text-white/70 leading-relaxed mb-8">
                      It's the fastest way to get aligned on scope, style and objectives before a
                      strategy call. No forms, no guesswork - just a clear brief in under 10 minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="accent" size="lg" asChild>
                        <Link href="/web-design/studio">
                          <Sparkles className="mr-2" size={18} />
                          Launch the Studio
                          <ArrowRight className="ml-2" size={20} />
                        </Link>
                      </Button>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.15}>
                    <div className="relative">
                      <div className="bg-white/[0.06] backdrop-blur-sm border border-white/15 rounded-2xl p-8 space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Sparkles className="text-accent" size={24} />
                          <span className="text-white font-semibold text-lg">Web Design Studio</span>
                        </div>
                        {[
                          { step: "1", label: "Define your purpose", desc: "Lead gen, authority hub, e-commerce or SaaS" },
                          { step: "2", label: "Choose your structure", desc: "Page count, navigation style and content depth" },
                          { step: "3", label: "Set your personality", desc: "Tone, aesthetic and brand direction" },
                          { step: "4", label: "Pick your features", desc: "Forms, integrations, animations and more" },
                          { step: "5", label: "Get your brief", desc: "Professional PDF delivered to your inbox" },
                        ].map((s) => (
                          <div key={s.step} className="flex items-start gap-4">
                            <span className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-sm font-bold flex-shrink-0">
                              {s.step}
                            </span>
                            <div>
                              <div className="text-white text-sm font-medium">{s.label}</div>
                              <div className="text-white/50 text-xs">{s.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="absolute -inset-4 bg-accent/10 blur-3xl -z-10 opacity-40" />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </StickyImageSection>
        </section>

        {/* 10. CASE SNIPPETS */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-light mb-4">Results that speak</h2>
              </div>
            </ScrollReveal>
            <div className="space-y-6 mb-12">
              {[
                "Rebuilt homepage, service pages and contact flow - +63% increase in qualified enquiries in three months with the same traffic.",
                "Simplified landing pages and added proof around the offer - 34% drop in cost per lead from paid campaigns.",
              ].map((snippet, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="flex items-start gap-5 p-8 rounded-xl bg-white/[0.04] border border-white/10">
                    <TrendingUp className="text-accent flex-shrink-0" size={28} />
                    <p className="text-white/90 text-lg leading-relaxed">{snippet}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link href="/case-studies">
                  View Case Studies <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button variant="outline-dark" size="lg" asChild>
                <Link href="/websites-we-would-fire">View 'Websites We'd Fire'</Link>
              </Button>
            </div>
          </div>
        </SectionBand>

        {/* 11. TESTIMONIALS */}
        {testimonials && testimonials.length > 0 && (
          <section id="testimonials">
            <SectionBand background="dark">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">
                      What our clients say
                    </h2>
                  </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.slice(0, 3).map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 1, y: 0 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="p-8 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm relative"
                    >
                      <Quote className="text-accent/30 mb-4" size={32} />
                      <blockquote className="text-white/80 leading-relaxed mb-6 text-sm">
                        \"{t.quote}\"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        {t.avatar_url ? (
                          <img src={t.avatar_url} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                            {t.author.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="text-white font-medium text-sm">{t.author}</div>
                          <div className="text-white/50 text-xs">{t.role}, {t.company}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SectionBand>
          </section>
        )}

        {/* 12. LOCATIONS */}
        <section id="locations">
          <SectionBand background="gradient" padding="large">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl font-light mb-6 text-center">Web design by location</h2>
                <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
                  Conversion-focused web design services across the UK, USA, Australia, New Zealand and Canada.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[
                  { title: "United Kingdom", locs: ukLocations },
                  { title: "United States", locs: usLocations },
                  { title: "Australia", locs: auLocations },
                  { title: "New Zealand", locs: nzLocations },
                  { title: "Canada", locs: caLocations },
                ].map((group) => (
                  <ScrollReveal key={group.title}>
                    <h3 className="text-xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">
                      {group.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {group.locs.map((location) => (
                        <Link
                          key={location.id}
                          href={`/web-design/${location.slug}`}
                          className="text-white/70 hover:text-accent transition-colors text-sm"
                        >
                          {location.city} →
                        </Link>
                      ))}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </SectionBand>
        </section>

        {/* 13. FAQ */}
        <section id="faq">
          <SectionBand background="dark">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-4">
                    Web design FAQ
                  </h2>
                  <p className="text-muted-foreground">
                    Straight answers to the questions we hear most.
                  </p>
                </div>
              </ScrollReveal>

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border border-border rounded-lg px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </SectionBand>
        </section>
      </div>
    </>
  );
};

export default WebDesign;
