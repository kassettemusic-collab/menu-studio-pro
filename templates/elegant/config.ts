import type { TemplateDesign } from "@/types/template";
import type { TemplateVariant } from "@/types/template-variant";

export const elegantTemplate: TemplateDesign = {
  id: "elegant",
  name: "Elegant",
  description: "Tipografía serif clásica. Para restaurantes con identidad formal.",
  fonts: {
    heading: "Playfair Display, Georgia, serif",
    body: "Lora, Georgia, serif",
  },
  typography: {
    // Title — Cinzel: Roman inscription capitals, epitome of luxury
    titleFont: '"Cinzel", "Trajan Pro", Georgia, serif',
    // Categories — Cinzel 600; small-caps feel, timeless elegance
    categoryFont: '"Cinzel", "Trajan Pro", Georgia, serif',
    // Body — Crimson Text: beautiful oldstyle serif for extended reading
    bodyFont: '"Crimson Text", "Palatino Linotype", Georgia, serif',
    // Prices — Crimson Text 600 italic; refined, unobtrusive
    priceFont: '"Crimson Text", "Palatino Linotype", Georgia, serif',
  },
  spacing: {
    sectionGap: "3rem",
    itemGap: "1.25rem",
  },
  colors: {
    background: "#faf8f4",
    text: "#1c1917",
    accent: "#b45309",
  },
  layout: {
    showDescriptions: true,
    showCategorySeparators: true,
    showPrices: true,
  },
  background: {
    backgroundTexture: "aged-paper",
    overlayOpacity: 0.04,
  },
  capabilities: {
    supportsImages: false,
    supportsHeroSection: false,
    supportsChefMessage: true,
    supportsBackgroundTexture: true,
    supportsSocialLinks: false,
    supportsWelcomeMessage: true,
    supportsLogo: true,
    supportsFooter: true,
    supportsMultipleColumns: false,
  },
  variant: {
    theme: "light",
    typographyStyle: "serif-classic",
    decorationType: "ornamental",
    heroStyle: "none",
    priceStyle: "column-accent",
    categoryStyle: "centered-ornament",
    backgroundStyle: "texture-light",
  } satisfies TemplateVariant,
};
