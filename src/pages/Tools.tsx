import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, FileCheck, Calculator, ArrowRight } from "lucide-react";

const Tools = () => {
  const tools = [
    {
      title: "Website Health Check",
      description: "Free analysis of your website's SEO, performance, conversion design and tracking setup.",
      icon: Activity,
      path: "/website-health-check",
      targetUser: "For businesses wanting to understand where their site is letting them down",
    },
    {
      title: "Free SEO & Website Audit",
      description: "Custom video or written teardown with specific recommendations prioritised by impact.",
      icon: FileCheck,
      path: "/free-seo-website-audit",
      targetUser: "For teams who want genuine value, not generic PDFs",
    },
    {
      title: "Project Estimator",
      description: "Multi-step wizard to self-qualify and get ballpark investment ranges for your project.",
      icon: Calculator,
      path: "/project-estimator",
      targetUser: "For serious prospects who want realistic budgets before booking a call",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Free Tools & Calculators | Avorria</title>
        <meta
          name="description"
          content="Use Avorria's free tools to check your website health, get a custom SEO audit, or estimate project costs. No fluff, just actionable insights."
        />
        <link rel="canonical" href="https://avorria.com/tools" />

        {/* Open Graph */}
        <meta property="og:title" content="Free Tools & Calculators | Avorria" />
        <meta
          property="og:description"
          content="Use Avorria's free tools to check your website health, get a custom SEO audit, or estimate project costs. No fluff, just actionable insights."
        />
        <meta property="og:url" content="https://avorria.com/tools" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Tools & Calculators | Avorria" />
        <meta
          name="twitter:description"
          content="Use Avorria's free tools to check your website health, get a custom SEO audit, or estimate project costs. No fluff, just actionable insights."
        />
      </Helmet>

      <Navigation />

      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Free Tools & Calculators
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Self-service tools to check your website health, get custom audits, and estimate project costs.
              No fluff, just actionable insights.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.path} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl mb-2">{tool.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                    <p className="text-xs text-muted-foreground italic mb-4 pb-4 border-b border-border">
                      {tool.targetUser}
                    </p>
                    <Link to={tool.path}>
                      <Button className="w-full">
                        Use this tool
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-light text-foreground mb-3">
                Need something more tailored?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                These tools give you a starting point, but if you want a deeper dive or strategic guidance,
                book a call with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg">Book a strategy call</Button>
                </Link>
                <Link to="/reporting/demo">
                  <Button size="lg" variant="outline">
                    See how we report
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Tools;
