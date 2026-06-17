"use client";

import { useRef } from "react";
import { useProjectStore } from "@/store/project-store";
import type { LogoPosition } from "@/types/project";

const MAX_SIZE_MB = 2;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

// ── Small toggle pill ───────────────────────────────────────────────────────

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          "relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          checked ? "bg-primary" : "bg-input",
        ].join(" ")}
      >
        <span
          className={[
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg transition-transform",
            checked ? "translate-x-4" : "translate-x-0",
          ].join(" ")}
        />
      </button>
    </label>
  );
}

// ── Position selector ───────────────────────────────────────────────────────

const POSITIONS: { value: LogoPosition; label: string }[] = [
  { value: "top", label: "Arriba" },
  { value: "center", label: "Centro" },
  { value: "left", label: "Izquierda" },
];

// ── Main component ──────────────────────────────────────────────────────────

export function LogoSettings() {
  const { currentProject, updateBranding } = useProjectStore();
  const branding = currentProject.branding;

  const showLogo = branding?.showLogo ?? false;
  const showRestaurantName = branding?.showRestaurantName ?? true;
  const logoPosition: LogoPosition = branding?.logoPosition ?? "top";
  const logo = branding?.logo;

  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Solo se admiten archivos de imagen.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      alert(`El archivo supera el límite de ${MAX_SIZE_MB} MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (typeof dataUrl === "string") {
        updateBranding({ logo: dataUrl, showLogo: true });
      }
    };
    reader.readAsDataURL(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset so the same file can be re-selected after removal
    e.target.value = "";
  }

  function removeLogo() {
    updateBranding({ logo: undefined, showLogo: false });
  }

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleInputChange}
        aria-label="Subir logo"
      />

      {/* Logo upload area */}
      {logo ? (
        <div className="rounded-lg border border-border bg-muted/20 p-3 flex items-center gap-3">
          {/* Preview */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt="Logo del restaurante"
            className="h-14 w-14 object-contain rounded bg-white border border-border"
          />

          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">Logo cargado</p>
            <div className="flex gap-2 mt-1.5">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-xs text-primary hover:underline"
              >
                Reemplazar
              </button>
              <span className="text-muted-foreground/40 text-xs">·</span>
              <button
                type="button"
                onClick={removeLogo}
                className="text-xs text-destructive hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={[
            "w-full rounded-lg border-2 border-dashed border-border",
            "flex flex-col items-center justify-center gap-1.5 py-5",
            "text-muted-foreground hover:border-primary/50 hover:text-foreground",
            "transition-colors text-sm",
          ].join(" ")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>Subir logo</span>
          <span className="text-[11px] text-muted-foreground/60">PNG, SVG, JPG — máx. {MAX_SIZE_MB} MB</span>
        </button>
      )}

      {/* Visibility toggles */}
      <div className="space-y-2.5">
        <Toggle
          label="Mostrar logo"
          checked={showLogo}
          onChange={(v) => updateBranding({ showLogo: v })}
        />
        <Toggle
          label="Mostrar nombre del restaurante"
          checked={showRestaurantName}
          onChange={(v) => updateBranding({ showRestaurantName: v })}
        />
      </div>

      {/* Position */}
      {showLogo && logo && (
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">Posición del logo</p>
          <div className="grid grid-cols-3 gap-1.5">
            {POSITIONS.map((pos) => (
              <button
                key={pos.value}
                type="button"
                onClick={() => updateBranding({ logoPosition: pos.value })}
                className={[
                  "rounded border py-1.5 text-xs font-medium transition-colors",
                  logoPosition === pos.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50",
                ].join(" ")}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
