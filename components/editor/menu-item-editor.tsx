"use client";

import { useProjectStore } from "@/store/project-store";
import type { MenuItem } from "@/types/menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ProductImageUpload } from "@/components/menu-item/product-image-upload";
import { t } from "@/utils/translation";
import { Trash2 } from "lucide-react";
import { resolveDesign } from "@/templates/design-registry";

interface Props {
  item: MenuItem;
  categoryId: string;
}

export function MenuItemEditor({ item, categoryId }: Props) {
  const { currentProject, updateMenuItem, removeMenuItem } = useProjectStore();
  const lang = currentProject.activeLanguages[0] ?? "es";

  const design = resolveDesign(currentProject.templateId);
  const showImageUpload = design.capabilities.supportsImages;

  const setName = (value: string) =>
    updateMenuItem(categoryId, item.id, { name: { ...item.name, [lang]: value } });

  const setDescription = (value: string) =>
    updateMenuItem(categoryId, item.id, { description: { ...item.description, [lang]: value } });

  const setPrice = (value: string) => {
    const parsed = parseFloat(value.replace(",", "."));
    if (!isNaN(parsed)) updateMenuItem(categoryId, item.id, { price: parsed });
  };

  return (
    <div className="space-y-3">
      {/* Name + delete row */}
      <div className="flex items-center gap-2">
        <Input
          value={t(item.name, lang)}
          onChange={(e) => setName(e.target.value)}
          className="h-8 text-sm font-medium flex-1"
          placeholder="Nombre del plato"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => removeMenuItem(categoryId, item.id)}
          title="Eliminar producto"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Description */}
      <Textarea
        value={t(item.description, lang)}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="text-sm resize-none leading-relaxed"
        placeholder="Descripción breve…"
      />

      {/* Price */}
      <div className="flex items-center gap-2">
        <Label className="text-[10px] text-muted-foreground uppercase tracking-wide shrink-0">
          Precio
        </Label>
        <div className="relative w-28">
          <Input
            type="number"
            min={0}
            step={0.5}
            defaultValue={item.price}
            onBlur={(e) => setPrice(e.target.value)}
            className="h-8 text-sm pr-6 tabular-nums"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
            €
          </span>
        </div>
      </div>

      {/* Product image — only shown when the active template supports images */}
      {showImageUpload && (
        <ProductImageUpload
          image={item.image}
          itemName={t(item.name, lang)}
          onUpload={(dataUrl) => updateMenuItem(categoryId, item.id, { image: dataUrl })}
          onRemove={() => updateMenuItem(categoryId, item.id, { image: undefined })}
        />
      )}
    </div>
  );
}
