import { ProjectType } from "@/types/project";
import { Allergen } from "@/types/menu";
import type { Project } from "@/types/project";
import type { Category } from "@/types/menu";
import { DEFAULT_THEME, DEFAULT_BRANDING } from "@/constants/defaults";

// ── Helpers ────────────────────────────────────────────────────────────────

const es = (text: string) => ({ es: text });

// ── Logo placeholder (SVG inline) ─────────────────────────────────────────
// Círculo doble con tipografía serif clásica italiana.

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
  <circle cx="80" cy="80" r="76" fill="none" stroke="#8B1A1A" stroke-width="2.5"/>
  <circle cx="80" cy="80" r="68" fill="none" stroke="#8B1A1A" stroke-width="0.8"/>
  <text x="80" y="62" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8B1A1A" letter-spacing="5" font-weight="normal">LA</text>
  <text x="80" y="88" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#8B1A1A" font-weight="bold" letter-spacing="1">Trattoria</text>
  <text x="80" y="108" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#8B1A1A" letter-spacing="7">ROMA</text>
  <line x1="30" y1="116" x2="130" y2="116" stroke="#8B1A1A" stroke-width="0.8" opacity="0.5"/>
  <text x="80" y="128" text-anchor="middle" font-family="Georgia, serif" font-size="7.5" fill="#8B1A1A" letter-spacing="3" opacity="0.6">DAL 1984</text>
</svg>`;

const LOGO_DATA_URL = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString("base64")}`;

// ── Categories & items ────────────────────────────────────────────────────

