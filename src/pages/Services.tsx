import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Target, Palette, Mail, Share2, BarChart3 } from "lucide-react";
import { SectionBand, ContentBand } from "@/components/ContentBand";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ParallaxBackground from "@/components/ParallaxBackground";
import GradientMesh from "@/components/GradientMesh";
import FloatingElements from "@/components/FloatingElements";
import CharacterReveal from "@/components/animations/CharacterReveal";
import TypewriterText from "@/components/animations/TypewriterText";
import ScrollIndicator from "@/components/ScrollIndicator";
import SectionNav from "@/components/SectionNav";
import TiltCard from "@/components/TiltCard";
import { BeamBorder } from "@/components/BeamBorder";
import { ServiceChallengePicker, ServiceComparisonGrid, ServiceStatsExplosion } from "@/components/services";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import cityTimelapse from "@/assets/city-timelapse.mp4";
import serviceWebDesign from "@/assets/service-web-design.jpg";
import heroCityscape from "@/assets/hero-cityscape.jpg";

const sections = [
  { id: "hero", label: "Overview" },
  { id: "challenges", label: "Challenges" },
  { id: "services", label: "Services" },
  { id: "results", label: "Results" },
  { id: "comparison", label: "Why Us" },
  { id: "next-steps", label: "Next Steps" },
];

