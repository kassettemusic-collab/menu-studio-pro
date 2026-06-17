"use client";

import { useState } from "react";
import { useProjectStore } from "@/store/project-store";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { ALLERGENS_META } from "@/constants/allergens";

export function CategoryList() {
  const { currentProject, categories } = useProjectStore();
  const lang = currentProject.activeLanguages[0] ?? "es";
  const [openCategory, setOpenCategory] = useState<string | null>(
    categories[0]?.id ?? null
  );

  return (
    <div className="space-y-2">
      {categories.map((cat) => {
        const isOpen = openCategory === cat.id;
        return (
          <div key={cat.id} className="rounded-md border border-border overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenCategory(isOpen ? null : cat.id)}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-muted/50 hover:bg-muted transition-colors text-left"
            >
              <span className="font-medium text-sm">{t(cat.name, lang)}</span>
              <span className="text-xs text-muted-foreground">
                {cat.items.length} productos
              </span>
            </button>

            {isOpen && (
              <div className="divide-y divide-border">
                {cat.items.map((item) => (
                  <div key={item.id} className="px-3 py-2.5 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-medium leading-snug">
                        {t(item.name, lang)}
                      </span>
                      <span className="text-sm font-semibold tabular-nums shrink-0">
                        {formatPrice(item.price, item.currency)}
                      </span>
                    </div>

                    {item.description[lang] && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {t(item.description, lang)}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {item.allergens.contains.map((a) => (
                        <span
                          key={a}
                          title={ALLERGENS_META[a].label}
                          className="text-base leading-none"
                        >
                          {ALLERGENS_META[a].icon}
                        </span>
                      ))}
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 h-4"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
