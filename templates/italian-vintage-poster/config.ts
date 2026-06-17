import type { TemplateDesign } from "@/types/template";
import type { TemplateVariant } from "@/types/template-variant";

export const italianVintagePosterTemplate: TemplateDesign = {
  id: "italian-vintage-poster",
  name: "Italian Vintage Poster",
  description: "Póster gastronómico italiano. Ilustraciones botánicas, tipografía de imprenta, estética artesanal premium.",
  fonts: {
    heading: "\"Cormorant Garamond\", Palatino, \"Book Antiqua\", serif",
    body: "\"EB Garamond\", Garamond, Palatino, Georgia, serif",
  },
  typography: {
    titleFont: "\"Cormorant Garamond\", Palatino, serif",
    categoryFont: "\"Cormorant Garamond\", Palatino, serif",
    bodyFont: "\"EB Garamond\", Garamond, Georgia, serif",
    priceFont: "\"EB Garamond\", Garamond, Georgia, serif",
  },
  spacing: {
    sectionGap: "3rem",
    itemGap: "0.7rem",
  },
  colors: {
    background: "#F7EDD4",
    text: "#1C0F08",
    accent: "#5A1A1A",
  },
  layout: {
    showDescriptions: true,
    showCategorySeparators: true,
    showPrices: true,
  },
  background: {
    backgroundTexture: "aged-paper",
    overlayOpacity: 0.05,
  },
  capabilities: {
    supportsImages: false,
    supportsHeroSection: true,
    supportsChefMessage: true,
    supportsBackgroundTexture: true,
    supportsSocialLinks: true,
    supportsWelcomeMessage: true,
    supportsLogo: true,
    supportsFooter: true,
    supportsMultipleColumns: false,
  },
  variant: {
    theme: "light",
    typographyStyle: "mixed-warm",
    decorationType: "botanical",
    heroStyle: "parchment",
    priceStyle: "dotted-leader",
    categoryStyle: "centered-ornament",
    backgroundStyle: "texture-light",
  } satisfies TemplateVariant,
};
