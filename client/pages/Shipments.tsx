import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Shipment } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Shipments() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Shipment>>({
    loadingDate: "",
    loadingOdometer: 0,
    loadingLocationId: "",
    cargoWeight: 0,
    unloadingDate: "",
    unloadingOdometer: 0,
    unloadingLocationId: "",
    waybillId: "",
  });

  const handleSave = () => {
    if (
      !formData.loadingDate ||
      !formData.loadingLocationId ||
      !formData.unloadingLocationId
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const mileage =
      (formData.unloadingOdometer || 0) - (formData.loadingOdometer || 0);
    const generatedName = formData.unloadingDate
      ? `${formData.loadingDate} - ${formData.unloadingDate}`
      : formData.loadingDate;

    if (editingId) {
      setShipments(
        shipments.map((ship) =>
          ship.id === editingId
            ? {
                ...ship,
                ...formData,
                name: generatedName,
                mileage,
                updatedAt: new Date().toISOString(),
              }
            : ship
        )
      );
    } else {
      const newShipment: Shipment = {
        id: Date.now().toString(),
        name: generatedName,
        loadingDate: formData.loadingDate || "",
        loadingOdometer: formData.loadingOdometer || 0,
        loadingLocationId: formData.loadingLocationId || "",
        cargoWeight: formData.cargoWeight || 0,
        unloadingDate: formData.unloadingDate || "",
        unloadingOdometer: formData.unloadingOdometer || 0,
        unloadingLocationId: formData.unloadingLocationId || "",
        mileage,
        waybillId: formData.waybillId || "",
        financeIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setShipments([...shipments, newShipment]);
    }

    resetForm();
    setOpen(false);
  };

  const handleEdit = (shipment: Shipment) => {
    setFormData(shipment);
    setEditingId(shipment.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      setShipments(shipments.filter((ship) => ship.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      loadingDate: "",
      loadingOdometer: 0,
      loadingLocationId: "",
      cargoWeight: 0,
      unloadingDate: "",
      unloadingOdometer: 0,
      unloadingLocationId: "",
      waybillId: "",
    });
    setEditingId(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      resetForm();
    }
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Перевозки (Shipments)
          </h1>
          <p className="text-muted-foreground">
            Track shipments from loading to unloading with calculated mileage
          </p>
        </div>

        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Total shipments: <span className="font-semibold">{shipments.length}</span>
            </p>
          </div>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Shipment" : "Add New Shipment"}
                </DialogTitle>
                <DialogDescription>
                  Create a new shipment with loading and unloading details
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="loadingDate">Loading Date *</Label>
                    <Input
                      id="loadingDate"
                      type="date"
                      value={formData.loadingDate || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          loadingDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unloadingDate">Unloading Date</Label>
                    <Input
                      id="unloadingDate"
                      type="date"
                      value={formData.unloadingDate || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          unloadingDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="loadingOdometer">Loading Odometer *</Label>
                    <Input
                      id="loadingOdometer"
                      type="number"
                      value={formData.loadingOdometer || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          loadingOdometer: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unloadingOdometer">Unloading Odometer</Label>
                    <Input
                      id="unloadingOdometer"
                      type="number"
                      value={formData.unloadingOdometer || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          unloadingOdometer: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="loadingLocation">Loading Location *</Label>
                    <Input
                      id="loadingLocation"
                      placeholder="Location ID"
                      value={formData.loadingLocationId || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          loadingLocationId: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unloadingLocation">Unloading Location *</Label>
                    <Input
                      id="unloadingLocation"
                      placeholder="Location ID"
                      value={formData.unloadingLocationId || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          unloadingLocationId: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargoWeight">Cargo Weight (kg)</Label>
                  <Input
                    id="cargoWeight"
                    type="number"
                    value={formData.cargoWeight || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cargoWeight: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waybillId">Waybill ID (Optional)</Label>
                  <Input
                    id="waybillId"
                    placeholder="Link to waybill"
                    value={formData.waybillId || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        waybillId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingId ? "Update" : "Create"} Shipment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Shipments List */}
        {shipments.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No shipments yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Create your first shipment to get started
            </p>
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Shipment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Shipment</DialogTitle>
                  <DialogDescription>
                    Create a new shipment with loading and unloading details
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loadingDate">Loading Date *</Label>
                      <Input
                        id="loadingDate"
                        type="date"
                        value={formData.loadingDate || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            loadingDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unloadingDate">Unloading Date</Label>
                      <Input
                        id="unloadingDate"
                        type="date"
                        value={formData.unloadingDate || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            unloadingDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loadingOdometer">Loading Odometer *</Label>
                      <Input
                        id="loadingOdometer"
                        type="number"
                        value={formData.loadingOdometer || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            loadingOdometer: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unloadingOdometer">Unloading Odometer</Label>
                      <Input
                        id="unloadingOdometer"
                        type="number"
                        value={formData.unloadingOdometer || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            unloadingOdometer: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loadingLocation">Loading Location *</Label>
                      <Input
                        id="loadingLocation"
                        placeholder="Location ID"
                        value={formData.loadingLocationId || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            loadingLocationId: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unloadingLocation">Unloading Location *</Label>
                      <Input
                        id="unloadingLocation"
                        placeholder="Location ID"
                        value={formData.unloadingLocationId || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            unloadingLocationId: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cargoWeight">Cargo Weight (kg)</Label>
                    <Input
                      id="cargoWeight"
                      type="number"
                      value={formData.cargoWeight || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cargoWeight: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waybillId">Waybill ID (Optional)</Label>
                    <Input
                      id="waybillId"
                      placeholder="Link to waybill"
                      value={formData.waybillId || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          waybillId: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Create Shipment</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Name</th>
                    <th className="text-left p-4 font-semibold">Loading Date</th>
                    <th className="text-right p-4 font-semibold">Mileage</th>
                    <th className="text-right p-4 font-semibold">Cargo Weight</th>
                    <th className="text-right p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <tr key={shipment.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4">{shipment.name}</td>
                      <td className="p-4">{shipment.loadingDate}</td>
                      <td className="p-4 text-right">{shipment.mileage} km</td>
                      <td className="p-4 text-right">{shipment.cargoWeight} kg</td>
                      <td className="p-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(shipment)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDelete(shipment.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
