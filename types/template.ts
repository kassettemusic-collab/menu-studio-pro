import type { ProjectType } from "./project";
import type { TemplateVariant } from "./template-variant";

// ── Design-system template (content ≠ design) ─────────────────────────────

export interface TemplateFonts {
  /** Font stack for headings (category names, restaurant name) */
  heading: string;
  /** Font stack for body text (item names, descriptions, prices) */
  body: string;
}

/**
 * Granular typographic personality for a template.
 * All fields are optional — missing ones fall back to `fonts.heading` / `fonts.body`.
 *
 * Four roles:
 *   titleFont    — Restaurant name, hero headline (maximum visual impact)
 *   categoryFont — Section headers (identity of the menu)
 *   bodyFont     — Descriptions, welcome text, footer (readability)
 *   priceFont    — Price display (character, legibility at small sizes)
 */
export interface TemplateTypography {
  titleFont?: string;
  categoryFont?: string;
  bodyFont?: string;
  priceFont?: string;
}

/** Returns a fully resolved typography set, never undefined. */
export function resolveTypography(design: TemplateDesign): Required<TemplateTypography> {
  const t = design.typography;
  const h = design.fonts.heading;
  const b = design.fonts.body;
  return {
    titleFont:    t?.titleFont    ?? h,
    categoryFont: t?.categoryFont ?? h,
    bodyFont:     t?.bodyFont     ?? b,
    priceFont:    t?.priceFont    ?? b,
  };
}

export interface TemplateSpacing {
  /** Gap between category sections (e.g. "2rem") */
  sectionGap: string;
  /** Gap between individual items within a category */
  itemGap: string;
}

export interface TemplateColors {
  background: string;
  text: string;
  accent: string;
}

/**
 * Background and texture layering for a template.
 *
 * Rendering order (bottom to top):
 *   1. Solid `colors.background`
 *   2. `backgroundImage`  — cover-mode image (hero photo, custom upload)
 *   3. `backgroundTexture` — repeating pattern/grain overlay
 *   4. Template content
 *
 * Both `backgroundImage` and `backgroundTexture` accept either a built-in
 * key (e.g. "aged-paper") resolved by `lib/texture-css.ts`, or an absolute
 * URL / public path for an actual image file.
 */
export interface TemplateBackground {
  /** Cover-mode background image. Built-in key or URL. */
  backgroundImage?: string;
  /** Repeating grain / pattern overlay. Built-in key or URL. */
  backgroundTexture?: string;
  /** Opacity of the texture overlay (0–1). Defaults to 0.06. */
  overlayOpacity?: number;
}

export interface TemplateLayout {
  /** Show item descriptions below the name */
  showDescriptions: boolean;
  /** Render a visual separator (rule / ornament) between categories */
  showCategorySeparators: boolean;
  /** Show item prices */
  showPrices: boolean;
}

// ── Capabilities ─────────────────────────────────────────────────────────────
// Declares what optional features a template is designed to handle.
// UI panels use this to show/hide controls. Renderers use it to skip sections
// that the template has no visual support for.

export interface TemplateCapabilities {
  /** Template renders product images (cards, thumbnails, hero shots). */
  supportsImages: boolean;
  /** Template has a dedicated full-width hero / cover section. */
  supportsHeroSection: boolean;
  /** Template has a distinct chef's message or editorial text block. */
  supportsChefMessage: boolean;
  /** Template can apply a background texture or pattern overlay. */
  supportsBackgroundTexture: boolean;
  /** Template renders social media links (Instagram, web, etc.). */
  supportsSocialLinks: boolean;
  /** Template renders a multilingual welcome / intro message. */
  supportsWelcomeMessage: boolean;
  /** Template has a designated logo slot. */
  supportsLogo: boolean;
  /** Template renders an address / contact footer. */
  supportsFooter: boolean;
  /** Template can lay out items in two or more columns. */
  supportsMultipleColumns: boolean;
}

export interface TemplateDesign {
  id: string;
  name: string;
  description: string;
  fonts: TemplateFonts;
  /** Granular per-role typography. Overrides `fonts` for specific slots. */
  typography?: TemplateTypography;
  spacing: TemplateSpacing;
  colors: TemplateColors;
  layout: TemplateLayout;
  capabilities: TemplateCapabilities;
  /** Optional background layering. Undefined = solid color only. */
  background?: TemplateBackground;
  /** Stylistic personality metadata. Used by editor UI and shared components. */
  variant?: TemplateVariant;
}

export type PageOrientation = "portrait" | "landscape";
export type PageSize = "A4" | "A5" | "letter" | "custom";

export interface PageDimensions {
  width: number;
  height: number;
  unit: "mm" | "px" | "in";
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  supportedTypes: ProjectType[];
  orientation: PageOrientation;
  pageSize: PageSize;
  dimensions?: PageDimensions;
  defaultTheme: import("./project").ThemeConfig;
  slots: TemplateSlot[];
  capabilities: TemplateCapabilities;
}

export interface TemplateSlot {
  id: string;
  type: "header" | "footer" | "category" | "item" | "image" | "text" | "logo";
  label: string;
  required: boolean;
  style?: Record<string, string>;
}
