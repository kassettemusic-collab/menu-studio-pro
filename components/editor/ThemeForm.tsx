"use client";

import { useProjectStore } from "@/store/project-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLOR_FIELDS: { key: keyof import("@/types/project").ThemeConfig; label: string }[] = [
  { key: "primaryColor", label: "Color primario" },
  { key: "accentColor", label: "Color de acento" },
  { key: "backgroundColor", label: "Fondo" },
  { key: "textColor", label: "Texto" },
];

export function ThemeForm() {
  const { currentProject, updateProject } = useProjectStore();
  const theme = currentProject.themeConfig;

  const updateTheme = (partial: Partial<typeof theme>) =>
    updateProject({ themeConfig: { ...theme, ...partial } });

  return (
    <div className="space-y-5">
      {COLOR_FIELDS.map(({ key, label }) => (
        <div key={key} className="space-y-1.5">
          <Label htmlFor={key}>{label}</Label>
          <div className="flex gap-2 items-center">
            <input
              id={key}
              type="color"
              value={theme[key] as string}
              onChange={(e) => updateTheme({ [key]: e.target.value })}
              className="h-9 w-9 cursor-pointer rounded border border-input bg-transparent p-0.5"
            />
            <Input
              value={theme[key] as string}
              onChange={(e) => updateTheme({ [key]: e.target.value })}
              className="font-mono text-sm"
            />
          </div>
        </div>
      ))}

      <div className="space-y-1.5">
        <Label>Espaciado</Label>
        <Select
          value={theme.spacing}
          onValueChange={(v) => {
            if (v != null) updateTheme({ spacing: v as typeof theme.spacing });
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="compact">Compacto</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="relaxed">Amplio</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
