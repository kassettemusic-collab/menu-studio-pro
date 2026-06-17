import type { CSSProperties } from "react";
import type { TemplateBackground } from "@/types/template";

// ── Built-in texture definitions ──────────────────────────────────────────────
// Pure CSS patterns — no external image files required.
// Each key maps to a TextureDef with CSS `background-image` and optional
// `background-size` for patterns that need explicit tiling dimensions.

interface TextureDef {
  backgroundImage: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
}

/**
 * Built-in CSS-only texture patterns, keyed by a human-readable slug.
 * Use these slugs in TemplateBackground.backgroundTexture / backgroundImage.
 * When actual image files are placed at /assets/textures/, prefer the asset
 * path instead — the resolver will pass URLs through unchanged.
 */
export const BUILTIN_TEXTURES: Record<string, TextureDef> = {
  // Warm parchment grain — horizontal and vertical hair lines mimic old paper.
  "aged-paper": {
    backgroundImage: [
      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(160,110,40,0.022) 3px, rgba(160,110,40,0.022) 4px)",
      "repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(140,90,25,0.014) 5px, rgba(140,90,25,0.014) 6px)",
      "radial-gradient(ellipse at 30% 20%, rgba(200,150,60,0.06) 0%, transparent 55%)",
      "radial-gradient(ellipse at 70% 80%, rgba(180,120,40,0.05) 0%, transparent 50%)",
    ].join(", "),
  },

  // Recycled kraft paper — diagonal crossing hatches.
  "kraft": {
    backgroundImage: [
      "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(110,65,15,0.04) 4px, rgba(110,65,15,0.04) 5px)",
      "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(90,50,10,0.025) 8px, rgba(90,50,10,0.025) 9px)",
    ].join(", "),
  },

  // Woven linen — tight orthogonal weave.
  "linen": {
    backgroundImage: [
      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(195,155,75,0.032) 2px, rgba(195,155,75,0.032) 3px)",
      "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(175,135,55,0.022) 2px, rgba(175,135,55,0.022) 3px)",
    ].join(", "),
  },

  // Fine coastal sand — shallow diagonal waves.
  "sand": {
    backgroundImage: [
      "repeating-linear-gradient(135deg, transparent, transparent 6px, rgba(210,185,120,0.03) 6px, rgba(210,185,120,0.03) 7px)",
      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(200,170,100,0.02) 10px, rgba(200,170,100,0.02) 11px)",
    ].join(", "),
  },

  // Geometric dot grid — subtle, modern.
  "dots": {
    backgroundImage:
      "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  },

  // Fine grid lines — technical / modern.
  "grid": {
    backgroundImage: [
      "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px)",
      "repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px)",
    ].join(", "),
    backgroundSize: "20px 20px",
  },

  // Subtle noise for dark backgrounds — small-grain film grain effect.
  "noise-dark": {
    backgroundImage: [
      "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.015) 1px, rgba(255,255,255,0.015) 2px)",
      "repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.01) 1px, rgba(255,255,255,0.01) 2px)",
    ].join(", "),
  },
};

// ── Resolver ───────────────────────────────────────────────────────────────────

/**
 * Resolves a key or URL to a TextureDef.
 * - Built-in key → returns BUILTIN_TEXTURES entry
 * - URL / asset path → wraps in url("…")
 * - undefined / unknown key → returns null
 */
function resolveTexture(keyOrUrl: string | undefined): TextureDef | null {
  if (!keyOrUrl) return null;
  if (BUILTIN_TEXTURES[keyOrUrl]) return BUILTIN_TEXTURES[keyOrUrl];
  // Treat as a URL/path (actual image file)
  if (keyOrUrl.startsWith("/") || keyOrUrl.startsWith("http") || keyOrUrl.startsWith("data:")) {
    return { backgroundImage: `url("${keyOrUrl}")`, backgroundRepeat: "repeat" };
  }
  return null;
}

// ── Public API ─────────────────────────────────────────────────────────────────

export interface BackgroundLayers {
  /**
   * Apply to the root container div.
   * Includes `backgroundColor` + optional `backgroundImage` cover layer.
   */
  rootStyle: CSSProperties;
  /**
   * Apply to an absolutely-positioned overlay div (z-index 0, pointer-events none).
   * Null when no texture is configured — skip rendering the overlay div entirely.
   */
  overlayStyle: CSSProperties | null;
}

/**
 * Computes the CSS layers for a template's background configuration.
 *
 * @param background - TemplateBackground from the template config (may be undefined)
 * @param solidColor - Fallback solid background color from TemplateColors.background
 */
export function buildBackgroundLayers(
  background: TemplateBackground | undefined,
  solidColor: string
): BackgroundLayers {
  const rootStyle: CSSProperties = { backgroundColor: solidColor };

  // Cover-mode background image (layer 2)
  const bgImageDef = resolveTexture(background?.backgroundImage);
  if (bgImageDef) {
    rootStyle.backgroundImage = bgImageDef.backgroundImage;
    rootStyle.backgroundSize = bgImageDef.backgroundSize ?? "cover";
    rootStyle.backgroundRepeat = bgImageDef.backgroundRepeat ?? "no-repeat";
    rootStyle.backgroundPosition = "center center";
  }

  // Repeating texture overlay (layer 3) — rendered as a separate div
  const textureDef = resolveTexture(background?.backgroundTexture);
  if (!textureDef) return { rootStyle, overlayStyle: null };

  const opacity = background?.overlayOpacity ?? 0.06;
  const overlayStyle: CSSProperties = {
    backgroundImage: textureDef.backgroundImage,
    backgroundSize: textureDef.backgroundSize ?? "auto",
    backgroundRepeat: textureDef.backgroundRepeat ?? "repeat",
    opacity,
  };

  return { rootStyle, overlayStyle };
}
