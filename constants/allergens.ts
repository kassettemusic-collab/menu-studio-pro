import { Allergen } from "@/types/menu";

export interface AllergenMeta {
  id: Allergen;
  label: string;
  icon: string;
  color: string;
}

export const ALLERGENS_META: Record<Allergen, AllergenMeta> = {
  [Allergen.gluten]: { id: Allergen.gluten, label: "Gluten", icon: "🌾", color: "#f59e0b" },
  [Allergen.crustaceans]: { id: Allergen.crustaceans, label: "Crustáceos", icon: "🦐", color: "#ef4444" },
  [Allergen.eggs]: { id: Allergen.eggs, label: "Huevos", icon: "🥚", color: "#fbbf24" },
  [Allergen.fish]: { id: Allergen.fish, label: "Pescado", icon: "🐟", color: "#3b82f6" },
  [Allergen.peanuts]: { id: Allergen.peanuts, label: "Cacahuetes", icon: "🥜", color: "#b45309" },
  [Allergen.soy]: { id: Allergen.soy, label: "Soja", icon: "🫘", color: "#65a30d" },
  [Allergen.milk]: { id: Allergen.milk, label: "Lácteos", icon: "🥛", color: "#e0e7ff" },
  [Allergen.nuts]: { id: Allergen.nuts, label: "Frutos secos", icon: "🌰", color: "#92400e" },
  [Allergen.celery]: { id: Allergen.celery, label: "Apio", icon: "🥬", color: "#16a34a" },
  [Allergen.mustard]: { id: Allergen.mustard, label: "Mostaza", icon: "🌿", color: "#ca8a04" },
  [Allergen.sesame]: { id: Allergen.sesame, label: "Sésamo", icon: "🌱", color: "#d97706" },
  [Allergen.sulphites]: { id: Allergen.sulphites, label: "Sulfitos", icon: "🍷", color: "#7c3aed" },
  [Allergen.lupin]: { id: Allergen.lupin, label: "Altramuces", icon: "🌼", color: "#f472b6" },
  [Allergen.molluscs]: { id: Allergen.molluscs, label: "Moluscos", icon: "🦑", color: "#06b6d4" },
};
