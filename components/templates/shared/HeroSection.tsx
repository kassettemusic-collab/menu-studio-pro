"use client";

import type React from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type HeroVariant =
  | "cinematic-dark"     // Steakhouse — dark overlay, gold ornaments, centered
  | "italian-warm"       // PizzaTrattoria — deep red, logo inverted, welcome inside
  | "mediterranean-light"; // BeachClub — light overlay, left-anchored, teal accent

export interface HeroSectionProps {
  // ── Content ─────────────────────────────────────────────────────────────
  logo?: string;
  logoAlt?: string;
  title: string;
  subtitle?: string;
  welcomeMessage?: string;
  chefMessage?: string;
  heroImage?: string;

  // ── Display flags ────────────────────────────────────────────────────────
  showLogo?: boolean;
  showSubtitle?: boolean;
  showWelcomeMessage?: boolean;
  showChefMessage?: boolean;

  // ── Styling ──────────────────────────────────────────────────────────────
  variant: HeroVariant;
  accentColor: string;
  headingFont: string;
  bodyFont: string;
}

// ── Primitives ────────────────────────────────────────────────────────────────

function OrnamentRule({ color, symbol = "◆", opacity = 0.55 }: { color: string; symbol?: string; opacity?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${color})`, opacity }} />
      <span style={{ color, fontSize: "0.4rem", opacity, letterSpacing: "0.3em" }}>{symbol}</span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${color})`, opacity }} />
    </div>
  );
}

// ── Variant: cinematic-dark ───────────────────────────────────────────────────
// Deep dark background, gold top+bottom bars, ornament before title, centered.

