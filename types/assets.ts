// ── Asset taxonomy ──────────────────────────────────────────────────────────

/** Top-level category that determines how an asset is used in templates. */
export type AssetType = "background" | "texture" | "icon" | "placeholder";

/**
 * Industry / sector tag used to group assets by vertical.
 * Templates declare which sectors they support; the asset browser filters by
 * the active sector automatically.
 */
export type AssetSector =
  | "generic"      // Usable by any project type
  | "restaurant"   // Fine dining, Mediterranean, traditional
  | "cafe"         // Coffee shops, brunch, bakeries
  | "cocktail"     // Bars, cocktail lists, wine bars
  | "fast-food"    // Burgers, pizza, street food
  | "hotel"        // Hotel restaurants, room service menus
  | "wine"         // Wine lists, sommelier menus
  | "vegan";       // Plant-based, health-focused

/** Allowed file formats. Checked at registration time (not enforced at runtime). */
export type AssetMimeType =
  | "image/svg+xml"
  | "image/png"
  | "image/jpeg"
  | "image/webp";

// ── Core definition ─────────────────────────────────────────────────────────

export interface AssetDefinition {
  /** Unique slug — used as a stable reference in template configs and project settings. */
  id: string;
  /** Human-readable label shown in asset pickers. */
  name: string;
  type: AssetType;
  /**
   * Path relative to the project root (e.g. "/assets/backgrounds/linen.jpg").
   * Must be resolvable by Next.js Image / <img> at runtime.
   */
  path: string;
  /**
   * Free-form tags for filtering.
   * Always include at least one AssetSector and the AssetType itself.
   */
  tags: string[];
  /** Optional short description shown on hover in the asset picker. */
  description?: string;
  /** Whether this asset works on dark backgrounds. */
  darkModeCompatible?: boolean;
}

// ── Registry shape ──────────────────────────────────────────────────────────

/** The full registry returned by lib/assets. */
export interface AssetRegistry {
  assets: AssetDefinition[];
  /** Quick O(1) lookup by id. */
  byId: Map<string, AssetDefinition>;
  /** Assets grouped by type. */
  byType: Record<AssetType, AssetDefinition[]>;
  /** Assets grouped by sector tag. */
  bySector: Partial<Record<AssetSector, AssetDefinition[]>>;
}
