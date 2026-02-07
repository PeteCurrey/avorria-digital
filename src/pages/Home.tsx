// Cache buster v4 - forces Vite HMR to serve fresh module
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { trackCTAClick } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Target, Zap, BarChart3, Users, Globe, Award, Quote } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import HeroStats from "@/components/HeroStats";
import ScrollIndicator from "@/components/ScrollIndicator";

import { SlideInPanel } from "@/components/SlideInPanel";
import { ExitIntentPopover } from "@/components/ExitIntentPopover";

import { ScrollReveal, ScrollRevealGrid, CountUp } from "@/components/animations/ScrollReveal";
import ParallaxBackground from "@/components/ParallaxBackground";

import { LogoWall } from "@/components/LogoWall";
import { useCaseStudiesPublic, CaseStudyDB } from "@/hooks/useCaseStudies";
import { useTestimonialsPublic } from "@/hooks/useTestimonials";
import CharacterReveal from "@/components/animations/CharacterReveal";
import FloatingElements from "@/components/FloatingElements";
import TiltCard from "@/components/TiltCard";
import GradientMesh from "@/components/GradientMesh";
import SectionNav from "@/components/SectionNav";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import serviceSeo from "@/assets/service-seo.jpg";
import servicePaidMedia from "@/assets/service-paid-media.jpg";
import serviceWebDesign from "@/assets/service-web-design.jpg";
import serviceContentEmail from "@/assets/service-content-email.jpg";
import serviceSocialBrand from "@/assets/service-social-brand.jpg";
import bgDataAnalytics from "@/assets/bg-data-analytics.jpg";
import ognCraneHero from "@/assets/case-studies/ogn-crane-hero.jpg";
import entirefmHero from "@/assets/case-studies/entirefm-hero.jpg";
import heroRaceCar from "@/assets/hero-race-car.jpg";
import heroPenthouse from "@/assets/hero-penthouse.png";
import cityTimelapseVideo from "@/assets/city-timelapse.mp4";
import bgRaceCar from "@/assets/bg-race-car.png";

// Section definitions for scroll spy navigation
const homeSections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "case-studies", label: "Results" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
];

