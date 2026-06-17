"use client";

import { useRef } from "react";

const MAX_SIZE_MB = 3;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

interface ProductImageUploadProps {
  image: string | undefined;
  itemName: string;
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
}

export function ProductImageUpload({
  image,
  itemName,
  onUpload,
  onRemove,
}: ProductImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Solo se admiten archivos de imagen.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      alert(`La imagen supera el límite de ${MAX_SIZE_MB} MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (typeof dataUrl === "string") onUpload(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
        aria-label={`Imagen de ${itemName}`}
      />

      {image ? (
        /* ── Preview state ──────────────────────────────────────────── */
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={itemName}
            className="h-12 w-12 rounded object-cover border border-border shrink-0 bg-muted"
          />
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs text-primary hover:underline"
            >
              Reemplazar
            </button>
            <span className="text-muted-foreground/40 text-xs">·</span>
            <button
              type="button"
              onClick={onRemove}
              className="text-xs text-destructive hover:underline"
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        /* ── Empty state ────────────────────────────────────────────── */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={[
            "w-full flex items-center gap-2 rounded-md border border-dashed border-border",
            "px-3 py-2 text-xs text-muted-foreground",
            "hover:border-primary/50 hover:text-foreground transition-colors",
          ].join(" ")}
        >
          <ImageIcon />
          <span>Añadir foto del plato</span>
          <span className="ml-auto text-[10px] text-muted-foreground/50">
            PNG, JPG — máx. {MAX_SIZE_MB} MB
          </span>
        </button>
      )}
    </div>
  );
}

function ImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
