import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Search, Target, Palette, Mail, Share2, BarChart3 } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Search,
      title: "SEO",
      description: "Technical SEO, site architecture, on-page optimisation and content strategy for real businesses – not bloggers. We focus on the keywords and pages that attract qualified demand and support your sales process.",
      href: "/services/seo",
    },
    {
      icon: Target,
      title: "Paid Media",
      description: "Google, Meta and LinkedIn campaigns structured around your offers, not random keywords. We tie spend to pipeline and cut anything that can't justify itself.",
      href: "/services/paid-media",
    },
    {
      icon: Palette,
      title: "Web Design & Development",
      description: "Websites, landing pages and funnels that look sharp and sell hard. Built on a modern stack with SEO, speed and CRO wired in from day one.",
      href: "/services/web-design",
    },
    {
      icon: Mail,
      title: "Content & Email Marketing",
      description: "Long-form content, playbooks and email sequences that educate buyers, warm up demand and support your sales team – without spamming your list.",
      href: "/services/content-email",
    },
    {
      icon: Share2,
      title: "Social & Personal Brand",
      description: "Consistent, credible content for founders and expert teams. Think LinkedIn, Instagram and short-form content that earns trust and inbound opportunities.",
      href: "/services/social-personal-brand",
    },
    {
      icon: BarChart3,
      title: "Analytics & Conversion Optimisation",
      description: "Fixing tracking, building useful dashboards and systematically improving conversions across your site and funnel.",
      href: "/services/analytics",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground animate-fade-in">
            Everything you need to grow in one place.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6 animate-fade-in-up">
            We design, build and optimise the assets that actually move your pipeline – from SEO and ads to websites, content and tracking.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 animate-fade-in-up max-w-2xl mx-auto">
            Every service below is delivered with the same mindset: clear strategy, precise execution, proper tracking and ruthless focus on commercial outcomes.
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

      {/* CTA Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6 text-foreground">
            Not sure which lever to pull first?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            If your setup is a mix of half-finished projects, legacy tracking and scattergun campaigns, you're not alone. Start with an audit or a strategy call and we'll map out the smartest sequence of moves.
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
      </section>
    </div>
  );
};

export default Services;
