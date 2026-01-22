import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { glossaryTerms, alphabet, getTermsByLetter, searchTerms } from "@/data/glossary";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

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
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-foreground">
              Plain-English SEO & marketing glossary.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              No jargon, no posturing. Just straight definitions and why each term actually matters to your pipeline.
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="pb-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </section>

        {/* Alphabet Filter */}
        {!searchQuery && (
          <section className="pb-12 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={selectedLetter === null ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedLetter(null)}
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
                      className={!hasTerms ? "opacity-30" : ""}
                    >
                      {letter}
                    </Button>
                  );
                })}
              </div>
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
              <div className="space-y-6">
                {displayedTerms.map((term, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-medium mb-3 text-foreground">{term.term}</h3>
                      <p className="text-muted-foreground mb-4">{term.definition}</p>
                      <div className="bg-secondary/30 p-4 rounded-md mb-4">
                        <p className="text-sm font-medium text-foreground mb-1">Why it matters:</p>
                        <p className="text-sm text-muted-foreground">{term.whyItMatters}</p>
                      </div>
                      {term.seeAlso && term.seeAlso.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-sm text-muted-foreground">See also:</span>
                          {term.seeAlso.map((link, i) => (
                            <Link key={i} to={link}>
                              <Button variant="link" size="sm" className="h-auto p-0">
                                {link}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6 text-foreground">Ready to put this knowledge to work?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default">Book a strategy call</Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/resources">Browse our guides</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SEOGlossary;
