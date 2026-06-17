import type { ThemeConfig, BrandingConfig, HeroConfig } from "@/types/project";
import type { ExportOptions } from "@/types/export";

export const DEFAULT_THEME: ThemeConfig = {
  primaryColor: "#1a1a1a",
  secondaryColor: "#f5f5f0",
  accentColor: "#c9a96e",
  backgroundColor: "#ffffff",
  textColor: "#1a1a1a",
  fontFamily: "Inter, sans-serif",
  fontFamilyHeading: "Playfair Display, serif",
  borderRadius: "4px",
  spacing: "normal",
};

export const DEFAULT_EXPORT_OPTIONS: ExportOptions = {
  formatId: "a4-portrait",
  quality: "print",
  showLogo: true,
  showFooter: true,
};

export const DEFAULT_BRANDING: BrandingConfig = {
  showLogo: false,
  showRestaurantName: true,
  logoPosition: "top",
};

export const DEFAULT_HERO: HeroConfig = {
  showHero: false,
  title: {},
  showSubtitle: false,
  subtitle: {},
  showChefMessage: false,
};

export const CURRENCIES = ["EUR", "USD", "GBP", "MXN", "ARS", "COP", "CLP"] as const;
export const DEFAULT_CURRENCY = "EUR";
