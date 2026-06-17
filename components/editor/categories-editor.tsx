"use client";

import { useState } from "react";
import { useProjectStore } from "@/store/project-store";
import { t } from "@/utils/translation";
import { MenuItemEditor } from "./menu-item-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Plus } from "lucide-react";

export function CategoriesEditor() {
  const {
    currentProject,
    categories,
    updateCategory,
    addCategory,
    removeCategory,
    addMenuItem,
  } = useProjectStore();

  const lang = currentProject.activeLanguages[0] ?? "es";
  const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

  const [openValues, setOpenValues] = useState<string[]>(
    sorted[0]?.id ? [sorted[0].id] : []
  );

  const handleAddCategory = () => {
    const cat = addCategory();
    setOpenValues((prev) => [...prev, cat.id]);
  };

  return (
    <div className="space-y-3">
      {/* Category list */}
      {sorted.length > 0 ? (
        <Accordion
          value={openValues}
          onValueChange={(v) => setOpenValues(v as string[])}
          className="space-y-2"
        >
          {sorted.map((cat) => {
            const catName = t(cat.name, lang) || "Sin nombre";

            return (
              <AccordionItem
                key={cat.id}
                value={cat.id}
                className="border border-border rounded-lg overflow-hidden"
              >
                {/* Category header */}
                <div className="flex items-center group">
                  <AccordionTrigger className="flex-1 px-4 py-3 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]]:bg-muted/30 min-w-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-sm font-semibold truncate">{catName}</span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] h-4 px-1.5 shrink-0 font-normal"
                      >
                        {cat.items.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>

                  {/* Delete category */}
                  <button
                    onClick={() => {
                      removeCategory(cat.id);
                      setOpenValues((prev) => prev.filter((v) => v !== cat.id));
                    }}
                    className="shrink-0 px-3 py-3 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Eliminar categoría"
                    type="button"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <AccordionContent className="px-4 pb-4 pt-0">
                  {/* Edit category name */}
                  <div className="space-y-1 mb-4 pt-3 border-t border-border">
                    <Label className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      Nombre de la categoría
                    </Label>
                    <Input
                      value={t(cat.name, lang)}
                      onChange={(e) =>
                        updateCategory(cat.id, {
                          name: { ...cat.name, [lang]: e.target.value },
                        })
                      }
                      className="h-8 text-sm font-medium"
                      placeholder="Nombre de la categoría"
                    />
                  </div>

                  {/* Products */}
                  <div className="space-y-2">
                    {[...cat.items]
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((item) => (
                        <Card
                          key={item.id}
                          className="shadow-none border-border/60 bg-muted/15"
                        >
                          <CardContent className="px-4 py-3">
                            <MenuItemEditor item={item} categoryId={cat.id} />
                          </CardContent>
                        </Card>
                      ))}

                    {/* Add product */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addMenuItem(cat.id)}
                      className="w-full h-8 text-xs text-muted-foreground border border-dashed border-border hover:border-foreground/30 hover:text-foreground hover:bg-muted/20 transition-all mt-1"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1.5" />
                      Añadir producto
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div className="rounded-lg border border-dashed border-border py-8 text-center">
          <p className="text-sm text-muted-foreground">No hay categorías todavía.</p>
          <p className="text-xs text-muted-foreground/60 mt-0.5">
            Pulsa el botón para crear la primera.
          </p>
        </div>
      )}

      {/* New category button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddCategory}
        className="w-full h-9 text-sm gap-2 border-dashed"
      >
        <PlusCircle className="h-4 w-4" />
        Nueva categoría
      </Button>
    </div>
  );
}
