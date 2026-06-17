"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/store/project-store";
import { ProjectType } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, MoreHorizontal, Pencil, Copy, Trash2, ChevronRight } from "lucide-react";

const TYPE_LABELS: Record<ProjectType, string> = {
  [ProjectType.menu]: "Carta",
  [ProjectType.drinks]: "Bebidas",
  [ProjectType.wine]: "Vinos",
  [ProjectType.flyer]: "Flyer",
  [ProjectType.poster]: "Cartel",
};

const TYPE_COLOR: Record<ProjectType, string> = {
  [ProjectType.menu]: "bg-amber-100 text-amber-800",
  [ProjectType.drinks]: "bg-blue-100 text-blue-800",
  [ProjectType.wine]: "bg-purple-100 text-purple-800",
  [ProjectType.flyer]: "bg-green-100 text-green-800",
  [ProjectType.poster]: "bg-rose-100 text-rose-800",
};

export default function ProjectsPage() {
  const router = useRouter();
  const {
    projects,
    allCategories,
    currentProjectId,
    createProject,
    duplicateProject,
    renameProject,
    deleteProject,
    setCurrentProject,
  } = useProjectStore();

  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openProject = (id: string) => {
    setCurrentProject(id);
    router.push("/editor");
  };

  const handleCreate = () => {
    const p = createProject();
    router.push("/editor");
    void p;
  };

  const handleDuplicate = (id: string) => {
    duplicateProject(id);
  };

  const handleRenameOpen = (id: string, currentName: string) => {
    setRenameId(id);
    setRenameValue(currentName);
  };

  const handleRenameConfirm = () => {
    if (renameId && renameValue.trim()) {
      renameProject(renameId, renameValue.trim());
    }
    setRenameId(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) deleteProject(deleteId);
    setDeleteId(null);
  };

  const sorted = [...projects].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-muted/20">
      {/* ── Top bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-8 h-14 border-b border-border bg-background">
        <span className="text-sm font-bold tracking-tight">Menu Studio Pro</span>
        <Button size="sm" onClick={handleCreate} className="gap-2 h-8">
          <Plus className="h-3.5 w-3.5" />
          Nuevo proyecto
        </Button>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Proyectos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {projects.length} proyecto{projects.length !== 1 ? "s" : ""} guardado{projects.length !== 1 ? "s" : ""} localmente
          </p>
        </div>

        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="rounded-full bg-muted w-16 h-16 flex items-center justify-center">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">No hay proyectos</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Crea tu primera carta para empezar.
              </p>
            </div>
            <Button onClick={handleCreate}>Crear proyecto</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((project) => {
              const cats = allCategories[project.id] ?? [];
              const itemCount = cats.reduce((n, c) => n + c.items.length, 0);
              const isActive = project.id === currentProjectId;
              const updated = new Date(project.updatedAt).toLocaleDateString("es-ES", {
                day: "numeric", month: "short", year: "numeric",
              });

              return (
                <div
                  key={project.id}
                  className={`group relative rounded-xl border bg-background transition-shadow hover:shadow-md ${
                    isActive ? "border-foreground/30 ring-1 ring-foreground/10" : "border-border"
                  }`}
                >
                  {/* Thumbnail area */}
                  <button
                    onClick={() => openProject(project.id)}
                    className="w-full text-left"
                    type="button"
                  >
                    <div className="h-36 rounded-t-xl bg-muted/40 flex items-center justify-center overflow-hidden border-b border-border">
                      {/* Mini preview */}
                      <div className="w-20 h-28 rounded border border-border bg-background shadow-sm flex flex-col p-2 gap-1">
                        <div
                          className="h-4 rounded-sm w-full"
                          style={{ backgroundColor: project.themeConfig.primaryColor }}
                        />
                        <div className="flex-1 space-y-0.5 pt-0.5">
                          {cats.slice(0, 3).map((c) => (
                            <div key={c.id} className="flex gap-1 items-center">
                              <div className="h-px flex-1 bg-muted-foreground/20" />
                              <div
                                className="h-0.5 w-3 rounded"
                                style={{ backgroundColor: project.themeConfig.accentColor }}
                              />
                              <div className="h-px flex-1 bg-muted-foreground/20" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-4 pt-3 pb-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold text-sm leading-snug truncate">
                            {project.restaurantInfo.name}
                          </p>
                          {project.restaurantInfo.tagline && (
                            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                              {project.restaurantInfo.tagline}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${TYPE_COLOR[project.type]}`}>
                          {TYPE_LABELS[project.type]}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {cats.length} cat · {itemCount} items
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Footer */}
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-[10px] text-muted-foreground">{updated}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openProject(project.id)}
                        className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        type="button"
                      >
                        Abrir <ChevronRight className="h-3 w-3" />
                      </button>

                      {/* Kebab menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem onClick={() => openProject(project.id)}>
                            <ChevronRight className="h-3.5 w-3.5 mr-2" />
                            Abrir
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRenameOpen(project.id, project.restaurantInfo.name)}
                          >
                            <Pencil className="h-3.5 w-3.5 mr-2" />
                            Renombrar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(project.id)}>
                            <Copy className="h-3.5 w-3.5 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setDeleteId(project.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {isActive && (
                    <div className="absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-foreground text-background">
                      Activo
                    </div>
                  )}
                </div>
              );
            })}

            {/* New project card */}
            <button
              onClick={handleCreate}
              className="rounded-xl border-2 border-dashed border-border hover:border-foreground/30 hover:bg-muted/20 transition-all h-full min-h-[200px] flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground group"
              type="button"
            >
              <div className="rounded-full border-2 border-current w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                <Plus className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Nuevo proyecto</span>
            </button>
          </div>
        )}
      </main>

      {/* ── Rename dialog */}
      <Dialog open={!!renameId} onOpenChange={(o) => !o && setRenameId(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Renombrar proyecto</DialogTitle>
          </DialogHeader>
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRenameConfirm()}
            autoFocus
            className="mt-1"
          />
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setRenameId(null)}>
              Cancelar
            </Button>
            <Button onClick={handleRenameConfirm} disabled={!renameValue.trim()}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete confirm dialog */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Eliminar proyecto</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Esta acción no se puede deshacer. El proyecto y todos sus datos se eliminarán.
          </p>
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