const Services = () => {
  const activeSection = useScrollSpy(sections, 100);

  const services = [
    {
      icon: Search,
      title: "SEO",
      description: "Technical SEO, site architecture and on-page optimisation for real businesses – not bloggers. We fix what's broken, build the pages and content you're missing and target the keywords that attract qualified demand.",
      href: "/services/seo",
      stat: "+132%",
      statLabel: "avg organic traffic",
    },
    {
      icon: Target,
      title: "Paid Media",
      description: "Google, Meta and LinkedIn campaigns structured around your offers, not random keywords. We set clear CPL/ROAS targets, build conversion-focused journeys and cut anything that can't justify its spend.",
      href: "/services/paid-media",
      stat: "3.2x",
      statLabel: "avg ROAS",
    },
    {
      icon: Palette,
      title: "Web Design & Development",
      description: "Websites, landing pages and funnels that look sharp and sell hard. Built on a modern stack with SEO, speed and CRO wired in from day one so every visit has a clear, frictionless path to enquiry.",
      href: "/services/web-design",
      stat: "+89%",
      statLabel: "conversion rate",
    },
    {
      icon: Mail,
      title: "Content & Email Marketing",
      description: "Long-form content, playbooks and email sequences designed to educate buyers, warm up demand and support your sales team. No random blogs – just assets that move people to ready-to-talk.",
      href: "/services/content-email",
      stat: "+312%",
      statLabel: "email revenue",
    },
    {
      icon: Share2,
      title: "Social & Personal Brand",
      description: "Consistent, credible content for founders and expert teams. We turn your expertise into LinkedIn, Instagram and short-form content that builds trust and drives inbound.",
      href: "/services/social-personal-brand",
      stat: "4.7x",
      statLabel: "engagement rate",
    },
    {
      icon: BarChart3,
      title: "Analytics & CRO",
      description: "Tracking, dashboards and systematic CRO. We untangle GA4, tags and pixels, then continually test improvements across your site and funnels so you can reallocate budget based on truth.",
      href: "/services/analytics",
      stat: "100%",
      statLabel: "tracking accuracy",
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />
      <Helmet>
        <title>Digital Marketing Services | SEO, Paid Media, Web Design | Avorria</title>
        <meta
          name="description"
          content="Full-service digital marketing: SEO, paid media, web design, content marketing and analytics. We help B2B and service businesses generate qualified leads and grow revenue."
        />
        <meta
          name="keywords"
          content="digital marketing services, SEO services, PPC management, web design services, content marketing, analytics, B2B marketing, lead generation"
        />
        <meta
          property="og:title"
          content="Digital Marketing Services | SEO, Paid Media, Web Design | Avorria"
        />
        <meta
          property="og:description"
          content="Full-service digital marketing: SEO, paid media, web design, content and analytics for B2B and service businesses."
        />
        <meta property="og:url" content="https://avorria.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://avorria.com/og-services.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Marketing Services | Avorria" />
        <meta
          name="twitter:description"
          content="Full-service digital marketing for B2B and service businesses."
        />
        <link rel="canonical" href="https://avorria.com/services" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Digital Marketing Services",
            description: "Avorria's full-service digital marketing offerings",
            numberOfItems: services.length,
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: service.title,
                description: service.description,
                url: `https://avorria.com${service.href}`,
                provider: {
                  "@type": "Organization",
                  name: "Avorria",
                },
              },
            })),
          })}
        </script>
      </Helmet>

      {/* Section Navigation */}
      <SectionNav sections={sections} activeId={activeSection} variant="dots" />

      <div className="min-h-screen">
        {/* Cinematic Hero Section */}
        <section id="hero">
          <ParallaxBackground
            backgroundVideo={cityTimelapse}
            overlay="gradient-left"
            speed={0.3}
            minHeight="100vh"
          >
            <GradientMesh className="opacity-30" />
            <FloatingElements />

            <div className="relative z-10 min-h-screen flex flex-col justify-center px-6">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <span className="text-accent text-sm font-medium tracking-widest uppercase">
                    Full-Service Digital Marketing
                  </span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.1]">
                  <CharacterReveal text="Growth systems that" delay={0.3} />
                  <br />
                  <span className="text-accent">
                    <CharacterReveal text="Actually Deliver." delay={0.8} emphasis />
                  </span>
                </h1>

                <div className="text-lg md:text-xl text-white/80 max-w-2xl mb-10">
                  <TypewriterText
                    text="We design, build and optimise the assets that actually move your pipeline – from SEO and ads to websites, content and tracking."
                    speed={20}
                    delay={2000}
                    cursor={false}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 3.5 }}
                  className="flex flex-col sm:flex-row gap-4"
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

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <ScrollIndicator />
            </div>
          </ParallaxBackground>
        </section>

        {/* Interactive Challenge Picker */}
        <ServiceChallengePicker />

        {/* Services Grid with TiltCard + BeamBorder */}
        <section id="services" className="py-24 md:py-32 bg-background">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-4">
                Our services.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every service below is delivered with the same mindset: clear strategy, precise execution and ruthless focus on commercial outcomes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TiltCard tiltAmount={6} glareOpacity={0.12}>
                    <BeamBorder>
                      <Link
                        to={service.href}
                        className="block p-8 md:p-10 rounded-lg group"
                      >
                        <div className="flex items-start gap-6">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center flex-shrink-0 group-hover:from-accent/30 group-hover:to-accent/10 transition-colors">
                            <service.icon className="text-accent" size={28} />
                          </div>
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="text-2xl md:text-3xl font-semibold text-foreground group-hover:text-accent transition-colors">
                                {service.title}
                              </h3>
                              <div className="text-right flex-shrink-0">
                                <div className="text-2xl font-bold text-accent">{service.stat}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                                  {service.statLabel}
                                </div>
                              </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {service.description}
                            </p>
                            <span className="inline-flex items-center text-accent font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                              Learn More
                              <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                              />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </BeamBorder>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Band - Visual break */}
        <ContentBand
          subheadline="Web Design & Development"
          headline="Websites that look sharp and sell hard."
          body="Every section, layout and CTA is engineered for conversions, not awards. Built on a modern stack with SEO, speed and CRO wired in from day one."
          image={serviceWebDesign}
          imageAlt="Modern website design"
          cta={{
            text: "View Web Design",
            href: "/services/web-design",
          }}
          background="mesh"
        />

        {/* Stats Explosion Section */}
        <ServiceStatsExplosion />

        {/* Comparison Grid */}
        <ServiceComparisonGrid />

        {/* Where Should You Start - Final CTA */}
        <section id="next-steps">
          <ParallaxBackground
            backgroundImage={heroCityscape}
            overlay="dark"
            speed={0.2}
            minHeight="auto"
          >
            <div className="py-24 md:py-32">
              <div className="max-w-5xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-white drop-shadow-lg">
                    Where should you start?
                  </h2>
                  <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
                    You don't have to buy everything at once. Pick the entry point that matches your reality right now.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                  {[
                    {
                      title: '"Our data is a mess."',
                      description:
                        "Start with Analytics & Conversion Optimisation. We'll fix tracking, build a clean dashboard and give you a blunt read on what's working.",
                      cta: "Fix the tracking first",
                      href: "/services/analytics",
                    },
                    {
                      title: '"We need more (and better) leads."',
                      description:
                        "Start with SEO + Paid Media. We'll build a 90-day plan to increase qualified demand, then plug it into landing pages that convert.",
                      cta: "Talk traffic & pipeline",
                      href: "/services/seo",
                    },
                    {
                      title: '"Our website isn\'t pulling its weight."',
                      description:
                        "Start with Web Design & Development. We'll audit your site, map the journeys properly and rebuild the key pages.",
                      cta: "Request a website teardown",
                      href: "/free-seo-website-audit",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <TiltCard tiltAmount={5} glareOpacity={0.1}>
                        <div className="p-8 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md space-y-4 h-full">
                          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                          <p className="text-white/80 leading-relaxed">{item.description}</p>
                          <Button
                            variant="outline-dark"
                            size="sm"
                            asChild
                            className="w-full"
                          >
                            <Link to={item.href}>
                              {item.cta}
                              <ArrowRight className="ml-2" size={16} />
                            </Link>
                          </Button>
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center p-8 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10"
                >
                  <h3 className="text-2xl md:text-3xl font-light mb-4 text-white drop-shadow-md">
                    Still not sure?
                  </h3>
                  <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                    Book a strategy call or request a free audit and we'll tell you – bluntly – where your next 90 days of effort should go.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="accent" size="lg" asChild className="w-full sm:w-auto">
                      <Link to="/free-seo-website-audit">
                        Get a free SEO & website audit
                        <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                    <Button
                      variant="outline-dark"
                      size="lg"
                      asChild
                      className="w-full sm:w-auto"
                    >
                      <Link to="/contact">Book a strategy call</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </ParallaxBackground>
        </section>
      </div>
    </>
  );
};

export default Services;
