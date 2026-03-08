import { useParams, Link, Navigate } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, X } from "lucide-react";
import { getComparisonBySlug } from "@/data/comparisonPages";

const Comparison = () => {
  const { slug } = useParams<{ slug: string }>();
  const comparison = slug ? getComparisonBySlug(slug) : undefined;

  if (!comparison) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <SEOHead
        title={comparison.metaTitle}
        description={comparison.metaDescription}
        canonical={`/why/${slug}`}
        keywords={[comparison.primarySubject, comparison.secondarySubject, "comparison"]}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://avorria.com" },
        { name: "Why Avorria", url: "https://avorria.com/why-avorria" },
        { name: comparison.title, url: `https://avorria.com/why/${slug}` },
      ]} />

      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto max-w-5xl px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light leading-tight mb-6 text-foreground">
              {comparison.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {comparison.summary}
            </p>
          </div>

          {/* Sections */}
          {comparison.sections.map((section, index) => {
            if (section.type === "intro") {
              return (
                <div key={index} className="mb-16">
                  <div className="prose prose-lg max-w-none prose-p:text-muted-foreground whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              );
            }

            if (section.type === "table" && section.tableData) {
              return (
                <div key={index} className="mb-16">
                  {section.heading && (
                    <h2 className="text-3xl font-semibold text-foreground mb-8">{section.heading}</h2>
                  )}
                  <Card className="border-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border bg-secondary">
                            <th className="text-left p-4 font-semibold text-foreground w-1/4">Criteria</th>
                            <th className="text-left p-4 font-semibold text-accent w-3/8">
                              {comparison.primarySubject}
                            </th>
                            <th className="text-left p-4 font-semibold text-muted-foreground w-3/8">
                              {comparison.secondarySubject}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.tableData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-border last:border-0">
                              <td className="p-4 font-medium text-foreground align-top">
                                {row.criterion}
                              </td>
                              <td className="p-4 text-muted-foreground align-top">
                                {row.primaryValue}
                              </td>
                              <td className="p-4 text-muted-foreground align-top">
                                {row.secondaryValue}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              );
            }

            if (section.type === "pros-cons") {
              return (
                <div key={index} className="mb-16">
                  {section.heading && (
                    <h2 className="text-3xl font-semibold text-foreground mb-8">{section.heading}</h2>
                  )}
                  <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground whitespace-pre-line mb-8">
                    {section.content}
                  </div>
                </div>
              );
            }

            if (section.type === "use-cases" && section.useCases) {
              return (
                <div key={index} className="mb-16">
                  {section.heading && (
                    <h2 className="text-3xl font-semibold text-foreground mb-8">{section.heading}</h2>
                  )}
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="border-border">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-semibold text-muted-foreground mb-6">
                          Choose {comparison.secondarySubject} if:
                        </h3>
                        <ul className="space-y-4">
                          {section.useCases.them.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <X className="text-muted-foreground mt-1 flex-shrink-0" size={20} />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-accent bg-accent/5">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-semibold text-accent mb-6">
                          Choose {comparison.primarySubject} if:
                        </h3>
                        <ul className="space-y-4">
                          {section.useCases.us.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                              <span className="text-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            }

            if (section.type === "cta") {
              return (
                <Card key={index} className="bg-secondary border-border">
                  <CardContent className="p-10 text-center">
                    <div className="prose prose-lg max-w-none prose-p:text-muted-foreground mb-6 whitespace-pre-line">
                      {section.content}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="accent" size="lg" asChild>
                        <Link to="/contact">
                          {comparison.ctaText}
                          <ArrowRight className="ml-2" size={20} />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link to="/services">View Services</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            }

            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default Comparison;