const Home = () => {
  // Scroll spy for section navigation
  const activeSection = useScrollSpy(homeSections, 120);
  
  // Fetch case studies from database
  const { data: dbCaseStudies, isLoading: caseStudiesLoading } = useCaseStudiesPublic();
  // Fetch testimonials from database
  const { data: dbTestimonials } = useTestimonialsPublic();
  
  // Organization schema for brand visibility in search results
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://avorria.com/#organization",
    name: "Avorria",
    legalName: "Avorria Ltd",
    description: "Performance-first digital marketing agency specialising in SEO, paid media, web design, and analytics for B2B and service businesses.",
    url: "https://avorria.com",
    logo: {
      "@type": "ImageObject",
      url: "https://avorria.com/logo.png",
      width: 512,
      height: 512,
    },
    image: "https://avorria.com/og-image.jpg",
    email: "hello@avorria.com",
    telephone: "+44 114 123 4567",
    foundingDate: "2020",
    slogan: "Digital Marketing, SEO & Web Experiences that Actually Convert",
    knowsAbout: [
      "Search Engine Optimization",
      "Digital Marketing",
      "Web Design",
      "Paid Media Advertising",
      "Google Ads",
      "Content Marketing",
      "Analytics & Tracking",
      "Conversion Rate Optimization",
    ],
    sameAs: [
      "https://www.linkedin.com/company/avorria",
      "https://twitter.com/avorria",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Innovation Centre",
      addressLocality: "Chesterfield",
      addressRegion: "Derbyshire",
      postalCode: "S41 7QJ",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Derbyshire" },
      { "@type": "City", name: "Chesterfield" },
      { "@type": "City", name: "Derby" },
      { "@type": "City", name: "Nottingham" },
      { "@type": "City", name: "Sheffield" },
      { "@type": "City", name: "Manchester" },
      { "@type": "City", name: "Birmingham" },
      { "@type": "City", name: "London" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 53.2350,
        longitude: -1.4210,
      },
      geoRadius: "200 mi",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO Services",
            description: "Technical SEO, content strategy and on-site optimisation focused on commercial keywords.",
            url: "https://avorria.com/services/seo",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Paid Media",
            description: "Google Ads and paid acquisition with clear ROAS and CPL targets.",
            url: "https://avorria.com/services/paid-media",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Design & Development",
            description: "High-end websites built for speed, clarity and conversion.",
            url: "https://avorria.com/services/web-design",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Analytics & Tracking",
            description: "Marketing analytics, tracking setup and data-driven reporting.",
            url: "https://avorria.com/services/analytics",
          },
        },
      ],
    },
  };
  
  // Local Business schema for local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://avorria.com/#localbusiness",
    name: "Avorria",
    description: "Performance-first digital marketing agency specialising in SEO, paid media, web design, and analytics for B2B and service businesses. Headquartered in Chesterfield, Derbyshire.",
    url: "https://avorria.com",
    telephone: "+44 1246 123 4567",
    email: "hello@avorria.com",
    image: "https://avorria.com/og-image.jpg",
    priceRange: "£££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Innovation Centre",
      addressLocality: "Chesterfield",
      addressRegion: "Derbyshire",
      postalCode: "S41 7QJ",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.2350,
      longitude: -1.4210,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Derbyshire" },
      { "@type": "City", name: "Chesterfield" },
      { "@type": "City", name: "Derby" },
      { "@type": "City", name: "Nottingham" },
      { "@type": "City", name: "Sheffield" },
      { "@type": "City", name: "Manchester" },
      { "@type": "City", name: "London" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:30",
    },
  };

  const services = [{
    title: "SEO",
    description: "Technical SEO, content strategy and on-site optimisation that focuses on commercial keywords, not ego rankings.",
    href: "/services/seo",
    image: serviceSeo
  }, {
    title: "Paid Media",
    description: "Acquisition that pays for itself with clear ROAS and CPL targets tied to your offer and sales process.",
    href: "/services/paid-media",
    image: servicePaidMedia
  }, {
    title: "Web Design & Development",
    description: "High-end websites built for speed, clarity and conversion. Modern stack with proper tracking.",
    href: "/services/web-design",
    image: serviceWebDesign
  }, {
    title: "Content & Email",
    description: "Content that attracts the right people and email that moves them through the funnel.",
    href: "/services/content-email",
    image: serviceContentEmail
  }, {
    title: "Social & Personal Brand",
    description: "Done-for-you content systems for founders that position you as the obvious choice.",
    href: "/services/social-personal-brand",
    image: serviceSocialBrand
  }, {
    title: "Analytics & Reporting",
    description: "Tracking, dashboards and data that show you what's actually driving revenue – not just clicks.",
    href: "/services/analytics",
    image: bgDataAnalytics
  }];

  const process = [{
    number: "01",
    title: "Discovery & audit",
    description: "We review your current site, traffic, tracking and campaigns. You'll get a blunt view of what's working, what isn't and what's missing."
  }, {
    number: "02",
    title: "Roadmap & quick wins",
    description: "We map out a 90-day plan that balances quick commercial wins with the foundations you've been putting off."
  }, {
    number: "03",
    title: "Build, launch, optimise",
    description: "We execute. New assets, improved journeys, tighter campaigns. Everything shipped with tracking and QA."
  }, {
    number: "04",
    title: "Review, refine, scale",
    description: "Every month you get a clear dashboard and a straight answer: what we did, what moved, what's next."
  }];

  // Static fallback case studies
  const staticCaseStudies = [{
    slug: "ogn-facility-management",
    client: "One Great Northern",
    sector: "Crane Hire & Specialist Lifting",
    headline: "Technical precision meets digital excellence",
    image: ognCraneHero,
    metrics: [
      { label: "Quality Enquiries", value: "+218%" },
      { label: "Organic Traffic", value: "+312%" },
      { label: "Conversion Rate", value: "4.8%" },
    ],
    services: ["Web Design", "SEO", "Content Strategy"],
  }, {
    slug: "entirefm-rebrand",
    client: "EntireFM",
    sector: "Facilities Management",
    headline: "From outdated to industry-leading",
    image: entirefmHero,
    metrics: [
      { label: "Enquiry Increase", value: "+156%" },
      { label: "Bounce Rate", value: "-47%" },
      { label: "Lead Quality", value: "+71%" },
    ],
    services: ["Brand Development", "Web Design", "AI Integration"],
  }, {
    slug: "classic-cars-direct",
    client: "Classic Cars Direct",
    sector: "Prestige Automotive",
    headline: "Where heritage meets digital excellence",
    image: heroRaceCar,
    metrics: [
      { label: "Lead Quality", value: "+187%" },
      { label: "Time on Site", value: "+142%" },
      { label: "Avg Enquiry Value", value: "+£48k" },
    ],
    services: ["Brand Identity", "Web Design", "SEO"],
  }];

  // Use database case studies if available, fallback to static
  const featuredCaseStudies = dbCaseStudies && dbCaseStudies.filter(cs => cs.is_featured).length > 0
    ? dbCaseStudies.filter(cs => cs.is_featured).slice(0, 3).map((cs: CaseStudyDB) => ({
        slug: cs.slug,
        client: cs.client,
        sector: cs.sector,
        headline: cs.headline,
        image: cs.hero_media_src,
        metrics: cs.kpi_badges.slice(0, 3).map(badge => ({
          label: badge.label,
          value: badge.value,
        })),
        services: cs.services.slice(0, 3),
      }))
    : staticCaseStudies;

  const comparison = [{
    feature: "Reporting",
    typical: "Slide decks full of clicks and impressions.",
    avorria: "Dashboards showing leads, pipeline and ROI – plus a one-minute written summary."
  }, {
    feature: "Strategy",
    typical: "'We'll test some campaigns and see what happens.'",
    avorria: "Clear 90-day roadmap tied to business targets."
  }, {
    feature: "Technical depth",
    typical: "Surface-level SEO and tagging.",
    avorria: "Technical audits, proper tracking, site architecture and CRO as standard."
  }, {
    feature: "Design",
    typical: "Pretty sites that don't convert.",
    avorria: "Clean, modern UX engineered around CTAs, proof and clarity."
  }, {
    feature: "Communication",
    typical: "Monthly calls when renewal is due.",
    avorria: "Regular updates, proactive ideas and straight answers."
  }];

  // Static fallback testimonials
  const staticTestimonials = [{
    quote: "Within a couple of months we actually understood where our leads were coming from and what to double down on. The reporting is brutally clear – in a good way.",
    author: "James Harrison",
    role: "Managing Director",
    company: "Apex Professional Services",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }, {
    quote: "They rebuilt our site and landing pages without drama. Same traffic, better structure, calls and enquiries went up. No hype, just a very competent team.",
    author: "Sarah Mitchell",
    role: "Marketing Manager",
    company: "Northfield Construction Group",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  }, {
    quote: "We didn't want another 'creative agency'. We wanted someone to help us hit numbers. Avorria behaves like an in-house growth function, not a vendor.",
    author: "David Chen",
    role: "Founder & CEO",
    company: "Velocity SaaS",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }];

  // Use database testimonials if available, fallback to static
  const testimonials = dbTestimonials && dbTestimonials.length > 0
    ? dbTestimonials.map(t => ({
        quote: t.quote,
        author: t.author,
        role: t.role,
        company: t.company,
        avatar: t.avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      }))
    : staticTestimonials;

  const faqs = [{
    question: "What size businesses do you work with?",
    answer: "Mostly established service businesses, multi-location brands and B2B teams who are already investing in marketing and want to get more disciplined and effective with it."
  }, {
    question: "Do you only work on retainers?",
    answer: "No. We do one-off rebuilds and projects where it makes sense, but most of our impact comes from ongoing work – strategy, execution and optimisation over time."
  }, {
    question: "Is there a minimum budget?",
    answer: "If you're spending less than £2k/month in total on marketing, you're probably better off with lighter, DIY support. Above that, we can usually make a meaningful difference."
  }, {
    question: "Do you tie into our CRM and internal reporting?",
    answer: "Yes. Wherever possible we build dashboards that connect marketing numbers to your sales pipeline and revenue, not just clicks and forms."
  }, {
    question: "How do we get started?",
    answer: "Either request a free SEO & website audit, or book a strategy call. We'll review your current setup, give you a straight assessment and outline what we'd actually do."
  }];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <>
      <Helmet>
        <title>Avorria – Digital Marketing, SEO & Web Design Agency | Sheffield & London</title>
        <meta name="description" content="Avorria is a performance-first digital marketing agency specialising in SEO, paid media, web design and analytics. We help B2B and service businesses generate qualified leads and grow revenue." />
        <meta name="keywords" content="digital marketing agency, SEO agency Sheffield, web design agency, paid media, B2B marketing, lead generation, Google Ads management, content marketing" />
        
        <meta property="og:title" content="Avorria – Digital Marketing, SEO & Web Design Agency" />
        <meta property="og:description" content="Performance-first digital marketing that grows revenue, not vanity metrics. Strategic SEO, paid media, web design & analytics for serious businesses." />
        <meta property="og:url" content="https://avorria.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://avorria.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Avorria" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@avorria" />
        <meta name="twitter:title" content="Avorria – Digital Marketing, SEO & Web Design Agency" />
        <meta name="twitter:description" content="Performance-first digital marketing that grows revenue, not vanity metrics." />
        <meta name="twitter:image" content="https://avorria.com/og-image.jpg" />
        
        <link rel="canonical" href="https://avorria.com" />
        
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://avorria.com/#website",
          "url": "https://avorria.com",
          "name": "Avorria",
          "description": "Performance-first digital marketing agency",
          "publisher": {"@id": "https://avorria.com/#organization"},
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://avorria.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://avorria.com/#webpage",
          "url": "https://avorria.com",
          "name": "Avorria – Digital Marketing, SEO & Web Design Agency",
          "description": "Performance-first digital marketing agency specialising in SEO, paid media, web design and analytics for B2B and service businesses.",
          "isPartOf": {"@id": "https://avorria.com/#website"},
          "about": {"@id": "https://avorria.com/#organization"},
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://avorria.com/og-image.jpg"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://avorria.com"
            }]
          }
        })}
        </script>
      </Helmet>


      {/* Navigation with transparent mode for hero */}
      <Navigation transparent={true} />

      {/* Section Navigation */}
      <SectionNav sections={homeSections} activeId={activeSection} variant="dots" />

      <div className="min-h-screen bg-white">
        {/* Full-Screen Hero Section with Static Penthouse Image */}
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
          {/* Static penthouse cityscape background */}
          <div className="absolute inset-0">
            <img 
              src={heroPenthouse} 
              alt="Luxury penthouse cityscape" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 z-[1]" />
          
          {/* Living Gradient Mesh Background */}
          <GradientMesh className="opacity-40 z-[2]" />
          {/* Floating Elements */}
          <FloatingElements />
          
          <div className="container mx-auto px-6 relative z-10 pt-24">
            <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl ml-0 mr-auto">
              <div className="space-y-5 md:space-y-6">
                <motion.span 
                  className="inline-block text-xs sm:text-sm font-medium text-white/60 uppercase tracking-[0.2em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Performance-First Digital Agency
                </motion.span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-white font-light">
                  <CharacterReveal text="Digital Marketing, SEO & Web Experiences that" delay={0.4} />
                  {" "}
                  <span className="text-accent font-normal animate-glow-pulse-accent">
                    <CharacterReveal text="Actually Convert." delay={0.8} emphasis />
                  </span>
                </h1>
                <motion.p 
                  className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  We combine high-end design, technical SEO & paid acquisition to turn traffic into pipeline – not just prettier dashboards.
                </motion.p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <Button variant="accent" size="default" className="text-sm sm:text-base px-6 py-5 shadow-lg" asChild>
                    <Link to="/contact" onClick={() => trackCTAClick('book_strategy_call', '/contact', 'hero')}>
                      Book a strategy call
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                  <Button size="default" className="text-sm sm:text-base px-6 py-5 bg-gray-900 text-white hover:bg-gray-800 shadow-lg" asChild>
                    <Link to="/free-seo-website-audit" onClick={() => trackCTAClick('get_free_seo_website_audit', '/free-seo-website-audit', 'hero')}>
                      Get a free audit
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="mt-12 pt-6 border-t border-white/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-xl">
                  <div>
                    <div className="text-2xl font-light text-white">50+</div>
                    <div className="text-xs text-white/60">Active clients</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">£2.4M+</div>
                    <div className="text-xs text-white/60">Pipeline generated</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">92%</div>
                    <div className="text-xs text-white/60">Client retention</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">10+ yrs</div>
                    <div className="text-xs text-white/60">Avg. experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
            <ScrollIndicator />
          </div>
        </section>


        {/* Trust Bar - Light */}
        <section className="py-16 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal variant="fade-up" duration={500}>
              <h2 className="text-center text-base font-semibold text-gray-900 mb-2">
                Trusted by teams who are done wasting budget on noise.
              </h2>
              <p className="text-center text-sm text-gray-500 mb-8 max-w-2xl mx-auto">
                We work with growing service businesses, multi-site brands and high-ticket B2B teams.
              </p>
              <LogoWall type="clients" variant="light" />
            </ScrollReveal>
          </div>
        </section>

        {/* Who We Are Section with Video Background */}
        <div id="about">
        <ParallaxBackground
          backgroundVideo={cityTimelapseVideo}
          speed={0.3}
          overlay="dark"
          minHeight="auto"
          className="py-24 md:py-32"
        >
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <ScrollReveal variant="fade-up" duration={500}>
                  <div className="space-y-6">
                    <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em]">Who We Are</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] text-white">
                      An established agency that behaves like your in-house team.
                    </h2>
                    <p className="text-lg text-white/80 leading-relaxed">
                      Avorria was founded to be the opposite of the agencies we'd all worked at – the ones with pretty decks, vague reports and no connection to actual business results.
                    </p>
                    <p className="text-lg text-white/80 leading-relaxed">
                      We're a senior team of strategists, developers and specialists who've spent years in-house and agency-side. We know what good looks like, and we know what gets in the way.
                    </p>
                    <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 mt-4" asChild>
                      <Link to="/about">
                        Learn more about us
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal variant="fade-up" delay={150} duration={500}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 overflow-hidden">
                      <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent to-transparent animate-beam" style={{ backgroundSize: "200% 100%" }} />
                      <div className="relative z-10">
                        <Users className="w-8 h-8 text-accent mb-4" />
                        <div className="text-3xl font-light text-white mb-1">
                          <CountUp end={50} suffix="+" />
                        </div>
                        <div className="text-sm text-white/60">Active clients</div>
                      </div>
                    </div>
                    <div className="relative group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 overflow-hidden">
                      <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent to-transparent animate-beam" style={{ backgroundSize: "200% 100%" }} />
                      <div className="relative z-10">
                        <Globe className="w-8 h-8 text-accent mb-4" />
                        <div className="text-3xl font-light text-white mb-1">UK & US</div>
                        <div className="text-sm text-white/60">International reach</div>
                      </div>
                    </div>
                    <div className="relative group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 overflow-hidden">
                      <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent to-transparent animate-beam" style={{ backgroundSize: "200% 100%" }} />
                      <div className="relative z-10">
                        <Award className="w-8 h-8 text-accent mb-4" />
                        <div className="text-3xl font-light text-white mb-1">
                          <CountUp end={10} suffix="+ yrs" />
                        </div>
                        <div className="text-sm text-white/60">Avg. team experience</div>
                      </div>
                    </div>
                    <div className="relative group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 overflow-hidden">
                      <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent to-transparent animate-beam" style={{ backgroundSize: "200% 100%" }} />
                      <div className="relative z-10">
                        <TrendingUp className="w-8 h-8 text-accent mb-4" />
                        <div className="text-3xl font-light text-white mb-1">
                          <CountUp end={92} suffix="%" />
                        </div>
                        <div className="text-sm text-white/60">Client retention</div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </ParallaxBackground>
        </div>

        {/* Value Props */}
        <section className="py-24 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal variant="fade-up" duration={500}>
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-gray-900">
                    Why teams work with Avorria
                  </h2>
                </div>
              </ScrollReveal>
              
              <ScrollRevealGrid className="grid md:grid-cols-2 gap-6 lg:gap-8" stagger={100} variant="fade-up">
                <Card className="border-gray-200 bg-white hover:border-accent/40 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                      <Target className="text-accent w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-accent transition-colors duration-300">
                      Pipeline-first, not buzzword-first
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We start with pipeline targets and work backwards. Every channel, campaign and asset is judged on one thing: does it move revenue in the right direction?
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white hover:border-accent/40 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                      <Zap className="text-accent w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-accent transition-colors duration-300">
                      Technical firepower baked in
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Tracking, analytics, technical SEO, CRO, tagging – they're not bolt-ons. They're the foundation. If your numbers are wrong or your site is slow, we fix that first.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white hover:border-accent/40 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                      <TrendingUp className="text-accent w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-accent transition-colors duration-300">
                      Design that earns its keep
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We build sites that look like top-tier agency work, but every layout, block and CTA is engineered for conversions. No award-chasing fluff.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white hover:border-accent/40 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                      <BarChart3 className="text-accent w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-accent transition-colors duration-300">
                      Plain-English reporting
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      You'll never get a 40-page PDF that tells you nothing. Our dashboards show traffic, leads, pipeline and ROI in one place – with a short narrative.
                    </p>
                  </CardContent>
                </Card>
              </ScrollRevealGrid>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <div id="services">
        <ParallaxBackground
          backgroundImage={bgRaceCar}
          speed={0.2}
          overlay="dark"
          minHeight="auto"
          className="py-24 md:py-32"
        >
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <ScrollReveal variant="fade-up" duration={500}>
              <div className="text-center mb-16 md:mb-20">
                <motion.span 
                  className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Our Services
                </motion.span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-white">
                  What we actually do
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  One team that connects the dots – from strategy through to execution and optimisation.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollRevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto" stagger={80} variant="fade-up">
              {services.map((service, index) => (
                <Link key={index} to={service.href} className="group relative overflow-hidden rounded-xl">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-accent/40 transition-all duration-300">
                      <div className="relative h-64 sm:h-72 overflow-hidden rounded-xl">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        <CardContent className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                            {service.title}
                          </h3>
                          <p className="text-sm text-white/80 mb-4 leading-relaxed line-clamp-2">{service.description}</p>
                          <span className="inline-flex items-center text-sm text-accent font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            Explore service
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </CardContent>
                      </div>
                    </Card>
                    {/* Border beam effect on hover */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                      <div className="absolute inset-0 rounded-xl border-beam-animation" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </ScrollRevealGrid>
            
            <ScrollReveal delay={300} variant="fade-up">
              <div className="text-center mt-12 sm:mt-16">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/services">
                    View All Services
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </ParallaxBackground>
        </div>

        {/* Process Section */}
        <section id="process" className="py-24 md:py-32 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal variant="fade-up" duration={500}>
              <div className="text-center mb-16 md:mb-20">
                <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">How We Work</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-white">
                  Simple process. Serious output.
                </h2>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {process.map((step, index) => (
                <ScrollReveal key={index} delay={index * 80} variant="fade-up">
                  <div className="relative group p-6 bg-white/5 rounded-xl border border-white/10 hover:border-accent/40 transition-all duration-300">
                    <div className="space-y-4">
                      <div className="text-5xl sm:text-6xl font-extralight text-accent/60 group-hover:text-accent transition-colors duration-300">
                        <CountUp end={parseInt(step.number)} suffix="" />
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-accent/90 transition-colors duration-300">{step.title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-accent/40 to-transparent" />
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-16 md:mb-20">
                <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Case Studies</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-gray-900">
                  Real results for real businesses.
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  See how we've helped businesses like yours grow through strategic digital marketing.
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealGrid className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto" stagger={100} variant="fade-up">
              {featuredCaseStudies.map((study, index) => (
                <Link key={index} to={`/case-studies/${study.slug}`} className="group">
                  <Card className="h-full border-gray-200 bg-white hover:border-accent/40 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={study.image} 
                        alt={study.client}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex flex-wrap gap-2">
                          {study.services.slice(0, 2).map((service, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">{study.sector}</p>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-accent transition-colors duration-300">
                        {study.client}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{study.headline}</p>
                      
                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                        {study.metrics.map((metric, i) => (
                          <div key={i} className="text-center">
                            <div className="text-lg font-semibold text-accent">{metric.value}</div>
                            <div className="text-xs text-gray-500">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </ScrollRevealGrid>

            <ScrollReveal delay={300} variant="fade-up">
              <div className="text-center mt-12 sm:mt-16">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/case-studies">
                    View all case studies
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal variant="fade-up">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-gray-900">
                    What makes Avorria different?
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    If you've ever stared at an agency report and thought "I still don't know if this is working", you already know the problem.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100} variant="fade-up">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-4 sm:p-6 text-sm font-semibold text-gray-900 border-b border-gray-200">Feature</th>
                          <th className="text-left p-4 sm:p-6 text-sm font-semibold text-gray-500 border-b border-gray-200">
                            Typical agency
                          </th>
                          <th className="text-left p-4 sm:p-6 text-sm font-semibold text-accent border-b border-gray-200">Avorria</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparison.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                            <td className="p-4 sm:p-6 text-sm font-medium text-gray-900">{item.feature}</td>
                            <td className="p-4 sm:p-6 text-sm text-gray-500">{item.typical}</td>
                            <td className="p-4 sm:p-6 text-sm text-gray-700 font-medium">{item.avorria}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Local Expertise Callout */}
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-white border-y border-gray-200">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-base text-gray-600">
              Prefer to work with a team who knows your patch? See our{" "}
              <Link to="/seo-agency/sheffield" className="text-accent hover:text-accent/80 font-medium">
                SEO
              </Link>
              {" "}and{" "}
              <Link to="/web-design/sheffield" className="text-accent hover:text-accent/80 font-medium">
                web design services in Sheffield
              </Link>
              ,{" "}
              <Link to="/digital-marketing-agency/yorkshire" className="text-accent hover:text-accent/80 font-medium">
                Yorkshire
              </Link>
              {" "}and{" "}
              <Link to="/digital-marketing-agency/uk" className="text-accent hover:text-accent/80 font-medium">
                across the UK
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 md:py-32 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-white">What clients say.</h2>
              </div>
            </ScrollReveal>
            <ScrollRevealGrid className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto" stagger={80} variant="fade-up">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <Quote className="w-8 h-8 text-accent/40 mb-4" />
                    <p className="text-base text-white/90 leading-relaxed">"{testimonial.quote}"</p>
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{testimonial.author}</p>
                        <p className="text-xs text-white/60">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ScrollRevealGrid>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal variant="fade-up" duration={500}>
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-gray-900">
                    Questions we get a lot.
                  </h2>
                </div>
              </ScrollReveal>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <ScrollReveal key={index} delay={index * 60} variant="fade-up">
                    <AccordionItem 
                      value={`item-${index}`} 
                      className="border border-gray-200 bg-white px-6 rounded-lg hover:border-accent/40 transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left text-base font-semibold text-gray-900 hover:text-accent py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-gray-600 leading-relaxed pb-4">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </ScrollReveal>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-32 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal variant="fade-up" duration={600}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-white">
                  Ready to treat marketing like an operating function?
                </h2>
                <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                  If you're tired of noise, guesswork and vague reports, let's talk. We'll review your current setup and show you what disciplined, revenue-focused marketing looks like.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="accent" size="lg" className="text-lg px-8 py-6" asChild>
                    <Link to="/contact">
                      Book a strategy call
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button size="lg" className="text-lg px-8 py-6 bg-white/10 text-white border border-white/30 hover:bg-white/20" asChild>
                    <Link to="/free-seo-website-audit">Request a free audit</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <SlideInPanel />
        <ExitIntentPopover />
      </div>
    </>;
};
export default Home;
