"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, TemplateHeader, BackgroundLayer } from "./shared";
import type { TemplateProps } from "./types";

export function CoffeeTemplate({ project, categories, design, lang }: TemplateProps) {
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
        padding: "3rem 3.5rem",
        minHeight: "100%",
      }}
    >
      {/* Header — cálido y artesanal */}
      <header style={{ marginBottom: spacing.sectionGap }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              backgroundColor: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              flexShrink: 0,
            }}
          >
            ☕
          </div>
          <TemplateHeader
            project={project}
            design={design}
            lang={lang}
            align="left"
            headingStyle={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "0.01em" }}
          >
            {restaurantInfo.tagline && (
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: "0.75rem",
                  color: colors.accent,
                  margin: "0.2rem 0 0",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                {restaurantInfo.tagline}
              </p>
            )}
          </TemplateHeader>
        </div>

        {branding?.welcomeMessage?.[lang] && (
          <p
            style={{
              fontSize: "0.85rem",
              color: colors.text,
              opacity: 0.6,
              margin: 0,
              lineHeight: 1.7,
              padding: "0.75rem 1rem",
              backgroundColor: `${colors.accent}18`,
              borderRadius: "0.5rem",
              borderLeft: `3px solid ${colors.accent}`,
            }}
          >
            {branding.welcomeMessage[lang]}
          </p>
        )}

        <div
          style={{
            height: "2px",
            background: `linear-gradient(to right, ${colors.accent}, ${colors.accent}00)`,
            marginTop: "1.5rem",
          }}
        />
      </header>

      {/* Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.sectionGap }}>
        {visible.map((cat) => {
          const items = cat.items
            .filter((i) => i.available)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          return (
            <section key={cat.id}>
              {/* Category header — estilo chalkboard */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: `${colors.accent}22`,
                  borderRadius: "0.3rem",
                  padding: "0.3rem 0.75rem",
                  marginBottom: "1.25rem",
                }}
              >
                <h2
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: colors.accent,
                    margin: 0,
                  }}
                >
                  {t(cat.name, lang)}
                </h2>
              </div>

              {cat.description[lang] && layout.showDescriptions && (
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: "0.8rem",
                    color: colors.text,
                    opacity: 0.55,
                    margin: "-0.75rem 0 1rem",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                  }}
                >
                  {t(cat.description, lang)}
                </p>
              )}

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.itemGap }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                      padding: "0.6rem 0.75rem",
                      borderRadius: "0.375rem",
                      backgroundColor: item.featured ? `${colors.accent}12` : "transparent",
                      borderLeft: item.featured ? `2px solid ${colors.accent}` : "2px solid transparent",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span
                          style={{
                            fontFamily: fonts.heading,
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: colors.text,
                          }}
                        >
                          {t(item.name, lang)}
                        </span>
                        {item.featured && (
                          <span
                            style={{
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: colors.accent,
                              backgroundColor: `${colors.accent}25`,
                              padding: "0.1rem 0.35rem",
                              borderRadius: "0.2rem",
                            }}
                          >
                            Popular
                          </span>
                        )}
                      </div>

                      {layout.showDescriptions && item.description[lang] && (
                        <p
                          style={{
                            fontSize: "0.775rem",
                            color: colors.text,
                            opacity: 0.5,
                            margin: "0.2rem 0 0",
                            lineHeight: 1.5,
                          }}
                        >
                          {t(item.description, lang)}
                        </p>
                      )}

                      {/* Variants */}
                      {item.variants && item.variants.length > 0 && (
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.35rem", flexWrap: "wrap" }}>
                          {item.variants.map((v) => (
                            <span
                              key={v.id}
                              style={{
                                fontSize: "0.7rem",
                                padding: "0.15rem 0.4rem",
                                border: `1px solid ${colors.accent}40`,
                                borderRadius: "0.25rem",
                                color: colors.text,
                                opacity: 0.7,
                              }}
                            >
                              {t(v.label, lang)} {layout.showPrices && v.price ? `· ${formatPrice(v.price, item.currency)}` : ""}
                            </span>
                          ))}
                        </div>
                      )}

                      <AllergenBadges allergens={item.allergens.contains} />
                    </div>

                    {layout.showPrices && (!item.variants || item.variants.length === 0) && (
                      <span
                        style={{
                          fontFamily: fonts.heading,
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          color: colors.accent,
                          flexShrink: 0,
                          paddingTop: "0.1rem",
                        }}
                      >
                        {formatPrice(item.price, item.currency)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Footer */}
      {(restaurantInfo.address || restaurantInfo.phone || restaurantInfo.website) && (
        <footer
          style={{
            marginTop: spacing.sectionGap,
            paddingTop: "1.25rem",
            borderTop: `1px solid ${colors.text}15`,
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.72rem",
            color: colors.text,
            opacity: 0.4,
          }}
        >
          {restaurantInfo.address && <span>📍 {restaurantInfo.address}</span>}
          {restaurantInfo.phone && <span>📞 {restaurantInfo.phone}</span>}
          {restaurantInfo.website && <span>🌐 {restaurantInfo.website}</span>}
        </footer>
      )}
    </BackgroundLayer>
  );
}
