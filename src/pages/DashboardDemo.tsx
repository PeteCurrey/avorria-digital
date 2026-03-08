import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import AppShell from "@/components/app/AppShell";
import OverviewTab from "@/components/dashboard/OverviewTab";
import SEOTab from "@/components/dashboard/SEOTab";
import PaidMediaTab from "@/components/dashboard/PaidMediaTab";
import FunnelTab from "@/components/dashboard/FunnelTab";
import ContentTab from "@/components/dashboard/ContentTab";
import NotesTab from "@/components/dashboard/NotesTab";
import AuditsTab from "@/components/dashboard/AuditsTab";
import HealthHistoryTab from "@/components/dashboard/HealthHistoryTab";

const DashboardDemo = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab") || "overview";

  const renderTab = () => {
    switch (tab) {
      case "seo":
        return <SEOTab />;
      case "paid":
        return <PaidMediaTab />;
      case "funnel":
        return <FunnelTab />;
      case "content":
        return <ContentTab />;
      case "notes":
        return <NotesTab />;
      case "audits":
        return <AuditsTab />;
      case "health":
        return <HealthHistoryTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <AppShell
      type="client"
      userName="Sarah Mitchell"
      userRole="Marketing Director"
      clientName="TechCorp Industries"
    >
      {/* Demo Banner */}
      <div className="mb-6 rounded-lg border border-accent/30 bg-accent/5 backdrop-blur-sm p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Info className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              You're viewing a demo of the Avorria Client Portal
            </p>
            <p className="text-xs text-muted-foreground">
              This is a preview of what your personalised dashboard looks like in practice.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild className="flex-shrink-0">
          <Link to="/reporting">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reporting
          </Link>
        </Button>
      </div>

      {renderTab()}
    </AppShell>
  );
};

export default DashboardDemo;
