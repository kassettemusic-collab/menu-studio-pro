import type { Project } from "@/types/project";
import type { Category, MenuItem } from "@/types/menu";
import { MOCK_PROJECT, MOCK_CATEGORIES } from "@/lib/mock-project";
import { DEFAULT_THEME, DEFAULT_BRANDING, DEFAULT_HERO } from "@/constants/defaults";
import { ProjectType } from "@/types/project";
import { generateId } from "@/utils/id";
import { DEFAULT_DESIGN_ID } from "@/templates/design-registry";

// ── Factory ────────────────────────────────────────────────────────────────

export function createEmptyProject(overrides?: Partial<Project>): Project {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name: "Nuevo proyecto",
    type: ProjectType.menu,
    restaurantInfo: {
      name: "Nuevo restaurante",
      tagline: "",
      address: "",
      phone: "",
      email: "",
    },
    activeLanguages: ["es"],
    templateId: DEFAULT_DESIGN_ID,
    themeConfig: DEFAULT_THEME,
    branding: DEFAULT_BRANDING,
    hero: DEFAULT_HERO,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

export function createDefaultCategories(projectId: string): Category[] {
  return [];
}

// ── Duplication ────────────────────────────────────────────────────────────

export function duplicateProject(
  project: Project,
  categories: Category[]
): { project: Project; categories: Category[] } {
  const newProjectId = generateId();
  const now = new Date().toISOString();

  const newProject: Project = {
    ...project,
    id: newProjectId,
    name: buildCopyName(project.name),
    createdAt: now,
    updatedAt: now,
  };

  const newCategories: Category[] = categories.map((cat) => {
    const newCatId = generateId();
    const newItems: MenuItem[] = cat.items.map((item) => ({
      ...item,
      id: generateId(),
      categoryId: newCatId,
    }));
    return { ...cat, id: newCatId, projectId: newProjectId, items: newItems };
  });

  return { project: newProject, categories: newCategories };
}

// ── Naming helpers ─────────────────────────────────────────────────────────

export function buildCopyName(name: string): string {
  // "Foo (Copia)" → "Foo (Copia 2)"
  const copyPattern = /^(.*?)(?: \(Copia(?: (\d+))?\))?$/;
  const match = name.match(copyPattern);
  if (!match) return `${name} (Copia)`;

  const base = match[1];
  const n = match[2] ? parseInt(match[2], 10) : match[0].includes("(Copia)") ? 1 : 0;

  return n >= 1 ? `${base} (Copia ${n + 1})` : `${base} (Copia)`;
}

// ── Bootstrap ──────────────────────────────────────────────────────────────

export function buildInitialStore(): {
  projects: Project[];
  allCategories: Record<string, Category[]>;
  currentProjectId: string;
} {
  return {
    projects: [MOCK_PROJECT],
    allCategories: { [MOCK_PROJECT.id]: MOCK_CATEGORIES },
    currentProjectId: MOCK_PROJECT.id,
  };
}

// ── Derived helpers ────────────────────────────────────────────────────────

/** Resolve the active project and its categories from source-of-truth fields. */
export function resolveCurrent(
  projects: Project[],
  allCategories: Record<string, Category[]>,
  currentProjectId: string
): { currentProject: Project; categories: Category[] } {
  const found = projects.find((p) => p.id === currentProjectId);
  const currentProject = found ?? projects[0] ?? createEmptyProject();
  const categories = allCategories[currentProject.id] ?? [];
  return { currentProject, categories };
}
