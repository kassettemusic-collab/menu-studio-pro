import type { ThemeConfig } from "@/types/project";
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
  format: "pdf",
  quality: "high",
  languages: ["es"],
  includeBleed: false,
  bleedMm: 3,
  colorProfile: "rgb",
  dpi: 300,
};

export const CURRENCIES = ["EUR", "USD", "GBP", "MXN", "ARS", "COP", "CLP"] as const;
export const DEFAULT_CURRENCY = "EUR";
