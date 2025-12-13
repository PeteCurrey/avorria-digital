import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowRight, Users } from "lucide-react";
import { useClients } from "@/hooks/useClients";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateClientDialog } from "@/components/platform/CreateClientDialog";

const PlatformClients = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: clients, isLoading } = useClients();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "onboarding":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "at-risk":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "paused":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default:
        return "";
    }
  };

  const filteredClients = clients?.filter((client) => {
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client.industry?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  }) || [];

  return (
    <>
      <Helmet>
        <title>Clients - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-foreground mb-2">Clients</h1>
              <p className="text-muted-foreground">
                Manage your client portfolio and track engagement
              </p>
            </div>
            <CreateClientDialog />
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search clients or industries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="at-risk">At risk</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-32 mb-4" />
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredClients.length === 0 && clients?.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No clients yet</h3>
                <p className="text-muted-foreground mb-4">
                  Get started by adding your first client to the platform.
                </p>
                <CreateClientDialog />
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {!isLoading && filteredClients.length === 0 && clients && clients.length > 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No clients found matching your filters.</p>
              </CardContent>
            </Card>
          )}

          {/* Clients Grid */}
          {!isLoading && filteredClients.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredClients.map((client) => (
                <Card key={client.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-foreground mb-1">
                          {client.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{client.industry || 'No industry'}</p>
                        <Badge variant="outline" className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Services</span>
                        <div className="flex gap-1 flex-wrap justify-end">
                          {client.services && client.services.length > 0 ? (
                            client.services.map((service) => (
                              <Badge key={service} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-xs">None</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Monthly value</span>
                        <span className="font-medium text-foreground">{client.monthly_value || 'Not set'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Owner</span>
                        <span className="text-foreground">{client.owner_name || 'Unassigned'}</span>
                      </div>
                    </div>

                    <Link to={`/platform/clients/${client.id}`}>
                      <Button variant="outline" className="w-full">
                        View client details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </AppShell>
    </>
  );
};

export default PlatformClients;
