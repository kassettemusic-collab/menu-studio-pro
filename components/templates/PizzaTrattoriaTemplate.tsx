"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer, HeroSection } from "./shared";
import type { TemplateProps } from "./types";
import { resolveTypography } from "@/types/template";

// ── Palette ──────────────────────────────────────────────────────────────────

const RED   = "#8b1a1a";
const GOLD  = "#c9a96e";
const INK   = "#2c1206";

// ── Italian flag accent ───────────────────────────────────────────────────────
// Three hairline stripes (verde · bianco · rosso) running inside the outer frame.
// Preparado para: italianFlagAccent: boolean en TemplateDesign (futuro).

const FLAG_GREEN = "#3a7a3a";
const FLAG_RED   = "#8b1a1a"; // matches template RED for cohesion

function ItalianFlagStripe({ position }: { position: "top" | "bottom" }) {
  const placement = position === "top"
    ? { top: "0.95rem" }
    : { bottom: "0.95rem" };

  const stripes =
    position === "top"
      ? [FLAG_GREEN, "rgba(255,255,255,0.25)", FLAG_RED]
      : [FLAG_RED,   "rgba(255,255,255,0.25)", FLAG_GREEN];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        ...placement,
        left: "0.98rem",
        right: "0.98rem",
        zIndex: 4,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        gap: "1px",
      }}
    >
      {stripes.map((color, i) => (
        <div key={i} style={{ height: "1.5px", backgroundColor: color, opacity: 0.5 }} />
      ))}
    </div>
  );
}

// ── Corner ornament SVG ───────────────────────────────────────────────────────
// One base drawing (top-left orientation) — CSS transform mirrors it for the
// other three corners. Motif: olive branch with paired leaves + small berries.
// Preparado para: decorativeElements: { topLeft, topRight, bottomLeft, bottomRight }
// en TemplateDesign (futuro).

function CornerOrnament({
  size = 76,
  flipX = false,
  flipY = false,
  opacity = 1,
}: {
  size?: number;
  flipX?: boolean;
  flipY?: boolean;
  opacity?: number;
}) {
  const tx = flipX ? -size : 0;
  const ty = flipY ? -size : 0;
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", opacity }}
    >
      <g transform={`translate(${tx},${ty}) scale(${sx},${sy})`}>

        {/* ── Main stem — curves diagonally from corner inward ── */}
        <path
          d="M 6 6 C 14 22 24 34 40 52 C 48 62 58 70 68 76"
          stroke={RED}
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.42"
        />

        {/* ── Tendril curls ── */}
        <path d="M 14 18 C 10 12 6 13 8 8" stroke={RED} strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
        <path d="M 28 36 C 20 32 18 37 22 42" stroke={RED} strokeWidth="0.5" strokeLinecap="round" opacity="0.25"/>
        <path d="M 44 54 C 38 50 36 56 40 60" stroke={RED} strokeWidth="0.5" strokeLinecap="round" opacity="0.22"/>

        {/* ── Leaf pair 1 (near corner) ── */}
        <ellipse cx="13" cy="17" rx="10" ry="3.2" transform="rotate(-52 13 17)" fill={RED} opacity="0.32"/>
        <ellipse cx="22" cy="19" rx="10" ry="3.2" transform="rotate(-14 22 19)" fill={RED} opacity="0.32"/>

        {/* ── Leaf pair 2 ── */}
        <ellipse cx="26" cy="32" rx="9.5" ry="3" transform="rotate(-46 26 32)" fill={RED} opacity="0.28"/>
        <ellipse cx="34" cy="34" rx="9.5" ry="3" transform="rotate(-12 34 34)" fill={RED} opacity="0.28"/>

        {/* ── Leaf pair 3 ── */}
        <ellipse cx="38" cy="47" rx="9" ry="2.8" transform="rotate(-42 38 47)" fill={RED} opacity="0.24"/>
        <ellipse cx="46" cy="49" rx="9" ry="2.8" transform="rotate(-10 46 49)" fill={RED} opacity="0.24"/>

        {/* ── Leaf pair 4 (near bottom end) ── */}
        <ellipse cx="52" cy="62" rx="8" ry="2.4" transform="rotate(-36 52 62)" fill={RED} opacity="0.2"/>
        <ellipse cx="58" cy="64" rx="8" ry="2.4" transform="rotate(-8 58 64)"  fill={RED} opacity="0.2"/>

        {/* ── Small olive berries along branch ── */}
        <ellipse cx="20" cy="14" rx="2.2" ry="1.4" transform="rotate(-30 20 14)" fill={GOLD} opacity="0.35"/>
        <ellipse cx="42" cy="44" rx="2"   ry="1.3" transform="rotate(-25 42 44)" fill={GOLD} opacity="0.28"/>
        <ellipse cx="62" cy="68" rx="1.8" ry="1.2" transform="rotate(-20 62 68)" fill={GOLD} opacity="0.24"/>

        {/* ── Corner fleuron — marks the corner point ── */}
        <circle cx="6"  cy="6"  r="2.8" fill={RED}  opacity="0.35"/>
        <circle cx="11" cy="5"  r="1.8" fill={RED}  opacity="0.28"/>
        <circle cx="5"  cy="11" r="1.8" fill={RED}  opacity="0.28"/>
        <circle cx="10" cy="10" r="1.4" fill={GOLD} opacity="0.4"/>

      </g>
    </svg>
  );
}

