// ── Format ─────────────────────────────────────────────────────────────────

export type ExportOrientation = "portrait" | "landscape";

export interface ExportFormat {
  /** Unique identifier used throughout the system */
  id: string;
  /** Human-readable label shown in the UI */
  name: string;
  /** Width in millimetres */
  width: number;
  /** Height in millimetres */
  height: number;
  orientation: ExportOrientation;
}

// ── Options ─────────────────────────────────────────────────────────────────

/** Screen = 72 dpi equivalent · print = 150 dpi · high-print = 300 dpi */
export type ExportQuality = "screen" | "print" | "high-print";

export interface ExportOptions {
  /** References an ExportFormat.id */
  formatId: string;
  quality: ExportQuality;
  /** Render the restaurant logo in the output */
  showLogo: boolean;
  /** Render the address / contact footer in the output */
  showFooter: boolean;
}

// ── Output ───────────────────────────────────────────────────────────────────
// Placeholder shape for when generators are implemented.

export type ExportOutputType = "pdf" | "png" | "jpg" | "svg";

export interface ExportResult {
  outputType: ExportOutputType;
  /** Blob URL or data URL of the generated file */
  url: string;
  /** Suggested filename for the download dialog */
  filename: string;
  sizeBytes: number;
}
