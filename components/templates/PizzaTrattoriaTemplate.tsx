"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer } from "./shared";
import type { TemplateProps } from "./types";
import { resolveTypography } from "@/types/template";

// ── Palette ───────────────────────────────────────────────────────────────────

const RED        = "#8b1a1a";
const RED_DEEP   = "#5c0e0e";
const GREEN      = "#1a5c1a";
const GREEN_MID  = "#1e7a1e";
const GOLD       = "#c9a96e";
const CREAM      = "#faf3e8";
const INK        = "#2c1206";

// ── Italian side strips — 30px bands, full document height ───────────────────

function ItalianSideStrips() {
  return (
    <>
      {/* LEFT — verde */}
      <div aria-hidden style={{
        position: "absolute", top: 0, bottom: 0, left: 0,
        width: "30px", zIndex: 10, pointerEvents: "none",
        background: `linear-gradient(to bottom,
          ${RED_DEEP} 0%,
          ${GREEN} 8%,
          ${GREEN_MID} 50%,
          ${GREEN} 92%,
          ${RED_DEEP} 100%)`,
        boxShadow: "inset -2px 0 6px rgba(0,0,0,0.22)",
      }}>
        {/* thin gold inner line */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, right: 0,
          width: "2px",
          background: `linear-gradient(to bottom, transparent, ${GOLD}60 20%, ${GOLD}60 80%, transparent)`,
        }}/>
      </div>

      {/* RIGHT — rosso */}
      <div aria-hidden style={{
        position: "absolute", top: 0, bottom: 0, right: 0,
        width: "30px", zIndex: 10, pointerEvents: "none",
        background: `linear-gradient(to bottom,
          ${RED_DEEP} 0%,
          ${RED} 8%,
          #9e1f1f 50%,
          ${RED} 92%,
          ${RED_DEEP} 100%)`,
        boxShadow: "inset 2px 0 6px rgba(0,0,0,0.22)",
      }}>
        {/* thin gold inner line */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 0,
          width: "2px",
          background: `linear-gradient(to bottom, transparent, ${GOLD}60 20%, ${GOLD}60 80%, transparent)`,
        }}/>
      </div>
    </>
  );
}

// ── Tricolor top & bottom bands — thick & proud ───────────────────────────────

function TricolorBand({ position }: { position: "top" | "bottom" }) {
  const isTop = position === "top";
  return (
    <div aria-hidden style={{
      position: "absolute",
      left: "30px", right: "30px",
      ...(isTop ? { top: 0 } : { bottom: 0 }),
      zIndex: 9, pointerEvents: "none",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ height: "6px", background: isTop ? GREEN_MID : RED }} />
      <div style={{ height: "4px", background: "#f4ede0" }} />
      <div style={{ height: "6px", background: isTop ? RED : GREEN_MID }} />
    </div>
  );
}

// ── Corner laurel wreath — 200px, fully visible ───────────────────────────────

