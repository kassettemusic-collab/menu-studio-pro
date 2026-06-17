"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectForm } from "./ProjectForm";
import { ThemeForm } from "./ThemeForm";
import { CategoryList } from "./CategoryList";

export function EditorPanel() {
  return (
    <div className="flex flex-col h-full border-r border-border bg-background">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border shrink-0">
        <h2 className="text-sm font-semibold text-foreground">Editor</h2>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="proyecto" className="flex flex-col flex-1 min-h-0">
        <TabsList className="mx-4 mt-3 shrink-0 grid grid-cols-3 h-8">
          <TabsTrigger value="proyecto" className="text-xs">Proyecto</TabsTrigger>
          <TabsTrigger value="diseno" className="text-xs">Diseño</TabsTrigger>
          <TabsTrigger value="carta" className="text-xs">Carta</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-1">
            <TabsContent value="proyecto" className="mt-0">
              <ProjectForm />
            </TabsContent>
            <TabsContent value="diseno" className="mt-0">
              <ThemeForm />
            </TabsContent>
            <TabsContent value="carta" className="mt-0">
              <CategoryList />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
