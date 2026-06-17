"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer, HeroSection, FooterSection, CategoryHeader } from "./shared";
import type { TemplateProps } from "./types";
import type { MenuItem } from "@/types/menu";
import { resolveTypography } from "@/types/template";

// ── Design tokens ────────────────────────────────────────────────────────────

const TEAL = "#0a9396";
const DEEP = "#1c2e2e";

/** Small tilde wave separator between categories */
function WaveDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        justifyContent: "center",
      }}
    >
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${TEAL}30)` }} />
      <span
        style={{
          color: TEAL,
          fontSize: "0.9rem",
          opacity: 0.4,
          letterSpacing: "0.4em",
          fontFamily: "Georgia, serif",
          lineHeight: 1,
        }}
      >
        ∿ ∿ ∿
      </span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${TEAL}30)` }} />
    </div>
  );
}


// ── Item card (with image) ───────────────────────────────────────────────────

function ItemCard({
  item,
  lang,
  typo,
  showDescription,
  showPrice,
}: {
  item: MenuItem;
  lang: string;
  typo: { titleFont: string; bodyFont: string; priceFont: string };
  showDescription: boolean;
  showPrice: boolean;
}) {
  const hasImage = !!item.image;

  return (
    <div
      style={{
        background: hasImage ? "#fff" : "transparent",
        border: hasImage ? `1px solid ${TEAL}18` : `1px solid ${TEAL}10`,
        borderRadius: hasImage ? "12px" : "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hasImage ? `0 2px 16px ${TEAL}10, 0 1px 4px rgba(0,0,0,0.04)` : "none",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Image — full width, 16:9-ish ratio */}
      {hasImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image!}
          alt={t(item.name, lang)}
          style={{
            width: "100%",
            height: "9rem",
            objectFit: "cover",
            display: "block",
            flexShrink: 0,
          }}
        />
      )}

      {/* Text */}
      <div style={{ padding: hasImage ? "0.9rem" : "0.6rem 0.75rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem" }}>
          <span
            style={{
              fontFamily: typo.titleFont,
              fontSize: "1rem",
              fontWeight: item.featured ? 600 : 400,
              color: item.featured ? TEAL : DEEP,
              letterSpacing: "0.01em",
              lineHeight: 1.2,
              flex: 1,
            }}
          >
            {item.featured && (
              <span style={{ color: TEAL, marginRight: "0.3rem", fontSize: "0.65rem", verticalAlign: "middle" }}>◈</span>
            )}
            {t(item.name, lang)}
          </span>
          {showPrice && (
            <span
              style={{
                fontFamily: typo.priceFont,
                fontSize: "0.9rem",
                fontWeight: 600,
                color: TEAL,
                flexShrink: 0,
                letterSpacing: "0.02em",
              }}
            >
              {formatPrice(item.price, item.currency)}
            </span>
          )}
        </div>

        {showDescription && item.description[lang] && (
          <p
            style={{
              fontFamily: typo.bodyFont,
              fontSize: "0.71rem",
              color: DEEP,
              opacity: 0.5,
              margin: 0,
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            {t(item.description, lang)}
          </p>
        )}

        <AllergenBadges allergens={item.allergens.contains} fontSize="0.6rem" opacity={0.35} marginTop="0.1rem" />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function BeachClubTemplate({ project, categories, design, lang }: TemplateProps) {
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
      style={{ color: colors.text, fontFamily: typo.bodyFont, minHeight: "100%" }}
    >

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      {showHero && (
        <HeroSection
          variant="mediterranean-light"
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
          accentColor={TEAL}
          headingFont={typo.titleFont}
          bodyFont={typo.bodyFont}
        />
      )}

      {/* ── HEADER (no hero) ──────────────────────────────────────────────── */}
      {!showHero && (
        <header
          style={{
            padding: "3.5rem 3.5rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {/* Thin teal top accent */}
          <div style={{ width: "3rem", height: "2px", backgroundColor: TEAL, opacity: 0.5, borderRadius: "1px" }} />

          {hasLogo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={branding!.logo!}
              alt={restaurantInfo.name}
              style={{
                height: "5rem",
                objectFit: "contain",
                marginBottom: "0.5rem",
              }}
            />
          )}

          {branding?.showRestaurantName !== false && (
            <h1
              style={{
                fontFamily: typo.titleFont,
                fontSize: hasLogo ? "2.25rem" : "3rem",
                fontWeight: 300,
                color: DEEP,
                letterSpacing: "0.08em",
                margin: 0,
                lineHeight: 1,
                textAlign: "center",
              }}
            >
              {restaurantInfo.name}
            </h1>
          )}

          {restaurantInfo.tagline && (
            <p
              style={{
                fontFamily: typo.bodyFont,
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: TEAL,
                margin: 0,
                opacity: 0.75,
              }}
            >
              {restaurantInfo.tagline}
            </p>
          )}

          <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.75rem", width: "100%" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: TEAL, opacity: 0.12 }} />
            <span style={{ color: TEAL, fontSize: "0.5rem", opacity: 0.5, letterSpacing: "0.3em" }}>◈ ◈ ◈</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: TEAL, opacity: 0.12 }} />
          </div>
        </header>
      )}


      {/* ── Categories ────────────────────────────────────────────────────── */}
      <div style={{ padding: "2.5rem 3rem 4rem", display: "flex", flexDirection: "column", gap: spacing.sectionGap }}>
        {visible.map((cat, catIdx) => {
          const items = cat.items
            .filter((i) => i.available)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          if (items.length === 0) return null;

          const anyHasImage = items.some((i) => i.image);

          return (
            <section key={cat.id}>

              {/* ── Category heading ──────────────────────────────────── */}
              <CategoryHeader
                styleVariant="minimal"
                title={t(cat.name, lang)}
                description={layout.showDescriptions ? t(cat.description, lang) || undefined : undefined}
                accentColor={TEAL}
                textColor={DEEP}
                headingFont={typo.categoryFont}
                bodyFont={typo.bodyFont}
              />

              {/* ── Items ────────────────────────────────────────────────── */}
              {anyHasImage ? (
                /* Card grid when images are present */
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1rem",
                  }}
                >
                  {items.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      lang={lang}
                      typo={typo}
                      showDescription={layout.showDescriptions}
                      showPrice={layout.showPrices}
                    />
                  ))}
                </div>
              ) : (
                /* Clean list — grid for perfect name↔price alignment */
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {items.map((item, itemIdx) => {
                    const isLast = itemIdx === items.length - 1;
                    return (
                      <div key={item.id}>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            columnGap: "1.5rem",
                            alignItems: "baseline",
                            padding: "0.95rem 0",
                          }}
                        >
                          {/* Name */}
                          <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem", minWidth: 0 }}>
                            {item.featured && (
                              <span style={{ color: TEAL, fontSize: "0.5rem", flexShrink: 0, opacity: 0.85 }}>◈</span>
                            )}
                            <span
                              style={{
                                fontFamily: typo.categoryFont,
                                fontSize: "1.05rem",
                                fontWeight: item.featured ? 500 : 300,
                                color: item.featured ? TEAL : DEEP,
                                letterSpacing: "0.03em",
                                lineHeight: 1.25,
                              }}
                            >
                              {t(item.name, lang)}
                            </span>
                          </div>

                          {/* Price — right-aligned in its own column */}
                          {layout.showPrices ? (
                            <span
                              style={{
                                fontFamily: typo.priceFont,
                                fontSize: "0.92rem",
                                fontWeight: 600,
                                color: TEAL,
                                letterSpacing: "0.03em",
                                whiteSpace: "nowrap",
                                textAlign: "right",
                              }}
                            >
                              {formatPrice(item.price, item.currency)}
                            </span>
                          ) : (
                            <span />
                          )}

                          {/* Description — full width on row 2 */}
                          {layout.showDescriptions && item.description[lang] && (
                            <p
                              style={{
                                gridColumn: "1 / -1",
                                fontFamily: typo.bodyFont,
                                fontSize: "0.72rem",
                                color: DEEP,
                                opacity: 0.44,
                                margin: "0.18rem 0 0",
                                lineHeight: 1.6,
                                fontStyle: "italic",
                              }}
                            >
                              {t(item.description, lang)}
                            </p>
                          )}

                          {/* Allergens */}
                          <div style={{ gridColumn: "1 / -1" }}>
                            <AllergenBadges allergens={item.allergens.contains} fontSize="0.58rem" opacity={0.3} />
                          </div>
                        </div>

                        {!isLast && (
                          <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${TEAL}12 20%, ${TEAL}10 80%, transparent)` }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Between-category wave divider */}
              {catIdx < visible.length - 1 && (
                <div style={{ marginTop: spacing.sectionGap }}>
                  <WaveDivider />
                </div>
              )}

            </section>
          );
        })}
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <FooterSection
        restaurantInfo={restaurantInfo}
        variant="beach-club"
        accentColor={TEAL}
        textColor={DEEP}
        font={typo.bodyFont}
      />

    </BackgroundLayer>
  );
}
