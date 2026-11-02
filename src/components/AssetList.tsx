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
  return (
    <aside className="asset-list" aria-label="Assets">
      <div className="list-header">
        <h2>Assets</h2>
        <button type="button" className="secondary-button" onClick={onCreateAsset}>
          Create asset
        </button>
      </div>
      {loadError && <p role="alert">{loadError}</p>}
      {!loadError && assets.length === 0 && <p>Loading assets...</p>}
      <ul>
        {assets.map((asset) => (
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
