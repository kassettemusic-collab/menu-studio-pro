"use client";

import { useProjectStore } from "@/store/project-store";
import { resolveDesign } from "@/templates/design-registry";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MediterraneanTemplate } from "@/components/templates/MediterraneanTemplate";
import { CoffeeTemplate } from "@/components/templates/CoffeeTemplate";
import { PizzaTrattoriaTemplate } from "@/components/templates/PizzaTrattoriaTemplate";
import { SteakhouseTemplate } from "@/components/templates/SteakhouseTemplate";
import { BeachClubTemplate } from "@/components/templates/BeachClubTemplate";
import type { TemplateProps } from "@/components/templates/types";

const TEMPLATE_MAP: Record<string, React.ComponentType<TemplateProps>> = {
  minimal: MinimalTemplate,
  elegant: ElegantTemplate,
  modern: ModernTemplate,
  mediterranean: MediterraneanTemplate,
  coffee: CoffeeTemplate,
  "pizza-trattoria": PizzaTrattoriaTemplate,
  steakhouse: SteakhouseTemplate,
  "beach-club": BeachClubTemplate,
};

export function MenuPreview() {
  const { currentProject, categories } = useProjectStore();
  const lang = currentProject.activeLanguages[0] ?? "es";

  const baseDesign = resolveDesign(currentProject.templateId);
  const Template = TEMPLATE_MAP[currentProject.templateId] ?? MinimalTemplate;

  // primaryColor overrides the template's accent color.
  // secondaryColor is available via project.branding for templates that opt in.
  const primaryColor = currentProject.branding?.primaryColor;
  const design = primaryColor
    ? { ...baseDesign, colors: { ...baseDesign.colors, accent: primaryColor } }
    : baseDesign;

  return (
    <div className="w-full min-h-full">
      <Template
        project={currentProject}
        categories={categories}
        design={design}
        lang={lang}
      />
    </div>
  );
}
