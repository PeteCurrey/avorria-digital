import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Target, TrendingUp } from "lucide-react";

const ContentSEO = () => {
  return (
    <>
      
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "SEO Services", url: "https://avorria.com/services/seo" },
        { name: "Content SEO", url: "https://avorria.com/services/seo/content" }
      ]} />
      <ServiceSchema
        name="Content SEO Services"
        description="Strategic content systems built around topics and intent. Topic clustering, pillar content and ongoing optimisation that drives pipeline."
        url="/services/seo/content"
        aggregateRating={{ ratingValue: 4.8, reviewCount: 29 }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-foreground">
              Content that ranks, reads well and feeds your funnel.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We design content systems around topics and intent – not just random blog posts – then tie them back to your offers and sales process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default">Talk content strategy</Button>
              <Button size="lg" variant="outline">See our SEO guide</Button>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light mb-8 text-center text-foreground">The content graveyard</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Blog graveyard: lots of posts, no traffic.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">No clear topic clusters or strategic direction.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">No link between content and sales outcomes.</p>
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
                  <Target className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Commercial intent research</h3>
                  <p className="text-muted-foreground">Keyword & topic research focused on commercial intent – not just search volume.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <FileText className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Topic clustering</h3>
                  <p className="text-muted-foreground">Clustered content plans with pillar + supporting pieces that build authority systematically.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <TrendingUp className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Production or briefs</h3>
                  <p className="text-muted-foreground">Full production or detailed briefs – depending on your engagement model and in-house capability.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <TrendingUp className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3 text-foreground">Ongoing optimisation</h3>
                  <p className="text-muted-foreground">Continuous optimisation of existing content based on performance data and search evolution.</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">This plugs directly into the SEO strategy, resources pages and your sales funnel – not a separate content island.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6 text-foreground">Turn content into a pipeline engine</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default">Talk content strategy</Button>
              <Button size="lg" variant="outline">See our SEO guide</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContentSEO;

