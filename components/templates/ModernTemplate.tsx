"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, TemplateHeader } from "./shared";
import type { TemplateProps } from "./types";

export function ModernTemplate({ project, categories, design, lang }: TemplateProps) {
  const { restaurantInfo, branding } = project;
  const { colors, fonts, spacing, layout } = design;

  const visible = categories
    .filter((c) => c.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: fonts.body,
        padding: 0,
        minHeight: "100%",
      }}
    >
      {/* Header — barra superior bold */}
      <header
        style={{
          padding: "2.5rem 3.5rem",
          borderBottom: `3px solid ${colors.accent}`,
          position: "sticky",
          top: 0,
          backgroundColor: colors.background,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <TemplateHeader
            project={project}
            design={design}
            lang={lang}
            align="left"
            headingStyle={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", textTransform: "uppercase" }}
          >
            {restaurantInfo.tagline && (
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  color: colors.accent,
                  margin: "0.4rem 0 0",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {restaurantInfo.tagline}
              </p>
            )}
          </TemplateHeader>
          <div
            style={{
              width: "3px",
              height: "3rem",
              backgroundColor: colors.accent,
              flexShrink: 0,
            }}
          />
        </div>
      </header>

      {/* Body */}
      <div style={{ padding: "0 3.5rem 3.5rem" }}>
        {branding?.welcomeMessage?.[lang] && (
          <p
            style={{
              fontSize: "0.85rem",
              color: colors.text,
              opacity: 0.45,
              padding: "1.5rem 0",
              borderBottom: `1px solid ${colors.text}15`,
              margin: 0,
            }}
          >
            {branding.welcomeMessage[lang]}
          </p>
        )}

        {/* Categories — grid de 2 columnas si hay espacio */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: spacing.sectionGap,
            marginTop: "2.5rem",
          }}
        >
          {visible.map((cat) => {
            const items = cat.items
              .filter((i) => i.available)
              .sort((a, b) => a.sortOrder - b.sortOrder);

            return (
              <section key={cat.id}>
                {/* Category header — line + bold label */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "1rem",
                      height: "3px",
                      backgroundColor: colors.accent,
                      flexShrink: 0,
                    }}
                  />
                  <h2
                    style={{
                      fontFamily: fonts.heading,
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: colors.text,
                      margin: 0,
                    }}
                  >
                    {t(cat.name, lang)}
                  </h2>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      backgroundColor: colors.text,
                      opacity: 0.1,
                    }}
                  />
                </div>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: spacing.itemGap }}>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1rem",
                        padding: "0.75rem 0",
                        borderBottom: `1px solid ${colors.text}08`,
                      }}
                    >
                      {/* Accent bar lateral */}
                      {item.featured && (
                        <div
                          style={{
                            width: "2px",
                            alignSelf: "stretch",
                            backgroundColor: colors.accent,
                            flexShrink: 0,
                          }}
                        />
                      )}

                      <div style={{ flex: 1, minWidth: 0 }}>

                        <span
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {t(item.name, lang)}
                        </span>

                        {layout.showDescriptions && item.description[lang] && (
                          <p
                            style={{
                              fontSize: "0.775rem",
                              color: colors.text,
                              opacity: 0.45,
                              margin: "0.25rem 0 0",
                              lineHeight: 1.5,
                            }}
                          >
                            {t(item.description, lang)}
                          </p>
                        )}

                        <AllergenBadges allergens={item.allergens.contains} opacity={0.7} />
                      </div>

                      {/* Right side: price + optional image */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", flexShrink: 0 }}>
                        {layout.showPrices && (
                          <span
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: 700,
                              color: colors.accent,
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {formatPrice(item.price, item.currency)}
                          </span>
                        )}
                        {item.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.image}
                            alt={t(item.name, lang)}
                            style={{
                              width: "4rem",
                              height: "4rem",
                              objectFit: "cover",
                              borderRadius: "0.25rem",
                              border: `1px solid ${colors.text}15`,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      {(restaurantInfo.address || restaurantInfo.phone) && (
        <footer
          style={{
            padding: "1.25rem 3.5rem",
            borderTop: `3px solid ${colors.accent}`,
            display: "flex",
            gap: "2rem",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: colors.text,
            opacity: 0.4,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {restaurantInfo.address && <span>{restaurantInfo.address}</span>}
          {restaurantInfo.phone && <span>{restaurantInfo.phone}</span>}
        </footer>
      )}
    </div>
  );
}
