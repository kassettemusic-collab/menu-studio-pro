"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuPreview } from "./MenuPreview";

export function PreviewPanel() {
  return (
    <div className="flex flex-col h-full bg-muted/30">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border shrink-0 bg-background">
        <h2 className="text-sm font-semibold text-foreground">Vista previa</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <MenuPreview />
        </div>
      </ScrollArea>
    </div>
  );
}
