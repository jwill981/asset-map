import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { fetchAssets } from "../api/assetsApi";
import type { Asset, MapViewProps } from "../types";

const markerIcon = L.divIcon({
  className: "asset-marker",
  html: '<span class="asset-marker__dot"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

function MapView({ assets, selectedAsset }: MapViewProps) {
  const map = useMap();

  useEffect(() => {
    if (assets.length === 0) {
      return;
    }

    const bounds = L.latLngBounds(
      assets.map((asset) => [asset.lat, asset.lng]),
    );
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 14 });
  }, [assets, map]);

  useEffect(() => {
    if (selectedAsset) {
      map.flyTo([selectedAsset.lat, selectedAsset.lng], 15, {
        duration: 0.75,
      });
    }
  }, [map, selectedAsset]);

  return null;
}

export function AssetMapEditor() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadAssets() {
      try {
        const points = await fetchAssets();
        if (active) {
          setAssets(points);
        }
      } catch (error) {
        if (active) {
          setLoadError(
            error instanceof Error ? error.message : "Unable to load assets.",
          );
        }
      }
    }

    void loadAssets();

    return () => {
      active = false;
    };
  }, []);

  const selectAsset = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  return (
    <section className="asset-map-editor" aria-label="Asset map editor">
      <aside className="asset-list" aria-label="Assets">
        <h2>Assets</h2>
        {loadError && <p role="alert">{loadError}</p>}
        {!loadError && assets.length === 0 && <p>Loading assets...</p>}
        <ul>
          {assets.map((asset) => (
            <li key={`${asset.name}-${asset.lat}-${asset.lng}`}>
              <button
                type="button"
                className={
                  selectedAsset?.name === asset.name
                    ? "asset-list__item asset-list__item--selected"
                    : "asset-list__item"
                }
                onClick={() => selectAsset(asset)}
              >
                {asset.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="asset-map">
        <MapContainer
          center={[40.7532, -73.9822]}
          zoom={11}
          className="asset-map__canvas"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapView assets={assets} selectedAsset={selectedAsset} />
          {assets.map((asset) => (
            <Marker
              key={`${asset.name}-${asset.lat}-${asset.lng}`}
              position={[asset.lat, asset.lng]}
              icon={markerIcon}
              eventHandlers={{
                click: () => selectAsset(asset),
              }}
            >
              <Popup>{asset.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
