// ── TemplateVariant ───────────────────────────────────────────────────────────
// Stylistic personality metadata for a template design.
// Does not affect rendering directly — consumed by editor UI, AI suggestion
// engines, and shared components that branch on visual style.

export type TemplateTheme = "light" | "dark";

/** Typography personality: weight, formality, and proportions. */
export type TemplateTypographyStyle =
  | "serif-classic"  // Bold serif headings, high contrast (Elegant)
  | "serif-light"    // Light-weight serif, generous whitespace (BeachClub)
  | "sans-bold"      // Heavy sans-serif, tight tracking (Modern)
  | "sans-light"     // Weight 300 sans, minimal (Minimal)
  | "mixed-warm";    // Serif heading + warm sans body (Coffee, Mediterranean, Pizza, Steakhouse)

/** Primary decorative motif used between sections and categories. */
export type TemplateDecorationType =
  | "ornamental"   // ✦ ★ ◆ — classic restaurant symbols
  | "botanical"    // 🌿 — Mediterranean, natural
  | "wave"         // ∿ — Beach Club
  | "geometric"    // Thick accent bars, right angles (Modern)
  | "minimal";     // Thin accent line only (Minimal)

/** Rendering style for the hero / cover section. */
export type TemplateHeroStyle =
  | "cinematic-dark"       // Dark overlay with gold bars (Steakhouse)
  | "mediterranean-light"  // Bright overlay, content anchored to bottom (BeachClub)
  | "parchment"            // Warm tone, bottom fade to cream (PizzaTrattoria)
  | "none";                // No hero section

/** How prices are positioned and styled relative to item names. */
export type TemplatePriceStyle =
  | "dotted-leader"   // Dotted line between name and price (Minimal)
  | "column-accent"   // Right-aligned column in accent color (Elegant, Steakhouse)
  | "inline-bold"     // Bold, inline far-right (Modern)
  | "inline-accent";  // Accent color, no leader (Mediterranean, Coffee, Pizza, BeachClub)

/** Category header visual style. */
export type TemplateCategoryStyle =
  | "small-caps-accent"   // Tiny uppercase in accent color (Minimal)
  | "centered-ornament"   // Centered with decorative rule below (Elegant)
  | "left-bar-rule"       // Left accent bar + horizontal divider (Modern)
  | "pill-badge"          // Pill/badge background (Coffee)
  | "centered-floral"     // Double rule with ornament, centered (PizzaTrattoria)
  | "band-serif"          // Full-width band with top/bottom rules (Steakhouse)
  | "left-border-accent"  // Left turquoise/accent border (BeachClub)
  | "centered-italic";    // Large italic accent color (Mediterranean)

/** Background treatment. */
export type TemplateBackgroundStyle =
  | "solid"           // No texture (Minimal, Modern)
  | "texture-light"   // Subtle light grain/pattern (Elegant, Mediterranean, Coffee, Pizza, BeachClub)
  | "texture-dark";   // Dark noise overlay (Steakhouse)

// ── Assembled variant ─────────────────────────────────────────────────────────

export interface TemplateVariant {
  /** Overall color theme. */
  theme: TemplateTheme;
  /** Typography personality. */
  typographyStyle: TemplateTypographyStyle;
  /** Decorative element style used for dividers and ornaments. */
  decorationType: TemplateDecorationType;
  /** Hero / cover section rendering style. */
  heroStyle: TemplateHeroStyle;
  /** Price display style relative to item names. */
  priceStyle: TemplatePriceStyle;
  /** Category header rendering style. */
  categoryStyle: TemplateCategoryStyle;
  /** Background treatment. */
  backgroundStyle: TemplateBackgroundStyle;
}
