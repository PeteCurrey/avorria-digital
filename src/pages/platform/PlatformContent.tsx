import { Helmet } from "react-helmet-async";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

const PlatformContent = () => {
  const upcomingContent = [
    {
      id: "1",
      title: "5 Ways Enterprise Teams Waste Budget on Paid Media",
      client: "TechCorp Industries",
      channel: "Blog",
      status: "draft",
      dueDate: "Mar 28, 2024",
    },
    {
      id: "2",
      title: "Product launch announcement",
      client: "Urban Dynamics",
      channel: "LinkedIn",
      status: "in-review",
      dueDate: "Mar 25, 2024",
    },
    {
      id: "3",
      title: "Monthly newsletter - March",
      client: "GreenLeaf Solutions",
      channel: "Email",
      status: "scheduled",
      dueDate: "Mar 30, 2024",
    },
    {
      id: "4",
      title: "Case study: How we doubled organic leads",
      client: "BlueSky Consulting",
      channel: "Blog",
      status: "idea",
      dueDate: "Apr 5, 2024",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "in-review":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "draft":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "idea":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default:
        return "";
    }
  };

  return (
    <>
      <Helmet>
        <title>Content & Social - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Content & Social</h1>
            <p className="text-muted-foreground">Content pipeline and publishing calendar</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingContent.map((content) => (
                  <div
                    key={content.id}
                    className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1">{content.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {content.client} • {content.channel}
                      </p>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={getStatusColor(content.status)}>
                          {content.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Due: {content.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </>
  );
};

export default PlatformContent;
