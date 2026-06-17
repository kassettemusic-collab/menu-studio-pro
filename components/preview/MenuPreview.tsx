"use client";

import { useProjectStore } from "@/store/project-store";
import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { ALLERGENS_META } from "@/constants/allergens";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function MenuPreview() {
  const { currentProject, categories } = useProjectStore();
  const { restaurantInfo, themeConfig, activeLanguages } = currentProject;
  const lang = activeLanguages[0] ?? "es";

  const spacingClass =
    themeConfig.spacing === "compact"
      ? "space-y-4"
      : themeConfig.spacing === "relaxed"
        ? "space-y-10"
        : "space-y-7";

  return (
    <div
      className="w-full max-w-[680px] mx-auto rounded-lg shadow-lg overflow-hidden"
      style={{ backgroundColor: themeConfig.backgroundColor, color: themeConfig.textColor }}
    >
      {/* Restaurant header */}
      <div
        className="px-10 py-8 text-center"
        style={{ backgroundColor: themeConfig.primaryColor }}
      >
        <h1
          className="text-3xl font-bold tracking-wide"
          style={{
            fontFamily: themeConfig.fontFamilyHeading,
            color: themeConfig.backgroundColor,
          }}
        >
          {restaurantInfo.name}
        </h1>
        {restaurantInfo.tagline && (
          <p
            className="mt-1.5 text-sm tracking-widest uppercase opacity-80"
            style={{ color: themeConfig.accentColor }}
          >
            {restaurantInfo.tagline}
          </p>
        )}
      </div>

      {/* Accent bar */}
      <div className="h-1" style={{ backgroundColor: themeConfig.accentColor }} />

      {/* Menu content */}
      <div className={`px-8 py-8 ${spacingClass}`}>
        {categories
          .filter((c) => c.visible)
          .map((cat, idx) => (
            <section key={cat.id}>
              {idx > 0 && <Separator className="mb-7 opacity-20" />}

              {/* Category heading */}
              <div className="mb-5 text-center">
                <h2
                  className="text-xl font-semibold tracking-wider uppercase"
                  style={{
                    fontFamily: themeConfig.fontFamilyHeading,
                    color: themeConfig.accentColor,
                  }}
                >
                  {t(cat.name, lang)}
                </h2>
                {cat.description?.[lang] && (
                  <p className="mt-1 text-xs opacity-60 italic">
                    {t(cat.description, lang)}
                  </p>
                )}
              </div>

              {/* Items */}
              <div className="space-y-5">
                {cat.items
                  .filter((i) => i.available)
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <span
                            className="font-medium text-sm leading-snug"
                            style={{ fontFamily: themeConfig.fontFamily }}
                          >
                            {t(item.name, lang)}
                            {item.featured && (
                              <span
                                className="ml-1.5 text-[10px] font-semibold uppercase tracking-wide"
                                style={{ color: themeConfig.accentColor }}
                              >
                                ★
                              </span>
                            )}
                          </span>
                          {/* Dot leader */}
                          <span className="flex-1 border-b border-dotted border-current opacity-20 mb-1 min-w-4" />
                          <span className="text-sm font-semibold tabular-nums shrink-0">
                            {formatPrice(item.price, item.currency)}
                          </span>
                        </div>

                        {item.description[lang] && (
                          <p className="mt-0.5 text-xs opacity-60 leading-relaxed">
                            {t(item.description, lang)}
                          </p>
                        )}

                        {/* Allergens + tags */}
                        {(item.allergens.contains.length > 0 || item.tags.length > 0) && (
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            {item.allergens.contains.map((a) => (
                              <span
                                key={a}
                                title={ALLERGENS_META[a].label}
                                className="text-sm leading-none"
                              >
                                {ALLERGENS_META[a].icon}
                              </span>
                            ))}
                            {item.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-[9px] h-4 px-1.5 py-0 uppercase tracking-wide opacity-70"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
      </div>

      {/* Footer */}
      {(restaurantInfo.address || restaurantInfo.phone) && (
        <div
          className="px-8 py-5 text-center border-t"
          style={{ borderColor: `${themeConfig.accentColor}33` }}
        >
          {restaurantInfo.address && (
            <p className="text-xs opacity-60">{restaurantInfo.address}</p>
          )}
          {restaurantInfo.phone && (
            <p className="text-xs opacity-60 mt-0.5">{restaurantInfo.phone}</p>
          )}
        </div>
      )}
    </div>
  );
}
