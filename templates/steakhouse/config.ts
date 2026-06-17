import type { TemplateDesign } from "@/types/template";
import type { TemplateVariant } from "@/types/template-variant";

export const steakhouseTemplate: TemplateDesign = {
  id: "steakhouse",
  name: "Steakhouse Premium",
  description: "Fondo oscuro, detalles dorados. Para restaurantes de carne de alta gama.",
  fonts: {
    heading: '"Playfair Display", "Book Antiqua", Georgia, serif',
    body: '"Libre Baskerville", Georgia, "Times New Roman", serif',
  },
  typography: {
    // Title — Playfair Display 900 (ultra-bold display) for commanding presence
    titleFont: '"Playfair Display", "Book Antiqua", Georgia, serif',
    // Categories — Playfair Display 700 uppercase; strong, aristocratic
    categoryFont: '"Playfair Display", "Book Antiqua", Georgia, serif',
    // Body — Libre Baskerville: premium, readable, upscale print feel
    bodyFont: '"Libre Baskerville", Georgia, serif',
    // Prices — Playfair Display 600 in gold; the price as a statement
    priceFont: '"Playfair Display", "Book Antiqua", Georgia, serif',
  },
  spacing: {
    sectionGap: "2.75rem",
    itemGap: "0.25rem",
  },
  colors: {
    background: "#0e0c0a",   // near-black, warm undertone
    text: "#f0ede8",          // warm off-white
    accent: "#c9a84c",        // rich gold
  },
  layout: {
    showDescriptions: true,
    showCategorySeparators: true,
    showPrices: true,
  },
  background: {
    backgroundTexture: "noise-dark",
    overlayOpacity: 0.035,
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
    supportsMultipleColumns: false,
  },
  variant: {
    theme: "dark",
    typographyStyle: "mixed-warm",
    decorationType: "ornamental",
    heroStyle: "cinematic-dark",
    priceStyle: "column-accent",
    categoryStyle: "band-serif",
    backgroundStyle: "texture-dark",
  } satisfies TemplateVariant,
};