function CornerLaurel({ flipX = false, flipY = false }) {
  const S = 200;
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;
  const ox = flipX ? -S : 0;
  const oy = flipY ? -S : 0;

  return (
    <svg width={S} height={S} viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg" aria-hidden
      style={{ display: "block" }}>
      <g transform={`translate(${ox},${oy}) scale(${sx},${sy})`} opacity="0.82">

        {/* ── Main vine stem ── */}
        <path
          d="M 14 14 C 30 50 55 80 88 118 C 110 142 140 165 175 185"
          stroke={GREEN} strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* ── Secondary stem ── */}
        <path
          d="M 14 14 C 24 38 42 62 68 90 C 88 112 115 135 148 158"
          stroke={RED} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />

        {/* ── Leaf pairs — green, growing in size down the stem ── */}
        {/* pair 1 */}
        <ellipse cx="26" cy="28" rx="20" ry="6" transform="rotate(-50 26 28)" fill={GREEN} opacity="0.85"/>
        <ellipse cx="38" cy="32" rx="20" ry="6" transform="rotate(-15 38 32)" fill={GREEN} opacity="0.85"/>
        {/* pair 2 */}
        <ellipse cx="46" cy="55" rx="22" ry="6.5" transform="rotate(-46 46 55)" fill={GREEN} opacity="0.78"/>
        <ellipse cx="60" cy="60" rx="22" ry="6.5" transform="rotate(-12 60 60)" fill={GREEN} opacity="0.78"/>
        {/* pair 3 */}
        <ellipse cx="68" cy="84" rx="22" ry="6" transform="rotate(-42 68 84)" fill={GREEN} opacity="0.72"/>
        <ellipse cx="82" cy="89" rx="22" ry="6" transform="rotate(-10 82 89)" fill={GREEN} opacity="0.72"/>
        {/* pair 4 */}
        <ellipse cx="92" cy="114" rx="20" ry="5.5" transform="rotate(-37 92 114)" fill={GREEN} opacity="0.65"/>
        <ellipse cx="106" cy="119" rx="20" ry="5.5" transform="rotate(-8 106 119)" fill={GREEN} opacity="0.65"/>
        {/* pair 5 */}
        <ellipse cx="120" cy="143" rx="18" ry="5" transform="rotate(-32 120 143)" fill={GREEN} opacity="0.55"/>
        <ellipse cx="133" cy="148" rx="18" ry="5" transform="rotate(-6 133 148)" fill={GREEN} opacity="0.55"/>
        {/* pair 6 */}
        <ellipse cx="147" cy="167" rx="16" ry="4.5" transform="rotate(-26 147 167)" fill={GREEN} opacity="0.45"/>
        <ellipse cx="158" cy="171" rx="16" ry="4.5" transform="rotate(-4 158 171)" fill={GREEN} opacity="0.45"/>

        {/* ── Vine tendrils ── */}
        <path d="M 28 32 C 16 22 12 28 16 14" stroke={GREEN} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
        <path d="M 52 62 C 40 52 36 60 44 70" stroke={GREEN} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
        <path d="M 78 96 C 66 86 62 95 70 105" stroke={GREEN} strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.45"/>
        <path d="M 108 128 C 96 118 92 128 100 138" stroke={GREEN} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4"/>

        {/* ── Grape cluster at corner — big & vivid ── */}
        <circle cx="14" cy="14" r="9"  fill={RED} opacity="0.92"/>
        <circle cx="26" cy="10" r="7.5" fill={RED} opacity="0.85"/>
        <circle cx="10" cy="26" r="7.5" fill={RED} opacity="0.85"/>
        <circle cx="24" cy="24" r="6.5" fill={RED} opacity="0.78"/>
        <circle cx="36" cy="16" r="6"   fill={RED} opacity="0.70"/>
        <circle cx="16" cy="36" r="6"   fill={RED} opacity="0.70"/>
        <circle cx="34" cy="34" r="5"   fill={RED} opacity="0.60"/>
        <circle cx="44" cy="22" r="4.5" fill={RED} opacity="0.52"/>
        <circle cx="22" cy="44" r="4.5" fill={RED} opacity="0.52"/>
        {/* Highlights */}
        <circle cx="12" cy="11" r="3.5" fill={GOLD} opacity="0.62"/>
        <circle cx="24" cy="8"  r="2.5" fill={GOLD} opacity="0.48"/>

        {/* ── Berries along stem ── */}
        <circle cx="42" cy="46" r="5"   fill={RED} opacity="0.62"/>
        <circle cx="40" cy="57" r="3.5" fill={GOLD} opacity="0.52"/>
        <circle cx="70" cy="80" r="5"   fill={RED} opacity="0.55"/>
        <circle cx="68" cy="92" r="3.5" fill={GOLD} opacity="0.45"/>
        <circle cx="100" cy="116" r="4.5" fill={RED} opacity="0.48"/>
        <circle cx="98"  cy="127" r="3"   fill={GOLD} opacity="0.38"/>
        <circle cx="132" cy="150" r="4"   fill={RED} opacity="0.40"/>

        {/* ── Small star ornament near tip ── */}
        <text x="160" y="188" fontSize="10" fill={GOLD} opacity="0.55"
          fontFamily="serif" textAnchor="middle">✦</text>

      </g>
    </svg>
  );
}

