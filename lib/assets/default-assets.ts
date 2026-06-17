import type { AssetDefinition } from "@/types/assets";

// ── Default asset catalogue ─────────────────────────────────────────────────
// Files live under /assets/{type}/ and are served as static assets by Next.js.
// Adding a new asset: append an entry here — nothing else needs to change.
//
// Paths are intentionally set to files that don't exist yet so the system
// compiles cleanly. Drop the actual files into the matching directory and
// the path will resolve automatically.

export const DEFAULT_ASSETS: AssetDefinition[] = [

  // ── Backgrounds ────────────────────────────────────────────────────────────

  {
    id: "bg-white",
    name: "Blanco puro",
    type: "background",
    path: "/assets/backgrounds/white.png",
    tags: ["background", "generic", "minimal", "light"],
    description: "Fondo blanco neutro. Compatible con todas las plantillas.",
    darkModeCompatible: false,
  },
  {
    id: "bg-cream",
    name: "Crema",
    type: "background",
    path: "/assets/backgrounds/cream.png",
    tags: ["background", "generic", "elegant", "warm", "light"],
    description: "Fondo crema suave. Ideal para plantillas elegantes y mediterráneas.",
    darkModeCompatible: false,
  },
  {
    id: "bg-dark-linen",
    name: "Lino oscuro",
    type: "background",
    path: "/assets/backgrounds/dark-linen.jpg",
    tags: ["background", "restaurant", "cafe", "cocktail", "dark"],
    description: "Fondo oscuro con textura de lino. Perfecto para menús premium.",
    darkModeCompatible: true,
  },
  {
    id: "bg-coffee-brown",
    name: "Marrón café",
    type: "background",
    path: "/assets/backgrounds/coffee-brown.jpg",
    tags: ["background", "cafe", "warm", "dark"],
    description: "Marrón profundo que evoca el ambiente de cafetería artesanal.",
    darkModeCompatible: true,
  },
  {
    id: "bg-slate",
    name: "Pizarra",
    type: "background",
    path: "/assets/backgrounds/slate.jpg",
    tags: ["background", "restaurant", "cocktail", "fast-food", "dark"],
    description: "Gris oscuro tipo pizarra. Versatile para menús modernos.",
    darkModeCompatible: true,
  },
  {
    id: "bg-marble-white",
    name: "Mármol blanco",
    type: "background",
    path: "/assets/backgrounds/marble-white.jpg",
    tags: ["background", "restaurant", "wine", "hotel", "elegant", "light"],
    description: "Mármol blanco Carrara. Para cartas de alta gama.",
    darkModeCompatible: false,
  },
  {
    id: "bg-kraft",
    name: "Papel kraft",
    type: "background",
    path: "/assets/backgrounds/kraft.jpg",
    tags: ["background", "cafe", "fast-food", "vegan", "warm", "light"],
    description: "Textura de papel kraft reciclado. Para marcas cercanas y artesanales.",
    darkModeCompatible: false,
  },

  // ── Textures (overlays / patterns) ─────────────────────────────────────────

  {
    id: "tex-noise-light",
    name: "Ruido sutil (claro)",
    type: "texture",
    path: "/assets/textures/noise-light.png",
    tags: ["texture", "generic", "overlay", "light"],
    description: "Capa de ruido sutil para dar profundidad a fondos claros.",
    darkModeCompatible: false,
  },
  {
    id: "tex-noise-dark",
    name: "Ruido sutil (oscuro)",
    type: "texture",
    path: "/assets/textures/noise-dark.png",
    tags: ["texture", "generic", "overlay", "dark"],
    description: "Capa de ruido sutil para fondos oscuros.",
    darkModeCompatible: true,
  },
  {
    id: "tex-linen",
    name: "Lino",
    type: "texture",
    path: "/assets/textures/linen.png",
    tags: ["texture", "restaurant", "cafe", "hotel", "warm"],
    description: "Textura de tela de lino. Añade calidez orgánica.",
  },
  {
    id: "tex-dots",
    name: "Puntos",
    type: "texture",
    path: "/assets/textures/dots.svg",
    tags: ["texture", "generic", "minimal", "pattern"],
    description: "Patrón de puntos geométrico. Para plantillas modernas.",
  },
  {
    id: "tex-grid",
    name: "Cuadrícula",
    type: "texture",
    path: "/assets/textures/grid.svg",
    tags: ["texture", "generic", "modern", "pattern"],
    description: "Cuadrícula fina. Útil como overlay en plantillas geométricas.",
  },
  {
    id: "tex-olives",
    name: "Ramas de olivo",
    type: "texture",
    path: "/assets/textures/olives-pattern.svg",
    tags: ["texture", "restaurant", "mediterranean", "vegan", "botanical"],
    description: "Patrón de ramas de olivo. Pensado para cartas mediterráneas.",
  },
  {
    id: "tex-botanica",
    name: "Botánica",
    type: "texture",
    path: "/assets/textures/botanica.svg",
    tags: ["texture", "restaurant", "cafe", "vegan", "botanical", "elegant"],
    description: "Motivos botánicos delicados para ambientes naturales y orgánicos.",
  },

  // ── Icons ───────────────────────────────────────────────────────────────────

  {
    id: "icon-fork-knife",
    name: "Tenedor y cuchillo",
    type: "icon",
    path: "/assets/icons/fork-knife.svg",
    tags: ["icon", "generic", "restaurant", "cutlery"],
    description: "Icono clásico de cubiertos. Para uso en encabezados o separadores.",
  },
  {
    id: "icon-wine-glass",
    name: "Copa de vino",
    type: "icon",
    path: "/assets/icons/wine-glass.svg",
    tags: ["icon", "wine", "cocktail", "restaurant", "drink"],
    description: "Copa de vino estilizada. Para cartas de vinos o bebidas.",
  },
  {
    id: "icon-coffee-cup",
    name: "Taza de café",
    type: "icon",
    path: "/assets/icons/coffee-cup.svg",
    tags: ["icon", "cafe", "drink"],
    description: "Taza de café con vapor. Para menús de cafetería.",
  },
  {
    id: "icon-leaf",
    name: "Hoja",
    type: "icon",
    path: "/assets/icons/leaf.svg",
    tags: ["icon", "vegan", "generic", "botanical"],
    description: "Icono de hoja. Marca opciones veganas o ecológicas.",
  },
  {
    id: "icon-star",
    name: "Estrella",
    type: "icon",
    path: "/assets/icons/star.svg",
    tags: ["icon", "generic", "featured", "rating"],
    description: "Estrella. Para marcar platos destacados o del chef.",
  },
  {
    id: "icon-flame",
    name: "Llama",
    type: "icon",
    path: "/assets/icons/flame.svg",
    tags: ["icon", "generic", "restaurant", "fast-food", "spicy"],
    description: "Llama. Indica platos picantes o cocinados a la brasa.",
  },
  {
    id: "icon-fish",
    name: "Pescado",
    type: "icon",
    path: "/assets/icons/fish.svg",
    tags: ["icon", "restaurant", "mediterranean", "seafood"],
    description: "Icono de pescado. Para secciones de pescados y mariscos.",
  },
  {
    id: "icon-wheat",
    name: "Trigo (gluten)",
    type: "icon",
    path: "/assets/icons/wheat.svg",
    tags: ["icon", "generic", "allergen", "gluten"],
    description: "Espiga de trigo. Señaliza presencia de gluten.",
  },

  // ── Placeholders ─────────────────────────────────────────────────────────

  {
    id: "placeholder-dish",
    name: "Plato genérico",
    type: "placeholder",
    path: "/assets/placeholders/dish.svg",
    tags: ["placeholder", "generic", "restaurant", "food"],
    description: "Placeholder para fotos de platos sin imagen asignada.",
  },
  {
    id: "placeholder-drink",
    name: "Bebida genérica",
    type: "placeholder",
    path: "/assets/placeholders/drink.svg",
    tags: ["placeholder", "generic", "drink", "cafe", "cocktail"],
    description: "Placeholder para bebidas sin imagen asignada.",
  },
  {
    id: "placeholder-logo",
    name: "Logo genérico",
    type: "placeholder",
    path: "/assets/placeholders/logo.svg",
    tags: ["placeholder", "generic", "branding"],
    description: "Placeholder para el logo del restaurante.",
  },
];
