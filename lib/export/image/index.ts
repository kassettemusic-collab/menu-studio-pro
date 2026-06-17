// Image generator — not yet implemented.
//
// When ready, this module will:
//   1. Receive a Project + ExportOptions
//   2. Render the matching template via html2canvas or a headless renderer
//   3. Produce a PNG / JPG Blob at the DPI implied by ExportQuality
//   4. Return an ExportResult
//
// ExportQuality → DPI mapping (planned):
//   "screen"     →  72 dpi
//   "print"      → 150 dpi
//   "high-print" → 300 dpi

export {};
