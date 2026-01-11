import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { trackCTAClick } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Target, Zap, BarChart3, CheckCircle2, X, Users, Globe, Award } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import HeroStats from "@/components/HeroStats";
import ScrollIndicator from "@/components/ScrollIndicator";

import { SlideInPanel } from "@/components/SlideInPanel";
import { ExitIntentPopover } from "@/components/ExitIntentPopover";
import Navigation from "@/components/Navigation";
import { ScrollReveal, ScrollRevealGrid, CountUp } from "@/components/animations/ScrollReveal";
import { LogoWall } from "@/components/LogoWall";
import { OpinionatedQuote } from "@/components/OpinionatedQuote";
import { SectionBand } from "@/components/ContentBand";
import heroPenthouse from "@/assets/hero-penthouse.png";
import heroRaceCar from "@/assets/hero-race-car.jpg";
import heroCityscape from "@/assets/hero-cityscape.jpg";
import bgCityNight from "@/assets/bg-city-night.jpg";
import serviceSeo from "@/assets/service-seo.jpg";
import servicePaidMedia from "@/assets/service-paid-media.jpg";
import serviceWebDesign from "@/assets/service-web-design.jpg";
import serviceContentEmail from "@/assets/service-content-email.jpg";
import serviceSocialBrand from "@/assets/service-social-brand.jpg";
import bgDataAnalytics from "@/assets/bg-data-analytics.jpg";

