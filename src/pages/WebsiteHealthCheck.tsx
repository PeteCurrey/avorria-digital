import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { trackEvent, EVENTS } from "@/lib/tracking";

const WebsiteHealthCheck = () => {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    
    trackEvent(EVENTS.HEALTH_CHECK_STARTED, {
      has_email: !!email,
      source_page: window.location.pathname,
    });
    
    setShowResults(true);
    
    // Calculate mock results
    const overallScore = mockResults.overallScore;
    
    trackEvent(EVENTS.HEALTH_CHECK_COMPLETED, {
      overall_score: overallScore,
      seo_score: mockResults.categories[0].score,
      performance_score: mockResults.categories[1].score,
      conversion_score: mockResults.categories[2].score,
      tracking_score: mockResults.categories[3].score,
    });
  };

  // Mock data - replace with real API call
  const mockResults = {
    overallScore: 72,
    categories: [
      {
        name: "SEO Basics",
        score: 78,
        good: ["Title tags present on all pages", "Meta descriptions set"],
        needsWork: ["Missing H1 on 3 pages", "Duplicate meta descriptions detected", "Missing alt text on 12 images"]
      },
      {
        name: "Performance",
        score: 65,
        good: ["Server response time under 200ms"],
        needsWork: ["Large image files slowing load time", "No image compression", "Render-blocking resources"]
      },
      {
        name: "Conversion Basics",
        score: 70,
        good: ["Clear CTAs present", "Contact form functional"],
        needsWork: ["Weak value proposition on homepage", "No trust signals visible", "Mobile menu difficult to use"]
      },
      {
        name: "Tracking Foundations",
        score: 80,
        good: ["Google Analytics present", "Facebook Pixel detected"],
        needsWork: ["GA4 events not configured", "Conversion tracking incomplete"]
      }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      <Helmet>
        <title>Website Health Check - See How Your Site Stacks Up | Avorria</title>
        <meta name="description" content="Enter your URL and get a simple, honest summary of how your website is performing across SEO, performance and conversion basics." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-foreground">
              Website health check – see how your site stacks up.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Enter your URL and get a simple, honest summary of how your website is performing across SEO, performance and conversion basics.
            </p>
          </div>
        </section>

        {/* Form */}
        {!showResults && (
          <section className="pb-16 px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-2xl font-light">Run a health check</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCheck} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Website URL</label>
                      <Input
                        type="url"
                        placeholder="https://yourwebsite.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Email (optional)
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Add your email if you'd like a copy + deeper breakdown (optional).
                      </p>
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      Check my site
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Results */}
        {showResults && (
          <section className="pb-16 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Overall Score */}
              <Card>
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-light mb-4 text-foreground">Site Health Score</h2>
                  <div className={`text-6xl font-light mb-4 ${getScoreColor(mockResults.overallScore)}`}>
                    {mockResults.overallScore}/100
                  </div>
                  <Progress value={mockResults.overallScore} className="max-w-md mx-auto" />
                </CardContent>
              </Card>

              {/* Category Breakdown */}
              <div className="grid md:grid-cols-2 gap-6">
                {mockResults.categories.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-medium">{category.name}</CardTitle>
                        <span className={`text-3xl font-light ${getScoreColor(category.score)}`}>
                          {category.score}
                        </span>
                      </div>
                      <Progress value={category.score} className="mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.good.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2 text-green-500">Looks okay</p>
                          <ul className="space-y-1">
                            {category.good.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {category.needsWork.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2 text-yellow-500">Needs work</p>
                          <ul className="space-y-1">
                            {category.needsWork.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <AlertTriangle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* CTAs */}
              <Card className="bg-secondary/30">
                <CardContent className="p-8 text-center space-y-4">
                  <h3 className="text-2xl font-light text-foreground">Next steps</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    This is an automated check. If you want a human to double-check this and give you a prioritised punch list, request a free SEO & website audit.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button size="lg" variant="default">Request a free SEO & website audit</Button>
                    <Button size="lg" variant="outline" onClick={() => {
                      trackEvent(EVENTS.HEALTH_CHECK_EMAIL_OPTIN, {
                        has_url: !!url,
                        has_email: !!email,
                      });
                      alert(email ? "Report sent to your email!" : "Please enter your email to save this report.");
                    }}>
                      Save this report to my email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Info Section */}
        {!showResults && (
          <section className="pb-16 px-4 bg-secondary/30">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-light mb-4 text-foreground">What we check</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left mt-8">
                <Card>
                  <CardContent className="p-6">
                    <AlertCircle className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-medium mb-2 text-foreground">SEO Basics</h3>
                    <p className="text-sm text-muted-foreground">Titles, meta descriptions, headings, alt text and basic on-page elements.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <AlertCircle className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-medium mb-2 text-foreground">Performance</h3>
                    <p className="text-sm text-muted-foreground">Load speed, mobile responsiveness and Core Web Vitals.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <AlertCircle className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-medium mb-2 text-foreground">Conversion Basics</h3>
                    <p className="text-sm text-muted-foreground">CTAs, forms, clarity and trust signals.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <AlertCircle className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-medium mb-2 text-foreground">Tracking</h3>
                    <p className="text-sm text-muted-foreground">Presence of analytics, pixels and basic event tracking.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default WebsiteHealthCheck;