export const MOCK_CATEGORIES: Category[] = [
  // ── ANTIPASTI ─────────────────────────────────────────────────────────────
  {
    id: "cat-antipasti",
    projectId: "project-trattoria-roma",
    name: es("Antipasti"),
    description: es("Para abrir el apetito"),
    sortOrder: 0,
    visible: true,
    items: [
      {
        id: "item-bruschetta",
        categoryId: "cat-antipasti",
        name: es("Bruschetta al Pomodoro"),
        description: es("Pan de masa madre tostado con tomate cherry, ajo, albahaca fresca y aceite de oliva virgen extra."),
        price: 8.5,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten], mayContain: [] },
        tags: ["vegetariano"],
        available: true,
        featured: false,
        sortOrder: 0,
      },
      {
        id: "item-carpaccio",
        categoryId: "cat-antipasti",
        name: es("Carpaccio di Manzo"),
        description: es("Finas láminas de buey crudo, rúcula, lascas de parmesano 24 meses y alcaparras."),
        price: 14.0,
        currency: "EUR",
        allergens: { contains: [Allergen.milk], mayContain: [] },
        tags: ["estrella", "sin-gluten"],
        available: true,
        featured: true,
        sortOrder: 1,
      },
      {
        id: "item-burrata",
        categoryId: "cat-antipasti",
        name: es("Burrata della Casa"),
        description: es("Burrata cremosa con tomates cherry asados, pesto de albahaca y reducción de balsámico de Módena."),
        price: 12.5,
        currency: "EUR",
        allergens: { contains: [Allergen.milk], mayContain: [] },
        tags: ["vegetariano"],
        available: true,
        featured: false,
        sortOrder: 2,
      },
      {
        id: "item-prosciutto",
        categoryId: "cat-antipasti",
        name: es("Tagliere di Salumi"),
        description: es("Tabla de embutidos italianos: prosciutto di Parma 18 meses, salame Milano, mortadela y grissini."),
        price: 16.0,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten], mayContain: [] },
        tags: ["para-compartir"],
        available: true,
        featured: false,
        sortOrder: 3,
      },
    ],
  },

  // ── PIZZAS ────────────────────────────────────────────────────────────────
  {
    id: "cat-pizzas",
    projectId: "project-trattoria-roma",
    name: es("Pizzas"),
    description: es("Horno de leña · Masa de 48h"),
    sortOrder: 1,
    visible: true,
    items: [
      {
        id: "item-margherita",
        categoryId: "cat-pizzas",
        name: es("Margherita"),
        description: es("Tomate San Marzano D.O.P., mozzarella fior di latte, albahaca fresca y aceite de oliva."),
        price: 14.0,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.milk], mayContain: [] },
        tags: ["vegetariano", "clásico"],
        available: true,
        featured: false,
        sortOrder: 0,
      },
      {
        id: "item-diavola",
        categoryId: "cat-pizzas",
        name: es("Diavola"),
        description: es("Tomate, mozzarella, salame piccante napolitano y guindilla. El calor de Nápoles en cada bocado."),
        price: 16.0,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.milk], mayContain: [] },
        tags: ["estrella", "picante"],
        available: true,
        featured: true,
        sortOrder: 1,
      },
      {
        id: "item-quattro-formaggi",
        categoryId: "cat-pizzas",
        name: es("Quattro Formaggi"),
        description: es("Mozzarella, gorgonzola DOP, provolone piccante y parmesano reggiano. Para los amantes del queso."),
        price: 17.5,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.milk], mayContain: [] },
        tags: ["vegetariano"],
        available: true,
        featured: false,
        sortOrder: 2,
      },
      {
        id: "item-tartufo",
        categoryId: "cat-pizzas",
        name: es("Tartufo Nero"),
        description: es("Base de crema de trufa negra, mozzarella, champiñones porcini y aceite de trufa del Piamonte."),
        price: 22.0,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.milk], mayContain: [] },
        tags: ["premium", "vegetariano", "estrella"],
        available: true,
        featured: true,
        sortOrder: 3,
      },
      {
        id: "item-prosciutto-rucola",
        categoryId: "cat-pizzas",
        name: es("Prosciutto e Rucola"),
        description: es("Base blanca, mozzarella, prosciutto di Parma, rúcula fresca y parmesano en lascas."),
        price: 18.5,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.milk], mayContain: [] },
        tags: [],
        available: true,
        featured: false,
        sortOrder: 4,
      },
    ],
  },

  // ── PASTAS ────────────────────────────────────────────────────────────────
  {
    id: "cat-pastas",
    projectId: "project-trattoria-roma",
    name: es("Pastas"),
    description: es("Elaboración propia · Recetas de la nonna"),
    sortOrder: 2,
    visible: true,
    items: [
      {
        id: "item-carbonara",
        categoryId: "cat-pastas",
        name: es("Carbonara Classica"),
        description: es("Rigatoni con guanciale crujiente, yema de huevo, pecorino romano y pimienta negra recién molida."),
        price: 15.0,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.eggs, Allergen.milk], mayContain: [] },
        tags: ["clásico", "estrella"],
        available: true,
        featured: true,
        sortOrder: 0,
      },
      {
        id: "item-cacio-pepe",
        categoryId: "cat-pastas",
        name: es("Cacio e Pepe"),
        description: es("Spaghetti alla chitarra con pecorino romano D.O.P. y pimienta negra de Sarawak. La más romana de todas."),
        price: 14.0,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.milk], mayContain: [] },
        tags: ["vegetariano", "clásico"],
        available: true,
        featured: false,
        sortOrder: 1,
      },
      {
        id: "item-amatriciana",
        categoryId: "cat-pastas",
        name: es("Amatriciana"),
        description: es("Bucatini con guanciale, tomate San Marzano, pecorino y un toque de vino blanco seco."),
        price: 15.5,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.milk, Allergen.sulphites], mayContain: [] },
        tags: ["clásico"],
        available: true,
        featured: false,
        sortOrder: 2,
      },
      {
        id: "item-tagliatelle-ragu",
        categoryId: "cat-pastas",
        name: es("Tagliatelle al Ragù Bolognese"),
        description: es("Tagliatelle de huevo con ragù lento de ternera y cerdo, sofrito de verduras y vino tinto."),
        price: 16.0,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.eggs, Allergen.milk, Allergen.sulphites], mayContain: [] },
        tags: ["estrella"],
        available: true,
        featured: false,
        sortOrder: 3,
      },
      {
        id: "item-gnocchi",
        categoryId: "cat-pastas",
        name: es("Gnocchi al Pomodoro"),
        description: es("Gnocchi de patata artesanos con salsa de tomate fresco, basílico y un velo de burrata."),
        price: 14.5,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.milk], mayContain: [] },
        tags: ["vegetariano"],
        available: true,
        featured: false,
        sortOrder: 4,
      },
    ],
  },

  // ── POSTRES ───────────────────────────────────────────────────────────────
  {
    id: "cat-postres",
    projectId: "project-trattoria-roma",
    name: es("Dolci"),
    description: es("El final perfetto"),
    sortOrder: 3,
    visible: true,
    items: [
      {
        id: "item-tiramisu",
        categoryId: "cat-postres",
        name: es("Tiramisù della Nonna"),
        description: es("Receta original de 1984. Mascarpone, savoiardi empapados en espresso, cacao Valrhona y huevo."),
        price: 8.5,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.eggs, Allergen.milk], mayContain: [] },
        tags: ["clásico", "estrella"],
        available: true,
        featured: true,
        sortOrder: 0,
      },
      {
        id: "item-panna-cotta",
        categoryId: "cat-postres",
        name: es("Panna Cotta al Limoncello"),
        description: es("Panna cotta suave con coulis de frutos rojos y un toque de limoncello de Amalfi."),
        price: 7.0,
        currency: "EUR",
        allergens: { contains: [Allergen.milk], mayContain: [] },
        tags: ["vegetariano", "sin-gluten"],
        available: true,
        featured: false,
        sortOrder: 1,
      },
      {
        id: "item-cannoli",
        categoryId: "cat-postres",
        name: es("Cannoli Siciliani"),
        description: es("Barquillos crujientes rellenos al momento de ricotta con naranja confitada y chips de chocolate."),
        price: 8.0,
        currency: "EUR",
        allergens: { contains: [Allergen.gluten, Allergen.milk, Allergen.eggs], mayContain: [Allergen.nuts] },
        tags: ["clásico"],
        available: true,
        featured: false,
        sortOrder: 2,
      },
      {
        id: "item-gelato",
        categoryId: "cat-postres",
        name: es("Gelato Artigianale"),
        description: es("Dos bolas a elegir: pistacho de Sicilia, stracciatella, limón de Amalfi o fior di latte."),
        price: 6.5,
        currency: "EUR",
        allergens: { contains: [Allergen.milk], mayContain: [Allergen.nuts] },
        tags: ["vegetariano", "sin-gluten"],
        available: true,
        featured: false,
        sortOrder: 3,
      },
    ],
  },
];

