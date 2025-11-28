import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OverviewTab from "@/components/dashboard/OverviewTab";
import SEOTab from "@/components/dashboard/SEOTab";
import PaidMediaTab from "@/components/dashboard/PaidMediaTab";
import FunnelTab from "@/components/dashboard/FunnelTab";
import ContentTab from "@/components/dashboard/ContentTab";
import NotesTab from "@/components/dashboard/NotesTab";
import AuditsTab from "@/components/dashboard/AuditsTab";
import HealthHistoryTab from "@/components/dashboard/HealthHistoryTab";
import { useEffect } from "react";
import { trackEvent, EVENTS } from "@/lib/tracking";

// Future: Add auth checks and client-specific data loading
// import { useAuth } from "@/hooks/useAuth";
// import { useClientData } from "@/hooks/useClientData";

const ClientPortal = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab") || "overview";

  // Future: Auth check
  // const { user, isAuthenticated } = useAuth();
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  // Future: Load client-specific data
  // const { clientData, loading } = useClientData(user.clientId);

  // For now, use mock data and a placeholder user name
  const userName = "Sarah"; // Future: user.firstName

  // Track tab views
  useEffect(() => {
    trackEvent(EVENTS.CLIENT_TAB_VIEWED, {
      client_id: 'demo', // Future: user.clientId
      tab,
    });
  }, [tab]);

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
    <DashboardLayout isDemoMode={false} userName={userName}>
      {renderTab()}
    </DashboardLayout>
  );
};

export default ClientPortal;
