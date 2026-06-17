"use client";

import { useState } from "react";
import { useProjectStore } from "@/store/project-store";
import { generateMenuPdf } from "@/lib/export/pdf/generatePdf";

type State = "idle" | "generating" | "error";

export function ExportButton() {
  const { currentProject, categories } = useProjectStore();
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleExport() {
    if (state === "generating") return;
    setState("generating");
    setErrorMsg("");

    try {
      const result = await generateMenuPdf(currentProject, categories, {
        showLogo: currentProject.branding?.showLogo ?? false,
        showFooter: true,
      });

      // Trigger browser download
      const a = document.createElement("a");
      a.href = result.url;
      a.download = result.filename;
      a.click();

      // Release the object URL after the download starts
      setTimeout(() => URL.revokeObjectURL(result.url), 10_000);

      setState("idle");
    } catch (err) {
      console.error("[ExportButton] PDF generation failed", err);
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
      setState("error");
    }
  }

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={handleExport}
        disabled={state === "generating"}
        className={[
          "w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5",
          "text-sm font-semibold transition-colors",
          state === "generating"
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
        ].join(" ")}
      >
        {state === "generating" ? (
          <>
            <SpinnerIcon />
            Generando PDF…
          </>
        ) : (
          <>
            <DownloadIcon />
            Exportar PDF
          </>
        )}
      </button>

      {state === "error" && (
        <p className="text-[11px] text-destructive px-1">{errorMsg}</p>
      )}
    </div>
  );
}

// ── Inline icons (no extra dependency) ──────────────────────────────────────

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
