export type ExportFormat = "pdf" | "png" | "jpg" | "svg";
export type ExportQuality = "draft" | "standard" | "high" | "print";

export interface ExportOptions {
  format: ExportFormat;
  quality: ExportQuality;
  languages: string[];
  includeBleed: boolean;
  bleedMm: number;
  colorProfile: "rgb" | "cmyk";
  dpi: number;
  filename?: string;
}
