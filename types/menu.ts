import type { TranslationMap } from "./project";

export enum Allergen {
  gluten = "gluten",
  crustaceans = "crustaceans",
  eggs = "eggs",
  fish = "fish",
  peanuts = "peanuts",
  soy = "soy",
  milk = "milk",
  nuts = "nuts",
  celery = "celery",
  mustard = "mustard",
  sesame = "sesame",
  sulphites = "sulphites",
  lupin = "lupin",
  molluscs = "molluscs",
}

export interface Allergens {
  contains: Allergen[];
  mayContain: Allergen[];
}

export interface MenuItemVariant {
  id: string;
  label: TranslationMap;
  price: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: TranslationMap;
  description: TranslationMap;
  price: number;
  currency: string;
  variants?: MenuItemVariant[];
  allergens: Allergens;
  tags: string[];
  image?: string;
  available: boolean;
  featured: boolean;
  sortOrder: number;
}

export interface Category {
  id: string;
  projectId: string;
  name: TranslationMap;
  description: TranslationMap;
  image?: string;
  sortOrder: number;
  visible: boolean;
  items: MenuItem[];
}
