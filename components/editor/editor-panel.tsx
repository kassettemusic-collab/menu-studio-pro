"use client";

import { useProjectStore } from "@/store/project-store";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RestaurantInfoEditor } from "./restaurant-info-editor";
import { CategoriesEditor } from "./categories-editor";
import { LogoSettings } from "@/components/branding/logo-settings";
import { ColorSettings } from "@/components/branding/color-settings";
import { ExportButton } from "./export-button";
import { TemplatePicker } from "./template-picker";
import { TemplateGallery } from "@/components/templates/template-gallery";
import { SUPPORTED_LANGUAGES } from "@/constants/languages";
import { ProjectType } from "@/types/project";

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  [ProjectType.menu]: "Carta de restaurante",
  [ProjectType.drinks]: "Carta de bebidas",
  [ProjectType.wine]: "Carta de vinos",
  [ProjectType.flyer]: "Flyer",
  [ProjectType.poster]: "Cartel",
};

// ── Section wrapper ─────────────────────────────────────────────────────────
function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline gap-2">
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </h3>
        {hint && (
          <span className="text-[10px] text-muted-foreground/60">{hint}</span>
        )}
      </div>
      {children}
    </section>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────
export function EditorPanel() {
  const { currentProject, categories } = useProjectStore();
  const { restaurantInfo, type, activeLanguages } = currentProject;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* ── Header */}
      <div className="px-5 py-4 border-b border-border shrink-0">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
          Panel de edición
        </p>
        <h2 className="text-sm font-semibold truncate leading-snug">
          {restaurantInfo.name || "Sin nombre"}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-6 space-y-6">

          {/* 1 · Restaurante */}
          <Section title="Información del negocio">
            <RestaurantInfoEditor />
          </Section>

          <Separator />

          {/* 2 · Tipo de proyecto */}
          <Section title="Tipo de proyecto">
            <div className="flex flex-wrap gap-1.5">
              {Object.values(ProjectType).map((pt) => (
                <Badge
                  key={pt}
                  variant={type === pt ? "default" : "outline"}
                  className="text-[11px] cursor-default"
                >
                  {PROJECT_TYPE_LABELS[pt]}
                </Badge>
              ))}
            </div>
          </Section>

          <Separator />

          {/* 3 · Idiomas */}
          <Section
            title="Idiomas activos"
            hint={`editando en ${SUPPORTED_LANGUAGES.find((l) => l.code === activeLanguages[0])?.nativeName ?? activeLanguages[0]}`}
          >
            <div className="flex flex-wrap gap-1.5">
              {SUPPORTED_LANGUAGES.map((l) => {
                const active = activeLanguages.includes(l.code);
                return (
                  <Badge
                    key={l.code}
                    variant={active ? "default" : "outline"}
                    className="text-[11px] cursor-default"
                  >
                    {l.nativeName}
                  </Badge>
                );
              })}
            </div>
          </Section>

          <Separator />

          {/* 3b · Branding */}
          <Section title="Logo y marca">
            <LogoSettings />
          </Section>

          <Separator />

          {/* 3c · Colores */}
          <Section title="Colores">
            <ColorSettings />
          </Section>

          <Separator />

          {/* 4 · Plantilla */}
          <Section title="Plantilla">
            <TemplateGallery />
            <div className="mt-3">
              <TemplatePicker />
            </div>
          </Section>

          <Separator />

          {/* 5 + 6 · Categorías y productos */}
          <Section
            title="Categorías y productos"
            hint={`${categories.length} categorías · ${categories.reduce((n, c) => n + c.items.length, 0)} productos`}
          >
            <CategoriesEditor />
          </Section>

          <Separator />

          {/* 7 · Exportar */}
          <Section title="Exportar">
            <ExportButton />
          </Section>

        </div>
      </div>
    </div>
  );
}
