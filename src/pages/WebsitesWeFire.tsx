import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  LayoutGrid,
  MousePointerClick,
  FileText,
  Award,
  Briefcase
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WebsitesWeFire = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    concern: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Event: websites_fire_inline_form_submitted
    console.log("Event: websites_fire_inline_form_submitted", {
      source: "websites_we_would_fire",
      focus: "web",
      formData,
    });

    // TODO: Wire to backend/ESP
    // Payload structure:
    // {
    //   name: string,
    //   email: string,
    //   website: string,
    //   concern: string,
    //   source: "websites_we_would_fire",
    //   focus: "web"
    // }

    setTimeout(() => {
      toast({
        title: "Got it – we'll take a look",
        description: "We'll send you a plain-English teardown within 3 working days.",
      });
      setFormData({ name: "", email: "", website: "", concern: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  // Event: websites_fire_page_viewed
  console.log("Event: websites_fire_page_viewed");

  const archetypes = [
    {
      icon: LayoutGrid,
      number: 1,
      title: "The 'Hero Slider From 2012'",
      tagline: "Five rotating banners, zero clarity about what you actually do.",
      looksLike: [
        "Multiple conflicting messages above the fold",
        "Generic stock photos, no clarity on offer",
        "No strong call-to-action. 'Learn more' doesn't count",
      ],
      whyFired: [
        "Confuses visitors in the first 3 seconds",
        "No obvious next step = high bounce rate",
        "You're asking busy people to do detective work. They won't",
      ],
      avorriaFix: [
        "Single, clear headline tied to a commercial outcome",
        "One primary CTA, one secondary – both high intent",
        "Hero built as a sales message, not a slideshow",
      ],
    },
    {
      icon: Briefcase,
      number: 2,
      title: "The 'We Do Everything For Everyone' Agency Site",
      tagline: "From blockchain to basket weaving – we'll take any client with a pulse.",
      looksLike: [
        "Laundry list of 15+ services on the homepage",
        "No clear positioning or ideal client profile",
        "Every page reads like a generic capabilities deck",
      ],
      whyFired: [
        "Specialists beat generalists. Always",
        "No clear fit signal = low-quality enquiries",
        "Impossible to rank or build authority for anything specific",
      ],
      avorriaFix: [
        "Clear positioning: who you serve, what outcome you deliver",
        "3-5 core services with distinct outcomes, not capabilities",
        "Each service page optimized for a specific commercial intent",
      ],
    },
    {
      icon: MousePointerClick,
      number: 3,
      title: "The 'No Clear CTA / Where Do I Click?' Homepage",
      tagline: "Beautiful imagery, inspirational quotes, zero clear next step.",
      looksLike: [
        "Multiple vague CTAs: 'Explore', 'Discover', 'Learn More'",
        "Contact info buried in the footer",
        "No obvious conversion path for high-intent visitors",
      ],
      whyFired: [
        "High-intent prospects need a clear path. Give them one or lose them",
        "Every extra decision point increases drop-off",
        "You're treating your site like art. It's a sales tool",
      ],
      avorriaFix: [
        "Primary CTA above the fold and repeated strategically",
        "Clear hierarchy: Book call > Get audit > Download resource",
        "Every section has one clear action, not a menu of options",
      ],
    },
    {
      icon: FileText,
      number: 4,
      title: "The 'Wall of Text, Zero Proof' Service Page",
      tagline: "3,000 words about your process, methodology and values. No results, no proof.",
      looksLike: [
        "Dense paragraphs explaining how great you are",
        "No case studies, testimonials or concrete outcomes",
        "Zero indication of pricing, timeline or what happens next",
      ],
      whyFired: [
        "Nobody trusts what you say about yourself without proof",
        "Busy prospects scan. They don't read manifestos",
        "No proof = no trust = no conversion",
      ],
      avorriaFix: [
        "Lead with outcomes: what this service delivers, for whom",
        "Social proof within first 2 scrolls: results, testimonials, logos",
        "Clear process, pricing bands, timeline expectations",
      ],
    },
    {
      icon: Award,
      number: 5,
      title: "The 'Beautiful But Useless' Award-Bait Site",
      tagline: "Gorgeous animations, bold typography, zero commercial clarity.",
      looksLike: [
        "Stunning visuals but impossible to work out what you do",
        "Navigation hidden behind cryptic icons",
        "More time spent on transitions than conversion strategy",
      ],
      whyFired: [
        "Awards don't pay invoices. Conversions do",
        "If prospects can't figure out what you do in 5 seconds, they leave",
        "Design should amplify clarity, not obscure it",
      ],
      avorriaFix: [
        "Premium aesthetics that enhance the message, not replace it",
        "Clear navigation, obvious CTAs, scannable hierarchy",
        "Beautiful AND functional – conversion and design are not enemies",
      ],
    },
  ];

  const fireChecklist = [
    "Hero sliders, carousels or auto-rotating banners",
    "Multiple conflicting CTAs above the fold",
    "No social proof until halfway down the page",
    "No mention of pricing, process or proof",
    "Contact form buried after 10 scrolls",
  ];

  const fixChecklist = [
    "One clear message and offer per page",
    "Primary CTA above the fold and repeated logically",
    "Case studies / testimonials close to key CTAs",
    "Simple, honest copy about pricing and delivery",
    "Frictionless forms and clear 'what happens next'",
  ];

  const beforeAfter = [
    {
      area: "Hero & Above the Fold",
      before: [
        "Vague tagline with no clear outcome",
        "Generic hero slider cycling through 5 messages",
        "No obvious CTA or next step",
      ],
      after: [
        "Clear proposition tied to business outcome",
        "One powerful CTA with contrast and context",
        "Sharp benefit bullets answering 'why this, why now'",
      ],
    },
    {
      area: "Service Page",
      before: [
        "Laundry list of services with no differentiation",
        "Process-focused copy with no outcomes",
        "Zero proof or case studies",
      ],
      after: [
        "One service, clear outcomes, who it's for",
        "Results, testimonials and proof early",
        "Obvious CTA with next-step clarity",
      ],
    },
    {
      area: "Contact / Enquiry Flow",
      before: [
        "Long, generic form with 12+ fields",
        "No indication of what happens next",
        "Hidden on a separate page",
      ],
      after: [
        "Short, focused form (4-6 fields max)",
        "Clear expectations: response time, next steps",
        "Multiple entry points across the site",
      ],
    },
  ];

  const results = [
    {
      title: "Homepage & Service Page Rebuild",
      metric: "+63% qualified enquiries",
      context: "in 3 months, same traffic volume",
    },
    {
      title: "Simplified Contact Flow",
      metric: "+38% booked calls",
      context: "without changing traffic sources",
    },
    {
      title: "Vague → Conversion-Led Rebuild",
      metric: "2x pipeline from inbound",
      context: "within first quarter",
    },
  ];

  const faqs = [
    {
      question: "Do I need a full rebuild or can you optimise what I've got?",
      answer: "Depends on the foundation. If the site's structure, navigation and core pages are solid, we can optimize. If it's fundamentally unclear, slow or conversion-hostile, a rebuild is faster and cheaper long-term. We'll be honest in the teardown.",
    },
    {
      question: "How long does a typical rebuild take?",
      answer: "For a service business with 5-10 core pages: 4-8 weeks from kickoff to launch. Larger sites or complex funnels take longer. We scope this properly in the strategy phase so there are no surprises.",
    },
    {
      question: "Do you handle copy, design and dev in-house?",
      answer: "Yes. We don't outsource. Copy is conversion-focused (not marketing fluff), design is premium but functional, and dev is built for performance, SEO and tracking from day one.",
    },
    {
      question: "Will you migrate tracking and SEO properly?",
      answer: "Absolutely. We audit current tracking, set up GA4, tag manager and conversion events properly, handle 301 redirects, preserve link equity, and make sure nothing breaks. This isn't an afterthought – it's core to the process.",
    },
    {
      question: "What kind of budget do we need to take this seriously?",
      answer: "For a proper conversion-led rebuild with strategy, copy, design, dev and tracking: expect £15k–£40k depending on scope. For landing page or funnel-specific work: £5k–£15k. If those numbers feel high, DIY tools like Webflow or Squarespace might be a better fit.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Websites We'd Fire (And How We'd Fix Them) | Avorria</title>
        <meta
          name="description"
          content="A teardown of common website disasters and how Avorria rebuilds them for conversion. If your homepage is a vanity brochure instead of a sales asset, it's costing you."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-light text-foreground">
                  Websites We'd Fire <span className="text-accent">(And How We'd Fix Them)</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  If your homepage is a vanity brochure instead of a sales asset, it's quietly taxing your pipeline. Here's what we'd sack on sight – and what an Avorria rebuild would do instead.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={() => {
                      console.log("Event: websites_fire_cta_audit_clicked", { cta: "hero_primary" });
                      window.location.href = "/free-seo-website-audit?focus=web&source=websites-we-would-fire";
                    }}
                  >
                    Get a Website & Funnel Teardown
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      console.log("Event: websites_fire_cta_audit_clicked", { cta: "hero_secondary" });
                      window.location.href = "/contact";
                    }}
                  >
                    Talk About a Rebuild
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Card className="p-8 bg-card/50 backdrop-blur border-destructive/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-destructive">
                      <XCircle className="h-8 w-8" />
                      <span className="font-medium">Sites That Cost You Money</span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>✗ Hero sliders from 2012</p>
                      <p>✗ No clear CTA or value prop</p>
                      <p>✗ Beautiful but commercially useless</p>
                      <p>✗ Zero proof, all promise</p>
                      <p>✗ Contact form buried in footer</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Archetype Teardowns */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {archetypes.map((archetype) => {
                const Icon = archetype.icon;
                return (
                  <Card key={archetype.number} className="p-8 lg:p-12">
                    <div className="space-y-8">
                      {/* Header */}
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-accent/10">
                          <Icon className="h-8 w-8 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-3xl font-light text-foreground mb-2">
                            {archetype.number}. {archetype.title}
                          </h2>
                          <p className="text-lg text-muted-foreground italic">
                            {archetype.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Three Columns */}
                      <div className="grid md:grid-cols-3 gap-8">
                        {/* What It Looks Like */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-foreground">
                            <AlertCircle className="h-5 w-5 text-muted-foreground" />
                            <h3 className="font-medium">What It Looks Like</h3>
                          </div>
                          <ul className="space-y-2">
                            {archetype.looksLike.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-destructive">✗</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Why This Gets Fired */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-foreground">
                            <XCircle className="h-5 w-5 text-destructive" />
                            <h3 className="font-medium">Why This Gets Fired</h3>
                          </div>
                          <ul className="space-y-2">
                            {archetype.whyFired.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-destructive">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Avorria Fix */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-foreground">
                            <CheckCircle2 className="h-5 w-5 text-accent" />
                            <h3 className="font-medium">Avorria Fix</h3>
                          </div>
                          <ul className="space-y-2">
                            {archetype.avorriaFix.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-accent">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Conversion Checklist */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-foreground mb-4">
                Quick Conversion Checklist
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                An honest assessment of what's killing your conversions and what you need instead.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Fire List */}
              <Card className="p-8 bg-destructive/5 border-destructive/20">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="h-6 w-6 text-destructive" />
                  <h3 className="text-xl font-medium text-foreground">If Your Site Has These...</h3>
                </div>
                <ul className="space-y-3">
                  {fireChecklist.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-muted-foreground">
                      <span className="text-destructive mt-1">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Fix List */}
              <Card className="p-8 bg-accent/5 border-accent/20">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                  <h3 className="text-xl font-medium text-foreground">Your Site Needs This Instead...</h3>
                </div>
                <ul className="space-y-3">
                  {fixChecklist.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-muted-foreground">
                      <span className="text-accent mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button
                size="lg"
                onClick={() => {
                  console.log("Event: websites_fire_cta_audit_clicked", { cta: "checklist_section" });
                  window.location.href = "/free-seo-website-audit?source=websites-we-would-fire";
                }}
              >
                Not Sure Where Your Site Lands? Request a Teardown
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Inline Teardown Form */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-foreground mb-4">
                  Send Us Your Site. We'll Tell You What to Fix First.
                </h2>
                <p className="text-muted-foreground">
                  Plain-English teardown delivered within 3 working days.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://yoursite.com"
                    value={formData.website}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="concern">What worries you most about your current site?</Label>
                  <Textarea
                    id="concern"
                    name="concern"
                    rows={4}
                    placeholder="e.g. Lots of traffic but few enquiries, unclear messaging, looks dated..."
                    value={formData.concern}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Request My Website Teardown"}
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* Before & After Strip */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-foreground mb-4">
                Before vs After: What Actually Changes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                It's not just prettier. It's commercially sharper.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {beforeAfter.map((item, idx) => (
                <Card key={idx} className="p-6">
                  <h3 className="text-xl font-medium text-foreground mb-6 pb-4 border-b border-border">
                    {item.area}
                  </h3>

                  <div className="space-y-6">
                    {/* Before */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <XCircle className="h-5 w-5 text-destructive" />
                        <span className="font-medium text-foreground">Before</span>
                      </div>
                      <ul className="space-y-2">
                        {item.before.map((point, pidx) => (
                          <li key={pidx} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-destructive">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* After */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                        <span className="font-medium text-foreground">After</span>
                      </div>
                      <ul className="space-y-2">
                        {item.after.map((point, pidx) => (
                          <li key={pidx} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-accent">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div
              className="text-center mt-8"
              onMouseEnter={() => console.log("Event: websites_fire_before_after_section_viewed")}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  console.log("Event: websites_fire_cta_audit_clicked", { cta: "before_after_section" });
                  window.location.href = "/reporting/demo";
                }}
              >
                See How We Report Instead
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Results Block */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-foreground mb-4">
                What Happens When You Stop Letting Your Site Coast
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real outcomes from rebuilding sites for conversion, not awards.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {results.map((result, idx) => (
                <Card key={idx} className="p-6 text-center">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {result.title}
                    </h3>
                    <div className="text-4xl font-light text-accent">
                      {result.metric}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result.context}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, idx) => (
                <Card key={idx} className="p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-light text-foreground mb-6">
              Ready to Stop Wasting Money on a Site That Doesn't Convert?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Request a teardown and we'll show you exactly what's broken and how we'd fix it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => {
                  console.log("Event: websites_fire_cta_audit_clicked", { cta: "final_primary" });
                  window.location.href = "/free-seo-website-audit?source=websites-we-would-fire";
                }}
              >
                Get Your Free Teardown
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  console.log("Event: websites_fire_cta_audit_clicked", { cta: "final_secondary" });
                  window.location.href = "/contact";
                }}
              >
                Book a Strategy Call
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WebsitesWeFire;
