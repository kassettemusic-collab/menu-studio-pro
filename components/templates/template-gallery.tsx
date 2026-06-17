"use client";

import { useState } from "react";
import { useProjectStore } from "@/store/project-store";
import { DESIGN_REGISTRY } from "@/templates/design-registry";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TemplateDesign } from "@/types/template";

// ── Category taxonomy ──────────────────────────────────────────────────────────

interface CategoryMeta {
  label: string;
  color: string; // hue for filter pill active state
}

const CATEGORY_MAP: Record<string, CategoryMeta> = {
  minimal:            { label: "Esencial",     color: "#64748b" },
  elegant:            { label: "Fine Dining",  color: "#b8924a" },
  modern:             { label: "Urbano",       color: "#3b82f6" },
  mediterranean:      { label: "Mediterráneo", color: "#0ea5e9" },
  coffee:             { label: "Café & Bar",   color: "#92400e" },
  "pizza-trattoria":  { label: "Italiana",     color: "#8b1a1a" },
  steakhouse:         { label: "Steakhouse",   color: "#c9a84c" },
  "beach-club":       { label: "Beach Club",   color: "#0a9396" },
};

function getMeta(id: string): CategoryMeta {
  return CATEGORY_MAP[id] ?? { label: "Personalizada", color: "#6b7280" };
}

// ── Luminance helper ──────────────────────────────────────────────────────────

function isDark(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b < 128;
}

// ── CSS-only faithful mini-preview ────────────────────────────────────────────

