"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, TemplateHeader } from "./shared";
import type { TemplateProps } from "./types";

export function MinimalTemplate({ project, categories, design, lang }: TemplateProps) {
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
        padding: "3rem 3.5rem",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: spacing.sectionGap }}>
        <TemplateHeader
          project={project}
          design={design}
          lang={lang}
          style={{ marginBottom: "0.75rem" }}
          align="left"
          headingStyle={{ fontSize: "2rem", fontWeight: 300, letterSpacing: "0.05em" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.4rem" }}>
            {restaurantInfo.tagline && (
              <p
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: colors.accent,
                  margin: 0,
                }}
              >
                {restaurantInfo.tagline}
              </p>
            )}
            {branding?.welcomeMessage?.[lang] && (
              <p
                style={{
                  fontSize: "0.875rem",
                  color: colors.text,
                  opacity: 0.55,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                {branding.welcomeMessage[lang]}
              </p>
            )}
          </div>
        </TemplateHeader>
        <div
          style={{
            width: "2rem",
            height: "1px",
            backgroundColor: colors.accent,
            marginTop: "1rem",
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
              {/* Category name */}
              <h2
                style={{
                  fontFamily: fonts.heading,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: colors.accent,
                  marginBottom: "1.25rem",
                  margin: "0 0 1.25rem",
                }}
              >
                {t(cat.name, lang)}
              </h2>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.itemGap }}>
                {items.map((item) => (
                  <div key={item.id}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.9rem", fontWeight: 400 }}>
                        {t(item.name, lang)}
                      </span>
                      <span
                        style={{
                          flex: 1,
                          borderBottom: "1px dotted",
                          borderColor: `${colors.text}25`,
                          marginBottom: "0.2rem",
                        }}
                      />
                      {layout.showPrices && (
                        <span
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 400,
                            whiteSpace: "nowrap",
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
                          lineHeight: 1.5,
                        }}
                      >
                        {t(item.description, lang)}
                      </p>
                    )}

                    <AllergenBadges allergens={item.allergens.contains} fontSize="0.7rem" />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Footer */}
      {(restaurantInfo.address || restaurantInfo.phone) && (
        <footer
          style={{
            marginTop: spacing.sectionGap,
            paddingTop: "1.5rem",
            borderTop: `1px solid ${colors.text}15`,
            fontSize: "0.7rem",
            opacity: 0.45,
            display: "flex",
            gap: "2rem",
          }}
        >
          {restaurantInfo.address && <span>{restaurantInfo.address}</span>}
          {restaurantInfo.phone && <span>{restaurantInfo.phone}</span>}
        </footer>
      )}
    </div>
  );
}
