import { Popup } from "react-leaflet";
import type { Asset } from "../types";

type AssetPopupProps = {
  asset: Asset;
};

export function AssetPopup({ asset }: AssetPopupProps) {
  return (
    <Popup>
      <article className="asset-popup">
        <div className="popup-header">
          {asset.image && (
            <img src={asset.image} alt="" className="asset-popup-image" />
          )}
          <h3>{asset.name}</h3>
        </div>

        <dl>
          <dt>Description</dt>
          <dd>{asset.description || "Not provided"}</dd>

          <dt>Point ID</dt>
          <dd>{asset.pointId}</dd>

          <dt>Group</dt>
          <dd>{asset.groupName || "Not provided"} ({asset.groupId})</dd>

          <dt>Types</dt>
          <dd>{asset.types.length > 0 ? asset.types.join(", ") : "Not provided"}</dd>

          {asset.link && (
            <>
              <dt>
                <a href={asset.link} target="_blank" rel="noreferrer">
                  More Details
                </a>
              </dt>
            </>
          )}

        </dl>
      </article>
    </Popup>
  );
}