// ── "Il Menù" transition element ─────────────────────────────────────────────

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
      <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to right, transparent, ${RED}32)` }} />
      <span
        style={{
          fontFamily: bodyFont,
          fontSize: "0.48rem",
          letterSpacing: "0.52em",
          textTransform: "uppercase",
          color: RED,
          opacity: 0.5,
          whiteSpace: "nowrap",
        }}
      >
        Il Menù
      </span>
      <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to left, transparent, ${RED}32)` }} />
    </div>
  );
}

// ── Between-section ornamental divider ───────────────────────────────────────

function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      style={{ display: "flex", alignItems: "center", gap: "0.9rem", margin: "0.5rem 0" }}
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
  label, title, description, headingFont, bodyFont,
}: {
  label: string; title: string; description?: string;
  headingFont: string; bodyFont: string;
}) {
  return (
    <div style={{ textAlign: "center", padding: "2.75rem 0 1.5rem" }}>

      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.6rem" }}>
        <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to right, transparent, ${RED}28)` }} />
        <span style={{ color: RED, fontSize: "0.44rem", opacity: 0.42, letterSpacing: "0.2em" }}>✦</span>
        <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(to left, transparent, ${RED}28)` }} />
      </div>

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
          }}
        >
          {description}
        </p>
      )}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.4rem", marginTop: "1.4rem" }}>
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

      {/* ── Italian flag accent — top & bottom ──────────────────────────── */}
      <ItalianFlagStripe position="top" />
      <ItalianFlagStripe position="bottom" />

      {/* ── Decorative border frame — triple layer ───────────────────────── */}
      {/* borderStyle: "triple" — preparado para variante configurable */}
      <div aria-hidden style={{ position: "absolute", inset: "0.9rem",  border: `1px solid ${RED}38`,   pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", inset: "1.25rem", border: `0.5px solid ${RED}20`, pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", inset: "1.55rem", border: `0.5px solid ${RED}12`, pointerEvents: "none", zIndex: 0 }} />

      {/* ── Corner ornaments — decorativeElements ───────────────────────── */}
      {/* Preparado para: decorativeElements.topLeft / topRight / bottomLeft / bottomRight */}
      <div style={{ position: "absolute", top: "1.6rem",    left: "1.6rem",  zIndex: 2, pointerEvents: "none" }}>
        <CornerOrnament size={76} />
      </div>
      <div style={{ position: "absolute", top: "1.6rem",    right: "1.6rem", zIndex: 2, pointerEvents: "none" }}>
        <CornerOrnament size={76} flipX />
      </div>
      <div style={{ position: "absolute", bottom: "1.6rem", left: "1.6rem",  zIndex: 2, pointerEvents: "none" }}>
        <CornerOrnament size={76} flipY />
      </div>
      <div style={{ position: "absolute", bottom: "1.6rem", right: "1.6rem", zIndex: 2, pointerEvents: "none" }}>
        <CornerOrnament size={76} flipX flipY />
      </div>

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

        {/* ── "Il Menù" chapter marker ──────────────────────────────────── */}
        <MenuOpening bodyFont={typo.bodyFont} />

        {/* ── Categories ───────────────────────────────────────────────── */}
        <div style={{ padding: "0 4rem 6rem", display: "flex", flexDirection: "column" }}>
          {visible.map((cat, idx) => {
            const items = cat.items
              .filter((i) => i.available)
              .sort((a, b) => a.sortOrder - b.sortOrder);

            if (items.length === 0) return null;

            const catLabel       = t(cat.name, lang)?.toUpperCase() ?? "";
            const catDescription = layout.showDescriptions
              ? t(cat.description, lang) || undefined
              : undefined;

            return (
              <section key={cat.id}>

                <CategoryBlock
                  label={catLabel}
                  title={t(cat.name, lang)}
                  description={catDescription}
                  headingFont={typo.categoryFont}
                  bodyFont={typo.bodyFont}
                />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {items.map((item, itemIdx) => {
                    const hasItemImage = !!item.image;
                    const isLast = itemIdx === items.length - 1;

                    return (
                      <div key={item.id}>
                        {hasItemImage ? (
                          <div style={{ display: "flex", gap: "1.15rem", alignItems: "flex-start", padding: "1.25rem 0" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image!}
                              alt={t(item.name, lang)}
                              style={{
                                width: "4.5rem", height: "4.5rem", objectFit: "cover",
                                borderRadius: "2px", border: `1px solid ${RED}16`,
                                flexShrink: 0, filter: "saturate(0.88) brightness(0.96)",
                              }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", columnGap: "1.5rem", alignItems: "baseline" }}>
                                <span style={{ fontFamily: typo.categoryFont, fontSize: "1.15rem", fontWeight: item.featured ? 500 : 400, color: INK, letterSpacing: "0.015em", lineHeight: 1.2 }}>
                                  {item.featured && <span style={{ color: RED, fontSize: "0.32rem", marginRight: "0.35rem", opacity: 0.6, verticalAlign: "middle" }}>✦</span>}
                                  {t(item.name, lang)}
                                </span>
                                {layout.showPrices && (
                                  <span style={{ fontFamily: typo.priceFont, fontSize: "0.92rem", fontWeight: 500, fontStyle: "italic", color: GOLD, whiteSpace: "nowrap", letterSpacing: "0.02em" }}>
                                    {formatPrice(item.price, item.currency)}
                                  </span>
                                )}
                              </div>
                              {layout.showDescriptions && item.description[lang] && (
                                <p style={{ fontFamily: typo.bodyFont, fontStyle: "italic", fontSize: "0.8rem", color: INK, opacity: 0.5, margin: "0.3rem 0 0", lineHeight: 1.72 }}>
                                  {t(item.description, lang)}
                                </p>
                              )}
                              <AllergenBadges allergens={item.allergens.contains} fontSize="0.56rem" opacity={0.38} marginTop="0.22rem" />
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", columnGap: "1.5rem", alignItems: "baseline", padding: "1.25rem 0" }}>

                            <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", minWidth: 0 }}>
                              {item.featured && (
                                <span style={{ color: RED, fontSize: "0.32rem", flexShrink: 0, opacity: 0.6, position: "relative", top: "-0.1em", lineHeight: 1 }}>✦</span>
                              )}
                              <span style={{ fontFamily: typo.categoryFont, fontSize: "1.15rem", fontWeight: item.featured ? 500 : 400, color: item.featured ? INK : `${INK}e8`, letterSpacing: "0.015em", lineHeight: 1.2 }}>
                                {t(item.name, lang)}
                              </span>
                            </div>

                            {layout.showPrices ? (
                              <span style={{ fontFamily: typo.priceFont, fontSize: "0.92rem", fontWeight: 500, fontStyle: "italic", color: GOLD, letterSpacing: "0.02em", whiteSpace: "nowrap", textAlign: "right" }}>
                                {formatPrice(item.price, item.currency)}
                              </span>
                            ) : <span />}

                            {layout.showDescriptions && item.description[lang] && (
                              <p style={{ gridColumn: "1 / -1", fontFamily: typo.bodyFont, fontStyle: "italic", fontSize: "0.8rem", color: INK, opacity: 0.5, margin: "0.25rem 0 0", lineHeight: 1.72, letterSpacing: "0.005em" }}>
                                {t(item.description, lang)}
                              </p>
                            )}

                            <div style={{ gridColumn: "1 / -1" }}>
                              <AllergenBadges allergens={item.allergens.contains} fontSize="0.56rem" opacity={0.38} />
                            </div>
                          </div>
                        )}

                        {!isLast && (
                          <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${RED}1e 20%, ${RED}18 80%, transparent)` }} />
                        )}
                      </div>
                    );
                  })}
                </div>

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
          <footer style={{ borderTop: `1px solid ${RED}18`, padding: "2.5rem 4rem 5.5rem", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.85rem", marginBottom: "1.75rem" }}>
              <div style={{ height: "0.5px", width: "2.5rem", background: `linear-gradient(to right, transparent, ${RED}28)` }} />
              <span style={{ color: RED, opacity: 0.3, fontSize: "0.4rem", letterSpacing: "0.5em" }}>✦ ✦ ✦</span>
              <div style={{ height: "0.5px", width: "2.5rem", background: `linear-gradient(to left, transparent, ${RED}28)` }} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.15rem", fontFamily: typo.bodyFont, fontSize: "0.7rem", fontStyle: "italic", color: INK, opacity: 0.38, letterSpacing: "0.025em", lineHeight: 1.9 }}>
              {restaurantInfo.address && <span>{restaurantInfo.address}</span>}
              {restaurantInfo.address && (restaurantInfo.phone || restaurantInfo.website) && <span style={{ margin: "0 0.55rem", opacity: 0.45 }}>·</span>}
              {restaurantInfo.phone && <span>{restaurantInfo.phone}</span>}
              {restaurantInfo.phone && restaurantInfo.website && <span style={{ margin: "0 0.55rem", opacity: 0.45 }}>·</span>}
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
