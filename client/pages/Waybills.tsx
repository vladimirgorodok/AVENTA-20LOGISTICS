import { Layout } from "@/components/Layout";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Waybills() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Путевые листы (Waybills)
          </h1>
          <p className="text-muted-foreground">
            Create and manage waybills for trips with departure and arrival info
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-12 text-center max-w-2xl mx-auto">
          <Truck className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Waybills Management
          </h3>
          <p className="text-muted-foreground mb-6">
            This module is ready for full implementation. It will allow you to track trip details,
            departure and arrival information, odometer readings, fuel consumption, and associated
            refueling operations.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Continue prompting to build out the complete Waybills interface with form submission,
            data management, and integration with other modules.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/")} variant="outline">
              Back to Dashboard
            </Button>
            <Button onClick={() => navigate("/shipments")}>
              Go to Shipments
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