// ── Decorative SVG divider — full laurel branch ───────────────────────────────

function LaurelDivider() {
  return (
    <div aria-hidden style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0.5rem 0 0", padding: "1rem 0" }}>
      <svg width="380" height="40" viewBox="0 0 380 40" xmlns="http://www.w3.org/2000/svg">

        {/* Left branch */}
        <path d="M 10 20 C 40 18 70 15 120 17 C 150 18 165 20 180 20"
          stroke={GREEN} strokeWidth="1.2" fill="none" opacity="0.7" />
        {/* Left leaves */}
        <ellipse cx="40" cy="17" rx="14" ry="4" transform="rotate(-8 40 17)" fill={GREEN} opacity="0.65"/>
        <ellipse cx="40" cy="23" rx="14" ry="4" transform="rotate(8 40 23)"  fill={GREEN} opacity="0.65"/>
        <ellipse cx="72" cy="16" rx="13" ry="3.8" transform="rotate(-6 72 16)" fill={GREEN} opacity="0.58"/>
        <ellipse cx="72" cy="24" rx="13" ry="3.8" transform="rotate(6 72 24)"  fill={GREEN} opacity="0.58"/>
        <ellipse cx="104" cy="16.5" rx="12" ry="3.5" transform="rotate(-4 104 16)" fill={GREEN} opacity="0.5"/>
        <ellipse cx="104" cy="23.5" rx="12" ry="3.5" transform="rotate(4 104 23)"  fill={GREEN} opacity="0.5"/>
        <ellipse cx="135" cy="17" rx="11" ry="3.2" transform="rotate(-3 135 17)" fill={GREEN} opacity="0.42"/>
        <ellipse cx="135" cy="23" rx="11" ry="3.2" transform="rotate(3 135 23)"  fill={GREEN} opacity="0.42"/>
        {/* Left gold line */}
        <line x1="10" y1="20" x2="178" y2="20" stroke={GOLD} strokeWidth="0.5" opacity="0.4"/>

        {/* Center ornament */}
        <circle cx="190" cy="20" r="8" fill={RED} opacity="0.85"/>
        <circle cx="190" cy="20" r="5" fill={GOLD} opacity="0.6"/>
        <text x="190" y="24" fontSize="6" fill="#fff" opacity="0.9"
          fontFamily="serif" textAnchor="middle">✦</text>
        {/* Small flanking dots */}
        <circle cx="174" cy="20" r="2.5" fill={GOLD} opacity="0.55"/>
        <circle cx="206" cy="20" r="2.5" fill={GOLD} opacity="0.55"/>

        {/* Right branch — mirror */}
        <path d="M 370 20 C 340 18 310 15 260 17 C 230 18 215 20 200 20"
          stroke={GREEN} strokeWidth="1.2" fill="none" opacity="0.7" />
        <ellipse cx="340" cy="17" rx="14" ry="4" transform="rotate(8 340 17)"  fill={GREEN} opacity="0.65"/>
        <ellipse cx="340" cy="23" rx="14" ry="4" transform="rotate(-8 340 23)" fill={GREEN} opacity="0.65"/>
        <ellipse cx="308" cy="16" rx="13" ry="3.8" transform="rotate(6 308 16)"  fill={GREEN} opacity="0.58"/>
        <ellipse cx="308" cy="24" rx="13" ry="3.8" transform="rotate(-6 308 24)" fill={GREEN} opacity="0.58"/>
        <ellipse cx="276" cy="16.5" rx="12" ry="3.5" transform="rotate(4 276 16)"  fill={GREEN} opacity="0.5"/>
        <ellipse cx="276" cy="23.5" rx="12" ry="3.5" transform="rotate(-4 276 23)" fill={GREEN} opacity="0.5"/>
        <ellipse cx="245" cy="17" rx="11" ry="3.2" transform="rotate(3 245 17)"  fill={GREEN} opacity="0.42"/>
        <ellipse cx="245" cy="23" rx="11" ry="3.2" transform="rotate(-3 245 23)" fill={GREEN} opacity="0.42"/>
        <line x1="370" y1="20" x2="202" y2="20" stroke={GOLD} strokeWidth="0.5" opacity="0.4"/>

      </svg>
    </div>
  );
}

