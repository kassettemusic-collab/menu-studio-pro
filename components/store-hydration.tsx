"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/store/project-store";

/**
 * Triggers Zustand persist rehydration from localStorage after mount.
 * Must be rendered inside the client tree, above any component that reads the store.
 * Renders nothing — pure side-effect.
 */
export function StoreHydration() {
  useEffect(() => {
    useProjectStore.persist.rehydrate();
  }, []);

  return null;
}
