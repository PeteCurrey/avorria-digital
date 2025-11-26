import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs, getFAQsByCategory, categoryLabels } from "@/data/faqs";
import type { FAQ } from "@/data/faqs";

const FAQs = () => {
  const categories: FAQ['category'][] = [
    "working-with-avorria",
    "pricing-budgets",
    "seo",
    "web-funnels",
    "reporting-data"
  ];

  return (
    <>
      <Helmet>
        <title>FAQs - All Your Questions Answered | Avorria</title>
        <meta name="description" content="Everything we're asked most often about strategy, pricing, process and working with Avorria – in one place." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-foreground">
              FAQs – all in one place.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything we're asked most often about strategy, pricing, process and working with Avorria – in one page.
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="pb-16 px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {categories.map((category) => {
              const categoryFAQs = getFAQsByCategory(category);
              if (categoryFAQs.length === 0) return null;

              return (
                <div key={category}>
                  <h2 className="text-3xl font-light mb-6 text-foreground">
                    {categoryLabels[category]}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {categoryFAQs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category}-${index}`}
                        className="border border-border rounded-lg px-6"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="text-lg font-medium text-foreground">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground pt-2 pb-4">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6 text-foreground">Still have questions?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default">Book a strategy call</Button>
              <Button size="lg" variant="outline">Request a free audit</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQs;
