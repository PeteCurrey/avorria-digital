import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { InlineLeadForm } from "@/components/InlineLeadForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, X, Video, FileText, BarChart3, ListChecks } from "lucide-react";

export default function AuditFunnel() {
  const handleCTAClick = (action: string) => {
    console.log("Event: cta_" + action);
  };

  const scrollToForm = () => {
    document.getElementById("audit-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Free SEO & Website Audit - No Fluff, Just Reality | Avorria</title>
        <meta
          name="description"
          content="Get a custom video or written teardown of your site, SEO and tracking. Clear, actionable recommendations – whether you work with us or not."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "SEO & Website Audit",
            "provider": {
              "@type": "Organization",
              "name": "Avorria"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "GBP"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-light text-foreground">
              Free SEO & Website Audit – No Fluff, Just a Reality Check
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We'll review your site, SEO and tracking and send you a short, plain-English teardown with clear next steps – whether you work with us or not.
            </p>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <Card className="p-6 text-left">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground">
                      Custom video or written teardown – not a generic PDF
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 text-left">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground">
                      Specific recommendations prioritised by impact and effort
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 text-left">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground">
                      Clear answer: fix, rebuild or scale
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={scrollToForm}>
                Request my audit
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  handleCTAClick("see_whats_included");
                  document.getElementById("what-you-get")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                See what's included
              </Button>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section id="what-you-get" className="py-16 px-4 bg-muted/20">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
              What You Get
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <Video className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-light mb-3 text-foreground">
                  Technical SEO & Site Health Snapshot
                </h3>
                <p className="text-muted-foreground">
                  We'll check your site speed, mobile experience, indexability, and core technical foundations. You'll get a clear list of what's broken and what to fix first.
                </p>
              </Card>

              <Card className="p-8">
                <FileText className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-light mb-3 text-foreground">
                  Homepage & Key Page Conversion Review
                </h3>
                <p className="text-muted-foreground">
                  Is your homepage converting visitors into leads? We'll review your messaging, CTAs, trust signals and UX – and tell you what's costing you conversions.
                </p>
              </Card>

              <Card className="p-8">
                <BarChart3 className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-light mb-3 text-foreground">
                  Traffic & Tracking Review
                </h3>
                <p className="text-muted-foreground">
                  If you share access, we'll review your GA4 setup, ad tracking, and CRM integration. You'll know exactly what's being measured (or not).
                </p>
              </Card>

              <Card className="p-8">
                <ListChecks className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-light mb-3 text-foreground">
                  Prioritised Action List for the Next 90 Days
                </h3>
                <p className="text-muted-foreground">
                  No overwhelming 200-point checklist. Just the 5–10 actions that will move the needle most, ranked by effort vs impact.
                </p>
              </Card>
            </div>

            <div className="mt-12 p-6 border border-accent/20 rounded-lg bg-accent/5">
              <p className="text-center text-muted-foreground">
                <strong className="text-foreground">This is not a sales call.</strong> It's a review. If there's an opportunity to work together, we'll mention it – but the audit is valuable whether you hire us or not.
              </p>
            </div>
          </div>
        </section>

        {/* Who It's For Section */}
        <section className="py-16 px-4">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
              Who It's For (And Who It's Not)
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-accent/50">
                <div className="flex items-center gap-3 mb-6">
                  <Check className="w-6 h-6 text-accent" />
                  <h3 className="text-2xl font-light text-foreground">Good Fit</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Businesses already spending on marketing (ads/SEO/email)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Teams with at least a basic website and analytics setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>People willing to implement changes or engage a partner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Decision-makers who want straight answers, not fluff</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 border-muted">
                <div className="flex items-center gap-3 mb-6">
                  <X className="w-6 h-6 text-muted-foreground" />
                  <h3 className="text-2xl font-light text-foreground">Not a Good Fit</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>Pre-launch ideas with no website or traffic yet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>People looking for a generic template report</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>Those not prepared to make any changes to their site or strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>Anyone expecting instant results or magic fixes</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Audit Request Form */}
        <section id="audit-form" className="py-16 px-4 bg-muted/20">
          <div className="container max-w-4xl mx-auto">
            <InlineLeadForm source="audit-funnel" />
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <p className="text-muted-foreground italic mb-4">
                  "The audit showed us exactly where we were haemorrhaging budget. Fixed three tracking issues in week one and saw immediate improvement in our lead quality."
                </p>
                <p className="text-sm text-foreground">
                  <strong>Sarah Chen</strong>, Marketing Director, Legal SaaS
                </p>
                <p className="text-sm text-accent">+41% qualified leads in 90 days</p>
              </Card>

              <Card className="p-6">
                <p className="text-muted-foreground italic mb-4">
                  "Most agencies just want to sell you a retainer. Avorria's audit was genuinely useful whether we worked with them or not. We hired them anyway."
                </p>
                <p className="text-sm text-foreground">
                  <strong>James Harper</strong>, Founder, Home Services
                </p>
                <p className="text-sm text-accent">3.2x ROAS after website rebuild</p>
              </Card>
            </div>

            <Card className="p-8 bg-accent/5 border-accent/20">
              <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                <strong className="text-foreground">Most 'free audits' are just lead magnets.</strong> This one is built to help you make a decision – keep your current setup, overhaul it, or bring in a partner. That's it.
              </p>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Is this really free?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. No credit card, no commitment. We'll send you the audit whether you book a call with us or not. The only cost is your time filling out the form.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Do I have to jump on a sales call?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No. The audit is delivered via email (video or written format). If you want to discuss it further, we'll offer a strategy call – but it's not required.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  What format is the audit delivered in?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Usually a short Loom video (5–10 minutes) walking through your site, plus a written summary with action items. For more complex sites, we'll deliver a structured document with screenshots and priority rankings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  What access do you need?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We can do a surface-level audit with just your website URL. For a deeper review (especially tracking and analytics), we'd need view-only access to Google Analytics and/or your ad accounts. You can choose to share or not.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  What happens after the audit?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We'll send you the audit within 2–3 working days. After that, it's up to you. You can implement the recommendations yourself, brief another agency, or book a call with us to discuss next steps. No pressure either way.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">
                  How long does it take to get results?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You'll receive the audit in 2–3 working days. If you implement the recommendations, quick wins (like fixing technical issues or improving CTAs) can show results within weeks. Bigger strategic shifts (like content or authority building) take 3–6 months.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Ready for a reality check?
            </h2>
            <p className="text-xl text-muted-foreground">
              No fluff, no 40-page reports. Just clear, actionable recommendations you can use – whether you work with us or not.
            </p>
            <Button size="lg" onClick={scrollToForm}>
              Request my free audit
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
