import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OverviewTab from "@/components/dashboard/OverviewTab";
import SEOTab from "@/components/dashboard/SEOTab";
import PaidMediaTab from "@/components/dashboard/PaidMediaTab";
import FunnelTab from "@/components/dashboard/FunnelTab";
import ContentTab from "@/components/dashboard/ContentTab";
import NotesTab from "@/components/dashboard/NotesTab";

const DashboardDemo = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab") || "overview";

  const renderTab = () => {
    // Analytics event
    console.log("dashboard_tab_viewed", { tab });

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
      default:
        return <OverviewTab />;
    }
  };

  return (
    <DashboardLayout isDemoMode>
      {renderTab()}
    </DashboardLayout>
  );
};

export default DashboardDemo;
