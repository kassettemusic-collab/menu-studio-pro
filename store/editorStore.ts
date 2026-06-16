import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ExportOptions } from "@/types/export";
import { DEFAULT_EXPORT_OPTIONS } from "@/constants/defaults";

type EditorPanel = "properties" | "layers" | "templates" | "export" | null;

interface EditorStore {
  activeLanguage: string;
  previewLanguage: string;
  activePanel: EditorPanel;
  exportOptions: ExportOptions;
  isPreviewMode: boolean;
  zoom: number;

  setActiveLanguage: (lang: string) => void;
  setPreviewLanguage: (lang: string) => void;
  setActivePanel: (panel: EditorPanel) => void;
  setExportOptions: (options: Partial<ExportOptions>) => void;
  togglePreviewMode: () => void;
  setZoom: (zoom: number) => void;
}

export const useEditorStore = create<EditorStore>()(
  devtools(
    (set) => ({
      activeLanguage: "es",
      previewLanguage: "es",
      activePanel: "properties",
      exportOptions: DEFAULT_EXPORT_OPTIONS,
      isPreviewMode: false,
      zoom: 1,

      setActiveLanguage: (lang) => set({ activeLanguage: lang }),
      setPreviewLanguage: (lang) => set({ previewLanguage: lang }),
      setActivePanel: (panel) => set({ activePanel: panel }),
      setExportOptions: (options) =>
        set((s) => ({ exportOptions: { ...s.exportOptions, ...options } })),
      togglePreviewMode: () => set((s) => ({ isPreviewMode: !s.isPreviewMode })),
      setZoom: (zoom) => set({ zoom }),
    }),
    { name: "EditorStore" }
  )
);
