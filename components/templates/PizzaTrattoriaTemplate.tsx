"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer, HeroSection } from "./shared";
import type { TemplateProps } from "./types";
import { resolveTypography } from "@/types/template";

// ── Palette ──────────────────────────────────────────────────────────────────

const RED  = "#8b1a1a";   // Italian vermillion
const GOLD = "#c9a96e";   // aged manuscript gold
const INK  = "#2c1206";   // deep espresso

// ── Ornamental "Il Menù" transition ──────────────────────────────────────────
// Bridges the hero cover and the menu body — like a chapter title in an Italian
// carta. Two hairline rules flank a small-caps label.

function MenuOpening({ bodyFont }: { bodyFont: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.1rem",
        padding: "2.5rem 4rem 0",
      }}
    >
      <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to right, transparent, ${RED}30)` }} />
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: "0.48rem",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: RED,
          opacity: 0.5,
          whiteSpace: "nowrap",
        }}
      >
        Il Menù
      </span>
      <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to left, transparent, ${RED}30)` }} />
    </div>
  );
}

// ── Between-section ornamental divider ───────────────────────────────────────

function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.9rem",
        margin: "0.5rem 0",
      }}
    >
      <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to right, transparent, ${RED}30)` }} />
      <span style={{ color: RED, opacity: 0.38, fontSize: "0.44rem", letterSpacing: "0.6em", lineHeight: 1 }}>
        ✦ ✦ ✦
      </span>
      <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to left, transparent, ${RED}30)` }} />
    </div>
  );
}

// ── Category block ────────────────────────────────────────────────────────────

