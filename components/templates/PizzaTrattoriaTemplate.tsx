"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer, CategoryHeader, HeroSection } from "./shared";
import type { TemplateProps } from "./types";
import { resolveTypography } from "@/types/template";

// ── Design tokens ────────────────────────────────────────────────────────────

const GOLD   = "#b8924a";
const CREAM  = "#fdf6ed";
const RED    = "#8b1a1a";

// ── Ornamental primitives ────────────────────────────────────────────────────


/** Ornamental diamond divider between categories */
function SectionDivider({ accent }: { accent: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "0.25rem 0",
      }}
    >
      <div style={{ height: "0.5px", flex: 1, backgroundColor: accent, opacity: 0.15 }} />
      <span style={{ color: accent, fontSize: "0.45rem", opacity: 0.5, letterSpacing: "0.3em" }}>◆ ◆ ◆</span>
      <div style={{ height: "0.5px", flex: 1, backgroundColor: accent, opacity: 0.15 }} />
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function PizzaTrattoriaTemplate({ project, categories, design, lang }: TemplateProps) {
  const { restaurantInfo, branding, hero } = project;
  const { colors, fonts, spacing, layout } = design;
  const typo = resolveTypography(design);

  const visible = categories
    .filter((c) => c.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const showHero =
    design.capabilities.supportsHeroSection &&
    !!hero?.showHero &&
    (!!hero.heroImage || !!(hero.title?.[lang] || hero.title?.["es"]));

  const hasLogo = !!(branding?.showLogo && branding.logo);

  return (
    <BackgroundLayer
      design={design}
      style={{ color: colors.text, fontFamily: fonts.body, minHeight: "100%" }}
    >
      {/* ── Decorative frame (printed-menu look) ────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0.85rem",
          border: `1px solid ${RED}22`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "1.2rem",
          border: `0.5px solid ${RED}12`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO + HEADER (shared component handles both cases) ──────── */}
        <HeroSection
          variant="italian-warm"
          logo={branding?.logo}
          logoAlt={restaurantInfo.name}
          title={
            (showHero && t(hero?.title, lang))
              ? t(hero!.title, lang)
              : restaurantInfo.name
          }
          subtitle={restaurantInfo.tagline}
          welcomeMessage={branding?.welcomeMessage?.[lang]}
          chefMessage={hero?.chefMessage?.[lang]}
          heroImage={showHero ? hero?.heroImage : undefined}
          showLogo={hasLogo}
          showSubtitle={true}
          showWelcomeMessage={!!(branding?.welcomeMessage?.[lang])}
          showChefMessage={!!(hero?.showChefMessage && hero.chefMessage?.[lang])}
          accentColor={RED}
          headingFont={typo.titleFont}
          bodyFont={typo.bodyFont}
        />

        {/* ── Categories ────────────────────────────────────────────────── */}
        <div
          style={{
            padding: "1rem 3.5rem 4rem",
            display: "flex",
            flexDirection: "column",
            gap: spacing.sectionGap,
          }}
        >
          {visible.map((cat, idx) => {
            const items = cat.items
              .filter((i) => i.available)
              .sort((a, b) => a.sortOrder - b.sortOrder);

            if (items.length === 0) return null;

            const hasImages = items.some((i) => !!i.image);

            return (
              <section key={cat.id}>

                {/* ── Category heading ──────────────────────────────── */}
                <CategoryHeader
                  styleVariant="italian"
                  title={t(cat.name, lang)}
                  description={layout.showDescriptions ? t(cat.description, lang) || undefined : undefined}
                  accentColor={colors.accent}
                  textColor={colors.text}
                  headingFont={typo.categoryFont}
                  bodyFont={typo.bodyFont}
                />

                {/* ── Items ─────────────────────────────────────────── */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {items.map((item, itemIdx) => {
                    const hasItemImage = !!item.image;
                    const isLast = itemIdx === items.length - 1;

                    return (
                      <div key={item.id}>

                        {hasItemImage ? (
                          /* ── Image row: thumbnail left, text+price right ── */
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              alignItems: "flex-start",
                              padding: "1rem 0",
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image!}
                              alt={t(item.name, lang)}
                              style={{
                                width: "4.25rem",
                                height: "4.25rem",
                                objectFit: "cover",
                                borderRadius: "3px",
                                border: `1px solid ${RED}12`,
                                flexShrink: 0,
                              }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem" }}>
                                <span
                                  style={{
                                    fontFamily: fonts.heading,
                                    fontSize: "1rem",
                                    fontWeight: item.featured ? 600 : 500,
                                    color: colors.text,
                                    letterSpacing: "0.02em",
                                    lineHeight: 1.25,
                                  }}
                                >
                                  {item.featured && (
                                    <span style={{ color: RED, fontSize: "0.4rem", marginRight: "0.3rem", verticalAlign: "middle" }}>◆</span>
                                  )}
                                  {t(item.name, lang)}
                                </span>
                                {layout.showPrices && (
                                  <span
                                    style={{
                                      fontFamily: typo.priceFont,
                                      fontSize: "0.92rem",
                                      fontWeight: 600,
                                      color: GOLD,
                                      flexShrink: 0,
                                      letterSpacing: "0.03em",
                                    }}
                                  >
                                    {formatPrice(item.price, item.currency)}
                                  </span>
                                )}
                              </div>
                              {layout.showDescriptions && item.description[lang] && (
                                <p
                                  style={{
                                    fontFamily: fonts.body,
                                    fontStyle: "italic",
                                    fontSize: "0.76rem",
                                    color: colors.text,
                                    opacity: 0.46,
                                    margin: "0.25rem 0 0",
                                    lineHeight: 1.6,
                                  }}
                                >
                                  {t(item.description, lang)}
                                </p>
                              )}
                              <AllergenBadges allergens={item.allergens.contains} fontSize="0.58rem" opacity={0.5} marginTop="0.2rem" />
                            </div>
                          </div>
                        ) : (
                          /* ── List row: grid ensures perfect name↔price alignment ── */
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr auto",
                              columnGap: "1.5rem",
                              alignItems: "baseline",
                              padding: "0.95rem 0",
                            }}
                          >
                            {/* Col 1 row 1: name */}
                            <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem", minWidth: 0 }}>
                              {item.featured && (
                                <span
                                  style={{
                                    color: RED,
                                    fontSize: "0.38rem",
                                    flexShrink: 0,
                                    position: "relative",
                                    top: "-0.1em",
                                    opacity: 0.85,
                                  }}
                                >
                                  ◆
                                </span>
                              )}
                              <span
                                style={{
                                  fontFamily: fonts.heading,
                                  fontSize: "1.02rem",
                                  fontWeight: item.featured ? 600 : 500,
                                  color: item.featured ? colors.text : `${colors.text}ee`,
                                  letterSpacing: "0.025em",
                                  lineHeight: 1.25,
                                }}
                              >
                                {t(item.name, lang)}
                              </span>
                            </div>

                            {/* Col 2 row 1: price — perfectly right-aligned */}
                            {layout.showPrices ? (
                              <span
                                style={{
                                  fontFamily: typo.priceFont,
                                  fontSize: "0.92rem",
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

                            {/* Col 1+2 row 2: description */}
                            {layout.showDescriptions && item.description[lang] && (
                              <p
                                style={{
                                  gridColumn: "1 / -1",
                                  fontFamily: fonts.body,
                                  fontStyle: "italic",
                                  fontSize: "0.77rem",
                                  color: colors.text,
                                  opacity: 0.46,
                                  margin: "0.18rem 0 0",
                                  lineHeight: 1.65,
                                }}
                              >
                                {t(item.description, lang)}
                              </p>
                            )}

                            {/* Col 1+2 row 3: allergens */}
                            <div style={{ gridColumn: "1 / -1" }}>
                              <AllergenBadges allergens={item.allergens.contains} fontSize="0.58rem" opacity={0.5} />
                            </div>
                          </div>
                        )}

                        {/* Separator — hairline with generous vertical margin */}
                        {!isLast && (
                          <div
                            style={{
                              height: "1px",
                              background: `linear-gradient(to right, transparent, ${RED}14 20%, ${RED}14 80%, transparent)`,
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* ── Between-category separator ─────────────────────── */}
                {idx < visible.length - 1 && (
                  <div style={{ marginTop: spacing.sectionGap }}>
                    <SectionDivider accent={colors.accent} />
                  </div>
                )}

              </section>
            );
          })}
        </div>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        {(restaurantInfo.address || restaurantInfo.phone || restaurantInfo.website ||
          restaurantInfo.socialLinks?.instagram) && (
          <footer
            style={{
              borderTop: `1px solid ${RED}18`,
              padding: "2rem 3.5rem 3rem",
              textAlign: "center",
            }}
          >
            {/* Ornamental topper */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ height: "1px", width: "2.5rem", backgroundColor: RED, opacity: 0.2 }} />
              <span style={{ color: RED, opacity: 0.4, fontSize: "0.45rem", letterSpacing: "0.15em" }}>◆ ◆ ◆</span>
              <div style={{ height: "1px", width: "2.5rem", backgroundColor: RED, opacity: 0.2 }} />
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.35rem 0.1rem",
                fontSize: "0.7rem",
                color: colors.text,
                opacity: 0.45,
                letterSpacing: "0.02em",
              }}
            >
              {restaurantInfo.address && (
                <span>{restaurantInfo.address}</span>
              )}
              {restaurantInfo.address && (restaurantInfo.phone || restaurantInfo.website) && (
                <span style={{ opacity: 0.4, marginLeft: "0.5rem", marginRight: "0.5rem" }}>·</span>
              )}
              {restaurantInfo.phone && (
                <span>{restaurantInfo.phone}</span>
              )}
              {restaurantInfo.phone && restaurantInfo.website && (
                <span style={{ opacity: 0.4, marginLeft: "0.5rem", marginRight: "0.5rem" }}>·</span>
              )}
              {restaurantInfo.website && (
                <span>{restaurantInfo.website}</span>
              )}
              {restaurantInfo.socialLinks?.instagram && (
                <>
                  <span style={{ opacity: 0.4, marginLeft: "0.5rem", marginRight: "0.5rem" }}>·</span>
                  <span style={{ color: RED, opacity: 0.55, fontStyle: "italic" }}>
                    {restaurantInfo.socialLinks.instagram}
                  </span>
                </>
              )}
            </div>
          </footer>
        )}

      </div>
    </BackgroundLayer>
  );
}
