import type { TemplateDesign } from "@/types/template";
import type { TemplateVariant } from "@/types/template-variant";

export const pizzaTrattoriaTemplate: TemplateDesign = {
  id: "pizza-trattoria",
  name: "Italian Trattoria",
  description: "Auténtica trattoria italiana. Pergamino, rojo profundo y tipografía serif con carácter.",
  fonts: {
    heading: "\"Cormorant Garamond\", Palatino, \"Book Antiqua\", serif",
    body: "\"EB Garamond\", Garamond, Palatino, Georgia, serif",
  },
  typography: {
    // Hero title — Cormorant Garamond display (weight 700) for maximum impact
    titleFont: "\"Cormorant Garamond\", Palatino, serif",
    // Categories — Cormorant Garamond, typically rendered italic at size 2rem
    categoryFont: "\"Cormorant Garamond\", Palatino, serif",
    // Body text — EB Garamond, authentic old-style for descriptions
    bodyFont: "\"EB Garamond\", Garamond, Georgia, serif",
    // Prices — EB Garamond at 0.92rem, weight 600; serif but compact
    priceFont: "\"EB Garamond\", Garamond, Georgia, serif",
  },
  spacing: {
    sectionGap: "2.75rem",
    itemGap: "0.6rem",
  },
  colors: {
    background: "#fdf6ed",   // warm parchment
    text: "#2b1810",         // deep espresso brown
    accent: "#8b1a1a",       // authentic Italian red
  },
  layout: {
    showDescriptions: true,
    showCategorySeparators: true,
    showPrices: true,
  },
  background: {
    backgroundTexture: "aged-paper",
    overlayOpacity: 0.07,
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
    decorationType: "ornamental",
    heroStyle: "parchment",
    priceStyle: "inline-accent",
    categoryStyle: "centered-floral",
    backgroundStyle: "texture-light",
  } satisfies TemplateVariant,
};
