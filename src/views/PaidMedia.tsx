'use client';
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  TrendingUp,
  LineChart,
  Zap,
  CheckCircle2,
  Globe,
  Clock,
  Quote,
  Check,
  X,
  BarChart3,
  DollarSign,
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
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTestimonialsPublic } from "@/hooks/useTestimonials";
import { useIsMobile } from "@/hooks/use-mobile";

import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
const servicePaidMedia = "/assets/service-paid-media.jpg";
const heroCityscape = "/assets/hero-cityscape.jpg";
const heroPaidMediaVideo = "/assets/hero-paid-media.mp4";
const heroServicesDigital = "/assets/hero-services-digital.jpg";

const faqs = [
  {
    question: "How quickly will we see results from paid media?",
    answer: "You'll see data from day one – clicks, impressions, cost per click. Meaningful commercial results (qualified leads, pipeline) typically emerge within 4–6 weeks once we've tested offers, audiences and landing pages. We'll set clear expectations in the first strategy call.",
  },
  {
    question: "What's your minimum ad spend recommendation?",
    answer: "We typically recommend a minimum of £2,000–3,000/month in ad spend per platform to gather enough data to optimise effectively. Below that, you're guessing rather than learning. We'll advise on the right budget based on your market and goals.",
  },
  {
    question: "Do you handle creative – ads, landing pages, copy?",
    answer: "Yes. We write ad copy, design creatives and build landing pages in-house. Paid media only works when the offer, the ad and the landing experience are aligned – so we control the full chain rather than hoping a separate team delivers on time.",
  },
  {
    question: "How do you report on performance?",
    answer: "Weekly Slack or email updates with the key numbers. Monthly deep-dive reviews covering spend, leads, cost per lead, pipeline attribution and what we're changing next. You'll also have access to a live dashboard so you can check performance any time.",
  },
  {
    question: "Can you work alongside our in-house team?",
    answer: "Absolutely. We often act as the strategic and execution layer while your team handles brand, content or CRM. We'll integrate with your existing tools and workflows – no duplication, no stepping on toes.",
  },
];

const processSteps = [
  {
    phase: "Month 1",
    title: "Audit & Setup",
    description: "Audit current campaigns and tracking. Define offers, audiences and landing page strategy. Set up proper conversion tracking and attribution.",
  },
  {
    phase: "Months 2–3",
    title: "Launch & Test",
    description: "Launch initial campaigns across priority platforms. Test ad creative, audiences and offers. Rapid iteration based on early data – cut what doesn't work, scale what does.",
  },
  {
    phase: "Months 4–6",
    title: "Optimise & Scale",
    description: "Refine targeting and creative based on pipeline data. Expand to additional platforms or audiences where the numbers support it. Tune landing pages and offers based on conversion data.",
  },
  {
    phase: "Month 6+",
    title: "Expand & Compound",
    description: "Explore new campaign types and audiences. Build lookalikes from your best customers. Continually reallocate budget to highest-ROI channels.",
  },
];

const paidMediaComparisons = [
  {
    category: "Campaign Structure",
    avorria: "Offer-led campaigns with clear commercial outcomes",
    typical: "Keyword-stuffed campaigns chasing volume",
  },
  {
    category: "Tracking",
    avorria: "Full-funnel attribution from click to closed deal",
    typical: "Platform-level metrics with no CRM integration",
  },
  {
    category: "Optimisation",
    avorria: "Weekly pipeline-based optimisation cycles",
    typical: "Monthly tweaks based on CTR and CPM",
  },
  {
    category: "Reporting",
    avorria: "Pipeline and revenue attribution, live dashboards",
    typical: "Vanity metric PDFs with impressions and reach",
  },
  {
    category: "Creative",
    avorria: "In-house ads, copy and landing pages – full chain",
    typical: "Outsourced creative with no conversion focus",
  },
  {
    category: "Strategy",
    avorria: "Unified cross-platform approach tied to offers",
    typical: "Siloed platform management, no coordination",
  },
];

const platforms = [
  {
    title: "Google Ads",
    description: "Search, Display, Shopping and YouTube campaigns built around high-intent keywords and commercial queries. We capture demand at the moment people are actively looking for what you sell.",
    icon: Target,
  },
  {
    title: "Meta (Facebook & Instagram)",
    description: "Lead gen campaigns, retargeting funnels and lookalike audiences focused on qualified prospects. We build creative that stops the scroll and landing pages that convert the click.",
    icon: Globe,
  },
  {
    title: "LinkedIn Ads",
    description: "B2B campaigns targeting decision-makers by role, company size and industry. Thought leadership, lead gen and retargeting designed for longer sales cycles and higher-value deals.",
    icon: BarChart3,
  },
];

