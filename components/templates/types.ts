import type { Project } from "@/types/project";
import type { Category } from "@/types/menu";
import type { TemplateDesign } from "@/types/template";

export interface TemplateProps {
  project: Project;
  categories: Category[];
  design: TemplateDesign;
  /** Active language for rendering translations */
  lang: string;
}
