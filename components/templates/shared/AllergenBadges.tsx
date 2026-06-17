"use client";

import { ALLERGENS_META } from "@/constants/allergens";
import type { Allergen } from "@/types/menu";

interface AllergenBadgesProps {
  allergens: Allergen[];
  /** Icon font size. Defaults to "0.65rem". */
  fontSize?: string;
  /** Overall opacity applied to the container. */
  opacity?: number;
  /** Top margin. Defaults to "0.25rem". */
  marginTop?: string;
}

export function AllergenBadges({
  allergens,
  fontSize = "0.65rem",
  opacity,
  marginTop = "0.25rem",
}: AllergenBadgesProps) {
  if (allergens.length === 0) return null;
  return (
    <div
      style={{
        display: "flex",
        gap: "0.2rem",
        marginTop,
        ...(opacity !== undefined ? { opacity } : {}),
      }}
    >
      {allergens.map((a) => (
        <span key={a} title={ALLERGENS_META[a].label} style={{ fontSize }}>
          {ALLERGENS_META[a].icon}
        </span>
      ))}
    </div>
  );
}
