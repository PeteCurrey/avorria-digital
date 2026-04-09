'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs, getFAQsByCategory, categoryLabels } from "@/data/faqs";
import type { FAQ } from "@/data/faqs";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";

const FAQs = () => {
  const categories: FAQ['category'][] = [
    "working-with-avorria",
    "pricing-budgets",
    "seo",
    "web-funnels",
    "reporting-data"
  ];

  // Build FAQ items for schema
  const allFaqItems = faqs.map(f => ({ question: f.question, answer: f.answer }));

  return (
    <>
      <SEOHead
        title="FAQs – All Your Questions Answered"
        description="Everything we're asked most often about strategy, pricing, process and working with Avorria – SEO, web design, paid media and analytics."
        canonical="/faqs"
        keywords={["avorria FAQ", "digital marketing questions", "SEO FAQ", "marketing agency FAQ", "web design FAQ"]}
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://avorria.com" }, { name: "FAQs", url: "https://avorria.com/faqs" }]} />
      <FAQSchema faqs={allFaqItems} />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative pt-32 pb-16 px-4 overflow-hidden">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.06),transparent_70%)]" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <ScrollReveal>
              <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-accent/80 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
                FAQs
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 text-foreground">
                All your questions,{" "}
                <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(320,85%,55%)] to-[hsl(280,75%,60%)]">
                  answered.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Everything we're asked most often about strategy, pricing, process and working with Avorria – in one page.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="pb-16 px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {categories.map((category, catIndex) => {
              const categoryFAQs = getFAQsByCategory(category);
              if (categoryFAQs.length === 0) return null;

              return (
                <ScrollReveal key={category} delay={catIndex * 80}>
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px flex-1 bg-border/50" />
                      <h2 className="text-xl sm:text-2xl font-semibold text-foreground whitespace-nowrap">
                        {categoryLabels[category]}
                      </h2>
                      <div className="h-px flex-1 bg-border/50" />
                    </div>
                    <Accordion type="single" collapsible className="space-y-3">
                      {categoryFAQs.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`${category}-${index}`}
                          className="border border-border/60 rounded-lg px-6 bg-card/50 transition-all duration-200 hover:border-accent/20"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-5">
                            <span className="text-base sm:text-lg font-medium text-foreground">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground pt-1 pb-4 leading-relaxed">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24 px-4 overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, hsl(320 85% 55% / 0.08), transparent 70%), hsl(220 25% 6%)' }}>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-light mb-6 text-white">Still have questions?</h2>
              <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                Book a free strategy call and we'll walk through your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="accent" asChild>
                  <Link href="/contact">
                    Book a strategy call
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button size="lg" asChild className="border border-white/20 bg-white/[0.06] text-white hover:bg-white/10 backdrop-blur-sm">
                  <Link href="/free-seo-website-audit">
                    Request a free audit
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQs;

