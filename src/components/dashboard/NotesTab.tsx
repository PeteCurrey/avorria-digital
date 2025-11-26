import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const NotesTab = () => {
  const priorities = [
    { task: "Launch new topic cluster: 'Growth Marketing for SaaS'", status: "In Progress", icon: Clock },
    { task: "Scale Google Ads budget by 30% based on strong ROAS", status: "In Progress", icon: Clock },
    { task: "Refresh homepage hero messaging based on user testing", status: "Done", icon: CheckCircle2 },
    { task: "Build case study landing page for fintech vertical", status: "Not Started", icon: Circle },
    { task: "Implement enhanced ecommerce tracking on GA4", status: "Done", icon: CheckCircle2 },
    { task: "A/B test new landing page variant for paid traffic", status: "In Progress", icon: Clock },
    { task: "Conduct quarterly strategy review and roadmap planning", status: "Not Started", icon: Circle },
  ];

  const questions = [
    "Clarify if the 'Enterprise Plan' offer is still active — we want to feature it in the next email campaign.",
    "Confirm budget flexibility for Q4 scale-up. Current ROAS suggests we could profitably increase spend by 40-50%.",
    "Do you want us to prioritize video content (testimonials, explainer videos) or stick with written content for now?",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-foreground mb-1">Notes & Next Actions</h2>
        <p className="text-sm text-muted-foreground">Summary, priorities, and open questions</p>
      </div>

      {/* Summary in 60 seconds */}
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-xl font-light">Summary in 60 Seconds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">What Worked</h3>
            <p className="text-sm text-foreground leading-relaxed">
              Organic traffic grew 24% driven by new pillar content and improved non-branded keyword rankings. 
              Google Ads scaled successfully with CPL dropping 8% while lead volume increased 19%. 
              The free audit funnel is converting at 6.6%, beating our 5% target.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">What Didn't</h3>
            <p className="text-sm text-foreground leading-relaxed">
              Meta Ads performance plateaued — we're testing new creative and audience segments to break through. 
              LinkedIn campaigns are expensive (£165 CPL) but lead quality is high; we're cautiously optimizing rather than scaling aggressively yet.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">What's Happening Next</h3>
            <p className="text-sm text-foreground leading-relaxed">
              Launching a new SEO topic cluster around "Growth Marketing for SaaS" to capture mid-funnel traffic. 
              Scaling Google Ads budget by 30% to capitalize on strong ROAS. 
              Building out 2 new case study landing pages to strengthen social proof and improve conversion rates across paid channels.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* This Month's Priorities */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-light">This Month's Priorities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {priorities.map((item, idx) => {
              const StatusIcon = item.icon;
              return (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <StatusIcon
                    size={20}
                    className={`mt-0.5 flex-shrink-0 ${
                      item.status === "Done"
                        ? "text-green-500"
                        : item.status === "In Progress"
                        ? "text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">{item.task}</p>
                    <Badge
                      variant={
                        item.status === "Done"
                          ? "default"
                          : item.status === "In Progress"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      {/* Questions for You */}
      <Card className="border-border bg-secondary">
        <CardHeader>
          <CardTitle className="text-xl font-light">Questions for You</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {questions.map((question, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-foreground p-3 rounded-lg bg-background">
                <span className="text-accent font-semibold mt-0.5">{idx + 1}.</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-6">
            Please respond to these when convenient. We'll address them in our next sync call.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesTab;