function TemplatePreview({ design }: { design: TemplateDesign }) {
  const { colors, fonts } = design;
  const dark = isDark(colors.background);
  const textHigh = dark ? `${colors.text}dd` : `${colors.text}bb`;
  const textLow  = dark ? `${colors.text}44` : `${colors.text}33`;
  const acc      = colors.accent;

  const isSteakhouse = design.id === "steakhouse";
  const isPizza      = design.id === "pizza-trattoria";
  const isBeach      = design.id === "beach-club";
  const isCoffee     = design.id === "coffee";
  const isElegant    = design.id === "elegant";

  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: colors.background,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        fontFamily: fonts.heading,
      }}
    >
      {/* ── Top identity stripe ── */}
      <div style={{ height: "3px", background: `linear-gradient(to right, ${acc}, ${acc}60)`, flexShrink: 0 }} />

      {/* ── Hero band ── */}
      {(isSteakhouse || isPizza || isBeach || isCoffee) ? (
        <div style={{
          height: isBeach ? "42%" : "34%",
          background: isSteakhouse
            ? `linear-gradient(160deg, #100c06 0%, ${colors.background} 130%)`
            : isPizza
            ? `linear-gradient(to bottom, ${acc}ee, ${colors.background})`
            : isBeach
            ? `linear-gradient(160deg, #b8e6e6 0%, #7dc5c5 100%)`
            : `linear-gradient(160deg, #2d1a0e 0%, ${colors.background} 130%)`,
          display: "flex",
          alignItems: isBeach ? "flex-end" : "center",
          justifyContent: "center",
          padding: "6px 10px",
          flexShrink: 0,
          position: "relative",
        }}>
          {/* Fade bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
            background: `linear-gradient(to top, ${colors.background}, transparent)`,
          }} />
          {/* Accent bottom bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "1.5px",
            background: `linear-gradient(to right, transparent, ${acc}80, transparent)`,
          }} />
          {/* Mock logo + title */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", width: "100%" }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "50%", border: `1.5px solid ${isSteakhouse ? acc : isPizza ? "rgba(255,255,255,0.7)" : acc}`, margin: "0 auto 4px", opacity: 0.85 }} />
            <div style={{ width: "52px", height: "5px", borderRadius: "2px", backgroundColor: isSteakhouse ? "#f5f0e8" : isPizza ? "rgba(255,255,255,0.9)" : textHigh, margin: "0 auto 3px", opacity: 0.8 }} />
            <div style={{ width: "36px", height: "2.5px", borderRadius: "1px", backgroundColor: acc, margin: "0 auto", opacity: 0.65 }} />
          </div>
        </div>
      ) : (
        /* Default centered header */
        <div style={{
          padding: "14px 10px 8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          flexShrink: 0,
          borderBottom: isElegant ? `0.5px solid ${acc}30` : "none",
        }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${acc}20`, border: `1.5px solid ${acc}45`, marginBottom: "2px" }} />
          <div style={{ width: "54px", height: "5px", borderRadius: "2px", backgroundColor: textHigh, opacity: 0.8 }} />
          {isElegant && <div style={{ width: "30px", height: "1px", backgroundColor: acc, opacity: 0.5, margin: "2px 0" }} />}
          <div style={{ width: "38px", height: "2.5px", borderRadius: "1px", backgroundColor: textLow }} />
        </div>
      )}

      {/* ── Category header sketch ── */}
      <div style={{ padding: "7px 10px 4px", flexShrink: 0 }}>
        {isBeach ? (
          <div style={{ borderLeft: `2px solid ${acc}`, paddingLeft: "5px" }}>
            <div style={{ width: "40px", height: "5px", borderRadius: "1px", backgroundColor: textHigh, opacity: 0.75 }} />
            <div style={{ width: "24px", height: "2px", borderRadius: "1px", backgroundColor: acc, opacity: 0.55, marginTop: "2px" }} />
          </div>
        ) : isSteakhouse ? (
          <div>
            <div style={{ height: "0.5px", background: `linear-gradient(to right, transparent, ${acc}50, transparent)`, marginBottom: "4px" }} />
            <div style={{ width: "42px", height: "6px", borderRadius: "1px", backgroundColor: textHigh, margin: "0 auto", opacity: 0.75 }} />
            <div style={{ height: "0.5px", background: `linear-gradient(to right, transparent, ${acc}30, transparent)`, marginTop: "4px" }} />
          </div>
        ) : isPizza ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center", marginBottom: "3px" }}>
              <div style={{ flex: 1, height: "0.5px", backgroundColor: acc, opacity: 0.3 }} />
              <div style={{ width: "32px", height: "2.5px", borderRadius: "1px", backgroundColor: acc, opacity: 0.5 }} />
              <div style={{ flex: 1, height: "0.5px", backgroundColor: acc, opacity: 0.3 }} />
            </div>
            <div style={{ width: "38px", height: "5px", borderRadius: "1px", backgroundColor: acc, margin: "0 auto", opacity: 0.65 }} />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "28px", height: "3px", borderRadius: "1px", backgroundColor: acc, opacity: 0.65 }} />
            <div style={{ flex: 1, height: "0.5px", backgroundColor: `${acc}25` }} />
          </div>
        )}
      </div>

      {/* ── Menu items sketch ── */}
      <div style={{ padding: "4px 10px 0", flex: 1, display: "flex", flexDirection: "column", gap: "5px", overflow: "hidden" }}>
        {isBeach ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
            {[0.9, 0.7, 0.85, 0.75].map((op, i) => (
              <div key={i} style={{ background: "#fff", border: `1px solid ${acc}18`, borderRadius: "4px", padding: "4px 5px" }}>
                <div style={{ width: "100%", height: "14px", borderRadius: "2px", backgroundColor: `${acc}18`, marginBottom: "3px" }} />
                <div style={{ width: `${55 * op}%`, height: "2.5px", borderRadius: "1px", backgroundColor: textHigh, opacity: 0.65 }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2px" }}>
                  <div style={{ width: "52%", height: "2px", borderRadius: "1px", backgroundColor: textLow }} />
                  <div style={{ width: "18%", height: "2px", borderRadius: "1px", backgroundColor: acc, opacity: 0.75 }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          [0.9, 0.72, 0.88, 0.65].map((w, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: "4px",
              paddingBottom: i < 3 ? "5px" : 0,
              borderBottom: i < 3 ? `0.5px solid ${acc}18` : "none",
            }}>
              <div>
                <div style={{ width: `${w * 100}%`, height: "3px", borderRadius: "1px", backgroundColor: textHigh, opacity: 0.65, marginBottom: "2px" }} />
                {i < 3 && <div style={{ width: `${w * 62}%`, height: "2px", borderRadius: "1px", backgroundColor: textLow }} />}
              </div>
              <div style={{ width: "20px", height: "2.5px", borderRadius: "1px", backgroundColor: acc, opacity: 0.65 }} />
            </div>
          ))
        )}
      </div>

      {/* ── Footer sketch ── */}
      <div style={{ padding: "5px 10px 7px", flexShrink: 0 }}>
        <div style={{ height: "0.5px", background: `linear-gradient(to right, transparent, ${acc}40, transparent)` }} />
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "4px" }}>
          {[22, 16, 28].map((w, i) => (
            <div key={i} style={{ width: `${w}px`, height: "1.5px", borderRadius: "1px", backgroundColor: textLow }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Category filter tabs ───────────────────────────────────────────────────────

const ALL_FILTER = "all";

function FilterTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  const categories = [
    { id: ALL_FILTER, label: "Todas" },
    ...Object.entries(CATEGORY_MAP).map(([id, m]) => ({ id, label: m.label })),
  ];

  // Deduplicate labels (multiple templates can share a category)
  const seen = new Set<string>();
  const tabs = categories.filter(({ id }) => {
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  return (
    <div className="flex gap-1.5 flex-wrap">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        const meta = tab.id !== ALL_FILTER ? getMeta(tab.id) : null;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={[
              "px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-150 border",
              isActive
                ? "border-transparent text-white shadow-sm"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
            ].join(" ")}
            style={isActive && meta ? { backgroundColor: meta.color, borderColor: meta.color } : isActive ? { backgroundColor: "#18181b", color: "#fff" } : {}}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Gallery card ──────────────────────────────────────────────────────────────

function GalleryCard({
  design,
  isActive,
  onSelect,
}: {
  design: TemplateDesign;
  isActive: boolean;
  onSelect: () => void;
}) {
  const meta = getMeta(design.id);
  const acc  = design.colors.accent;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      className="group relative flex flex-col rounded-xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px rgba(0,0,0,0.12), 0 0 0 ${isActive ? "2px" : "1px"} ${isActive ? acc : "rgba(0,0,0,0.08)"}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = isActive ? `0 0 0 2px ${acc}, 0 4px 20px ${acc}30` : "0 1px 3px rgba(0,0,0,0.06)";
      }}
      style={{
        boxShadow: isActive ? `0 0 0 2px ${acc}, 0 4px 20px ${acc}30` : "0 1px 3px rgba(0,0,0,0.06)",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        borderRadius: "12px",
        overflow: "hidden",
        background: "var(--card)",
      }}
    >
      {/* ── Active badge ── */}
      {isActive && (
        <div className="absolute top-2.5 left-2.5 z-20">
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-[10px] font-semibold shadow-lg"
            style={{ backgroundColor: acc }}
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Activa
          </div>
        </div>
      )}

      {/* ── Thumbnail — portrait 2:3 ── */}
      <div
        className="w-full flex-shrink-0 overflow-hidden"
        style={{ aspectRatio: "2 / 3" }}
      >
        <div
          className="w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ transformOrigin: "top center" }}
        >
          <TemplatePreview design={design} />
        </div>
      </div>

      {/* ── Card info ── */}
      <div className="p-3 flex flex-col gap-1.5 border-t border-border/60">
        {/* Name + category */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-[13px] font-semibold leading-snug text-foreground line-clamp-1">
            {design.name}
          </span>
          <span
            className="shrink-0 text-[9px] font-medium tracking-wider uppercase px-1.5 py-0.5 rounded-sm mt-px"
            style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
          >
            {meta.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
          {design.description}
        </p>

        {/* Capability dots */}
        <div className="flex items-center gap-1.5 mt-0.5">
          {design.capabilities.supportsHeroSection && (
            <span className="text-[9px] uppercase tracking-wide text-muted-foreground/55 border border-border/50 rounded-sm px-1.5 py-px">Hero</span>
          )}
          {design.capabilities.supportsImages && (
            <span className="text-[9px] uppercase tracking-wide text-muted-foreground/55 border border-border/50 rounded-sm px-1.5 py-px">Img</span>
          )}
          {design.capabilities.supportsSocialLinks && (
            <span className="text-[9px] uppercase tracking-wide text-muted-foreground/55 border border-border/50 rounded-sm px-1.5 py-px">Social</span>
          )}
          {/* Accent swatch */}
          <div className="ml-auto w-3 h-3 rounded-full border border-black/10 flex-shrink-0" style={{ backgroundColor: acc }} />
        </div>
      </div>
    </div>
  );
}

// ── Gallery dialog ────────────────────────────────────────────────────────────

export function TemplateGallery() {
  const { currentProject, updateProject } = useProjectStore();
  const [open, setOpen]     = useState(false);
  const [filter, setFilter] = useState<string>(ALL_FILTER);
  const selectedId          = currentProject.templateId;

  function handleSelect(id: string) {
    updateProject({ templateId: id });
    setOpen(false);
  }

  const filtered = filter === ALL_FILTER
    ? DESIGN_REGISTRY
    : DESIGN_REGISTRY.filter((d) => d.id === filter || getMeta(d.id).label === getMeta(filter).label);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline" size="sm" className="w-full text-[12px]" />}
      >
        Explorar plantillas
      </DialogTrigger>

      <DialogContent
        showCloseButton
        className="max-w-5xl w-full p-0 gap-0 overflow-hidden rounded-2xl"
        style={{ maxHeight: "90vh", display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-[15px] font-semibold tracking-tight">
                Galería de plantillas
              </DialogTitle>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {DESIGN_REGISTRY.length} diseños · elige el que mejor represente tu negocio
              </p>
            </div>
            {/* Active indicator */}
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pr-8">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {DESIGN_REGISTRY.find((d) => d.id === selectedId)?.name ?? "—"}
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-3">
            <FilterTabs active={filter} onChange={setFilter} />
          </div>
        </DialogHeader>

        {/* Grid */}
        <div className="overflow-y-auto flex-1 p-6">
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))" }}
          >
            {filtered.map((design) => (
              <GalleryCard
                key={design.id}
                design={design}
                isActive={selectedId === design.id}
                onSelect={() => handleSelect(design.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground text-[13px]">
              No hay plantillas en esta categoría.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
