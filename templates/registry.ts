import { ProjectType } from "@/types/project";
import { DEFAULT_THEME } from "@/constants/defaults";
import type { TemplateConfig } from "@/types/template";

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
  },
];

export const getTemplateById = (id: string): TemplateConfig | undefined =>
  TEMPLATE_REGISTRY.find((t) => t.id === id);

export const getTemplatesByType = (type: ProjectType): TemplateConfig[] =>
  TEMPLATE_REGISTRY.filter((t) => t.supportedTypes.includes(type));