function CinematicDark({
  logo, logoAlt, title, subtitle, welcomeMessage, chefMessage,
  heroImage, showLogo, showSubtitle, showWelcomeMessage, showChefMessage,
  accentColor, headingFont, bodyFont,
}: Omit<HeroSectionProps, "variant">) {
  const DARK = "#0a0806";
  const TEXT  = "#f5f0e8";
  const bg = heroImage
    ? "linear-gradient(to bottom, rgba(8,6,4,0.62) 0%, rgba(8,6,4,0.5) 40%, rgba(8,6,4,0.85) 100%)"
    : "linear-gradient(160deg, #1a130a 0%, #0c0804 100%)";

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "26rem", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Background */}
      {heroImage
        ? <img src={heroImage} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        : <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, #1a130a 0%, #0c0804 100%)` }} />
      }
      <div style={{ position: "absolute", inset: 0, background: bg }} />

      {/* Top gold bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right, transparent, ${accentColor}90, transparent)` }} />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "3.5rem 4rem",
          gap: 0,
        }}
      >
        {/* Logo */}
        {showLogo && logo && (
          <img
            src={logo}
            alt={logoAlt ?? title}
            // eslint-disable-next-line @next/next/no-img-element
            style={{ height: "5.5rem", objectFit: "contain", marginBottom: "1.75rem", filter: `drop-shadow(0 0 16px ${accentColor}50) brightness(0) invert(1)`, opacity: 0.95 }}
          />
        )}

        {/* Stars ornament */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.1rem" }}>
          <div style={{ height: "1px", width: "2.5rem", background: `linear-gradient(to left, ${accentColor}90, transparent)` }} />
          <span style={{ color: accentColor, fontSize: "0.48rem", letterSpacing: "0.35em", opacity: 0.85 }}>★ ★ ★</span>
          <div style={{ height: "1px", width: "2.5rem", background: `linear-gradient(to right, ${accentColor}90, transparent)` }} />
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: headingFont, fontSize: "2.9rem", fontWeight: 700, color: TEXT, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, lineHeight: 1.05, textShadow: "0 2px 24px rgba(0,0,0,0.9)" }}>
          {title}
        </h1>

        {/* Subtitle */}
        {showSubtitle && subtitle && (
          <p style={{ fontFamily: bodyFont, fontStyle: "italic", fontSize: "0.95rem", color: accentColor, margin: "0.75rem 0 0", letterSpacing: "0.05em", opacity: 0.88 }}>
            {subtitle}
          </p>
        )}

        {/* Gold underline */}
        <div style={{ height: "1.5px", width: "8rem", background: `linear-gradient(to right, transparent, ${accentColor}80, transparent)`, margin: "1.5rem 0" }} />

        {/* Welcome message inside hero */}
        {showWelcomeMessage && welcomeMessage && (
          <p style={{ fontFamily: bodyFont, fontStyle: "italic", fontSize: "0.88rem", color: TEXT, opacity: 0.5, lineHeight: 1.9, maxWidth: "28rem", margin: 0, letterSpacing: "0.02em" }}>
            {welcomeMessage}
          </p>
        )}

        {/* Chef message inside hero */}
        {showChefMessage && chefMessage && (
          <div style={{ marginTop: showWelcomeMessage && welcomeMessage ? "1.25rem" : 0, maxWidth: "28rem" }}>
            <span style={{ display: "block", fontFamily: headingFont, fontSize: "2rem", color: accentColor, opacity: 0.2, lineHeight: 0.5, marginBottom: "0.75rem" }}>"</span>
            <p style={{ fontFamily: bodyFont, fontStyle: "italic", fontSize: "0.82rem", color: TEXT, opacity: 0.42, lineHeight: 1.9, margin: 0 }}>
              {chefMessage}
            </p>
          </div>
        )}
      </div>

      {/* Bottom gold bar + fade to page background */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right, transparent, ${accentColor}60, transparent)` }} />
    </div>
  );
}

// ── Variant: italian-warm ─────────────────────────────────────────────────────
// Warm red/cream — logo inverted white, centered serif title with italic,
// welcome + chef message integrated, smooth cream fade at bottom.

function ItalianWarm({
  logo, logoAlt, title, subtitle, welcomeMessage, chefMessage,
  heroImage, showLogo, showSubtitle, showWelcomeMessage, showChefMessage,
  accentColor, headingFont, bodyFont,
}: Omit<HeroSectionProps, "variant">) {
  const CREAM = "#fdf6ed";
  const bg = heroImage
    ? `linear-gradient(to bottom, rgba(20,5,5,0.48) 0%, rgba(20,5,5,0.72) 55%, ${CREAM} 100%)`
    : `linear-gradient(to bottom, ${accentColor}ee 0%, ${accentColor}cc 60%, ${CREAM} 100%)`;

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "24rem", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Background */}
      {heroImage
        ? <img src={heroImage} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        : <div style={{ position: "absolute", inset: 0, backgroundColor: accentColor }} />
      }
      <div style={{ position: "absolute", inset: 0, background: bg }} />

      {/* Content — centered, anchored high */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "3rem 4rem 4.5rem",
          gap: 0,
        }}
      >
        {/* Logo — white inverted on dark bg */}
        {showLogo && logo && (
          <img
            src={logo}
            alt={logoAlt ?? title}
            // eslint-disable-next-line @next/next/no-img-element
            style={{ height: "5rem", objectFit: "contain", marginBottom: "1.25rem", filter: "brightness(0) invert(1)", opacity: 0.93 }}
          />
        )}

        {/* Title */}
        <h1 style={{ fontFamily: headingFont, fontSize: "3rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.05em", margin: 0, lineHeight: 1.05, textShadow: "0 2px 20px rgba(0,0,0,0.45)" }}>
          {title}
        </h1>

        {/* Subtitle */}
        {showSubtitle && subtitle && (
          <p style={{ fontFamily: bodyFont, fontStyle: "italic", fontSize: "1rem", color: "rgba(255,255,255,0.78)", margin: "0.6rem 0 0", letterSpacing: "0.04em" }}>
            {subtitle}
          </p>
        )}

        {/* Ornament */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", margin: "1.25rem 0" }}>
          <div style={{ height: "1px", width: "2rem", backgroundColor: "rgba(255,255,255,0.45)" }} />
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.38rem" }}>◆</span>
          <div style={{ height: "1px", width: "2rem", backgroundColor: "rgba(255,255,255,0.45)" }} />
        </div>

        {/* Welcome message */}
        {showWelcomeMessage && welcomeMessage && (
          <p style={{ fontFamily: bodyFont, fontStyle: "italic", fontSize: "0.88rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.85, maxWidth: "28rem", margin: 0 }}>
            {welcomeMessage}
          </p>
        )}

        {/* Chef message */}
        {showChefMessage && chefMessage && (
          <div style={{ marginTop: "1.25rem", padding: "1.1rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.18)", borderBottom: "1px solid rgba(255,255,255,0.18)", maxWidth: "28rem", width: "100%" }}>
            <p style={{ fontFamily: bodyFont, fontStyle: "italic", fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.9, margin: 0 }}>
              {chefMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Variant: mediterranean-light ──────────────────────────────────────────────
// Bright turquoise-to-cream, content left-anchored at bottom, light serif.

function MediterraneanLight({
  logo, logoAlt, title, subtitle, welcomeMessage, chefMessage,
  heroImage, showLogo, showSubtitle, showWelcomeMessage, showChefMessage,
  accentColor, headingFont, bodyFont,
}: Omit<HeroSectionProps, "variant">) {
  const DEEP = "#1c2e2e";
  const hasBg = !!heroImage;
  const bg = hasBg
    ? "linear-gradient(to top, rgba(10,25,25,0.7) 0%, rgba(10,25,25,0.2) 50%, transparent 100%)"
    : `linear-gradient(160deg, #e4f4f4 0%, #c6e8e8 40%, #a8d8d8 100%)`;

  const titleColor = hasBg ? "#ffffff" : DEEP;
  const subtitleColor = hasBg ? "rgba(255,255,255,0.8)" : accentColor;

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "26rem", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      {/* Background */}
      {hasBg
        ? <img src={heroImage!} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        : <div style={{ position: "absolute", inset: 0, background: bg }} />
      }
      {hasBg && <div style={{ position: "absolute", inset: 0, background: bg }} />}

      {/* Logo — top-center */}
      {showLogo && logo && (
        <div style={{ position: "absolute", top: "2.5rem", left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 1 }}>
          <img
            src={logo}
            alt={logoAlt ?? title}
            // eslint-disable-next-line @next/next/no-img-element
            style={{ height: "4.5rem", objectFit: "contain", filter: hasBg ? "brightness(0) invert(1)" : "none", opacity: 0.88 }}
          />
        </div>
      )}

      {/* Content — bottom-left */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "2.5rem 3.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
        }}
      >
        {/* Teal accent bar above title */}
        <div style={{ width: "2.5rem", height: "3px", backgroundColor: accentColor, borderRadius: "2px", marginBottom: "0.5rem", opacity: 0.8 }} />

        {/* Title */}
        <h1 style={{ fontFamily: headingFont, fontSize: "3rem", fontWeight: 300, color: titleColor, letterSpacing: "0.06em", margin: 0, lineHeight: 1, textShadow: hasBg ? "0 2px 20px rgba(0,0,0,0.5)" : "none" }}>
          {title}
        </h1>

        {/* Subtitle */}
        {showSubtitle && subtitle && (
          <p style={{ fontFamily: bodyFont, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: subtitleColor, margin: 0 }}>
            {subtitle}
          </p>
        )}

        {/* Welcome message */}
        {showWelcomeMessage && welcomeMessage && (
          <>
            <div style={{ marginTop: "0.75rem" }}>
              <OrnamentRule color={hasBg ? "rgba(255,255,255,0.5)" : accentColor} symbol="◈" opacity={0.5} />
            </div>
            <p style={{ fontFamily: headingFont, fontStyle: "italic", fontSize: "1.05rem", fontWeight: 300, color: hasBg ? "rgba(255,255,255,0.72)" : DEEP, opacity: 0.75, lineHeight: 1.75, maxWidth: "26rem", margin: "0.4rem 0 0" }}>
              {welcomeMessage}
            </p>
          </>
        )}

        {/* Chef message */}
        {showChefMessage && chefMessage && (
          <p style={{ fontFamily: bodyFont, fontStyle: "italic", fontSize: "0.8rem", color: hasBg ? "rgba(255,255,255,0.55)" : DEEP, opacity: 0.55, lineHeight: 1.8, maxWidth: "26rem", margin: "0.5rem 0 0" }}>
            {chefMessage}
          </p>
        )}
      </div>

      {/* Bottom accent bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(to right, transparent, ${accentColor}90, transparent)` }} />
    </div>
  );
}

// ── Public component ──────────────────────────────────────────────────────────

export function HeroSection({ variant, ...rest }: HeroSectionProps) {
  switch (variant) {
    case "cinematic-dark":
      return <CinematicDark {...rest} />;
    case "italian-warm":
      return <ItalianWarm {...rest} />;
    case "mediterranean-light":
      return <MediterraneanLight {...rest} />;
  }
}
