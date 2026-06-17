import { ProjectType } from "@/types/project";
import { DEFAULT_THEME } from "@/constants/defaults";
import type { TemplateCapabilities, TemplateConfig } from "@/types/template";

// ── Shared capability presets ───────────────────────────────────────────────
// Reuse across entries to keep the registry DRY.

const CAPS_BASIC: TemplateCapabilities = {
  supportsImages: false,
  supportsHeroSection: false,
  supportsChefMessage: false,
  supportsBackgroundTexture: false,
  supportsSocialLinks: false,
  supportsWelcomeMessage: true,
  supportsLogo: true,
  supportsFooter: true,
  supportsMultipleColumns: false,
};

const CAPS_RICH: TemplateCapabilities = {
  supportsImages: true,
  supportsHeroSection: true,
  supportsChefMessage: true,
  supportsBackgroundTexture: true,
  supportsSocialLinks: true,
  supportsWelcomeMessage: true,
  supportsLogo: true,
  supportsFooter: true,
  supportsMultipleColumns: true,
};

// ── Registry ────────────────────────────────────────────────────────────────

export const TEMPLATE_REGISTRY: TemplateConfig[] = [
  {
    id: "classic-menu",
    name: "Classic Menu",
    description: "Carta clásica elegante con categorías y precios",
    thumbnail: "/templates/classic-menu.png",
    supportedTypes: [ProjectType.menu, ProjectType.drinks],
    orientation: "portrait",
    pageSize: "A4",
    defaultTheme: DEFAULT_THEME,
    slots: [
      { id: "logo", type: "logo", label: "Logo", required: false },
      { id: "header", type: "header", label: "Cabecera", required: true },
      { id: "categories", type: "category", label: "Categorías", required: true },
      { id: "footer", type: "footer", label: "Pie de página", required: false },
    ],
    capabilities: {
      ...CAPS_BASIC,
      supportsChefMessage: true,
      supportsBackgroundTexture: true,
    },
  },
  {
    id: "wine-list",
    name: "Wine List",
    description: "Carta de vinos con regiones y maridajes",
    thumbnail: "/templates/wine-list.png",
    supportedTypes: [ProjectType.wine],
    orientation: "portrait",
    pageSize: "A4",
    defaultTheme: {
      ...DEFAULT_THEME,
      primaryColor: "#6b2737",
      accentColor: "#c4a35a",
      fontFamilyHeading: "Cormorant Garamond, serif",
    },
    slots: [
      { id: "logo", type: "logo", label: "Logo", required: false },
      { id: "header", type: "header", label: "Cabecera", required: true },
      { id: "wines", type: "category", label: "Vinos", required: true },
    ],
    capabilities: {
      ...CAPS_BASIC,
      supportsChefMessage: true,
      supportsBackgroundTexture: true,
      supportsMultipleColumns: true,
    },
  },
  {
    id: "daily-menu",
    name: "Menú del Día",
    description: "Menú diario compacto con primeros, segundos y postre",
    thumbnail: "/templates/daily-menu.png",
    supportedTypes: [ProjectType.menu],
    orientation: "portrait",
    pageSize: "A5",
    defaultTheme: DEFAULT_THEME,
    slots: [
      { id: "header", type: "header", label: "Cabecera", required: true },
      { id: "starters", type: "category", label: "Primeros", required: true },
      { id: "mains", type: "category", label: "Segundos", required: true },
      { id: "desserts", type: "category", label: "Postres", required: false },
      { id: "price", type: "text", label: "Precio menú", required: true },
    ],
    capabilities: CAPS_BASIC,
  },
  {
    id: "promo-flyer",
    name: "Promo Flyer",
    description: "Flyer promocional para eventos y ofertas",
    thumbnail: "/templates/promo-flyer.png",
    supportedTypes: [ProjectType.flyer],
    orientation: "portrait",
    pageSize: "A5",
    defaultTheme: DEFAULT_THEME,
    slots: [
      { id: "image", type: "image", label: "Imagen principal", required: true },
      { id: "headline", type: "text", label: "Titular", required: true },
      { id: "body", type: "text", label: "Cuerpo", required: false },
    ],
    capabilities: {
      ...CAPS_RICH,
      supportsChefMessage: false,
      supportsWelcomeMessage: false,
      supportsMultipleColumns: false,
    },
  },
  {
    id: "event-poster",
    name: "Event Poster",
    description: "Cartel para eventos y celebraciones",
    thumbnail: "/templates/event-poster.png",
    supportedTypes: [ProjectType.poster],
    orientation: "portrait",
    pageSize: "A4",
    defaultTheme: DEFAULT_THEME,
    slots: [
      { id: "image", type: "image", label: "Imagen de fondo", required: false },
      { id: "headline", type: "text", label: "Titular", required: true },
      { id: "details", type: "text", label: "Detalles", required: false },
    ],
    capabilities: {
      ...CAPS_RICH,
      supportsChefMessage: false,
      supportsWelcomeMessage: false,
      supportsSocialLinks: true,
    },
  },
];

export const getTemplateById = (id: string): TemplateConfig | undefined =>
  TEMPLATE_REGISTRY.find((t) => t.id === id);

export const getTemplatesByType = (type: ProjectType): TemplateConfig[] =>
  TEMPLATE_REGISTRY.filter((t) => t.supportedTypes.includes(type));
