"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, TemplateHeader, BackgroundLayer } from "./shared";
import type { TemplateProps } from "./types";

export function ElegantTemplate({ project, categories, design, lang }: TemplateProps) {
  const { restaurantInfo, branding } = project;
  const { colors, fonts, spacing, layout } = design;

  const visible = categories
    .filter((c) => c.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <BackgroundLayer
      design={design}
      style={{
        color: colors.text,
        fontFamily: fonts.body,
        padding: "3.5rem 4rem",
        minHeight: "100%",
      }}
    >
      {/* Header — centrado y ornamental */}
      <header style={{ textAlign: "center", marginBottom: spacing.sectionGap }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "1.25rem",
          }}
        >
          <div style={{ height: "1px", width: "3rem", backgroundColor: colors.accent }} />
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: colors.accent, textTransform: "uppercase" }}>
            ✦
          </span>
          <div style={{ height: "1px", width: "3rem", backgroundColor: colors.accent }} />
        </div>

        <TemplateHeader
          project={project}
          design={design}
          lang={lang}
          align="center"
          headingStyle={{ fontSize: "2.25rem", fontWeight: 700, letterSpacing: "0.02em" }}
        >
          {restaurantInfo.tagline && (
            <p
              style={{
                fontFamily: fonts.heading,
                fontStyle: "italic",
                fontSize: "0.9rem",
                color: colors.accent,
                margin: "0.5rem 0 0",
              }}
            >
              {restaurantInfo.tagline}
            </p>
          )}
          {branding?.welcomeMessage?.[lang] && (
            <p
              style={{
                fontSize: "0.85rem",
                color: colors.text,
                opacity: 0.65,
                fontStyle: "italic",
                maxWidth: "28rem",
                margin: "1rem auto 0",
                lineHeight: 1.7,
              }}
            >
              {branding.welcomeMessage[lang]}
            </p>
          )}
        </TemplateHeader>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <div style={{ height: "1px", flex: 1, maxWidth: "5rem", backgroundColor: colors.accent, opacity: 0.4 }} />
          <div style={{ width: "4px", height: "4px", backgroundColor: colors.accent, transform: "rotate(45deg)" }} />
          <div style={{ height: "1px", flex: 1, maxWidth: "5rem", backgroundColor: colors.accent, opacity: 0.4 }} />
        </div>
      </header>

      {/* Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.sectionGap }}>
        {visible.map((cat, idx) => {
          const items = cat.items
            .filter((i) => i.available)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          return (
            <section key={cat.id}>
              {/* Category header */}
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <h2
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: colors.text,
                    margin: 0,
                  }}
                >
                  {t(cat.name, lang)}
                </h2>
                {cat.description[lang] && layout.showDescriptions && (
                  <p
                    style={{
                      fontFamily: fonts.heading,
                      fontStyle: "italic",
                      fontSize: "0.8rem",
                      color: colors.accent,
                      margin: "0.35rem 0 0",
                    }}
                  >
                    {t(cat.description, lang)}
                  </p>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    marginTop: "0.75rem",
                  }}
                >
                  <div style={{ height: "1px", width: "2rem", backgroundColor: colors.accent, opacity: 0.5 }} />
                  <div style={{ width: "3px", height: "3px", backgroundColor: colors.accent, borderRadius: "50%" }} />
                  <div style={{ height: "1px", width: "2rem", backgroundColor: colors.accent, opacity: 0.5 }} />
                </div>
              </div>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.itemGap }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "1rem",
                      alignItems: "baseline",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                        {item.featured && (
                          <span style={{ color: colors.accent, fontSize: "0.7rem" }}>✦</span>
                        )}
                        <span
                          style={{
                            fontFamily: fonts.heading,
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            letterSpacing: "0.01em",
                          }}
                        >
                          {t(item.name, lang)}
                        </span>
                      </div>

                      {layout.showDescriptions && item.description[lang] && (
                        <p
                          style={{
                            fontStyle: "italic",
                            fontSize: "0.78rem",
                            color: colors.text,
                            opacity: 0.55,
                            margin: "0.2rem 0 0",
                            lineHeight: 1.6,
                          }}
                        >
                          {t(item.description, lang)}
                        </p>
                      )}

                      <AllergenBadges allergens={item.allergens.contains} />
                    </div>

                    {layout.showPrices && (
                      <span
                        style={{
                          fontFamily: fonts.heading,
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: colors.accent,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatPrice(item.price, item.currency)}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Separador entre categorías */}
              {layout.showCategorySeparators && idx < visible.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    marginTop: spacing.sectionGap,
                  }}
                >
                  <div style={{ height: "1px", flex: 1, backgroundColor: colors.accent, opacity: 0.25 }} />
                  <span style={{ color: colors.accent, fontSize: "0.65rem", opacity: 0.6 }}>✦</span>
                  <div style={{ height: "1px", flex: 1, backgroundColor: colors.accent, opacity: 0.25 }} />
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Footer */}
      {(restaurantInfo.address || restaurantInfo.phone || restaurantInfo.website) && (
        <footer style={{ textAlign: "center", marginTop: spacing.sectionGap }}>
          <div style={{ height: "1px", backgroundColor: colors.accent, opacity: 0.2, marginBottom: "1.25rem" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              fontSize: "0.7rem",
              opacity: 0.5,
              fontStyle: "italic",
            }}
          >
            {restaurantInfo.address && <span>{restaurantInfo.address}</span>}
            {restaurantInfo.phone && <span>{restaurantInfo.phone}</span>}
            {restaurantInfo.website && <span>{restaurantInfo.website}</span>}
          </div>
        </footer>
      )}
    </BackgroundLayer>
  );
}
