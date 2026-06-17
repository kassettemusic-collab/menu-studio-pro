import type { TemplateDesign } from "@/types/template";
import type { TemplateVariant } from "@/types/template-variant";

export const modernTemplate: TemplateDesign = {
  id: "modern",
  name: "Modern",
  description: "Fuerte contraste, sans-serif bold. Estética urbana contemporánea.",
  fonts: {
    heading: "DM Sans, Inter, sans-serif",
    body: "DM Sans, Inter, sans-serif",
  },
  spacing: {
    sectionGap: "2rem",
    itemGap: "0.5rem",
  },
  colors: {
    background: "#0f0f0f",
    text: "#f5f5f5",
    accent: "#e11d48",
  },
  layout: {
    showDescriptions: false,
    showCategorySeparators: true,
    showPrices: true,
  },
  capabilities: {
    supportsImages: true,
    supportsHeroSection: true,
    supportsChefMessage: false,
    supportsBackgroundTexture: false,
    supportsSocialLinks: true,
    supportsWelcomeMessage: false,
    supportsLogo: true,
    supportsFooter: true,
    supportsMultipleColumns: true,
  },
  variant: {
    theme: "dark",
    typographyStyle: "sans-bold",
    decorationType: "geometric",
    heroStyle: "none",
    priceStyle: "inline-bold",
    categoryStyle: "left-bar-rule",
    backgroundStyle: "solid",
  } satisfies TemplateVariant,
};
