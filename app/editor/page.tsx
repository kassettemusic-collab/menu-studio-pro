"use client";

import Link from "next/link";
import { EditorPanel } from "@/components/editor/editor-panel";
import { MenuPreview } from "@/components/preview/menu-preview";
import { useProjectStore } from "@/store/project-store";
import { ChevronLeft } from "lucide-react";

// Canvas background — warm gray "desk" that reads as a design-tool canvas
// regardless of app light/dark theme.
const CANVAS_BG = "#e8e6e1";

// Three-layer shadow that simulates paper resting on a surface:
// tight edge shadow + mid diffuse + large ambient
const PAPER_SHADOW = [
  "0 1px 1px rgba(0,0,0,0.04)",
  "0 3px 8px rgba(0,0,0,0.07)",
  "0 12px 32px rgba(0,0,0,0.09)",
  "0 32px 72px rgba(0,0,0,0.06)",
].join(", ");

export default function EditorPage() {
  const { currentProject } = useProjectStore();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* ── Top bar ───────────────────────────────────────── */}
      <header className="flex items-center justify-between px-4 h-11 border-b border-border shrink-0 bg-background z-10">
        <div className="flex items-center gap-1">
          <Link
            href="/projects"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mr-1"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Proyectos
          </Link>
          <span className="text-muted-foreground text-xs">/</span>
          <span className="text-xs font-medium truncate max-w-[220px] ml-1">
            {currentProject.restaurantInfo.name}
          </span>
        </div>
        <div className="flex items-center gap-3" />
      </header>

      {/* ── Main split ────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">

        {/* Left: Editor — 40% */}
        <aside className="w-[40%] min-w-[280px] max-w-[480px] shrink-0 h-full overflow-hidden">
          <EditorPanel />
        </aside>

        {/* Divider */}
        <div className="w-px bg-border shrink-0" />

        {/* Right: Preview — 60% */}
        <div className="flex flex-col flex-1 min-w-0">

          {/* ── Preview toolbar ──────────────────────────────── */}
          <div
            className="flex items-center justify-between px-5 shrink-0 border-b border-border bg-background"
            style={{ height: "38px" }}
          >
            {/* Left: label */}
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium select-none">
              Vista previa
            </span>

            {/* Right: format badge + language */}
            <div className="flex items-center gap-2.5">
              <span
                className="text-[9px] font-medium tracking-wider text-muted-foreground/50 border border-border/60 rounded px-1.5 py-px select-none"
                style={{ letterSpacing: "0.12em" }}
              >
                A4
              </span>
              <div className="w-px h-3 bg-border/60" />
              <span className="text-[10px] font-medium text-muted-foreground/60 select-none">
                {currentProject.activeLanguages[0]?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* ── Canvas ───────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto">
            <div
              className="min-h-full flex flex-col items-center"
              style={{
                background: CANVAS_BG,
                padding: "3.5rem 2.5rem 5rem",
              }}
            >
              {/* ── Paper sheet ──────────────────────────────── */}
              <div
                className="w-full overflow-hidden"
                style={{
                  // A4 proportions: 210×297mm → 1:1.4142
                  // At 640px width, min-height ≈ 905px
                  maxWidth: "640px",
                  minHeight: "905px",
                  background: "#ffffff",
                  borderRadius: "3px",
                  boxShadow: PAPER_SHADOW,
                  border: "1px solid rgba(0,0,0,0.07)",
                  // Smooth transition if theme changes
                  transition: "box-shadow 0.2s ease",
                }}
              >
                <MenuPreview />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
