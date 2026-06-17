import type { ExportFormat } from "@/types/export";

// ── Format definitions ──────────────────────────────────────────────────────
// All dimensions in millimetres (ISO 216).
// Adding a new format: append an entry here — nothing else needs to change.

export const EXPORT_FORMATS: ExportFormat[] = [
  {
    id: "a4-portrait",
    name: "A4 Vertical",
    width: 210,
    height: 297,
    orientation: "portrait",
  },
  {
    id: "a4-landscape",
    name: "A4 Horizontal",
    width: 297,
    height: 210,
    orientation: "landscape",
  },
  {
    id: "a3-portrait",
    name: "A3 Vertical",
    width: 297,
    height: 420,
    orientation: "portrait",
  },
  {
    id: "instagram-story",
    name: "Instagram Story",
    // 9:16 at 72 dpi ≈ 101.6 × 180.6 mm
    width: 101.6,
    height: 180.6,
    orientation: "portrait",
  },
];

// ── Lookup helpers ──────────────────────────────────────────────────────────

export const EXPORT_FORMATS_MAP = new Map<string, ExportFormat>(
  EXPORT_FORMATS.map((f) => [f.id, f])
);

export function resolveExportFormat(id: string): ExportFormat {
  return EXPORT_FORMATS_MAP.get(id) ?? EXPORT_FORMATS[0];
}

export const DEFAULT_FORMAT_ID = EXPORT_FORMATS[0].id;
