import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Download, ExternalLink } from "lucide-react";

const ClientResources = () => {
  const guides = [
    {
      id: "1",
      title: "The No-Bullshit Guide to SEO for Real Businesses",
      description: "Pragmatic guide explaining what SEO actually does for business owners",
      type: "Guide",
      icon: BookOpen,
      url: "/resources/seo-guide",
    },
    {
      id: "2",
      title: "High-Converting Websites: A Practical Playbook",
      description: "Practical examples and specific layouts for service businesses",
      type: "Guide",
      icon: BookOpen,
      url: "/resources/conversion-playbook",
    },
    {
      id: "3",
      title: "Marketing Analytics & Tracking That Actually Works",
      description: "Focus on key numbers that matter, not academic attribution",
      type: "Guide",
      icon: BookOpen,
      url: "/resources/analytics-guide",
    },
  ];

  const videos = [
    {
      id: "1",
      title: "Understanding Your Reporting Dashboard",
      description: "5-minute walkthrough of how to read your monthly reports",
      duration: "5:32",
      date: "Mar 2024",
    },
    {
      id: "2",
      title: "How We Track Conversions End-to-End",
      description: "Behind the scenes of our tracking setup and what it means for you",
      duration: "8:15",
      date: "Feb 2024",
    },
    {
      id: "3",
      title: "SEO Fundamentals for Your Team",
      description: "What your content team needs to know about SEO",
      duration: "12:40",
      date: "Jan 2024",
    },
  ];

  const documents = [
    {
      id: "1",
      title: "Q1 2024 Strategy Document",
      description: "90-day roadmap and priorities",
      date: "Jan 2024",
      size: "2.4 MB",
    },
    {
      id: "2",
      title: "Brand Guidelines & Messaging Framework",
      description: "ICP, positioning, and key messages",
      date: "Jan 2024",
      size: "1.8 MB",
    },
    {
      id: "3",
      title: "Keyword Research & Content Plan",
      description: "Target keywords and content calendar",
      date: "Feb 2024",
      size: "3.2 MB",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Resources - Client Portal</title>
      </Helmet>

      <AppShell
        type="client"
        userName="Sarah Mitchell"
        userRole="Marketing Director"
        clientName="TechCorp Industries"
      >
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Resources</h1>
            <p className="text-muted-foreground">
              Guides, playbooks, and documents to help you and your team make sense of what we're doing
            </p>
          </div>

          {/* Guides & Playbooks */}
          <div>
            <h2 className="text-xl font-light text-foreground mb-4">Guides & Playbooks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {guides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {guide.type}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-foreground mb-2">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                      <Link to={guide.url}>
                        <Button variant="outline" size="sm" className="w-full">
                          Read guide
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Training Videos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Video className="h-5 w-5" />
                Training Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.date}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Watch
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Project Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">
                Can't find what you're looking for?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you need a specific resource or have questions about any of these materials, just ask.
              </p>
              <div className="flex gap-3 justify-center">
                <Link to="/contact">
                  <Button>Get in touch</Button>
                </Link>
                <Link to="/client/audits">
                  <Button variant="outline">View audits</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </>
  );
};

export default ClientResources;
