import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { Project, ThemeConfig } from "@/types/project";
import type { Category, MenuItem } from "@/types/menu";
import { DEFAULT_THEME } from "@/constants/defaults";
import { DEFAULT_LANGUAGE } from "@/constants/languages";
import { generateId } from "@/utils/id";

interface ProjectState {
  projects: Project[];
  activeProjectId: string | null;

  // Project CRUD
  createProject: (partial: Omit<Project, "id" | "createdAt" | "updatedAt">) => Project;
  updateProject: (id: string, partial: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;

  // Derived helpers
  getActiveProject: () => Project | null;
}

interface CategoryState {
  categories: Record<string, Category[]>; // keyed by projectId

  addCategory: (projectId: string, category: Omit<Category, "id">) => Category;
  updateCategory: (projectId: string, categoryId: string, partial: Partial<Category>) => void;
  deleteCategory: (projectId: string, categoryId: string) => void;
  reorderCategories: (projectId: string, orderedIds: string[]) => void;
}

interface MenuItemState {
  addMenuItem: (projectId: string, categoryId: string, item: Omit<MenuItem, "id">) => MenuItem;
  updateMenuItem: (projectId: string, categoryId: string, itemId: string, partial: Partial<MenuItem>) => void;
  deleteMenuItem: (projectId: string, categoryId: string, itemId: string) => void;
  reorderMenuItems: (projectId: string, categoryId: string, orderedIds: string[]) => void;
}

type ProjectStore = ProjectState & CategoryState & MenuItemState;

const buildEmptyProject = (partial: Omit<Project, "id" | "createdAt" | "updatedAt">): Project => ({
  ...partial,
  id: generateId(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  themeConfig: partial.themeConfig ?? DEFAULT_THEME,
  activeLanguages: partial.activeLanguages ?? [DEFAULT_LANGUAGE],
});

export const useProjectStore = create<ProjectStore>()(
  devtools(
    persist(
      (set, get) => ({
        projects: [],
        activeProjectId: null,
        categories: {},

        // ── Project ────────────────────────────────────────────────────────
        createProject: (partial) => {
          const project = buildEmptyProject(partial);
          set((s) => ({
            projects: [...s.projects, project],
            categories: { ...s.categories, [project.id]: [] },
          }));
          return project;
        },

        updateProject: (id, partial) =>
          set((s) => ({
            projects: s.projects.map((p) =>
              p.id === id ? { ...p, ...partial, updatedAt: new Date().toISOString() } : p
            ),
          })),

        deleteProject: (id) =>
          set((s) => {
            const { [id]: _removed, ...rest } = s.categories;
            return {
              projects: s.projects.filter((p) => p.id !== id),
              categories: rest,
              activeProjectId: s.activeProjectId === id ? null : s.activeProjectId,
            };
          }),

        setActiveProject: (id) => set({ activeProjectId: id }),

        getActiveProject: () => {
          const { projects, activeProjectId } = get();
          return projects.find((p) => p.id === activeProjectId) ?? null;
        },

        // ── Categories ─────────────────────────────────────────────────────
        addCategory: (projectId, partial) => {
          const category: Category = { ...partial, id: generateId() };
          set((s) => ({
            categories: {
              ...s.categories,
              [projectId]: [...(s.categories[projectId] ?? []), category],
            },
          }));
          return category;
        },

        updateCategory: (projectId, categoryId, partial) =>
          set((s) => ({
            categories: {
              ...s.categories,
              [projectId]: (s.categories[projectId] ?? []).map((c) =>
                c.id === categoryId ? { ...c, ...partial } : c
              ),
            },
          })),

        deleteCategory: (projectId, categoryId) =>
          set((s) => ({
            categories: {
              ...s.categories,
              [projectId]: (s.categories[projectId] ?? []).filter((c) => c.id !== categoryId),
            },
          })),

        reorderCategories: (projectId, orderedIds) =>
          set((s) => {
            const cats = s.categories[projectId] ?? [];
            const sorted = orderedIds
              .map((id, i) => {
                const cat = cats.find((c) => c.id === id);
                return cat ? { ...cat, sortOrder: i } : null;
              })
              .filter(Boolean) as Category[];
            return { categories: { ...s.categories, [projectId]: sorted } };
          }),

        // ── Menu Items ─────────────────────────────────────────────────────
        addMenuItem: (projectId, categoryId, partial) => {
          const item: MenuItem = { ...partial, id: generateId() };
          set((s) => ({
            categories: {
              ...s.categories,
              [projectId]: (s.categories[projectId] ?? []).map((c) =>
                c.id === categoryId ? { ...c, items: [...c.items, item] } : c
              ),
            },
          }));
          return item;
        },

        updateMenuItem: (projectId, categoryId, itemId, partial) =>
          set((s) => ({
            categories: {
              ...s.categories,
              [projectId]: (s.categories[projectId] ?? []).map((c) =>
                c.id === categoryId
                  ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, ...partial } : i)) }
                  : c
              ),
            },
          })),

        deleteMenuItem: (projectId, categoryId, itemId) =>
          set((s) => ({
            categories: {
              ...s.categories,
              [projectId]: (s.categories[projectId] ?? []).map((c) =>
                c.id === categoryId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c
              ),
            },
          })),

        reorderMenuItems: (projectId, categoryId, orderedIds) =>
          set((s) => ({
            categories: {
              ...s.categories,
              [projectId]: (s.categories[projectId] ?? []).map((c) => {
                if (c.id !== categoryId) return c;
                const sorted = orderedIds
                  .map((id, i) => {
                    const item = c.items.find((it) => it.id === id);
                    return item ? { ...item, sortOrder: i } : null;
                  })
                  .filter(Boolean) as MenuItem[];
                return { ...c, items: sorted };
              }),
            },
          })),
      }),
      { name: "menu-studio-projects" }
    ),
    { name: "ProjectStore" }
  )
);
