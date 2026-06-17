import type { TemplateDesign } from "@/types/template";
import type { TemplateVariant } from "@/types/template-variant";

export const mediterraneanTemplate: TemplateDesign = {
  id: "mediterranean",
  name: "Mediterranean",
  description: "Calidez mediterránea. Tonos tierra y tipografía amigable.",
  fonts: {
    heading: "Cormorant Garamond, Georgia, serif",
    body: "Source Sans 3, system-ui, sans-serif",
  },
  spacing: {
    sectionGap: "2.75rem",
    itemGap: "1rem",
  },
  colors: {
    background: "#fdf6ec",
    text: "#3b2a1a",
    accent: "#c9873a",
  },
  layout: {
    showDescriptions: true,
    showCategorySeparators: true,
    showPrices: true,
  },
  background: {
    backgroundTexture: "linen",
    overlayOpacity: 0.05,
  },
  capabilities: {
    supportsImages: true,
    supportsHeroSection: true,
    supportsChefMessage: true,
    supportsBackgroundTexture: true,
    supportsSocialLinks: true,
    supportsWelcomeMessage: true,
    supportsLogo: true,
    supportsFooter: true,
    supportsMultipleColumns: true,
  },
  variant: {
    theme: "light",
    typographyStyle: "mixed-warm",
    decorationType: "botanical",
    heroStyle: "none",
    priceStyle: "inline-accent",
    categoryStyle: "centered-italic",
    backgroundStyle: "texture-light",
  } satisfies TemplateVariant,
};
