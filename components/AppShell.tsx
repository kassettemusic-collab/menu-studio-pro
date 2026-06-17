"use client";

import { EditorPanel } from "./editor/EditorPanel";
import { PreviewPanel } from "./preview/PreviewPanel";

export function AppShell() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 h-12 border-b border-border bg-background shrink-0 z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-tight">Menu Studio Pro</span>
          <span className="text-muted-foreground text-xs">/ Restaurante Mediterráneo</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Beta
          </span>
        </div>
      </header>

      {/* Main split layout */}
      <main className="flex flex-1 min-h-0">
        <aside className="w-80 shrink-0">
          <EditorPanel />
        </aside>
        <div className="flex-1 min-w-0">
          <PreviewPanel />
        </div>
      </main>
    </div>
  );
}
