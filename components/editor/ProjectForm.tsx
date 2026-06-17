"use client";

import { useProjectStore } from "@/store/project-store";
import { ProjectType } from "@/types/project";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SUPPORTED_LANGUAGES } from "@/constants/languages";

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  [ProjectType.menu]: "Carta de restaurante",
  [ProjectType.drinks]: "Carta de bebidas",
  [ProjectType.wine]: "Carta de vinos",
  [ProjectType.flyer]: "Flyer promocional",
  [ProjectType.poster]: "Cartel",
};

export function ProjectForm() {
  const { currentProject, updateProject } = useProjectStore();

  const toggleLanguage = (code: string) => {
    const langs = currentProject.activeLanguages;
    if (langs.includes(code)) {
      if (langs.length === 1) return; // at least one language required
      updateProject({ activeLanguages: langs.filter((l) => l !== code) });
    } else {
      updateProject({ activeLanguages: [...langs, code] });
    }
  };

  return (
    <div className="space-y-5">
      {/* Business name */}
      <div className="space-y-1.5">
        <Label htmlFor="business-name">Nombre del negocio</Label>
        <Input
          id="business-name"
          value={currentProject.restaurantInfo.name}
          onChange={(e) =>
            updateProject({
              restaurantInfo: {
                ...currentProject.restaurantInfo,
                name: e.target.value,
              },
            })
          }
        />
      </div>

      {/* Tagline */}
      <div className="space-y-1.5">
        <Label htmlFor="tagline">Eslogan</Label>
        <Input
          id="tagline"
          placeholder="Opcional"
          value={currentProject.restaurantInfo.tagline ?? undefined}
          onChange={(e) =>
            updateProject({
              restaurantInfo: {
                ...currentProject.restaurantInfo,
                tagline: e.target.value,
              },
            })
          }
        />
      </div>

      {/* Project type */}
      <div className="space-y-1.5">
        <Label>Tipo de proyecto</Label>
        <Select
          value={currentProject.type}
          onValueChange={(v) => { if (v != null) updateProject({ type: v as ProjectType }); }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ProjectType).map((type) => (
              <SelectItem key={type} value={type}>
                {PROJECT_TYPE_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active languages */}
      <div className="space-y-1.5">
        <Label>Idiomas activos</Label>
        <div className="flex flex-wrap gap-2 pt-1">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const active = currentProject.activeLanguages.includes(lang.code);
            return (
              <button
                key={lang.code}
                onClick={() => toggleLanguage(lang.code)}
                className="focus:outline-none"
                type="button"
              >
                <Badge
                  variant={active ? "default" : "outline"}
                  className="cursor-pointer select-none transition-colors"
                >
                  {lang.nativeName}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
