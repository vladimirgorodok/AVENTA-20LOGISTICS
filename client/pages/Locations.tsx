import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Location } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, MapPin, Phone, Building2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Location>>({
    settlementName: "",
    fullAddress: "",
    coordinates: { latitude: 0, longitude: 0 },
    company: "",
    contact: "",
    loadingType: "rear",
    cargoType: [],
    comment: "",
  });

  const loadingTypeOptions = [
    { value: "rear", label: "Задняя (Rear)" },
    { value: "side", label: "Боковая (Side)" },
    { value: "top", label: "Верхняя (Top)" },
  ];

  const defaultCargoTypes = [
    "Зерно (Grain)",
    "Удобрения (Fertilizer)",
    "Строй материалы (Building Materials)",
    "Продукты (Food)",
  ];

  const handleSave = () => {
    if (!formData.settlementName || !formData.fullAddress) {
      alert("Please fill in all required fields");
      return;
    }

    const generatedName = `${formData.settlementName} - ${formData.fullAddress}`;

    if (editingId) {
      setLocations(
        locations.map((loc) =>
          loc.id === editingId
            ? {
                ...loc,
                ...formData,
                name: generatedName,
                updatedAt: new Date().toISOString(),
              }
            : loc
        )
      );
    } else {
      const newLocation: Location = {
        id: Date.now().toString(),
        name: generatedName,
        settlementName: formData.settlementName || "",
        fullAddress: formData.fullAddress || "",
        coordinates: formData.coordinates || { latitude: 0, longitude: 0 },
        company: formData.company || "",
        contact: formData.contact || "",
        loadingType: formData.loadingType || "rear",
        cargoType: formData.cargoType || [],
        comment: formData.comment || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLocations([...locations, newLocation]);
    }

    resetForm();
    setOpen(false);
  };

  const handleEdit = (location: Location) => {
    setFormData(location);
    setEditingId(location.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      setLocations(locations.filter((loc) => loc.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      settlementName: "",
      fullAddress: "",
      coordinates: { latitude: 0, longitude: 0 },
      company: "",
      contact: "",
      loadingType: "rear",
      cargoType: [],
      comment: "",
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
            Места (Locations)
          </h1>
          <p className="text-muted-foreground">
            Manage loading and unloading locations with addresses and contact information
          </p>
        </div>

        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Total locations: <span className="font-semibold">{locations.length}</span>
            </p>
          </div>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Location" : "Add New Location"}
                </DialogTitle>
                <DialogDescription>
                  Fill in the location details including address and contact information
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Settlement Name */}
                <div className="space-y-2">
                  <Label htmlFor="settlement">Settlement / Town Name *</Label>
                  <Input
                    id="settlement"
                    placeholder="e.g., Moscow"
                    value={formData.settlementName || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        settlementName: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Full Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    placeholder="e.g., Lenina St., 10"
                    value={formData.fullAddress || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullAddress: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="0.0001"
                      placeholder="55.7558"
                      value={formData.coordinates?.latitude || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coordinates: {
                            ...(formData.coordinates || { latitude: 0, longitude: 0 }),
                            latitude: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="0.0001"
                      placeholder="37.6173"
                      value={formData.coordinates?.longitude || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coordinates: {
                            ...(formData.coordinates || { latitude: 0, longitude: 0 }),
                            longitude: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Company name"
                    value={formData.company || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        company: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    placeholder="Phone or email"
                    value={formData.contact || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Loading Type */}
                <div className="space-y-2">
                  <Label htmlFor="loadingType">Loading Type</Label>
                  <Select
                    value={formData.loadingType || "rear"}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        loadingType: value as "rear" | "side" | "top",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Cargo Types */}
                <div className="space-y-2">
                  <Label>Cargo Types</Label>
                  <div className="space-y-2">
                    {defaultCargoTypes.map((cargo) => (
                      <label key={cargo} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.cargoType?.includes(cargo) || false}
                          onChange={(e) => {
                            const current = formData.cargoType || [];
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                cargoType: [...current, cargo],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                cargoType: current.filter((c) => c !== cargo),
                              });
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{cargo}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-2">
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    placeholder="Additional notes about this location"
                    value={formData.comment || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        comment: e.target.value,
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
                  {editingId ? "Update" : "Create"} Location
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Locations Grid */}
        {locations.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No locations yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Create your first location to get started
            </p>
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Location
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Location</DialogTitle>
                  <DialogDescription>
                    Fill in the location details including address and contact information
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="settlement">Settlement / Town Name *</Label>
                    <Input
                      id="settlement"
                      placeholder="e.g., Moscow"
                      value={formData.settlementName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          settlementName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Input
                      id="address"
                      placeholder="e.g., Lenina St., 10"
                      value={formData.fullAddress || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullAddress: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="0.0001"
                        placeholder="55.7558"
                        value={formData.coordinates?.latitude || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            coordinates: {
                              ...(formData.coordinates || { latitude: 0, longitude: 0 }),
                              latitude: parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="0.0001"
                        placeholder="37.6173"
                        value={formData.coordinates?.longitude || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            coordinates: {
                              ...(formData.coordinates || { latitude: 0, longitude: 0 }),
                              longitude: parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Company name"
                      value={formData.company || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      placeholder="Phone or email"
                      value={formData.contact || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loadingType">Loading Type</Label>
                    <Select
                      value={formData.loadingType || "rear"}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          loadingType: value as "rear" | "side" | "top",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Cargo Types</Label>
                    <div className="space-y-2">
                      {defaultCargoTypes.map((cargo) => (
                        <label key={cargo} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.cargoType?.includes(cargo) || false}
                            onChange={(e) => {
                              const current = formData.cargoType || [];
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  cargoType: [...current, cargo],
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  cargoType: current.filter((c) => c !== cargo),
                                });
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{cargo}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Comment</Label>
                    <Textarea
                      id="comment"
                      placeholder="Additional notes about this location"
                      value={formData.comment || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          comment: e.target.value,
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
                  <Button onClick={handleSave}>Create Location</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 line-clamp-2">
                    {location.name}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {location.company && (
                      <div className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{location.company}</span>
                      </div>
                    )}
                    {location.contact && (
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{location.contact}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground line-clamp-2">
                        {location.fullAddress}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(location)}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-destructive"
                      onClick={() => handleDelete(location.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
