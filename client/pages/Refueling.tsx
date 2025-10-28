import { Layout } from "@/components/Layout";
import { Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Refueling() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Заправки (Refueling)
          </h1>
          <p className="text-muted-foreground">
            Log fuel refueling operations and track fuel consumption
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-12 text-center max-w-2xl mx-auto">
          <Fuel className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Refueling Management
          </h3>
          <p className="text-muted-foreground mb-6">
            This module is ready for full implementation. It will allow you to record refueling
            operations with fuel quantity, refueling location type (barrel or gas station),
            dates, and link them to waybills for comprehensive fuel tracking.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Continue prompting to build out the complete Refueling interface with fuel consumption
            calculations, refueling history, and cost analysis.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/")} variant="outline">
              Back to Dashboard
            </Button>
            <Button onClick={() => navigate("/waybills")}>
              Go to Waybills
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