const sectionNavItems = [
  { id: "hero", label: "Overview" },
  { id: "intro", label: "Our Approach" },
  { id: "pain-points", label: "The Problem" },
  { id: "how-we-work", label: "How We Work" },
  { id: "process", label: "Process" },
  { id: "comparison", label: "Why Us" },
  { id: "platforms", label: "Platforms" },
  { id: "testimonials", label: "Clients" },
  { id: "faq", label: "FAQs" },
];

const PaidMedia = () => {
  const { data: testimonials } = useTestimonialsPublic();
  const activeSection = useScrollSpy(sectionNavItems, 120);
  const isMobile = useIsMobile();

  return (
    <>
      
      <ServiceSchema
        name="Paid Media Management"
        description="Google, Meta and LinkedIn campaigns structured around offers, not random keywords. We cut any spend that can't justify itself in hard numbers."
        url="/services/paid-media"
        aggregateRating={{ ratingValue: 4.8, reviewCount: 34 }}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Paid Media", url: "/services/paid-media" },
      ]} />

      {/* Scroll-spy dot navigation */}
      <SectionNav sections={sectionNavItems} activeId={activeSection} />

      <div className="min-h-screen">
        {/* -- 1. HERO: Video Background (desktop) / Image (mobile) -- */}
        <section id="hero" className="relative overflow-hidden" style={{ minHeight: "75vh" }}>
          <div className="absolute inset-0">
            {!isMobile ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={servicePaidMedia}
                className="w-full h-full object-cover"
              >
                <source src={heroPaidMediaVideo} type="video/mp4" />
              </video>
            ) : (
              <img src={servicePaidMedia} alt="Paid media management and PPC services for B2B businesses - Avorria Digital" className="w-full h-full object-cover" loading="eager" />
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
                Paid Media Management
              </motion.span>

              <motion.h1
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]"
              >
                Paid media that ties spend to{" "}
                <span className="text-accent font-normal">pipeline.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
              >
                Google, Meta and LinkedIn campaigns structured around offers, not random keywords.
                We cut any spend that can't justify itself in hard numbers.
              </motion.p>

              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button variant="accent" size="lg" asChild>
                  <Link href="/contact">
                    Book Strategy Call
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline-dark" size="lg" asChild>
                  <Link href="/free-seo-website-audit">Get Free Audit</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* -- 2. LOGO WALL -- */}
        <div className="bg-background border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <LogoWall title="Trusted by growing businesses" />
          </div>
        </div>

        {/* -- 3. INTRODUCTION -- */}
        <section id="intro" className="relative">
          <FloatingElements />
          <SectionBand background="light">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <ScrollReveal>
                  <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-6 leading-tight">
                    What paid media should actually do for your business
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Paid media is the fastest way to put your offer in front of the right people – but
                      most businesses treat it like a tap they can't control. Money goes in, "impressions"
                      come out, and nobody can connect the dots between ad spend and actual revenue.
                    </p>
                    <p>
                      The problem is rarely the platforms. It's the strategy. Campaigns built around keywords
                      instead of offers. Audiences defined by demographics instead of buying signals. Landing
                      pages that talk about the company instead of the customer's problem.
                    </p>
                    <p>
                      We build paid media campaigns the way a commercial team would: start with the offer,
                      work backwards to the audience, and measure everything against pipeline – not clicks.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { icon: Target, title: "Offer-led campaigns", desc: "Every campaign maps to a specific offer and commercial outcome." },
                      { icon: LineChart, title: "Full-funnel tracking", desc: "Connect ad spend to leads, opportunities and revenue." },
                      { icon: Clock, title: "Weekly optimisation", desc: "We kill what doesn't work and scale what does – fast." },
                      { icon: Globe, title: "Unified cross-platform", desc: "Coordinated messaging, offers and landing pages across platforms." },
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

        {/* -- 4. PAIN POINTS -- */}
        <section id="pain-points">
          <SectionBand background="gradient" padding="large">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-center">
                  Tired of spending on ads that don't convert?
                </h2>
                <p className="text-lg text-white/70 text-center mb-12 max-w-2xl mx-auto">
                  If any of these sound familiar, your paid media isn't working as hard as it should be.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-10">
                  <ul className="space-y-6">
                    {[
                      "Burning budget on \"awareness\" campaigns with no clear path to revenue",
                      "Agency optimising for CTR and CPM while cost per qualified lead quietly doubles",
                      "Disconnected channels running in silos with no unified strategy",
                      "Attribution chaos – can't prove which campaigns actually drive pipeline",
                    ].map((item, i) => (
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

        <OpinionatedQuote quote="If your agency is reporting on impressions and click-through rates but can't tell you cost per qualified lead, they're measuring the wrong things. Vanity metrics are how agencies hide underperformance." />

        {/* -- 5. HOW WE APPROACH -- */}
        <section id="how-we-work">
          <SectionBand background="dark" padding="large">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6">
                    How Avorria approaches paid media
                  </h2>
                  <p className="text-lg text-white/70 max-w-2xl mx-auto">
                    We structure campaigns around commercial offers, not vanity metrics. Every pound
                    spent needs to justify itself in leads, opportunities or revenue.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  { icon: Target, title: "Offer-led campaign structure", description: "We build campaigns around what you're actually selling – not generic \"brand awareness\". Every campaign maps to a specific offer, landing page, and commercial outcome." },
                  { icon: LineChart, title: "Pipeline-first tracking", description: "We connect ad spend to leads, opportunities and revenue using proper attribution. You'll know exactly which campaigns are worth scaling and which should be cut." },
                  { icon: TrendingUp, title: "Ruthless optimisation", description: "Weekly reviews of what's working and what's not. We kill underperforming campaigns fast and double down on winners. No emotional attachment to creative that doesn't convert." },
                  { icon: Zap, title: "Multi-channel coordination", description: "Google Search, Meta, LinkedIn – we run them as a coordinated system, not separate campaigns. Messaging, offers and landing pages stay consistent while tactics adapt to each platform." },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group p-8 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors border border-white/10">
                      <item.icon className="text-accent" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionBand>
        </section>

        {/* -- 6. DELIVERABLES -- */}
        <SectionBand background="light">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-4">
                  What you get as a client
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "A campaign strategy document before we spend a penny",
                "Weekly performance snapshots with the numbers that matter",
                "Monthly deep-dive reviews with pipeline attribution",
                "Quarterly budget recommendations based on data",
                "Access to a live reporting dashboard",
                "In-house ad copy, creatives and landing pages",
                "Dedicated strategist and direct Slack access",
                "Full ownership of all assets we create",
                "Transparent spend and management fee tracking",
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

        {/* -- 7. PROCESS: Horizontal Scroll -- */}
        <section id="process">
          <SectionBand background="dark" overflowVisible={true}>
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">
                    How a typical engagement runs
                  </h2>
                  <p className="text-lg text-white/70 max-w-2xl mx-auto">
                    A clear, phased approach that gets to pipeline impact fast.
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

        {/* -- 8. COMPARISON GRID -- */}
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
                Avorria vs. typical paid media agencies
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

              {paidMediaComparisons.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, x: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`grid grid-cols-3 group hover:bg-muted/30 transition-colors ${
                    index < paidMediaComparisons.length - 1 ? "border-b border-border" : ""
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

        {/* -- 9. PLATFORMS -- */}
        <section id="platforms">
          <SectionBand background="dark" padding="large">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">
                    Platforms we manage
                  </h2>
                  <p className="text-lg text-white/70 max-w-2xl mx-auto">
                    We don't spread thin across every platform. We focus on where your audience actually buys.
                  </p>
                </div>
              </ScrollReveal>
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {platforms.map((platform, i) => (
                  <motion.div
                    key={platform.title}
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-8 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm h-full"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-6 border border-white/10">
                      <platform.icon className="text-accent" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{platform.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{platform.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionBand>
        </section>

        {/* -- 10. TESTIMONIALS -- */}
        {testimonials && testimonials.length > 0 && (
          <section id="testimonials">
            <SectionBand background="gradient">
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
                        "{t.quote}"
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

        {/* -- 11. FAQ -- */}
        <section id="faq">
          <SectionBand background="dark">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-4">
                    Paid media FAQ
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

        {/* -- 12. FINAL CTA -- */}
        <section>
          <ParallaxBackground
            backgroundImage={heroCityscape}
            overlay="dark"
            speed={0.2}
            minHeight="auto"
          >
            <div className="py-24 md:py-32">
              <div className="max-w-3xl mx-auto px-6 text-center">
                <ScrollReveal>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-white">
                    Ready to make your paid media accountable?
                  </h2>
                  <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                    Book a free strategy call and we'll audit your current campaigns, show you where
                    budget is being wasted, and build a plan focused on pipeline and revenue.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="accent" size="lg" asChild>
                      <Link href="/contact">
                        Book Strategy Call
                        <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                    <Button variant="outline-dark" size="lg" asChild>
                      <Link href="/pricing">View Pricing</Link>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ParallaxBackground>
        </section>
      </div>
    </>
  );
};

export default PaidMedia;


