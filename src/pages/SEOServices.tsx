import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, TrendingUp, X, Target, LineChart, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import { SectionBand } from "@/components/ContentBand";
import SEOHead from "@/components/seo/SEOHead";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { LogoWall } from "@/components/LogoWall";
import { StickyImageSection } from "@/components/StickyImageSection";
import HorizontalScroll from "@/components/HorizontalScroll";
import SectionNav from "@/components/SectionNav";
import ServiceComparisonGrid from "@/components/services/ServiceComparisonGrid";
import FloatingElements from "@/components/FloatingElements";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTestimonialsPublic } from "@/hooks/useTestimonials";
import { useIsMobile } from "@/hooks/use-mobile";
import ParallaxBackground from "@/components/ParallaxBackground";
import heroSeoImage from "@/assets/service-seo.jpg";
import heroCityscape from "@/assets/hero-cityscape.jpg";
import bgDataAnalytics from "@/assets/bg-data-analytics.jpg";
import heroSeoVideo from "@/assets/hero-seo-analytics.mp4";

const sectionNavItems = [
  { id: "hero", label: "Overview" },
  { id: "intro", label: "The Problem" },
  { id: "pain-points", label: "Pain Points" },
  { id: "included", label: "What's Included" },
  { id: "process", label: "Process" },
  { id: "comparison", label: "Why Us" },
  { id: "industries", label: "Industries" },
  { id: "testimonials", label: "Clients" },
  { id: "faq", label: "FAQs" },
];

