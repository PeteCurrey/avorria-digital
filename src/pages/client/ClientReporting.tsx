import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/app/AppShell";
import OverviewTab from "@/components/dashboard/OverviewTab";
import SEOTab from "@/components/dashboard/SEOTab";
import PaidMediaTab from "@/components/dashboard/PaidMediaTab";
import FunnelTab from "@/components/dashboard/FunnelTab";
import ContentTab from "@/components/dashboard/ContentTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClientReporting = () => {
  return (
    <>
      
        <title>Reporting - Client Portal</title>
      

      <AppShell
        type="client"
        userName="Sarah Mitchell"
        userRole="Marketing Director"
        clientName="TechCorp Industries"
      >
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Reporting Dashboard</h1>
            <p className="text-muted-foreground">
              Your performance data in one place - traffic, leads, pipeline, and what we're doing about it
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="paid">Paid Media</TabsTrigger>
              <TabsTrigger value="funnel">Funnel & Conversions</TabsTrigger>
              <TabsTrigger value="content">Content & Email</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>

            <TabsContent value="seo">
              <SEOTab />
            </TabsContent>

            <TabsContent value="paid">
              <PaidMediaTab />
            </TabsContent>

            <TabsContent value="funnel">
              <FunnelTab />
            </TabsContent>

            <TabsContent value="content">
              <ContentTab />
            </TabsContent>
          </Tabs>
        </div>
      </AppShell>
    </>
  );
};

export default ClientReporting;
