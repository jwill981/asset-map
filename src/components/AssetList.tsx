import { useState } from "react";
import type { Asset } from "../types";

type AssetListProps = {
  assets: Asset[];
  selectedAsset: Asset | null;
  loadError: string;
  onCreateAsset: () => void;
  onSelectAsset: (asset: Asset) => void;
};

export function AssetList({
  assets,
  selectedAsset,
  loadError,
  onCreateAsset,
  onSelectAsset,
}: AssetListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredAssets = assets.filter((asset) => {
    const matchesName = asset.name.toLowerCase().includes(normalizedSearch);
    const matchesPointId = asset.pointId
      .toString()
      .includes(normalizedSearch);

    return matchesName || matchesPointId;
  });

  return (
    <aside className="asset-list" aria-label="Assets">
      <div className="list-header">
        <h2>Assets</h2>
        <button type="button" className="secondary-button" onClick={onCreateAsset}>
          Create asset
        </button>
      </div>
      <input
        type="search"
        className="asset-search"
        placeholder="Search by name or point ID"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {loadError && <p role="alert">{loadError}</p>}
      {!loadError && assets.length === 0 && <p>Loading assets...</p>}
      {!loadError && assets.length > 0 && filteredAssets.length === 0 && (
        <p>No matching assets.</p>
      )}
      <ul>
        {filteredAssets.map((asset) => (
          <li key={asset.pointId}>
            <button
              type="button"
              className={`asset-item ${
                selectedAsset?.pointId === asset.pointId ? "selected" : ""
              }`}
              onClick={() => onSelectAsset(asset)}
            >
              {asset.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
