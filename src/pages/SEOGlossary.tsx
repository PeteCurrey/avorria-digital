import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { glossaryTerms, alphabet, getTermsByLetter, searchTerms } from "@/data/glossary";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import GradientMesh from "@/components/GradientMesh";
import { ScrollReveal, ScrollRevealGrid } from "@/components/animations/ScrollReveal";

const categoryBorderColors: Record<string, string> = {
  SEO: "border-l-emerald-500",
  Analytics: "border-l-purple-500",
  Conversion: "border-l-blue-500",
  "Paid Media": "border-l-orange-500",
  "Sales & Marketing": "border-l-pink-500",
};

const categoryBadgeColors: Record<string, string> = {
  SEO: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Analytics: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Conversion: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Paid Media": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Sales & Marketing": "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

const SEOGlossary = () => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const displayedTerms = searchQuery
    ? searchTerms(searchQuery)
    : selectedLetter
    ? getTermsByLetter(selectedLetter)
    : glossaryTerms;

  return (
    <>
      <Helmet>
        <title>Plain-English SEO & Marketing Glossary | Avorria</title>
        <meta name="description" content="No jargon, no posturing. Just straight definitions and why each term actually matters to your pipeline." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 relative overflow-hidden">
          <GradientMesh className="opacity-20" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <ScrollReveal variant="fade-up" delay={0}>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">A-Z Reference</Badge>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <h1 className="text-5xl md:text-6xl font-light mb-6 text-foreground">
                Plain-English SEO & marketing glossary.
              </h1>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={200}>
              <p className="text-xl text-muted-foreground mb-8">
                No jargon, no posturing. Just straight definitions and why each term actually matters to your pipeline.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Search */}
        <section className="pb-8 px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fade-up" delay={250}>
              <div className="relative max-w-md mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    type="text"
                    placeholder="Search terms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-0 bg-transparent focus-visible:ring-0"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Alphabet Filter */}
        {!searchQuery && (
          <section className="pb-12 px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal variant="fade-up" delay={300}>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant={selectedLetter === null ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedLetter(null)}
                    className="transition-transform duration-200 hover:scale-110"
                  >
                    All
                  </Button>
                  {alphabet.map((letter) => {
                    const hasTerms = getTermsByLetter(letter).length > 0;
                    return (
                      <Button
                        key={letter}
                        variant={selectedLetter === letter ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedLetter(letter)}
                        disabled={!hasTerms}
                        className={`transition-transform duration-200 hover:scale-110 ${!hasTerms ? "opacity-30" : ""}`}
                      >
                        {letter}
                      </Button>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Terms List */}
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            {displayedTerms.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No terms found matching "{searchQuery}"</p>
              </div>
            ) : (
              <ScrollRevealGrid stagger={60} className="space-y-6">
                {displayedTerms.map((term, index) => (
                  <Card
                    key={index}
                    className={`border-l-4 ${categoryBorderColors[term.category] || "border-l-primary"} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-2xl font-medium text-foreground">{term.term}</h3>
                        <Badge variant="outline" className={`shrink-0 text-xs ${categoryBadgeColors[term.category] || ""}`}>
                          {term.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{term.definition}</p>
                      <div className="bg-gradient-to-r from-secondary/40 to-secondary/10 p-4 rounded-md mb-4 border border-border/30">
                        <p className="text-sm font-medium text-foreground mb-1">Why it matters:</p>
                        <p className="text-sm text-muted-foreground">{term.whyItMatters}</p>
                      </div>
                      {term.seeAlso && term.seeAlso.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-sm text-muted-foreground">See also:</span>
                          {term.seeAlso.map((link, i) => (
                            <Link key={i} to={link} className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors">
                              {link}
                            </Link>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </ScrollRevealGrid>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/30 to-primary/10" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <ScrollReveal variant="fade-up">
              <h2 className="text-3xl font-light mb-6 text-foreground">Ready to put this knowledge to work?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="default">Book a strategy call</Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/resources">Browse our guides</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default SEOGlossary;
