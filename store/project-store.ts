import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { Project, RestaurantInfo, BrandingConfig, HeroConfig } from "@/types/project";
import type { Category, MenuItem } from "@/types/menu";
import { generateId } from "@/utils/id";
import {
  buildInitialStore,
  createEmptyProject,
  createDefaultCategories,
  duplicateProject as duplicateProjectData,
  resolveCurrent,
} from "@/lib/project-utils";

// ── Types ──────────────────────────────────────────────────────────────────

interface ProjectStore {
  // Source of truth
  projects: Project[];
  allCategories: Record<string, Category[]>;
  currentProjectId: string;

  // Derived — kept in sync with currentProjectId after every mutation
  currentProject: Project;
  categories: Category[];

  // ── Project management ─────────────────────────────────────────────────
  createProject: (partial?: Partial<Project>) => Project;
  duplicateProject: (projectId: string) => Project;
  renameProject: (projectId: string, name: string) => void;
  deleteProject: (projectId: string) => void;
  setCurrentProject: (projectId: string) => void;

  // ── Current-project mutations (backward-compatible) ────────────────────
  setProject: (project: Project, categories?: Category[]) => void;
  updateProject: (partial: Partial<Project>) => void;
  updateRestaurantInfo: (partial: Partial<RestaurantInfo>) => void;
  updateBranding: (partial: Partial<BrandingConfig>) => void;
  updateHero: (partial: Partial<HeroConfig>) => void;
  addCategory: () => Category;
  updateCategory: (
    categoryId: string,
    partial: Partial<Omit<Category, "id" | "projectId" | "items">>
  ) => void;
  removeCategory: (categoryId: string) => void;
  addMenuItem: (categoryId: string) => MenuItem;
  updateMenuItem: (
    categoryId: string,
    itemId: string,
    partial: Partial<Omit<MenuItem, "id" | "categoryId">>
  ) => void;
  removeMenuItem: (categoryId: string, itemId: string) => void;
  resetProject: () => void;
}

// ── Persisted shape (no actions, no derived fields) ────────────────────────

type PersistedState = Pick<
  ProjectStore,
  "projects" | "allCategories" | "currentProjectId"
>;

// ── Internal helper ────────────────────────────────────────────────────────

/**
 * Returns a patch that keeps `currentProject` and `categories` in sync
 * with the current `currentProjectId`. Call at the end of every mutation.
 */
function syncDerived(
  projects: Project[],
  allCategories: Record<string, Category[]>,
  currentProjectId: string
) {
  return resolveCurrent(projects, allCategories, currentProjectId);
}

// ── Store ──────────────────────────────────────────────────────────────────

const initial = buildInitialStore();

