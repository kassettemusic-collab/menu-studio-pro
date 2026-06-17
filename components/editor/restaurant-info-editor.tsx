"use client";

import { useProjectStore } from "@/store/project-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function RestaurantInfoEditor() {
  const { currentProject, updateRestaurantInfo } = useProjectStore();
  const info = currentProject.restaurantInfo;

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="ri-name" className="text-xs text-muted-foreground">
          Nombre
        </Label>
        <Input
          id="ri-name"
          value={info.name}
          onChange={(e) => updateRestaurantInfo({ name: e.target.value })}
          placeholder="Nombre del restaurante"
          className="h-8 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="ri-tagline" className="text-xs text-muted-foreground">
          Descripción / eslogan
        </Label>
        <Textarea
          id="ri-tagline"
          value={info.tagline ?? ""}
          onChange={(e) => updateRestaurantInfo({ tagline: e.target.value })}
          placeholder="Sabores del mar y la tierra…"
          rows={2}
          className="text-sm resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="ri-phone" className="text-xs text-muted-foreground">
            Teléfono
          </Label>
          <Input
            id="ri-phone"
            value={info.phone ?? ""}
            onChange={(e) => updateRestaurantInfo({ phone: e.target.value })}
            placeholder="+34 000 000 000"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ri-address" className="text-xs text-muted-foreground">
            Dirección
          </Label>
          <Input
            id="ri-address"
            value={info.address ?? ""}
            onChange={(e) => updateRestaurantInfo({ address: e.target.value })}
            placeholder="Calle…"
            className="h-8 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
