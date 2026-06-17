export enum ProjectType {
  menu = "menu",
  drinks = "drinks",
  wine = "wine",
  flyer = "flyer",
  poster = "poster",
}

export interface TranslationMap {
  [languageCode: string]: string;
}

export interface RestaurantInfo {
  name: string;
  tagline?: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tripadvisor?: string;
  };
}

export type LogoPosition = "top" | "center" | "left";

export interface BrandingConfig {
  // Visual assets
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;

  // Contact & web presence
  website?: string;
  instagram?: string;
  phone?: string;
  address?: string;

  // Multilingual welcome message shown on the cover / header
  welcomeMessage?: Record<string, string>;

  // Display flags
  showLogo: boolean;
  showRestaurantName: boolean;
  logoPosition: LogoPosition;
}

// ── Hero ────────────────────────────────────────────────────────────────────

/**
 * Configuration for the full-bleed hero / cover section.
 * Templates check TemplateCapabilities.supportsHeroSection before rendering.
 *
 * All text fields are TranslationMap (keyed by language code) so the hero
 * works correctly in multilingual menus.
 */
export interface HeroConfig {
  /** Display flag — hero section is visible in the output */
  showHero: boolean;

  /** Main headline, typically the restaurant name or a tagline */
  title: TranslationMap;

  /** Show the subtitle line below the title */
  showSubtitle: boolean;
  /** Supporting copy under the title (season, concept, opening hours…) */
  subtitle: TranslationMap;

  /**
   * Full-bleed background image for the hero.
   * Stored as a Data URL so it persists in localStorage without a backend.
   */
  heroImage?: string;

  /** Show the chef/owner message block */
  showChefMessage: boolean;
  /**
   * Editorial text attributed to the chef or owner.
   * Keyed by language code (same shape as TranslationMap but kept as
   * Record<string, string> for clarity at the UI layer).
   */
  chefMessage?: Record<string, string>;
}

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  restaurantInfo: RestaurantInfo;
  activeLanguages: string[];
  createdAt: string;
  updatedAt: string;
  templateId: string;
  themeConfig: ThemeConfig;
  /** Optional — undefined on projects created before branding support */
  branding?: BrandingConfig;
  /** Optional — undefined on projects created before hero support */
  hero?: HeroConfig;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontFamilyHeading: string;
  borderRadius: string;
  spacing: "compact" | "normal" | "relaxed";
}
