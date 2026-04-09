import Link from "next/link";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Shield, CheckCircle } from "lucide-react";

const WebsiteMigrations = () => {
  return (
    <>
      <SEOHead
        title="SEO-Safe Website Migrations – Protect Your Rankings"
        description="SEO-safe website migrations. We plan and execute migrations so you don't lose rankings, traffic and leads when you relaunch."
        canonical="/services/seo/migrations"
        keywords={["website migration", "SEO migration", "site relaunch", "URL mapping", "redirect strategy", "migration checklist"]}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "SEO Services", url: "https://avorria.com/services/seo" },
        { name: "Website Migrations", url: "https://avorria.com/services/seo/migrations" }
      ]} />
      <ServiceSchema
        name="SEO-Safe Website Migrations"
        description="Plan and execute website migrations without losing rankings, traffic and leads. URL mapping, redirect strategy and post-launch monitoring."
        url="/services/seo/migrations"
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-foreground">
              SEO-safe website migrations.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We plan and execute migrations so you don't torch your rankings, traffic and leads when you relaunch.
            </p>
            <Button size="lg" variant="default">Talk about an upcoming migration</Button>
          </div>
        </section>

        {/* Risks */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light mb-8 text-center text-foreground">What goes wrong</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Traffic drops 30–50% overnight because redirects weren't mapped properly.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Lost URLs mean lost backlinks and lost authority that took years to build.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Botched redirects create redirect chains, loops and 404s that tank rankings.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light mb-12 text-center text-foreground">What's included</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <Shield className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Pre-migration mapping</h3>
                  <p className="text-muted-foreground">Complete URL inventories, traffic and backlink benchmarks captured before anything moves.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <CheckCircle className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Redirect strategy</h3>
                  <p className="text-muted-foreground">Redirect mapping and testing to preserve link equity and user experience.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <CheckCircle className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Launch support</h3>
                  <p className="text-muted-foreground">On-call launch support to catch and fix issues in real-time during go-live.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <Shield className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Post-migration monitoring</h3>
                  <p className="text-muted-foreground">30–60 day monitoring and fixes as data comes in and patterns emerge.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light mb-12 text-center text-foreground">The migration timeline</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-medium text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-foreground">Pre-launch (2–4 weeks before)</h3>
                      <p className="text-muted-foreground">Benchmark capture, URL mapping, redirect planning and technical audit of the new site.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-medium text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-foreground">Launch day</h3>
                      <p className="text-muted-foreground">Live support, immediate issue triage and real-time fixes as the site goes live.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-medium text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-foreground">Post-launch (30–60 days)</h3>
                      <p className="text-muted-foreground">Monitoring, 404 fixes, redirect adjustments and performance analysis to ensure traffic stabilises.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6 text-foreground">Planning a relaunch? Talk to us first.</h2>
            <Button size="lg" variant="default">Talk about an upcoming migration</Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default WebsiteMigrations;