export const useProjectStore = create<ProjectStore>()(
  devtools(
    persist(
      (set, get) => ({
        // ── Initial state ────────────────────────────────────────────────
        ...initial,
        ...resolveCurrent(initial.projects, initial.allCategories, initial.currentProjectId),

        // ── Project management ───────────────────────────────────────────
        createProject: (partial) => {
          const project = createEmptyProject(partial);
          const cats = createDefaultCategories(project.id);
          set((s) => {
            const projects = [...s.projects, project];
            const allCategories = { ...s.allCategories, [project.id]: cats };
            return {
              projects,
              allCategories,
              currentProjectId: project.id,
              ...syncDerived(projects, allCategories, project.id),
            };
          }, false, "createProject");
          return project;
        },

        duplicateProject: (projectId) => {
          const s = get();
          const source = s.projects.find((p) => p.id === projectId);
          if (!source) throw new Error(`Project ${projectId} not found`);
          const sourceCats = s.allCategories[projectId] ?? [];
          const { project, categories } = duplicateProjectData(source, sourceCats);
          set((st) => {
            const projects = [...st.projects, project];
            const allCategories = { ...st.allCategories, [project.id]: categories };
            return {
              projects,
              allCategories,
              currentProjectId: project.id,
              ...syncDerived(projects, allCategories, project.id),
            };
          }, false, "duplicateProject");
          return project;
        },

        renameProject: (projectId, name) =>
          set((s) => {
            const projects = s.projects.map((p) =>
              p.id === projectId
                ? { ...p, name, restaurantInfo: { ...p.restaurantInfo, name }, updatedAt: new Date().toISOString() }
                : p
            );
            return { projects, ...syncDerived(projects, s.allCategories, s.currentProjectId) };
          }, false, "renameProject"),

        deleteProject: (projectId) =>
          set((s) => {
            const projects = s.projects.filter((p) => p.id !== projectId);
            const { [projectId]: _removed, ...allCategories } = s.allCategories;

            // If we deleted the active project, pick the first remaining one.
            // If none left, bootstrap a fresh project.
            let currentProjectId = s.currentProjectId;
            if (currentProjectId === projectId) {
              if (projects.length === 0) {
                const fresh = createEmptyProject();
                const freshCats = createDefaultCategories(fresh.id);
                projects.push(fresh);
                allCategories[fresh.id] = freshCats;
                currentProjectId = fresh.id;
              } else {
                currentProjectId = projects[0].id;
              }
            }

            return {
              projects,
              allCategories,
              currentProjectId,
              ...syncDerived(projects, allCategories, currentProjectId),
            };
          }, false, "deleteProject"),

        setCurrentProject: (projectId) =>
          set((s) => ({
            currentProjectId: projectId,
            ...syncDerived(s.projects, s.allCategories, projectId),
          }), false, "setCurrentProject"),

        // ── Current-project mutations ────────────────────────────────────
        setProject: (project, categories = []) =>
          set((s) => {
            const projects = s.projects.some((p) => p.id === project.id)
              ? s.projects.map((p) => (p.id === project.id ? project : p))
              : [...s.projects, project];
            const allCategories = { ...s.allCategories, [project.id]: categories };
            return {
              projects,
              allCategories,
              currentProjectId: project.id,
              ...syncDerived(projects, allCategories, project.id),
            };
          }, false, "setProject"),

        updateProject: (partial) =>
          set((s) => {
            const projects = s.projects.map((p) =>
              p.id === s.currentProjectId
                ? { ...p, ...partial, id: p.id, updatedAt: new Date().toISOString() }
                : p
            );
            return { projects, ...syncDerived(projects, s.allCategories, s.currentProjectId) };
          }, false, "updateProject"),

        updateRestaurantInfo: (partial) =>
          set((s) => {
            const projects = s.projects.map((p) =>
              p.id === s.currentProjectId
                ? {
                    ...p,
                    restaurantInfo: { ...p.restaurantInfo, ...partial },
                    updatedAt: new Date().toISOString(),
                  }
                : p
            );
            return { projects, ...syncDerived(projects, s.allCategories, s.currentProjectId) };
          }, false, "updateRestaurantInfo"),

        updateBranding: (partial) =>
          set((s) => {
            const projects = s.projects.map((p) =>
              p.id === s.currentProjectId
                ? {
                    ...p,
                    branding: { ...p.branding, showLogo: false, showRestaurantName: true, logoPosition: "top" as const, ...p.branding, ...partial },
                    updatedAt: new Date().toISOString(),
                  }
                : p
            );
            return { projects, ...syncDerived(projects, s.allCategories, s.currentProjectId) };
          }, false, "updateBranding"),

        updateHero: (partial) =>
          set((s) => {
            const projects = s.projects.map((p) =>
              p.id === s.currentProjectId
                ? {
                    ...p,
                    hero: {
                      showHero: false,
                      title: {},
                      showSubtitle: false,
                      subtitle: {},
                      showChefMessage: false,
                      ...p.hero,
                      ...partial,
                    },
                    updatedAt: new Date().toISOString(),
                  }
                : p
            );
            return { projects, ...syncDerived(projects, s.allCategories, s.currentProjectId) };
          }, false, "updateHero"),

        addCategory: () => {
          const { currentProjectId, allCategories: ac, projects } = get();
          const existing = ac[currentProjectId] ?? [];
          const newCat: Category = {
            id: generateId(),
            projectId: currentProjectId,
            name: { es: "Nueva categoría" },
            description: { es: "" },
            sortOrder: existing.length,
            visible: true,
            items: [],
          };
          set((s) => {
            const allCategories = {
              ...s.allCategories,
              [s.currentProjectId]: [...(s.allCategories[s.currentProjectId] ?? []), newCat],
            };
            return { allCategories, ...syncDerived(s.projects, allCategories, s.currentProjectId) };
          }, false, "addCategory");
          return newCat;
        },

        updateCategory: (categoryId, partial) =>
          set((s) => {
            const allCategories = {
              ...s.allCategories,
              [s.currentProjectId]: (s.allCategories[s.currentProjectId] ?? []).map((c) =>
                c.id === categoryId ? { ...c, ...partial } : c
              ),
            };
            return { allCategories, ...syncDerived(s.projects, allCategories, s.currentProjectId) };
          }, false, "updateCategory"),

        removeCategory: (categoryId) =>
          set((s) => {
            const allCategories = {
              ...s.allCategories,
              [s.currentProjectId]: (s.allCategories[s.currentProjectId] ?? []).filter(
                (c) => c.id !== categoryId
              ),
            };
            return { allCategories, ...syncDerived(s.projects, allCategories, s.currentProjectId) };
          }, false, "removeCategory"),

        addMenuItem: (categoryId) => {
          const cats = get().allCategories[get().currentProjectId] ?? [];
          const cat = cats.find((c) => c.id === categoryId);
          const newItem: MenuItem = {
            id: generateId(),
            categoryId,
            name: { es: "Nuevo producto" },
            description: { es: "" },
            price: 0,
            currency: "EUR",
            allergens: { contains: [], mayContain: [] },
            tags: [],
            available: true,
            featured: false,
            sortOrder: cat?.items.length ?? 0,
          };
          set((s) => {
            const allCategories = {
              ...s.allCategories,
              [s.currentProjectId]: (s.allCategories[s.currentProjectId] ?? []).map((c) =>
                c.id === categoryId ? { ...c, items: [...c.items, newItem] } : c
              ),
            };
            return { allCategories, ...syncDerived(s.projects, allCategories, s.currentProjectId) };
          }, false, "addMenuItem");
          return newItem;
        },

        updateMenuItem: (categoryId, itemId, partial) =>
          set((s) => {
            const allCategories = {
              ...s.allCategories,
              [s.currentProjectId]: (s.allCategories[s.currentProjectId] ?? []).map((c) =>
                c.id === categoryId
                  ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, ...partial } : i)) }
                  : c
              ),
            };
            return { allCategories, ...syncDerived(s.projects, allCategories, s.currentProjectId) };
          }, false, "updateMenuItem"),

        removeMenuItem: (categoryId, itemId) =>
          set((s) => {
            const allCategories = {
              ...s.allCategories,
              [s.currentProjectId]: (s.allCategories[s.currentProjectId] ?? []).map((c) =>
                c.id === categoryId
                  ? { ...c, items: c.items.filter((i) => i.id !== itemId) }
                  : c
              ),
            };
            return { allCategories, ...syncDerived(s.projects, allCategories, s.currentProjectId) };
          }, false, "removeMenuItem"),

        resetProject: () =>
          set((s) => {
            const { projects, allCategories, currentProjectId } = buildInitialStore();
            // Replace current project with the mock; keep other projects intact
            const existing = s.projects.filter((p) => p.id !== s.currentProjectId);
            const merged = [...existing, ...projects];
            const mergedCats = { ...s.allCategories, ...allCategories };
            return {
              projects: merged,
              allCategories: mergedCats,
              currentProjectId,
              ...syncDerived(merged, mergedCats, currentProjectId),
            };
          }, false, "resetProject"),
      }),
      {
        name: "menu-studio-v3",
        storage: createJSONStorage(() => localStorage),
        partialize: (s): PersistedState => ({
          projects: s.projects,
          allCategories: s.allCategories,
          currentProjectId: s.currentProjectId,
        }),
        merge: (persisted, current) => {
          const p = persisted as Partial<PersistedState>;
          const projects = p.projects ?? current.projects;
          const allCategories = p.allCategories ?? current.allCategories;
          const currentProjectId = p.currentProjectId ?? current.currentProjectId;
          return {
            ...current,
            projects,
            allCategories,
            currentProjectId,
            ...resolveCurrent(projects, allCategories, currentProjectId),
          };
        },
        skipHydration: true,
      }
    ),
    { name: "ProjectStore" }
  )
);
