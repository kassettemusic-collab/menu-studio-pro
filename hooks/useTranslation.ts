import { useEditorStore } from "@/store/editorStore";
import { t } from "@/utils/translation";
import type { TranslationMap } from "@/types/project";

export const useTranslation = () => {
  const activeLanguage = useEditorStore((s) => s.activeLanguage);
  const previewLanguage = useEditorStore((s) => s.previewLanguage);

  return {
    activeLanguage,
    previewLanguage,
    translate: (map: TranslationMap | undefined, fallback = "") =>
      t(map, activeLanguage, fallback),
    translateForPreview: (map: TranslationMap | undefined, fallback = "") =>
      t(map, previewLanguage, fallback),
  };
};
