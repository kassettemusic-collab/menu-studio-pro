import type { TemplateDesign } from "@/types/template";
import type { TemplateVariant } from "@/types/template-variant";

export const minimalTemplate: TemplateDesign = {
  id: "minimal",
  name: "Minimal",
  description: "Diseño limpio sin adornos. Deja que el contenido respire.",
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },
  spacing: {
    sectionGap: "2.5rem",
    itemGap: "0.75rem",
  },
  colors: {
    background: "#ffffff",
    text: "#111111",
    accent: "#111111",
  },
  layout: {
    showDescriptions: true,
    showCategorySeparators: false,
    showPrices: true,
  },
  capabilities: {
    supportsImages: false,
    supportsHeroSection: false,
    supportsChefMessage: false,
    supportsBackgroundTexture: false,
    supportsSocialLinks: false,
    supportsWelcomeMessage: true,
    supportsLogo: true,
    supportsFooter: true,
    supportsMultipleColumns: false,
  },
  variant: {
    theme: "light",
    typographyStyle: "sans-light",
    decorationType: "minimal",
    heroStyle: "none",
    priceStyle: "dotted-leader",
    categoryStyle: "small-caps-accent",
    backgroundStyle: "solid",
  } satisfies TemplateVariant,
};