// ── Project ────────────────────────────────────────────────────────────────

export const MOCK_PROJECT: Project = {
  id: "project-trattoria-roma",
  name: "La Trattoria Roma",
  type: ProjectType.menu,
  restaurantInfo: {
    name: "La Trattoria Roma",
    tagline: "Auténtica cocina italiana desde 1984",
    address: "Via della Cucina, 12 · Roma, Italia",
    phone: "+39 06 1234 5678",
    email: "ciao@lattrattoriaroma.it",
    website: "www.latrattoriaroma.it",
    socialLinks: {
      instagram: "@latrattoriaroma",
    },
  },
  activeLanguages: ["es"],
  templateId: "pizza-trattoria",
  themeConfig: {
    ...DEFAULT_THEME,
    primaryColor: "#8B1A1A",
    secondaryColor: "#c9a96e",
    backgroundColor: "#fdf8f0",
    textColor: "#2c1810",
  },
  branding: {
    ...DEFAULT_BRANDING,
    logo: LOGO_DATA_URL,
    showLogo: true,
    showRestaurantName: true,
    logoPosition: "top",
    primaryColor: "#8B1A1A",
    secondaryColor: "#c9a96e",
    website: "www.latrattoriaroma.it",
    instagram: "@latrattoriaroma",
    phone: "+39 06 1234 5678",
    address: "Via della Cucina, 12 · Roma",
    welcomeMessage: {
      es: "Cucina è amore. Cada plato es una carta de amor a la tradición italiana escrita por tres generaciones de nuestra familia.",
    },
  },
  hero: {
    showHero: true,
    title: {
      es: "La Trattoria Roma",
    },
    showSubtitle: true,
    subtitle: {
      es: "Dal 1984 · Auténtica cucina italiana",
    },
    showChefMessage: true,
    chefMessage: {
      es: "Mi nonna me enseñó que la mejor cocina italiana no necesita trucos: solo ingredientes honestos, tiempo y mucho amor. Desde 1984 cocinamos así, y así seguiremos.",
    },
  },
  createdAt: "2024-03-10T09:00:00.000Z",
  updatedAt: "2024-03-10T09:00:00.000Z",
};
