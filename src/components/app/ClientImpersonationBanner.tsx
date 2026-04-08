import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const ClientImpersonationBanner = () => {
  const { impersonatedClient, setImpersonatedClient } = useAuth();

  if (!impersonatedClient) return null;

  return (
    <Alert className="rounded-none border-x-0 border-t-0 bg-amber-500/10 border-amber-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Eye className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-sm font-medium text-amber-900 dark:text-amber-100">
            Viewing as client: <span className="font-semibold">{impersonatedClient}</span>
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setImpersonatedClient(null)}
          className="h-8 text-amber-900 hover:text-amber-950 hover:bg-amber-500/20"
        >
          <X className="h-4 w-4 mr-2" />
          Exit View
        </Button>
      </div>
    </Alert>
  );
};

export default ClientImpersonationBanner;
