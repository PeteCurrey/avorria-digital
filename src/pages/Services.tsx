import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Search, Target, Palette, Mail, Share2, BarChart3 } from "lucide-react";
import heroServicesDigital from "@/assets/hero-services-digital.jpg";

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
      {/* Hero Section with Parallax */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroServicesDigital})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10 px-4 sm:px-6 py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6 text-white animate-fade-in">
            Growth systems, not random campaigns.
          </h1>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 animate-fade-in-up max-w-3xl mx-auto">
            We design, build and optimise the assets that actually move your pipeline – from SEO and ads to websites, content and tracking. Every service below is delivered with the same mindset: clear strategy, precise execution and ruthless focus on commercial outcomes.
          </p>
          <Button size="lg" className="bg-card/40 backdrop-blur-sm text-foreground border border-border/50 hover:bg-card/60 animate-fade-in-up" asChild>
            <Link to="/contact">
              Book Strategy Call
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>

      {/* How We Grow Your Pipeline Section */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-light text-center mb-4 text-foreground">
            How we grow your pipeline.
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
            Most teams don't need more channels – they need their existing ones working together. Our stack is built around three simple questions.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-border">
              <CardContent className="p-8">
                <div className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">
                  Strategy & positioning
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Who are we trying to reach?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Who you're for, what you're selling and how it's priced. This is where we decide which levers to pull – and which to leave alone.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="p-8">
                <div className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">
                  Traffic & demand
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  How do we attract and convert them?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  SEO, paid media, content and social – aimed at the right problems, with the right offers, landing on pages built to convert.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="p-8">
                <div className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">
                  Tracking & optimisation
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  How do we prove it's working?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Analytics, dashboards and CRO so we can stop guessing, start reallocating budget and compound what works.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-center text-muted-foreground">
            Every service below plugs into this system. You can start with one, or let us run the whole thing.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-xl transition-all group overflow-hidden"
              >
                <CardContent className="p-10 space-y-6">
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <service.icon className="text-accent" size={28} />
                  </div>
                  <h2 className="text-3xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <Button variant="outline" asChild className="group-hover:border-accent">
                    <Link to={service.href}>
                      Learn More
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Where Should You Start Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-light text-center mb-4 text-foreground">
            Where should you start?
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            You don't have to buy everything at once. Pick the entry point that matches your reality right now.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="border-border">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  "Our data is a mess."
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start with Analytics & Conversion Optimisation. We'll fix tracking, build a clean dashboard and give you a blunt read on what's working and what isn't.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/services/analytics">
                    Fix the tracking first
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  "We need more (and better) leads."
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start with SEO + Paid Media. We'll build a 90-day plan to increase qualified demand, then plug it into landing pages that actually convert.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/services/seo">
                    Talk traffic & pipeline
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  "Our website isn't pulling its weight."
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start with Web Design & Development. We'll audit your site, map the journeys properly and rebuild the key pages so everything else you do isn't wasted.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/free-seo-website-audit">
                    Request a website teardown
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-light mb-4 text-foreground">
              Still not sure?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a strategy call or request a free audit and we'll tell you – bluntly – where your next 90 days of effort should go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/free-seo-website-audit">
                  Get a free SEO & website audit
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Book a strategy call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Services;
