"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, TemplateHeader, BackgroundLayer } from "./shared";
import type { TemplateProps } from "./types";

export function MediterraneanTemplate({ project, categories, design, lang }: TemplateProps) {
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
      {/* Borde decorativo */}
      <div
        style={{
          position: "absolute",
          inset: "0.75rem",
          border: `1px solid ${colors.accent}30`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "1.1rem",
          border: `1px solid ${colors.accent}15`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: spacing.sectionGap, position: "relative", zIndex: 1 }}>
        {/* Ornamento top */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <span style={{ color: colors.accent, fontSize: "0.9rem" }}>🌿</span>
          <div style={{ height: "1px", width: "2.5rem", backgroundColor: colors.accent, opacity: 0.5 }} />
          <span style={{ color: colors.accent, fontSize: "0.9rem" }}>🌿</span>
        </div>

        <TemplateHeader
          project={project}
          design={design}
          lang={lang}
          align="center"
          headingStyle={{ fontSize: "2.4rem", fontWeight: 400, letterSpacing: "0.03em" }}
        >
          {restaurantInfo.tagline && (
            <p
              style={{
                fontFamily: fonts.heading,
                fontStyle: "italic",
                fontSize: "0.95rem",
                color: colors.accent,
                margin: "0.6rem 0 0",
                letterSpacing: "0.02em",
              }}
            >
              {restaurantInfo.tagline}
            </p>
          )}
          {branding?.welcomeMessage?.[lang] && (
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: "0.85rem",
                color: colors.text,
                opacity: 0.6,
                margin: "1rem auto 0",
                fontStyle: "italic",
                lineHeight: 1.7,
                maxWidth: "28rem",
              }}
            >
              {branding.welcomeMessage[lang]}
            </p>
          )}
        </TemplateHeader>

        {/* Ornamento bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1.5rem",
          }}
        >
          <div style={{ height: "1px", width: "4rem", backgroundColor: colors.accent, opacity: 0.4 }} />
          <div style={{ width: "5px", height: "5px", backgroundColor: colors.accent, borderRadius: "50%", opacity: 0.6 }} />
          <div style={{ height: "1px", width: "4rem", backgroundColor: colors.accent, opacity: 0.4 }} />
        </div>
      </header>

      {/* Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.sectionGap, position: "relative", zIndex: 1 }}>
        {visible.map((cat, idx) => {
          const items = cat.items
            .filter((i) => i.available)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          return (
            <section key={cat.id}>
              {/* Category name — estilo provenzal */}
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <h2
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    letterSpacing: "0.06em",
                    color: colors.accent,
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
                      color: colors.text,
                      opacity: 0.55,
                      margin: "0.3rem 0 0",
                    }}
                  >
                    {t(cat.description, lang)}
                  </p>
                )}
              </div>

              {/* Items — 2 columnas si caben */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: items.length >= 4 ? "1fr 1fr" : "1fr",
                  gap: `${spacing.itemGap} 2.5rem`,
                }}
              >
                {items.map((item) => (
                  <div key={item.id} style={{ paddingBottom: "0.5rem" }}>
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={t(item.name, lang)}
                        style={{
                          width: "100%",
                          height: "7rem",
                          objectFit: "cover",
                          borderRadius: "0.375rem",
                          marginBottom: "0.5rem",
                          border: `1px solid ${colors.accent}20`,
                        }}
                      />
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: fonts.heading,
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          color: colors.text,
                        }}
                      >
                        {t(item.name, lang)}
                      </span>
                      {layout.showPrices && (
                        <span
                          style={{
                            fontFamily: fonts.heading,
                            fontSize: "0.9rem",
                            color: colors.accent,
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {formatPrice(item.price, item.currency)}
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
                          lineHeight: 1.55,
                          fontStyle: "italic",
                        }}
                      >
                        {t(item.description, lang)}
                      </p>
                    )}

                    <AllergenBadges allergens={item.allergens.contains} marginTop="0.2rem" />
                  </div>
                ))}
              </div>

              {/* Separador floral */}
              {layout.showCategorySeparators && idx < visible.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginTop: spacing.sectionGap,
                  }}
                >
                  <div style={{ height: "1px", flex: 1, backgroundColor: colors.accent, opacity: 0.25 }} />
                  <span style={{ color: colors.accent, fontSize: "0.75rem" }}>🌿</span>
                  <div style={{ height: "1px", flex: 1, backgroundColor: colors.accent, opacity: 0.25 }} />
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Footer */}
      {(restaurantInfo.address || restaurantInfo.phone || restaurantInfo.website) && (
        <footer
          style={{
            textAlign: "center",
            marginTop: spacing.sectionGap,
            paddingTop: "1.25rem",
            borderTop: `1px solid ${colors.accent}30`,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2.5rem",
              fontSize: "0.72rem",
              color: colors.text,
              opacity: 0.45,
            }}
          >
            {restaurantInfo.address && <span>📍 {restaurantInfo.address}</span>}
            {restaurantInfo.phone && <span>📞 {restaurantInfo.phone}</span>}
            {restaurantInfo.website && <span>🌐 {restaurantInfo.website}</span>}
          </div>
        </footer>
      )}
    </BackgroundLayer>
  );
}
