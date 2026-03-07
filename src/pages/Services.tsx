import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Search,
  Target,
  Palette,
  Mail,
  Share2,
  BarChart3,
  CheckCircle2,
  Globe,
  TrendingUp,
  Zap,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionBand } from "@/components/ContentBand";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import SEOHead from "@/components/seo/SEOHead";
import ParallaxBackground from "@/components/ParallaxBackground";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import { ServiceStatsExplosion } from "@/components/services";
import ServiceComparisonGrid from "@/components/services/ServiceComparisonGrid";
import { LogoWall } from "@/components/LogoWall";
import { StickyImageSection } from "@/components/StickyImageSection";
import HorizontalScroll from "@/components/HorizontalScroll";
import SectionNav from "@/components/SectionNav";
import FloatingElements from "@/components/FloatingElements";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTestimonialsPublic } from "@/hooks/useTestimonials";
import heroCityscape from "@/assets/hero-cityscape.jpg";
import serviceWebDesign from "@/assets/service-web-design.jpg";
import heroServicesDigital from "@/assets/hero-services-digital.jpg";
import serviceSeo from "@/assets/service-seo.jpg";
import servicePaidMedia from "@/assets/service-paid-media.jpg";
import serviceContentEmail from "@/assets/service-content-email.jpg";
import serviceSocialBrand from "@/assets/service-social-brand.jpg";
import cityTimelapse from "@/assets/city-timelapse.mp4";

const serviceImages: Record<string, string> = {
  SEO: serviceSeo,
  "Paid Media": servicePaidMedia,
  "Web Design & Development": serviceWebDesign,
  "Content & Email Marketing": serviceContentEmail,
  "Social & Personal Brand": serviceSocialBrand,
  "Analytics & CRO": heroServicesDigital,
};

const services = [
  {
    icon: Search,
    title: "SEO",
    description:
      "Technical SEO, site architecture and on-page optimisation for real businesses – not bloggers. We fix what's broken, build the pages and content you're missing and target the keywords that attract qualified demand.",
    href: "/services/seo",
    stat: "+132%",
    statLabel: "avg organic traffic",
  },
  {
    icon: Target,
    title: "Paid Media",
    description:
      "Google, Meta and LinkedIn campaigns structured around your offers, not random keywords. We set clear CPL/ROAS targets, build conversion-focused journeys and cut anything that can't justify its spend.",
    href: "/services/paid-media",
    stat: "3.2x",
    statLabel: "avg ROAS",
  },
  {
    icon: Palette,
    title: "Web Design & Development",
    description:
      "Websites, landing pages and funnels that look sharp and sell hard. Built on a modern stack with SEO, speed and CRO wired in from day one so every visit has a clear, frictionless path to enquiry.",
    href: "/services/web-design",
    stat: "+89%",
    statLabel: "conversion rate",
  },
  {
    icon: Mail,
    title: "Content & Email Marketing",
    description:
      "Long-form content, playbooks and email sequences designed to educate buyers, warm up demand and support your sales team. No random blogs – just assets that move people to ready-to-talk.",
    href: "/services/content-email",
    stat: "+312%",
    statLabel: "email revenue",
  },
  {
    icon: Share2,
    title: "Social & Personal Brand",
    description:
      "Consistent, credible content for founders and expert teams. We turn your expertise into LinkedIn, Instagram and short-form content that builds trust and drives inbound.",
    href: "/services/social-personal-brand",
    stat: "4.7x",
    statLabel: "engagement rate",
  },
  {
    icon: BarChart3,
    title: "Analytics & CRO",
    description:
      "Tracking, dashboards and systematic CRO. We untangle GA4, tags and pixels, then continually test improvements across your site and funnels so you can reallocate budget based on truth.",
    href: "/services/analytics",
    stat: "100%",
    statLabel: "tracking accuracy",
  },
];

