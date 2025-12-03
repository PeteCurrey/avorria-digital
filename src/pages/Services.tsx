import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Target, Palette, Mail, Share2, BarChart3 } from "lucide-react";
import { HeroBand, SectionBand, ContentBand } from "@/components/ContentBand";
import heroServicesDigital from "@/assets/hero-services-digital.jpg";
import serviceWebDesign from "@/assets/service-web-design.jpg";

const Services = () => {
  const services = [
    {
      icon: Search,
      title: "SEO",
      description: "Technical SEO, site architecture and on-page optimisation for real businesses – not bloggers. We fix what's broken, build the pages and content you're missing and target the keywords that attract qualified demand, not just traffic for screenshots.",
      href: "/services/seo",
    },
    {
      icon: Target,
      title: "Paid Media",
      description: "Google, Meta and LinkedIn campaigns structured around your offers, not random keywords. We set clear CPL/ROAS targets, build conversion-focused journeys and cut anything that can't justify its spend in hard numbers.",
      href: "/services/paid-media",
    },
    {
      icon: Palette,
      title: "Web Design & Development",
      description: "Websites, landing pages and funnels that look sharp and sell hard. Built on a modern stack with SEO, speed and CRO wired in from day one so every visit has a clear, frictionless path to enquiry or purchase.",
      href: "/services/web-design",
    },
    {
      icon: Mail,
      title: "Content & Email Marketing",
      description: "Long-form content, playbooks and email sequences designed to educate buyers, warm up demand and support your sales team. No random blogs – just assets that move people from \"never heard of you\" to \"ready to talk\".",
      href: "/services/content-email",
    },
    {
      icon: Share2,
      title: "Social & Personal Brand",
      description: "Consistent, credible content for founders and expert teams. We turn your expertise into LinkedIn, Instagram and short-form content that builds trust, drives inbound and makes sales conversations easier.",
      href: "/services/social-personal-brand",
    },
    {
      icon: BarChart3,
      title: "Analytics & Conversion Optimisation",
      description: "Tracking, dashboards and systematic CRO. We untangle GA4, tags and pixels, then continually test improvements across your site and funnels so you can reallocate budget based on truth, not guesses.",
      href: "/services/analytics",
    },
  ];

  const questions = [
    {
      label: "Strategy & positioning",
      question: "Who are we trying to reach?",
      answer: "Who you're for, what you're selling and how it's priced. This is where we decide which levers to pull – and which to leave alone.",
    },
    {
      label: "Traffic & demand",
      question: "How do we attract and convert them?",
      answer: "SEO, paid media, content and social – aimed at the right problems, with the right offers, landing on pages built to convert.",
    },
    {
      label: "Tracking & optimisation",
      question: "How do we prove it's working?",
      answer: "Analytics, dashboards and CRO so we can stop guessing, start reallocating budget and compound what works.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services – SEO, Paid Media, Web & Analytics | Avorria</title>
        <meta name="description" content="Explore Avorria's growth stack – SEO, paid media, web design, content, social and analytics. Pick the entry point that matches where your pipeline is stuck." />
        
        <meta property="og:title" content="Services – SEO, Paid Media, Web & Analytics | Avorria" />
        <meta property="og:description" content="Explore Avorria's growth stack – SEO, paid media, web design, content, social and analytics. Pick the entry point that matches where your pipeline is stuck." />
        <meta property="og:url" content="https://avorria.com/services" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services – SEO, Paid Media, Web & Analytics | Avorria" />
        <meta name="twitter:description" content="Explore Avorria's growth stack – SEO, paid media, web design, content, social and analytics. Pick the entry point that matches where your pipeline is stuck." />
        
        <link rel="canonical" href="https://avorria.com/services" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": services.map((service, index) => ({
              "@type": "Service",
              "position": index + 1,
              "name": service.title,
              "description": service.description,
              "url": `https://avorria.com${service.href}`
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroBand
          headline="Growth systems, not random campaigns."
          body="We design, build and optimise the assets that actually move your pipeline – from SEO and ads to websites, content and tracking. Every service below is delivered with the same mindset: clear strategy, precise execution and ruthless focus on commercial outcomes."
          backgroundImage={heroServicesDigital}
          cta={{ text: "Book Strategy Call", href: "/contact" }}
          minHeight="75vh"
        />

        {/* How We Grow Your Pipeline - Dark section */}
        <SectionBand background="gradient" padding="large">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6">
                How we grow your pipeline.
              </h2>
              <p className="text-lg md:text-xl text-white/75 max-w-3xl mx-auto">
                Most teams don't need more channels – they need their existing ones working together. Our stack is built around three simple questions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
              {questions.map((item, index) => (
                <div key={index} className="space-y-4">
                  <p className="text-sm font-semibold text-accent uppercase tracking-widest">
                    {item.label}
                  </p>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    {item.question}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
            
            <p className="text-center text-white/60 text-lg">
              Every service below plugs into this system. You can start with one, or let us run the whole thing.
            </p>
          </div>
        </SectionBand>

        {/* Services Grid - Light section */}
        <SectionBand background="light" padding="large">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={service.href}
                  className="group block p-8 md:p-10 rounded-xl border border-border bg-card hover:shadow-[var(--shadow-card-hover)] hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center flex-shrink-0 group-hover:from-accent/20 group-hover:to-accent/10 transition-colors">
                      <service.icon className="text-accent" size={28} />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h2 className="text-2xl md:text-3xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center text-accent font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                        Learn More
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </SectionBand>

        {/* Content Band - Visual break */}
        <ContentBand
          subheadline="Web Design & Development"
          headline="Websites that look sharp and sell hard."
          body="Every section, layout and CTA is engineered for conversions, not awards. Built on a modern stack with SEO, speed and CRO wired in from day one."
          image={serviceWebDesign}
          imageAlt="Modern website design"
          cta={{ text: "View Web Design", href: "/services/web-design" }}
          background="mesh"
        />

        {/* Where Should You Start - Dark section */}
        <SectionBand background="dark" padding="large">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6">
                Where should you start?
              </h2>
              <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto">
                You don't have to buy everything at once. Pick the entry point that matches your reality right now.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
              <div className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  "Our data is a mess."
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Start with Analytics & Conversion Optimisation. We'll fix tracking, build a clean dashboard and give you a blunt read on what's working and what isn't.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full border-white/20 text-white hover:bg-white/10">
                  <Link to="/services/analytics">
                    Fix the tracking first
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
              
              <div className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  "We need more (and better) leads."
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Start with SEO + Paid Media. We'll build a 90-day plan to increase qualified demand, then plug it into landing pages that actually convert.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full border-white/20 text-white hover:bg-white/10">
                  <Link to="/services/seo">
                    Talk traffic & pipeline
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
              
              <div className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  "Our website isn't pulling its weight."
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Start with Web Design & Development. We'll audit your site, map the journeys properly and rebuild the key pages so everything else you do isn't wasted.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full border-white/20 text-white hover:bg-white/10">
                  <Link to="/free-seo-website-audit">
                    Request a website teardown
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-light mb-4 text-white">
                Still not sure?
              </h3>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Book a strategy call or request a free audit and we'll tell you – bluntly – where your next 90 days of effort should go.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/free-seo-website-audit">
                    Get a free SEO & website audit
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                  <Link to="/contact">Book a strategy call</Link>
                </Button>
              </div>
            </div>
          </div>
        </SectionBand>
      </div>
    </>
  );
};

export default Services;
