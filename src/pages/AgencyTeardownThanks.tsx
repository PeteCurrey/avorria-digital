import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, BarChart3 } from "lucide-react";

const AgencyTeardownThanks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Event: teardown_thankyou_viewed
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'teardown_thankyou_viewed');
    }
  }, []);

  const handleBookCall = () => {
    // Event: teardown_cta_book_call_clicked
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'teardown_cta_book_call_clicked');
    }
    navigate('/contact');
  };

  const handleViewReporting = () => {
    // Event: teardown_cta_view_reporting_clicked
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'teardown_cta_view_reporting_clicked');
    }
    navigate('/reporting/demo');
  };

  return (
    <>
      <Helmet>
        <title>Report Submitted - Agency Teardown | Avorria</title>
        <meta 
          name="description" 
          content="We've received your report and will send you a plain-English breakdown within 3-5 working days." 
        />
      </Helmet>

      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Confirmation Panel */}
            <Card className="p-8 md:p-12 border-border bg-card mb-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              
            <h1 className="text-3xl md:text-4xl font-light mb-4 text-foreground">
              Got it – we'll tear this down and come back with the truth.
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We'll review your report/proposal and send a plain-English breakdown within <strong>3–5 working days</strong>. If we think your agency is doing good work, we'll say so. If not, you'll know exactly why.
            </p>

              {/* What Happens Next */}
              <div className="bg-background/50 rounded-lg p-6 mb-8 text-left">
                <h2 className="text-xl font-medium mb-4 text-foreground">What happens next:</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      We skim for structure: goals, KPIs, tracking.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      We assess whether reporting links to real business outcomes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      We list what's missing, lazy or misaligned.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      We send you a short summary with 3–5 key recommendations.
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleBookCall}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a call to walk through your report live
                </Button>
                <Button size="lg" variant="outline" onClick={handleViewReporting}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  See how our reporting works
                </Button>
              </div>
            </Card>

            {/* What a Good Report Looks Like */}
            <div className="text-center mb-12">
              <h2 className="text-2xl font-light mb-8 text-foreground">
                What a Good Report Looks Like
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 border-border bg-card">
                  <CheckCircle2 className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-medium mb-2 text-foreground">
                    Clear link between spend and pipeline/revenue
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Not just impressions and clicks – real business outcomes.
                  </p>
                  <Button 
                    variant="link" 
                    className="text-accent p-0 h-auto"
                    onClick={handleViewReporting}
                  >
                    See example →
                  </Button>
                </Card>

                <Card className="p-6 border-border bg-card">
                  <CheckCircle2 className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-medium mb-2 text-foreground">
                    Actions taken last month, and actions planned next
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You know exactly what was done and what's coming.
                  </p>
                  <Button 
                    variant="link" 
                    className="text-accent p-0 h-auto"
                    onClick={handleViewReporting}
                  >
                    See example →
                  </Button>
                </Card>

                <Card className="p-6 border-border bg-card">
                  <CheckCircle2 className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-medium mb-2 text-foreground">
                    Risks, issues and strategic decisions flagged – not hidden
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Transparency, not theatre.
                  </p>
                  <Button 
                    variant="link" 
                    className="text-accent p-0 h-auto"
                    onClick={handleViewReporting}
                  >
                    See example →
                  </Button>
                </Card>
              </div>
            </div>

            {/* Additional CTA */}
            <Card className="p-8 border-border bg-card text-center">
              <p className="text-muted-foreground mb-4">
                Want to see what transparency looks like in practice?
              </p>
              <Button variant="outline" size="lg" onClick={handleViewReporting}>
                Explore our live dashboard demo
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgencyTeardownThanks;
