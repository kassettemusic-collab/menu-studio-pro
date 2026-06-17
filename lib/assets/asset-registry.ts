import type {
  AssetDefinition,
  AssetRegistry,
  AssetType,
  AssetSector,
} from "@/types/assets";
import { DEFAULT_ASSETS } from "./default-assets";

// ── Registry builder ────────────────────────────────────────────────────────

function buildRegistry(assets: AssetDefinition[]): AssetRegistry {
  const byId = new Map<string, AssetDefinition>(assets.map((a) => [a.id, a]));

  const byType = assets.reduce<Record<AssetType, AssetDefinition[]>>(
    (acc, a) => {
      acc[a.type].push(a);
      return acc;
    },
    { background: [], texture: [], icon: [], placeholder: [] }
  );

  const bySector = assets.reduce<
    Partial<Record<AssetSector, AssetDefinition[]>>
  >((acc, a) => {
    for (const tag of a.tags) {
      const sector = tag as AssetSector;
      if (!acc[sector]) acc[sector] = [];
      acc[sector]!.push(a);
    }
    return acc;
  }, {});

  return { assets, byId, byType, bySector };
}

// ── Singleton ───────────────────────────────────────────────────────────────

export const ASSET_REGISTRY: AssetRegistry = buildRegistry(DEFAULT_ASSETS);

// ── Query helpers ────────────────────────────────────────────────────────────

export function getAssetById(id: string): AssetDefinition | undefined {
  return ASSET_REGISTRY.byId.get(id);
}

export function getAssetsByType(type: AssetType): AssetDefinition[] {
  return ASSET_REGISTRY.byType[type];
}

/** Returns assets that match ALL of the provided tags. */
export function getAssetsByTags(tags: string[]): AssetDefinition[] {
  if (tags.length === 0) return ASSET_REGISTRY.assets;
  return ASSET_REGISTRY.assets.filter((a) =>
    tags.every((tag) => a.tags.includes(tag))
  );
}

/** Returns assets relevant to a given sector (includes "generic" assets). */
export function getAssetsForSector(sector: AssetSector): AssetDefinition[] {
  const sectorAssets = ASSET_REGISTRY.bySector[sector] ?? [];
  const genericAssets = ASSET_REGISTRY.bySector["generic"] ?? [];
  const merged = [...sectorAssets, ...genericAssets];
  // Deduplicate by id
  return [...new Map(merged.map((a) => [a.id, a])).values()];
}
