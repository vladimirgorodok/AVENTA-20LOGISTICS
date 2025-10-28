import { Link, useLocation } from "react-router-dom";
import { Package, MapPin, Truck, Fuel, DollarSign, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: BarChart3,
    },
    {
      label: "Места (Locations)",
      path: "/locations",
      icon: MapPin,
    },
    {
      label: "Перевозки (Shipments)",
      path: "/shipments",
      icon: Package,
    },
    {
      label: "Путевые листы (Waybills)",
      path: "/waybills",
      icon: Truck,
    },
    {
      label: "Заправки (Refueling)",
      path: "/refueling",
      icon: Fuel,
    },
    {
      label: "Финансы (Finance)",
      path: "/finance",
      icon: DollarSign,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-card border-r border-border shadow-sm">
        <div className="sticky top-0 h-full flex flex-col">
          {/* Logo/Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">TransLog</h1>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Transportation Management System
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border text-xs text-muted-foreground">
            <p>v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
