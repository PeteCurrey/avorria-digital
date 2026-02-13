import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Clock, ArrowLeft, Share2, Linkedin, Twitter, Copy, CheckCheck } from "lucide-react";
import { getResourceBySlug, getResourcesByCategory } from "@/data/resources";
import ResourceTOC from "@/components/ResourceTOC";
import { ContentUpgrade } from "@/components/ContentUpgrade";
import ReactMarkdown from "react-markdown";
import { toast } from "@/hooks/use-toast";

const categoryGradients: Record<string, string> = {
  SEO: "from-emerald-500/10 via-emerald-500/5 to-transparent",
  "Web Design": "from-blue-500/10 via-blue-500/5 to-transparent",
  Analytics: "from-purple-500/10 via-purple-500/5 to-transparent",
  "Paid Media": "from-orange-500/10 via-orange-500/5 to-transparent",
  Strategy: "from-pink-500/10 via-pink-500/5 to-transparent",
};

const categoryAccentColors: Record<string, string> = {
  SEO: "border-emerald-500",
  "Web Design": "border-blue-500",
  Analytics: "border-purple-500",
  "Paid Media": "border-orange-500",
  Strategy: "border-pink-500",
};

const ResourceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const resource = slug ? getResourceBySlug(slug) : undefined;
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!resource) {
    return <Navigate to="/resources" replace />;
  }

  const relatedResources = getResourcesByCategory(resource.category)
    .filter((r) => r.id !== resource.id)
    .slice(0, 2);

  const currentUrl = `https://avorria.com/resources/${resource.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    toast({ title: "Link copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const minutesRead = Math.round((readProgress / 100) * resource.readingTime);

  return (
    <>
      <Helmet>
        <title>{resource.metaTitle}</title>
        <meta name="description" content={resource.metaDescription} />
        <meta name="keywords" content={resource.targetKeyword} />
        <link rel="canonical" href={currentUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: resource.title,
            description: resource.summary,
            datePublished: resource.publishedDate,
            author: { "@type": "Organization", name: "Avorria" },
            publisher: {
              "@type": "Organization",
              name: "Avorria",
              logo: { "@type": "ImageObject", url: "https://avorria.com/logo.png" },
            },
          })}
        </script>
      </Helmet>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readProgress} className="h-1 rounded-none bg-transparent" />
      </div>

      <div className="min-h-screen pt-24 pb-20">
        {/* Hero Banner */}
        <div className={`bg-gradient-to-b ${categoryGradients[resource.category] || "from-accent/10 to-transparent"} pb-12`}>
          <div className="container mx-auto max-w-7xl px-6">
            <Link
              to="/resources"
              className="inline-flex items-center text-muted-foreground hover:text-accent mb-8 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Resources
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <Badge className="mb-4">{resource.category}</Badge>
              <h1 className="text-4xl lg:text-5xl font-light leading-tight mb-6 text-foreground">
                {resource.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {resource.summary}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{minutesRead} of {resource.readingTime} min read</span>
                </div>
                <span>•</span>
                <span>
                  {new Date(resource.publishedDate).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <article>
              {/* CTA Strip */}
              <Card className="bg-accent/10 border-accent mb-12">
                <CardContent className="p-6">
                  <p className="text-foreground mb-4">
                    <strong>Want this implemented for you?</strong> We don't just write guides—we execute them.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="accent" size="sm" asChild>
                      <Link to="/contact">
                        Book Strategy Call
                        <ArrowRight className="ml-2" size={16} />
                      </Link>
                    </Button>
                    {resource.serviceRelation && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/services/${resource.serviceRelation}`}>
                          View {resource.category} Services
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Content with custom markdown */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
              >
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h2 className={`text-foreground border-l-4 ${categoryAccentColors[resource.category] || "border-accent"} pl-4 mt-12 mb-6`}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-foreground mt-8 mb-4">{children}</h3>
                    ),
                    blockquote: ({ children }) => (
                      <div className="relative my-8 p-6 rounded-lg bg-gradient-to-r from-accent/10 to-accent/5 border-l-4 border-accent">
                        <div className="text-foreground italic">{children}</div>
                      </div>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-2 my-4">{children}</ul>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-8 rounded-lg border border-border">
                        <table className="w-full text-sm">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="bg-secondary px-4 py-3 text-left font-semibold text-foreground border-b border-border">{children}</th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 border-b border-border/50">{children}</td>
                    ),
                  }}
                >
                  {resource.content}
                </ReactMarkdown>
              </motion.div>

              {/* Content Upgrade based on service */}
              {resource.serviceRelation === "seo" && (
                <ContentUpgrade
                  title="Want us to quickly review your current SEO setup?"
                  description="Drop your site in and we'll send you a short, plain-English teardown of what's working, what's broken and what to fix first."
                  buttonText="Get my SEO audit"
                  source="seo-pillar"
                  variant="seo"
                />
              )}
              {resource.serviceRelation === "web-design" && (
                <ContentUpgrade
                  title="Want a conversion review of your website?"
                  description="We'll review your homepage, key landing pages and funnel – then send you specific recommendations to improve your conversion rate."
                  buttonText="Get my website audit"
                  source="web-pillar"
                  variant="web"
                />
              )}
              {resource.serviceRelation === "analytics" && (
                <ContentUpgrade
                  title="Not sure if your tracking is broken?"
                  description="We'll audit your GA4, ad tracking and CRM integration, then tell you exactly what's being measured (or not)."
                  buttonText="Get my tracking audit"
                  source="analytics-pillar"
                  variant="analytics"
                />
              )}

              {/* Bottom CTA */}
              <Card className="bg-secondary border-border mt-16">
                <CardContent className="p-10 text-center">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Ready to implement this?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    These principles are what we use every day with clients. If you want them applied to your business, let's talk.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="accent" size="lg" asChild>
                      <Link to="/contact">
                        Book a Strategy Call
                        <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/services">View All Services</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Resources */}
              {relatedResources.length > 0 && (
                <div className="mt-16">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Related Reading</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {relatedResources.map((related) => (
                      <Card key={related.id} className="border-border hover:shadow-lg transition-all group">
                        <CardContent className="p-6">
                          <Badge variant="secondary" className="mb-3">{related.category}</Badge>
                          <h4 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                            <Link to={`/resources/${related.slug}`}>{related.title}</Link>
                          </h4>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{related.summary}</p>
                          <Link
                            to={`/resources/${related.slug}`}
                            className="text-accent text-sm font-medium hover:underline inline-flex items-center"
                          >
                            Read More
                            <ArrowRight className="ml-1" size={16} />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <ResourceTOC content={resource.content} />

              {/* Share Buttons */}
              <div className="sticky top-24 bg-card border border-border rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Share2 size={16} />
                  Share this guide
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={handleCopyLink}
                  >
                    {copied ? <CheckCheck size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    asChild
                  >
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={16} className="mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    asChild
                  >
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(resource.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter size={16} className="mr-2" />
                      X / Twitter
                    </a>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceDetail;
