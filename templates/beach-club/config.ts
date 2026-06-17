import type { TemplateDesign } from "@/types/template";
import type { TemplateVariant } from "@/types/template-variant";

export const beachClubTemplate: TemplateDesign = {
  id: "beach-club",
  name: "Beach Club Mallorca",
  description: "Mediterráneo luminoso. Turquesa y blanco arena. Para beach clubs y chiringuitos premium.",
  fonts: {
    heading: '"Cormorant Garamond", "Playfair Display", "Didot", Georgia, serif',
    body: '"Raleway", "Gill Sans", "Trebuchet MS", sans-serif',
  },
  typography: {
    // Title — Cormorant Garamond 300 (light serif), airy and Mediterranean
    titleFont: '"Cormorant Garamond", "Didot", Georgia, serif',
    // Categories — Raleway 500 uppercase; clean modern sans creates serif/sans contrast
    categoryFont: '"Raleway", "Gill Sans", system-ui, sans-serif',
    // Body — Raleway 400; fresh, modern, highly legible at small sizes
    bodyFont: '"Raleway", "Gill Sans", system-ui, sans-serif',
    // Prices — Raleway 600 in teal; clean and contemporary
    priceFont: '"Raleway", "Gill Sans", system-ui, sans-serif',
  },
  spacing: {
    sectionGap: "3rem",
    itemGap: "0",
  },
  colors: {
    background: "#faf9f6",   // warm white sand
    text: "#1c2e2e",          // deep sea teal-black
    accent: "#0a9396",        // Mediterranean turquoise
  },
  layout: {
    showDescriptions: true,
    showCategorySeparators: true,
    showPrices: true,
  },
  background: {
    backgroundTexture: "sand",
    overlayOpacity: 0.035,
  },
  capabilities: {
    supportsImages: true,
    supportsHeroSection: true,
    supportsChefMessage: false,
    supportsBackgroundTexture: true,
    supportsSocialLinks: true,
    supportsWelcomeMessage: true,
    supportsLogo: true,
    supportsFooter: true,
    supportsMultipleColumns: true,
  },
  variant: {
    theme: "light",
    typographyStyle: "serif-light",
    decorationType: "wave",
    heroStyle: "mediterranean-light",
    priceStyle: "inline-accent",
    categoryStyle: "left-border-accent",
    backgroundStyle: "texture-light",
  } satisfies TemplateVariant,
};
