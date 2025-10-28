import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  Package,
  MapPin,
  Truck,
  Fuel,
  DollarSign,
  TrendingUp,
  Calendar,
  Navigation2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const stats = [
    {
      label: "Active Shipments",
      value: "0",
      icon: Package,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Locations",
      value: "0",
      icon: MapPin,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Waybills",
      value: "0",
      icon: Truck,
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Finance Balance",
      value: "$0",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const modules = [
    {
      title: "Места (Locations)",
      description: "Manage loading and unloading locations with addresses and contact info",
      icon: MapPin,
      path: "/locations",
      color: "bg-purple-50 dark:bg-purple-950",
      accentColor: "text-purple-600 dark:text-purple-400",
      features: [
        "Geolocation support",
        "Loading type options",
        "Cargo types",
        "Company contacts",
      ],
    },
    {
      title: "Перевозки (Shipments)",
      description: "Track shipments from loading to unloading with calculated mileage",
      icon: Package,
      path: "/shipments",
      color: "bg-blue-50 dark:bg-blue-950",
      accentColor: "text-blue-600 dark:text-blue-400",
      features: [
        "Odometer tracking",
        "Weight recording",
        "Cargo info",
        "Auto-calculated mileage",
      ],
    },
    {
      title: "Путевые листы (Waybills)",
      description: "Create and manage waybills for trips with departure and arrival info",
      icon: Truck,
      path: "/waybills",
      color: "bg-orange-50 dark:bg-orange-950",
      accentColor: "text-orange-600 dark:text-orange-400",
      features: [
        "Trip dates and times",
        "Odometer readings",
        "Fuel tracking",
        "Multi-shipment support",
      ],
    },
    {
      title: "Заправки (Refueling)",
      description: "Log fuel refueling operations and track fuel consumption",
      icon: Fuel,
      path: "/refueling",
      color: "bg-amber-50 dark:bg-amber-950",
      accentColor: "text-amber-600 dark:text-amber-400",
      features: [
        "Fuel quantity tracking",
        "Refuel location types",
        "Date and time logging",
        "Waybill integration",
      ],
    },
    {
      title: "Финансы (Finance)",
      description: "Track payments and financial operations with automatic calculations",
      icon: DollarSign,
      path: "/finance",
      color: "bg-green-50 dark:bg-green-950",
      accentColor: "text-green-600 dark:text-green-400",
      features: [
        "Charge and payment tracking",
        "Balance calculations",
        "Monthly reporting",
        "Deductions management",
      ],
    },
  ];

  return (
    <Layout>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">TransLog</h1>
              <p className="text-lg opacity-90">
                Complete Transportation & Logistics Management System
              </p>
              <p className="text-sm opacity-75 mt-3">
                Manage shipments, locations, waybills, fuel, and finances in one place
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur">
                <Navigation2 className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-card rounded-xl shadow-sm border border-border p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3`}
                  >
                    <Icon className="w-full h-full text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features/Modules Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Core Modules</h2>
          <p className="text-muted-foreground">
            Explore all the features of your transportation management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`h-3 w-full bg-gradient-to-r ${modules[index].color.includes('purple') ? 'from-purple-500 to-pink-500' : modules[index].color.includes('blue') ? 'from-blue-500 to-cyan-500' : modules[index].color.includes('orange') ? 'from-orange-500 to-red-500' : modules[index].color.includes('amber') ? 'from-amber-500 to-yellow-500' : 'from-green-500 to-emerald-500'}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`w-8 h-8 ${module.accentColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {module.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {module.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={module.path}>
                    <Button variant="outline" className="w-full">
                      Manage Module
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="rounded-xl bg-card border border-border p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-accent p-3 flex-shrink-0">
                <Zap className="w-full h-full text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Get Started</h3>
                <p className="text-muted-foreground mb-4">
                  Begin by setting up your locations, then create shipments and manage your
                  transportation operations efficiently.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link to="/locations">
                <Button>Setup Locations First</Button>
              </Link>
              <Link to="/shipments">
                <Button variant="outline">Create a Shipment</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
