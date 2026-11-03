import { useEffect, useState } from "react";
import { fetchAssets } from "../api/assetsApi";
import type { Asset } from "../types";
import { AssetList } from "./AssetList";
import { AssetForm } from "./AssetForm";
import { Map } from "./Map";

export function AssetMapEditor() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [loadError, setLoadError] = useState("");
  const [editorAsset, setEditorAsset] = useState<Asset | null>(null);
  const [isCreating, setIsCreating] = useState(false);

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

  const openCreateEditor = () => {
    setSelectedAsset(null);
    setEditorAsset(null);
    setIsCreating(true);
  };

  const openCreateEditorAt = (lat: number, lng: number) => {
    setSelectedAsset(null);
    setEditorAsset({
      arcColor: "",
      description: "",
      groupId: 0,
      groupName: "",
      image: "",
      lat,
      link: "",
      lng,
      name: "",
      pointColor: "",
      pointId: 0,
      state: "",
      types: [],
    });
    setIsCreating(true);
  };

  const openEditEditor = (asset: Asset) => {
    setSelectedAsset(asset);
    setEditorAsset(asset);
    setIsCreating(false);
  };

  const closeEditor = () => {
    setEditorAsset(null);
    setIsCreating(false);
  };

  const saveAsset = (asset: Asset) => {
    setAssets((currentAssets) =>
      isCreating
        ? [...currentAssets, asset]
        : currentAssets.map((currentAsset) =>
            currentAsset.pointId === editorAsset?.pointId ? asset : currentAsset,
          ),
    );
    setSelectedAsset(asset);
    closeEditor();
  };

  return (
    <section
      className={`asset-map-editor ${
        isCreating || editorAsset ? "editor-open" : ""
      }`}
      aria-label="Asset map editor"
    >
      <AssetList
        assets={assets}
        selectedAsset={selectedAsset}
        loadError={loadError}
        onCreateAsset={openCreateEditor}
        onSelectAsset={openEditEditor}
      />
      {isCreating || editorAsset ? (
        <AssetForm
          key={`${isCreating ? "create" : editorAsset?.pointId}`}
          asset={editorAsset}
          isCreating={isCreating}
          assets={assets}
          onCancel={closeEditor}
          onSave={saveAsset}
        />
      ) : null}
      <div className="map-section">
        <p className="map-instructions">
          Right-click on the map to create an asset at that location.
        </p>
        <Map
          assets={assets}
          selectedAsset={selectedAsset}
          onSelectAsset={openEditEditor}
          onCreateAssetAt={openCreateEditorAt}
        />
      </div>
    </section>
  );
}
