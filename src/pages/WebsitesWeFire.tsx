// Enhanced Websites We'd Fire page v2 - All 10 UX Enhancements
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  LayoutGrid,
  MousePointerClick,
  FileText,
  Award,
  Briefcase,
  Flame,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ParallaxBackground from "@/components/ParallaxBackground";
import SectionReveal from "@/components/SectionReveal";
import { ScrollReveal, CountUp } from "@/components/animations/ScrollReveal";
import TypewriterText from "@/components/animations/TypewriterText";
import confetti from "canvas-confetti";

// Import new enhancement components
import {
  FireRiskQuiz,
  RevenueLossCalculator,
  SectionProgressNav,
  LiveAnalyzerPreview,
  ThemeToggle,
  TestimonialVideoCard,
  testimonials,
  ArchetypeGuiltyToggle,
  FireRiskMeter,
  BeforeAfterSliderWithHotspots,
} from "@/components/websites-we-fire";

// Import images
import bgOfficeWorkspace from "@/assets/bg-office-workspace.jpg";
import cityTimelapseVideo from "@/assets/city-timelapse.mp4";
import badHeroSlider from "@/assets/examples/bad-hero-slider.jpg";
import goodHeroFocused from "@/assets/examples/good-hero-focused.jpg";
import badGeneralistSite from "@/assets/examples/bad-generalist-site.jpg";
import badNoCta from "@/assets/examples/bad-no-cta.jpg";
import badWallOfText from "@/assets/examples/bad-wall-of-text.jpg";

