"use client";

import { useProjectStore } from "@/store/project-store";
import { DESIGN_REGISTRY } from "@/templates/design-registry";
import type { TemplateDesign } from "@/types/template";

// ── Mini preview ─────────────────────────────────────────────────────────────
// CSS-only thumbnail that uses the template's real colors so the user gets
// an immediate visual sense of each design before selecting it.

function MiniPreview({ design }: { design: TemplateDesign }) {
  const { colors } = design;
  const textFaint = `${colors.text}55`;
  const textMid   = `${colors.text}99`;
  const accentFaint = `${colors.accent}40`;

  return (
    <div
      style={{
        backgroundColor: colors.background,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: "10px 10px 8px",
        gap: "5px",
        boxSizing: "border-box",
      }}
    >
      {/* Simulated header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", marginBottom: "2px" }}>
        <div
          style={{
            width: "50%",
            height: "6px",
            backgroundColor: colors.text,
            opacity: 0.75,
            borderRadius: "1px",
          }}
        />
        <div
          style={{
            width: "28%",
            height: "2px",
            backgroundColor: colors.accent,
            opacity: 0.7,
            borderRadius: "1px",
          }}
        />
        <div
          style={{
            width: "35%",
            height: "2px",
            backgroundColor: textFaint,
            borderRadius: "1px",
          }}
        />
      </div>

      {/* Simulated category label */}
      <div style={{ height: "1px", backgroundColor: colors.accent, opacity: 0.3 }} />
      <div
        style={{
          width: "40%",
          height: "3px",
          backgroundColor: colors.accent,
          opacity: 0.6,
          borderRadius: "1px",
        }}
      />
      <div style={{ height: "1px", backgroundColor: colors.accent, opacity: 0.15 }} />

      {/* Simulated items */}
      {[70, 85, 60].map((w, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <div
            style={{
              flex: 1,
              height: "2.5px",
              backgroundColor: textMid,
              opacity: 0.6,
              borderRadius: "1px",
              maxWidth: `${w}%`,
            }}
          />
          <div style={{ flex: 1 }} />
          <div
            style={{
              width: "14%",
              height: "2.5px",
              backgroundColor: colors.accent,
              opacity: 0.6,
              borderRadius: "1px",
              flexShrink: 0,
            }}
          />
        </div>
      ))}

      {/* Second category hint */}
      <div style={{ marginTop: "3px", height: "1px", backgroundColor: accentFaint }} />
      <div
        style={{
          width: "30%",
          height: "3px",
          backgroundColor: colors.accent,
          opacity: 0.45,
          borderRadius: "1px",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        <div
          style={{
            width: "55%",
            height: "2px",
            backgroundColor: textFaint,
            borderRadius: "1px",
          }}
        />
        <div style={{ flex: 1 }} />
        <div
          style={{
            width: "12%",
            height: "2px",
            backgroundColor: colors.accent,
            opacity: 0.5,
            borderRadius: "1px",
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
}

// ── Template card ─────────────────────────────────────────────────────────────

function TemplateCard({
  design,
  selected,
  onSelect,
}: {
  design: TemplateDesign;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-full text-left rounded-lg border transition-all duration-150 overflow-hidden",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected
          ? "border-foreground ring-1 ring-foreground shadow-sm"
          : "border-border hover:border-foreground/40 hover:shadow-sm",
      ].join(" ")}
    >
      {/* Mini preview area */}
      <div className="w-full h-24 relative">
        <MiniPreview design={design} />
        {selected && (
          <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-foreground flex items-center justify-center">
            <svg
              viewBox="0 0 10 10"
              fill="none"
              className="w-2.5 h-2.5"
            >
              <path
                d="M2 5l2.5 2.5L8 3"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-2.5 py-2 border-t border-border/60 bg-background">
        <p className={`text-[12px] font-semibold leading-tight truncate ${selected ? "text-foreground" : "text-foreground/80"}`}>
          {design.name}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight line-clamp-2">
          {design.description}
        </p>
      </div>
    </button>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export function TemplatePicker() {
  const { currentProject, updateProject } = useProjectStore();
  const selectedId = currentProject.templateId;

  return (
    <div className="grid grid-cols-2 gap-2">
      {DESIGN_REGISTRY.map((design) => (
        <TemplateCard
          key={design.id}
          design={design}
          selected={selectedId === design.id}
          onSelect={() => updateProject({ templateId: design.id })}
        />
      ))}
    </div>
  );
}
