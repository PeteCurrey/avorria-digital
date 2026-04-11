
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, CheckCircle, AlertCircle } from "lucide-react";

const AnalyticsTracking = () => {
  return (
    <>
      
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "SEO Services", url: "https://avorria.com/services/seo" },
        { name: "Analytics & Tracking", url: "https://avorria.com/services/seo/analytics-tracking" }
      ]} />
      <ServiceSchema
        name="Analytics & Tracking Setup"
        description="GA4 audit, tag clean-up and conversion tracking implementation. Fix your data before you spend another pound on marketing."
        url="/services/seo/analytics-tracking"
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-foreground">
              Analytics & tracking clean-up before you spend another pound.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We untangle your GA, tags and events so you can finally trust the numbers and decide what to cut, keep and scale.
            </p>
            <Button size="lg" variant="default">Fix my tracking first</Button>
          </div>
        </section>

        {/* Problems */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light mb-8 text-center text-foreground">The data nightmare</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Duplicate events and broken goals making every report suspect.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Different systems telling different stories about the same campaign.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">No clear view of which channel drives qualified leads vs noise.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light mb-12 text-center text-foreground">What we do</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <BarChart3 className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">GA4 & tag audit</h3>
                  <p className="text-muted-foreground">Complete audit of your Google Analytics, Tag Manager and tracking setup to identify gaps and duplication.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <CheckCircle className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Event & conversion schema</h3>
                  <p className="text-muted-foreground">Design a clean event and conversion schema tied to your business model and funnel stages.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <CheckCircle className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Implementation & testing</h3>
                  <p className="text-muted-foreground">Clean implementation and rigorous testing to ensure data accuracy from day one.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <BarChart3 className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Business-focused dashboards</h3>
                  <p className="text-muted-foreground">Simple dashboards focused on business metrics, not nerd charts that nobody understands.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Bridge to Reporting */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-4 text-foreground">This is where reporting starts</h2>
            <p className="text-xl text-muted-foreground mb-6">
              You can't have clear reporting without clean tracking. Once the data's right, we can build dashboards that actually help you make decisions.
            </p>
            <Button variant="outline" size="lg">See how we report</Button>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6 text-foreground">Stop guessing. Start knowing.</h2>
            <Button size="lg" variant="default">Fix my tracking first</Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AnalyticsTracking;
