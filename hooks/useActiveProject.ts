import { useProjectStore } from "@/store/projectStore";

export const useActiveProject = () => {
  const project = useProjectStore((s) => s.getActiveProject());
  const categories = useProjectStore((s) =>
    project ? (s.categories[project.id] ?? []) : []
  );
  const updateProject = useProjectStore((s) => s.updateProject);

  return { project, categories, updateProject };
};
