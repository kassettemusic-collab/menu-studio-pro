// Client-only — uses @react-pdf/renderer's `pdf()` which requires a browser.

import React from "react";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ReactPDF = require("@react-pdf/renderer") as typeof import("@react-pdf/renderer");
import { PdfMenuDocument } from "./PdfMenuDocument";
import type { Project } from "@/types/project";
import type { Category } from "@/types/menu";
import type { ExportOptions, ExportResult } from "@/types/export";

export async function generateMenuPdf(
  project: Project,
  categories: Category[],
  options: Pick<ExportOptions, "showLogo" | "showFooter">
): Promise<ExportResult> {
  const lang = project.activeLanguages[0] ?? "es";

  const element = React.createElement(PdfMenuDocument, {
    project,
    categories,
    lang,
    showLogo: options.showLogo,
    showFooter: options.showFooter,
  });

  // Cast needed: pdf() types expect ReactElement<DocumentProps> directly,
  // but our wrapper component renders <Document> internally.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instance = ReactPDF.pdf(element as any);
  const blob = await instance.toBlob();
  const url = URL.createObjectURL(blob);

  const slug = project.restaurantInfo.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    outputType: "pdf",
    url,
    filename: `${slug}-menu.pdf`,
    sizeBytes: blob.size,
  };
}