function CategoryBlock({
  label,
  title,
  description,
  headingFont,
  bodyFont,
}: {
  label: string;
  title: string;
  description?: string;
  headingFont: string;
  bodyFont: string;
}) {
  return (
    <div style={{ textAlign: "center", padding: "2.75rem 0 1.5rem" }}>

      {/* Top rule with fleuron */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.6rem" }}>
        <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to right, transparent, ${RED}28)` }} />
        <span style={{ color: RED, fontSize: "0.44rem", opacity: 0.42, letterSpacing: "0.2em" }}>✦</span>
        <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to left, transparent, ${RED}28)` }} />
      </div>

      {/* Section label — micro small-caps */}
      <p
        style={{
          fontFamily: bodyFont,
          fontSize: "0.5rem",
          fontWeight: 700,
          letterSpacing: "0.48em",
          textTransform: "uppercase",
          color: RED,
          opacity: 0.6,
          margin: "0 0 0.55rem",
          lineHeight: 1,
        }}
      >
        {label}
      </p>

      {/* Category name — large italic serif, the protagonist */}
      <h2
        style={{
          fontFamily: headingFont,
          fontSize: "3rem",
          fontWeight: 300,
          fontStyle: "italic",
          color: INK,
          margin: 0,
          lineHeight: 1,
          letterSpacing: "-0.015em",
        }}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          style={{
            fontFamily: bodyFont,
            fontSize: "0.73rem",
            fontStyle: "italic",
            color: INK,
            opacity: 0.4,
            margin: "0.7rem 0 0",
            lineHeight: 1.65,
            letterSpacing: "0.01em",
          }}
        >
          {description}
        </p>
      )}

      {/* Bottom micro-ornament */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.4rem",
          marginTop: "1.4rem",
        }}
      >
        <div style={{ width: "2.2rem", height: "0.5px", background: `linear-gradient(to right, transparent, ${RED}25)` }} />
        <span style={{ color: RED, fontSize: "0.3rem", opacity: 0.35 }}>◆</span>
        <div style={{ width: "2.2rem", height: "0.5px", background: `linear-gradient(to left, transparent, ${RED}25)` }} />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

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
      style={{ color: INK, fontFamily: fonts.body, minHeight: "100%" }}
    >
      {/* ── Decorative frame — slightly more present ─────────────────────── */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: "0.9rem", border: `1px solid ${RED}35`, pointerEvents: "none", zIndex: 0 }}
      />
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: "1.3rem", border: `0.5px solid ${RED}1a`, pointerEvents: "none", zIndex: 0 }}
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Hero cover ───────────────────────────────────────────────── */}
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

        {/* ── "Il Menù" — transition from cover to body ────────────────── */}
        <MenuOpening bodyFont={typo.bodyFont} />

        {/* ── Categories ───────────────────────────────────────────────── */}
        <div
          style={{
            padding: "0 4rem 5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {visible.map((cat, idx) => {
            const items = cat.items
              .filter((i) => i.available)
              .sort((a, b) => a.sortOrder - b.sortOrder);

            if (items.length === 0) return null;

            const catLabel = t(cat.name, lang)?.toUpperCase() ?? "";
            const catDescription = layout.showDescriptions
              ? t(cat.description, lang) || undefined
              : undefined;

            return (
              <section key={cat.id}>

                {/* ── Category heading ──────────────────────────────── */}
                <CategoryBlock
                  label={catLabel}
                  title={t(cat.name, lang)}
                  description={catDescription}
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
                          /* ── Thumbnail row ───────────────────────── */
                          <div
                            style={{
                              display: "flex",
                              gap: "1.15rem",
                              alignItems: "flex-start",
                              padding: "1.25rem 0",
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image!}
                              alt={t(item.name, lang)}
                              style={{
                                width: "4.5rem",
                                height: "4.5rem",
                                objectFit: "cover",
                                borderRadius: "2px",
                                border: `1px solid ${RED}16`,
                                flexShrink: 0,
                                filter: "saturate(0.88) brightness(0.96)",
                              }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr auto",
                                  columnGap: "1.5rem",
                                  alignItems: "baseline",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: typo.categoryFont,
                                    fontSize: "1.15rem",
                                    fontWeight: item.featured ? 500 : 400,
                                    color: INK,
                                    letterSpacing: "0.015em",
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {item.featured && (
                                    <span style={{ color: RED, fontSize: "0.32rem", marginRight: "0.35rem", opacity: 0.6, verticalAlign: "middle" }}>✦</span>
                                  )}
                                  {t(item.name, lang)}
                                </span>
                                {layout.showPrices && (
                                  <span
                                    style={{
                                      fontFamily: typo.priceFont,
                                      fontSize: "0.92rem",
                                      fontWeight: 500,
                                      fontStyle: "italic",
                                      color: GOLD,
                                      whiteSpace: "nowrap",
                                      letterSpacing: "0.02em",
                                    }}
                                  >
                                    {formatPrice(item.price, item.currency)}
                                  </span>
                                )}
                              </div>
                              {layout.showDescriptions && item.description[lang] && (
                                <p
                                  style={{
                                    fontFamily: typo.bodyFont,
                                    fontStyle: "italic",
                                    fontSize: "0.8rem",
                                    color: INK,
                                    opacity: 0.5,
                                    margin: "0.3rem 0 0",
                                    lineHeight: 1.72,
                                  }}
                                >
                                  {t(item.description, lang)}
                                </p>
                              )}
                              <AllergenBadges allergens={item.allergens.contains} fontSize="0.56rem" opacity={0.38} marginTop="0.22rem" />
                            </div>
                          </div>
                        ) : (
                          /* ── List row ─────────────────────────────── */
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr auto",
                              columnGap: "1.5rem",
                              alignItems: "baseline",
                              padding: "1.25rem 0",
                            }}
                          >
                            {/* Name */}
                            <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", minWidth: 0 }}>
                              {item.featured && (
                                <span
                                  style={{
                                    color: RED,
                                    fontSize: "0.32rem",
                                    flexShrink: 0,
                                    opacity: 0.6,
                                    position: "relative",
                                    top: "-0.1em",
                                    lineHeight: 1,
                                  }}
                                >
                                  ✦
                                </span>
                              )}
                              <span
                                style={{
                                  fontFamily: typo.categoryFont,
                                  fontSize: "1.15rem",
                                  fontWeight: item.featured ? 500 : 400,
                                  color: item.featured ? INK : `${INK}e8`,
                                  letterSpacing: "0.015em",
                                  lineHeight: 1.2,
                                }}
                              >
                                {t(item.name, lang)}
                              </span>
                            </div>

                            {/* Price — subordinate, italic, gold */}
                            {layout.showPrices ? (
                              <span
                                style={{
                                  fontFamily: typo.priceFont,
                                  fontSize: "0.92rem",
                                  fontWeight: 500,
                                  fontStyle: "italic",
                                  color: GOLD,
                                  letterSpacing: "0.02em",
                                  whiteSpace: "nowrap",
                                  textAlign: "right",
                                }}
                              >
                                {formatPrice(item.price, item.currency)}
                              </span>
                            ) : (
                              <span />
                            )}

                            {/* Description */}
                            {layout.showDescriptions && item.description[lang] && (
                              <p
                                style={{
                                  gridColumn: "1 / -1",
                                  fontFamily: typo.bodyFont,
                                  fontStyle: "italic",
                                  fontSize: "0.8rem",
                                  color: INK,
                                  opacity: 0.5,
                                  margin: "0.25rem 0 0",
                                  lineHeight: 1.72,
                                  letterSpacing: "0.005em",
                                }}
                              >
                                {t(item.description, lang)}
                              </p>
                            )}

                            {/* Allergens */}
                            <div style={{ gridColumn: "1 / -1" }}>
                              <AllergenBadges allergens={item.allergens.contains} fontSize="0.56rem" opacity={0.38} />
                            </div>
                          </div>
                        )}

                        {/* Item separator — visible but delicate */}
                        {!isLast && (
                          <div
                            style={{
                              height: "1px",
                              background: `linear-gradient(to right, transparent, ${RED}1e 20%, ${RED}18 80%, transparent)`,
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* ── Between-category ornamental divider ───────────── */}
                {idx < visible.length - 1 && (
                  <div style={{ padding: `${spacing.sectionGap} 0 0` }}>
                    <SectionDivider />
                  </div>
                )}

              </section>
            );
          })}
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        {(restaurantInfo.address || restaurantInfo.phone || restaurantInfo.website ||
          restaurantInfo.socialLinks?.instagram) && (
          <footer
            style={{
              borderTop: `1px solid ${RED}18`,
              padding: "2.5rem 4rem 4rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.85rem",
                marginBottom: "1.75rem",
              }}
            >
              <div style={{ height: "0.5px", width: "2.5rem", background: `linear-gradient(to right, transparent, ${RED}28)` }} />
              <span style={{ color: RED, opacity: 0.3, fontSize: "0.4rem", letterSpacing: "0.5em" }}>✦ ✦ ✦</span>
              <div style={{ height: "0.5px", width: "2.5rem", background: `linear-gradient(to left, transparent, ${RED}28)` }} />
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0 0.15rem",
                fontFamily: typo.bodyFont,
                fontSize: "0.7rem",
                fontStyle: "italic",
                color: INK,
                opacity: 0.38,
                letterSpacing: "0.025em",
                lineHeight: 1.9,
              }}
            >
              {restaurantInfo.address && <span>{restaurantInfo.address}</span>}
              {restaurantInfo.address && (restaurantInfo.phone || restaurantInfo.website) && (
                <span style={{ margin: "0 0.55rem", opacity: 0.45 }}>·</span>
              )}
              {restaurantInfo.phone && <span>{restaurantInfo.phone}</span>}
              {restaurantInfo.phone && restaurantInfo.website && (
                <span style={{ margin: "0 0.55rem", opacity: 0.45 }}>·</span>
              )}
              {restaurantInfo.website && <span>{restaurantInfo.website}</span>}
              {restaurantInfo.socialLinks?.instagram && (
                <>
                  <span style={{ margin: "0 0.55rem", opacity: 0.45 }}>·</span>
                  <span style={{ color: RED, opacity: 0.48 }}>{restaurantInfo.socialLinks.instagram}</span>
                </>
              )}
            </div>
          </footer>
        )}

      </div>
    </BackgroundLayer>
  );
}
