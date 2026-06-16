export enum ProjectType {
  menu = "menu",
  drinks = "drinks",
  wine = "wine",
  flyer = "flyer",
  poster = "poster",
}

export interface TranslationMap {
  [languageCode: string]: string;
}

export interface RestaurantInfo {
  name: string;
  tagline?: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tripadvisor?: string;
  };
}

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  restaurantInfo: RestaurantInfo;
  activeLanguages: string[];
  createdAt: string;
  updatedAt: string;
  templateId: string;
  themeConfig: ThemeConfig;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontFamilyHeading: string;
  borderRadius: string;
  spacing: "compact" | "normal" | "relaxed";
}