const faqs = [
  {
    question: "How do you decide which services a business needs?",
    answer:
      "We start with a diagnostic – a free audit of your website, analytics, SEO footprint and paid activity. From there we recommend only the channels that will move your pipeline in the next 90 days. We don't sell packages; we build a scope around what your business actually needs right now.",
  },
  {
    question: "Do we have to commit to all services at once?",
    answer:
      "No. Most clients start with one or two services – usually SEO and web design or paid media and analytics. Once those channels are generating predictable results, we layer in additional services. You're never locked in; every engagement is month-to-month after the initial build phase.",
  },
  {
    question: "How quickly will we see results?",
    answer:
      "Paid media campaigns typically show meaningful data within 2–4 weeks. SEO is a compounding channel – expect early wins in months 2–3 and significant traction by month 6. Web design projects launch in 6–10 weeks depending on scope. We set realistic timelines upfront so there are no surprises.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We specialise in B2B and service businesses – professional services, SaaS, construction, trades, healthcare and e-commerce. If you sell a considered purchase (not impulse buys), our approach is likely a strong fit. We've worked with businesses from £500k to £50M+ in revenue.",
  },
  {
    question: "How is Avorria different from other digital marketing agencies?",
    answer:
      "Three things: we only take on work where we can demonstrably impact pipeline and revenue; we build and own the assets (sites, landing pages, dashboards) rather than outsourcing to freelancers; and we report on commercial outcomes – leads, cost per acquisition, pipeline value – not vanity metrics like impressions.",
  },
  {
    question: "What does the onboarding process look like?",
    answer:
      "After the strategy call we run a 2-week discovery sprint: audit your current digital presence, map your buyer journey, review competitor positioning and build a prioritised 90-day roadmap. You'll have a named strategist and a dedicated Slack channel from day one.",
  },
];

const processSteps = [
  {
    phase: "Week 1–2",
    title: "Diagnostic & Discovery",
    description:
      "We audit your website, analytics, SEO footprint, ad accounts and competitor landscape. You get a blunt assessment of what's working, what isn't and where the biggest opportunities sit.",
  },
  {
    phase: "Week 3–4",
    title: "Strategy & Roadmap",
    description:
      "We build a prioritised 90-day plan with clear KPIs, channel recommendations and a phased timeline. No 40-page decks – just the decisions that matter and the order to execute them.",
  },
  {
    phase: "Month 2–3",
    title: "Build & Launch",
    description:
      "We execute the highest-impact items first: landing pages, ad campaigns, technical SEO fixes, tracking setup. Every deliverable is reviewed with you before it goes live.",
  },
  {
    phase: "Month 4+",
    title: "Optimise & Scale",
    description:
      "With data flowing, we run weekly optimisation cycles – adjusting bids, testing copy, publishing content, improving conversion rates. Monthly reviews tie everything back to pipeline and revenue.",
  },
];

const sectionNavItems = [
  { id: "hero", label: "Overview" },
  { id: "intro", label: "Our Approach" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "comparison", label: "Why Us" },
  { id: "web-design", label: "Web Design" },
  { id: "testimonials", label: "Clients" },
  { id: "faq", label: "FAQs" },
];