const SEOServices = () => {
  const { data: testimonials } = useTestimonialsPublic();
  const activeSection = useScrollSpy(sectionNavItems, 120);

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
    tracking: [
      "Clean analytics and goals setup.",
      "Dashboards showing organic traffic, leads and pipeline – not just rankings.",
      "Clear monthly commentary on what changed and why.",
    ],
  };

  const timeline = [
    {
      period: "Month 0–1",
      title: "Audit & foundations",
      description:
        "Technical and content audit. Tracking and analytics clean-up. Quick on-page wins on high-impact pages.",
    },
    {
      period: "Months 2–3",
      title: "Structure & content",
      description:
        "Implement core technical fixes. Roll out new information architecture and internal linking. Launch priority content and update existing assets.",
    },
    {
      period: "Months 4–6",
      title: "Compounding gains",
      description:
        "Expand content clusters. Strengthen ranking positions for core terms. Tune pages and CTAs based on real conversion data.",
    },
    {
      period: "Month 6+",
      title: "Scale and refine",
      description:
        "Double down where we see strongest ROI. Explore new keyword sets and assets. Continually reallocate effort based on what the data actually shows.",
    },
  ];

  const deliverables = [
    "A clear initial audit and prioritised action plan.",
    "Monthly dashboards covering organic traffic, leads and key pages.",
    "Short, plain-English summary of work completed and results.",
    "Access to our reporting hub so you can check numbers any time.",
    "A backlog of upcoming SEO actions so you always know what's next.",
  ];

  const caseStudies = [
    {
      title: "Multi-location services brand",
      result: "+132% non-branded organic traffic and +89% organic enquiries in 9 months.",
      description: "Rebuilt architecture and content strategy.",
    },
    {
      title: "Specialist B2B services company",
      result: "Ranking for high-intent terms they'd been missing for years.",
      description: "Technical clean-up and targeted content.",
    },
  ];

  const faqs = [
    {
      question: "How long until we see results?",
      answer:
        "It depends where you're starting from, but most clients see early movement in 2–3 months and meaningful commercial impact in 4–6 months. We'll be clear about realistic timelines upfront.",
    },
    {
      question: "Do you lock us into long contracts?",
      answer:
        "No. We normally recommend at least a 6-month runway for SEO, but we don't hide behind punitive long-term contracts.",
    },
    {
      question: "Can you work with our in-house dev/content team?",
      answer:
        "Yes. We can either handle implementation end-to-end, or act as the strategic and technical layer that briefs your internal teams.",
    },
    {
      question: "Will SEO replace paid ads?",
      answer:
        "Not usually. SEO and paid work best together – SEO for compounding inbound demand, paid for speed and control. We'll help you balance both.",
    },
  ];

  return (
    <>
      <ServiceSchema
        name="SEO Services"
        description="Technical SEO, content strategy and organic search optimisation for B2B and service businesses. We focus on commercial keywords that drive qualified leads and revenue."
        url="/services/seo"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 47 }}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "SEO", url: "/services/seo" }
      ]} />
      <Helmet>
        <title>SEO Agency Sheffield & London | Technical SEO & Content Strategy | Avorria</title>
        <meta name="description" content="Expert SEO services for B2B and service businesses. Technical SEO audits, content strategy, local SEO and on-page optimisation focused on commercial keywords that drive qualified leads." />
        <meta name="keywords" content="SEO agency, SEO services, technical SEO, content strategy, local SEO, B2B SEO, Sheffield SEO agency, London SEO agency, organic search, keyword research" />
        <meta property="og:title" content="SEO Agency Sheffield & London | Avorria" />
        <meta property="og:description" content="Technical SEO, content strategy and on-page optimisation focused on commercial keywords that drive qualified leads and revenue." />
        <meta property="og:url" content="https://avorria.com/services/seo" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://avorria.com/og-seo-services.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SEO Agency Sheffield & London | Avorria" />
        <meta name="twitter:description" content="Technical SEO, content strategy and on-page optimisation focused on commercial keywords." />
        <link rel="canonical" href="https://avorria.com/services/seo" />
      </Helmet>

      {/* Scroll-spy dot navigation */}
      <SectionNav sections={sectionNavItems} activeId={activeSection} />

      <div className="min-h-screen">
        {/* ── 1. HERO: Video Background ── */}
        <section id="hero" className="relative overflow-hidden" style={{ minHeight: "75vh" }}>
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={heroSeoImage}
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
                SEO Services
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1]"
              >
                SEO that connects rankings to{" "}
                <span className="text-accent font-normal">revenue.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
              >
                We combine technical SEO, content strategy and on-site optimisation to win the searches that actually lead to pipeline – then remove the friction that stops those visitors becoming customers.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">
                    Book an SEO Strategy Call
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline-dark" size="lg" asChild>
                  <Link to="/free-seo-website-audit">Get a Free SEO Audit</Link>
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
          <SectionBand background="light" padding="large">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal>
                  <h2 className="text-3xl md:text-4xl font-light leading-tight mb-8 text-foreground">
                    What SEO actually means for your business.
                  </h2>
                  <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
                    <p>
                      SEO isn't a technical mystery or a monthly report full of jargon. It's a revenue channel. When it's done properly, it means the right people find your business at the exact moment they're looking for what you sell – and they keep finding you, month after month, without you paying per click.
                    </p>
                    <p>
                      The problem is that most SEO work focuses on the wrong things: vanity rankings for terms nobody searches, content that ticks a box but doesn't convert, and technical audits that gather dust. What's missing is a commercial strategy – one that targets the searches your buyers actually make and builds the kind of authority that compounds over time.
                    </p>
                    <p>
                      That's what we do. We treat SEO as a business growth lever, not a checkbox. Every keyword we target, every page we optimise and every piece of content we create is tied to a commercial outcome – more qualified leads, better pipeline, stronger revenue.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { icon: Target, title: "Commercial keyword targeting", description: "We go after the searches your buyers actually make – not vanity terms with no purchase intent." },
                      { icon: TrendingUp, title: "Technical foundations that compound", description: "Site speed, structure and crawlability fixes that keep paying dividends for years." },
                      { icon: CheckCircle2, title: "Content that ranks and converts", description: "Strategic content built around buyer intent, not keyword volume." },
                      { icon: LineChart, title: "Transparent reporting tied to pipeline", description: "Dashboards showing organic traffic, leads and revenue – not just ranking positions." },
                    ].map((feature, i) => (
                      <div key={feature.title} className="p-5 rounded-lg border border-border bg-card space-y-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <feature.icon className="text-accent" size={20} />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2 text-sm">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </SectionBand>
        </section>

        {/* ── 4. PAIN POINTS ── */}
        <section id="pain-points">
          <StickyImageSection
            backgroundImage={bgDataAnalytics}
            overlay="heavy"
            minHeight="auto"
          >
            <div className="py-24 md:py-32">
              <div className="max-w-4xl mx-auto px-6">
                <ScrollReveal>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-10 text-center text-white">
                    If you're already paying for SEO, some of this might sting.
                  </h2>
                </ScrollReveal>
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-10">
                  <ul className="space-y-5">
                    {painPoints.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start text-white/80"
                      >
                        <X className="text-accent mr-4 mt-1 flex-shrink-0" size={20} />
                        <span className="text-lg leading-relaxed">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <p className="text-center text-xl text-white/90 mt-10 font-medium max-w-3xl mx-auto">
                  You don't need more waffle about algorithms. You need a clear plan to win the right searches, fix the technical drag and connect organic performance to your pipeline.
                </p>
              </div>
            </div>
          </StickyImageSection>
        </section>

        {/* ── 5. WHAT'S INCLUDED ── */}
        <section id="included">
          <SectionBand background="dark" padding="large">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-16 text-center text-white">
                  What Avorria SEO actually covers.
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {[
                  { title: "Technical & structure", items: included.technical },
                  { title: "On-page optimisation", items: included.onPage },
                  { title: "Content & keyword strategy", items: included.content },
                  { title: "Local & multi-location SEO", items: included.local },
                ].map((section, si) => (
                  <ScrollReveal key={section.title} delay={si * 0.08}>
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">{section.title}</h3>
                      <div className="space-y-4">
                        {section.items.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                            <p className="text-white/80">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}

                <ScrollReveal className="md:col-span-2">
                  <div className="space-y-6 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-semibold text-white mb-6 border-l-4 border-accent pl-4">Tracking & reporting</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {included.tracking.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                          <p className="text-white/80">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <OpinionatedQuote quote="Most SEO agencies optimise for rankings. We optimise for revenue. If a keyword ranks but doesn't convert, it's a vanity metric – and we don't bill you for vanity." />
            </div>
          </SectionBand>
        </section>

        {/* ── 6. PROCESS: Horizontal Scroll on Desktop ── */}
        <section id="process">
          <SectionBand background="gradient" padding="large">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">
                    How a typical SEO engagement runs.
                  </h2>
                </div>
              </ScrollReveal>

              {/* Desktop: Horizontal scroll */}
              <div className="hidden lg:block">
                <HorizontalScroll>
                  {timeline.map((phase, index) => (
                    <div key={index} className="flex-shrink-0 w-[380px]">
                      <div className="p-8 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm h-full space-y-4">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm">
                            {index + 1}
                          </span>
                          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
                            {phase.period}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                        <p className="text-sm text-white/60 leading-relaxed">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </HorizontalScroll>
              </div>

              {/* Mobile: Vertical stack */}
              <div className="lg:hidden space-y-6">
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

              <p className="text-center text-white/70 mt-12 max-w-3xl mx-auto text-lg">
                SEO is compounding by nature. Our job is to shorten the time it takes to see commercial impact – and to show you transparently what's happening along the way.
              </p>
            </div>
          </SectionBand>
        </section>

        {/* ── 7. DELIVERABLES ── */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-light mb-12 text-center text-white">What you see as a client.</h2>
            </ScrollReveal>
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-10 space-y-6">
              <ul className="space-y-5">
                {deliverables.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-start"
                  >
                    <CheckCircle2 className="text-accent mr-4 mt-1 flex-shrink-0" size={22} />
                    <span className="text-white/90 text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </SectionBand>

        {/* ── 8. COMPARISON GRID ── */}
        <section id="comparison">
          <ServiceComparisonGrid />
        </section>

        {/* ── 9. SEO BY INDUSTRY ── */}
        <section id="industries">
          <SectionBand background="dark" padding="large">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">SEO by industry</h2>
                  <p className="text-xl text-white/70 max-w-2xl mx-auto">
                    Industry-specific SEO strategies built around how your buyers actually search and evaluate.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollRevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
                {[
                  { title: "Trades & Home Services", desc: "Local SEO that fills your diary with the right jobs in the right locations.", href: "/seo/for/trades-home-services" },
                  { title: "Professional Services", desc: "SEO that attracts better-fit clients and feeds your pipeline with qualified enquiries.", href: "/seo/for/professional-services" },
                  { title: "B2B SaaS", desc: "SEO that feeds your pipeline with demos and trials, not just blog traffic.", href: "/seo/for/b2b-saas" },
                  { title: "E-commerce Brands", desc: "SEO that moves revenue, not just rankings – with clean structure and conversion focus.", href: "/seo/for/ecommerce-brands" },
                  { title: "Multi-Location Brands", desc: "SEO that keeps every location and profile pulling its weight with structured local strategy.", href: "/seo/for/multi-location-brands" },
                ].map((industry) => (
                  <Card key={industry.title} className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold text-white mb-3">{industry.title}</h3>
                      <p className="text-white/60 mb-6">{industry.desc}</p>
                      <Button variant="link" asChild className="p-0 h-auto text-accent">
                        <Link to={industry.href}>
                          Learn more <ArrowRight className="ml-2" size={16} />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-8 flex flex-col justify-center items-center text-center h-full">
                    <p className="text-white/60 mb-4">Don't see your industry? We work with many sectors.</p>
                    <Button variant="outline-dark" size="sm" asChild>
                      <Link to="/contact">Discuss your industry</Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollRevealGrid>
            </div>
          </SectionBand>
        </section>

        {/* ── 10. CASE STUDIES ── */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">What good SEO looks like in practice.</h2>
              </div>
            </ScrollReveal>
            <ScrollRevealGrid className="grid md:grid-cols-2 gap-8" stagger={100}>
              {caseStudies.map((study, index) => (
                <Card key={index} className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-8 space-y-4">
                    <TrendingUp className="text-accent" size={32} />
                    <h3 className="text-xl font-semibold text-white">{study.title}</h3>
                    <p className="text-lg font-medium text-accent">{study.result}</p>
                    <p className="text-white/60 leading-relaxed">{study.description}</p>
                  </CardContent>
                </Card>
              ))}
            </ScrollRevealGrid>
            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline-dark" size="lg" asChild>
                  <Link to="/case-studies">View case studies</Link>
                </Button>
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">Book an SEO strategy call</Link>
                </Button>
              </div>
            </div>
          </div>
        </SectionBand>

        {/* ── 11. TESTIMONIALS ── */}
        {testimonials && testimonials.length > 0 && (
          <section id="testimonials">
            <SectionBand background="dark" padding="large">
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

        {/* ── 12. SEO BY LOCATION ── */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">SEO by location</h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Prefer to work with a team who knows your patch?
                </p>
              </div>
            </ScrollReveal>
            <ScrollRevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
              {[
                { title: "SEO Agency Sheffield", desc: "Performance-focused SEO for Sheffield and South Yorkshire businesses.", href: "/seo-agency/sheffield" },
                { title: "SEO Agency London", desc: "Pipeline-focused SEO strategy for London-based teams.", href: "/seo-agency/london" },
                { title: "SEO Across the UK", desc: "Work with us wherever you're based in the UK.", href: "/digital-marketing-agency/uk" },
              ].map((loc) => (
                <Card key={loc.title} className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">{loc.title}</h3>
                    <p className="text-white/60 mb-4">{loc.desc}</p>
                    <Button variant="outline-dark" size="sm" asChild>
                      <Link to={loc.href}>
                        Learn more <ArrowRight className="ml-2" size={16} />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </ScrollRevealGrid>
          </div>
        </SectionBand>

        {/* ── 13. FAQ ── */}
        <section id="faq">
          <SectionBand background="light" padding="large">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-4">SEO FAQ</h2>
                </div>
              </ScrollReveal>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border bg-card px-6 rounded-lg"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </SectionBand>
        </section>

        {/* ── 14. FINAL CTA ── */}
        <section>
          <ParallaxBackground
            backgroundImage={heroCityscape}
            overlay="dark"
            speed={0.2}
            minHeight="auto"
          >
            <div className="py-24 md:py-32">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <ScrollReveal>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white">
                    Want blunt, grown-up SEO advice?
                  </h2>
                  <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                    Send us your site and we'll tell you exactly where you're wasting potential, what's holding you back and what we'd do first.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="accent" size="lg" asChild className="w-full sm:w-auto">
                      <Link to="/free-seo-website-audit">
                        Get a free SEO audit
                        <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                    <Button variant="outline-dark" size="lg" asChild className="w-full sm:w-auto">
                      <Link to="/contact">Book an SEO strategy call</Link>
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

export default SEOServices;