const WebsitesWeFire = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    concern: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guiltyArchetypes, setGuiltyArchetypes] = useState<Record<number, boolean>>({});
  const [showTypewriter, setShowTypewriter] = useState(false);

  // Delay typewriter start for hero animation
  useEffect(() => {
    const timer = setTimeout(() => setShowTypewriter(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Event: websites_fire_inline_form_submitted", {
      source: "websites_we_would_fire",
      focus: "web",
      formData,
    });

    // Confetti on form submit
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["hsl(320, 85%, 55%)", "hsl(280, 75%, 60%)", "#ffffff"],
    });

    setTimeout(() => {
      toast({
        title: "Got it – we'll take a look",
        description: "We'll send you a plain-English teardown within 3 working days.",
      });
      setFormData({ name: "", email: "", website: "", concern: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleGuiltyToggle = (archetypeNumber: number) => {
    setGuiltyArchetypes(prev => ({
      ...prev,
      [archetypeNumber]: !prev[archetypeNumber]
    }));
    console.log("Event: archetype_guilty_toggled", { 
      archetype_number: archetypeNumber, 
      is_guilty: !guiltyArchetypes[archetypeNumber] 
    });
  };

  const guiltyCount = Object.values(guiltyArchetypes).filter(Boolean).length;

  console.log("Event: websites_fire_page_viewed");

  const archetypes = [
    {
      icon: LayoutGrid,
      number: 1,
      title: "The 'Hero Slider From 2012'",
      tagline: "Five rotating banners, zero clarity about what you actually do.",
      image: badHeroSlider,
      looksLike: [
        "Multiple conflicting messages above the fold",
        "Generic stock photos, no clarity on offer",
        "No strong call-to-action. 'Learn more' doesn't count",
      ],
      whyFired: [
        "Confuses visitors in the first 3 seconds",
        "No obvious next step = high bounce rate",
        "You're asking busy people to do detective work. They won't",
      ],
      avorriaFix: [
        "Single, clear headline tied to a commercial outcome",
        "One primary CTA, one secondary – both high intent",
        "Hero built as a sales message, not a slideshow",
      ],
    },
    {
      icon: Briefcase,
      number: 2,
      title: "The 'We Do Everything For Everyone' Agency Site",
      tagline: "From blockchain to basket weaving – we'll take any client with a pulse.",
      image: badGeneralistSite,
      looksLike: [
        "Laundry list of 15+ services on the homepage",
        "No clear positioning or ideal client profile",
        "Every page reads like a generic capabilities deck",
      ],
      whyFired: [
        "Specialists beat generalists. Always",
        "No clear fit signal = low-quality enquiries",
        "Impossible to rank or build authority for anything specific",
      ],
      avorriaFix: [
        "Clear positioning: who you serve, what outcome you deliver",
        "3-5 core services with distinct outcomes, not capabilities",
        "Each service page optimized for a specific commercial intent",
      ],
    },
    {
      icon: MousePointerClick,
      number: 3,
      title: "The 'No Clear CTA / Where Do I Click?' Homepage",
      tagline: "Beautiful imagery, inspirational quotes, zero clear next step.",
      image: badNoCta,
      looksLike: [
        "Multiple vague CTAs: 'Explore', 'Discover', 'Learn More'",
        "Contact info buried in the footer",
        "No obvious conversion path for high-intent visitors",
      ],
      whyFired: [
        "High-intent prospects need a clear path. Give them one or lose them",
        "Every extra decision point increases drop-off",
        "You're treating your site like art. It's a sales tool",
      ],
      avorriaFix: [
        "Primary CTA above the fold and repeated strategically",
        "Clear hierarchy: Book call > Get audit > Download resource",
        "Every section has one clear action, not a menu of options",
      ],
    },
    {
      icon: FileText,
      number: 4,
      title: "The 'Wall of Text, Zero Proof' Service Page",
      tagline: "3,000 words about your process, methodology and values. No results, no proof.",
      image: badWallOfText,
      looksLike: [
        "Dense paragraphs explaining how great you are",
        "No case studies, testimonials or concrete outcomes",
        "Zero indication of pricing, timeline or what happens next",
      ],
      whyFired: [
        "Nobody trusts what you say about yourself without proof",
        "Busy prospects scan. They don't read manifestos",
        "No proof = no trust = no conversion",
      ],
      avorriaFix: [
        "Lead with outcomes: what this service delivers, for whom",
        "Social proof within first 2 scrolls: results, testimonials, logos",
        "Clear process, pricing bands, timeline expectations",
      ],
    },
    {
      icon: Award,
      number: 5,
      title: "The 'Beautiful But Useless' Award-Bait Site",
      tagline: "Gorgeous animations, bold typography, zero commercial clarity.",
      image: badNoCta,
      looksLike: [
        "Stunning visuals but impossible to work out what you do",
        "Navigation hidden behind cryptic icons",
        "More time spent on transitions than conversion strategy",
      ],
      whyFired: [
        "Awards don't pay invoices. Conversions do",
        "If prospects can't figure out what you do in 5 seconds, they leave",
        "Design should amplify clarity, not obscure it",
      ],
      avorriaFix: [
        "Premium aesthetics that enhance the message, not replace it",
        "Clear navigation, obvious CTAs, scannable hierarchy",
        "Beautiful AND functional – conversion and design are not enemies",
      ],
    },
  ];

  const fireChecklist = [
    "Hero sliders, carousels or auto-rotating banners",
    "Multiple conflicting CTAs above the fold",
    "No social proof until halfway down the page",
    "No mention of pricing, process or proof",
    "Contact form buried after 10 scrolls",
  ];

  const fixChecklist = [
    "One clear message and offer per page",
    "Primary CTA above the fold and repeated logically",
    "Case studies / testimonials close to key CTAs",
    "Simple, honest copy about pricing and delivery",
    "Frictionless forms and clear 'what happens next'",
  ];

  const results = [
    {
      title: "Homepage & Service Page Rebuild",
      metric: 63,
      suffix: "%",
      prefix: "+",
      context: "qualified enquiries in 3 months",
      icon: TrendingUp,
    },
    {
      title: "Simplified Contact Flow",
      metric: 38,
      suffix: "%",
      prefix: "+",
      context: "booked calls, same traffic",
      icon: Users,
    },
    {
      title: "Vague → Conversion-Led Rebuild",
      metric: 2,
      suffix: "x",
      prefix: "",
      context: "pipeline from inbound",
      icon: Target,
    },
  ];

  const faqs = [
    {
      question: "Do I need a full rebuild or can you optimise what I've got?",
      answer: "Depends on the foundation. If the site's structure, navigation and core pages are solid, we can optimize. If it's fundamentally unclear, slow or conversion-hostile, a rebuild is faster and cheaper long-term. We'll be honest in the teardown.",
    },
    {
      question: "How long does a typical rebuild take?",
      answer: "For a service business with 5-10 core pages: 4-8 weeks from kickoff to launch. Larger sites or complex funnels take longer. We scope this properly in the strategy phase so there are no surprises.",
    },
    {
      question: "Do you handle copy, design and dev in-house?",
      answer: "Yes. We don't outsource. Copy is conversion-focused (not marketing fluff), design is premium but functional, and dev is built for performance, SEO and tracking from day one.",
    },
    {
      question: "Will you migrate tracking and SEO properly?",
      answer: "Absolutely. We audit current tracking, set up GA4, tag manager and conversion events properly, handle 301 redirects, preserve link equity, and make sure nothing breaks. This isn't an afterthought – it's core to the process.",
    },
    {
      question: "What kind of budget do we need to take this seriously?",
      answer: "For a proper conversion-led rebuild with strategy, copy, design, dev and tracking: expect £15k–£40k depending on scope. For landing page or funnel-specific work: £5k–£15k. If those numbers feel high, DIY tools like Webflow or Squarespace might be a better fit.",
    },
  ];

  const statsData = [
    { value: 73, suffix: "%", label: "of visitors judge credibility by design" },
    { value: 0.05, suffix: "s", label: "to form a first impression" },
    { value: 88, suffix: "%", label: "won't return after bad UX" },
  ];

  return (
    <>
      <Helmet>
        <title>Websites We'd Fire (And How We'd Fix Them) | Avorria</title>
        <meta
          name="description"
          content="A teardown of common website disasters and how Avorria rebuilds them for conversion. If your homepage is a vanity brochure instead of a sales asset, it's costing you."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Section Progress Nav - Enhancement #7 */}
        <SectionProgressNav />
        
        {/* Theme Toggle - Enhancement #9 */}
        <ThemeToggle />
        
        {/* Fire Risk Meter - Enhancement #5 */}
        <FireRiskMeter guiltyCount={guiltyCount} totalCount={5} />

        {/* Hero Section with Parallax - Enhancement #10: Typewriter */}
        <section id="hero">
          <ParallaxBackground
            backgroundImage={bgOfficeWorkspace}
            overlay="gradient-left"
            minHeight="100vh"
            speed={0.4}
          >
            <div className="container mx-auto px-4 py-32 lg:py-40">
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <Flame className="h-8 w-8 text-destructive animate-pulse" />
                    <span className="text-destructive font-medium uppercase tracking-wider text-sm">
                      Website Teardown
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="text-4xl lg:text-6xl xl:text-7xl font-light text-white leading-tight"
                  >
                    Websites We'd{" "}
                    <span className="text-destructive font-normal">Fire</span>
                    <br />
                    <span className="text-white/80">(And How We'd Fix Them)</span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-lg lg:text-xl text-white/70 max-w-xl"
                  >
                    {showTypewriter ? (
                      <TypewriterText
                        text="If your homepage is a vanity brochure instead of a sales asset, it's quietly taxing your pipeline. Here's what we'd sack on sight."
                        speed={25}
                        cursor={true}
                      />
                    ) : (
                      <span className="opacity-0">Loading...</span>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground group"
                      onClick={() => {
                        console.log("Event: websites_fire_cta_audit_clicked", { cta: "hero_primary" });
                        window.location.href = "/free-seo-website-audit?focus=web&source=websites-we-would-fire";
                      }}
                    >
                      <Zap className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                      Get a Free Website Teardown
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 border-white/30 text-white hover:bg-transparent hover:scale-[1.02] transition-all"
                      onClick={() => {
                        console.log("Event: websites_fire_cta_audit_clicked", { cta: "hero_secondary" });
                        window.location.href = "/contact";
                      }}
                    >
                      Talk About a Rebuild
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="relative hidden lg:block"
                >
                  <Card className="p-8 bg-black/40 backdrop-blur-md border-destructive/30 shadow-2xl">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-destructive">
                        <motion.div
                          animate={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                        >
                          <XCircle className="h-10 w-10" />
                        </motion.div>
                        <span className="font-medium text-xl text-white">Sites That Cost You Money</span>
                      </div>
                      <div className="space-y-3 text-white/70">
                        {[
                          "Hero sliders from 2012",
                          "No clear CTA or value prop",
                          "Beautiful but commercially useless",
                          "Zero proof, all promise",
                          "Contact form buried in footer"
                        ].map((item, idx) => (
                          <motion.p
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                            className="flex items-center gap-3"
                          >
                            <span className="text-destructive text-lg">✗</span>
                            {item}
                          </motion.p>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </ParallaxBackground>
        </section>

        {/* Interactive Before/After with Hotspots - Enhancement #2 */}
        <section id="before-after" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-light text-foreground mb-4">
                  See the Difference: <span className="text-destructive">Fired</span> vs <span className="text-accent">Fixed</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Drag the slider to compare. Click the red hotspots to see exactly what's wrong.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200}>
              <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                <BeforeAfterSliderWithHotspots
                  beforeImage={badHeroSlider}
                  afterImage={goodHeroFocused}
                  beforeLabel="🔥 Before: Cluttered & Confusing"
                  afterLabel="✅ After: Clear & Converting"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Fire Risk Quiz - Enhancement #1 */}
        <section id="quiz" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-light text-foreground mb-4">
                  Is Your Website at Risk of Being <span className="text-destructive">Fired</span>?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Take our 7-question diagnostic quiz to find out your Fire Risk Score.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="scale" delay={200}>
              <div className="max-w-2xl mx-auto">
                <FireRiskQuiz />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Video Testimonial #1 - Enhancement #8 */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <TestimonialVideoCard {...testimonials[0]} />
            </div>
          </div>
        </section>

        {/* Archetype Teardowns with "Am I Guilty?" Toggles - Enhancement #5 */}
        <section id="archetypes" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-light text-foreground mb-4">
                  The 5 Website Archetypes We'd Fire
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Recognize any of these? Tap "I'm Guilty" to add to your risk meter.
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-24">
              {archetypes.map((archetype, index) => {
                const Icon = archetype.icon;
                const isEven = index % 2 === 0;
                const isGuilty = guiltyArchetypes[archetype.number] || false;
                
                return (
                  <SectionReveal key={archetype.number} type="fade-blur">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <Card className={`overflow-hidden border-border/50 transition-all duration-500 ${
                        isGuilty ? "border-destructive/50 shadow-lg shadow-destructive/10" : "hover:border-accent/30"
                      }`}>
                        <div className={`grid lg:grid-cols-2 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                          {/* Image Side */}
                          <div className={`relative h-64 lg:h-auto lg:min-h-[400px] ${isEven ? '' : 'lg:order-2'}`}>
                            <img
                              src={archetype.image}
                              alt={`Bad website example: ${archetype.title}`}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r" />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                              <span className="px-3 py-1 bg-destructive/90 text-white text-sm font-medium rounded-full">
                                🔥 Fired
                              </span>
                            </div>
                          </div>

                          {/* Content Side */}
                          <div className={`p-8 lg:p-12 ${isEven ? '' : 'lg:order-1'}`}>
                            <div className="flex items-start justify-between gap-4 mb-6">
                              <div className="flex items-start gap-4">
                                <motion.div
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  className="p-3 rounded-xl bg-accent/10 border border-accent/20"
                                >
                                  <Icon className="h-8 w-8 text-accent" />
                                </motion.div>
                                <div>
                                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    Archetype #{archetype.number}
                                  </span>
                                  <h3 className="text-2xl lg:text-3xl font-light text-foreground">
                                    {archetype.title}
                                  </h3>
                                </div>
                              </div>
                              
                              {/* "Am I Guilty?" Toggle */}
                              <ArchetypeGuiltyToggle
                                archetypeNumber={archetype.number}
                                isGuilty={isGuilty}
                                onToggle={handleGuiltyToggle}
                              />
                            </div>

                            <p className="text-lg text-muted-foreground italic mb-8 border-l-2 border-accent/30 pl-4">
                              "{archetype.tagline}"
                            </p>

                            <div className="grid md:grid-cols-3 gap-6">
                              {/* What It Looks Like */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-foreground">
                                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                  <h4 className="font-medium text-sm uppercase tracking-wide">Symptoms</h4>
                                </div>
                                <ul className="space-y-2">
                                  {archetype.looksLike.map((item, idx) => (
                                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                      <span className="text-destructive shrink-0">✗</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Why This Gets Fired */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-foreground">
                                  <XCircle className="h-4 w-4 text-destructive" />
                                  <h4 className="font-medium text-sm uppercase tracking-wide">Why It's Fired</h4>
                                </div>
                                <ul className="space-y-2">
                                  {archetype.whyFired.map((item, idx) => (
                                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                      <span className="text-destructive shrink-0">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Avorria Fix */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-foreground">
                                  <CheckCircle2 className="h-4 w-4 text-accent" />
                                  <h4 className="font-medium text-sm uppercase tracking-wide">Avorria Fix</h4>
                                </div>
                                <ul className="space-y-2">
                                  {archetype.avorriaFix.map((item, idx) => (
                                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                      <span className="text-accent shrink-0">✓</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Video Testimonial #2 - Enhancement #8 */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <TestimonialVideoCard {...testimonials[1]} />
            </div>
          </div>
        </section>

        {/* Video Stats Section */}
        <section id="stats">
          <ParallaxBackground
            backgroundVideo={cityTimelapseVideo}
            overlay="dark"
            minHeight="60vh"
            speed={0.2}
          >
            <div className="container mx-auto px-4 py-20">
              <div className="text-center">
                <ScrollReveal variant="fade-up">
                  <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
                    Your Website Is Being Judged
                  </h2>
                  <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto">
                    Every second counts. Here's what the data says about first impressions.
                  </p>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {statsData.map((stat, idx) => (
                    <ScrollReveal key={idx} variant="scale" delay={idx * 150}>
                      <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-5xl lg:text-6xl font-light text-accent mb-2">
                          <CountUp end={stat.value} suffix={stat.suffix} />
                        </div>
                        <p className="text-white/70 text-sm">{stat.label}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </ParallaxBackground>
        </section>

        {/* Conversion Checklist */}
        <section id="checklist" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-light text-foreground mb-4">
                  Quick Conversion Checklist
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  An honest assessment of what's killing your conversions and what you need instead.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Fire List */}
              <ScrollReveal variant="fade-left" delay={100}>
                <Card className="p-8 bg-destructive/5 border-destructive/20 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <XCircle className="h-6 w-6 text-destructive" />
                    </motion.div>
                    <h3 className="text-xl font-medium text-foreground">If Your Site Has These...</h3>
                  </div>
                  <ul className="space-y-4">
                    {fireChecklist.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-3 text-muted-foreground"
                      >
                        <span className="text-destructive mt-1 text-lg">✗</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>

              {/* Fix List */}
              <ScrollReveal variant="fade-right" delay={100}>
                <Card className="p-8 bg-accent/5 border-accent/20 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <CheckCircle2 className="h-6 w-6 text-accent" />
                    </motion.div>
                    <h3 className="text-xl font-medium text-foreground">Your Site Needs This Instead...</h3>
                  </div>
                  <ul className="space-y-4">
                    {fixChecklist.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-3 text-muted-foreground"
                      >
                        <span className="text-accent mt-1 text-lg">✓</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="fade-up" delay={300}>
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="group"
                  onClick={() => {
                    console.log("Event: websites_fire_cta_audit_clicked", { cta: "checklist_section" });
                    window.location.href = "/free-seo-website-audit?source=websites-we-would-fire";
                  }}
                >
                  Not Sure Where Your Site Lands? Request a Teardown
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Revenue Loss Calculator - Enhancement #4 */}
        <section id="calculator" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-light text-foreground mb-4">
                  What's a Bad Website <span className="text-destructive">Really</span> Costing You?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Use our calculator to see the annual revenue you're leaving on the table.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="scale" delay={200}>
              <div className="max-w-2xl mx-auto">
                <RevenueLossCalculator />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Video Testimonial #3 - Enhancement #8 */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <TestimonialVideoCard {...testimonials[2]} />
            </div>
          </div>
        </section>

        {/* Live Analyzer Preview & Teardown Form - Enhancement #6 */}
        <section id="teardown-form" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Live Analyzer */}
              <ScrollReveal variant="fade-left">
                <LiveAnalyzerPreview />
              </ScrollReveal>

              {/* Teardown Form */}
              <ScrollReveal variant="fade-right">
                <Card className="p-8 lg:p-12 border-accent/20 shadow-xl h-full">
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Flame className="h-12 w-12 text-accent mx-auto mb-4" />
                    </motion.div>
                    <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-4">
                      Want a Human Teardown?
                    </h2>
                    <p className="text-muted-foreground">
                      Plain-English analysis delivered within 3 working days.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website URL</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        placeholder="https://yoursite.com"
                        value={formData.website}
                        onChange={handleInputChange}
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="concern">What worries you most about your current site?</Label>
                      <Textarea
                        id="concern"
                        name="concern"
                        rows={3}
                        placeholder="e.g. Lots of traffic but few enquiries..."
                        value={formData.concern}
                        onChange={handleInputChange}
                        required
                        className="bg-background"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full group" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Request My Website Teardown"}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </form>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Results Block with Animated Counters */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-light text-foreground mb-4">
                  What Happens When You Stop Letting Your Site Coast
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Real outcomes from rebuilding sites for conversion, not awards.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {results.map((result, idx) => {
                const Icon = result.icon;
                return (
                  <ScrollReveal key={idx} variant="fade-up" delay={idx * 150}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="p-8 text-center hover:shadow-xl transition-shadow duration-300 border-accent/10 hover:border-accent/30">
                        <Icon className="h-10 w-10 text-accent mx-auto mb-4" />
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                          {result.title}
                        </h3>
                        <div className="text-5xl font-light text-accent mb-2">
                          <CountUp 
                            end={result.metric} 
                            prefix={result.prefix} 
                            suffix={result.suffix} 
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {result.context}
                        </p>
                      </Card>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ with Accordion */}
        <section id="faq" className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-light text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
              </div>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, idx) => (
                  <ScrollReveal key={idx} variant="fade-up" delay={idx * 100}>
                    <AccordionItem value={`faq-${idx}`} className="bg-card border border-border rounded-lg px-6">
                      <AccordionTrigger className="text-left text-foreground hover:text-accent transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </ScrollReveal>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal variant="scale">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Flame className="h-16 w-16 text-accent mx-auto mb-6" />
                <h2 className="text-4xl lg:text-5xl font-light text-foreground mb-6">
                  Ready to Stop Wasting Money on a Site That Doesn't Convert?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {guiltyCount >= 3 
                    ? `You identified ${guiltyCount} archetypes that match your site. It's definitely time for a teardown.`
                    : "Request a teardown and we'll show you exactly what's broken and how we'd fix it."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="text-lg px-8 group"
                    onClick={() => {
                      console.log("Event: websites_fire_cta_audit_clicked", { cta: "final_primary", guilty_count: guiltyCount });
                      window.location.href = "/free-seo-website-audit?source=websites-we-would-fire";
                    }}
                  >
                    <Zap className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    Get Your Free Teardown
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 hover:scale-[1.02] transition-transform"
                    onClick={() => {
                      console.log("Event: websites_fire_cta_audit_clicked", { cta: "final_secondary" });
                      window.location.href = "/contact";
                    }}
                  >
                    Book a Strategy Call
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default WebsitesWeFire;
