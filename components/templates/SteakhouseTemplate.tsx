"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer, HeroSection, FooterSection, CategoryHeader } from "./shared";
import type { TemplateProps } from "./types";
import { resolveTypography } from "@/types/template";

// ── Design tokens ────────────────────────────────────────────────────────────

const GOLD    = "#c9a84c";
const COPPER  = "#b07d3a";
const NEAR_BLACK = "#0e0c0a";

// ── Primitives ───────────────────────────────────────────────────────────────

/** Full-width gold horizontal rule */
function GoldRule({ opacity = 0.35 }: { opacity?: number }) {
  return (
    <div
      style={{
        height: "1px",
        width: "100%",
        background: `linear-gradient(to right, transparent, ${GOLD} 20%, ${GOLD} 80%, transparent)`,
        opacity,
      }}
    />
  );
}


// ── Main component ───────────────────────────────────────────────────────────

export function SteakhouseTemplate({ project, categories, design, lang }: TemplateProps) {
  const { restaurantInfo, branding, hero } = project;
  const { colors, fonts, spacing, layout } = design;
  const typo = resolveTypography(design);

  const visible = categories
    .filter((c) => c.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const hasLogo = !!(branding?.showLogo && branding.logo);

  const showHero =
    design.capabilities.supportsHeroSection &&
    !!hero?.showHero &&
    (!!hero.heroImage || !!(hero.title?.[lang] || hero.title?.["es"]));

  return (
    <BackgroundLayer
      design={design}
      style={{ color: colors.text, fontFamily: fonts.body, minHeight: "100%" }}
    >

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      {showHero && (
        <HeroSection
          variant="cinematic-dark"
          logo={branding?.logo}
          logoAlt={restaurantInfo.name}
          title={t(hero?.title, lang) || restaurantInfo.name}
          subtitle={hero?.showSubtitle ? t(hero.subtitle, lang) : undefined}
          welcomeMessage={branding?.welcomeMessage?.[lang]}
          chefMessage={hero?.chefMessage?.[lang]}
          heroImage={hero?.heroImage}
          showLogo={hasLogo}
          showSubtitle={hero?.showSubtitle}
          showWelcomeMessage={!!(branding?.welcomeMessage?.[lang])}
          showChefMessage={!!(hero?.showChefMessage && hero?.chefMessage?.[lang])}
          accentColor={GOLD}
          headingFont={typo.titleFont}
          bodyFont={typo.bodyFont}
        />
      )}

      {/* ── HEADER (no hero) ──────────────────────────────────────────────── */}
      {!showHero && (
        <header
          style={{
            textAlign: "center",
            padding: "3.5rem 3.5rem 2.75rem",
            borderBottom: `1px solid ${GOLD}18`,
          }}
        >
          {/* Gold top accent bar */}
          <div
            style={{
              height: "2px",
              background: `linear-gradient(to right, transparent, ${GOLD} 30%, ${GOLD} 70%, transparent)`,
              marginBottom: "2.75rem",
              opacity: 0.6,
            }}
          />

          {/* Logo */}
          {hasLogo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={branding!.logo!}
              alt={restaurantInfo.name}
              style={{
                height: "6rem",
                objectFit: "contain",
                display: "block",
                margin: "0 auto 2rem",
                filter: `drop-shadow(0 0 16px ${GOLD}50)`,
              }}
            />
          )}

          {/* Stars */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ height: "1px", width: "2.5rem", background: `linear-gradient(to left, ${GOLD}80, transparent)` }} />
            <span style={{ color: GOLD, fontSize: "0.5rem", letterSpacing: "0.3em" }}>★ ★ ★</span>
            <div style={{ height: "1px", width: "2.5rem", background: `linear-gradient(to right, ${GOLD}80, transparent)` }} />
          </div>

          {/* Restaurant name */}
          {branding?.showRestaurantName !== false && (
            <h1
              style={{
                fontFamily: fonts.heading,
                fontSize: hasLogo ? "2rem" : "2.75rem",
                fontWeight: 700,
                color: colors.text,
                letterSpacing: "0.1em",
                margin: 0,
                lineHeight: 1.05,
                textTransform: "uppercase",
              }}
            >
              {restaurantInfo.name}
            </h1>
          )}

          {/* Gold underline */}
          <div
            style={{
              height: "1.5px",
              background: `linear-gradient(to right, transparent, ${GOLD} 25%, ${GOLD} 75%, transparent)`,
              margin: "1.25rem auto",
              maxWidth: "12rem",
              opacity: 0.55,
            }}
          />

          {/* Tagline */}
          {restaurantInfo.tagline && (
            <p
              style={{
                fontFamily: fonts.body,
                fontStyle: "italic",
                fontSize: "0.82rem",
                color: GOLD,
                opacity: 0.65,
                margin: 0,
                letterSpacing: "0.06em",
              }}
            >
              {restaurantInfo.tagline}
            </p>
          )}

          {/* Bottom gold bar */}
          <div
            style={{
              height: "1px",
              background: `linear-gradient(to right, transparent, ${GOLD} 30%, ${GOLD} 70%, transparent)`,
              marginTop: "2.5rem",
              opacity: 0.25,
            }}
          />
        </header>
      )}


      {/* ── Categories ────────────────────────────────────────────────────── */}
      <div style={{ padding: "2.5rem 3.5rem 4rem", display: "flex", flexDirection: "column", gap: spacing.sectionGap }}>
        {visible.map((cat, catIdx) => {
          const items = cat.items
            .filter((i) => i.available)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          if (items.length === 0) return null;

          return (
            <section key={cat.id}>

              {/* ── Category heading ──────────────────────────────────── */}
              <CategoryHeader
                styleVariant="elegant"
                title={t(cat.name, lang)}
                description={layout.showDescriptions ? t(cat.description, lang) || undefined : undefined}
                accentColor={GOLD}
                textColor="#f0ede8"
                headingFont={typo.categoryFont}
                bodyFont={typo.bodyFont}
              />

              {/* ── Items ──────────────────────────────────────────────── */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {items.map((item, itemIdx) => {
                  const hasImage = !!item.image;
                  const isLast = itemIdx === items.length - 1;

                  return (
                    <div key={item.id}>
                      {hasImage ? (
                        /* ── Image row ── */
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "1.25rem",
                            padding: "1rem 0",
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem" }}>
                              <span style={{ fontFamily: fonts.heading, fontSize: "1.05rem", fontWeight: item.featured ? 700 : 600, color: item.featured ? "#fff" : colors.text, letterSpacing: "0.02em", lineHeight: 1.2 }}>
                                {item.featured && <span style={{ color: GOLD, fontSize: "0.5rem", marginRight: "0.3rem", opacity: 0.85 }}>★</span>}
                                {t(item.name, lang)}
                              </span>
                              {layout.showPrices && (
                                <span style={{ fontFamily: typo.priceFont, fontSize: "1rem", fontWeight: 600, color: GOLD, flexShrink: 0, letterSpacing: "0.03em" }}>
                                  {formatPrice(item.price, item.currency)}
                                </span>
                              )}
                            </div>
                            {layout.showDescriptions && item.description[lang] && (
                              <p style={{ fontFamily: fonts.body, fontStyle: "italic", fontSize: "0.77rem", color: colors.text, opacity: 0.38, margin: "0.28rem 0 0", lineHeight: 1.65 }}>
                                {t(item.description, lang)}
                              </p>
                            )}
                            <AllergenBadges allergens={item.allergens.contains} fontSize="0.6rem" opacity={0.4} marginTop="0.25rem" />
                          </div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image!} alt={t(item.name, lang)} style={{ width: "4.5rem", height: "4.5rem", objectFit: "cover", flexShrink: 0, border: `1px solid ${GOLD}25`, filter: "brightness(0.9) saturate(0.85)" }} />
                        </div>
                      ) : (
                        /* ── List row: grid for perfect name↔price alignment ── */
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            columnGap: "1.5rem",
                            alignItems: "baseline",
                            padding: "1rem 0",
                          }}
                        >
                          {/* Name */}
                          <div style={{ display: "flex", alignItems: "baseline", gap: "0.45rem", minWidth: 0 }}>
                            {item.featured && (
                              <span style={{ color: GOLD, fontSize: "0.5rem", flexShrink: 0, opacity: 0.85, letterSpacing: "0.05em" }}>★</span>
                            )}
                            <span
                              style={{
                                fontFamily: fonts.heading,
                                fontSize: "1.05rem",
                                fontWeight: item.featured ? 700 : 600,
                                color: item.featured ? "#fff" : colors.text,
                                letterSpacing: "0.025em",
                                lineHeight: 1.25,
                              }}
                            >
                              {t(item.name, lang)}
                            </span>
                          </div>

                          {/* Price — right-aligned, perfectly in line with name */}
                          {layout.showPrices ? (
                            <span
                              style={{
                                fontFamily: typo.priceFont,
                                fontSize: "1rem",
                                fontWeight: 600,
                                color: GOLD,
                                letterSpacing: "0.04em",
                                whiteSpace: "nowrap",
                                textAlign: "right",
                              }}
                            >
                              {formatPrice(item.price, item.currency)}
                            </span>
                          ) : (
                            <span />
                          )}

                          {/* Description — spans full width */}
                          {layout.showDescriptions && item.description[lang] && (
                            <p
                              style={{
                                gridColumn: "1 / -1",
                                fontFamily: fonts.body,
                                fontStyle: "italic",
                                fontSize: "0.77rem",
                                color: colors.text,
                                opacity: 0.38,
                                margin: "0.28rem 0 0",
                                lineHeight: 1.65,
                              }}
                            >
                              {t(item.description, lang)}
                            </p>
                          )}

                          {/* Allergens */}
                          <div style={{ gridColumn: "1 / -1" }}>
                            <AllergenBadges allergens={item.allergens.contains} fontSize="0.6rem" opacity={0.4} marginTop="0.25rem" />
                          </div>
                        </div>
                      )}

                      {/* Separator */}
                      {!isLast && (
                        <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}18 20%, ${GOLD}10 80%, transparent)` }} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Between-category divider */}
              {catIdx < visible.length - 1 && (
                <div style={{ marginTop: spacing.sectionGap, display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}25)` }} />
                  <span style={{ color: GOLD, fontSize: "0.45rem", opacity: 0.5, letterSpacing: "0.4em" }}>★ ★ ★</span>
                  <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${GOLD}25)` }} />
                </div>
              )}

            </section>
          );
        })}
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <FooterSection
        restaurantInfo={restaurantInfo}
        variant="steakhouse"
        accentColor={GOLD}
        textColor={colors.text}
        font={fonts.body}
      />

    </BackgroundLayer>
  );
}
