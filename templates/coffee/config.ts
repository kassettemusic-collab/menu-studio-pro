import type { TemplateDesign } from "@/types/template";
import type { TemplateVariant } from "@/types/template-variant";

export const coffeeTemplate: TemplateDesign = {
  id: "coffee",
  name: "Coffee House",
  description: "Ambiente de cafetería artesanal. Cálido, íntimo y cercano.",
  fonts: {
    heading: "Libre Baskerville, Georgia, serif",
    body: "Nunito, system-ui, sans-serif",
  },
  typography: {
    // Title — Space Grotesk 600: geometric, Scandinavian, modern
    titleFont: '"Space Grotesk", "DM Sans", system-ui, sans-serif',
    // Categories — Space Grotesk 500 uppercase; minimalist Nordic clarity
    categoryFont: '"Space Grotesk", "DM Sans", system-ui, sans-serif',
    // Body — DM Sans 400: highly readable, clean, neutral
    bodyFont: '"DM Sans", system-ui, sans-serif',
    // Prices — DM Mono 400: tabular monospaced gives Nordic precision feel
    priceFont: '"DM Mono", "Courier New", monospace',
  },
  spacing: {
    sectionGap: "2rem",
    itemGap: "0.875rem",
  },
  colors: {
    background: "#2c1a0e",
    text: "#f5ebe0",
    accent: "#d4a853",
  },
  layout: {
    showDescriptions: true,
    showCategorySeparators: false,
    showPrices: true,
  },
  background: {
    backgroundTexture: "kraft",
    overlayOpacity: 0.08,
  },
  capabilities: {
    supportsImages: true,
    supportsHeroSection: false,
    supportsChefMessage: true,
    supportsBackgroundTexture: true,
    supportsSocialLinks: true,
    supportsWelcomeMessage: true,
    supportsLogo: true,
    supportsFooter: true,
    supportsMultipleColumns: false,
  },
  variant: {
    theme: "dark",
    typographyStyle: "mixed-warm",
    decorationType: "minimal",
    heroStyle: "none",
    priceStyle: "inline-accent",
    categoryStyle: "pill-badge",
    backgroundStyle: "texture-light",
  } satisfies TemplateVariant,
};
