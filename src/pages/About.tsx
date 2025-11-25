import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Zap, Shield, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Revenue-First Mindset",
      description: "Every campaign, every optimization, every decision is tied directly to business outcomes. We measure success by your growth, not our activity.",
    },
    {
      icon: Zap,
      title: "Move Fast, Think Deep",
      description: "We combine strategic rigor with execution speed. AI enhances our workflows, but human expertise drives every decision.",
    },
    {
      icon: Shield,
      title: "Radical Transparency",
      description: "You'll always know what we're doing, why we're doing it, and how it's performing. No black boxes, no agency mystique.",
    },
    {
      icon: Users,
      title: "Partnership, Not Vendor",
      description: "We're an extension of your team, not a distant service provider. Your wins are our wins.",
    },
  ];

  const team = [
    {
      name: "Strategic Lead",
      role: "Digital Strategy & Analytics",
      description: "Translates business goals into measurable digital strategies. Data-driven decision making is the foundation of everything.",
    },
    {
      name: "SEO Director",
      role: "Technical SEO & Content",
      description: "Combines technical excellence with content strategy to build organic engines that drive qualified leads.",
    },
    {
      name: "Creative Lead",
      role: "Web Design & UX",
      description: "Designs sites that don't just look premium—they convert. Every layout decision is backed by data and user behavior.",
    },
    {
      name: "Performance Lead",
      role: "Paid Media & CRO",
      description: "Engineers campaigns for pipeline, not impressions. Obsessed with ROI, testing, and continuous optimization.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-6 text-foreground text-center animate-fade-in">
            Strategy, creativity, and execution{" "}
            <span className="font-semibold text-accent">under one roof</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed text-center mb-10 animate-fade-in-up">
            Avorria exists because most agencies confuse activity with results. We're different.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              We started Avorria after years of watching businesses waste budgets on agencies that couldn't connect their work to actual revenue growth. Keyword reports, vanity metrics, beautiful creative with no conversion strategy—it was everywhere.
            </p>
            <p>
              The problem wasn't a lack of talent. It was a lack of accountability and a fundamental misunderstanding of what businesses actually need: <span className="text-foreground font-semibold">measurable growth tied to their bottom line</span>.
            </p>
            <p>
              So we built Avorria around a simple idea: treat marketing like a business function, not an art project. That means clear strategies, transparent reporting, and obsessive focus on metrics that matter—leads, pipeline, revenue.
            </p>
            <p className="text-foreground font-semibold">
              We're not here to win awards or look clever. We're here to help you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              What drives us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our values aren't just wall art. They guide every decision we make.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <value.icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              The team behind the results
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialists who think like business owners, not creatives chasing awards.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/10 mx-auto flex items-center justify-center">
                    <span className="text-2xl font-light text-accent">{member.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-accent font-medium">{member.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 text-foreground">
              How we work with clients
            </h2>
          </div>
          <Card className="border-border">
            <CardContent className="p-10 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Partnership Model</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We integrate with your team as a strategic partner, not a distant vendor. You'll have direct access to specialists, regular strategy sessions, and a shared Slack channel for fast communication.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Communication Cadence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Weekly async updates, bi-weekly strategy calls, and monthly deep-dive reports. We're responsive, but we don't waste your time with unnecessary meetings.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Reporting Rhythm</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Real-time dashboards for daily performance checks. Detailed monthly reports that focus on business metrics: leads, pipeline value, cost per acquisition, and revenue attribution. No vanity fluff.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Continuous Optimization</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Marketing isn't set-and-forget. We continuously test, learn, and refine based on data. Every month brings new insights and optimizations that compound over time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-light mb-6 text-foreground">
            Ready to work with a team that treats your budget like their own?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book a strategy call to discuss your goals, challenges, and how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact">
                Book a Strategy Call
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
