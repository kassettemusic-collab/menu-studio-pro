"use client";

import { useProjectStore } from "@/store/project-store";

interface ColorFieldProps {
  label: string;
  description: string;
  value: string;
  defaultValue: string;
  onChange: (hex: string) => void;
  onReset: () => void;
}

function ColorField({ label, description, value, defaultValue, onChange, onReset }: ColorFieldProps) {
  const isCustom = value !== defaultValue;

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm font-medium leading-none">{label}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isCustom && (
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            title="Restablecer color por defecto"
          >
            Restablecer
          </button>
        )}

        {/* Color swatch + native picker */}
        <label
          className="relative cursor-pointer"
          title={`Cambiar ${label.toLowerCase()}`}
        >
          <span
            className="block w-8 h-8 rounded-md border-2 border-border shadow-sm transition-transform hover:scale-105"
            style={{ backgroundColor: value }}
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
            aria-label={label}
          />
        </label>

        {/* Hex input */}
        <input
          type="text"
          value={value}
          maxLength={7}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
          }}
          onBlur={(e) => {
            // Normalize: if incomplete, revert to current valid value
            if (!/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
              onChange(value);
            }
          }}
          className={[
            "w-20 rounded border px-2 py-1 text-xs font-mono",
            "bg-background border-border focus:outline-none focus:ring-1 focus:ring-ring",
            isCustom ? "text-foreground" : "text-muted-foreground",
          ].join(" ")}
          aria-label={`Valor hex de ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

const DEFAULT_PRIMARY = "#1a1a1a";
const DEFAULT_SECONDARY = "#c9a96e";

export function ColorSettings() {
  const { currentProject, updateBranding } = useProjectStore();
  const branding = currentProject.branding;

  const primaryColor = branding?.primaryColor ?? DEFAULT_PRIMARY;
  const secondaryColor = branding?.secondaryColor ?? DEFAULT_SECONDARY;

  return (
    <div className="space-y-4">
      <ColorField
        label="Color principal"
        description="Acento de encabezados, precios y separadores"
        value={primaryColor}
        defaultValue={DEFAULT_PRIMARY}
        onChange={(hex) => updateBranding({ primaryColor: hex })}
        onReset={() => updateBranding({ primaryColor: DEFAULT_PRIMARY })}
      />
      <ColorField
        label="Color secundario"
        description="Fondos de categorías y detalles complementarios"
        value={secondaryColor}
        defaultValue={DEFAULT_SECONDARY}
        onChange={(hex) => updateBranding({ secondaryColor: hex })}
        onReset={() => updateBranding({ secondaryColor: DEFAULT_SECONDARY })}
      />

      {/* Live preview swatch */}
      <div
        className="rounded-lg border border-border overflow-hidden"
        aria-label="Vista previa de colores"
      >
        <div className="h-6" style={{ backgroundColor: primaryColor }} />
        <div className="h-3" style={{ backgroundColor: secondaryColor }} />
      </div>
    </div>
  );
}
