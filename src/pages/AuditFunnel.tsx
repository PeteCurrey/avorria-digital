import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import { trackCTAClick } from "@/lib/tracking";
import Footer from "@/components/Footer";
import { InlineLeadForm } from "@/components/InlineLeadForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, Video, FileText, BarChart3, ListChecks } from "lucide-react";
export default function AuditFunnel() {
  const scrollToForm = () => {
    trackCTAClick('request_audit', '#audit-form', 'hero');
    document.getElementById("audit-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <>
      <Helmet>
        <title>Free SEO & Website Audit - No Fluff, Just Reality | Avorria</title>
        <meta name="description" content="Get a custom video or written teardown of your site, SEO and tracking. Clear, actionable recommendations – whether you work with us or not." />
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
            <h1 className="text-4xl font-light text-foreground md:text-3xl">
              Free SEO & Website Audit – No BS, Just a Reality Check
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We'll review your site, SEO and tracking, then send you a short, plain-English teardown with clear next steps – whether you work with us or not.
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
                      Delivered within 2–3 working days
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={scrollToForm}>
                Request my audit
              </Button>
              <Button size="lg" variant="outline" onClick={() => {
              trackCTAClick('see_whats_included', '#what-you-get', 'hero');
              document.getElementById("what-you-get")?.scrollIntoView({
                behavior: "smooth"
              });
            }}>
                See what's included
              </Button>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section id="what-you-get" className="py-16 px-4 bg-muted/20">
          <div className="container max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
                What's actually in the audit.
              </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <Video className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-light mb-3 text-foreground">
                  Technical & SEO snapshot
                </h3>
                <p className="text-muted-foreground">
                  We'll flag key technical issues, structural problems and obvious SEO gaps that are holding you back.
                </p>
              </Card>

              <Card className="p-8">
                <FileText className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-light mb-3 text-foreground">
                  Website & conversion review
                </h3>
                <p className="text-muted-foreground">
                  We look at your homepage, key service pages and main journeys through the lens of "would this make me enquire?".
                </p>
              </Card>

              <Card className="p-8">
                <BarChart3 className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-light mb-3 text-foreground">
                  Tracking sanity check
                </h3>
                <p className="text-muted-foreground">
                  If you've got analytics and pixels, we'll check whether they're set up in a way that lets you make real decisions.
                </p>
              </Card>

              <Card className="p-8">
                <ListChecks className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-light mb-3 text-foreground">
                  Prioritised action list
                </h3>
                <p className="text-muted-foreground">
                  You'll get a simple list of what we'd do in the next 90 days – ordered by impact vs effort.
                </p>
              </Card>
            </div>

            <div className="mt-12 p-6 border border-accent/20 rounded-lg bg-accent/5">
              <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                You'll get a short, honest assessment and a prioritised fix list. If you want our help implementing it, we can talk. If not, you still know what needs doing.
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
                    <span>You're already spending something on marketing and want to know if it's working as hard as it should.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>You have a live website, some traffic and at least basic analytics set up.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>You're open to making changes if the audit shows clear issues.</span>
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
                    <span>You don't have a website or live product/service yet.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>You just want a generic template report for the file.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>You have no intention of changing anything, whatever we find.</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Audit Request Form */}
        <section id="audit-form" className="py-16 px-4 bg-muted/20">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-light mb-4 text-foreground">Request your audit.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tell us who you are, where your site lives and what you're worried about. We'll dig in and send you a short, direct review – no scripts, no fluff.
              </p>
            </div>
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
                Thanks – we've got your request. We'll review your setup and send your audit within 2–3 working days. If we think you're in good shape already, we'll tell you. If not, you'll know exactly why.
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
                  Yes. You'll get a short, honest assessment and a prioritised fix list. If you want our help implementing it, we can talk. If not, you still know what needs doing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Do I have to jump on a call?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No. The audit is delivered first. You can then decide if you want to schedule a call to walk through it.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  How detailed is the audit?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  It's detailed enough to make decisions. This isn't a 60-page technical thesis, it's a focused view on what will move the needle fastest.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  What access do you need?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  At minimum, your website URL. If you're happy to give us temporary access to analytics or ad accounts, we can go deeper.
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
    </>;
}