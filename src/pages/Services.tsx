import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Search, Target, Palette, Mail, Share2, BarChart3 } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Search,
      title: "SEO Services",
      description: "Technical SEO, content strategy, and link building engineered for revenue growth. We don't just chase rankings—we build systems that turn organic traffic into qualified leads and paying customers.",
      href: "/services/seo",
      highlights: [
        "Technical audits & fixes",
        "Content strategy & clusters",
        "Link building & authority",
        "Local SEO & schema markup",
        "Analytics & conversion tracking",
      ],
    },
    {
      icon: Target,
      title: "Paid Media",
      description: "Performance campaigns across Google Ads, Meta, and LinkedIn. Every campaign is built around your sales funnel, with full conversion tracking and transparent ROI reporting.",
      href: "/services/paid-media",
      highlights: [
        "Google Ads (Search, Display, Shopping)",
        "Meta Ads (Facebook & Instagram)",
        "LinkedIn Ads for B2B",
        "Landing page optimization",
        "Conversion tracking & attribution",
      ],
    },
    {
      icon: Palette,
      title: "Web Design & Development",
      description: "Modern, fast, conversion-optimized websites that blend premium design with technical excellence. Built for performance, SEO, and measurable business results.",
      href: "/services/web-design",
      highlights: [
        "UX research & design systems",
        "Conversion-focused layouts",
        "Modern tech stack (fast & secure)",
        "Mobile-first responsive design",
        "Technical SEO baked in",
      ],
    },
    {
      icon: Mail,
      title: "Content & Email Marketing",
      description: "Long-form SEO content and automated email sequences that educate, nurture, and convert. Every piece is tied to your sales process and business goals.",
      href: "/services/content-email",
      highlights: [
        "SEO-driven content strategy",
        "Blog articles & pillar pages",
        "Email nurture sequences",
        "Marketing automation",
        "Lead magnet creation",
      ],
    },
    {
      icon: Share2,
      title: "Social & Personal Brand",
      description: "LinkedIn and Instagram content systems for founders and consultants. We build your authority, grow your audience, and drive inbound opportunities.",
      href: "/services/social-personal-brand",
      highlights: [
        "LinkedIn ghostwriting",
        "Content calendar & strategy",
        "Personal brand positioning",
        "Lead capture funnels",
        "Community engagement",
      ],
    },
    {
      icon: BarChart3,
      title: "Analytics & CRO",
      description: "Comprehensive tracking setup, data analysis, and conversion rate optimization. We make sure you're measuring what matters and improving it systematically.",
      href: "/services/analytics",
      highlights: [
        "Google Analytics 4 setup",
        "Conversion tracking implementation",
        "Custom dashboards & reporting",
        "A/B testing & experiments",
        "Funnel analysis & optimization",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground animate-fade-in">
            Digital marketing services that actually{" "}
            <span className="font-semibold text-accent">drive revenue</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-in-up">
            Full-stack strategy, execution, and optimization across every channel that matters to your business.
          </p>
          <Button variant="accent" size="lg" asChild className="animate-fade-in-up">
            <Link to="/contact">
              Book a Strategy Call
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-xl transition-all group overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-3 p-10 space-y-6">
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
                    </div>
                    <div className="md:col-span-2 bg-secondary p-10 flex items-center">
                      <div className="space-y-4 w-full">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                          What's Included
                        </p>
                        <ul className="space-y-3">
                          {service.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="flex items-start text-sm text-foreground">
                              <span className="text-accent mr-2 mt-0.5">✓</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6 text-foreground">
            Not sure which service is right for you?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book a free strategy call. We'll assess your current situation, identify opportunities, and recommend the best approach for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact">
                Book Strategy Call
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