const Services = () => {
  const { data: testimonials } = useTestimonialsPublic();
  const activeSection = useScrollSpy(sectionNavItems, 120);

  return (
    <>
      <SEOHead
        title="Digital Marketing Services | SEO, Paid Media & Web Design"
        description="Full-service digital marketing for B2B and service businesses. SEO, paid media, web design, content marketing and analytics – all tied to pipeline and revenue, not vanity metrics."
        canonical="/services"
        keywords={[
          "digital marketing services",
          "SEO services UK",
          "PPC management",
          "web design agency",
          "B2B marketing agency",
          "lead generation services",
          "content marketing",
          "marketing analytics",
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />
      <ServiceSchema
        name="Digital Marketing Services"
        description="Full-service digital marketing: SEO, paid media, web design, content marketing and analytics for B2B and service businesses."
        url="/services"
      />
      <FAQSchema faqs={faqs} />

      {/* Scroll-spy dot navigation */}
      <SectionNav sections={sectionNavItems} activeId={activeSection} />

      <div className="min-h-screen">
        {/* ── 1. HERO: Video Background ── */}
        <section id="hero" className="relative overflow-hidden" style={{ minHeight: "75vh" }}>
          {/* Video Background */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={heroServicesDigital}
              className="w-full h-full object-cover"
            >
              <source src={cityTimelapse} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[hsl(var(--background))]" />
          </div>

          <div className="relative z-10 flex flex-col justify-center min-h-[75vh] px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-accent text-sm font-medium tracking-widest uppercase mb-6"
              >
                Full-Service Digital Marketing
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]"
              >
                Digital marketing that moves{" "}
                <span className="text-accent font-normal">pipeline, not metrics.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
              >
                We design, build and optimise the assets that generate qualified leads and revenue
                – from SEO and paid campaigns to websites, content and tracking.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">
                    Book Strategy Call
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline-dark" size="lg" asChild>
                  <Link to="/free-seo-website-audit">Get Free Audit</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 2. LOGO WALL ── */}
        <div className="bg-background border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <LogoWall title="Trusted by growing businesses" />
          </div>
        </div>

        {/* ── 3. INTRODUCTION ── */}
        <section id="intro" className="relative">
          <FloatingElements />
          <SectionBand background="light">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <ScrollReveal>
                  <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-6 leading-tight">
                    What full-service digital marketing should actually look like
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Most agencies sell channels in silos – an SEO team here, a PPC team there, a web
                      designer somewhere else. The result? Disconnected tactics, duplicated effort and
                      no one owning the commercial outcome.
                    </p>
                    <p>
                      We take a different approach. Every service we deliver is part of a single growth
                      system: your SEO strategy informs your content plan, your paid campaigns drive
                      traffic to pages we've built to convert, and your analytics setup tells us
                      exactly what's working so we can double down or cut spend.
                    </p>
                    <p>
                      The goal isn't to run more campaigns. It's to build a marketing engine that
                      generates qualified leads predictably – one you can scale up when you're ready
                      and that compounds over time.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      {
                        icon: TrendingUp,
                        title: "Revenue-first strategy",
                        desc: "Every recommendation is tied to pipeline impact, not channel-level vanity metrics.",
                      },
                      {
                        icon: Globe,
                        title: "Integrated channels",
                        desc: "SEO, paid, web and content working as one system – not competing for credit.",
                      },
                      {
                        icon: Zap,
                        title: "90-day execution cycles",
                        desc: "Prioritised sprints with clear deliverables. No 6-month strategies that gather dust.",
                      },
                      {
                        icon: BarChart3,
                        title: "Transparent reporting",
                        desc: "Live dashboards showing leads, cost per acquisition and revenue attribution.",
                      },
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

        {/* ── 4. SERVICES GRID: Staggered with background images ── */}
        <section id="services">
          <SectionBand background="gradient">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-4">
                    Our services
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Every service is delivered with the same mindset: clear strategy, precise execution
                    and ruthless focus on commercial outcomes.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {services.map((service, index) => {
                  const bgImage = serviceImages[service.title];
                  const isLarge = index === 0 || index === 2; // Stagger: first and third are taller
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className={isLarge ? "md:row-span-1" : ""}
                    >
                      <Link
                        to={service.href}
                        className="block rounded-xl border border-border overflow-hidden group h-full relative"
                      >
                        {/* Background image with heavy overlay */}
                        {bgImage && (
                          <div className="absolute inset-0">
                            <img
                              src={bgImage}
                              alt=""
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/60 group-hover:from-black/85 group-hover:via-black/65 transition-all duration-500" />
                          </div>
                        )}

                        <div className={`relative z-10 p-8 ${isLarge ? "py-12" : "py-8"}`}>
                          <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-lg bg-accent/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors border border-white/10">
                              <service.icon className="text-accent" size={24} />
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between gap-4">
                                <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
                                  {service.title}
                                </h3>
                                <div className="text-right flex-shrink-0">
                                  <div className="text-xl font-bold text-accent">{service.stat}</div>
                                  <div className="text-xs text-white/50 uppercase tracking-wider">
                                    {service.statLabel}
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-white/70 leading-relaxed">
                                {service.description}
                              </p>
                              <span className="inline-flex items-center text-accent font-medium text-sm gap-2 group-hover:gap-3 transition-all">
                                Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </SectionBand>
        </section>

        <OpinionatedQuote quote="If your agency reports on impressions and clicks but can't tell you cost per qualified lead, they're not a marketing partner – they're a media buyer with a nice deck." />

        {/* ── 5. PROCESS: Horizontal Scroll on Desktop ── */}
        <section id="process">
          <SectionBand background="dark">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">
                    How we work
                  </h2>
                  <p className="text-lg text-white/70 max-w-2xl mx-auto">
                    A clear, phased approach that gets to results fast – no drawn-out discovery phases
                    or months of "building foundations" before anything happens.
                  </p>
                </div>
              </ScrollReveal>

              {/* Desktop: Horizontal scroll */}
              <div className="hidden lg:block">
                <HorizontalScroll>
                  {processSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-[380px]"
                    >
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
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

        {/* Stats */}
        <ServiceStatsExplosion />

        {/* ── 6. DELIVERABLES ── */}
        <section id="deliverables">
          <SectionBand background="light">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-4">
                    What you get as a client
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Beyond the deliverables specific to each channel, every Avorria client receives:
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Named strategist and dedicated Slack channel",
                  "90-day prioritised roadmap updated quarterly",
                  "Live performance dashboard with real-time data",
                  "Weekly optimisation updates (async or call)",
                  "Monthly strategy review with pipeline attribution",
                  "Quarterly business review with leadership team",
                  "Full ownership of all assets we create",
                  "Transparent time and budget tracking",
                  "Direct access to the team doing the work",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
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

        {/* ── 7. COMPARISON GRID ── */}
        <ServiceComparisonGrid />

        {/* ── 8. WEB DESIGN FEATURE: Sticky Image Parallax ── */}
        <section id="web-design">
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
                      Web Design & Development
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
                      Websites that look sharp and sell hard
                    </h2>
                    <p className="text-white/70 leading-relaxed mb-6">
                      Every section, layout and CTA is engineered for conversions, not awards. Built on
                      a modern stack with SEO, speed and CRO wired in from day one so every visit has a
                      clear, frictionless path to enquiry.
                    </p>
                    <Button variant="accent" asChild>
                      <Link to="/services/web-design">
                        View Web Design Services <ArrowRight className="ml-2" size={18} />
                      </Link>
                    </Button>
                  </ScrollReveal>
                  <ScrollReveal delay={0.15}>
                    <Link to="/case-study/entirefm-rebrand" className="block group">
                      <img
                        src="https://delvgmrcfaeubuixprwz.supabase.co/storage/v1/object/public/case-study-images/hero/1765529644769-8zabue.png"
                        alt="EntireFM website redesign – facilities management case study by Avorria"
                        className="rounded-xl shadow-2xl w-full group-hover:shadow-accent/20 transition-shadow duration-300 border border-white/10"
                        loading="lazy"
                      />
                      <p className="text-sm text-white/50 mt-3 group-hover:text-accent transition-colors">
                        Case Study: EntireFM Digital Transformation →
                      </p>
                    </Link>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </StickyImageSection>
        </section>

        {/* ── 9. TESTIMONIALS ── */}
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
                      initial={{ opacity: 0, y: 20 }}
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

        {/* ── 10. FAQ ── */}
        <section id="faq">
          <SectionBand background="gradient">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-4">
                    Common questions
                  </h2>
                  <p className="text-muted-foreground">
                    Straight answers to the questions we hear most from prospective clients.
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

        {/* ── 11. FINAL CTA ── */}
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
                    Ready to build a marketing engine that compounds?
                  </h2>
                  <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                    Book a strategy call or request a free audit and we'll tell you – bluntly –
                    where your next 90 days of effort should go.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="accent" size="lg" asChild>
                      <Link to="/contact">
                        Book Strategy Call
                        <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                    <Button variant="outline-dark" size="lg" asChild>
                      <Link to="/free-seo-website-audit">Get Free SEO & Website Audit</Link>
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

export default Services;
