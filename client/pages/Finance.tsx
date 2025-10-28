import { Layout } from "@/components/Layout";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Finance() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Финансы (Finance)
          </h1>
          <p className="text-muted-foreground">
            Track payments and financial operations with automatic calculations
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-12 text-center max-w-2xl mx-auto">
          <DollarSign className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Finance Management
          </h3>
          <p className="text-muted-foreground mb-6">
            This module is ready for full implementation. It will allow you to track financial
            operations, manage charges and payments, calculate balances, handle deductions,
            and generate monthly reporting with automatic calculations.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Continue prompting to build out the complete Finance interface with transaction
            history, balance sheets, monthly reports, and financial analysis tools.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/")} variant="outline">
              Back to Dashboard
            </Button>
            <Button onClick={() => navigate("/refueling")}>
              Go to Refueling
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