const Home = () => {
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
      streetAddress: "Sheffield Digital Campus",
      addressLocality: "Sheffield",
      addressRegion: "South Yorkshire",
      postalCode: "S1 2BJ",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "City", name: "Sheffield" },
      { "@type": "City", name: "London" },
      { "@type": "AdministrativeArea", name: "Yorkshire" },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 53.3811,
        longitude: -1.4701,
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
    description: "Performance-first digital marketing agency specialising in SEO, paid media, web design, and analytics for B2B and service businesses.",
    url: "https://avorria.com",
    telephone: "+44 114 123 4567",
    email: "hello@avorria.com",
    image: "https://avorria.com/og-image.jpg",
    priceRange: "£££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sheffield Digital Campus",
      addressLocality: "Sheffield",
      addressRegion: "South Yorkshire",
      postalCode: "S1 2BJ",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.3811,
      longitude: -1.4701,
    },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "City", name: "Sheffield" },
      { "@type": "City", name: "London" },
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
    description: "We map out a 90-day plan that balances quick commercial wins with the foundations you've been putting off – tracking, site speed, structure, funnels."
  }, {
    number: "03",
    title: "Build, launch, optimise",
    description: "We execute. New assets, improved journeys, tighter campaigns. Everything shipped with tracking, QA and a clear 'before vs after'."
  }, {
    number: "04",
    title: "Review, refine, scale",
    description: "Every month you get a clear dashboard and a straight answer: what we did, what moved, what we're doing next. When the numbers justify it, we scale."
  }];

  const caseStudies = [{
    metric: "+184%",
    metricLabel: "organic leads in 6 months",
    description: "for a multi-site service brand."
  }, {
    metric: "38%",
    metricLabel: "drop in cost per qualified lead",
    description: "after rebuilding the funnel and landing pages."
  }, {
    metric: "2.4x",
    metricLabel: "pipeline from inbound",
    description: "in under a year for a B2B services business."
  }];

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

  const testimonials = [{
    quote: "Within a couple of months we actually understood where our leads were coming from and what to double down on. The reporting is brutally clear – in a good way.",
    author: "James Harrison",
    role: "Managing Director",
    company: "Apex Professional Services"
  }, {
    quote: "They rebuilt our site and landing pages without drama. Same traffic, better structure, calls and enquiries went up. No hype, just a very competent team.",
    author: "Sarah Mitchell",
    role: "Marketing Manager",
    company: "Northfield Construction Group"
  }, {
    quote: "We didn't want another 'creative agency'. We wanted someone to help us hit numbers. Avorria behaves like an in-house growth function, not a vendor.",
    author: "David Chen",
    role: "Founder & CEO",
    company: "Velocity SaaS"
  }];

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


      {/* Override default navigation with transparent version */}
      <div className="relative z-50">
        <Navigation transparent={true} />
      </div>

      <div className="min-h-screen">
        {/* Full-Screen Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:pt-0 md:pb-0" style={{
          backgroundImage: `url(${heroPenthouse})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll"
        }}>
          {/* Clean dark overlay - no blur */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[hsl(220,25%,8%)]" />

          {/* Hero Content */}
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl">
              {/* Hero Copy - Center-left aligned */}
              <div className="space-y-6 md:space-y-8 mb-10 md:mb-16 animate-fade-in">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.1] tracking-tight text-white font-extralight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] whitespace-nowrap">
                  Digital Marketing, SEO &amp; Web Experiences that Actually Convert.
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl font-extralight drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  Avorria is your performance-first digital partner. We combine high end design, technical SEO &amp; paid acquisition to turn traffic into pipeline – not just prettier dashboards.
                </p>

                {/* Dual CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <Button variant="accent" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto shadow-lg" asChild>
                    <Link to="/contact" onClick={() => trackCTAClick('book_strategy_call', '/contact', 'hero')}>
                      Book a strategy call
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                  <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-white/15 text-white border border-white/30 hover:bg-white/25 w-full sm:w-auto shadow-lg" asChild>
                    <Link to="/free-seo-website-audit" onClick={() => trackCTAClick('get_free_seo_website_audit', '/free-seo-website-audit', 'hero')}>Get a free SEO & website audit</Link>
                  </Button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="animate-fade-in-up" style={{
                animationDelay: "300ms"
              }}>
                <HeroStats />
              </div>
            </div>
          </div>

          {/* Scroll Indicator - hidden on mobile */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
            <ScrollIndicator />
          </div>
        </section>


        {/* Trust Bar */}
        <SectionBand background="dark" className="py-12 md:py-16 border-y border-white/10">
          <ScrollReveal variant="fade-up" duration={500}>
            <h2 className="text-center text-lg font-semibold text-white mb-4">
              Trusted by teams who are done wasting budget on noise.
            </h2>
            <p className="text-center text-base text-white/70 mb-8 max-w-3xl mx-auto">
              We work with growing service businesses, multi-site brands and high-ticket B2B teams who want grown-up conversations about revenue, not vanity metrics.
            </p>
            <LogoWall type="clients" />
          </ScrollReveal>
        </SectionBand>

        {/* Who We Are Section */}
        <SectionBand background="gradient" padding="large">
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
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-accent/50 mt-4" asChild>
                    <Link to="/about">
                      Learn more about us
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
              
              <ScrollReveal variant="fade-up" delay={150} duration={500}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-[hsl(220,25%,12%)] border border-white/10 rounded-xl hover:border-accent/30 transition-colors duration-300">
                    <Users className="w-8 h-8 text-accent mb-4" />
                    <div className="text-3xl font-light text-white mb-1">50+</div>
                    <div className="text-sm text-white/60">Active clients</div>
                  </div>
                  <div className="p-6 bg-[hsl(220,25%,12%)] border border-white/10 rounded-xl hover:border-accent/30 transition-colors duration-300">
                    <Globe className="w-8 h-8 text-accent mb-4" />
                    <div className="text-3xl font-light text-white mb-1">UK & US</div>
                    <div className="text-sm text-white/60">International reach</div>
                  </div>
                  <div className="p-6 bg-[hsl(220,25%,12%)] border border-white/10 rounded-xl hover:border-accent/30 transition-colors duration-300">
                    <Award className="w-8 h-8 text-accent mb-4" />
                    <div className="text-3xl font-light text-white mb-1">10+ yrs</div>
                    <div className="text-sm text-white/60">Avg. team experience</div>
                  </div>
                  <div className="p-6 bg-[hsl(220,25%,12%)] border border-white/10 rounded-xl hover:border-accent/30 transition-colors duration-300">
                    <TrendingUp className="w-8 h-8 text-accent mb-4" />
                    <div className="text-3xl font-light text-white mb-1">92%</div>
                    <div className="text-sm text-white/60">Client retention</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </SectionBand>

        {/* Value Props - Clean Dark Background */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fade-up" duration={500}>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-white">
                  Why teams work with Avorria
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollRevealGrid className="grid md:grid-cols-2 gap-6 lg:gap-8" stagger={100} variant="fade-up">
              <Card className="border-white/10 bg-[hsl(220,25%,10%)] hover:bg-[hsl(220,25%,12%)] hover:border-accent/30 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                    <Target className="text-accent w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white group-hover:text-accent transition-colors duration-300">
                    Pipeline-first, not buzzword-first
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Most marketing talks about impressions, CTR and "brand lift". We start with pipeline targets and work backwards. Every channel, campaign and asset is judged on one thing: does it move revenue in the right direction?
                  </p>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-[hsl(220,25%,10%)] hover:bg-[hsl(220,25%,12%)] hover:border-accent/30 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                    <Zap className="text-accent w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white group-hover:text-accent transition-colors duration-300">
                    Technical firepower baked in
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Tracking, analytics, technical SEO, CRO, tagging – they're not bolt-ons. They're the foundation. If your numbers are wrong or your site is slow, we fix that first. Then we scale.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-[hsl(220,25%,10%)] hover:bg-[hsl(220,25%,12%)] hover:border-accent/30 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                    <TrendingUp className="text-accent w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white group-hover:text-accent transition-colors duration-300">
                    Design that earns its keep
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    We build sites and funnels that look like top-tier agency work, but every layout, block and CTA is engineered for conversions. No award-chasing fluff. Just clean, modern UX that makes it easy for people to buy.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-[hsl(220,25%,10%)] hover:bg-[hsl(220,25%,12%)] hover:border-accent/30 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                    <BarChart3 className="text-accent w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white group-hover:text-accent transition-colors duration-300">
                    Plain-English reporting
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    You'll never get a 40-page PDF that tells you nothing. Our dashboards show traffic, leads, pipeline and ROI in one place – with a short narrative on what we did, what changed and what's next.
                  </p>
                </CardContent>
              </Card>
            </ScrollRevealGrid>

            <div className="mt-12">
              <OpinionatedQuote quote="If your SEO report doesn't mention revenue, it's a vanity exercise." />
            </div>
          </div>
        </SectionBand>

        {/* Services Overview - Premium Grid */}
        <SectionBand background="gradient" padding="large">
          <ScrollReveal variant="fade-up" duration={500}>
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Our Services</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-white">
                What we actually do
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                One team that connects the dots – from strategy through to execution and optimisation.
              </p>
            </div>
          </ScrollReveal>
          
          {/* Featured Services Grid - Now 6 items in 3x2 */}
          <ScrollRevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto" stagger={80} variant="fade-up">
            {services.map((service, index) => (
              <Link key={index} to={service.href} className="group relative overflow-hidden rounded-xl">
                <Card className="h-full border-0 bg-transparent overflow-hidden">
                  <div className="relative h-64 sm:h-72 overflow-hidden rounded-xl">
                    {/* Image with enhanced zoom effect */}
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    {/* Clean gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    {/* Content */}
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
        </SectionBand>

        {/* Process Section - Clean with subtle image */}
        <SectionBand 
          background="image" 
          backgroundImage={heroRaceCar}
          backgroundOverlay="heavy"
          padding="large"
        >
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
                <div className="relative group p-6 bg-[hsl(220,25%,10%)]/80 rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="text-5xl sm:text-6xl font-extralight text-accent/60 group-hover:text-accent transition-colors duration-300">
                      <CountUp end={parseInt(step.number)} suffix="" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-accent/90 transition-colors duration-300">{step.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-accent/40 to-transparent" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </SectionBand>

        {/* Case Studies Highlights */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-16 md:mb-20">
                <span className="inline-block text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Results</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-white">Proof over promises.</h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Here's the flavour of what happens when you stop treating marketing as an experiment.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollRevealGrid className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8" stagger={80} variant="fade-up">
              {caseStudies.map((study, index) => (
                <Card key={index} className="border-white/10 bg-[hsl(220,25%,10%)] hover:bg-[hsl(220,25%,12%)] hover:border-accent/30 transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-8 sm:p-10 relative">
                    {/* Decorative accent line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="text-4xl sm:text-5xl font-light text-accent mb-3">{study.metric}</div>
                    <div className="text-sm font-medium text-white mb-2">{study.metricLabel}</div>
                    <p className="text-sm text-white/60 leading-relaxed">{study.description}</p>
                  </CardContent>
                </Card>
              ))}
            </ScrollRevealGrid>
            
            <div className="text-center mt-12 sm:mt-16">
              <Button variant="accent" size="lg" asChild>
                <Link to="/case-studies">
                  View case studies
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </SectionBand>

        {/* Comparison Table */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-white">
                  What makes Avorria different to a typical agency?
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  If you've ever stared at an agency report and thought "I still don't know if this is working", you already know the problem. We built Avorria as the opposite of that experience.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100} variant="fade-up">
              <div className="bg-[hsl(220,25%,10%)] border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 sm:p-6 text-base text-white font-semibold border-b border-white/10">Feature</th>
                        <th className="text-left p-4 sm:p-6 text-base text-white/60 font-semibold border-b border-white/10">
                          Typical agency
                        </th>
                        <th className="text-left p-4 sm:p-6 text-base text-accent font-semibold border-b border-white/10">Avorria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.map((item, index) => (
                        <tr key={index} className="border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors duration-200">
                          <td className="p-4 sm:p-6 text-base font-medium text-white">{item.feature}</td>
                          <td className="p-4 sm:p-6 text-base text-white/50">{item.typical}</td>
                          <td className="p-4 sm:p-6 text-base text-white/90 font-medium">{item.avorria}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>

        {/* Local Expertise Callout */}
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-[hsl(220,25%,8%)] border-y border-white/10">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-lg text-white/70">
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

        {/* Testimonials - Clean dark section */}
        <SectionBand 
          background="image" 
          backgroundImage={heroCityscape}
          backgroundOverlay="heavy"
          padding="large"
        >
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-white">What clients say when the noise stops.</h2>
            </div>
          </ScrollReveal>
          <ScrollRevealGrid className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto" stagger={80} variant="fade-up">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-white/10 bg-[hsl(220,25%,10%)]/90 hover:bg-[hsl(220,25%,12%)]/90 hover:border-accent/30 transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <p className="text-base text-white/90 leading-relaxed italic">"{testimonial.quote}"</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm font-medium text-white">{testimonial.author}</p>
                    <p className="text-xs text-white/60">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollRevealGrid>
        </SectionBand>

        {/* FAQ */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal variant="fade-up" duration={500}>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-white">
                  Questions we get a lot.
                </h2>
              </div>
            </ScrollReveal>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={index * 60} variant="fade-up">
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="border border-white/10 bg-[hsl(220,25%,10%)] px-6 rounded-lg hover:border-accent/30 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold text-white hover:text-accent py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-white/70 leading-relaxed pb-4">{faq.answer}</AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </SectionBand>

        {/* Final CTA - Clean with dramatic background */}
        <SectionBand 
          background="image" 
          backgroundImage={bgCityNight}
          backgroundOverlay="heavy"
          padding="hero"
        >
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant="fade-up" duration={600}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white">
                Ready to treat marketing like an operating function, not a gamble?
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                If you're tired of noise, guesswork and vague reports, let's talk. We'll review your current setup and show you what a disciplined, revenue-focused marketing engine could look like.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-lg px-8 py-6" asChild>
                  <Link to="/contact">
                    Book a strategy call
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-white/15 text-white border border-white/30 hover:bg-white/25" asChild>
                  <Link to="/free-seo-website-audit">Request a free SEO & website audit</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </SectionBand>

        {/* Slide-in Panel and Exit Intent */}
        <SlideInPanel />
        <ExitIntentPopover />
      </div>
    </>;
};
export default Home;