// ── Italian hero — title a 5.5rem, todo custom ────────────────────────────────

function ItalianHero({
  logo, logoAlt, title, subtitle,
  welcomeMessage, chefMessage,
  showLogo, showWelcomeMessage, showChefMessage,
  headingFont, bodyFont,
}: {
  logo?: string; logoAlt?: string; title: string; subtitle?: string;
  welcomeMessage?: string; chefMessage?: string;
  showLogo?: boolean; showSubtitle?: boolean;
  showWelcomeMessage?: boolean; showChefMessage?: boolean;
  headingFont: string; bodyFont: string;
}) {
  return (
    <div style={{
      position: "relative",
      width: "100%",
      background: `linear-gradient(175deg, #4a0c0c 0%, #6e1212 25%, ${RED} 55%, #c47050 80%, ${CREAM} 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "5.5rem 5.5rem 6.5rem",
      overflow: "hidden",
    }}>

      {/* Subtle vignette top */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3rem",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
        pointerEvents: "none",
      }}/>

      {/* Watermark text behind content */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
        pointerEvents: "none", overflow: "hidden",
      }}>
        <span style={{
          fontFamily: headingFont, fontSize: "9rem", fontWeight: 700,
          color: "rgba(255,255,255,0.04)", letterSpacing: "0.25em",
          textTransform: "uppercase", userSelect: "none",
          transform: "rotate(-8deg)",
          whiteSpace: "nowrap",
        }}>ITALIA</span>
      </div>

      {/* Logo */}
      {showLogo && logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={logoAlt ?? title} style={{
          height: "7rem", objectFit: "contain", marginBottom: "2rem",
          filter: "brightness(0) invert(1)", opacity: 0.95,
        }}/>
      )}

      {/* Gold top rule */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        width: "70%", maxWidth: "22rem", marginBottom: "2rem",
      }}>
        <div style={{ flex: 1, height: "1.5px", background: `linear-gradient(to right, transparent, ${GOLD})` }}/>
        <span style={{ color: GOLD, fontSize: "0.6rem", letterSpacing: "0.35em" }}>★ ★ ★</span>
        <div style={{ flex: 1, height: "1.5px", background: `linear-gradient(to left, transparent, ${GOLD})` }}/>
      </div>

      {/* Restaurant name — the real WOW */}
      <h1 style={{
        fontFamily: headingFont,
        fontSize: "5.5rem",
        fontWeight: 700,
        color: "#ffffff",
        letterSpacing: "0.03em",
        margin: 0,
        lineHeight: 0.92,
        textShadow: "0 3px 40px rgba(0,0,0,0.65), 0 1px 0 rgba(0,0,0,0.4)",
      }}>
        {title}
      </h1>

      {/* Tagline */}
      {subtitle && (
        <p style={{
          fontFamily: bodyFont, fontStyle: "italic",
          fontSize: "1.05rem", color: "rgba(255,255,255,0.78)",
          margin: "1.1rem 0 0", letterSpacing: "0.06em",
        }}>
          {subtitle}
        </p>
      )}

      {/* Gold diamond rule */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        margin: "1.75rem 0", width: "65%", maxWidth: "20rem",
      }}>
        <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}90)` }}/>
        <span style={{ color: GOLD, fontSize: "0.5rem", letterSpacing: "0.15em" }}>◆ ◆ ◆</span>
        <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${GOLD}90)` }}/>
      </div>

      {/* Welcome message */}
      {showWelcomeMessage && welcomeMessage && (
        <p style={{
          fontFamily: bodyFont, fontStyle: "italic",
          fontSize: "0.95rem", color: "rgba(255,255,255,0.68)",
          lineHeight: 1.9, maxWidth: "27rem", margin: 0,
        }}>
          {welcomeMessage}
        </p>
      )}

      {/* Chef message */}
      {showChefMessage && chefMessage && (
        <div style={{
          marginTop: "1.5rem",
          padding: "1rem 2rem",
          border: "1px solid rgba(255,255,255,0.22)",
          maxWidth: "27rem", width: "100%",
        }}>
          <p style={{
            fontFamily: bodyFont, fontStyle: "italic",
            fontSize: "0.85rem", color: "rgba(255,255,255,0.55)",
            lineHeight: 2, margin: 0,
          }}>
            {chefMessage}
          </p>
        </div>
      )}

    </div>
  );
}

// ── Category header — huge, proud, unmissable ─────────────────────────────────

function CategoryHeader({
  label, title, description, headingFont, bodyFont,
}: {
  label: string; title: string; description?: string;
  headingFont: string; bodyFont: string;
}) {
  return (
    <div style={{ margin: "3.5rem -4.5rem 0" }}>

      {/* Full-bleed red banner */}
      <div style={{
        background: `linear-gradient(to right, ${RED_DEEP}, ${RED} 25%, ${RED} 75%, ${RED_DEEP})`,
        padding: "1rem 5.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        borderTop: `2px solid ${GOLD}50`,
        borderBottom: `2px solid ${GOLD}50`,
      }}>
        <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}70)` }}/>
        <span style={{
          fontFamily: bodyFont,
          fontSize: "0.68rem", fontWeight: 800,
          letterSpacing: "0.6em",
          textTransform: "uppercase",
          color: "#ffffff",
          whiteSpace: "nowrap",
        }}>
          {label}
        </span>
        <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${GOLD}70)` }}/>
      </div>

      {/* Category name — HUGE */}
      <div style={{ textAlign: "center", padding: "2rem 0 0.75rem" }}>
        <h2 style={{
          fontFamily: headingFont,
          fontSize: "4.5rem",
          fontWeight: 300,
          fontStyle: "italic",
          color: INK,
          margin: 0,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textShadow: `0 1px 0 rgba(139,26,26,0.1)`,
        }}>
          {title}
        </h2>

        {description && (
          <p style={{
            fontFamily: bodyFont, fontStyle: "italic",
            fontSize: "0.8rem", color: INK, opacity: 0.48,
            margin: "0.8rem 0 0", lineHeight: 1.7,
          }}>
            {description}
          </p>
        )}

        {/* Green + red micro bars */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", marginTop: "1.5rem" }}>
          <div style={{ width: "2.5rem", height: "2px", backgroundColor: GREEN, borderRadius: "1px", opacity: 0.7 }}/>
          <div style={{ width: "2.5rem", height: "2px", backgroundColor: "#f4ede0", borderRadius: "1px", opacity: 0.9 }}/>
          <div style={{ width: "2.5rem", height: "2px", backgroundColor: RED, borderRadius: "1px", opacity: 0.7 }}/>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function PizzaTrattoriaTemplate({ project, categories, design, lang }: TemplateProps) {
  const { restaurantInfo, branding, hero } = project;
  const { fonts, spacing, layout } = design;
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

      {/* ── Tricolor top + bottom ─────────────────────────────────────────── */}
      <TricolorBand position="top" />
      <TricolorBand position="bottom" />

      {/* ── Verde & Rosso — thick side strips ────────────────────────────── */}
      <ItalianSideStrips />

      {/* ── Corner laurels — 200px, fully visible ────────────────────────── */}
      <div style={{ position: "absolute", top: "16px",  left: "30px",  zIndex: 5, pointerEvents: "none" }}>
        <CornerLaurel />
      </div>
      <div style={{ position: "absolute", top: "16px",  right: "30px", zIndex: 5, pointerEvents: "none" }}>
        <CornerLaurel flipX />
      </div>
      <div style={{ position: "absolute", bottom: "16px", left: "30px",  zIndex: 5, pointerEvents: "none" }}>
        <CornerLaurel flipY />
      </div>
      <div style={{ position: "absolute", bottom: "16px", right: "30px", zIndex: 5, pointerEvents: "none" }}>
        <CornerLaurel flipX flipY />
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <ItalianHero
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
          showLogo={hasLogo}
          showWelcomeMessage={!!(branding?.welcomeMessage?.[lang])}
          showChefMessage={!!(hero?.showChefMessage && hero.chefMessage?.[lang])}
          headingFont={typo.titleFont}
          bodyFont={typo.bodyFont}
        />

        {/* ── Categories ───────────────────────────────────────────────── */}
        <div style={{ padding: "0 4.5rem 7rem", display: "flex", flexDirection: "column" }}>
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

                <CategoryHeader
                  label={catLabel}
                  title={t(cat.name, lang)}
                  description={catDescription}
                  headingFont={typo.categoryFont}
                  bodyFont={typo.bodyFont}
                />

                <div style={{ display: "flex", flexDirection: "column", marginTop: "0.5rem" }}>
                  {items.map((item, itemIdx) => {
                    const hasItemImage = !!item.image;
                    const isLast = itemIdx === items.length - 1;

                    return (
                      <div key={item.id}>
                        {hasItemImage ? (
                          <div style={{
                            display: "flex", gap: "1.25rem",
                            alignItems: "flex-start", padding: "1.5rem 0",
                          }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image!} alt={t(item.name, lang)} style={{
                              width: "5rem", height: "5rem", objectFit: "cover",
                              borderRadius: "2px", border: `1.5px solid ${RED}25`,
                              flexShrink: 0,
                            }}/>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", columnGap: "1.5rem", alignItems: "baseline" }}>
                                <span style={{
                                  fontFamily: typo.categoryFont, fontSize: "1.28rem",
                                  fontWeight: item.featured ? 600 : 400,
                                  color: INK, letterSpacing: "0.01em", lineHeight: 1.2,
                                }}>
                                  {item.featured && <span style={{ color: RED, fontSize: "0.4rem", marginRight: "0.4rem", opacity: 0.8 }}>✦</span>}
                                  {t(item.name, lang)}
                                </span>
                                {layout.showPrices && (
                                  <span style={{
                                    fontFamily: typo.priceFont, fontSize: "1rem",
                                    fontWeight: 500, fontStyle: "italic", color: GOLD,
                                    whiteSpace: "nowrap",
                                  }}>
                                    {formatPrice(item.price, item.currency)}
                                  </span>
                                )}
                              </div>
                              {layout.showDescriptions && item.description[lang] && (
                                <p style={{
                                  fontFamily: typo.bodyFont, fontStyle: "italic",
                                  fontSize: "0.83rem", color: INK, opacity: 0.52,
                                  margin: "0.35rem 0 0", lineHeight: 1.75,
                                }}>
                                  {t(item.description, lang)}
                                </p>
                              )}
                              <AllergenBadges allergens={item.allergens.contains} fontSize="0.56rem" opacity={0.38} marginTop="0.25rem" />
                            </div>
                          </div>
                        ) : (
                          <div style={{
                            display: "grid", gridTemplateColumns: "1fr auto",
                            columnGap: "1.5rem", alignItems: "baseline", padding: "1.5rem 0",
                          }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: "0.45rem", minWidth: 0 }}>
                              {item.featured && (
                                <span style={{
                                  color: RED, fontSize: "0.4rem", flexShrink: 0,
                                  opacity: 0.75, position: "relative", top: "-0.1em", lineHeight: 1,
                                }}>✦</span>
                              )}
                              <span style={{
                                fontFamily: typo.categoryFont, fontSize: "1.28rem",
                                fontWeight: item.featured ? 600 : 400,
                                color: item.featured ? INK : `${INK}e8`,
                                letterSpacing: "0.01em", lineHeight: 1.2,
                              }}>
                                {t(item.name, lang)}
                              </span>
                            </div>

                            {layout.showPrices ? (
                              <span style={{
                                fontFamily: typo.priceFont, fontSize: "1rem",
                                fontWeight: 500, fontStyle: "italic", color: GOLD,
                                whiteSpace: "nowrap", textAlign: "right",
                              }}>
                                {formatPrice(item.price, item.currency)}
                              </span>
                            ) : <span />}

                            {layout.showDescriptions && item.description[lang] && (
                              <p style={{
                                gridColumn: "1 / -1",
                                fontFamily: typo.bodyFont, fontStyle: "italic",
                                fontSize: "0.83rem", color: INK, opacity: 0.52,
                                margin: "0.3rem 0 0", lineHeight: 1.75, letterSpacing: "0.005em",
                              }}>
                                {t(item.description, lang)}
                              </p>
                            )}

                            <div style={{ gridColumn: "1 / -1" }}>
                              <AllergenBadges allergens={item.allergens.contains} fontSize="0.56rem" opacity={0.38} />
                            </div>
                          </div>
                        )}

                        {!isLast && (
                          <div style={{
                            height: "1px",
                            background: `linear-gradient(to right, transparent, ${RED}30 20%, ${RED}28 80%, transparent)`,
                          }}/>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Laurel divider between categories */}
                {idx < visible.length - 1 && (
                  <div style={{ padding: `${spacing.sectionGap} 0 0` }}>
                    <LaurelDivider />
                  </div>
                )}

              </section>
            );
          })}
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        {(restaurantInfo.address || restaurantInfo.phone || restaurantInfo.website ||
          restaurantInfo.socialLinks?.instagram) && (
          <footer style={{
            borderTop: `2px solid ${RED}28`,
            padding: "2.5rem 5rem 7rem",
            textAlign: "center",
          }}>
            {/* Footer laurel */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ height: "1px", width: "4rem", background: `linear-gradient(to right, transparent, ${GREEN}60)` }}/>
              <span style={{ color: GOLD, opacity: 0.65, fontSize: "0.5rem", letterSpacing: "0.5em" }}>✦ ✦ ✦</span>
              <div style={{ height: "1px", width: "4rem", background: `linear-gradient(to left, transparent, ${RED}60)` }}/>
            </div>
            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center",
              gap: "0 0.2rem", fontFamily: typo.bodyFont,
              fontSize: "0.72rem", fontStyle: "italic",
              color: INK, opacity: 0.42, letterSpacing: "0.03em", lineHeight: 2,
            }}>
              {restaurantInfo.address && <span>{restaurantInfo.address}</span>}
              {restaurantInfo.address && (restaurantInfo.phone || restaurantInfo.website) &&
                <span style={{ margin: "0 0.6rem", opacity: 0.5 }}>·</span>}
              {restaurantInfo.phone && <span>{restaurantInfo.phone}</span>}
              {restaurantInfo.phone && restaurantInfo.website &&
                <span style={{ margin: "0 0.6rem", opacity: 0.5 }}>·</span>}
              {restaurantInfo.website && <span>{restaurantInfo.website}</span>}
              {restaurantInfo.socialLinks?.instagram && (
                <><span style={{ margin: "0 0.6rem", opacity: 0.5 }}>·</span>
                <span style={{ color: RED, opacity: 0.55 }}>{restaurantInfo.socialLinks.instagram}</span></>
              )}
            </div>
          </footer>
        )}

      </div>
    </BackgroundLayer>
  );
}
