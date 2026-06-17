import type { TemplateDesign } from "@/types/template";
import { minimalTemplate } from "./minimal/config";
import { elegantTemplate } from "./elegant/config";
import { modernTemplate } from "./modern/config";
import { mediterraneanTemplate } from "./mediterranean/config";
import { coffeeTemplate } from "./coffee/config";
import { pizzaTrattoriaTemplate } from "./pizza-trattoria/config";
import { steakhouseTemplate } from "./steakhouse/config";
import { beachClubTemplate } from "./beach-club/config";
// ── Registry ───────────────────────────────────────────────────────────────

export const DESIGN_REGISTRY: TemplateDesign[] = [
  minimalTemplate,
  elegantTemplate,
  modernTemplate,
  mediterraneanTemplate,
  coffeeTemplate,
  pizzaTrattoriaTemplate,
  steakhouseTemplate,
  beachClubTemplate,
];

export const DESIGN_REGISTRY_MAP = new Map<string, TemplateDesign>(
  DESIGN_REGISTRY.map((t) => [t.id, t])
);

// ── Helpers ────────────────────────────────────────────────────────────────

export function getDesignById(id: string): TemplateDesign | undefined {
  return DESIGN_REGISTRY_MAP.get(id);
}

/** Falls back to Minimal if the id is not found. */
export function resolveDesign(id: string): TemplateDesign {
  return DESIGN_REGISTRY_MAP.get(id) ?? minimalTemplate;
}

export const DEFAULT_DESIGN_ID = minimalTemplate.id;
