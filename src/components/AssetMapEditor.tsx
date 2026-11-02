import { useEffect, useState } from "react";
import { fetchAssets } from "../api/assetsApi";
import type { Asset } from "../types";
import { AssetList } from "./AssetList";
import { Map } from "./Map";

export function AssetMapEditor() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadAssets() {
      try {
        const points = await fetchAssets();
        setAssets(points);
      } catch (error) {
        setLoadError(
          error instanceof Error ? error.message : "Unable to load assets.",
        );
      }
    }

    void loadAssets();
  }, []);

  return (
    <section className="asset-map-editor" aria-label="Asset map editor">
      <AssetList
        assets={assets}
        selectedAsset={selectedAsset}
        loadError={loadError}
        onSelectAsset={setSelectedAsset}
      />
      <Map assets={assets} selectedAsset={selectedAsset} onSelectAsset={setSelectedAsset} />
    </section>
  );
}
