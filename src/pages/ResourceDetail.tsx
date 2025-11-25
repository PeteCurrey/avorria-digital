import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, ArrowLeft } from "lucide-react";
import { getResourceBySlug, getResourcesByCategory } from "@/data/resources";
import ResourceTOC from "@/components/ResourceTOC";
import ReactMarkdown from "react-markdown";

const ResourceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const resource = slug ? getResourceBySlug(slug) : undefined;

  if (!resource) {
    return <Navigate to="/resources" replace />;
  }

  const relatedResources = getResourcesByCategory(resource.category)
    .filter((r) => r.id !== resource.id)
    .slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{resource.metaTitle}</title>
        <meta name="description" content={resource.metaDescription} />
        <meta name="keywords" content={resource.targetKeyword} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: resource.title,
            description: resource.summary,
            datePublished: resource.publishedDate,
            author: {
              "@type": "Organization",
              name: "Avorria",
            },
            publisher: {
              "@type": "Organization",
              name: "Avorria",
              logo: {
                "@type": "ImageObject",
                url: "https://avorria.com/logo.png",
              },
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Back Link */}
          <Link
            to="/resources"
            className="inline-flex items-center text-muted-foreground hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Resources
          </Link>

          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <article>
              {/* Hero */}
              <div className="mb-12">
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
                    <span>{resource.readingTime} min read</span>
                  </div>
                  <span>•</span>
                  <span>{new Date(resource.publishedDate).toLocaleDateString("en-GB", { 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric" 
                  })}</span>
                </div>
              </div>

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

              {/* Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown>{resource.content}</ReactMarkdown>
              </div>

              {/* Bottom CTA */}
              <Card className="bg-secondary border-border mt-16">
                <CardContent className="p-10 text-center">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    Ready to implement this?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    These principles are what we use every day with clients. If you want them applied to your
                    business, let's talk.
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
                          <Badge variant="secondary" className="mb-3">
                            {related.category}
                          </Badge>
                          <h4 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                            <Link to={`/resources/${related.slug}`}>{related.title}</Link>
                          </h4>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {related.summary}
                          </p>
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

            {/* Sidebar TOC */}
            <aside>
              <ResourceTOC content={resource.content} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceDetail;
