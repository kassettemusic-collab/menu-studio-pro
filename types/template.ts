import type { ProjectType } from "./project";

export type PageOrientation = "portrait" | "landscape";
export type PageSize = "A4" | "A5" | "letter" | "custom";

export interface PageDimensions {
  width: number;
  height: number;
  unit: "mm" | "px" | "in";
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  supportedTypes: ProjectType[];
  orientation: PageOrientation;
  pageSize: PageSize;
  dimensions?: PageDimensions;
  defaultTheme: import("./project").ThemeConfig;
  slots: TemplateSlot[];
}

export interface TemplateSlot {
  id: string;
  type: "header" | "footer" | "category" | "item" | "image" | "text" | "logo";
  label: string;
  required: boolean;
  style?: Record<string, string>;
}
